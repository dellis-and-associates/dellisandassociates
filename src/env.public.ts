/**
 * Browser-safe environment. Only NEXT_PUBLIC_* keys, each referenced
 * literally so Next.js can inline them at build time. This is the second and
 * last sanctioned reader of `process.env`; `verify:env` enforces that.
 */
export const publicEnv = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
  /** Set at build time when a RUM endpoint is configured; the beacon script is not loaded otherwise. */
  RUM_ENABLED: process.env.NEXT_PUBLIC_RUM_ENABLED === "true",
} as const;
