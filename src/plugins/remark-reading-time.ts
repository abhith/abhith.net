import type { Root } from "mdast";
import { toString } from "mdast-util-to-string";
import { readingTime } from "../lib/reading-time";

interface AstroVFileData {
  astro?: { frontmatter?: Record<string, unknown> };
}

/**
 * Computes reading time from the markdown body and exposes it as
 * `remarkPluginFrontmatter.readingTime` (available via `render(entry)`).
 */
export function remarkReadingTime() {
  return (tree: Root, file: { data: AstroVFileData }) => {
    const astro = (file.data.astro ??= {});
    const frontmatter = (astro.frontmatter ??= {});
    frontmatter.readingTime = readingTime(toString(tree));
  };
}
