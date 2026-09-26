import { matchAuthors } from "./authors";
import { legacyRelated, rankRelated, type RelatedSources } from "./related";
import { mergeTopicCounts } from "./topics";
import type {
  AuthorLike,
  EntryItem,
  GraphItem,
  GraphLink,
  GraphNode,
  RelatedMode,
  RelatedSet,
  TopicDefinition,
  TopicSummary,
} from "./types";

export interface GraphInput<P extends EntryItem, S extends EntryItem, St extends GraphItem, V extends GraphItem, T extends GraphItem, A extends AuthorLike> {
  posts: readonly P[];
  snippets: readonly S[];
  stories: readonly St[];
  videos: readonly V[];
  tools: readonly T[];
  authors: readonly A[];
  topicDefinitions: readonly TopicDefinition[];
}

export interface TopicContent<P, S, St, V, T> {
  posts: P[];
  snippets: S[];
  stories: St[];
  videos: V[];
  tools: T[];
}

export interface ContentGraph<P extends EntryItem, S extends EntryItem, St extends GraphItem, V extends GraphItem, T extends GraphItem, A extends AuthorLike> {
  /** Newest first. */
  posts: P[];
  /** Newest first. */
  snippets: S[];
  stories: St[];
  videos: V[];
  tools: T[];
  authors: A[];
  /** Sorted by title. */
  topics: TopicSummary[];
  topic(slug: string): TopicSummary | undefined;
  relatedFor(entry: P | S, mode?: RelatedMode): RelatedSet<P, S, St, V, T>;
  authorsFor(entry: P | S): A[];
  /** `next` is the newer entry and `previous` the older one (same as the Gatsby templates). */
  neighbours(entry: P | S): { previous?: P | S; next?: P | S };
  byTopic(slug: string): TopicContent<P, S, St, V, T>;
  graphData(): { nodes: GraphNode[]; links: GraphLink[] };
}

/** Newest first; ties keep their input order (Array.prototype.sort is stable). */
export const byDateDesc = <I extends { date: Date }>(items: readonly I[]): I[] =>
  [...items].sort((a, b) => b.date.getTime() - a.date.getTime());

/**
 * Builds the content graph from plain data. Pure and deterministic: the same input always
 * yields the same output, which makes it usable from Astro pages, endpoints, tests and scripts.
 */
export function buildContentGraph<P extends EntryItem, S extends EntryItem, St extends GraphItem, V extends GraphItem, T extends GraphItem, A extends AuthorLike>(
  input: GraphInput<P, S, St, V, T, A>,
): ContentGraph<P, S, St, V, T, A> {
  const posts = byDateDesc(input.posts);
  const snippets = byDateDesc(input.snippets);
  const stories = byDateDesc(input.stories);
  const videos = byDateDesc(input.videos);
  const tools = byDateDesc(input.tools);
  const authors = [...input.authors];

  const topics = mergeTopicCounts(
    {
      posts: posts.map((post) => post.tags),
      snippets: snippets.map((snippet) => snippet.tags),
      stories: stories.map((story) => story.tags),
      videos: videos.map((video) => video.tags),
      services: tools.map((tool) => tool.tags),
    },
    input.topicDefinitions,
  );
  const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));
  const sources: RelatedSources<P, S, St, V, T> = { articles: posts, snippets, stories, videos, tools };

  const relatedCache = new Map<string, RelatedSet<P, S, St, V, T>>();
  const positions = new Map<string, { list: Array<P | S>; index: number }>();
  posts.forEach((post, index) => positions.set(post.url, { list: posts, index }));
  snippets.forEach((snippet, index) => positions.set(snippet.url, { list: snippets, index }));

  return {
    posts,
    snippets,
    stories,
    videos,
    tools,
    authors,
    topics,
    topic: (slug) => topicBySlug.get(slug),

    relatedFor(entry, mode = "ranked") {
      const key = `${mode}:${entry.url}`;
      let related = relatedCache.get(key);
      if (!related) {
        related = mode === "legacy" ? legacyRelated(entry, sources) : rankRelated(entry, sources);
        relatedCache.set(key, related);
      }
      return related;
    },

    authorsFor: (entry) => matchAuthors(entry.author, authors),

    neighbours(entry) {
      const position = positions.get(entry.url);
      if (!position) return {};
      const { list, index } = position;
      return { next: list[index - 1], previous: list[index + 1] };
    },

    byTopic(slug) {
      const has = (item: GraphItem) => item.tags.includes(slug);
      return {
        posts: posts.filter(has),
        snippets: snippets.filter(has),
        stories: stories.filter(has),
        videos: videos.filter(has),
        tools: tools.filter(has),
      };
    },

    graphData() {
      const nodes: GraphNode[] = [];
      const links: GraphLink[] = [];
      const usedTopics = new Set<string>();
      const addEntries = (type: "post" | "snippet", entries: readonly EntryItem[]) => {
        for (const entry of entries) {
          const id = `${type}:${entry.id}`;
          nodes.push({ id, type, label: entry.title, url: entry.url, group: entry.tags[0] ?? "", weight: entry.tags.length });
          for (const tag of new Set(entry.tags)) {
            usedTopics.add(tag);
            links.push({ source: id, target: `topic:${tag}` });
          }
        }
      };
      addEntries("post", posts);
      addEntries("snippet", snippets);
      for (const topic of topics) {
        if (!usedTopics.has(topic.slug)) continue;
        nodes.push({
          id: `topic:${topic.slug}`,
          type: "topic",
          label: topic.title,
          url: `/topics/${topic.slug}/`,
          group: topic.slug,
          weight: topic.totalPosts + topic.totalSnippets,
        });
      }
      return { nodes, links };
    },
  };
}
