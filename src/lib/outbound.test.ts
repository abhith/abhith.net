import { describe, expect, it } from "vitest";
import { refFor } from "../plugins/rehype-outbound-links";
import { isOutbound, withRef } from "./outbound";

describe("withRef", () => {
  it("tags outbound links with source, medium and campaign", () => {
    const url = new URL(withRef("https://forminit.com/", { campaign: "recommended-tools" }));
    expect(url.searchParams.get("utm_source")).toBe("abhith.net");
    expect(url.searchParams.get("utm_medium")).toBe("referral");
    expect(url.searchParams.get("utm_campaign")).toBe("recommended-tools");
    expect(url.searchParams.has("utm_content")).toBe(false);
  });

  it("keeps existing query strings and hashes", () => {
    expect(withRef("https://example.com/docs?page=2#install", { campaign: "blog", content: "my-post" })).toBe(
      "https://example.com/docs?page=2&utm_source=abhith.net&utm_medium=referral&utm_campaign=blog&utm_content=my-post#install",
    );
  });

  it("leaves links alone when tagging would be wrong or pointless", () => {
    const skip = [
      "/blog/",
      "https://www.abhith.net/about/",
      "mailto:abhith@pm.me",
      "https://example.com/?utm_source=newsletter",
      "https://x.com/abhithrajan",
      "https://github.com/Abhith/abhith.net",
      "https://www.linkedin.com/in/abhith/",
      "https://storage.blob.core.windows.net/file.zip?sv=2024&sig=abc",
    ];
    for (const href of skip) expect(withRef(href, { campaign: "blog" })).toBe(href);
  });

  it("detects outbound links", () => {
    expect(isOutbound("https://learn.microsoft.com/")).toBe(true);
    expect(isOutbound("https://abhith.net/")).toBe(false);
    expect(isOutbound("/topics/azure/")).toBe(false);
  });
});

describe("refFor", () => {
  it("derives the campaign from the content file path", () => {
    expect(refFor("/repo/src/content/blog/docker-cookbook/index.mdx")).toEqual({ campaign: "blog", content: "docker-cookbook" });
    expect(refFor("/repo/src/content/snippets/git/delete-tags.md")).toEqual({ campaign: "snippets", content: "delete-tags" });
    expect(refFor("/repo/src/content/pages/about.md")).toEqual({ campaign: "about" });
    expect(refFor("/repo/src/pages/donate.mdx")).toEqual({ campaign: "donate" });
    expect(refFor(undefined)).toEqual({ campaign: "site" });
  });
});
