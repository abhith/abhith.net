import type { GraphItem, RelatedSet } from "./types";

/** Maximum number of related items per type (same limits as the Gatsby site). */
export const RELATED_LIMITS = {
  articles: 6,
  snippets: 6,
  stories: 6,
  videos: 3,
  tools: 2,
} as const;

export interface RelatedSources<P, S, St, V, T> {
  articles: readonly P[];
  snippets: readonly S[];
  stories: readonly St[];
  videos: readonly V[];
  tools: readonly T[];
}

type Picker = <I extends GraphItem>(tags: readonly string[], items: readonly I[], limit: number, excludeId?: string) => I[];

/**
 * Legacy selection: the first `limit` items (in list order) sharing at least one tag.
 * Exact port of the filters in `gatsby/node/createPages.js`.
 */
export const pickLegacy: Picker = (tags, items, limit, excludeId) =>
  items.filter((item) => item.id !== excludeId && tags.some((tag) => item.tags.includes(tag))).slice(0, limit);

/** Number of tags shared between `tags` and `item`. */
export function sharedTagCount(tags: readonly string[], item: GraphItem): number {
  let score = 0;
  for (const tag of new Set(tags)) if (item.tags.includes(tag)) score++;
  return score;
}

/**
 * Ranked selection: items sharing the most tags first, then newest first, then list order.
 */
export const pickRanked: Picker = (tags, items, limit, excludeId) =>
  items
    .map((item, index) => ({ item, index, score: item.id === excludeId ? 0 : sharedTagCount(tags, item) }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.item.date.getTime() - a.item.date.getTime() || a.index - b.index)
    .slice(0, limit)
    .map((candidate) => candidate.item);

function relatedWith<P extends GraphItem, S extends GraphItem, St extends GraphItem, V extends GraphItem, T extends GraphItem>(
  pick: Picker,
  entry: GraphItem,
  sources: RelatedSources<P, S, St, V, T>,
): RelatedSet<P, S, St, V, T> {
  const { tags, id } = entry;
  return {
    articles: pick(tags, sources.articles, RELATED_LIMITS.articles, id),
    snippets: pick(tags, sources.snippets, RELATED_LIMITS.snippets, id),
    stories: pick(tags, sources.stories, RELATED_LIMITS.stories),
    videos: pick(tags, sources.videos, RELATED_LIMITS.videos),
    tools: pick(tags, sources.tools, RELATED_LIMITS.tools),
  };
}

/**
 * Exact Gatsby algorithm. Callers must pass lists in Gatsby order: articles and
 * stories/videos/tools newest first. The entry itself is excluded by `id`.
 */
export function legacyRelated<P extends GraphItem, S extends GraphItem, St extends GraphItem, V extends GraphItem, T extends GraphItem>(
  entry: GraphItem,
  sources: RelatedSources<P, S, St, V, T>,
): RelatedSet<P, S, St, V, T> {
  return relatedWith(pickLegacy, entry, sources);
}

/** Relevance-ranked variant used by the site (shared-tag count, then date). */
export function rankRelated<P extends GraphItem, S extends GraphItem, St extends GraphItem, V extends GraphItem, T extends GraphItem>(
  entry: GraphItem,
  sources: RelatedSources<P, S, St, V, T>,
): RelatedSet<P, S, St, V, T> {
  return relatedWith(pickRanked, entry, sources);
}
