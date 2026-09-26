/**
 * Social card renderer: Satori (HTML/flexbox → SVG) + resvg (SVG → PNG), 1200×630.
 * The card is an editor window with a file tab, title, description, tag tokens and author.
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { topicHue } from "./graph/color";

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => readFileSync(join(require.resolve(`${pkg}/package.json`), "..", "files", file));

let fonts: Parameters<typeof satori>[1]["fonts"] | undefined;
const loadFonts = () =>
  (fonts ??= [
    { name: "Inter", data: font("@fontsource/inter", "inter-latin-400-normal.woff"), weight: 400, style: "normal" },
    { name: "Inter", data: font("@fontsource/inter", "inter-latin-700-normal.woff"), weight: 700, style: "normal" },
    { name: "JetBrains Mono", data: font("@fontsource/jetbrains-mono", "jetbrains-mono-latin-400-normal.woff"), weight: 400, style: "normal" },
  ]);

let avatar: string | undefined;
const loadAvatar = () => (avatar ??= `data:image/jpeg;base64,${readFileSync(join(process.cwd(), "src/content/authors/avatars/abhith.jpg")).toString("base64")}`);

/** Satori has no emoji font bundled; strip pictographs (and variation selectors / ZWJ) from text. */
export const stripEmoji = (text: string) =>
  text
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();

export interface OgCard {
  /** File name shown in the editor tab, e.g. `docker-cookbook.mdx`. */
  file: string;
  /** Breadcrumb-like path shown in the title bar, e.g. `~/blog`. */
  path: string;
  title: string;
  description?: string;
  tags?: readonly string[];
  /** Footer meta, e.g. `2019-12-24 · 6 min read`. */
  meta?: string;
}

type El = { type: string; props: Record<string, unknown> & { children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): El => ({
  type,
  props: { style: { display: "flex", ...style }, children, ...extra },
});

/** resvg can't paint `hsl(… / alpha)`, so tag colours are converted to rgba. */
function hsl(h: number, s: number, l: number, alpha = 1): string {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return `rgba(${f(0)}, ${f(8)}, ${f(4)}, ${alpha})`;
}

const C = { bg: "#f7f5ef", surface: "#fffefa", sunken: "#efece3", fg: "#1d1b16", muted: "#5f5a50", line: "#e1dccf", accent: "#0b6e4f", warm: "#a2461a" };

export async function renderOgPng(card: OgCard): Promise<Buffer> {
  const title = stripEmoji(card.title);
  const titleSize = title.length > 90 ? 46 : title.length > 55 ? 54 : title.length > 32 ? 60 : 68;
  const description = card.description ? stripEmoji(card.description) : undefined;

  const tags = (card.tags ?? []).slice(0, 4).map((tag) =>
    h(
      "div",
      {
        fontFamily: "JetBrains Mono",
        fontSize: 22,
        padding: "6px 14px",
        borderRadius: 8,
        color: hsl(topicHue(tag), 62, 34),
        background: hsl(topicHue(tag), 62, 34, 0.1),
        border: `1px solid ${hsl(topicHue(tag), 62, 34, 0.3)}`,
      },
      `#${tag}`,
    ),
  );

  const tree = h(
    "div",
    { width: 1200, height: 630, padding: 40, background: C.bg, fontFamily: "Inter" },
    h(
      "div",
      { flexDirection: "column", width: "100%", height: "100%", background: C.surface, border: `2px solid ${C.line}`, borderRadius: 24, overflow: "hidden" },
      [
        h("div", { alignItems: "center", gap: 12, height: 64, padding: "0 24px", background: C.sunken, borderBottom: `2px solid ${C.line}` }, [
          h("div", { width: 18, height: 18, borderRadius: 9, background: "#ff5f57" }),
          h("div", { width: 18, height: 18, borderRadius: 9, background: "#febc2e" }),
          h("div", { width: 18, height: 18, borderRadius: 9, background: "#28c840" }),
          h("div", { marginLeft: 20, fontFamily: "JetBrains Mono", fontSize: 22, color: C.muted }, card.path),
        ]),
        h("div", { height: 56, borderBottom: `2px solid ${C.line}`, background: C.sunken }, [
          h(
            "div",
            { alignItems: "center", padding: "0 26px", background: C.surface, borderRight: `2px solid ${C.line}`, borderTop: `4px solid ${C.accent}`, fontFamily: "JetBrains Mono", fontSize: 22, color: C.fg },
            card.file,
          ),
        ]),
        h("div", { flexDirection: "column", flex: 1, padding: "30px 56px 30px", gap: 14 }, [
          h("div", { fontSize: titleSize, fontWeight: 700, color: C.fg, lineHeight: 1.12, letterSpacing: -1.5, flexShrink: 0 }, title),
          description ? h("div", { display: "block", fontSize: 27, color: C.muted, lineHeight: 1.4, lineClamp: 2, flexShrink: 0 }, description) : null,
          h("div", { gap: 12, marginTop: "auto" }, tags),
        ]),
        h("div", { alignItems: "center", gap: 16, padding: "18px 56px", borderTop: `2px dashed ${C.line}` }, [
          { type: "img", props: { src: loadAvatar(), width: 48, height: 48, style: { borderRadius: 24 } } },
          h("div", { fontSize: 24, fontWeight: 700, color: C.fg }, "Abhith Rajan"),
          h("div", { fontFamily: "JetBrains Mono", fontSize: 22, color: C.muted }, card.meta ?? ""),
          h("div", { marginLeft: "auto", fontFamily: "JetBrains Mono", fontSize: 24, color: C.accent }, "abhith.net"),
        ]),
      ],
    ),
  );

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: loadFonts() });
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}
