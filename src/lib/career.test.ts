import { describe, expect, it } from "vitest";
import { CAREER, CAREER_START, formatStart, roleHash, tenure, yearsBetween, yearsCoding } from "./career";

describe("career data", () => {
  it("is ordered newest first and starts in July 2012", () => {
    const starts = CAREER.map((role) => role.start);
    expect([...starts].sort().reverse()).toEqual(starts);
    expect(CAREER_START.toISOString().slice(0, 7)).toBe("2012-07");
  });
});

describe("yearsBetween / yearsCoding", () => {
  it("floors to whole years", () => {
    const from = new Date(Date.UTC(2012, 6, 1));
    expect(yearsBetween(from, new Date(Date.UTC(2026, 5, 30)))).toBe(13);
    expect(yearsBetween(from, new Date(Date.UTC(2026, 6, 1)))).toBe(14);
    expect(yearsBetween(from, new Date(Date.UTC(2011, 0, 1)))).toBe(0);
  });

  it("reports 14 years of coding in September 2026", () => {
    expect(yearsCoding(new Date(Date.UTC(2026, 8, 27)))).toBe(14);
  });
});

describe("formatting", () => {
  it("formats start months and tenures", () => {
    expect(formatStart("2023-07")).toBe("Jul 2023");
    const [current, previous] = CAREER;
    expect(tenure(previous!, current!.start)).toBe("4 yrs 4 mos");
    expect(tenure(current!, undefined, new Date(Date.UTC(2024, 6, 15)))).toBe("1 yr");
    expect(tenure(current!, "2023-07")).toBe("1 mo");
  });

  it("derives stable 7-char pseudo hashes", () => {
    const hashes = CAREER.map(roleHash);
    expect(hashes.every((hash) => /^[0-9a-f]{7}$/.test(hash))).toBe(true);
    expect(new Set(hashes).size).toBe(CAREER.length);
    expect(roleHash(CAREER[0]!)).toBe(roleHash({ ...CAREER[0]! }));
  });
});
