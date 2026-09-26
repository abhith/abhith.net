export interface Page<T> {
  items: T[];
  /** 1-based page number. */
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  /** Always with a trailing slash, e.g. `/blog/` or `/blog/2/`. */
  url: string;
  prevUrl?: string;
  nextUrl?: string;
}

const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** URL of page `n` under `basePath`, following gatsby-awesome-pagination (page 1 has no number). */
export function pageUrl(basePath: string, pageNumber: number): string {
  const base = withSlash(basePath);
  return pageNumber <= 1 ? base : `${base}${pageNumber}/`;
}

/**
 * Splits `items` into pages of `pageSize`. Like gatsby-awesome-pagination, an empty list
 * produces no pages.
 */
export function paginate<T>(items: readonly T[], basePath: string, pageSize = 10): Page<T>[] {
  if (pageSize < 1) throw new Error(`pageSize must be >= 1 (got ${pageSize})`);
  const totalPages = Math.ceil(items.length / pageSize);
  return Array.from({ length: totalPages }, (_, index) => {
    const pageNumber = index + 1;
    return {
      items: items.slice(index * pageSize, pageNumber * pageSize),
      pageNumber,
      totalPages,
      totalItems: items.length,
      pageSize,
      url: pageUrl(basePath, pageNumber),
      prevUrl: pageNumber > 1 ? pageUrl(basePath, pageNumber - 1) : undefined,
      nextUrl: pageNumber < totalPages ? pageUrl(basePath, pageNumber + 1) : undefined,
    };
  });
}

/** `getStaticPaths` entries for an Astro `[...page].astro` route. */
export function paginatedPaths<T>(items: readonly T[], basePath: string, pageSize = 10) {
  return paginate(items, basePath, pageSize).map((page) => ({
    params: { page: page.pageNumber === 1 ? undefined : String(page.pageNumber) },
    props: { page },
  }));
}
