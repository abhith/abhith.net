/**
 * "This post may be outdated" banner: technical posts untouched for `STALE_AFTER_YEARS` get an
 * honest heads-up. Amending a post (`lastModificationTime`) resets the clock.
 */
export const STALE_AFTER_YEARS = 3;

/** Personal, list-style or opinion topics whose content doesn't rot with library versions. */
export const EVERGREEN_TOPICS: ReadonlySet<string> = new Set(["general", "courses", "awesome-list", "laptops", "shopping-guide", "style-guide", "jobs"]);

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

/** Whole years since `lastModified` when the entry counts as stale, otherwise `undefined`. */
export function staleYears(entry: { lastModified: Date; topics: readonly string[] }, now: Date, threshold = STALE_AFTER_YEARS): number | undefined {
  if (entry.topics.some((topic) => EVERGREEN_TOPICS.has(topic))) return undefined;
  const years = Math.floor((now.getTime() - entry.lastModified.getTime()) / YEAR_MS);
  return years >= threshold ? years : undefined;
}
