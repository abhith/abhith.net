import { describe, expect, it } from "vitest";
import { byDateDesc } from "./build";
import * as fx from "./fixtures";
import { pickRanked, rankRelated, RELATED_LIMITS, sharedTagCount } from "./related";
import type { GraphItem } from "./types";

const sources = {
  articles: byDateDesc(fx.posts),
  snippets: byDateDesc(fx.snippets),
  stories: byDateDesc(fx.stories),
  videos: byDateDesc(fx.videos),
  tools: byDateDesc(fx.tools),
};
const ids = (items: GraphItem[]) => items.map((item) => item.id);
const mimeTypes = fx.posts[0];

describe("rankRelated", () => {
  it("applies the Gatsby limits", () => {
    const many: GraphItem[] = Array.from({ length: 20 }, (_, i) => ({ id: `x${i}`, tags: ["azure"], date: new Date(2020, 0, i + 1) }));
    const related = rankRelated(mimeTypes, { articles: many, snippets: many, stories: many, videos: many, tools: many });
    expect(related.articles).toHaveLength(RELATED_LIMITS.articles);
    expect(related.snippets).toHaveLength(6);
    expect(related.stories).toHaveLength(6);
    expect(related.videos).toHaveLength(3);
    expect(related.tools).toHaveLength(2);
  });

  it("relates snippets to each other through topics", () => {
    const related = rankRelated(fx.snippets[0], sources);
    expect(ids(related.snippets)).toEqual(["git/prune-branches"]);
    expect(related.articles).toEqual([]);
  });

  it("returns nothing for an entry whose tags match nothing", () => {
    const related = rankRelated(fx.posts[2], sources);
    expect(Object.values(related).every((list) => list.length === 0)).toBe(true);
  });

  it("counts shared tags once per tag", () => {
    expect(sharedTagCount(["azure", "azure", "iis"], { id: "s", tags: ["azure", "iis"], date: new Date() })).toBe(2);
  });

  it("prefers items sharing more tags over newer ones", () => {
    const related = rankRelated(mimeTypes, sources);
    expect(ids(related.stories)).toEqual(["story-3", "story-1"]);
  });

  it("breaks score ties by date (newest first), then list order", () => {
    const items: GraphItem[] = [
      { id: "old", tags: ["a"], date: new Date("2019-01-01") },
      { id: "new", tags: ["a"], date: new Date("2021-01-01") },
      { id: "same-date", tags: ["a"], date: new Date("2021-01-01") },
    ];
    expect(ids(pickRanked(["a"], items, 10))).toEqual(["new", "same-date", "old"]);
  });

  it("ranks an older item sharing more tags above a newer one", () => {
    const items: GraphItem[] = [
      { id: "x1", tags: ["a"], date: new Date("2022-01-01") },
      { id: "x2", tags: ["a", "b"], date: new Date("2020-01-01") },
    ];
    expect(ids(pickRanked(["a", "b"], items, 6))).toEqual(["x2", "x1"]);
  });

  it("excludes the entry itself", () => {
    expect(ids(rankRelated(mimeTypes, sources).articles)).not.toContain(mimeTypes.id);
  });
});
