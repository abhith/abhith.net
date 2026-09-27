import { describe, expect, it } from "vitest";
import { elementGroup, elementSymbols, shortToolName } from "./periodic";

describe("shortToolName", () => {
  it.each([
    ["Forminit (formerly Getform.io) - Headless Form Backend API", "Forminit"],
    ["GitHub - chocolatey/ChocolateyGUI: A delicious GUI for Chocolatey", "ChocolateyGUI"],
    ["Wappalyzer - Technology profiler - Chrome Web Store", "Wappalyzer"],
    ["MegaLinter by OX Security", "MegaLinter"],
    ["containrrr/watchtower", "watchtower"],
    ["Kubecost | Kubernetes cost monitoring and management", "Kubecost"],
    ["Meta Tags — Preview, Edit and Generate", "Meta Tags"],
    ["YayText: A text styling tool for Facebook, Twitter, etc.", "YayText"],
    ["Base64 to Image Decoder / Converter", "Base64 to Image Decoder"],
    ["Try .NET | Runnable .NET code on your site", "Try .NET"],
    ["Time.is - exact time, any time zone", "Time.is"],
    ["Blur Busters TestUFO Motion Tests. Benchmark for monitors & displays.", "Blur Busters TestUFO Motion Tests"],
    ["Keyviz", "Keyviz"],
  ])("%s → %s", (title, expected) => {
    expect(shortToolName(title)).toBe(expected);
  });
});

describe("elementSymbols", () => {
  it("prefers word initials, then letters of the name", () => {
    expect(elementSymbols(["Fake Mock API", "YayText", "Keyviz", "SHA-256 Hash Generator", "Base64 to Image Decoder"])).toEqual([
      "Fm",
      "Yt",
      "Ke",
      "Sh",
      "Bi",
    ]);
  });

  it("keeps symbols unique", () => {
    const symbols = elementSymbols(["Git", "Giscus", "GitHub", "Gist", "Gi"]);
    expect(new Set(symbols).size).toBe(symbols.length);
    for (const symbol of symbols) expect(symbol).toMatch(/^[A-Z][a-z]$/);
  });

  it("never returns an empty symbol", () => {
    expect(elementSymbols(["123", ""])).toEqual(["X0", "X1"]);
  });
});

describe("elementGroup", () => {
  it("prefers a specific topic over the generic one", () => {
    expect(elementGroup(["developer-tools", "windows"])).toBe("windows");
    expect(elementGroup(["chrome", "developer-tools"])).toBe("chrome");
    expect(elementGroup(["developer-tools"])).toBe("developer-tools");
  });
});
