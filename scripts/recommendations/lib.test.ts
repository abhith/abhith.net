import { load as parseYaml } from "js-yaml";
import { describe, expect, it } from "vitest";
import {
  buildEntry,
  cleanUrl,
  decodeEntities,
  detectKind,
  insertJsonEntries,
  insertYamlEntries,
  isoNow,
  parseHtmlMeta,
  parseIssueForm,
  parseKind,
  parseLinkLines,
  parseTopics,
  urlKey,
  validateTopics,
} from "./lib.ts";

describe("detectKind", () => {
  it("sends video hosts to videos and everything else to stories", () => {
    expect(detectKind("https://youtu.be/c3XMAz--_Us")).toBe("video");
    expect(detectKind("https://vimeo.com/76979871")).toBe("video");
    expect(detectKind("https://github.blog/some-post/")).toBe("story");
    expect(detectKind("https://forminit.com/", "service")).toBe("service");
  });
});

describe("cleanUrl / urlKey", () => {
  it("drops tracking parameters and fragments but keeps meaningful ones", () => {
    expect(cleanUrl("https://example.com/post?utm_source=x&utm_medium=y&id=3#comments")).toBe("https://example.com/post?id=3");
    expect(cleanUrl("https://github.com/dotnet/aspire?ref=main")).toBe("https://github.com/dotnet/aspire?ref=main");
  });

  it("canonicalises YouTube links", () => {
    expect(cleanUrl("https://youtu.be/c3XMAz--_Us?si=abc")).toBe("https://www.youtube.com/watch?v=c3XMAz--_Us");
    expect(cleanUrl("https://m.youtube.com/shorts/abcdefghijk")).toBe("https://www.youtube.com/watch?v=abcdefghijk");
  });

  it("rejects non-http URLs", () => {
    expect(() => cleanUrl("mailto:someone@example.com")).toThrow();
    expect(() => cleanUrl("not a url")).toThrow();
  });

  it("treats cosmetic URL differences as the same link", () => {
    expect(urlKey("https://www.forminit.com/?utm_source=x")).toBe(urlKey("http://forminit.com"));
    expect(urlKey("https://youtu.be/c3XMAz--_Us")).toBe(urlKey("https://www.youtube.com/watch?v=c3XMAz--_Us&t=10"));
    expect(urlKey("https://example.com/a")).not.toBe(urlKey("https://example.com/b"));
  });
});

describe("topics", () => {
  const known = ["privacy", "open-source", "developer-tools", "git", "github"];

  it("parses comma or space separated lists", () => {
    expect(parseTopics("Privacy, open-source  #git,,privacy")).toEqual(["privacy", "open-source", "git"]);
    expect(parseTopics(["ai", "git, github"])).toEqual(["ai", "git", "github"]);
    expect(parseTopics(undefined)).toEqual([]);
  });

  it("reports unknown topics with suggestions", () => {
    expect(validateTopics(["privacy", "git"], known)).toEqual([]);
    expect(validateTopics([], known)).toEqual(["At least one topic is required."]);
    const [error] = validateTopics(["developer-tool"], known);
    expect(error).toContain("`developer-tool`");
    expect(error).toContain("`developer-tools`");
  });
});

describe("parseHtmlMeta", () => {
  it("prefers Open Graph tags and resolves relative images", () => {
    const html = `<!doctype html><html><head>
      <title>Fallback | Site</title>
      <meta name="description" content="Plain description">
      <meta content="OG &amp; title" property="og:title" />
      <meta property='og:description' content='OG description &#8212; with   spaces'>
      <meta property="og:image" content="/img/cover.png">
    </head><body><meta property="og:title" content="ignored"></body></html>`;
    expect(parseHtmlMeta(html, "https://example.com/post/")).toEqual({
      title: "OG & title",
      description: "OG description — with spaces",
      image: "https://example.com/img/cover.png",
    });
  });

  it("falls back to <title> and meta description", () => {
    const html = `<head><title>\n  Hello &lt;World&gt;  </title><meta name="Description" content="Desc"></head>`;
    expect(parseHtmlMeta(html)).toEqual({ title: "Hello <World>", description: "Desc", image: undefined });
  });

  it("decodes numeric and named entities", () => {
    expect(decodeEntities("It&#39;s &quot;fine&quot; &#x2014; &unknown;")).toBe(`It's "fine" — &unknown;`);
  });
});

describe("buildEntry", () => {
  const date = "2026-09-27T14:56:00Z";

  it("builds stories, omitting an empty description", () => {
    expect(buildEntry({ kind: "story", url: "https://a.dev/", topics: ["git"], meta: { title: "A" }, date })).toEqual({
      url: "https://a.dev/",
      title: "A",
      date,
      topics: ["git"],
    });
  });

  it("builds services with a description field and in the YAML key order", () => {
    const entry = buildEntry({ kind: "service", url: "https://a.dev/", topics: ["git"], meta: { title: "A", description: "D" }, date });
    expect(Object.keys(entry)).toEqual(["title", "url", "description", "date", "topics"]);
  });

  it("stores thumbnails only for Vimeo", () => {
    const meta = { title: "V", image: "https://i.vimeocdn.com/x.jpg" };
    expect(buildEntry({ kind: "video", url: "https://www.youtube.com/watch?v=c3XMAz--_Us", topics: ["ai"], meta, date })).toEqual({
      url: "https://www.youtube.com/watch?v=c3XMAz--_Us",
      title: "V",
      topics: ["ai"],
      date,
      type: "youtube",
    });
    expect(buildEntry({ kind: "video", url: "https://vimeo.com/76979871", topics: ["ai"], meta, date })).toMatchObject({
      type: "vimeo",
      image: meta.image,
    });
  });

  it("lets overrides win and fails without any title", () => {
    expect(buildEntry({ kind: "story", url: "https://a.dev/", topics: ["git"], meta: { title: "A" }, date, title: " B " }).title).toBe("B");
    expect(() => buildEntry({ kind: "story", url: "https://a.dev/", topics: ["git"], meta: {}, date })).toThrow(/title/);
    expect(() => buildEntry({ kind: "video", url: "https://a.dev/", topics: ["git"], meta: { title: "A" }, date })).toThrow(/YouTube/);
  });
});

describe("insertJsonEntries", () => {
  const existing = `[\n  {\n    "url": "https://old.dev/",\n    "title": "Old",\n    "topics": [ "git" ]\n  }\n]\n`;

  it("prepends entries and leaves the rest of the file byte-for-byte intact", () => {
    const entries = [
      { url: "https://new.dev/", title: "New", date: "2026-09-27T00:00:00Z", topics: ["ai"] },
      { url: "https://newer.dev/", title: "Newer", date: "2026-09-27T00:00:00Z", topics: ["ai"] },
    ];
    const result = insertJsonEntries(existing, entries);
    expect(result.endsWith(existing.slice(2))).toBe(true);
    expect(JSON.parse(result).map((item: { url: string }) => item.url)).toEqual(["https://new.dev/", "https://newer.dev/", "https://old.dev/"]);
    expect(result).toContain(`  {\n    "url": "https://new.dev/",\n    "title": "New",`);
  });

  it("handles an empty array and no-op inserts", () => {
    const entry = { url: "https://new.dev/", title: "New", date: "2026-09-27T00:00:00Z", topics: ["ai"] };
    expect(JSON.parse(insertJsonEntries("[]\n", [entry]))).toEqual([entry]);
    expect(insertJsonEntries(existing, [])).toBe(existing);
  });
});

describe("insertYamlEntries", () => {
  const existing = `---\n- title: Old\n  url: https://old.dev/\n  description: "Quoted: kept as is"\n  date: "2024-11-11T13:30:28.263Z"\n  topics:\n    - git\n`;

  it("prepends entries after the document marker and keeps dates as strings", () => {
    const entry = { title: "New: tool", url: "https://new.dev/", description: "", date: "2026-09-27T00:00:00Z", topics: ["ai"] };
    const result = insertYamlEntries(existing, [entry]);
    expect(result.startsWith("---\n- title: 'New: tool'\n")).toBe(true);
    expect(result.endsWith(existing.slice(4))).toBe(true);
    const parsed = parseYaml(result) as Array<Record<string, unknown>>;
    expect(parsed[0]).toEqual(entry);
    expect(parsed[1]?.title).toBe("Old");
  });
});

describe("parseLinkLines / parseIssueForm / parseKind", () => {
  it("reads one link per line with optional per-line topics", () => {
    const text = "- https://a.dev/ privacy, git\n\nnot a link\n2. <https://b.dev/post>\nhttps://c.dev — ai";
    expect(parseLinkLines(text, ["default"])).toEqual([
      { url: "https://a.dev/", topics: ["privacy", "git"] },
      { url: "https://b.dev/post", topics: ["default"] },
      { url: "https://c.dev", topics: ["ai"] },
    ]);
  });

  it("parses GitHub issue-form bodies", () => {
    const body = "### Links\n\nhttps://a.dev/\nhttps://b.dev/ ai\n\n### Kind\n\nAuto-detect\n\n### Topics\n\ngit, github\n\n### Title\n\n_No response_";
    const form = parseIssueForm(body);
    expect(form).toEqual({ Links: "https://a.dev/\nhttps://b.dev/ ai", Kind: "Auto-detect", Topics: "git, github", Title: "" });
    expect(parseLinkLines(form.Links!, parseTopics(form.Topics))).toEqual([
      { url: "https://a.dev/", topics: ["git", "github"] },
      { url: "https://b.dev/", topics: ["ai"] },
    ]);
  });

  it("maps dropdown labels to kinds", () => {
    expect(parseKind("Auto-detect")).toBeUndefined();
    expect(parseKind(undefined)).toBeUndefined();
    expect(parseKind("Story / article")).toBe("story");
    expect(parseKind("Video (YouTube or Vimeo)")).toBe("video");
    expect(parseKind("Service / tool")).toBe("service");
    expect(() => parseKind("podcast")).toThrow(/Unknown kind/);
  });
});

describe("isoNow", () => {
  it("drops milliseconds", () => {
    expect(isoNow(new Date("2026-09-27T14:56:12.345Z"))).toBe("2026-09-27T14:56:12Z");
  });
});
