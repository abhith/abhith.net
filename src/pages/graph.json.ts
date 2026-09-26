import type { APIRoute } from "astro";
import { getContentGraph } from "@/lib/content-graph";
import { topicHue } from "@/lib/graph/color";

/** Nodes and links for the knowledge graph island (posts, snippets and their topics). */
export const GET: APIRoute = async () => {
  const { nodes, links } = (await getContentGraph()).graphData();
  const payload = {
    nodes: nodes.map((node) => ({ ...node, hue: topicHue(node.group) })),
    links,
  };
  return new Response(JSON.stringify(payload), { headers: { "Content-Type": "application/json; charset=utf-8" } });
};
