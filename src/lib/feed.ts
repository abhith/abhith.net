/**
 * Pure helpers shared by every RSS route (`/rss.xml`, `/blog/rss.xml`, `/snippets/rss.xml`).
 */

/** Makes root-relative URLs absolute and drops scripts/styles, so feed readers get clean HTML. */
export function feedHtml(html: string, site: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/\s(href|src)="\/(?!\/)/g, ` $1="${site}/`)
    .replace(/\ssrcset="[^"]*"/g, "");
}

/** Newest first, then capped: the combined feed would otherwise carry every post ever written. */
export function newestFirst<T extends { date: Date }>(items: readonly T[], limit = Infinity): T[] {
  return [...items].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, limit);
}
