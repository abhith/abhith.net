/**
 * Parity report: compares the Astro build (`dist/`) with what the Gatsby site produced.
 *
 * Expected routes are derived from the ORIGINAL Gatsby content (`gatsbyjs-site/abhith.net`)
 * using the rules of `gatsby/node/createPages.js`, so the report is independent of the Astro
 * implementation. Run after `astro build`:
 *
 *   npm run parity            # print the report
 *   npm run parity -- --strict   # exit 1 on missing routes or broken internal links
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { load as parseYaml } from "js-yaml";
import { buildContentGraph } from "../src/lib/graph/build";
import { paginate } from "../src/lib/graph/paginate";
import type { EntryItem, GraphItem, TopicDefinition } from "../src/lib/graph/types";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const gatsby = join(root, "gatsbyjs-site", "abhith.net");
const dist = join(root, "dist");
const strict = process.argv.includes("--strict");

/** Routes added on purpose by the new site (not failures). */
const BY_DESIGN: Array<[RegExp, string]> = [
  [/^\/graph\/$/, "knowledge graph"],
  [/^\/topics\/[^/]+\/$/, "topic hub for topics without posts (Gatsby redirected these)"],
  [/^\/og\//, "OG images"],
  [/^\/pagefind\//, "search index"],
  [/^\/google[0-9a-f]+\.html$/, "search console verification file (copied from static/)"],
];

// ---------------------------------------------------------------------------------------------
// Raw Gatsby content
// ---------------------------------------------------------------------------------------------

type Frontmatter = Record<string, unknown>;

function frontmatter(file: string): Frontmatter {
  const match = readFileSync(file, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? ((parseYaml(match[1]) as Frontmatter) ?? {}) : {};
}

const readYaml = <T>(file: string) => parseYaml(readFileSync(file, "utf8")) as T;
const readJson = <T>(file: string) => JSON.parse(readFileSync(file, "utf8")) as T;
const toDate = (value: unknown) => new Date(String(value));

interface RawPost extends EntryItem {
  draft: boolean;
  fm: Frontmatter;
  file: string;
}

function loadGatsbyContent() {
  const blogDir = join(gatsby, "content/blog");
  const postFiles = readdirSync(blogDir).flatMap((name) => {
    const full = join(blogDir, name);
    if (statSync(full).isDirectory()) return existsSync(join(full, "index.mdx")) ? [{ slug: name, file: join(full, "index.mdx") }] : [];
    return name.endsWith(".mdx") ? [{ slug: name.replace(/\.mdx$/, ""), file: full }] : [];
  });
  const posts: RawPost[] = postFiles.map(({ slug, file }) => {
    const fm = frontmatter(file);
    return {
      id: slug,
      url: `/blog/${slug}/`,
      title: String(fm.title ?? ""),
      author: String(fm.author ?? ""),
      date: toDate(fm.date),
      tags: (fm.tags as string[]) ?? [],
      draft: fm.draft === true,
      fm,
      file,
    };
  });

  const snippetDir = join(gatsby, "content/snippets");
  const snippets = readdirSync(snippetDir)
    .filter((category) => statSync(join(snippetDir, category)).isDirectory())
    .flatMap((category) =>
      readdirSync(join(snippetDir, category))
        .filter((name) => name.endsWith(".mdx"))
        .map((name) => {
          const file = join(snippetDir, category, name);
          const fm = frontmatter(file);
          const id = `${category}/${name.replace(/\.mdx$/, "")}`;
          return {
            id,
            url: `/snippets/${id}/`,
            title: String(fm.title ?? ""),
            author: String(fm.author ?? ""),
            date: toDate(fm.date),
            tags: (fm.topics as string[]) ?? [],
            draft: fm.draft === true,
            fm,
            file,
          } satisfies RawPost;
        }),
    );

  type Linked = { url: string; title: string; tags: string[]; date: string };
  const linked = (items: Linked[], prefix: string): Array<GraphItem & { url: string; title: string }> =>
    items.map((item, index) => ({ id: `${prefix}-${index}`, url: item.url, title: item.title, tags: item.tags, date: toDate(item.date) }));

  const stories = linked(readJson<Linked[]>(join(gatsby, "src/data/recommended/stories/stories.json")), "story");
  const videos = linked(readJson<Linked[]>(join(gatsby, "src/data/recommended/videos/videos.json")), "video");
  const tools = linked(readYaml<Linked[]>(join(gatsby, "content/recommended/services/services.yml")), "tool");
  const authors = readYaml<Array<{ name: string }>>(join(gatsby, "content/authors/authors.yml"));
  const topicDefinitions = readYaml<TopicDefinition[]>(join(gatsby, "content/topics/topics.yml"));

  return { posts, snippets, stories, videos, tools, authors, topicDefinitions };
}

// ---------------------------------------------------------------------------------------------
// Expected routes (Gatsby rules)
// ---------------------------------------------------------------------------------------------

function expectedRoutes(content: ReturnType<typeof loadGatsbyContent>) {
  const posts = content.posts.filter((post) => !post.draft);
  const snippets = content.snippets.filter((snippet) => !snippet.draft);
  const graph = buildContentGraph({ ...content, posts, snippets });
  const routes = new Set<string>(["/", "/about/", "/contact/", "/privacy-policy/", "/donate/", "/recommended/", "/topics/"]);
  const add = (url: string) => routes.add(url);

  posts.forEach((post) => add(post.url));
  snippets.forEach((snippet) => add(snippet.url));
  paginate(posts, "/blog").forEach((page) => add(page.url));
  paginate(snippets, "/snippets").forEach((page) => add(page.url));
  paginate(content.stories, "/recommended/stories").forEach((page) => add(page.url));
  paginate(content.videos, "/recommended/videos").forEach((page) => add(page.url));
  paginate(content.tools, "/recommended/services").forEach((page) => add(page.url));

  for (const topic of graph.topics) {
    if (topic.totalPosts > 0) add(`/topics/${topic.slug}/`);
    if (topic.totalStories > 0) add(`/topics/${topic.slug}/stories/`);
    if (topic.totalVideos > 0) add(`/topics/${topic.slug}/videos/`);
    if (topic.totalServices > 0) add(`/topics/${topic.slug}/tools/`);
    if (topic.totalSnippets > 0) {
      paginate(snippets.filter((snippet) => snippet.tags.includes(topic.slug)), `/snippets/${topic.slug}`).forEach((page) => add(page.url));
    }
  }
  return { routes, graph, posts, snippets };
}

// ---------------------------------------------------------------------------------------------
// dist/ inspection
// ---------------------------------------------------------------------------------------------

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function distRoutes(files: string[]): Set<string> {
  return new Set(
    files
      .filter((file) => file.endsWith(".html"))
      .map((file) => `/${relative(dist, file).split("\\").join("/")}`)
      .map((path) => (path.endsWith("/index.html") ? path.slice(0, -"index.html".length) : path)),
  );
}

function resolvesInDist(pathname: string): boolean {
  const clean = decodeURIComponent(pathname.split("#")[0].split("?")[0]);
  if (clean === "") return true;
  const target = join(dist, clean);
  if (clean.endsWith("/")) return existsSync(join(target, "index.html"));
  return existsSync(target) || existsSync(join(target, "index.html"));
}

function internalLinks(htmlFiles: string[]) {
  const broken = new Map<string, Set<string>>();
  let checked = 0;
  const attr = /\s(?:href|src)=["']([^"']+)["']/g;
  for (const file of htmlFiles) {
    const page = `/${relative(dist, file).split("\\").join("/")}`.replace(/index\.html$/, "");
    const html = readFileSync(file, "utf8");
    for (const [, raw] of html.matchAll(attr)) {
      let url = raw.replaceAll("&amp;", "&");
      if (url.startsWith("https://www.abhith.net/")) url = url.slice("https://www.abhith.net".length);
      if (!url.startsWith("/") || url.startsWith("//")) continue;
      checked++;
      if (!resolvesInDist(url)) {
        const pages = broken.get(url) ?? new Set<string>();
        pages.add(page);
        broken.set(url, pages);
      }
    }
  }
  return { broken, checked };
}

function missingImageDimensions(htmlFiles: string[]) {
  let total = 0;
  const offenders = new Map<string, number>();
  for (const file of htmlFiles) {
    for (const [tag] of readFileSync(file, "utf8").matchAll(/<img\b[^>]*>/g)) {
      total++;
      if (!/\swidth=/.test(tag) || !/\sheight=/.test(tag)) {
        const page = `/${relative(dist, file)}`.replace(/index\.html$/, "");
        offenders.set(page, (offenders.get(page) ?? 0) + 1);
      }
    }
  }
  return { total, offenders };
}

// ---------------------------------------------------------------------------------------------
// Content checks
// ---------------------------------------------------------------------------------------------

const REQUIRED_POST_FIELDS = ["title", "description", "author", "date", "image", "tags"];
const OPTIONAL_POST_FIELDS = ["authorURL", "lastModificationTime", "commentId"];

function frontmatterReport(posts: RawPost[], snippets: RawPost[]) {
  const published = posts.filter((post) => !post.draft);
  const missingRequired = published.flatMap((post) =>
    REQUIRED_POST_FIELDS.filter((field) => post.fm[field] === undefined || post.fm[field] === "").map((field) => `${post.id}: ${field}`),
  );
  const optional = OPTIONAL_POST_FIELDS.map((field) => [field, published.filter((post) => post.fm[field] === undefined).length] as const);
  const snippetMissing = snippets.flatMap((snippet) =>
    ["title", "description", "author", "date", "topics"].filter((field) => snippet.fm[field] === undefined).map((field) => `${snippet.id}: ${field}`),
  );
  return { published: published.length, drafts: posts.length - published.length, missingRequired, optional, snippetMissing };
}

async function imageReport(posts: RawPost[]) {
  type SharpFn = (input: string) => { metadata(): Promise<{ width?: number; height?: number; format?: string }> };
  let sharp: SharpFn;
  try {
    sharp = (await import("sharp")).default as unknown as SharpFn;
  } catch {
    return undefined;
  }
  const rows: Array<{ id: string; file: string; width: number; height: number; format: string }> = [];
  const contentImages = posts.flatMap((post) => {
    const dir = dirname(post.file);
    if (dir === join(gatsby, "content/blog")) return [];
    return readdirSync(dir)
      .filter((name) => /\.(png|jpe?g|gif|webp|svg)$/i.test(name))
      .map((name) => ({ id: post.id, file: join(dir, name) }));
  });
  for (const { id, file } of contentImages) {
    try {
      const meta = await sharp(file).metadata();
      rows.push({ id, file: basename(file), width: meta.width ?? 0, height: meta.height ?? 0, format: meta.format ?? "?" });
    } catch {
      rows.push({ id, file: basename(file), width: 0, height: 0, format: "unreadable" });
    }
  }
  return {
    total: rows.length,
    wide: rows.filter((row) => row.width > 1920),
    gifs: rows.filter((row) => row.format === "gif"),
    svgs: rows.filter((row) => row.format === "svg"),
  };
}

function relatedReport(graph: ReturnType<typeof expectedRoutes>["graph"]) {
  const kinds = ["articles", "snippets", "stories", "videos", "tools"] as const;
  const entries = [...graph.posts, ...graph.snippets];
  let identical = 0;
  let reordered = 0;
  let changed = 0;
  const perKind = Object.fromEntries(kinds.map((kind) => [kind, 0])) as Record<(typeof kinds)[number], number>;
  for (const entry of entries) {
    const legacy = graph.relatedFor(entry, "legacy");
    const ranked = graph.relatedFor(entry, "ranked");
    let entryChanged = false;
    let entryReordered = false;
    for (const kind of kinds) {
      const a = legacy[kind].map((item) => item.id);
      const b = ranked[kind].map((item) => item.id);
      if (a.join() === b.join()) continue;
      const sameMembers = a.length === b.length && a.every((id) => b.includes(id));
      if (sameMembers) entryReordered = true;
      else {
        entryChanged = true;
        perKind[kind]++;
      }
    }
    if (entryChanged) changed++;
    else if (entryReordered) reordered++;
    else identical++;
  }
  const samples = ["azure-web-app-missing-mime-types", "docker-cookbook", "2021-year-in-review", "git/delete-all-local-remote-git-tags"]
    .map((id) => entries.find((entry) => entry.id === id))
    .filter((entry): entry is (typeof entries)[number] => Boolean(entry))
    .map((entry) => {
      const legacy = graph.relatedFor(entry, "legacy").articles.map((item) => item.id);
      const ranked = graph.relatedFor(entry, "ranked").articles.map((item) => item.id);
      return { id: entry.id, legacy, ranked };
    });
  return { total: entries.length, identical, reordered, changed, perKind, samples };
}

// ---------------------------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------------------------

const list = (items: string[], max = Number(process.env.PARITY_MAX ?? 25)) =>
  items.length === 0 ? "  (none)" : [...items.slice(0, max).map((item) => `  - ${item}`), ...(items.length > max ? [`  - … ${items.length - max} more`] : [])].join("\n");

async function main() {
  const content = loadGatsbyContent();
  const { routes: expected, graph, posts, snippets } = expectedRoutes(content);
  const out: string[] = ["# Parity report", ""];

  out.push("## Content", "");
  out.push(`- posts: ${posts.length} published, ${content.posts.length - posts.length} drafts`);
  out.push(`- snippets: ${snippets.length}`, `- topics (merged): ${graph.topics.length} (${graph.topics.filter((t) => !t.defined).length} without a topics.yml entry)`);
  out.push(`- stories: ${content.stories.length}, videos: ${content.videos.length}, services: ${content.tools.length}`, "");

  const files = walk(dist);
  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  let failures = 0;

  if (files.length === 0) {
    out.push("## Routes", "", "`dist/` not found — run `npm run build` first. Only content checks were run.", "");
  } else {
    const actual = distRoutes(files);
    const missing = [...expected].filter((route) => !actual.has(route)).sort();
    const extra = [...actual].filter((route) => !expected.has(route) && route !== "/404.html").sort();
    const byDesign = extra.filter((route) => BY_DESIGN.some(([pattern]) => pattern.test(route)));
    const unexpected = extra.filter((route) => !byDesign.includes(route));
    failures += missing.length;

    out.push("## Routes", "");
    out.push(`- expected (Gatsby rules): ${expected.size}`, `- built: ${actual.size}`, `- 404 page: ${actual.has("/404.html") ? "yes" : "NO"}`);
    out.push(`- missing: ${missing.length}`, list(missing));
    out.push(`- extra by design: ${byDesign.length}`, list(byDesign, 10));
    out.push(`- extra, unexpected: ${unexpected.length}`, list(unexpected), "");

    const collisions = snippets.filter((snippet) => /^\d+$/.test(snippet.id.split("/")[1] ?? ""));
    out.push("## Route collisions", "", `- snippet slugs that collide with pagination (/snippets/{topic}/{n}/): ${collisions.length}`, "");

    const { broken, checked } = internalLinks(htmlFiles);
    failures += broken.size;
    out.push("## Internal links", "", `- checked: ${checked}`, `- broken targets: ${broken.size}`);
    out.push(list([...broken.entries()].map(([url, pages]) => `${url}  ← ${[...pages].slice(0, 3).join(", ")}${pages.size > 3 ? ` (+${pages.size - 3})` : ""}`)), "");

    const dims = missingImageDimensions(htmlFiles);
    out.push("## Rendered images", "", `- <img> tags: ${dims.total}`, `- without width/height (layout shift risk): ${[...dims.offenders.values()].reduce((a, b) => a + b, 0)}`);
    out.push(list([...dims.offenders.entries()].map(([page, count]) => `${page} (${count})`), 10), "");

    out.push("## Feeds, sitemap, robots", "");
    const read = (file: string) => (existsSync(join(dist, file)) ? readFileSync(join(dist, file), "utf8") : undefined);
    const count = (xml: string | undefined, tag: string) => (xml ? (xml.match(new RegExp(`<${tag}[\\s>]`, "g")) ?? []).length : 0);
    const blogFeed = read("blog/rss.xml");
    const storiesFeed = read("recommended/stories/rss.xml");
    const draftSlugs = content.posts.filter((post) => post.draft).map((post) => post.url);
    out.push(
      `- /blog/rss.xml: ${blogFeed ? `${count(blogFeed, "item")} items (expected ${posts.length}), full content: ${blogFeed.includes("<content:encoded>") ? "yes" : "no"}, drafts leaked: ${draftSlugs.filter((url) => blogFeed.includes(url)).length}` : "MISSING"}`,
    );
    out.push(`- /recommended/stories/rss.xml: ${storiesFeed ? `${count(storiesFeed, "item")} items (expected ${content.stories.length})` : "MISSING"}`);
    if (!blogFeed || !storiesFeed) failures++;

    const sitemapFiles = files.filter((file) => /sitemap-\d+\.xml$/.test(file));
    const sitemapUrls = new Set(sitemapFiles.flatMap((file) => [...readFileSync(file, "utf8").matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((match) => match[1])));
    const missingFromSitemap = [...expected].filter((route) => !sitemapUrls.has(route));
    out.push(`- sitemap: ${sitemapFiles.length ? `${sitemapUrls.size} URLs, missing expected routes: ${missingFromSitemap.length}, drafts leaked: ${draftSlugs.filter((url) => sitemapUrls.has(url)).length}` : "MISSING"}`);
    if (missingFromSitemap.length) out.push(list(missingFromSitemap, 10));
    const robots = read("robots.txt");
    out.push(`- robots.txt: ${robots ? robots.split("\n").filter(Boolean).join(" | ") : "MISSING"}`);
    const ogCount = files.filter((file) => file.includes(`${join(dist, "og")}`) && file.endsWith(".png")).length;
    out.push(`- OG images: ${ogCount} (expected ${posts.length + snippets.length + graph.topics.length + 1})`, `- search index: ${existsSync(join(dist, "pagefind")) ? "yes" : "MISSING"}`, "");
  }

  const fm = frontmatterReport(content.posts, content.snippets);
  out.push("## Frontmatter", "", `- published posts missing required fields: ${fm.missingRequired.length}`, list(fm.missingRequired));
  out.push(`- optional fields missing (published posts, of ${fm.published}):`, ...fm.optional.map(([field, count]) => `  - ${field}: ${count}`));
  out.push(`- snippets missing fields: ${fm.snippetMissing.length}`, list(fm.snippetMissing), "");

  const images = await imageReport(content.posts);
  if (images) {
    out.push("## Source images (post folders)", "", `- total: ${images.total}`);
    out.push(`- wider than 1920px (Gatsby capped at 1920, Astro keeps source width unless a width is set): ${images.wide.length}`, list(images.wide.map((row) => `${row.id}/${row.file} ${row.width}×${row.height}`), 10));
    out.push(`- GIFs (Gatsby served as-is; Astro converts to static WebP when optimised): ${images.gifs.length}`, list(images.gifs.map((row) => `${row.id}/${row.file}`), 10));
    out.push(`- SVGs (served as-is): ${images.svgs.length}`, "");
  }

  const related = relatedReport(graph);
  out.push("## Related content: legacy (Gatsby) vs ranked (new)", "");
  out.push(`- entries: ${related.total}`, `- identical: ${related.identical}`, `- same items, different order: ${related.reordered}`, `- different items: ${related.changed}`);
  out.push(`- entries with different items per type: ${Object.entries(related.perKind).map(([kind, count]) => `${kind} ${count}`).join(", ")}`);
  for (const sample of related.samples) {
    out.push(`- ${sample.id}`, `  - legacy articles: ${sample.legacy.join(", ") || "(none)"}`, `  - ranked articles: ${sample.ranked.join(", ") || "(none)"}`);
  }
  out.push("", "Note: Gatsby listed snippets in unspecified node order; both modes here use newest-first.", "");

  console.log(out.join("\n"));
  if (strict && failures > 0) {
    console.error(`parity: ${failures} blocking issue(s)`);
    process.exit(1);
  }
}

await main();
