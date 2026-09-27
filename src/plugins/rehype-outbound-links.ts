import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";
import { withRef, type RefOptions } from "../lib/outbound";

/**
 * Where a Markdown file lives on the site, used as the UTM campaign/content of its outbound links:
 * `content/blog/<slug>/index.mdx` → blog/<slug>, `content/snippets/git/foo.md` → snippets/foo,
 * `content/pages/about.md` → about, `pages/donate.mdx` → donate.
 */
export function refFor(path: string | undefined): RefOptions {
  const file = (path ?? "").replace(/\\/g, "/");
  const blog = file.match(/\/content\/blog\/([^/]+)\//);
  if (blog) return { campaign: "blog", content: blog[1] };
  const snippet = file.match(/\/content\/snippets\/(?:.+\/)?([^/]+?)(?:\/index)?\.mdx?$/);
  if (snippet) return { campaign: "snippets", content: snippet[1] };
  const page = file.match(/\/(?:content\/)?pages\/([^/]+?)\.mdx?$/);
  if (page) return { campaign: page[1] };
  return { campaign: "site" };
}

/** Adds `utm_source=abhith.net` & co. to every outbound link in Markdown/MDX content. */
export function rehypeOutboundLinks() {
  return (tree: Root, file: VFile) => {
    const ref = refFor(file.path ?? file.history[0]);
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "a" || typeof node.properties.href !== "string") return;
      node.properties.href = withRef(node.properties.href, ref);
    });
  };
}
