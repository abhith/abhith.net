import { sortBy, startCase } from "lodash-es";
import type { TopicCounts, TopicDefinition, TopicSummary } from "./types";

export interface TopicCountInputs {
  /** Tags of every published post. */
  posts: ReadonlyArray<readonly string[]>;
  /** Topics of every published snippet. */
  snippets: ReadonlyArray<readonly string[]>;
  stories: ReadonlyArray<readonly string[]>;
  videos: ReadonlyArray<readonly string[]>;
  services: ReadonlyArray<readonly string[]>;
}

const COUNT_KEYS = {
  posts: "totalPosts",
  snippets: "totalSnippets",
  stories: "totalStories",
  videos: "totalVideos",
  services: "totalServices",
} as const satisfies Record<keyof TopicCountInputs, keyof TopicCounts>;

/** Equivalent of a GraphQL `group(field: tags)`: slug → count, ordered by slug. */
function groupByTag(lists: ReadonlyArray<readonly string[]>): Array<[string, number]> {
  const counts = new Map<string, number>();
  for (const tags of lists) for (const tag of new Set(tags)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
}

/**
 * Merges per-type tag counts with the topic definitions from `topics.yml`.
 * Mirrors `createPages.js`: topics are created in the order posts → snippets → stories →
 * videos → services, undefined topics get a `startCase(slug)` title, and the final list is
 * sorted by title (lodash `sortBy`, i.e. code-unit order, stable).
 */
export function mergeTopicCounts(inputs: TopicCountInputs, definitions: readonly TopicDefinition[]): TopicSummary[] {
  const bySlug = new Map<string, TopicCounts>();
  for (const type of Object.keys(COUNT_KEYS) as Array<keyof TopicCountInputs>) {
    for (const [slug, count] of groupByTag(inputs[type])) {
      let topic = bySlug.get(slug);
      if (!topic) {
        topic = { totalPosts: 0, totalSnippets: 0, totalStories: 0, totalVideos: 0, totalServices: 0 };
        bySlug.set(slug, topic);
      }
      topic[COUNT_KEYS[type]] = count;
    }
  }

  const defs = new Map(definitions.map((definition) => [definition.slug, definition]));
  const topics: TopicSummary[] = [...bySlug.entries()].map(([slug, counts]) => {
    const definition = defs.get(slug);
    return definition
      ? { ...counts, ...definition, slug, defined: true }
      : { ...counts, slug, title: startCase(slug), defined: false };
  });
  return sortBy(topics, (topic) => topic.title);
}

export const totalItems = (topic: TopicCounts) =>
  topic.totalPosts + topic.totalSnippets + topic.totalStories + topic.totalVideos + topic.totalServices;
