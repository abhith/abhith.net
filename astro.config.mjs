// @ts-check
import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import embeds from "astro-embed/integration";
import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkEmoji from "remark-emoji";
import { rehypeFigureCaption } from "./src/plugins/rehype-figure-caption.ts";
import { remarkMermaid } from "./src/plugins/remark-mermaid.ts";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.ts";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://www.abhith.net",
  output: "static",
  trailingSlash: "always",
  // Keep HTML-aware whitespace handling (Astro 7 defaults to JSX rules).
  compressHTML: true,
  build: {
    format: "directory",
  },
  markdown: {
    processor: unified({
      gfm: true,
      smartypants: true,
      remarkPlugins: [remarkMermaid, remarkEmoji, remarkReadingTime],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: { className: ["heading-anchor"], ariaHidden: "true", tabIndex: -1 },
            content: { type: "text", value: "#" },
          },
        ],
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["nofollow", "noopener"] },
        ],
        rehypeFigureCaption,
      ],
    }),
  },
  // Order matters: embeds and Expressive Code must be registered before MDX.
  integrations: [
    embeds(),
    expressiveCode(),
    mdx(),
    react(),
    // Drafts are never built in production, so only published pages end up here.
    sitemap({ filter: (page) => !/\/(404|og)\//.test(new URL(page).pathname) }),
    pagefind(),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Mermaid is a large, lazily imported chunk used by a single post.
      chunkSizeWarningLimit: 3000,
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          // Astro-internal "use astro:head-inject" directive in every MDX module: harmless noise.
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
          defaultHandler(warning);
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
