# abhith.net — "The Workspace"

Abhith Rajan's developer blog, migrated from Gatsby 5 to **Astro 7**. The design is a writer's IDE: calm
editorial typography with developer touches around the edges — file-path breadcrumbs, a status bar,
`git log`-style listings, a terminal command palette and a knowledge graph.

The site builds to plain static files in `dist/`. There is no server, no adapter and no CI requirement.

## Quick start

```bash
fnm use            # Node 24 LTS (see .nvmrc); Node >= 22.12 is required
npm install
npm run dev        # http://localhost:4321 — drafts are visible in dev
npm run build      # static site + OG images + Pagefind index in dist/
npm run preview    # serve dist/ locally (full-text search works here)
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Astro dev server (drafts included, analytics disabled) |
| `npm run build` | Production build to `dist/` (drafts excluded) and Pagefind index |
| `npm run check` | `astro check` type checking |
| `npm test` | Vitest unit tests for the content graph, palette and helpers |
| `npm run parity` | Compares `dist/` with the routes the Gatsby site produced (run after a build) |
| `npm run copy-content` | Re-imports content from `gatsbyjs-site/abhith.net` (read-only source) |

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `PUBLIC_SITE_ENV` | `production` | Anything other than `production` makes `robots.txt` disallow everything (use it for preview deploys). |
| `WEBMENTIONS_TOKEN` | — | webmention.io API token. Without it, webmentions are skipped with a warning and the build still succeeds. |

Analytics (GA4, Microsoft Clarity) and AdSense load only in production builds.

## Deploying (zero config)

Any static host works. The build command is `npm run build` and the output directory is `dist`.

- **Vercel / Netlify / Cloudflare Pages**: import the repository. Astro is detected automatically, so no settings are needed.
  Set `PUBLIC_SITE_ENV=preview` for preview environments if you want them hidden from search engines.
- **GitHub Pages**: upload `dist/` with the official `actions/upload-pages-artifact` + `actions/deploy-pages` actions.

URLs always end with a slash (`trailingSlash: "always"`), matching the Gatsby site.

## Writing content

| Content | Location | Notes |
| --- | --- | --- |
| Blog posts | `src/content/blog/<slug>/index.mdx` | Frontmatter is validated by Zod in `src/content.config.ts`. Set `draft: true` to hide a post in production. |
| Snippets | `src/content/snippets/<category>/<slug>.mdx` | The first `topics` entry is the category. |
| Topics | `src/content/topics/topics.yml` | Topics used by content but missing here get a `startCase` title. |
| Stories / videos | `src/content/data/{stories,videos}.json` | |
| Services (tools) | `src/content/recommended/services/services.yml` | |

MDX supports GitHub-flavoured Markdown, footnotes, emoji shortcodes, Expressive Code frames (`title="file.ts"`,
`{2-4}` line markers, `ins`/`del` diffs, `collapse={1-5}`), ```` ```mermaid ```` diagrams, bare tweet URLs
(auto-embedded) and the `<Alert kind="info">` / `<Badge fill="#hex">` components.

## Architecture

```
src/
  content.config.ts        typed collections (glob/file loaders)
  lib/graph/*.ts           pure, unit-tested helpers: related content, topics, authors, pagination
  lib/content-graph.ts     memoised graph used by every page, feed, search index and OG image
  layouts/                 BaseLayout, ArticleLayout, ListingLayout, TopicLayout, PageLayout
  components/shell/        Header (editor tabs), PathBreadcrumb, StatusBar, ThemeSwitcher
  components/islands/      CommandPalette (⌘K, cmdk + Pagefind), KnowledgeGraph (d3-force canvas)
  pages/og/[...slug].png.ts  Satori/resvg social cards for every post, snippet and topic
scripts/
  copy-content.ts          Gatsby → Astro content import
  parity-report.ts         route/link/feed/sitemap/image parity report
```

The related-content rules are ported from `gatsby/node/createPages.js`. `legacyRelated()` reproduces the
Gatsby selection exactly (it's used by the parity report), and the site uses `rankRelated()`, which orders by the
number of shared tags and then by date.

## Command palette

Press `⌘K` / `Ctrl+K` or `/` anywhere:

```
cd topics/azure      jump to a page (cd .. goes up)
open docker          open a post or snippet by title
grep compose         full-text search (Pagefind; needs a build)
ls topics            list posts | snippets | topics | pages
theme midnight       paper | midnight | solar
random · rss · help
```

`Tab` completes, and `↑` / `↓` on an empty prompt step through your history.
