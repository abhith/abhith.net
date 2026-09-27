import { describe, expect, it } from "vitest";
import { cdCommand, complete, copyPeek, fuzzyScore, lsKind, normalisePath, parentPath, parseInput, peekCommand, rank, type PaletteEntry } from "./palette";

const entries: PaletteEntry[] = [
  { t: "Docker Cookbook", u: "/blog/docker-cookbook/", k: "post", g: ["docker"] },
  { t: "Azure Web App - Missing Mime Types", u: "/blog/azure-web-app-missing-mime-types/", k: "post", g: ["azure"] },
  { t: "Azure", u: "/topics/azure/", k: "topic" },
  { t: "Delete all local & remote git tags", u: "/snippets/git/delete-all-local-remote-git-tags/", k: "snippet" },
];

describe("parseInput", () => {
  it("recognises commands with arguments", () => {
    expect(parseInput("cd topics/azure")).toMatchObject({ command: "cd", arg: "topics/azure" });
    expect(parseInput("  grep   docker compose ")).toMatchObject({ command: "grep", arg: "docker compose" });
  });

  it("recognises bare commands", () => {
    expect(parseInput("random")).toMatchObject({ command: "random", arg: "" });
    expect(parseInput("help")).toMatchObject({ command: "help" });
    expect(parseInput("star")).toMatchObject({ command: "star", arg: "" });
  });

  it("treats anything else as free text", () => {
    expect(parseInput("docker")).toMatchObject({ command: null, arg: "docker" });
    expect(parseInput("cdk deploy")).toMatchObject({ command: null, arg: "cdk deploy" });
  });
});

describe("fuzzyScore / rank", () => {
  it("returns 0 when characters are missing or out of order", () => {
    expect(fuzzyScore("xyz", "Docker Cookbook")).toBe(0);
    expect(fuzzyScore("kcod", "docker")).toBe(0);
  });

  it("prefers prefix and word-start matches", () => {
    expect(fuzzyScore("dock", "Docker Cookbook")).toBeGreaterThan(fuzzyScore("dock", "mydocuments backup"));
  });

  it("ranks the best matches first", () => {
    expect(rank("azure", entries).map((e) => e.u)[0]).toBe("/topics/azure/");
    expect(rank("git tags", entries).map((e) => e.k)).toEqual(["snippet"]);
  });
});

describe("paths", () => {
  it("normalises cd arguments", () => {
    expect(normalisePath("topics/azure")).toBe("/topics/azure/");
    expect(normalisePath("~/blog/")).toBe("/blog/");
    expect(normalisePath("~")).toBe("/");
    expect(normalisePath("")).toBe("/");
    expect(normalisePath("..")).toBe("..");
  });

  it("computes the parent path", () => {
    expect(parentPath("/blog/docker-cookbook/")).toBe("/blog/");
    expect(parentPath("/blog/")).toBe("/");
    expect(parentPath("/")).toBe("/");
  });

  it("describes a navigation as the cd command a human would type", () => {
    expect(cdCommand("/", "/blog/")).toBe("cd ~/blog/");
    expect(cdCommand("/blog/docker-cookbook/", "/")).toBe("cd ~");
    expect(cdCommand("/blog/docker-cookbook/", "/blog/")).toBe("cd ..");
    expect(cdCommand("/topics/", "/topics/azure/")).toBe("cd azure/");
    expect(cdCommand("/topics/azure/", "/topics/docker/")).toBe("cd ../docker/");
    expect(cdCommand("/blog/", "/about/")).toBe("cd ~/about/");
    expect(cdCommand("/blog/2/", "/topics/azure/videos/")).toBe("cd ~/topics/azure/videos/");
    expect(cdCommand("/about", "/about/")).toBe("cd .");
  });

  it("maps ls targets to entry kinds", () => {
    expect(lsKind("posts")).toBe("post");
    expect(lsKind("topics/")).toBe("topic");
    expect(lsKind("nope")).toBeUndefined();
  });
});

describe("peekCommand", () => {
  const here = new URL("https://www.abhith.net/blog/docker-cookbook/");
  const peek = (href: string) => peekCommand(here, new URL(href, here));

  it("previews internal pages as cd commands", () => {
    expect(peek("/snippets/")).toEqual({ command: "cd ~/snippets/", external: false });
    expect(peek("/blog/")).toEqual({ command: "cd ..", external: false });
    expect(peek("/blog/other-post/")).toEqual({ command: "cd ../other-post/", external: false });
  });

  it("previews files, anchors and mail", () => {
    expect(peek("/blog/rss.xml")?.command).toBe("cat ~/blog/rss.xml");
    expect(peek("#setup")?.command).toBe('grep -n "#setup"');
    expect(peek("mailto:abhith@pm.me")).toEqual({ command: "mail abhith@pm.me", external: true });
  });

  it("previews other sites as open, shortened", () => {
    expect(peek("https://www.github.com/abhith/")).toEqual({ command: "open github.com/abhith", external: true });
    expect(peekCommand(here, new URL("https://example.com/a/very/long/path/that/keeps/going"), 20)?.command).toBe("open example.com/a/very/…");
  });

  it("shows who a tagged outbound link credits", () => {
    expect(peek("https://learn.microsoft.com/azure/?ref=abhith.net&utm_source=abhith.net")).toEqual({ command: "open learn.microsoft.com/azure", external: true, ref: "abhith.net" });
  });

  it("previews code copy buttons", () => {
    expect(copyPeek("git tag -d $(git tag -l)", "sh").command).toBe("pbcopy < snippet.sh  # 1 line");
    expect(copyPeek("a\u007fb\u007fc").command).toBe("pbcopy < snippet.txt  # 3 lines");
  });

  it("stays quiet for the current page and non-web links", () => {
    expect(peek("/blog/docker-cookbook/")).toBeNull();
    expect(peek("tel:+971500000000")).toBeNull();
  });
});

describe("complete", () => {
  it("completes command names", () => {
    expect(complete("the")).toBe("theme ");
    expect(complete("gr")).toBe("grep ");
    expect(complete("zzz")).toBe("zzz");
  });

  it("completes arguments from the first suggestion", () => {
    expect(complete("cd top", "topics/")).toBe("cd topics/");
    expect(complete("theme m", "midnight")).toBe("theme midnight");
  });
});
