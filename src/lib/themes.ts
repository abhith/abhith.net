export const THEMES = ["paper", "midnight", "solar"] as const;
export type ThemeName = (typeof THEMES)[number];
export const THEME_STORAGE_KEY = "ws-theme";

/** Browser `<meta name="theme-color">` per theme (matches `--bg`). */
export const THEME_COLORS: Record<ThemeName, string> = {
  paper: "#f7f5ef",
  midnight: "#0e1116",
  solar: "#fdf6e3",
};
