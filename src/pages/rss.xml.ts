import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getContentGraph } from "@/lib/content-graph";
import { channelData, entryFeedItem } from "@/lib/feed-items";
import { newestFirst } from "@/lib/feed";
import { SITE } from "@/lib/site";

/** How many of the newest posts + snippets the "everything" feed carries. */
const LIMIT = 50;

/** The "subscribe to everything" feed: posts and snippets together, newest first. */
export const GET: APIRoute = async (context) => {
  const site = (context.site?.href ?? SITE.url).replace(/\/$/, "");
  const graph = await getContentGraph();
  const entries = newestFirst([...graph.posts, ...graph.snippets].filter((entry) => !entry.draft), LIMIT);
  const items = await Promise.all(entries.map((entry) => entryFeedItem(entry, site)));
  const title = `${SITE.title} — everything`;

  return rss({
    title,
    description: SITE.description,
    site,
    items,
    customData: channelData(site, title),
    trailingSlash: true,
  });
};
