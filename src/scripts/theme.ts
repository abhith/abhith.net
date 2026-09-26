import { THEMES, THEME_STORAGE_KEY, type ThemeName } from "@/lib/themes";

export const currentTheme = (): ThemeName => (document.documentElement.dataset.theme as ThemeName | undefined) ?? "paper";

export const isTheme = (value: string): value is ThemeName => (THEMES as readonly string[]).includes(value);

/** Applies and persists a theme, then notifies listeners (Giscus, graph, labels) via `ws:theme`. */
export function setTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // storage may be unavailable (private mode); the theme still applies for this page view
  }
  document.dispatchEvent(new CustomEvent<ThemeName>("ws:theme", { detail: theme }));
}

export const nextTheme = (): ThemeName => THEMES[(THEMES.indexOf(currentTheme()) + 1) % THEMES.length];
