/**
 * Client side of the `/snippets/?lang=` filter (markup in `LangFilter.astro`): shows only the rows in
 * `[data-lang-list]` whose `data-lang` matches, reveals matching rows from later pages (rendered with
 * `data-row-extra`), hides the pager while filtering and updates the chips and status line.
 */
import { langFromSearch, language } from "./snippet-lang";

export function applyLangFilter(doc: Document = document, search: string = location.search): void {
  const root = doc.querySelector<HTMLElement>("[data-lang-filter]");
  if (!root) return;
  const lang = langFromSearch(search);
  let shown = 0;
  for (const row of doc.querySelectorAll<HTMLElement>("[data-lang-list] > li[data-lang]")) {
    const visible = lang ? row.dataset.lang === lang : !("rowExtra" in row.dataset);
    row.hidden = !visible;
    if (visible) shown += 1;
  }

  for (const pager of doc.querySelectorAll<HTMLElement>("[data-pager]")) pager.hidden = Boolean(lang);
  for (const option of root.querySelectorAll<HTMLElement>("[data-lang-option]")) {
    if ((option.dataset.langOption || undefined) === lang) option.setAttribute("aria-current", "page");
    else option.removeAttribute("aria-current");
  }

  const current = root.querySelector<HTMLElement>("[data-lang-current]");
  if (current) current.textContent = lang ?? "*";
  const status = root.querySelector<HTMLElement>("[data-lang-status]");
  if (!status) return;
  status.hidden = !lang;
  if (!lang) return;
  const label = language(lang).label;
  const clear = doc.createElement("a");
  clear.href = root.dataset.base ?? "/snippets/";
  clear.textContent = "clear filter";
  clear.className = "text-accent hover:underline";
  status.replaceChildren(shown > 0 ? `${shown} of ${root.dataset.total} snippets in ${label} · ` : `no ${label} snippets yet · `, clear);
}
