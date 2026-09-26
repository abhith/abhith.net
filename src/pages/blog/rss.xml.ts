import rss from "@astrojs/rss";
import { getContainerRenderer } from "@astrojs/mdx/container-renderer";
import type { APIRoute } from "astro";
import { loadRenderers } from "astro:container";
import { render } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContentGraph } from "@/lib/content-graph";
import { SITE } from "@/lib/site";

/** Makes root-relative URLs absolute and drops scripts/styles, so feed readers get clean HTML. */
function feedHtml(html: string, site: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/\s(href|src)="\/(?!\/)/g, ` $1="${site}/`)
    .replace(/\ssrcset="[^"]*"/g, "");
}

/** Same channel title, links and GUIDs as the Gatsby feed (`gatsby-plugin-feed`); drafts excluded. */
export const GET: APIRoute = async (context) => {
  const site = (context.site?.href ?? SITE.url).replace(/\/$/, "");
  const graph = await getContentGraph();
  const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

  const items = await Promise.all(
    graph.posts
      .filter((post) => !post.draft)
      .map(async (post) => {
        let content: string | undefined;
        try {
          const { Content } = await render(post.entry);
          content = feedHtml(await container.renderToString(Content), site);
        } catch {
          content = undefined; // fall back to the description only
        }
        return {
          title: post.title,
          description: post.description,
          pubDate: post.date,
          link: post.url,
          author: post.author,
          categories: [...post.tags],
          content,
        };
      }),
  );

  return rss({
    title: "Blog posts RSS Feed",
    description: SITE.description,
    site,
    // The generated <guid> is the absolute post URL, identical to the Gatsby feed.
    items,
    customData: `<language>en</language><image><url>${site}/img/site/brand/icon.png</url><title>Blog posts RSS Feed</title><link>${site}</link></image>`,
    trailingSlash: true,
  });
};
