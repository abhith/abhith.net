import type { APIRoute } from "astro";

/**
 * Environment-aware robots.txt (replaces gatsby-plugin-robots-txt):
 * `PUBLIC_SITE_ENV=production` allows crawling and advertises the sitemap; any other value
 * (preview/staging deploys) disallows everything.
 */
export const GET: APIRoute = ({ site }) => {
  const production = (import.meta.env.PUBLIC_SITE_ENV ?? "production") === "production";
  const body = production
    ? ["User-agent: *", "Allow: /", "", `Sitemap: ${new URL("sitemap-index.xml", site).href}`, `Host: ${site?.host ?? "www.abhith.net"}`, ""]
    : ["User-agent: *", "Disallow: /", ""];
  return new Response(body.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
