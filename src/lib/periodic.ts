/**
 * Helpers for the home page "periodic table of tools": every recommended tool becomes an element
 * with a short name, a unique two-letter symbol and a group (the topic that colours its tile).
 */

const STOP_WORDS = new Set(["a", "an", "and", "by", "for", "of", "on", "the", "to", "with"]);

/** The catch-all tag; a more specific tag wins when a tool has one. */
const GENERIC_GROUP = "developer-tools";

/**
 * Strips taglines and noise from a bookmark title:
 * `GitHub - chocolatey/ChocolateyGUI: A delicious GUI` → `ChocolateyGUI`,
 * `Kubecost | Kubernetes cost monitoring` → `Kubecost`, `MegaLinter by OX Security` → `MegaLinter`.
 */
export function shortToolName(title: string): string {
  let name = title
    .trim()
    .replace(/^GitHub\s+-\s+/i, "")
    .replace(/\s*\([^)]*\)/g, "");
  name = name.split(/\s[-–—|/]\s|:\s|\.\s+(?=[A-Z])/)[0].trim();
  name = name.replace(/\s+by\s+\S.*$/i, "").trim();
  if (/^[\w.-]+\/[\w.-]+$/.test(name)) name = name.split("/")[1];
  return name || title.trim();
}

/** Words of a name, splitting camelCase too: `YayText` → `Yay`, `Text`. */
function words(name: string): string[] {
  return name
    .split(/[^A-Za-z0-9]+|(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/)
    .filter((word) => word.length > 0 && /[A-Za-z]/.test(word) && !STOP_WORDS.has(word.toLowerCase()));
}

function symbolCandidates(name: string): string[] {
  const parts = words(name);
  const letters = parts.join("").replace(/[^A-Za-z]/g, "");
  if (letters.length === 0) return [];
  const first = letters[0];
  const candidates: string[] = [];
  // Initials of the first two words read best (`Fake Mock API` → `Fm`), then letters of the name in order.
  for (const word of parts.slice(1)) {
    const initial = word.replace(/[^A-Za-z]/g, "")[0];
    if (initial) candidates.push(first + initial);
  }
  for (const letter of letters.slice(1)) candidates.push(first + letter);
  for (const letter of "abcdefghijklmnopqrstuvwxyz") candidates.push(first + letter);
  return candidates.map((symbol) => symbol[0].toUpperCase() + symbol.slice(1).toLowerCase());
}

/** Two-letter, chemistry-style symbols, unique within the list and assigned in order. */
export function elementSymbols(names: readonly string[]): string[] {
  const taken = new Set<string>();
  return names.map((name) => {
    const symbol = symbolCandidates(name).find((candidate) => !taken.has(candidate)) ?? `X${taken.size}`;
    taken.add(symbol);
    return symbol;
  });
}

/** The topic that colours an element: the first specific tag, else the generic one. */
export function elementGroup(tags: readonly string[]): string {
  return tags.find((tag) => tag !== GENERIC_GROUP) ?? tags[0] ?? GENERIC_GROUP;
}
