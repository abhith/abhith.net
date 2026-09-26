import { execSync } from "node:child_process";

function commitHash(): string {
  const fromEnv =
    process.env.COMMIT_REF ?? // Netlify
    process.env.VERCEL_GIT_COMMIT_SHA ?? // Vercel
    process.env.CF_PAGES_COMMIT_SHA ?? // Cloudflare Pages
    process.env.GITHUB_SHA; // GitHub Actions / Pages
  if (fromEnv) return fromEnv.slice(0, 7);
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || "local";
  } catch {
    return "local";
  }
}

/** Evaluated once at build time; shown in the status bar. */
export const BUILD = {
  hash: commitHash(),
  date: new Date().toISOString().slice(0, 10),
};
