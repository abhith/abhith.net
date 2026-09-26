/** Extracts the YouTube video id from `watch?v=`, `youtu.be/`, `embed/` or `shorts/` URLs. */
export function youtubeId(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return parsed.pathname.slice(1).split("/")[0] || undefined;
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const v = parsed.searchParams.get("v");
      if (v) return v;
      const match = parsed.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{6,})/);
      return match?.[1];
    }
  } catch {
    return undefined;
  }
  return undefined;
}
