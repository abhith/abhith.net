# Design — "The Workspace"

abhith.net is designed as a **writer's IDE**: calm, editorial reading typography in the middle, with developer
touches around the edges — editor tabs, file-path breadcrumbs, a status bar, `git log` listings, a terminal
command palette and a knowledge graph. This document describes that system so new pages and components stay
consistent with it.

## Principles

1. **Content first, chrome at the edges.** Long-form text is set in a serif at a comfortable measure. The IDE
   metaphor lives in the frame (header, breadcrumb, status bar) and in small labels. It never gets in the way of reading.
2. **Every metaphor is honest.** A tab is a real section, `ls ~/` lists real folders with real counts, the heatmap
   counts real posts, and a status-bar peek shows what a link really does. Decoration always carries data.
3. **One accent, many topics.** Each theme has a single accent colour for interaction and emphasis. Topics get
   their own stable hues, but only inside topic-coloured components (tokens, periodic table, graph).
4. **Quiet by default, playful on intent.** Motion and detail show up on hover, focus or first load, never in a loop
   that competes with reading. The one exception is the blinking caret.
5. **Works without the metaphor.** Everything is plain HTML links and buttons with accessible names. The terminal
   flavour is copy and styling, not a required interaction model.

## Themes & colour tokens

Every colour is a CSS variable switched by `html[data-theme]` (`src/styles/global.css`) and exposed to Tailwind
via `@theme inline` (`bg-surface`, `text-muted`, `border-line`, `text-accent`…). Never hard-code a colour in a
component. Use a token or a `color-mix()` of tokens.

| Token | Role | paper (light, default) | midnight (dark) | solar (light) |
| --- | --- | --- | --- | --- |
| `--bg` | Page background | `#f7f5ef` | `#0e1116` | `#fdf6e3` |
| `--surface` | Cards, windows, raised UI | `#fffefa` | `#141922` | `#fffbef` |
| `--sunken` | Window bars, status bar, code, hover wells | `#efece3` | `#0a0d11` | `#eee8d5` |
| `--fg` | Body text | `#1d1b16` | `#e7e2d7` | `#073642` |
| `--muted` | Secondary text, labels, metadata | `#5f5a50` | `#9ba4b0` | `#586e75` |
| `--line` | Borders, dividers, dashed rules | `#e1dccf` | `#262e3a` | `#e4dcc3` |
| `--accent` | Links, prompts, active states, primary buttons | `#0b6e4f` | `#7ee0b5` | `#1a6aa3` |
| `--accent-fg` | Text on accent | `#ffffff` | `#0b1a14` | `#fdf6e3` |
| `--warm` | Secondary highlight: hashes, cwd, HEAD refs, warnings | `#a2461a` | `#f5a97f` | `#8f6500` |
| `--selection` | `::selection` | `#cde8dc` | `#1f4a3a` | `#e9dfbf` |
| `--topic-l` / `--topic-s` | Lightness / saturation for topic hues | `34%` / `62%` | `72%` / `70%` | `32%` / `70%` |
| `--syntax-*` | Keyword / string / comment in code | | | |

- Theme choice is stored in `localStorage` and applied before first paint (`BaseLayout.astro`). Without a stored
  choice, `prefers-color-scheme` picks paper or midnight. Users cycle themes from the status bar or with `theme <name>`.
- Tailwind's `dark:` variant maps to midnight only.
- **Topic colour:** `topicHue(slug)` (`src/lib/graph/color.ts`) hashes a slug to a stable hue, and components build
  `--topic: hsl(var(--h) var(--topic-s) var(--topic-l))`. A topic keeps its hue across tokens, the periodic table,
  the knowledge graph and OG images.
- **Tints** are always `color-mix(in oklab, <token> N%, var(--surface) | transparent)`. Typical steps: 10–16% for
  backgrounds, 28–40% for borders, 100% for text or the active state.
- The macOS traffic-light dots (`#ff5f57`, `#febc2e`, `#28c840`) are the only fixed colours, and only on window chrome.

## Typography

| Family | Token | Used for |
| --- | --- | --- |
| Newsreader Variable (serif) | `--font-serif` / `font-serif` | Long-form prose, descriptions, taglines |
| Inter Variable (sans) | `--font-sans` / `font-sans` | UI text, headings, titles, the base `html` font |
| JetBrains Mono Variable | `--font-mono` / `font-mono` | Chrome: tabs, labels, breadcrumbs, status bar, buttons, code, counts |

- Prose (`.prose-ws`): 1.1875rem, line-height 1.7, measure `44rem` (`.measure`). Headings inside prose switch to
  sans at weight 650 with slightly negative tracking.
- Hero title: `text-5xl` → `sm:text-6xl`, bold, `tracking-tight`, ending in an accent-coloured period.
- Labels (`.mono-label`): mono 0.75rem, `--muted`, +0.02em tracking.
- Mono UI text stays small (0.65–0.85rem). Mono is for metadata, not paragraphs.

## Layout

- `.shell`: the page container, `min(100% - 2rem, 72rem)`. `.measure`: reading column, `min(100% - 2rem, 44rem)`.
- Vertical rhythm between home sections is `pb-16`. Section headings use `.section-title`, a mono lowercase label
  prefixed by an accent `//` and followed by a dashed rule, e.g. `// git log --oneline blog`.
- Fixed frame: the sticky header is 3rem (`h-12`), and the fixed status bar is 1.75rem (`body` reserves 2.25rem).
  `scroll-padding-top: 5rem` keeps anchors clear of the header.
- Breakpoints follow Tailwind (`sm` 640px, `md` 768px, `lg` 1024px) plus a few component-level ones:

| Width | Behaviour |
| --- | --- |
| ≤ 40rem | Status bar hides secondary items (`.hide-sm`) and LinkPeek |
| ≤ 48rem | Header tabs collapse into the **explorer menu** (popover) |
| ≤ 56rem | Tabs show short labels instead of file names, and the palette button hides its text |
| `hover: none` | Hover-only reveals are shown by default, and `⌘K` hints are hidden |

## Shell components (`src/components/shell/`)

| Component | Metaphor | Notes |
| --- | --- | --- |
| `Header` | Editor tab strip | The active section is the open tab (surface background plus a 2px accent underline). On phones it becomes an `ls` button that opens an **explorer** panel: a native `popover` with 44px rows, active item marked with an accent inset bar, and a "run a command…" row. |
| `PathBreadcrumb` | File path | `~/blog/some-post.mdx`, where every segment links to its folder. Hidden on the home page. |
| `StatusBar` | IDE status bar | Accent branch chip (`⎇ blog`), reading progress `Ln 42%`, palette, theme, GitHub stars, build hash. |
| `LinkPeek` | Browser link-hover URL | Hover or focus shows the equivalent command (`cd ../snippets/`, `open github.com ↗`). Any element can opt in with `data-peek="…"`. |
| `CdTransition` | Shell prompt | On client navigation, a small HUD types `cd ~/topics/azure/` while the page scrolls like terminal output. |
| `CommandPalette` (island) | Terminal | `⌘K` / `Ctrl+K` / `/` from anywhere: `cd`, `open`, `grep`, `ls`, `theme`, `random`. Any `[data-palette-open]` element opens it. |

## Building blocks (`global.css` `@layer components`)

- **`.window` / `.window-bar` / `.window-dots`**: desktop-window chrome (0.75rem radius, `--line` border, soft
  long shadow, `--sunken` title bar with a mono path like `~/photos/me.jpg`). Use it for anything that should
  feel like an app: the hero terminal, the photo viewer, the graph teaser, the explorer menu.
- **`.btn` / `.btn-primary`**: mono, 0.375rem radius. Label buttons as commands (`cd ~/blog`, `open graph →`).
- **`.kbd`**: keyboard hints, with a thicker bottom border.
- **`.topic-token`**: `#topic` chip in the topic hue, 10% tint background and 28% border.
- **`.section-title`**: `// heading ────`.
- **`.mono-label`**: small metadata line.
- **Rows as logs**: `PostRow` renders `hash · yyyy-mm-dd · title · #topics`, with the hash in `--warm` and a
  dashed bottom border. The description slides open on hover or focus, and is always visible on touch devices.

## Home page patterns (`src/pages/index.astro`)

- **Hero, left column:** role label → name → serif tagline → command buttons → **writing heatmap**
  (`git log --since=2017 --heatmap`). The heatmap is a year × month grid of posts and snippets
  (`src/lib/activity.ts`), in five accent-tint levels. Future months are dashed outlines, each row ends with the
  year's total, and a `HEAD → main` line links the latest post. It balances the taller right column with real data.
  Links saved to `/recommended` are a second layer: a small `--warm` **starred dot** in the cell's corner (and
  `★ N` in the heading). They never feed the shading, because shading is about what I wrote. Cell columns are `1fr`, so the grid spans
  the same width as its heading and footer (column capped at `32rem`). Below `30rem` the label columns and gaps tighten.
- **Hero, right column ("the desk"):** two overlapping windows. A slightly rotated photo viewer peeks out behind
  a terminal that types `whoami`, `cat about.txt` and `ls ~/` line by line. Hovering the photo brings it forward.
- **Periodic table of tools:** recommended tools as elements tinted by topic group. Atomic number is the order
  they were added, and hovering an element fills the key card.
- **Graph teaser:** a window with a radial accent glow and top topic tokens.

## Motion

- Durations: 120ms for hovers, 140–260ms for page transitions and popovers, 0.35–0.6s for entrance pops and
  typing. Easing is `ease` for hovers and `cubic-bezier(0.2, 0.9, 0.3, 1.2)` for playful pops.
- Entrances run once: hero typing, the photo pop-in, staggered heatmap cells, and periodic cells settling in on
  scroll (`animation-timeline: view()`).
- Hover feedback is a small lift (`translate: 0 -2px…-3px`), an accent border, or a topic-coloured shadow. Never
  scale text.
- `prefers-reduced-motion: reduce` flattens every animation and transition globally. Don't add motion that
  carries meaning on its own.

## Voice & copy

- Chrome copy is lowercase shell: `cd ~/blog`, `ls`, `run a command…`, `open graph →`, `all {n} posts →`.
- File names stand in for sections: `blog/`, `graph.json`, `about.md`.
- Comments in `data-peek` use `#`: `theme midnight  # now: paper`.
- Prose stays human and editorial. The terminal voice is for navigation and metadata only.

## Accessibility checklist

- Real `<a>` for navigation and `<button>` for actions, each with an accessible name. Decorative glyphs
  (`›_`, `⎇`, dots, carets) get `aria-hidden="true"`.
- Visible focus: 2px accent outline (`:focus-visible`). Keep `:hover` styles mirrored on `:focus-visible`.
- Touch targets on phones are at least 36px (header buttons) and 44px (menu rows).
- Data visuals (like the heatmap) expose a one-sentence `aria-label` summary.
- Mark current pages with `aria-current="page"`, and never convey state by colour alone (active tabs also get an
  underline or inset bar).

## Adding something new

1. Start from tokens and the existing building blocks. Reach for `.window`, `.section-title`, `.mono-label` and
   `.topic-token` before writing new CSS.
2. Name it in the metaphor, and make sure the metaphor shows something true.
3. Check all three themes (the status-bar theme button or `theme paper|midnight|solar`), a phone width and reduced motion.
