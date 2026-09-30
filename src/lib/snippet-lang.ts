/**
 * Snippet languages: the glyph shown next to a snippet and the `?lang=` filter on `/snippets/`.
 * A snippet's language comes from its `language` frontmatter, else the first fenced code block,
 * else its category folder. Every spelling (`cs`, `c#`, `csharp`) resolves to one canonical id.
 */
import { topicHue } from "./graph/color";

export interface Language {
  /** Canonical id, used in `?lang=` and `data-lang`. */
  id: string;
  label: string;
  /** Two or three characters, like an editor file icon. */
  glyph: string;
  /** HSL hue; lightness and saturation come from the theme (same as topic tokens). */
  hue: number;
}

interface LanguageDefinition extends Omit<Language, "id"> {
  aliases: readonly string[];
}

const DEFINITIONS: Record<string, LanguageDefinition> = {
  csharp: { label: "C#", glyph: "C#", hue: 275, aliases: ["cs", "c#", "c-sharp", "dotnet"] },
  javascript: { label: "JavaScript", glyph: "JS", hue: 48, aliases: ["js", "jsx", "mjs", "cjs", "node"] },
  typescript: { label: "TypeScript", glyph: "TS", hue: 210, aliases: ["ts", "tsx", "mts"] },
  bash: { label: "Bash", glyph: "sh", hue: 130, aliases: ["sh", "shell", "zsh", "console", "shellscript", "linux", "git"] },
  powershell: { label: "PowerShell", glyph: "PS", hue: 225, aliases: ["ps", "ps1", "pwsh"] },
  sql: { label: "SQL", glyph: "SQL", hue: 20, aliases: ["tsql", "mssql", "sql-server", "postgres", "postgresql", "mysql"] },
  python: { label: "Python", glyph: "Py", hue: 200, aliases: ["py"] },
  json: { label: "JSON", glyph: "{}", hue: 35, aliases: ["jsonc", "json5"] },
  yaml: { label: "YAML", glyph: "YML", hue: 0, aliases: ["yml"] },
  xml: { label: "XML", glyph: "XML", hue: 15, aliases: ["web-config", "config", "csproj"] },
  html: { label: "HTML", glyph: "<>", hue: 12, aliases: ["htm"] },
  css: { label: "CSS", glyph: "CSS", hue: 250, aliases: ["scss", "sass", "less"] },
  razor: { label: "Razor", glyph: "@", hue: 290, aliases: ["cshtml"] },
  docker: { label: "Dockerfile", glyph: "DK", hue: 195, aliases: ["dockerfile"] },
  bicep: { label: "Bicep", glyph: "Bi", hue: 185, aliases: [] },
  go: { label: "Go", glyph: "Go", hue: 190, aliases: ["golang"] },
};

/** Fences that aren't source code and never decide a snippet's language. */
const NON_CODE_FENCES: ReadonlySet<string> = new Set(["mermaid", "text", "txt", "plaintext", "plain", "output", "log", "diff", "ansi"]);

const ALIASES = new Map<string, string>(
  Object.entries(DEFINITIONS).flatMap(([id, definition]) => [[id, id] as const, ...definition.aliases.map((alias) => [alias, id] as const)]),
);

/** Canonical id for any spelling: `CS` → `csharp`; unknown names are lower-cased and kept. */
export function languageId(name: string): string {
  const key = name.trim().toLowerCase();
  return ALIASES.get(key) ?? key;
}

/** `true` when the language has a hand-picked glyph and colour in the registry. */
export function isKnownLanguage(name: string): boolean {
  return languageId(name) in DEFINITIONS;
}

/** Display data for a language; unknown languages get an upper-cased glyph and a hashed hue. */
export function language(name: string): Language {
  const id = languageId(name);
  const definition = DEFINITIONS[id];
  if (definition) return { id, label: definition.label, glyph: definition.glyph, hue: definition.hue };
  return { id, label: id, glyph: id.slice(0, 3).toUpperCase(), hue: topicHue(id) };
}

const FENCE = /^ {0,3}(?:`{3,}|~{3,})[ \t]*([^\s`{]+)/gm;

/** Language of the first fenced code block in a Markdown/MDX body, skipping diagrams and output. */
export function detectFenceLanguage(body: string): string | undefined {
  for (const [, info] of body.matchAll(FENCE)) {
    const id = languageId(info);
    if (!NON_CODE_FENCES.has(id)) return id;
  }
  return undefined;
}

/** Frontmatter override → first code fence → category folder. */
export function snippetLanguage(snippet: { language?: string; body?: string; category: string }): Language {
  return language(snippet.language ?? detectFenceLanguage(snippet.body ?? "") ?? snippet.category);
}

/** The `?lang=` value from a query string, resolved to a canonical id (`?lang=cs` → `csharp`). */
export function langFromSearch(search: string): string | undefined {
  const value = new URLSearchParams(search).get("lang");
  return value && value.trim() ? languageId(value) : undefined;
}

/** Languages in use with their snippet counts, most used first, then by label. */
export function languageCounts(snippets: readonly { language: Language }[]): Array<{ language: Language; count: number }> {
  const counts = new Map<string, { language: Language; count: number }>();
  for (const { language: lang } of snippets) {
    const current = counts.get(lang.id);
    if (current) current.count += 1;
    else counts.set(lang.id, { language: lang, count: 1 });
  }
  return [...counts.values()].sort((a, b) => b.count - a.count || a.language.label.localeCompare(b.language.label));
}
