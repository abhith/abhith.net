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
| `npm run add -- <url> <topics>` | Add a recommended story, video or service with fetched metadata (see [Adding recommendations](#adding-recommendations)) |

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

## CI

GitHub Actions workflows live in `.github/workflows/`:

| Workflow | Runs on | What it does |
| --- | --- | --- |
| `ci.yml` | PRs and pushes to `main` | `npm run check`, `npm test` and `npm run build`; uploads `dist/` as an artifact |
| `codeql.yml` | PRs, pushes to `main`, weekly | CodeQL security scan of the JS/TS/Astro code and the workflows |
| `dependency-review.yml` | PRs touching dependencies | Fails on newly introduced high-severity vulnerabilities |
| `pr-title.yml` | PRs | Enforces Conventional Commits PR titles (`feat:`, `fix:`, `content(...)`, `chore(deps):` …) |
| `add-recommendation.yml` | `add-recommendation` issues by the owner, manual runs | Runs `npm run add` and opens a `content(recommended)` PR |

The optional `WEBMENTIONS_TOKEN` repository secret is passed to the CI build when present.

## Writing content

| Content | Location | Notes |
| --- | --- | --- |
| Blog posts | `src/content/blog/<slug>/index.mdx` | Frontmatter is validated by Zod in `src/content.config.ts`. Set `draft: true` to hide a post in production. |
| Snippets | `src/content/snippets/<category>/<slug>.mdx` | The first `topics` entry is the category. |
| Topics | `src/content/topics/topics.yml` | Topics used by content but missing here get a `startCase` title. |
| Stories / videos | `src/content/data/{stories,videos}.json` | Add with `npm run add` (below). |
| Services (tools) | `src/content/recommended/services/services.yml` | Add with `npm run add -- <url> <topics> --kind service`. |

MDX supports GitHub-flavoured Markdown, footnotes, emoji shortcodes, Expressive Code frames (`title="file.ts"`,
`{2-4}` line markers, `ins`/`del` diffs, `collapse={1-5}`), ```` ```mermaid ```` diagrams, bare tweet URLs
(auto-embedded) and the `<Alert kind="info">` / `<Badge fill="#hex">` components.

## Adding recommendations

Only the URL and topics are needed; everything else is fetched. YouTube/Vimeo titles come from oEmbed, and
other pages are read from their Open Graph / `<title>` / meta description tags.

```bash
npm run add -- 'https://www.youtube.com/watch?v=c3XMAz--_Us' privacy,open-source # → videos.json
npm run add -- https://github.blog/some-post/ github-copilot                      # → stories.json
npm run add -- https://forminit.com/ developer-tools --kind service               # → services.yml
npm run add -- https://a.dev/ ai https://b.dev/ git,github --dry-run              # several at once, preview only
```

Words after a URL are that URL's topics, and `--topics` covers URLs without their own. The script:

- cleans the URL by dropping `utm_*` and similar tracking parameters and normalising YouTube links
- skips links that already exist in any of the three files
- rejects topics that aren't in `topics.yml` and suggests the closest match (`--allow-new-topics` overrides this)
- inserts the entry at the top of the file without reformatting the rest

Quote URLs that contain `?` or `&`, since zsh would otherwise treat them as wildcards. Use `--title` when a site
blocks metadata fetching, and `--help` to see every option.

**From anywhere (phone, browser):** open an issue with the **Add recommendation** form, one link per line with
optional topics after each. The `add-recommendation.yml` workflow runs the same script, opens a PR that closes
the issue, and comments with what was added, skipped or rejected. To retry, edit the issue and re-add the label.
You can also start it with **Actions → Add recommendation → Run workflow**. One-time setup:

1. Create the `add-recommendation` label. The form applies it, and the workflow only reacts to it when the repo owner opens or labels the issue.
2. Enable **Settings → Actions → General → Allow GitHub Actions to create and approve pull requests**.
3. Optionally, add a `RECOMMENDATIONS_TOKEN` secret: a fine-grained PAT for this repo with Contents, Pull requests and Issues set to read & write. PRs opened with the default token don't trigger `ci.yml`.

This bookmarklet pre-fills the form with the current page:

```js
javascript:location.href='https://github.com/abhith/abhith.net/issues/new?template=add_recommendation.yml&title='+encodeURIComponent('recommend: '+document.title)+'&links='+encodeURIComponent(location.href)
```

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
```

Related content keeps the Gatsby per-type limits. `rankRelated()` orders candidates by the number of shared topics
and then by date.

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
