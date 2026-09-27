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

/** Number of tags shared between `tags` and `item`. */
export function sharedTagCount(tags: readonly string[], item: GraphItem): number {
  let score = 0;
  for (const tag of new Set(tags)) if (item.tags.includes(tag)) score++;
  return score;
}

/**
 * Ranked selection: items sharing the most tags first, then newest first, then list order.
 */
export const pickRanked = <I extends GraphItem>(tags: readonly string[], items: readonly I[], limit: number, excludeId?: string): I[] =>
  items
    .map((item, index) => ({ item, index, score: item.id === excludeId ? 0 : sharedTagCount(tags, item) }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.item.date.getTime() - a.item.date.getTime() || a.index - b.index)
    .slice(0, limit)
    .map((candidate) => candidate.item);

/** Related content per type, ranked by shared-tag count, then date. The entry itself is excluded by `id`. */
export function rankRelated<P extends GraphItem, S extends GraphItem, St extends GraphItem, V extends GraphItem, T extends GraphItem>(
  entry: GraphItem,
  sources: RelatedSources<P, S, St, V, T>,
): RelatedSet<P, S, St, V, T> {
  const { tags, id } = entry;
  return {
    articles: pickRanked(tags, sources.articles, RELATED_LIMITS.articles, id),
    snippets: pickRanked(tags, sources.snippets, RELATED_LIMITS.snippets, id),
    stories: pickRanked(tags, sources.stories, RELATED_LIMITS.stories),
    videos: pickRanked(tags, sources.videos, RELATED_LIMITS.videos),
    tools: pickRanked(tags, sources.tools, RELATED_LIMITS.tools),
  };
}
