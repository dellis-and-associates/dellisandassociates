/**
 * Pure environment schema and validator. No side effects; it never touches the
 * real environment: `src/env.ts` feeds it at boot and `scripts/verify-env.mts` feeds it
 * candidate environments. Keep it dependency-free so Node can run it directly.
 */
type Spec = {
  required: boolean;
  default?: string;
  /** Return an error message, or null when the value is acceptable. */
  validate?: (value: string) => string | null;
  /** Message logged when an optional key is absent. */
  degrade?: string;
};

/** True for the Docker database in docker-compose.yml. Push mode is allowed only there. */
/** The one public origin. Canonical URLs, OG `url`, JSON-LD and the sitemap derive from it. */
export const PRODUCTION_SITE_URL = "https://www.desertpeakinsurance.com";

export const isLocalDatabase = (uri: string | undefined): boolean => {
  if (!uri) return false;
  try {
    const host = new URL(uri).hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "postgres";
  } catch {
    return false;
  }
};

const postgresUrl = (expectedPort: number) => (v: string) => {
  if (!/^postgres(ql)?:\/\//.test(v)) return "must be a postgres:// URL";
  let port: string;
  try {
    port = new URL(v).port;
  } catch {
    return "is not a parseable URL";
  }
  if (isLocalDatabase(v)) return null; // Docker: any port
  if (port !== String(expectedPort))
    return `must use port ${expectedPort} (found ${port || "none"})`;
  return null;
};

const httpsUrl = (v: string) => {
  try {
    const u = new URL(v);
    if (u.protocol !== "https:" && u.hostname !== "localhost")
      return "must be https:// (http only for localhost)";
    return null;
  } catch {
    return "is not a valid URL";
  }
};

const nonEmpty = (v: string) => (v.trim() === "" ? "must not be empty" : null);

/** Cloudflare's documented dummy keys. Exact matches only. */
export const TURNSTILE_TEST_SITE_KEYS = new Set([
  "1x00000000000000000000AA", // always passes, visible
  "2x00000000000000000000AB", // always blocks, visible
  "3x00000000000000000000FF", // forces interactive challenge
]);
export const TURNSTILE_TEST_SECRET_KEYS = new Set([
  "1x0000000000000000000000000000000AA", // always passes
  "2x0000000000000000000000000000000AA", // always fails
  "3x0000000000000000000000000000000AA", // token already spent
]);

export const schema = {
  // Supabase Project A (customer auth + app data)
  NEXT_PUBLIC_SUPABASE_URL: { required: true, validate: httpsUrl },
  NEXT_PUBLIC_SUPABASE_ANON_KEY: { required: true, validate: nonEmpty },
  SUPABASE_SERVICE_ROLE_KEY: { required: true, validate: nonEmpty },

  // Supabase Project B (Payload)
  PAYLOAD_DATABASE_URI: { required: true, validate: postgresUrl(6543) },
  PAYLOAD_DATABASE_URI_DIRECT: {
    required: false,
    validate: postgresUrl(5432),
    degrade:
      "PAYLOAD_DATABASE_URI_DIRECT is unset; migrations and seeding will refuse to run.",
  },
  PAYLOAD_SECRET: {
    required: true,
    validate: (v) => (v.length < 32 ? "must be at least 32 characters" : null),
  },

  // Media
  S3_ENDPOINT: { required: true, validate: httpsUrl },
  S3_REGION: { required: true, validate: nonEmpty },
  S3_BUCKET: { required: true, validate: nonEmpty },
  S3_ACCESS_KEY_ID: { required: true, validate: nonEmpty },
  S3_SECRET_ACCESS_KEY: { required: true, validate: nonEmpty },

  // Email (optional; leads are saved even when unset)
  RESEND_API_KEY: {
    required: false,
    degrade: "RESEND_API_KEY is unset; lead notifications will be logged, not sent.",
  },
  OWNER_EMAIL: { required: false, degrade: "OWNER_EMAIL is unset; no notification inbox." },
  EMAIL_FROM: { required: false, degrade: "EMAIL_FROM is unset; no verified sender." },

  // Site (production: exactly PRODUCTION_SITE_URL; previews and local hosts are free)
  NEXT_PUBLIC_SITE_URL: {
    required: true,
    validate: (v) => httpsUrl(v) ?? (v.endsWith("/") ? "must not end with a slash" : null),
  },

  // Turnstile
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: { required: true, validate: nonEmpty },
  TURNSTILE_SECRET_KEY: { required: true, validate: nonEmpty },

  // Referral engine
  REFERRAL_COOKIE_DAYS: {
    required: false,
    default: "90",
    validate: (v) =>
      /^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 365
        ? null
        : "must be an integer between 1 and 365",
  },
  DEFAULT_TENANT_ID: { required: true, validate: nonEmpty },
  REFERRAL_HASH_SALT: {
    required: true,
    validate: (v) => (v.length < 32 ? "must be at least 32 characters" : null),
  },

  // Set by the migrate:* and seed scripts only; switches the adapter to PAYLOAD_DATABASE_URI_DIRECT.
  PAYLOAD_MIGRATING: { required: false },

  // Deployment tier. Vercel sets VERCEL_ENV (production | preview | development);
  // APP_ENV overrides it for non-Vercel hosts. The go-live guards fire only on "production".
  VERCEL_ENV: { required: false },
  APP_ENV: {
    required: false,
    validate: (v) => (["local", "preview", "production"].includes(v) ? null : "must be local, preview or production"),
  },

  // Real-user monitoring (optional). RUM_ENDPOINT is where the beacon posts; on this site it is our own /api/rum.
  RUM_ENDPOINT: { required: false, degrade: "RUM_ENDPOINT is unset; Core Web Vitals will not be collected." },
  RUM_WRITE_KEY: { required: false },
  NEXT_PUBLIC_RUM_ENABLED: { required: false },

  // Staging guard: set on preview deployments only; production refuses to boot with it on.
  STAGING_NOINDEX: { required: false, validate: (v) => (v === "true" || v === "false" ? null : 'must be "true" or "false"') },

  // IndexNow (optional): the key file is served at /{key}.txt and submissions run only in production.
  INDEXNOW_KEY: { required: false, validate: (v) => (/^[a-zA-Z0-9-]{8,128}$/.test(v) ? null : "must be 8–128 characters of letters, digits or hyphens") },

  // Error reporting (optional)
  ERROR_REPORTING_DSN: { required: false, degrade: "ERROR_REPORTING_DSN is unset; errors stay in server logs." },
} as const satisfies Record<string, Spec>;

export type EnvKey = keyof typeof schema;
export type AppEnv = "local" | "preview" | "production";
export type Env = { [K in EnvKey]: (typeof schema)[K] extends { required: true } | { default: string } ? string : string | undefined } & {
  NODE_ENV: "development" | "test" | "production";
  /** Which deployment this process is: the production guards key off this, not NODE_ENV (a local `next build` is also NODE_ENV=production). */
  APP_ENV: AppEnv;
};

export function resolveAppEnv(source: Record<string, string | undefined>): AppEnv {
  if (source.APP_ENV === "production" || source.APP_ENV === "preview" || source.APP_ENV === "local") return source.APP_ENV;
  if (source.VERCEL_ENV === "production") return "production";
  if (source.VERCEL_ENV === "preview") return "preview";
  return "local";
}

export class EnvError extends Error {
  readonly problems: string[];
  constructor(problems: string[]) {
    super(`Invalid environment:\n  - ${problems.join("\n  - ")}`);
    this.name = "EnvError";
    this.problems = problems;
  }
}

/**
 * Pure validator. Returns the typed env plus the warnings to log, or throws
 * `EnvError` listing every problem at once (never just the first).
 */
export function validateEnv(source: Record<string, string | undefined>): { env: Env; warnings: string[] } {
  const problems: string[] = [];
  const warnings: string[] = [];
  const out: Record<string, string | undefined> = {};
  const nodeEnv = source.NODE_ENV === "production" || source.NODE_ENV === "test" ? source.NODE_ENV : "development";
  const appEnv = resolveAppEnv(source);

  for (const [key, spec] of Object.entries(schema) as [EnvKey, Spec][]) {
    const raw = source[key];
    const value = raw === undefined || raw === "" ? spec.default : raw;
    if (value === undefined) {
      if (spec.required) problems.push(`${key} is required`);
      else if (spec.degrade) warnings.push(spec.degrade);
      out[key] = undefined;
      continue;
    }
    const err = spec.validate?.(value);
    if (err) problems.push(`${key} ${err}`);
    out[key] = value;
  }

  if (appEnv === "production") {
    if (TURNSTILE_TEST_SITE_KEYS.has(out.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""))
      problems.push("NEXT_PUBLIC_TURNSTILE_SITE_KEY is a Cloudflare test key; production refuses to boot");
    if (TURNSTILE_TEST_SECRET_KEYS.has(out.TURNSTILE_SECRET_KEY ?? ""))
      problems.push("TURNSTILE_SECRET_KEY is a Cloudflare test key; production refuses to boot");
    if (out.NEXT_PUBLIC_SITE_URL?.startsWith("http://"))
      problems.push("NEXT_PUBLIC_SITE_URL must be https in production");
    if (out.NEXT_PUBLIC_SITE_URL && out.NEXT_PUBLIC_SITE_URL !== PRODUCTION_SITE_URL)
      problems.push(`NEXT_PUBLIC_SITE_URL must be ${PRODUCTION_SITE_URL} in production (canonical, OG url and JSON-LD all derive from it)`);
    if (isLocalDatabase(out.PAYLOAD_DATABASE_URI))
      problems.push("PAYLOAD_DATABASE_URI points at a local database; production refuses to boot");
    if (out.STAGING_NOINDEX === "true")
      problems.push("STAGING_NOINDEX is true; that is a preview-only flag and production refuses to boot with it");
  }

  if (problems.length) throw new EnvError(problems);
  return { env: { ...(out as Omit<Env, "NODE_ENV" | "APP_ENV">), NODE_ENV: nodeEnv, APP_ENV: appEnv }, warnings };
}

