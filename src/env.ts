/**
 * The only reader of `process.env` in this repository (its browser-safe
 * subset lives in `src/env.public.ts`). Everything else imports `env` from
 * here. Validated once at module load: a missing required key throws with the
 * key's name; a missing optional key logs a warning and the feature degrades.
 *
 * Server only. Importing this from a `"use client"` file fails `verify:env`.
 * The schema itself lives in `src/env.schema.ts`.
 */
import { validateEnv, EnvError, type Env } from "./env.schema.ts";

export { EnvError, isLocalDatabase, schema, validateEnv, type Env, type EnvKey } from "./env.schema.ts";

if (typeof window !== "undefined") {
  throw new Error("src/env.ts is server-only; import src/env.public.ts in client code");
}

const loaded = validateEnv(process.env);
for (const w of loaded.warnings) console.warn(`[env] ${w}`);

export const env: Env = loaded.env;

/** Migrations, seeding and CI call this; runtime never does. */
export function requireDirectDatabaseUri(): string {
  if (!env.PAYLOAD_DATABASE_URI_DIRECT)
    throw new EnvError(["PAYLOAD_DATABASE_URI_DIRECT is required for migrations, seeding and CI"]);
  return env.PAYLOAD_DATABASE_URI_DIRECT;
}
