import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { newestFirst } from "./feed";
import { lastmodByUrl, loadLastmodEntries, type LastmodEntry } from "./sitemap-lastmod";

const d = (iso: string) => new Date(`${iso}T00:00:00Z`);
const entries: LastmodEntry[] = [
  { url: "/blog/old/", section: "/blog/", topics: ["azure", "iis"], lastModified: d("2019-01-01") },
  { url: "/blog/new/", section: "/blog/", topics: ["azure"], lastModified: d("2023-05-30") },
  { url: "/snippets/git/tags/", section: "/snippets/", topics: ["git", "github"], lastModified: d("2022-06-02") },
];

describe("lastmodByUrl", () => {
  const dates = lastmodByUrl(entries);

  it("dates every entry by its own modification time", () => {
    expect(dates.get("/blog/old/")).toEqual(d("2019-01-01"));
    expect(dates.get("/snippets/git/tags/")).toEqual(d("2022-06-02"));
  });

  it("dates listings, topics and the home page by their newest entry", () => {
    expect(dates.get("/")).toEqual(d("2023-05-30"));
    expect(dates.get("/blog/")).toEqual(d("2023-05-30"));
    expect(dates.get("/topics/azure/")).toEqual(d("2023-05-30"));
    expect(dates.get("/topics/iis/")).toEqual(d("2019-01-01"));
    expect(dates.get("/snippets/")).toEqual(d("2022-06-02"));
    expect(dates.get("/snippets/git/")).toEqual(d("2022-06-02"));
    expect(dates.get("/snippets/github/")).toEqual(d("2022-06-02"));
  });

  it("invents no blog-topic listings", () => {
    expect(dates.has("/blog/azure/")).toBe(false);
  });
});

describe("loadLastmodEntries", () => {
  const root = fileURLToPath(new URL("../..", import.meta.url));
  const loaded = loadLastmodEntries(root);

  it("reads published posts and snippets from the repo", () => {
    expect(loaded.some((entry) => entry.url === "/blog/serilog-console-sink-themes/")).toBe(true);
    expect(loaded.some((entry) => entry.url === "/snippets/git/delete-all-local-remote-git-tags/")).toBe(true);
    expect(loaded.every((entry) => !Number.isNaN(entry.lastModified.getTime()))).toBe(true);
  });

  it("skips loose draft files", () => {
    expect(loaded.some((entry) => entry.url.includes("draft-"))).toBe(false);
  });
});

describe("newestFirst", () => {
  it("sorts by date descending and caps the list", () => {
    const items = entries.map((entry) => ({ url: entry.url, date: entry.lastModified }));
    expect(newestFirst(items, 2).map((item) => item.url)).toEqual(["/blog/new/", "/snippets/git/tags/"]);
  });
});
