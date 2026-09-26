import { describe, expect, it } from "vitest";
import { matchAuthors, parseAuthorNames } from "./authors";
import { authors } from "./fixtures";

describe("parseAuthorNames", () => {
  it("splits, trims and lower-cases comma separated names", () => {
    expect(parseAuthorNames(" Abhith Rajan ,Jane Doe,, ")).toEqual(["abhith rajan", "jane doe"]);
  });
});

describe("matchAuthors", () => {
  it("matches a single author case-insensitively", () => {
    expect(matchAuthors("abhith RAJAN", authors).map((a) => a.slug)).toEqual(["abhith"]);
  });

  it("matches multiple authors in the order of the authors list", () => {
    expect(matchAuthors("Jane Doe, Abhith Rajan", authors).map((a) => a.slug)).toEqual(["abhith", "jane"]);
  });

  it("returns an empty list for unknown authors", () => {
    expect(matchAuthors("Someone Else", authors)).toEqual([]);
  });
});
