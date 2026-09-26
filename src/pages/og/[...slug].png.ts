import type { APIRoute, GetStaticPaths } from "astro";
import { getContentGraph } from "@/lib/content-graph";
import { isoDate, plural } from "@/lib/format";
import { renderOgPng, type OgCard } from "@/lib/og";
import { SITE } from "@/lib/site";
import { totalItems } from "@/lib/graph/topics";

/**
 * One PNG per post (`/og/blog/{slug}.png`), snippet (`/og/snippets/{category}/{slug}.png`),
 * topic (`/og/topics/{slug}.png`) and a site-wide default (`/og/default.png`).
 */
export const getStaticPaths = (async () => {
  const graph = await getContentGraph();
  const cards: Array<{ params: { slug: string }; props: { card: OgCard } }> = [
    {
      params: { slug: "default" },
      props: { card: { file: "README.md", path: "~/", title: "Abhith Rajan", description: SITE.description, tags: ["dotnet", "azure", "devops", "web"], meta: "notes · snippets · curated links" } },
    },
    ...graph.posts.map((post) => ({
      params: { slug: `blog/${post.slug}` },
      props: { card: { file: `${post.slug}.mdx`, path: "~/blog", title: post.title, description: post.description, tags: post.tags, meta: isoDate(post.date) } },
    })),
    ...graph.snippets.map((snippet) => ({
      params: { slug: `snippets/${snippet.id}` },
      props: { card: { file: `${snippet.slug}.mdx`, path: `~/snippets/${snippet.category}`, title: snippet.title, description: snippet.description, tags: snippet.tags, meta: isoDate(snippet.date) } },
    })),
    ...graph.topics.map((topic) => ({
      params: { slug: `topics/${topic.slug}` },
      props: {
        card: {
          file: `${topic.slug}.md`,
          path: "~/topics",
          title: topic.title,
          description: topic.description ?? `Posts, snippets, stories, videos and tools about ${topic.title}.`,
          tags: [topic.slug],
          meta: plural(totalItems(topic), "entry", "entries"),
        },
      },
    })),
  ];
  return cards;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng((props as { card: OgCard }).card);
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" } });
};
