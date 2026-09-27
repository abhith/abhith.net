import { describe, expect, it } from "vitest";
import { formatStars, repoSlug } from "./github-stars";

describe("formatStars", () => {
  it("keeps small counts as-is and compacts large ones", () => {
    expect(formatStars(0)).toBe("0");
    expect(formatStars(42)).toBe("42");
    expect(formatStars(1234)).toBe("1.2k");
    expect(formatStars(15000)).toBe("15k");
  });
});

describe("repoSlug", () => {
  it("extracts owner/name from the repo url", () => {
    expect(repoSlug("https://github.com/abhith/abhith.net")).toBe("abhith/abhith.net");
    expect(repoSlug("https://github.com/abhith/abhith.net/")).toBe("abhith/abhith.net");
    expect(repoSlug("https://github.com/abhith/abhith.net.git")).toBe("abhith/abhith.net");
  });
});
