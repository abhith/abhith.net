/**
 * Single source of truth for the career timeline (about page) and the "years coding" figure
 * used across the site, so copy like "coding for almost a decade" never goes stale again.
 */
export interface Role {
  /** First month in the role, `YYYY-MM`. */
  start: `${number}-${number}`;
  company: string;
  url?: string;
  title: string;
  location: string;
  /** Flag emoji for the location. */
  flag: string;
  /** One-line summary, rendered as the commit message body. */
  note: string;
}

/** Newest first. */
export const CAREER: Role[] = [
  {
    start: "2023-07",
    company: "National Air Cargo",
    url: "https://www.nationalaircargo.com",
    title: "Software Engineer",
    location: "Dubai",
    flag: "🇦🇪",
    note: "Prototyping and building backend & frontend apps, deployed to Azure with GitHub Actions.",
  },
  {
    start: "2019-03",
    company: "Emcredit",
    url: "https://www.emcredit.com",
    title: "Software Developer",
    location: "Dubai",
    flag: "🇦🇪",
    note: "Four-plus years of .NET, Azure and DevOps work in Dubai.",
  },
  {
    start: "2018-09",
    company: "Unibeton Ready Mix",
    url: "http://www.unibetonrm.com",
    title: "Sr. Software Engineer",
    location: "Dubai",
    flag: "🇦🇪",
    note: "Stepped up to a senior role building line-of-business software.",
  },
  {
    start: "2015-11",
    company: "Sysberries Technology",
    url: "http://sysberries.com",
    title: "Software Engineer",
    location: "Abu Dhabi",
    flag: "🇦🇪",
    note: "Moved to the UAE — first stop, Abu Dhabi.",
  },
  {
    start: "2012-07",
    company: "Aabasoft Technologies",
    url: "https://www.aabasoft.com/in-en/",
    title: "Software Engineer",
    location: "India",
    flag: "🇮🇳",
    note: "Joined as an intern straight after B-Tech; stayed 3+ years and learned the craft.",
  },
];

const parseStart = (start: Role["start"]) => {
  const [year, month] = start.split("-").map(Number);
  return new Date(Date.UTC(year!, month! - 1, 1));
};

/** Date of the very first role — when the coding career started. */
export const CAREER_START = parseStart(CAREER.at(-1)!.start);

/** Whole years between `from` and `now` (floored). */
export function yearsBetween(from: Date, now: Date = new Date()): number {
  let years = now.getUTCFullYear() - from.getUTCFullYear();
  if (now.getUTCMonth() < from.getUTCMonth() || (now.getUTCMonth() === from.getUTCMonth() && now.getUTCDate() < from.getUTCDate())) years--;
  return Math.max(0, years);
}

/** Full years of professional coding at build time, e.g. `14`. */
export const yearsCoding = (now: Date = new Date()) => yearsBetween(CAREER_START, now);

/** Short, human label for a role's start month, e.g. `Jul 2023`. */
export const formatStart = (start: Role["start"]) =>
  parseStart(start).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

/** Human duration of a role, e.g. `3 yrs 4 mos`; `end` defaults to today for the current role. */
export function tenure(role: Role, end?: Role["start"], now: Date = new Date()): string {
  const from = parseStart(role.start);
  const to = end ? parseStart(end) : now;
  const months = Math.max(1, (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + to.getUTCMonth() - from.getUTCMonth());
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
}

/** Short, deterministic pseudo commit hash for a role (purely decorative). */
export function roleHash(role: Role): string {
  let hash = 0x811c9dc5;
  for (const char of `${role.start}${role.company}`) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}
