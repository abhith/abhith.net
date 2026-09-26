import { describe, expect, it } from "vitest";
import { buildContentGraph } from "./build";
import * as fx from "./fixtures";
import { youtubeId } from "./media";

const graph = buildContentGraph({
  posts: fx.posts,
  snippets: fx.snippets,
  stories: fx.stories,
  videos: fx.videos,
  tools: fx.tools,
  authors: fx.authors,
  topicDefinitions: fx.topicDefinitions,
});
const byId = (id: string) => graph.posts.find((post) => post.id === id)!;

describe("buildContentGraph", () => {
  it("sorts posts and snippets newest first", () => {
    expect(graph.posts[0].id).toBe("2021-year-in-review");
    expect(graph.posts.at(-1)?.id).toBe("iis-options-requests-returns-404");
    expect(graph.snippets[0].id).toBe("git/delete-all-local-remote-git-tags");
  });

  it("does not mutate the input arrays", () => {
    expect(fx.posts[0].id).toBe("azure-web-app-missing-mime-types");
  });

  it("returns neighbours with next = newer and previous = older", () => {
    const { next, previous } = graph.neighbours(byId("docker-cookbook"));
    expect(next?.id).toBe("azure-web-app-web-deploy-to-a-sub-folder");
    expect(previous?.id).toBe("azure-web-app-missing-mime-types");
  });

  it("has no next for the newest and no previous for the oldest post", () => {
    expect(graph.neighbours(graph.posts[0]).next).toBeUndefined();
    expect(graph.neighbours(graph.posts.at(-1)!).previous).toBeUndefined();
  });

  it("keeps snippet neighbours within snippets", () => {
    const { next, previous } = graph.neighbours(graph.snippets[0]);
    expect(next).toBeUndefined();
    expect(previous?.id).toBe("git/prune-branches");
  });

  it("resolves authors from the comma separated author field", () => {
    expect(graph.authorsFor(byId("iis-options-requests-returns-404")).map((a) => a.slug)).toEqual(["abhith", "jane"]);
    expect(graph.authorsFor(byId("2021-year-in-review")).map((a) => a.slug)).toEqual(["abhith"]);
  });

  it("returns ranked related content by default and legacy on request", () => {
    const post = byId("azure-web-app-missing-mime-types");
    expect(graph.relatedFor(post).stories.map((s) => s.id)).toEqual(["story-3", "story-1"]);
    expect(graph.relatedFor(post, "legacy").stories.map((s) => s.id)).toEqual(["story-1", "story-3"]);
    expect(graph.relatedFor(post)).toBe(graph.relatedFor(post));
  });

  it("lists all content of a topic newest first", () => {
    const iis = graph.byTopic("iis");
    expect(iis.posts.map((p) => p.id)).toEqual([
      "azure-web-app-web-deploy-to-a-sub-folder",
      "azure-web-app-missing-mime-types",
      "iis-options-requests-returns-404",
    ]);
    expect(iis.snippets.map((s) => s.id)).toEqual(["powershell/iis-app-pools"]);
    expect(iis.stories.map((s) => s.id)).toEqual(["story-3"]);
    expect(graph.topic("iis")?.totalPosts).toBe(3);
  });

  it("builds a consistent graph of posts, snippets and their topics", () => {
    const { nodes, links } = graph.graphData();
    expect(nodes).toHaveLength(21);
    expect(links).toHaveLength(19);
    const nodeIds = new Set(nodes.map((node) => node.id));
    expect(links.every((link) => nodeIds.has(link.source) && nodeIds.has(link.target))).toBe(true);
    expect(nodeIds.has("topic:privacy")).toBe(false);
  });
});

describe("youtubeId", () => {
  it.each([
    ["https://www.youtube.com/watch?v=c3XMAz--_Us", "c3XMAz--_Us"],
    ["https://youtu.be/abcdefghijk", "abcdefghijk"],
    ["https://www.youtube.com/embed/abcdefghijk?start=3", "abcdefghijk"],
    ["https://m.youtube.com/shorts/abcdefghijk", "abcdefghijk"],
    ["https://vimeo.com/12345", undefined],
    ["not a url", undefined],
  ])("%s -> %s", (url, id) => {
    expect(youtubeId(url)).toBe(id);
  });
});
