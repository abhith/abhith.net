/**
 * `<lastmod>` for the sitemap. `astro.config.mjs` can't use content collections, so this reads the
 * frontmatter of posts and snippets straight from disk and derives a date for every page that has one:
 * the entry itself, its section listing, its topic pages and the home page.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { load as parseYaml } from "js-yaml";

export interface LastmodEntry {
  /** Root-relative page URL with a trailing slash, e.g. `/blog/some-post/`. */
  url: string;
  /** Listing that shows this entry, e.g. `/blog/`. */
  section: string;
  topics: readonly string[];
  lastModified: Date;
}

const later = (a: Date | undefined, b: Date) => (a && a > b ? a : b);

/** Page URL → newest modification date of the entry (or of anything it lists). */
export function lastmodByUrl(entries: readonly LastmodEntry[]): Map<string, Date> {
  const dates = new Map<string, Date>();
  const bump = (url: string, date: Date) => dates.set(url, later(dates.get(url), date));
  for (const entry of entries) {
    bump(entry.url, entry.lastModified);
    bump(entry.section, entry.lastModified);
    bump("/", entry.lastModified);
    for (const topic of entry.topics) {
      bump(`/topics/${topic}/`, entry.lastModified);
      // Only snippets have per-topic listings (`/snippets/<category>/` and `/snippets/<topic>/`).
      if (entry.section === "/snippets/") bump(`/snippets/${topic}/`, entry.lastModified);
    }
  }
  return dates;
}

interface Frontmatter {
  date?: string | Date;
  lastModificationTime?: string | Date;
  topics?: string[];
  draft?: boolean;
}

function frontmatter(file: string): Frontmatter | undefined {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync(file, "utf8"));
  return match ? (parseYaml(match[1]) as Frontmatter) : undefined;
}

function mdxFiles(dir: string): string[] {
  return readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => join(dir, file));
}

/** Reads `src/content/{blog,snippets}` under `root`; drafts and undated files are skipped. */
export function loadLastmodEntries(root: string): LastmodEntry[] {
  const sources = [
    { dir: join(root, "src/content/blog"), section: "/blog/", slug: (path: string) => path.replace(/\/index\.mdx$/, "") },
    { dir: join(root, "src/content/snippets"), section: "/snippets/", slug: (path: string) => path.replace(/\.mdx$/, "") },
  ];
  return sources.flatMap(({ dir, section, slug }) =>
    mdxFiles(dir).flatMap((file) => {
      const data = frontmatter(file);
      const path = relative(dir, file).split(sep).join("/");
      // Blog posts are `<slug>/index.mdx`; loose `draft-*.mdx` files are never published.
      if (!data?.date || data.draft || (section === "/blog/" && !path.endsWith("/index.mdx"))) return [];
      const lastModified = new Date(data.lastModificationTime ?? data.date);
      if (Number.isNaN(lastModified.getTime())) return [];
      return [{ url: `${section}${slug(path)}/`, section, topics: data.topics ?? [], lastModified }];
    }),
  );
}
