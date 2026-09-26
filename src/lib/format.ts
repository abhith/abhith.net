/** `2019-07-11` (UTC, like the Gatsby `YYYY-MM-DD` SEO format). */
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** `July 11, 2019` (UTC, like the Gatsby `MMMM DD, YYYY` format). */
export const longDate = (date: Date) =>
  date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit", timeZone: "UTC" });

/** `Jul 11, 2019`. */
export const shortDate = (date: Date) =>
  date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" });

export const plural = (count: number, word: string, pluralWord = `${word}s`) => `${count} ${count === 1 ? word : pluralWord}`;

/** Strips the protocol and `www.` from a URL for display: `github.blog`. */
export const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};
