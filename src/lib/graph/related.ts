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

/** Number of topics shared between `topics` and `item`. */
export function sharedTopicCount(topics: readonly string[], item: GraphItem): number {
  let score = 0;
  for (const topic of new Set(topics)) if (item.topics.includes(topic)) score++;
  return score;
}

/**
 * Ranked selection: items sharing the most topics first, then newest first, then list order.
 */
export const pickRanked = <I extends GraphItem>(topics: readonly string[], items: readonly I[], limit: number, excludeId?: string): I[] =>
  items
    .map((item, index) => ({ item, index, score: item.id === excludeId ? 0 : sharedTopicCount(topics, item) }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.item.date.getTime() - a.item.date.getTime() || a.index - b.index)
    .slice(0, limit)
    .map((candidate) => candidate.item);

/** Related content per type, ranked by shared-topic count, then date. The entry itself is excluded by `id`. */
export function rankRelated<P extends GraphItem, S extends GraphItem, St extends GraphItem, V extends GraphItem, T extends GraphItem>(
  entry: GraphItem,
  sources: RelatedSources<P, S, St, V, T>,
): RelatedSet<P, S, St, V, T> {
  const { topics, id } = entry;
  return {
    articles: pickRanked(topics, sources.articles, RELATED_LIMITS.articles, id),
    snippets: pickRanked(topics, sources.snippets, RELATED_LIMITS.snippets, id),
    stories: pickRanked(topics, sources.stories, RELATED_LIMITS.stories),
    videos: pickRanked(topics, sources.videos, RELATED_LIMITS.videos),
    tools: pickRanked(topics, sources.tools, RELATED_LIMITS.tools),
  };
}
