# CLAUDE.md

## Project Overview

Personal blog and portfolio website for abhith.net built with Gatsby (JAMstack). Static site with MDX content, React components, and multiple data sources.

## Tech Stack

- **Framework**: Gatsby 5.15.0
- **UI**: React 18.3.1, Theme UI 0.17.0, Emotion.js, Bulma CSS, Sass
- **Content**: MDX, Markdown, YAML, JSON
- **Package Manager**: Yarn
- **Node.js**: 24.x

## Development Commands

```bash
yarn dev          # Start development server
yarn serve        # Serve production build locally
yarn clean        # Clear Gatsby cache

# Production build (runs build:* scripts in parallel via run-p)
# build:app does: gatsby clean && gatsby build
NODE_OPTIONS=--max_old_space_size=4096 yarn build
```

> `NODE_OPTIONS` is required locally if the build runs out of memory (set automatically in CI).

## Project Structure

```
src/
  components/     # Reusable React components
  pages/          # Static route pages (md/mdx)
  templates/      # Dynamic page templates
  sections/       # Larger section-level components
  styles/         # SCSS global styles
  utils/          # Utility functions
  gatsby-plugin-theme-ui/  # Theme config (colors, prism)
content/
  blog/           # Blog posts: blog/{slug}/index.mdx
  snippets/       # Code snippets by language
  authors/        # authors.yml
  topics/         # topics.yml
  recommended/    # services.yml
static/           # Static assets (images, ads.txt)
```

## Content Authoring

### Blog Posts
- Location: `content/blog/{slug}/index.mdx`
- Co-locate images with post in same folder

Frontmatter fields:

| Field                | Required | Notes                                      |
|----------------------|----------|--------------------------------------------|
| `title`              | yes      |                                            |
| `date`               | yes      | ISO 8601 format                            |
| `author`             | yes      |                                            |
| `description`        | yes      |                                            |
| `image`              | yes      | relative path to co-located image          |
| `tags`               | yes      | list of topic slugs                        |
| `lastModificationTime` | no     | ISO 8601; include when post is updated     |
| `authorURL`          | no       | author's social/profile URL                |

### Code Snippets
- Location: `content/snippets/{language}/{slug}.mdx`
- Languages: `c-sharp`, `git`, `javascript`, `linux`, `powershell`, `sql-server`

Frontmatter fields:

| Field         | Required | Notes                                      |
|---------------|----------|--------------------------------------------|
| `title`       | yes      |                                            |
| `date`        | yes      | ISO 8601 format                            |
| `author`      | yes      |                                            |
| `description` | yes      |                                            |
| `topics`      | yes      | list of topic slugs (can include multiple) |

### Data Files
- Authors: `content/authors/authors.yml`
- Topics/Tags: `content/topics/topics.yml`
- Recommended services: `content/recommended/services/services.yml`

## Styling Conventions

- Theme-aware components use `@jsx jsx` pragma from Theme UI
- Global styles in `src/styles/all.scss`
- Theme config (colors, spacing, breakpoints) in `src/gatsby-plugin-theme-ui/index.js`
- Light/dark mode support via Theme UI color modes

## Commit Conventions

Conventional commits are enforced via commitlint + husky:

```
feat: add new feature
fix: bug fix
content: add/update content
chore: maintenance tasks
docs: documentation changes
```

## CI/CD

- GitHub Actions: `.github/workflows/gatsby-ci.yml`
- Runs build on PRs and pushes
- Deployed via Vercel
- Renovate handles automated dependency updates (`.github/renovate.json`)

## Key Configuration Files

- `gatsby-config.mjs` — Gatsby plugins, site metadata, source filesystem config
- `src/gatsby-plugin-theme-ui/index.js` — Theme colors and typography
- `commitlint.config.js` — Commit message rules

## Notes

- No test suite — quality enforced via build-time validation and CI
- `NODE_OPTIONS=--max_old_space_size=4096` is set automatically in CI; may be needed locally for large builds
- Uses `@builder.io/partytown` for off-main-thread third-party scripts (analytics)
- `yarn build` uses `run-p build:**` (parallel); `build:app` is the main sub-script (clean + gatsby build)
