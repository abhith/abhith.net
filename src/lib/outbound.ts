/**
 * Outbound links: every link that leaves the site gets `ref=abhith.net` plus `utm_source=abhith.net`
 * (with a medium and campaign), so the sites I link to can see the traffic in their analytics.
 * `ref` is the short form Plausible, Fathom, Ghost, Substack & co. read, and it survives the privacy
 * browsers/extensions that strip `utm_*`. Used by the recommended cards and, through
 * src/plugins/rehype-outbound-links.ts, by Markdown content.
 */
export const REF_SOURCE = "abhith.net";

/** Hosts that are this site. */
const SELF_HOSTS = new Set(["abhith.net", "www.abhith.net"]);

/** My own profiles: tagging them tells nobody anything and would break `rel="me"` matching. */
const SELF_PROFILES = [/^(x|twitter)\.com\/abhithrajan\b/i, /^github\.com\/abhith\b/i, /^(www\.)?linkedin\.com\/in\/abhith\b/i];

/** Query keys that suggest a signed or single-use URL, where an extra parameter could break it. */
const SIGNED_KEYS = /^(sig|signature|token|x-amz-.+|se|sp|sv|expires)$/i;

export interface RefOptions {
  /** Where on the site the link lives, e.g. `blog`, `recommended-stories`. */
  campaign: string;
  /** Finer detail such as the post slug. */
  content?: string;
  /** Defaults to `referral`. */
  medium?: string;
}

/** True for absolute http(s) links that point away from this site. */
export function isOutbound(href: string): boolean {
  try {
    const url = new URL(href);
    return (url.protocol === "https:" || url.protocol === "http:") && !SELF_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

/**
 * Adds `ref` and the UTM parameters to an outbound link. Leaves the link as-is when it is internal,
 * not http(s), already tagged, one of my own profiles, or looks signed.
 */
export function withRef(href: string, { campaign, content, medium = "referral" }: RefOptions): string {
  if (!isOutbound(href)) return href;
  const url = new URL(href);
  if (url.searchParams.has("utm_source")) return href;
  if (SELF_PROFILES.some((pattern) => pattern.test(`${url.hostname}${url.pathname}`))) return href;
  if ([...url.searchParams.keys()].some((key) => SIGNED_KEYS.test(key))) return href;

  if (!url.searchParams.has("ref")) url.searchParams.set("ref", REF_SOURCE);
  url.searchParams.set("utm_source", REF_SOURCE);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign);
  if (content) url.searchParams.set("utm_content", content);
  return url.href;
}

/** Who a link credits as the referrer (`utm_source`, else `ref`), if anyone. */
export function refSourceOf(url: URL): string | undefined {
  return url.searchParams.get("utm_source") ?? url.searchParams.get("ref") ?? undefined;
}
