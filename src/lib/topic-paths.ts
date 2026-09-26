import { getContentGraph } from "./content-graph";
import type { TopicCounts } from "./graph/types";

/** `getStaticPaths` for topic sub-pages, generated only when the topic has items of that type. */
export async function topicPathsWith(count: keyof TopicCounts) {
  const graph = await getContentGraph();
  return graph.topics.filter((topic) => topic[count] > 0).map((topic) => ({ params: { slug: topic.slug }, props: { topic } }));
}
