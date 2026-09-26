import { describe, expect, it } from "vitest";
import * as fx from "./fixtures";
import { mergeTopicCounts, totalItems } from "./topics";

const topics = mergeTopicCounts(
  {
    posts: fx.posts.map((p) => p.tags),
    snippets: fx.snippets.map((s) => s.tags),
    stories: fx.stories.map((s) => s.tags),
    videos: fx.videos.map((v) => v.tags),
    services: fx.tools.map((t) => t.tags),
  },
  fx.topicDefinitions,
);
const bySlug = (slug: string) => topics.find((topic) => topic.slug === slug);

describe("mergeTopicCounts", () => {
  it("creates a topic for every tag used by any content type", () => {
    expect(topics).toHaveLength(16);
  });

  it("counts every content type per topic", () => {
    expect(bySlug("iis")).toMatchObject({ totalPosts: 3, totalSnippets: 1, totalStories: 1, totalVideos: 0, totalServices: 0 });
    expect(bySlug("docker")).toMatchObject({ totalPosts: 2, totalSnippets: 0, totalStories: 1, totalVideos: 1, totalServices: 0 });
    expect(bySlug("developer-tools")).toMatchObject({ totalPosts: 0, totalServices: 2 });
    expect(totalItems(bySlug("docker")!)).toBe(4);
  });

  it("merges definitions from topics.yml", () => {
    expect(bySlug("aks")).toMatchObject({ title: "Azure Kubernetes Service", image: "aks.png", defined: true });
    expect(bySlug("docker")?.description).toBe("Containers everywhere.");
  });

  it("falls back to lodash startCase for undefined topics", () => {
    expect(bySlug("web-config")).toMatchObject({ title: "Web Config", defined: false });
    expect(bySlug("year-in-review")?.title).toBe("Year In Review");
    expect(bySlug("github-copilot")?.title).toBe("Github Copilot");
  });

  it("keeps topics that only exist in stories, videos or services", () => {
    expect(bySlug("privacy")).toMatchObject({ totalPosts: 0, totalVideos: 1 });
    expect(bySlug("github-copilot")).toMatchObject({ totalPosts: 0, totalStories: 1 });
  });

  it("sorts by title using code-unit order (lodash sortBy)", () => {
    expect(topics.map((topic) => topic.title)).toEqual([
      "Azure",
      "Azure DevOps",
      "Azure Kubernetes Service",
      "Cookbook",
      "Css",
      "Developer Tools",
      "Docker",
      "Git",
      "Github Copilot",
      "IIS",
      "Linux",
      "Open Source",
      "Powershell",
      "Privacy",
      "Web Config",
      "Year In Review",
    ]);
  });

  it("counts a tag once per item even if repeated", () => {
    const [topic] = mergeTopicCounts({ posts: [["a", "a"]], snippets: [], stories: [], videos: [], services: [] }, []);
    expect(topic.totalPosts).toBe(1);
  });
});
