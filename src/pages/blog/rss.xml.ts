import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getContentGraph } from "@/lib/content-graph";
import { channelData, entryFeedItem } from "@/lib/feed-items";
import { SITE } from "@/lib/site";

/** Same channel title, links and GUIDs as the Gatsby feed (`gatsby-plugin-feed`); drafts excluded. */
export const GET: APIRoute = async (context) => {
  const site = (context.site?.href ?? SITE.url).replace(/\/$/, "");
  const graph = await getContentGraph();
  const items = await Promise.all(graph.posts.filter((post) => !post.draft).map((post) => entryFeedItem(post, site)));

  return rss({
    title: "Blog posts RSS Feed",
    description: SITE.description,
    site,
    // The generated <guid> is the absolute post URL, identical to the Gatsby feed.
    items,
    customData: channelData(site, "Blog posts RSS Feed"),
    trailingSlash: true,
  });
};
