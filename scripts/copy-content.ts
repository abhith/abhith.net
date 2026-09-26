/**
 * Copies content and static assets from the legacy Gatsby site into the Astro project.
 *
 * The Gatsby source (`gatsbyjs-site/abhith.net`) is treated as read-only; this script is
 * idempotent and can be re-run at any time to refresh `src/content/*` and `public/*`.
 *
 * Usage: npm run copy-content
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const gatsby = join(root, "gatsbyjs-site", "abhith.net");
const contentDir = join(root, "src", "content");
const publicDir = join(root, "public");

const report: string[] = [];
const log = (msg: string) => report.push(msg);

/** Component imports that pointed into the Gatsby `src/components` folder. */
const importRewrites: Array<[RegExp, string]> = [
  [/from\s+["'](?:\.\.\/)+src\/components\/alert["']/g, 'from "@/components/mdx/Alert.astro"'],
  [/from\s+["'](?:\.\.\/)+src\/components\/badge["']/g, 'from "@/components/mdx/Badge.astro"'],
];

/**
 * Legacy `/post/*` URLs (see redirectBatch2 in gatsby/node/createPages.js). Redirects are out of
 * scope, so internal links inside content are rewritten to their `/blog/*` targets instead.
 */
const LEGACY_POST_RENAMES: Record<string, string> = {
  "check-if-string-is-arabic-c": "check-if-string-is-arabic-csharp",
  "determine-total-number-of-openactive-connections-in-ms-sql-server": "determine-total-number-of-open-active-connections-in-ms-sql-server",
  "getset-hidden-field-value-using-jquery": "get-set-hidden-field-value-using-jquery",
  "sitefinity-development-problems-and-solutions": "sitefinity-development-problems-solutions",
  "ip-security-configure-ip-address-restrictions-in-webconfig-on-iis": "ip-security-configure-ip-address-restrictions-in-web-config-on-iis",
  "vuejs-list-rendering-limit-items-in-v-for": "vue-js-list-rendering-limit-items-in-v-for",
  "dotnet-interview-questions-and-answers": "dot-net-interview-questions-and-answers",
  "fix-web-deploy-could-not-verify-the-server-s-certificate": "fix-web-deploy-could-not-verify-the-server-certificate",
  "aspnet-core-starting-the-web-server-is-taking-longer-than-expected": "asp-net-core-starting-the-web-server-is-taking-longer-than-expected",
};

function rewriteLegacyLinks(source: string): string {
  const target = (slug: string) => `/blog/${LEGACY_POST_RENAMES[slug] ?? slug}/`;
  return (
    source
      // inline links: [text](/post/slug/)
      .replace(/\]\((?:https:\/\/www\.abhith\.net)?\/post\/([a-z0-9-]+)\/?\)/g, (_match, slug: string) => `](${target(slug)})`)
      // reference definitions: [1]: https://www.abhith.net/post/slug/
      .replace(/^(\[[^\]]+\]:\s*)(?:https:\/\/www\.abhith\.net)?\/post\/([a-z0-9-]+)\/?\s*$/gm, (_match, label: string, slug: string) => `${label}${target(slug)}`)
  );
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function copyDir(from: string, to: string, filter?: (src: string) => boolean) {
  if (!existsSync(from)) throw new Error(`Missing source folder: ${relative(root, from)}`);
  rmSync(to, { recursive: true, force: true });
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, {
    recursive: true,
    filter: (src) => basename(src) !== ".DS_Store" && (filter ? filter(src) : true),
  });
  log(`copied ${relative(root, from)} -> ${relative(root, to)}`);
}

function copyFile(from: string, to: string) {
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to);
  log(`copied ${relative(root, from)} -> ${relative(root, to)}`);
}

/**
 * Root-level drafts (`draft-*.mdx`) were scaffolded from other posts and reference hero
 * images that live in those posts' folders. Point them at the real file, or drop the hero.
 */
function fixDraftHero(file: string, source: string): string {
  const match = source.match(/^image:\s*["']?([^"'\n]+)["']?\s*$/m);
  if (!match) return source;
  const ref = match[1].trim();
  const dir = dirname(file);
  if (ref.startsWith("./") && existsSync(join(dir, ref))) return source;

  const wanted = basename(ref);
  const candidate = walk(join(contentDir, "blog")).find((f) => basename(f) === wanted);
  if (candidate) {
    const rel = `./${relative(dir, candidate).split("\\").join("/")}`;
    log(`draft hero rewritten: ${basename(file)}: ${ref} -> ${rel}`);
    return source.replace(match[0], `image: "${rel}"`);
  }
  log(`draft hero dropped (file not found): ${basename(file)}: ${ref}`);
  return source.replace(`${match[0]}\n`, "");
}

function transformBlog() {
  const blogDir = join(contentDir, "blog");
  for (const file of walk(blogDir).filter((f) => f.endsWith(".mdx"))) {
    let source = readFileSync(file, "utf8");
    const before = source;
    for (const [pattern, replacement] of importRewrites) source = source.replace(pattern, replacement);
    if (source !== before) log(`imports rewritten: ${relative(blogDir, file)}`);
    const beforeLinks = source;
    source = rewriteLegacyLinks(source);
    if (source !== beforeLinks) log(`legacy /post/ links rewritten: ${relative(blogDir, file)}`);
    if (dirname(file) === blogDir && /^draft:\s*true\s*$/m.test(source)) source = fixDraftHero(file, source);
    if (source !== before) writeFileSync(file, source);
  }
}

function main() {
  // Content collections
  for (const name of ["blog", "snippets", "authors", "topics", "recommended"]) {
    copyDir(join(gatsby, "content", name), join(contentDir, name));
  }
  mkdirSync(join(contentDir, "data"), { recursive: true });
  copyFile(join(gatsby, "src/data/recommended/stories/stories.json"), join(contentDir, "data/stories.json"));
  copyFile(join(gatsby, "src/data/recommended/videos/videos.json"), join(contentDir, "data/videos.json"));
  transformBlog();

  // Markdown bodies of the static pages (rendered by src/pages/{about,contact,privacy-policy}.astro)
  for (const name of ["about", "contact", "privacy-policy"]) {
    copyFile(join(gatsby, "src/pages", name, "index.md"), join(contentDir, "pages", `${name}.md`));
  }

  // Static assets (IIS web.config is intentionally skipped)
  copyDir(join(gatsby, "static/img"), join(publicDir, "img"));
  // Default social image referenced by the Gatsby siteMetadata (https://www.abhith.net/img/site/mindmap.png)
  copyFile(join(gatsby, "src/images/pages/home/mindmap.png"), join(publicDir, "img/site/mindmap.png"));
  for (const name of readdirSync(join(gatsby, "static"))) {
    if (name === "ads.txt" || /^google.*\.html$/.test(name)) {
      copyFile(join(gatsby, "static", name), join(publicDir, name));
    }
  }

  console.log(report.map((line) => `  • ${line}`).join("\n"));
  console.log(`\ncopy-content: done (${report.length} operations)`);
}

main();
