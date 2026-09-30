import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getContentGraph } from "@/lib/content-graph";
import { channelData, entryFeedItem } from "@/lib/feed-items";
import { newestFirst } from "@/lib/feed";
import { SITE } from "@/lib/site";

/** Every published snippet with its full content; the <guid> is the absolute snippet URL. */
export const GET: APIRoute = async (context) => {
  const site = (context.site?.href ?? SITE.url).replace(/\/$/, "");
  const graph = await getContentGraph();
  const snippets = newestFirst(graph.snippets.filter((snippet) => !snippet.draft));
  const items = await Promise.all(snippets.map((snippet) => entryFeedItem(snippet, site)));

  return rss({
    title: "Snippets RSS Feed",
    description: "Small, copy-pasteable code snippets by Abhith Rajan — C#, SQL Server, PowerShell, Git, JavaScript and more.",
    site,
    items,
    customData: channelData(site, "Snippets RSS Feed"),
    trailingSlash: true,
  });
};
