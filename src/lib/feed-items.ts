import { getContainerRenderer } from "@astrojs/mdx/container-renderer";
import type { RSSFeedItem } from "@astrojs/rss";
import { loadRenderers } from "astro:container";
import { render } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { Post, Snippet } from "./content-graph";
import { feedHtml } from "./feed";

type Container = Awaited<ReturnType<typeof AstroContainer.create>>;
let containerPromise: Promise<Container> | undefined;

function container(): Promise<Container> {
  containerPromise ??= loadRenderers([getContainerRenderer()]).then((renderers) => AstroContainer.create({ renderers }));
  return containerPromise;
}

/** A post or snippet as a full-content RSS item; the generated `<guid>` is the absolute page URL. */
export async function entryFeedItem(entry: Post | Snippet, site: string): Promise<RSSFeedItem> {
  let content: string | undefined;
  try {
    const { Content } = await render(entry.entry);
    content = feedHtml(await (await container()).renderToString(Content), site);
  } catch {
    content = undefined; // fall back to the description only
  }
  return {
    title: entry.title,
    description: entry.description,
    pubDate: entry.date,
    link: entry.url,
    author: entry.author,
    categories: [...entry.topics],
    content,
  };
}

/** Channel `<language>` + `<image>`, identical across every feed. */
export function channelData(site: string, title: string): string {
  return `<language>en</language><image><url>${site}/img/site/brand/icon.png</url><title>${title}</title><link>${site}</link></image>`;
}
