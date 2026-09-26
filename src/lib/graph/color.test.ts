import { describe, expect, it } from "vitest";
import { shortHash, topicHue } from "./color";

describe("topicHue", () => {
  it("is stable and within 0-359", () => {
    for (const slug of ["azure", "docker", "git", "c-sharp", ""]) {
      const hue = topicHue(slug);
      expect(hue).toBe(topicHue(slug));
      expect(hue).toBeGreaterThanOrEqual(0);
      expect(hue).toBeLessThan(360);
    }
  });

  it("spreads different slugs", () => {
    const hues = new Set(["azure", "docker", "git", "linux", "sql-server", "javascript"].map(topicHue));
    expect(hues.size).toBeGreaterThanOrEqual(5);
  });
});

describe("shortHash", () => {
  it("returns a stable lowercase hex string of the requested length", () => {
    expect(shortHash("/blog/docker-cookbook/")).toMatch(/^[0-9a-f]{7}$/);
    expect(shortHash("/blog/docker-cookbook/")).toBe(shortHash("/blog/docker-cookbook/"));
    expect(shortHash("a")).not.toBe(shortHash("b"));
    expect(shortHash("x", 12)).toHaveLength(12);
  });
});
