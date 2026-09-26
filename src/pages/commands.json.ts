import type { APIRoute } from "astro";
import { getContentGraph } from "@/lib/content-graph";
import type { PaletteEntry } from "@/lib/palette";

/** Static pages the palette can `cd` into (in addition to every post, snippet and topic). */
const PAGES: PaletteEntry[] = [
  { t: "home", u: "/", k: "page" },
  { t: "blog", u: "/blog/", k: "page" },
  { t: "snippets", u: "/snippets/", k: "page" },
  { t: "topics", u: "/topics/", k: "page" },
  { t: "recommended", u: "/recommended/", k: "page" },
  { t: "recommended stories", u: "/recommended/stories/", k: "page" },
  { t: "recommended videos", u: "/recommended/videos/", k: "page" },
  { t: "recommended services", u: "/recommended/services/", k: "page" },
  { t: "knowledge graph", u: "/graph/", k: "page" },
  { t: "about", u: "/about/", k: "page" },
  { t: "contact", u: "/contact/", k: "page" },
  { t: "donate", u: "/donate/", k: "page" },
  { t: "privacy policy", u: "/privacy-policy/", k: "page" },
];

export const GET: APIRoute = async () => {
  const graph = await getContentGraph();
  const entries: PaletteEntry[] = [
    ...PAGES,
    ...graph.posts.map((post) => ({ t: post.title, u: post.url, k: "post" as const, g: post.tags.slice(0, 4) })),
    ...graph.snippets.map((snippet) => ({ t: snippet.title, u: snippet.url, k: "snippet" as const, g: snippet.tags.slice(0, 4) })),
    ...graph.topics.map((topic) => ({ t: topic.title, u: `/topics/${topic.slug}/`, k: "topic" as const })),
    ...graph.topics.filter((topic) => topic.totalSnippets > 0).map((topic) => ({ t: `${topic.title} snippets`, u: `/snippets/${topic.slug}/`, k: "page" as const })),
  ];
  return new Response(JSON.stringify(entries), { headers: { "Content-Type": "application/json; charset=utf-8" } });
};
