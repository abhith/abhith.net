import type { Element, ElementContent, Root } from "hast";
import { visit } from "unist-util-visit";

const isWhitespace = (node: ElementContent) => node.type === "text" && node.value.trim() === "";

/**
 * Wraps stand-alone images (a paragraph containing only an image) in a `<figure>` with a
 * `<figcaption>` taken from the image title, falling back to its alt text — mirroring
 * `gatsby-remark-images` with `showCaptions: true`.
 */
export function rehypeFigureCaption() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "p" || index === undefined || !parent) return;
      const children = node.children.filter((child) => !isWhitespace(child));
      if (children.length !== 1) return;
      const img = children[0];
      if (img.type !== "element" || img.tagName !== "img") return;

      const caption = String(img.properties.title ?? img.properties.alt ?? "").trim();
      const figure: Element = {
        type: "element",
        tagName: "figure",
        properties: { className: ["content-figure"] },
        children: caption
          ? [img, { type: "element", tagName: "figcaption", properties: {}, children: [{ type: "text", value: caption }] }]
          : [img],
      };
      parent.children[index] = figure;
    });
  };
}
