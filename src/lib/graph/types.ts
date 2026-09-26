/**
 * Framework-agnostic shapes used by the content graph. Nothing in `src/lib/graph/*` may import
 * `astro:content`, so these helpers can be unit-tested with Vitest and reused by Node scripts.
 */

/** Anything that can be related to something else by tags. */
export interface GraphItem {
  id: string;
  tags: readonly string[];
  date: Date;
}

/** A renderable entry (post or snippet) with its own page. */
export interface EntryItem extends GraphItem {
  url: string;
  title: string;
  /** Comma-separated author names, as written in frontmatter. */
  author: string;
}

export interface AuthorLike {
  name: string;
}

export interface TopicDefinition {
  slug: string;
  title: string;
  description?: string;
  image?: string;
}

export interface TopicCounts {
  totalPosts: number;
  totalSnippets: number;
  totalStories: number;
  totalVideos: number;
  totalServices: number;
}

export interface TopicSummary extends TopicDefinition, TopicCounts {
  /** `false` when the slug is used by content but missing from `topics.yml`. */
  defined: boolean;
}

export interface RelatedSet<P, S, St, V, T> {
  articles: P[];
  snippets: S[];
  stories: St[];
  videos: V[];
  tools: T[];
}

export type RelatedMode = "ranked" | "legacy";

export interface GraphNode {
  id: string;
  type: "topic" | "post" | "snippet";
  label: string;
  url: string;
  /** Topic slug used for colouring (topic itself, or the first tag of a post/snippet). */
  group: string;
  weight: number;
}

export interface GraphLink {
  source: string;
  target: string;
}
