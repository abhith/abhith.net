/**
 * Writing activity as a contribution-style heatmap: one row per year, one cell per month.
 * Used by the home hero (`git log --since`), so the grid always reflects the real archive.
 */
export interface ActivityMonth {
  /** 0-based month, like `Date#getUTCMonth()`. */
  month: number;
  count: number;
  /** Heat bucket relative to the busiest month: 0 = nothing, 4 = busiest. */
  level: 0 | 1 | 2 | 3 | 4;
  /** Month hasn't happened yet (rest of the current year). */
  future: boolean;
}

export interface ActivityYear {
  year: number;
  total: number;
  months: ActivityMonth[];
}

export const MONTH_INITIALS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"] as const;

/** Buckets `dates` per UTC month, newest year first, from the earliest year through `now`. */
export function writingActivity(dates: readonly Date[], now: Date = new Date()): ActivityYear[] {
  if (dates.length === 0) return [];
  const counts = new Map<string, number>();
  for (const date of dates) {
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const busiest = Math.max(...counts.values());
  const firstYear = Math.min(...dates.map((date) => date.getUTCFullYear()));
  const lastYear = Math.max(now.getUTCFullYear(), ...dates.map((date) => date.getUTCFullYear()));

  const years: ActivityYear[] = [];
  for (let year = lastYear; year >= firstYear; year--) {
    const months = Array.from({ length: 12 }, (_, month): ActivityMonth => {
      const count = counts.get(`${year}-${month}`) ?? 0;
      const level = count === 0 ? 0 : (Math.min(4, Math.max(1, Math.ceil((count / busiest) * 4))) as ActivityMonth["level"]);
      const future = year > now.getUTCFullYear() || (year === now.getUTCFullYear() && month > now.getUTCMonth());
      return { month, count, level, future: future && count === 0 };
    });
    years.push({ year, total: months.reduce((sum, month) => sum + month.count, 0), months });
  }
  return years;
}
