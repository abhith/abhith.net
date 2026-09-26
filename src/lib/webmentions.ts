/**
 * Build-time webmentions from webmention.io (replaces gatsby-plugin-webmention).
 * All mentions for the domain are fetched once per build and grouped by target path.
 * Without `WEBMENTIONS_TOKEN` the fetch is skipped with a single warning.
 */
import { SITE } from "./site";

export interface Webmention {
  id: number;
  type: "like" | "repost" | "reply" | "mention" | "bookmark";
  url: string;
  published?: string;
  author: { name: string; url?: string; photo?: string };
  content?: string;
}

interface Jf2Entry {
  "wm-id": number;
  "wm-target": string;
  "wm-property": string;
  "wm-private"?: boolean;
  url: string;
  published?: string | null;
  "wm-received"?: string;
  author?: { name?: string; url?: string; photo?: string };
  content?: { text?: string };
}

const TYPE_FOR: Record<string, Webmention["type"]> = {
  "like-of": "like",
  "repost-of": "repost",
  "in-reply-to": "reply",
  "mention-of": "mention",
  "bookmark-of": "bookmark",
};

/** `https://www.abhith.net/blog/foo` → `/blog/foo/` */
export function targetPath(target: string): string {
  try {
    const path = new URL(target).pathname;
    return path.endsWith("/") ? path : `${path}/`;
  } catch {
    return target;
  }
}

let cache: Promise<Map<string, Webmention[]>> | undefined;

async function load(): Promise<Map<string, Webmention[]>> {
  const byPath = new Map<string, Webmention[]>();
  const token = process.env.WEBMENTIONS_TOKEN ?? import.meta.env.WEBMENTIONS_TOKEN;
  if (!token) {
    console.warn("[webmentions] WEBMENTIONS_TOKEN not set — skipping webmention fetch.");
    return byPath;
  }
  const domain = new URL(SITE.url).hostname;
  const url = `https://webmention.io/api/mentions.jf2?domain=${domain}&token=${token}&per-page=10000`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { children = [] } = (await response.json()) as { children?: Jf2Entry[] };
    for (const entry of children) {
      if (entry["wm-private"]) continue;
      const path = targetPath(entry["wm-target"]);
      const list = byPath.get(path) ?? [];
      list.push({
        id: entry["wm-id"],
        type: TYPE_FOR[entry["wm-property"]] ?? "mention",
        url: entry.url,
        published: entry.published ?? entry["wm-received"],
        author: { name: entry.author?.name || "Someone", url: entry.author?.url, photo: entry.author?.photo },
        content: entry.content?.text,
      });
      byPath.set(path, list);
    }
  } catch (error) {
    console.warn(`[webmentions] fetch failed, continuing without mentions: ${(error as Error).message}`);
  }
  return byPath;
}

export async function webmentionsFor(path: string): Promise<Webmention[]> {
  cache ??= load();
  return (await cache).get(path) ?? [];
}
