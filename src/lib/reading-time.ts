import getReadingTime from "reading-time";

export interface ReadingTime {
  /** Human readable label, e.g. `4 min read` (same format as the Gatsby site). */
  text: string;
  minutes: number;
  words: number;
}

export function readingTime(text: string): ReadingTime {
  const stats = getReadingTime(text);
  return {
    text: stats.text,
    minutes: Math.max(1, Math.round(stats.minutes)),
    words: stats.words,
  };
}
