/**
 * Pure logic for the terminal command palette: command parsing, fuzzy matching and
 * suggestions. No DOM access, so it can be unit-tested and shared by the island.
 */
import { refSourceOf } from "./outbound";

export type EntryKind = "page" | "post" | "snippet" | "topic";

/** Compact entry as served by `/commands.json`. */
export interface PaletteEntry {
  /** title */
  t: string;
  /** url */
  u: string;
  /** kind */
  k: EntryKind;
  /** tags (posts/snippets) */
  g?: string[];
}

export const COMMANDS = {
  cd: "cd <path>        jump to a page, e.g. cd topics/azure",
  open: "open <text>      open a post or snippet by title",
  grep: "grep <text>      full-text search across posts and snippets",
  ls: "ls <what>        list posts | snippets | topics | pages",
  theme: "theme <name>     switch theme: paper | midnight | solar",
  random: "random           open a random post",
  rss: "rss              open the RSS feed",
  help: "help             show this help",
} as const;

export type CommandName = keyof typeof COMMANDS;
export const COMMAND_NAMES = Object.keys(COMMANDS) as CommandName[];

export interface ParsedInput {
  /** `null` when the input doesn't start with a known command (free-text search). */
  command: CommandName | null;
  arg: string;
  raw: string;
}

export function parseInput(input: string): ParsedInput {
  const raw = input;
  const trimmed = input.trimStart();
  const [head = "", ...rest] = trimmed.split(/\s+/);
  const name = head.toLowerCase();
  if ((COMMAND_NAMES as string[]).includes(name) && (rest.length > 0 || /\s$/.test(trimmed) || trimmed === head)) {
    return { command: name as CommandName, arg: rest.join(" ").trim(), raw };
  }
  return { command: null, arg: trimmed.trim(), raw };
}

/**
 * Fuzzy score: every query character must appear in order. Consecutive matches, word
 * starts and prefix matches score higher. Returns 0 when there is no match.
 */
export function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase().replace(/\s+/g, "");
  const t = text.toLowerCase();
  if (!q) return 1;
  let score = 0;
  let ti = 0;
  let streak = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return 0;
    const wordStart = found === 0 || /[\s/\-_.:]/.test(t[found - 1]);
    streak = found === ti ? streak + 1 : 0;
    score += 1 + streak * 2 + (wordStart ? 3 : 0);
    ti = found + 1;
  }
  if (t.startsWith(q)) score += 10;
  if (t.includes(query.toLowerCase().trim())) score += 8;
  return score / (1 + t.length / 80);
}

export function rank(query: string, entries: readonly PaletteEntry[], limit = 12, key: (entry: PaletteEntry) => string = (e) => `${e.t} ${e.u}`) {
  return entries
    .map((entry) => ({ entry, score: fuzzyScore(query, key(entry)) }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((match) => match.entry);
}

/** Normalises `cd` arguments: `topics/azure`, `/topics/azure/`, `~/topics/azure` → `/topics/azure/`. */
export function normalisePath(arg: string): string {
  const clean = arg.trim().replace(/^~\/?/, "").replace(/^\/+|\/+$/g, "");
  if (clean === "" || clean === "~") return "/";
  if (clean === "..") return "..";
  return `/${clean}/`;
}

/** Parent directory of a URL path: `/blog/foo/` → `/blog/`. */
export function parentPath(path: string): string {
  const parts = path.split("/").filter(Boolean);
  return parts.length <= 1 ? "/" : `/${parts.slice(0, -1).join("/")}/`;
}

/**
 * The shell command a visitor "types" when navigating from one URL path to another, shown by the
 * page-transition HUD: home → `cd ~`, up one level → `cd ..`, into a child → `cd azure/`,
 * to a sibling → `cd ../docker/`, anywhere else → `cd ~/topics/azure/`.
 */
export function cdCommand(from: string, to: string): string {
  const src = normalisePath(from);
  const dest = normalisePath(to);
  if (dest === src) return "cd .";
  if (dest === "/") return "cd ~";
  if (dest === parentPath(src)) return "cd ..";
  if (dest.startsWith(src) && src !== "/") return `cd ${dest.slice(src.length)}`;
  if (src !== "/" && parentPath(dest) === parentPath(src) && parentPath(src) !== "/") return `cd ../${dest.slice(parentPath(src).length)}`;
  return `cd ~${dest}`;
}

export interface Peek {
  command: string;
  /** Leaves the site (shown with ↗). */
  external: boolean;
  /** Who an outbound link credits as referrer (`?ref=abhith.net`), shown next to the command. */
  ref?: string;
}

/**
 * What the status bar previews for a hovered link, as a shell command relative to the current page:
 * pages → `cd ../snippets/`, files → `cat ~/blog/rss.xml`, anchors → `grep -n "#setup"`,
 * mail → `mail abhith@pm.me`, other sites → `open github.com/abhith`. `null` when there's nothing to say.
 */
export function peekCommand(current: URL, target: URL, maxLength = 56): Peek | null {
  if (target.protocol === "mailto:") return { command: `mail ${decodeURIComponent(target.pathname)}`, external: true };
  if (target.protocol !== "https:" && target.protocol !== "http:") return null;

  if (target.origin !== current.origin) {
    const where = `${target.hostname.replace(/^www\./, "")}${target.pathname.replace(/\/$/, "")}`;
    const short = where.length > maxLength ? `${where.slice(0, maxLength - 1)}…` : where;
    const ref = refSourceOf(target);
    return ref ? { command: `open ${short}`, external: true, ref } : { command: `open ${short}`, external: true };
  }

  if (target.pathname === current.pathname) {
    return target.hash ? { command: `grep -n "${decodeURIComponent(target.hash)}"`, external: false } : null;
  }
  if (/\.[a-z0-9]+$/i.test(target.pathname)) return { command: `cat ~${target.pathname}`, external: false };
  const command = cdCommand(current.pathname, target.pathname);
  return command === "cd ." ? null : { command, external: false };
}

/**
 * Status-bar preview for an Expressive Code copy button: `pbcopy < snippet.sh  # 3 lines`.
 * Expressive Code stores the block in `data-code`, with U+007F standing in for line breaks.
 */
export function copyPeek(code: string, language?: string): Peek {
  const lines = code.split(/\u007f|\n/).length;
  const file = `snippet.${language && /^[a-z0-9+#-]+$/i.test(language) ? language : "txt"}`;
  return { command: `pbcopy < ${file}  # ${lines} ${lines === 1 ? "line" : "lines"}`, external: false };
}

export type LsTarget = "posts" | "snippets" | "topics" | "pages";
export const LS_TARGETS: LsTarget[] = ["posts", "snippets", "topics", "pages"];

export function lsKind(target: string): EntryKind | undefined {
  const map: Record<string, EntryKind> = { posts: "post", blog: "post", snippets: "snippet", topics: "topic", pages: "page" };
  return map[target.toLowerCase().replace(/\/$/, "")];
}

/** Tab completion: completes the command name, or the argument from the first suggestion. */
export function complete(input: string, firstSuggestion?: string): string {
  const parsed = parseInput(input);
  if (!parsed.command) {
    const head = input.trim().toLowerCase();
    const match = COMMAND_NAMES.find((name) => name.startsWith(head));
    return match && head ? `${match} ` : input;
  }
  if (firstSuggestion) return `${parsed.command} ${firstSuggestion}`;
  return input;
}
