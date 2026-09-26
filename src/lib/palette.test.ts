import { describe, expect, it } from "vitest";
import { complete, fuzzyScore, lsKind, normalisePath, parentPath, parseInput, rank, type PaletteEntry } from "./palette";

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

  it("maps ls targets to entry kinds", () => {
    expect(lsKind("posts")).toBe("post");
    expect(lsKind("topics/")).toBe("topic");
    expect(lsKind("nope")).toBeUndefined();
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
