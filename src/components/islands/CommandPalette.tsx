import { Command } from "cmdk";
import { navigate } from "astro:transitions/client";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { THEMES } from "@/lib/themes";
import {
  COMMANDS,
  COMMAND_NAMES,
  LS_TARGETS,
  complete,
  lsKind,
  normalisePath,
  parentPath,
  parseInput,
  rank,
  type PaletteEntry,
} from "@/lib/palette";
import { isTheme, setTheme } from "@/scripts/theme";
import "@/styles/palette.css";

interface Item {
  id: string;
  label: string;
  hint?: string;
  kind: string;
  /** Text inserted by Tab completion (argument part). */
  completion?: string;
  run: () => void;
}

interface PagefindResult {
  url: string;
  meta: { title?: string };
  excerpt: string;
}

interface Pagefind {
  search: (query: string) => Promise<{ results: Array<{ id: string; data: () => Promise<PagefindResult> }> }>;
}

const HISTORY_KEY = "ws-palette-history";
const KIND_LABEL: Record<string, string> = { page: "dir", post: "post", snippet: "snip", topic: "#", cmd: "cmd", search: "grep", theme: "theme", help: "help" };

function loadHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

let pagefindPromise: Promise<Pagefind | null> | undefined;
function loadPagefind(): Promise<Pagefind | null> {
  // Resolved at runtime from the built site; not bundled by Vite.
  const path = "/pagefind/pagefind.js";
  pagefindPromise ??= import(/* @vite-ignore */ path).then((module) => module as Pagefind).catch(() => null);
  return pagefindPromise;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<PaletteEntry[]>([]);
  const [grepResults, setGrepResults] = useState<PagefindResult[] | null>(null);
  const [grepState, setGrepState] = useState<"idle" | "loading" | "unavailable">("idle");
  const [output, setOutput] = useState<string | null>(null);
  const historyIndex = useRef(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open with ⌘K / Ctrl+K / "/" and any [data-palette-open] trigger.
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, select, [contenteditable='true']");
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !typing && !open)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest("[data-palette-open]")) {
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  // Lazy-load the command index the first time the palette opens (cached by the browser afterwards).
  useEffect(() => {
    if (!open || entries.length > 0) return;
    fetch("/commands.json")
      .then((response) => response.json() as Promise<PaletteEntry[]>)
      .then(setEntries)
      .catch(() => setOutput("could not load /commands.json"));
  }, [open, entries.length]);

  useEffect(() => {
    if (!open) {
      setInput("");
      setOutput(null);
      historyIndex.current = -1;
    }
  }, [open]);

  const parsed = useMemo(() => parseInput(input), [input]);

  // Debounced full-text search for `grep`.
  useEffect(() => {
    if (parsed.command !== "grep" || parsed.arg.length < 2) {
      setGrepResults(null);
      return;
    }
    let cancelled = false;
    setGrepState("loading");
    const timer = setTimeout(async () => {
      const pagefind = await loadPagefind();
      if (cancelled) return;
      if (!pagefind) {
        setGrepState("unavailable");
        setGrepResults([]);
        return;
      }
      const search = await pagefind.search(parsed.arg);
      const data = await Promise.all(search.results.slice(0, 10).map((result) => result.data()));
      if (!cancelled) {
        setGrepResults(data);
        setGrepState("idle");
      }
    }, 180);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [parsed.command, parsed.arg]);

  const remember = useCallback((command: string) => {
    const history = [command, ...loadHistory().filter((item) => item !== command)].slice(0, 25);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      // ignore storage failures
    }
  }, []);

  const go = useCallback(
    (url: string, command: string) => {
      remember(command);
      setOpen(false);
      if (url.endsWith(".xml")) window.location.href = url;
      else void navigate(url);
    },
    [remember],
  );

  const toItem = useCallback(
    (entry: PaletteEntry, command: string, completion?: string): Item => ({
      id: `${command}:${entry.u}`,
      label: entry.t,
      hint: entry.u,
      kind: entry.k,
      completion,
      run: () => go(entry.u, `${command} ${completion ?? entry.t}`.trim()),
    }),
    [go],
  );

  const items = useMemo<Item[]>(() => {
    const { command, arg } = parsed;
    const posts = entries.filter((entry) => entry.k === "post" || entry.k === "snippet");

    if (command === null) {
      if (!arg) {
        return COMMAND_NAMES.map((name) => ({
          id: `cmd:${name}`,
          label: COMMANDS[name],
          kind: "cmd",
          completion: name,
          run: () => {
            setInput(`${name} `);
            inputRef.current?.focus();
          },
        }));
      }
      const found = rank(arg, entries, 10).map((entry) => toItem(entry, "open", entry.t));
      return [
        ...found,
        { id: "grep-fallback", label: `grep "${arg}"`, hint: "full-text search", kind: "search", run: () => setInput(`grep ${arg}`) },
      ];
    }

    switch (command) {
      case "cd": {
        if (arg === "..") {
          const parent = parentPath(window.location.pathname);
          return [{ id: "cd-parent", label: `cd ${parent}`, hint: "parent directory", kind: "page", run: () => go(parent, "cd ..") }];
        }
        const path = normalisePath(arg);
        const exact = entries.find((entry) => entry.u === path);
        const candidates = rank(arg.replace(/^~?\//, ""), entries, 12, (entry) => entry.u).map((entry) => toItem(entry, "cd", entry.u.replace(/^\/|\/$/g, "")));
        return exact ? [toItem(exact, "cd", arg), ...candidates.filter((item) => item.hint !== exact.u)] : candidates;
      }
      case "open":
        return (arg ? rank(arg, posts, 12, (entry) => entry.t) : posts.slice(0, 12)).map((entry) => toItem(entry, "open", entry.t));
      case "grep":
        return (grepResults ?? []).map((result) => ({
          id: `grep:${result.url}`,
          label: result.meta.title ?? result.url,
          hint: result.excerpt.replace(/<[^>]+>/g, ""),
          kind: "search",
          run: () => go(result.url, `grep ${arg}`),
        }));
      case "ls": {
        const kind = lsKind(arg.split(/\s+/)[0] ?? "");
        if (!kind) {
          return LS_TARGETS.map((target) => ({ id: `ls:${target}`, label: `ls ${target}`, kind: "page", completion: target, run: () => setInput(`ls ${target}`) }));
        }
        const filter = arg.split(/\s+/).slice(1).join(" ");
        const list = entries.filter((entry) => entry.k === kind);
        return (filter ? rank(filter, list, 50) : list.slice(0, 50)).map((entry) => toItem(entry, "ls", arg));
      }
      case "theme":
        return THEMES.filter((name) => name.startsWith(arg.toLowerCase())).map((name) => ({
          id: `theme:${name}`,
          label: `theme ${name}`,
          kind: "theme",
          completion: name,
          run: () => {
            if (isTheme(name)) setTheme(name);
            remember(`theme ${name}`);
            setOutput(`theme set to ${name}`);
            setInput("");
          },
        }));
      case "random":
        return [
          {
            id: "random",
            label: "open a random post",
            kind: "post",
            run: () => {
              const pool = entries.filter((entry) => entry.k === "post");
              const pick = pool[Math.floor(Math.random() * pool.length)];
              if (pick) go(pick.u, "random");
            },
          },
        ];
      case "rss":
        return [
          { id: "rss-blog", label: "blog posts feed", hint: "/blog/rss.xml", kind: "page", run: () => go("/blog/rss.xml", "rss") },
          { id: "rss-stories", label: "recommended stories feed", hint: "/recommended/stories/rss.xml", kind: "page", run: () => go("/recommended/stories/rss.xml", "rss") },
        ];
      case "help":
        return COMMAND_NAMES.map((name) => ({
          id: `help:${name}`,
          label: COMMANDS[name],
          kind: "help",
          completion: name,
          run: () => setInput(`${name} `),
        }));
    }
  }, [parsed, entries, grepResults, toItem, go, remember]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const first = items.find((item) => item.completion)?.completion;
      setInput(complete(input, first));
      return;
    }
    const history = loadHistory();
    const browsingHistory = historyIndex.current >= 0 && input === history[historyIndex.current];
    if (event.key === "ArrowUp" && (input === "" || browsingHistory) && history.length > 0) {
      event.preventDefault();
      event.stopPropagation();
      historyIndex.current = Math.min(historyIndex.current + 1, history.length - 1);
      setInput(history[historyIndex.current]);
    } else if (event.key === "ArrowDown" && browsingHistory) {
      event.preventDefault();
      event.stopPropagation();
      historyIndex.current -= 1;
      setInput(historyIndex.current >= 0 ? history[historyIndex.current] : "");
    }
  };

  const emptyMessage =
    parsed.command === "grep"
      ? grepState === "loading"
        ? "searching…"
        : grepState === "unavailable"
          ? "search index not built yet (run npm run build)"
          : parsed.arg.length < 2
            ? "type at least 2 characters"
            : `grep: no matches for "${parsed.arg}"`
      : `command not found: ${input.trim()}`;

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command palette" shouldFilter={false} loop className="palette" overlayClassName="palette-overlay" contentClassName="palette-content">
      <div className="palette-bar">
        <span className="palette-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>abhith@workspace: {typeof window === "undefined" ? "~" : `~${window.location.pathname}`}</span>
        <kbd className="kbd">esc</kbd>
      </div>
      <div className="palette-prompt">
        <span className="palette-ps1" aria-hidden="true">
          $
        </span>
        <Command.Input ref={inputRef} value={input} onValueChange={setInput} onKeyDown={onKeyDown} placeholder="type a command — try: cd topics/azure, grep docker, random, help" autoFocus />
      </div>
      {output && <p className="palette-output">{output}</p>}
      <Command.List className="palette-list">
        <Command.Empty className="palette-empty">{emptyMessage}</Command.Empty>
        {items.map((item) => (
          <Command.Item key={item.id} value={item.id} onSelect={item.run} className="palette-item">
            <span className={`palette-kind palette-kind--${item.kind}`}>{KIND_LABEL[item.kind] ?? item.kind}</span>
            <span className="palette-label">{item.label}</span>
            {item.hint && <span className="palette-hint">{item.hint}</span>}
          </Command.Item>
        ))}
      </Command.List>
      <div className="palette-footer">
        <span>
          <kbd className="kbd">↵</kbd> run
        </span>
        <span>
          <kbd className="kbd">tab</kbd> complete
        </span>
        <span>
          <kbd className="kbd">↑</kbd> history
        </span>
        <span>
          <kbd className="kbd">⌘K</kbd> toggle
        </span>
      </div>
    </Command.Dialog>
  );
}
