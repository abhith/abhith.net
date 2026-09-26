// @ts-check
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineEcConfig } from "astro-expressive-code";

/** Maps Expressive Code themes onto the site themes (`html[data-theme]`). */
const SITE_THEME_FOR = {
  "github-light": "paper",
  "github-dark": "midnight",
  "solarized-light": "solar",
};

export default defineEcConfig({
  themes: ["github-light", "github-dark", "solarized-light"],
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => `[data-theme='${SITE_THEME_FOR[/** @type {keyof typeof SITE_THEME_FOR} */ (theme.name)] ?? theme.name}']`,
  plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
  defaultProps: {
    showLineNumbers: false,
    wrap: false,
  },
  shiki: {
    langAlias: {
      cshtml: "razor",
    },
  },
  styleOverrides: {
    borderRadius: "0.6rem",
    borderColor: "var(--line)",
    codeFontFamily: "var(--font-mono)",
    uiFontFamily: "var(--font-sans)",
    codeFontSize: "0.85rem",
    frames: {
      shadowColor: "transparent",
      editorActiveTabIndicatorTopColor: "var(--accent)",
    },
  },
});
