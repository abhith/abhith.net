import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getContentGraph } from "@/lib/content-graph";
import { SITE } from "@/lib/site";

/**
 * Same shape as the Gatsby stories feed: each item links to the story's first topic page and
 * uses the story URL as its GUID.
 */
export const GET: APIRoute = async (context) => {
  const site = (context.site?.href ?? SITE.url).replace(/\/$/, "");
  const { stories } = await getContentGraph();

  return rss({
    title: "Recommended stories RSS Feed",
    description: SITE.description,
    site,
    trailingSlash: true,
    items: stories.map((story) => ({
      title: story.title,
      description: story.description,
      pubDate: story.date,
      link: `/topics/${story.tags[0]}/stories/`,
      categories: [...story.tags],
      customData: `<guid isPermaLink="false">${story.url.replace(/&/g, "&amp;")}</guid><source url="${story.url.replace(/&/g, "&amp;")}">${new URL(story.url).hostname}</source>`,
    })),
  });
};
