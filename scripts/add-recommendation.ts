/**
 * Adds recommended stories, videos and services from nothing but a URL and topics.
 *
 *   npm run add -- <url...> --topics privacy,open-source [--kind story|video|service] [--dry-run]
 *
 * Metadata comes from YouTube/Vimeo oEmbed or the page's Open Graph tags; entries are written
 * at the top of the matching data file. Run `npm run add -- --help` for every option.
 */
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { dump as dumpYaml, load as parseYaml } from "js-yaml";
import {
  buildEntry,
  cleanUrl,
  detectKind,
  type Entry,
  insertJsonEntries,
  insertYamlEntries,
  isoNow,
  type Kind,
  type LinkRequest,
  type PageMeta,
  parseHtmlMeta,
  parseIssueForm,
  parseKind,
  parseLinkLines,
  parseTopics,
  urlKey,
  validateTopics,
  videoType,
} from "./recommendations/lib.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const TOPICS_FILE = `${ROOT}src/content/topics/topics.yml`;
const FILES: Record<Kind, { path: string; format: "json" | "yaml" }> = {
  story: { path: `${ROOT}src/content/data/stories.json`, format: "json" },
  video: { path: `${ROOT}src/content/data/videos.json`, format: "json" },
  service: { path: `${ROOT}src/content/recommended/services/services.yml`, format: "yaml" },
};
const USER_AGENT = "Mozilla/5.0 (compatible; abhith.net-recommendations; +https://abhith.net)";

const HELP = `Add recommended stories, videos and services from a URL.

Usage:
  npm run add -- <url> [<url>...] --topics <topic,topic> [options]

Options:
  -t, --topics <list>      Topic slugs from src/content/topics/topics.yml (comma or space separated)
  -k, --kind <kind>        story | video | service (default: videos for YouTube/Vimeo, else story)
      --title <text>       Override the fetched title (single URL only)
      --description <text> Override the fetched description (single URL only)
      --date <iso>         Use this date instead of now
  -n, --dry-run            Print the entries instead of writing them
      --allow-new-topics   Accept topics that aren't in topics.yml yet
      --issue-body <text>  Read links, kind and topics from an "Add recommendation" issue form
      --report <file>      Append a markdown summary to this file (e.g. $GITHUB_STEP_SUMMARY)
  -h, --help               Show this help

Words after a URL are that URL's own topics (npm run add -- <url> ai <url> privacy,git);
--topics applies to URLs without their own. The old --tags / --allow-new-tags names still work.`;

interface Result {
  added: Array<{ kind: Kind; entry: Entry }>;
  skipped: Array<{ url: string; reason: string }>;
  failed: Array<{ url: string; reason: string }>;
}

async function fetchWithTimeout(url: string, accept: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: accept, "Accept-Language": "en;q=0.9,*;q=0.5" },
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`${new URL(url).hostname} responded with HTTP ${response.status}`);
  return response;
}

async function fetchOEmbed(url: string): Promise<PageMeta> {
  const endpoint =
    videoType(url) === "vimeo"
      ? `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`
      : `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`;
  const data = (await (await fetchWithTimeout(endpoint, "application/json")).json()) as Record<string, unknown>;
  const text = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : undefined);
  return { title: text(data.title), description: text(data.description), image: text(data.thumbnail_url) };
}

async function fetchPageMeta(url: string): Promise<PageMeta> {
  const response = await fetchWithTimeout(url, "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5");
  const type = response.headers.get("content-type") ?? "";
  if (type && !/html|xml/i.test(type)) throw new Error(`Expected an HTML page but got ${type.split(";")[0]}`);
  return parseHtmlMeta(await response.text(), response.url || url);
}

function knownTopics(): string[] {
  const topics = parseYaml(readFileSync(TOPICS_FILE, "utf8")) as Array<{ slug?: unknown }>;
  return topics.map((topic) => String(topic.slug ?? "")).filter(Boolean);
}

/** url key → "stories.json" etc., across all data files so a link is never listed twice. */
function existingUrls(): Map<string, string> {
  const seen = new Map<string, string>();
  for (const { path, format } of Object.values(FILES)) {
    const text = readFileSync(path, "utf8");
    const items = (format === "json" ? JSON.parse(text) : parseYaml(text)) as Array<{ url?: unknown }> | null;
    for (const item of items ?? []) {
      if (typeof item.url === "string") seen.set(urlKey(item.url), relative(ROOT, path));
    }
  }
  return seen;
}

function writeEntries(added: Result["added"]): void {
  for (const [kind, { path, format }] of Object.entries(FILES) as Array<[Kind, (typeof FILES)[Kind]]>) {
    const entries = added.filter((item) => item.kind === kind).map((item) => item.entry);
    if (entries.length === 0) continue;
    const text = readFileSync(path, "utf8");
    writeFileSync(path, format === "json" ? insertJsonEntries(text, entries) : insertYamlEntries(text, entries));
  }
}

function markdownReport({ added, skipped, failed }: Result, dryRun: boolean): string {
  const lines: string[] = [];
  if (added.length) {
    lines.push(dryRun ? "#### Would add" : "#### Added", "");
    for (const { kind, entry } of added) {
      lines.push(`- **${kind}** [${entry.title.replace(/[[\]]/g, "\\$&")}](${entry.url}) — ${entry.topics.map((topic) => `\`${topic}\``).join(", ")}`);
    }
    lines.push("");
  }
  if (skipped.length) {
    lines.push("#### Skipped", "", ...skipped.map(({ url, reason }) => `- ${url} — ${reason}`), "");
  }
  if (failed.length) {
    lines.push("#### Failed", "", ...failed.map(({ url, reason }) => `- ${url} — ${reason}`), "");
  }
  return lines.length ? lines.join("\n") : "Nothing to add.\n";
}

async function main(): Promise<number> {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      topics: { type: "string", short: "t", multiple: true },
      // Deprecated aliases of --topics / --allow-new-topics, kept so older commands keep working.
      tags: { type: "string", multiple: true },
      kind: { type: "string", short: "k" },
      title: { type: "string" },
      description: { type: "string" },
      date: { type: "string" },
      "dry-run": { type: "boolean", short: "n", default: false },
      "allow-new-topics": { type: "boolean", default: false },
      "allow-new-tags": { type: "boolean", default: false },
      "issue-body": { type: "string" },
      report: { type: "string" },
      help: { type: "boolean", short: "h", default: false },
    },
  });
  if (values.help) {
    console.log(HELP);
    return 0;
  }

  let kindInput = values.kind;
  let title = values.title;
  let allowNewTopics = values["allow-new-topics"] || values["allow-new-tags"];
  let requests: LinkRequest[];
  if (values["issue-body"] !== undefined) {
    // Labels match .github/ISSUE_TEMPLATE/add_recommendation.yml.
    const form = parseIssueForm(values["issue-body"]);
    kindInput ??= form["Kind"];
    title ??= form["Title"] || undefined;
    allowNewTopics ||= /^- \[x\] allow (topics|tags)/im.test(form["Options"] ?? "");
    // `Tags` is the label used by issues filed before the rename.
    requests = parseLinkLines(form["Links"] ?? "", parseTopics(form["Topics"] ?? form["Tags"]));
  } else {
    // `url1 topic topic url2 topic` → one line per URL, so words after a URL become its own topics.
    const defaultTopics = parseTopics([...(values.topics ?? []), ...(values.tags ?? [])]);
    requests = parseLinkLines(positionals.join(" ").replace(/\s+(?=https?:\/\/)/gi, "\n"), defaultTopics);
  }

  if (requests.length === 0) {
    console.error("No URLs given.\n");
    console.error(HELP);
    return 2;
  }
  if (requests.length > 1 && (title || values.description)) {
    console.error("--title/--description can only be used with a single URL.");
    return 2;
  }
  const requestedKind = parseKind(kindInput);
  const baseDate = values.date ? new Date(values.date) : new Date();
  if (Number.isNaN(baseDate.getTime())) {
    console.error(`Invalid --date: ${values.date}`);
    return 2;
  }

  const topics = knownTopics();
  const seen = existingUrls();
  const result: Result = { added: [], skipped: [], failed: [] };

  for (const [index, request] of requests.entries()) {
    let url: string;
    try {
      url = cleanUrl(request.url);
    } catch {
      result.failed.push({ url: request.url, reason: "not a valid http(s) URL" });
      continue;
    }
    const duplicateOf = seen.get(urlKey(url));
    if (duplicateOf) {
      result.skipped.push({ url, reason: `already in \`${duplicateOf}\`` });
      continue;
    }
    const topicErrors = allowNewTopics && request.topics.length ? [] : validateTopics(request.topics, topics);
    if (topicErrors.length) {
      result.failed.push({ url, reason: topicErrors.join(" ") });
      continue;
    }

    const kind = detectKind(url, requestedKind);
    let meta: PageMeta = {};
    try {
      meta = kind === "video" ? await fetchOEmbed(url) : await fetchPageMeta(url);
    } catch (error) {
      if (!title) {
        result.failed.push({ url, reason: `could not fetch metadata (${(error as Error).message}); retry with a title` });
        continue;
      }
      console.warn(`! ${url}: could not fetch metadata, using the given title (${(error as Error).message})`);
    }

    try {
      // Later links get slightly older timestamps so the order you listed them in is kept.
      const date = isoNow(new Date(baseDate.getTime() - index * 60_000));
      const entry = buildEntry({ kind, url, topics: request.topics, meta, date, title, description: values.description });
      result.added.push({ kind, entry });
      seen.set(urlKey(url), relative(ROOT, FILES[kind].path));
    } catch (error) {
      result.failed.push({ url, reason: (error as Error).message });
    }
  }

  const dryRun = values["dry-run"];
  if (!dryRun) writeEntries(result.added);

  for (const { kind, entry } of result.added) {
    const target = relative(ROOT, FILES[kind].path);
    console.log(`${dryRun ? "~" : "+"} ${kind} → ${target}`);
    if (dryRun) {
      const preview = FILES[kind].format === "json" ? JSON.stringify(entry, null, 2) : dumpYaml([entry], { lineWidth: -1 }).trimEnd();
      console.log(preview.replace(/^/gm, "    "));
    } else {
      console.log(`    ${entry.title}`);
    }
  }
  for (const { url, reason } of result.skipped) console.log(`= ${url}: ${reason.replace(/`/g, "")}`);
  for (const { url, reason } of result.failed) console.error(`✗ ${url}: ${reason.replace(/`/g, "")}`);

  if (values.report) appendFileSync(values.report, markdownReport(result, dryRun));
  return result.failed.length ? 1 : 0;
}

main().then(
  (code) => {
    process.exitCode = code;
  },
  (error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 2;
  },
);
