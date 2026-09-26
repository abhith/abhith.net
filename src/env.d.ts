interface ImportMetaEnv {
  /** `production` (default) allows indexing; anything else emits a disallow-all robots.txt. */
  readonly PUBLIC_SITE_ENV?: string;
  /** webmention.io API token; webmentions are skipped when missing. */
  readonly WEBMENTIONS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
