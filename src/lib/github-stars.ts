import { SITE } from "./site";

let starsPromise: Promise<number | null> | undefined;

/** `1234` → `1.2k`. */
export function formatStars(count: number): string {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(count).toLowerCase();
}

/** `https://github.com/abhith/abhith.net` → `abhith/abhith.net`. */
export function repoSlug(url: string = SITE.repo.url): string {
  return new URL(url).pathname.replace(/^\/|\/$/g, "").replace(/\.git$/, "");
}

async function fetchStars(): Promise<number | null> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const response = await fetch(`https://api.github.com/repos/${repoSlug()}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "abhith.net-build",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { stargazers_count?: unknown };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

/**
 * Star count of the site's repo, fetched once per build and rendered as plain text, so the
 * browser never talks to GitHub. `null` when offline or rate limited; callers drop the number.
 */
export function repoStars(): Promise<number | null> {
  starsPromise ??= fetchStars();
  return starsPromise;
}
