/**
 * Pure helpers behind `npm run add` (scripts/add-recommendation.ts): no network or file access
 * here, so everything is unit-testable.
 */
import { dump as dumpYaml } from "js-yaml";
import { youtubeId } from "../../src/lib/graph/media.ts";

export type Kind = "story" | "video" | "service";

export const KINDS: readonly Kind[] = ["story", "video", "service"];

export interface StoryEntry {
  url: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
}

export interface VideoEntry {
  url: string;
  title: string;
  image?: string;
  tags: string[];
  date: string;
  type: "youtube" | "vimeo";
}

export interface ServiceEntry {
  title: string;
  url: string;
  description: string;
  date: string;
  tags: string[];
}

export type Entry = StoryEntry | VideoEntry | ServiceEntry;

export interface PageMeta {
  title?: string;
  description?: string;
  image?: string;
}

/**
 * Query parameters that only track where a click came from. Plain `ref` is kept on purpose:
 * on GitHub and docs sites it is often a branch or version.
 */
const TRACKING_PARAMS = /^(utm_\w+|fbclid|gclid|dclid|msclkid|mc_cid|mc_eid|igshid|si|ref_src|ref_url)$/i;

export function videoType(url: string): VideoEntry["type"] | undefined {
  if (youtubeId(url)) return "youtube";
  try {
    const host = new URL(url).hostname.replace(/^www\.|^player\./, "");
    if (host === "vimeo.com" && /\/\d+/.test(new URL(url).pathname)) return "vimeo";
  } catch {
    return undefined;
  }
  return undefined;
}

/** Video hosts go to videos, everything else is a story unless the caller says otherwise. */
export function detectKind(url: string, requested?: Kind): Kind {
  if (requested) return requested;
  return videoType(url) ? "video" : "story";
}

/**
 * The URL as it gets stored: tracking parameters and fragments removed, YouTube links reduced to
 * the canonical `watch?v=` form. Throws for anything that isn't an http(s) URL.
 */
export function cleanUrl(input: string): string {
  const url = new URL(input.trim());
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error(`Not an http(s) URL: ${input}`);
  const id = youtubeId(url.href);
  if (id) return `https://www.youtube.com/watch?v=${id}`;
  url.hash = "";
  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_PARAMS.test(key)) url.searchParams.delete(key);
  }
  return url.href;
}

/** Comparison key for duplicate detection: ignores scheme, `www.`, trailing slashes and tracking. */
export function urlKey(input: string): string {
  try {
    const id = youtubeId(input);
    if (id) return `youtube:${id}`;
    const url = new URL(cleanUrl(input));
    url.searchParams.sort();
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const path = url.pathname.replace(/\/+$/, "");
    return `${host}${path}${url.search}`;
  } catch {
    return input.trim().toLowerCase();
  }
}

/** `privacy, open-source` / `privacy open-source` → `["privacy", "open-source"]` (deduplicated). */
export function parseTags(input: string | readonly string[] | undefined): string[] {
  const raw = typeof input === "string" ? [input] : (input ?? []);
  const tags = raw
    .flatMap((value) => value.split(/[\s,]+/))
    .map((tag) => tag.trim().toLowerCase().replace(/^#/, ""))
    .filter(Boolean);
  return [...new Set(tags)];
}

function levenshtein(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0]!;
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j]!;
      row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length]!;
}

/** Closest known topic slugs for a typo, best first. */
export function suggestTags(tag: string, known: readonly string[], limit = 3): string[] {
  return known
    .map((slug) => ({ slug, score: slug.includes(tag) || tag.includes(slug) ? 0 : levenshtein(tag, slug) }))
    .filter(({ score }) => score <= Math.max(2, Math.floor(tag.length / 3)))
    .sort((a, b) => a.score - b.score || a.slug.localeCompare(b.slug))
    .slice(0, limit)
    .map(({ slug }) => slug);
}

/** Error messages for tags that don't exist in `topics.yml`; empty when all are fine. */
export function validateTags(tags: readonly string[], known: readonly string[]): string[] {
  if (tags.length === 0) return ["At least one tag is required."];
  const knownSet = new Set(known);
  return tags
    .filter((tag) => !knownSet.has(tag))
    .map((tag) => {
      const suggestions = suggestTags(tag, known);
      return `Unknown tag \`${tag}\`${suggestions.length ? ` (did you mean ${suggestions.map((s) => `\`${s}\``).join(", ")}?)` : ""}.`;
    });
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  middot: "·",
  bull: "•",
  copy: "©",
  reg: "®",
  trade: "™",
};

export function decodeEntities(text: string): string {
  return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === "#") {
      const code = entity[1]?.toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

function tidy(value: string | undefined): string | undefined {
  const text = value === undefined ? undefined : decodeEntities(value).replace(/\s+/g, " ").trim();
  return text || undefined;
}

function attributes(tag: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
    result[match[1]!.toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return result;
}

/** Reads Open Graph / Twitter / standard meta tags, falling back to `<title>`. */
export function parseHtmlMeta(html: string, baseUrl?: string): PageMeta {
  const headEnd = html.search(/<\/head>/i);
  const head = headEnd === -1 ? html : html.slice(0, headEnd);
  const meta = new Map<string, string>();
  for (const [tag] of head.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = attributes(tag);
    const key = (attrs.property ?? attrs.name ?? attrs.itemprop)?.toLowerCase();
    if (key && attrs.content !== undefined && !meta.has(key)) meta.set(key, attrs.content);
  }
  const titleTag = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const pick = (...keys: string[]) => keys.map((key) => tidy(meta.get(key))).find(Boolean);

  let image = pick("og:image:secure_url", "og:image", "twitter:image", "twitter:image:src");
  if (image && baseUrl) {
    try {
      image = new URL(image, baseUrl).href;
    } catch {
      image = undefined;
    }
  }
  return {
    title: pick("og:title", "twitter:title") ?? tidy(titleTag),
    description: pick("og:description", "description", "twitter:description"),
    image,
  };
}

/** ISO timestamp without milliseconds, matching the existing data files. */
export function isoNow(now: Date = new Date()): string {
  return now.toISOString().replace(/\.\d{3}Z$/, "Z");
}

export interface BuildOptions {
  kind: Kind;
  url: string;
  tags: string[];
  meta: PageMeta;
  date: string;
  title?: string;
  description?: string;
}

/** Builds the entry in the same key order the data files already use. */
export function buildEntry({ kind, url, tags, meta, date, title, description }: BuildOptions): Entry {
  const finalTitle = tidy(title) ?? meta.title;
  if (!finalTitle) throw new Error("Could not find a title for this page; pass one with --title.");
  const finalDescription = tidy(description) ?? meta.description;

  if (kind === "video") {
    const type = videoType(url);
    if (!type) throw new Error("Only YouTube and Vimeo links can be added as videos.");
    // YouTube thumbnails are derived from the video id at build time; Vimeo needs the URL stored.
    const image = type === "vimeo" ? meta.image : undefined;
    return { url, title: finalTitle, ...(image ? { image } : {}), tags, date, type };
  }
  if (kind === "service") {
    return { title: finalTitle, url, description: finalDescription ?? "", date, tags };
  }
  return { url, title: finalTitle, ...(finalDescription ? { description: finalDescription } : {}), date, tags };
}

/**
 * Inserts entries at the top of a JSON array file without re-serialising the rest of it, so
 * existing hand formatting (e.g. inline tag arrays) is left untouched.
 */
export function insertJsonEntries(text: string, entries: readonly Entry[]): string {
  if (entries.length === 0) return text;
  const open = text.indexOf("[");
  if (open === -1) throw new Error("Expected the data file to contain a JSON array.");
  const rest = text.slice(open + 1);
  const isEmpty = /^\s*\]/.test(rest);
  const block = entries
    .map((entry) =>
      JSON.stringify(entry, null, 2)
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n"),
    )
    .join(",\n");
  if (isEmpty) return `${text.slice(0, open)}[\n${block}\n]${rest.replace(/^\s*\]/, "")}`;
  return `${text.slice(0, open)}[\n${block},${rest.replace(/^[ \t]*(\r?\n)?/, "\n")}`;
}

/** Same idea for the YAML list: the new items are dumped on their own and prepended as text. */
export function insertYamlEntries(text: string, entries: readonly Entry[]): string {
  if (entries.length === 0) return text;
  const block = dumpYaml(entries, { lineWidth: -1, noRefs: true });
  const frontMatter = text.match(/^---[ \t]*\r?\n/);
  if (frontMatter) return `${frontMatter[0]}${block}${text.slice(frontMatter[0].length)}`;
  if (/^\s*(\[\s*\])?\s*$/.test(text)) return `---\n${block}`;
  return `${block}${text}`;
}

export interface LinkRequest {
  url: string;
  tags: string[];
}

/**
 * Parses a list of links, one per line. Each line may carry its own tags after the URL
 * (`https://example.com privacy, open-source`); otherwise `defaultTags` apply. Blank lines,
 * markdown bullets and `_No response_` placeholders are ignored.
 */
export function parseLinkLines(text: string, defaultTags: readonly string[] = []): LinkRequest[] {
  const requests: LinkRequest[] = [];
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/^\s*(?:[-*+]|\d+[.)])\s+/, "").trim();
    const match = line.match(/<?(https?:\/\/[^\s<>]+?)>?(?:\s+(.*))?$/i);
    if (!match) continue;
    const ownTags = parseTags(match[2]?.replace(/^[-–—:|]\s*/, ""));
    requests.push({ url: match[1]!, tags: ownTags.length ? ownTags : [...defaultTags] });
  }
  return requests;
}

/** Splits a GitHub issue-form body (`### Label` sections) into label → value. */
export function parseIssueForm(body: string): Record<string, string> {
  const fields: Record<string, string> = {};
  const sections = body.replace(/\r\n/g, "\n").split(/^###\s+/m).slice(1);
  for (const section of sections) {
    const newline = section.indexOf("\n");
    const label = (newline === -1 ? section : section.slice(0, newline)).trim();
    const value = newline === -1 ? "" : section.slice(newline + 1).trim();
    fields[label] = value === "_No response_" || value === "None" ? "" : value;
  }
  return fields;
}

/** Maps the issue form's dropdown labels (or CLI values) to a kind; `undefined` means auto-detect. */
export function parseKind(value: string | undefined): Kind | undefined {
  const text = value?.trim().toLowerCase() ?? "";
  if (!text || text.startsWith("auto")) return undefined;
  if (text.startsWith("stor") || text.startsWith("article")) return "story";
  if (text.startsWith("video")) return "video";
  if (text.startsWith("service") || text.startsWith("tool")) return "service";
  throw new Error(`Unknown kind "${value}". Use one of: ${KINDS.join(", ")}.`);
}
