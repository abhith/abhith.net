import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { detectFenceLanguage, isKnownLanguage, langFromSearch, language, languageCounts, languageId, snippetLanguage } from "./snippet-lang";

describe("languageId", () => {
  it("resolves every spelling to one canonical id", () => {
    expect(languageId("cs")).toBe("csharp");
    expect(languageId("C#")).toBe("csharp");
    expect(languageId(" JS ")).toBe("javascript");
    expect(languageId("sh")).toBe("bash");
    expect(languageId("ps1")).toBe("powershell");
    expect(languageId("sql-server")).toBe("sql");
  });

  it("keeps unknown languages, lower-cased", () => {
    expect(languageId("Rust")).toBe("rust");
  });
});

describe("language", () => {
  it("returns the glyph and label for known languages", () => {
    expect(language("cs")).toMatchObject({ id: "csharp", label: "C#", glyph: "C#" });
    expect(language("powershell")).toMatchObject({ id: "powershell", glyph: "PS" });
  });

  it("derives a glyph and a stable hue for unknown languages", () => {
    const rust = language("rust");
    expect(rust.glyph).toBe("RUS");
    expect(rust.hue).toBe(language("RUST").hue);
  });
});

describe("detectFenceLanguage", () => {
  it("uses the first code fence", () => {
    expect(detectFenceLanguage("Intro\n\n```cs\nvar a = 1;\n```\n\n```js\nx\n```")).toBe("csharp");
  });

  it("ignores Expressive Code meta after the language", () => {
    expect(detectFenceLanguage('```ts title="a.ts" {2-4}\nconst a = 1;\n```')).toBe("typescript");
  });

  it("skips diagrams and plain output", () => {
    expect(detectFenceLanguage("```mermaid\ngraph TD\n```\n```text\nout\n```\n```sql\nSELECT 1\n```")).toBe("sql");
  });

  it("returns undefined without a labelled fence", () => {
    expect(detectFenceLanguage("No code here.")).toBeUndefined();
    expect(detectFenceLanguage("```\nunlabelled\n```")).toBeUndefined();
  });
});

describe("snippetLanguage", () => {
  it("prefers frontmatter, then the first fence, then the category", () => {
    expect(snippetLanguage({ language: "pwsh", body: "```bash\nls\n```", category: "linux" }).id).toBe("powershell");
    expect(snippetLanguage({ body: "```bash\nls\n```", category: "git" }).id).toBe("bash");
    expect(snippetLanguage({ body: "", category: "sql-server" }).id).toBe("sql");
  });

  it("detects a registered language for every real snippet", () => {
    const root = join(process.cwd(), "src/content/snippets");
    for (const category of readdirSync(root)) {
      for (const file of readdirSync(join(root, category)).filter((name) => name.endsWith(".mdx"))) {
        const body = readFileSync(join(root, category, file), "utf8");
        const detected = detectFenceLanguage(body);
        expect(detected, `${category}/${file} has no labelled code fence`).toBeDefined();
        expect(isKnownLanguage(detected!), `${category}/${file}: add "${detected}" to the registry`).toBe(true);
      }
    }
  });
});

describe("langFromSearch", () => {
  it("reads and normalises the lang parameter", () => {
    expect(langFromSearch("?lang=cs")).toBe("csharp");
    expect(langFromSearch("?page=2&lang=SQL")).toBe("sql");
  });

  it("returns undefined when absent or empty", () => {
    expect(langFromSearch("")).toBeUndefined();
    expect(langFromSearch("?lang=")).toBeUndefined();
    expect(langFromSearch("?lang=%20")).toBeUndefined();
  });
});

describe("languageCounts", () => {
  it("counts snippets per language, most used first", () => {
    const snippets = ["cs", "js", "csharp", "sql", "js", "c#"].map((name) => ({ language: language(name) }));
    expect(languageCounts(snippets).map(({ language: lang, count }) => [lang.id, count])).toEqual([
      ["csharp", 3],
      ["javascript", 2],
      ["sql", 1],
    ]);
  });
});
