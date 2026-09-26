/**
 * The single source of truth for relations between content: pages, feeds, search, the
 * knowledge graph and OG images all read from `getContentGraph()`.
 *
 * All logic lives in the pure helpers under `./graph`; this module only maps Astro content
 * collection entries to plain view models and memoizes the result per build.
 */
import type { ImageMetadata } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { buildContentGraph, type ContentGraph, type EntryItem, type GraphItem, youtubeId } from "./graph";
import { IS_PROD } from "./site";

export interface Post extends EntryItem {
  kind: "post";
  /** Folder name, e.g. `azure-web-app-missing-mime-types`. */
  slug: string;
  description: string;
  lastModified: Date;
  /** `true` when `lastModificationTime` is set and differs from the publish date. */
  updated: boolean;
  hero?: ImageMetadata;
  draft: boolean;
  authorURL?: string;
  /** Giscus discussion term (legacy `commentId`, falling back to the page path). */
  commentId: string;
  /** Path of the source file relative to the repo root (for "edit on GitHub"). */
  sourcePath: string;
  entry: CollectionEntry<"blog">;
}

export interface Snippet extends EntryItem {
  kind: "snippet";
  /** Folder name (= first-level category), e.g. `git`. */
  category: string;
  slug: string;
  description: string;
  lastModified: Date;
  updated: boolean;
  draft: boolean;
  sourcePath: string;
  entry: CollectionEntry<"snippets">;
}

export interface Story extends GraphItem {
  url: string;
  title: string;
  description?: string;
}

export interface Video extends GraphItem {
  url: string;
  title: string;
  description?: string;
  image?: string;
  type: "youtube" | "vimeo";
  youtubeId?: string;
}

export interface Tool extends GraphItem {
  url: string;
  title: string;
  description: string;
  image?: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar: ImageMetadata;
  twitter?: string;
  featured: boolean;
}

export type SiteGraph = ContentGraph<Post, Snippet, Story, Video, Tool, Author>;

const visible = ({ data }: { data: { draft: boolean } }) => !IS_PROD || !data.draft;
const sameDay = (a: Date, b: Date) => a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);

function toPost(entry: CollectionEntry<"blog">): Post {
  const { data } = entry;
  const url = `/blog/${entry.id}/`;
  const lastModified = data.lastModificationTime ?? data.date;
  return {
    kind: "post",
    id: entry.id,
    slug: entry.id,
    url,
    title: data.title,
    description: data.description,
    author: data.author,
    authorURL: data.authorURL,
    date: data.date,
    lastModified,
    updated: !sameDay(lastModified, data.date),
    tags: data.tags,
    hero: data.image,
    draft: data.draft,
    commentId: data.commentId ?? url,
    sourcePath: entry.filePath ?? `src/content/blog/${entry.id}/index.mdx`,
    entry,
  };
}

function toSnippet(entry: CollectionEntry<"snippets">): Snippet {
  const { data } = entry;
  const [category, slug] = entry.id.split("/");
  const lastModified = data.lastModificationTime ?? data.date;
  return {
    kind: "snippet",
    id: entry.id,
    category,
    slug,
    url: `/snippets/${entry.id}/`,
    title: data.title,
    description: data.description,
    author: data.author,
    date: data.date,
    lastModified,
    updated: !sameDay(lastModified, data.date),
    tags: data.topics,
    draft: data.draft,
    sourcePath: entry.filePath ?? `src/content/snippets/${entry.id}.mdx`,
    entry,
  };
}

async function loadGraph(): Promise<SiteGraph> {
  const [blog, snippets, stories, videos, services, authors, topics] = await Promise.all([
    getCollection("blog", visible),
    getCollection("snippets", visible),
    getCollection("stories"),
    getCollection("videos"),
    getCollection("services"),
    getCollection("authors"),
    getCollection("topics"),
  ]);

  return buildContentGraph<Post, Snippet, Story, Video, Tool, Author>({
    posts: blog.map(toPost),
    snippets: snippets.map(toSnippet),
    stories: stories.map(({ id, data }) => ({ id, ...data })),
    videos: videos.map(({ id, data }) => ({ id, ...data, youtubeId: data.type === "youtube" ? youtubeId(data.url) : undefined })),
    tools: services.map(({ id, data }) => ({ id, ...data })),
    authors: authors.map(({ id, data }) => ({ id, ...data })),
    topicDefinitions: topics.map(({ data }) => data),
  });
}

let graphPromise: Promise<SiteGraph> | undefined;

/** Memoized for the whole production build; rebuilt on every call in dev so edits show up. */
export function getContentGraph(): Promise<SiteGraph> {
  if (!IS_PROD) return loadGraph();
  graphPromise ??= loadGraph();
  return graphPromise;
}
