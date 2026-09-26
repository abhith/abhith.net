import type { Code, Root } from "mdast";
import { visit } from "unist-util-visit";

/**
 * Turns ```mermaid fences into `<pre class="mermaid">…</pre>` before Expressive Code runs
 * (EC only handles `pre > code`), so the diagram source is rendered lazily on the client.
 */
export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, "code", (node: Code, index, parent) => {
      if (node.lang !== "mermaid" || index === undefined || !parent) return;
      parent.children[index] = {
        type: "paragraph",
        children: [{ type: "text", value: node.value }],
        data: {
          hName: "pre",
          hProperties: { className: ["mermaid"], "data-mermaid": "" },
        },
      };
    });
  };
}
