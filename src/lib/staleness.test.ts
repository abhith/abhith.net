import { describe, expect, it } from "vitest";
import { staleYears } from "./staleness";

const now = new Date("2026-09-30T00:00:00Z");

describe("staleYears", () => {
  it("flags technical posts untouched for three years or more", () => {
    expect(staleYears({ lastModified: new Date("2020-06-20T00:00:00Z"), topics: ["aspnet-core"] }, now)).toBe(6);
    expect(staleYears({ lastModified: new Date("2023-09-01T00:00:00Z"), topics: ["azure"] }, now)).toBe(3);
  });

  it("leaves recent posts alone", () => {
    expect(staleYears({ lastModified: new Date("2023-12-01T00:00:00Z"), topics: ["azure"] }, now)).toBeUndefined();
  });

  it("uses the amended date, so updating a post clears the banner", () => {
    expect(staleYears({ lastModified: new Date("2026-01-10T00:00:00Z"), topics: ["gatsby"] }, now)).toBeUndefined();
  });

  it("never flags evergreen topics", () => {
    expect(staleYears({ lastModified: new Date("2017-12-31T00:00:00Z"), topics: ["general"] }, now)).toBeUndefined();
    expect(staleYears({ lastModified: new Date("2019-05-01T00:00:00Z"), topics: ["awesome-list", "laptops"] }, now)).toBeUndefined();
  });

  it("honours a custom threshold", () => {
    expect(staleYears({ lastModified: new Date("2024-09-01T00:00:00Z"), topics: ["docker"] }, now, 2)).toBe(2);
  });
});
