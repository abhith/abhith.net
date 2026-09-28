import { describe, expect, it } from "vitest";
import { writingActivity } from "./activity";

const d = (year: number, month: number, day = 1) => new Date(Date.UTC(year, month, day));

describe("writingActivity", () => {
  it("returns nothing for an empty archive", () => {
    expect(writingActivity([], d(2026, 8))).toEqual([]);
  });

  it("lists every year from the first entry to now, newest first, with 12 months each", () => {
    const years = writingActivity([d(2017, 11), d(2019, 0)], d(2020, 5));
    expect(years.map((year) => year.year)).toEqual([2020, 2019, 2018, 2017]);
    expect(years.every((year) => year.months.length === 12)).toBe(true);
    expect(years.map((year) => year.total)).toEqual([0, 1, 0, 1]);
  });

  it("buckets counts into levels relative to the busiest month", () => {
    const dates = [d(2020, 0, 1), d(2020, 0, 2), d(2020, 0, 3), d(2020, 0, 4), d(2020, 1), d(2020, 2, 1), d(2020, 2, 2)];
    const [year] = writingActivity(dates, d(2020, 11));
    expect(year!.months.slice(0, 4).map((month) => [month.count, month.level])).toEqual([
      [4, 4],
      [1, 1],
      [2, 2],
      [0, 0],
    ]);
  });

  it("marks empty months after now as future", () => {
    const [year] = writingActivity([d(2026, 1)], d(2026, 8, 28));
    expect(year!.months.map((month) => month.future)).toEqual([false, false, false, false, false, false, false, false, false, true, true, true]);
  });
});
