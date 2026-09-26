/**
 * Progressive enhancements for article pages: image zoom and lazy Mermaid rendering.
 * Both libraries are dynamically imported, so pages without images/diagrams load nothing.
 */
let zoom: { detach: () => void } | undefined;

async function enhanceImages() {
  zoom?.detach();
  zoom = undefined;
  const images = document.querySelectorAll<HTMLImageElement>("[data-article-body] img:not([data-no-zoom])");
  if (images.length === 0) return;
  const { default: mediumZoom } = await import("medium-zoom");
  zoom = mediumZoom([...images], { margin: 24, background: "color-mix(in oklab, var(--bg) 92%, transparent)" });
}

async function renderMermaid() {
  const blocks = document.querySelectorAll<HTMLElement>("pre.mermaid:not([data-processed])");
  if (blocks.length === 0) return;
  const { default: mermaid } = await import("mermaid");
  const theme = document.documentElement.dataset.theme === "midnight" ? "dark" : "neutral";
  mermaid.initialize({ startOnLoad: false, theme, securityLevel: "strict" });
  await mermaid.run({ nodes: [...blocks] });
}

document.addEventListener("astro:page-load", () => {
  void enhanceImages();
  void renderMermaid();
});
