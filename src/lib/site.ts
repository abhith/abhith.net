export const SITE = {
  url: "https://www.abhith.net",
  title: "Abhith Rajan",
  shortTitle: "Abhith",
  description: "Abhith Rajan is a Dubai-based software engineer shipping .NET, Azure and web systems since 2012 — notes, snippets and curated links on building and running software.",
  locale: "en",
  author: {
    name: "Abhith Rajan",
    url: "https://x.com/abhithrajan",
    image: "/img/abhith.jpg",
  },
  social: {
    twitter: "@AbhithRajan",
    github: "Abhith",
  },
  repo: {
    url: "https://github.com/abhith/abhith.net",
    branch: "master",
  },
  /** Items per page for every paginated listing (matches gatsby-awesome-pagination config). */
  pageSize: 10,
} as const;

/** `true` for `astro build`, `false` for `astro dev`. Drafts are only visible in dev. */
export const IS_PROD = import.meta.env.PROD;
