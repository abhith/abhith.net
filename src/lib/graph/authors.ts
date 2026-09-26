import type { AuthorLike } from "./types";

/** Splits a frontmatter `author` value (`"Jane Doe, John Roe"`) into normalised names. */
export function parseAuthorNames(author: string): string[] {
  return author
    .split(",")
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Returns the authors whose name appears in the comma-separated `author` field
 * (case-insensitive), in the order of the `authors` list — same as `createPages.js`.
 */
export function matchAuthors<A extends AuthorLike>(author: string, authors: readonly A[]): A[] {
  const names = new Set(parseAuthorNames(author));
  return authors.filter((candidate) => names.has(candidate.name.trim().toLowerCase()));
}
