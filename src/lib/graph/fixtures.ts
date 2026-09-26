/** Test fixtures modelled on real content (ids, tags and dates taken from the site). */
import type { EntryItem, GraphItem, TopicDefinition } from "./types";

const d = (iso: string) => new Date(iso);

export const posts: EntryItem[] = [
  { id: "azure-web-app-missing-mime-types", url: "/blog/azure-web-app-missing-mime-types/", title: "Azure Web App - Missing Mime Types", author: "Abhith Rajan", date: d("2019-07-11T00:00:00.000Z"), tags: ["azure", "iis", "web-config"] },
  { id: "docker-cookbook", url: "/blog/docker-cookbook/", title: "Docker Cookbook", author: "Abhith Rajan", date: d("2019-12-24T00:00:00.000Z"), tags: ["docker", "cookbook"] },
  { id: "2021-year-in-review", url: "/blog/2021-year-in-review/", title: "2021 Year in Review", author: "abhith rajan", date: d("2021-12-31T00:00:00.000Z"), tags: ["year-in-review"] },
  { id: "azure-web-app-web-deploy-to-a-sub-folder", url: "/blog/azure-web-app-web-deploy-to-a-sub-folder/", title: "Azure Web App - Web Deploy to a Sub Folder", author: "Abhith Rajan", date: d("2020-03-02T00:00:00.000Z"), tags: ["azure", "azure-devops", "iis"] },
  { id: "iis-options-requests-returns-404", url: "/blog/iis-options-requests-returns-404/", title: "IIS - OPTIONS requests returns 404", author: "Abhith Rajan, Jane Doe", date: d("2018-06-01T00:00:00.000Z"), tags: ["iis", "web-config"] },
  { id: "azure-devops-ci-cd-pipeline-involving-helm-3-acr-aks", url: "/blog/azure-devops-ci-cd-pipeline-involving-helm-3-acr-aks/", title: "Azure DevOps CI/CD with Helm 3", author: "Abhith Rajan", date: d("2020-05-01T00:00:00.000Z"), tags: ["azure-devops", "docker", "aks"] },
];

export const snippets: EntryItem[] = [
  { id: "git/delete-all-local-remote-git-tags", url: "/snippets/git/delete-all-local-remote-git-tags/", title: "Delete all local & remote git tags", author: "Abhith Rajan", date: d("2022-06-02T00:00:00.000Z"), tags: ["git"] },
  { id: "linux/curl-dns-timing", url: "/snippets/linux/curl-dns-timing/", title: "curl DNS timing", author: "Abhith Rajan", date: d("2020-09-23T09:26:00.000Z"), tags: ["linux"] },
  { id: "powershell/iis-app-pools", url: "/snippets/powershell/iis-app-pools/", title: "IIS app pools", author: "Abhith Rajan", date: d("2021-01-10T00:00:00.000Z"), tags: ["powershell", "iis"] },
  { id: "git/prune-branches", url: "/snippets/git/prune-branches/", title: "Prune branches", author: "Abhith Rajan", date: d("2021-04-10T00:00:00.000Z"), tags: ["git"] },
];

const story = (n: number, tags: string[], iso: string): GraphItem & { url: string } => ({ id: `story-${n}`, url: `https://example.com/story-${n}`, tags, date: d(iso) });
export const stories = [
  story(1, ["azure"], "2024-01-01T00:00:00Z"),
  story(2, ["docker"], "2023-06-01T00:00:00Z"),
  story(3, ["azure", "iis"], "2022-01-01T00:00:00Z"),
  story(4, ["github-copilot"], "2026-09-25T22:13:00Z"),
];

export const videos = [
  { id: "video-1", url: "https://www.youtube.com/watch?v=c3XMAz--_Us", tags: ["privacy", "open-source"], date: d("2026-09-24T09:17:58Z") },
  { id: "video-2", url: "https://youtu.be/abcdefghijk", tags: ["docker"], date: d("2021-02-01T00:00:00Z") },
];

export const tools = [
  { id: "tool-1", url: "https://forminit.com/", tags: ["developer-tools"], date: d("2026-09-20T13:30:28.263Z") },
  { id: "tool-2", url: "https://colordesigner.io/convert/hextohsl", tags: ["developer-tools", "css"], date: d("2024-11-11T13:30:28.263Z") },
];

export const authors = [
  { name: "Abhith Rajan", slug: "abhith" },
  { name: "Jane Doe", slug: "jane" },
];

export const topicDefinitions: TopicDefinition[] = [
  { slug: "azure", title: "Azure" },
  { slug: "azure-devops", title: "Azure DevOps" },
  { slug: "aks", title: "Azure Kubernetes Service", image: "aks.png" },
  { slug: "docker", title: "Docker", description: "Containers everywhere." },
  { slug: "iis", title: "IIS" },
  { slug: "git", title: "Git" },
];
