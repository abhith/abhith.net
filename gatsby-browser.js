import "./src/styles/all.scss";

require("prismjs/themes/prism-tomorrow.min.css");

export const onRouteUpdate = async () => {
  const elements = document.querySelectorAll(".language-mermaid");
  if (elements.length > 0) {
    const { default: mermaid } = await import("mermaid");
    mermaid.initialize({ startOnLoad: false });
    elements.forEach((element) => {
      const parent = element.parentElement;
      if (parent && parent.tagName === "PRE") {
        const div = document.createElement("div");
        div.className = "mermaid";
        div.textContent = element.textContent;
        parent.replaceWith(div);
      }
    });
    await mermaid.run();
  }
};
