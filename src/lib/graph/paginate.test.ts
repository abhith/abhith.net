import { describe, expect, it } from "vitest";
import { pageUrl, paginate, paginatedPaths } from "./paginate";

const items = Array.from({ length: 21 }, (_, i) => i + 1);

describe("pageUrl", () => {
  it("omits the number for page 1 and always ends with a slash", () => {
    expect(pageUrl("/blog", 1)).toBe("/blog/");
    expect(pageUrl("/blog/", 2)).toBe("/blog/2/");
    expect(pageUrl("/snippets/git", 3)).toBe("/snippets/git/3/");
  });
});

describe("paginate", () => {
  it("creates ceil(n / pageSize) pages", () => {
    const pages = paginate(items, "/blog", 10);
    expect(pages.map((page) => page.items.length)).toEqual([10, 10, 1]);
    expect(pages.map((page) => page.url)).toEqual(["/blog/", "/blog/2/", "/blog/3/"]);
    expect(pages.every((page) => page.totalPages === 3 && page.totalItems === 21)).toBe(true);
  });

  it("links pages to their neighbours", () => {
    const [first, second, last] = paginate(items, "/blog");
    expect(first.prevUrl).toBeUndefined();
    expect(first.nextUrl).toBe("/blog/2/");
    expect(second.prevUrl).toBe("/blog/");
    expect(last.nextUrl).toBeUndefined();
  });

  it("handles page boundaries exactly", () => {
    expect(paginate(items.slice(0, 10), "/x")).toHaveLength(1);
    expect(paginate(items.slice(0, 11), "/x")).toHaveLength(2);
  });

  it("produces no pages for an empty list (gatsby-awesome-pagination behaviour)", () => {
    expect(paginate([], "/x")).toEqual([]);
  });

  it("rejects an invalid page size", () => {
    expect(() => paginate(items, "/x", 0)).toThrow();
  });
});

describe("paginatedPaths", () => {
  it("maps page 1 to an undefined rest param", () => {
    expect(paginatedPaths(items, "/blog").map((path) => path.params.page)).toEqual([undefined, "2", "3"]);
  });
});
