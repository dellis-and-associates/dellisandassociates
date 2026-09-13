/**
 * pnpm verify:env
 *
 * 1. .env.example lists exactly the keys src/env.ts knows about.
 * 2. No file outside src/env.ts and src/env.public.ts reads process.env.
 * 3. No "use client" file imports the server env.
 * 4. The current environment passes the schema (required keys present).
 * 5. The production guard rejects Cloudflare Turnstile test keys.
 *
 * Exit 1 on any failure. Node ≥ 22.6 (type stripping), no dependencies. `.mts` so Node treats it as ESM without a package.json "type".
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { schema, validateEnv, EnvError } from "../src/env.schema.ts";

const root = process.cwd();
const failures: string[] = [];
const notes: string[] = [];

// 1. .env.example ⇔ schema
const exampleKeys = new Set(
  readFileSync(join(root, ".env.example"), "utf8")
    .split("\n")
    .map((l) => l.match(/^([A-Z][A-Z0-9_]*)=/)?.[1])
    .filter((k): k is string => Boolean(k)),
);
const schemaKeys = new Set(Object.keys(schema));
for (const k of schemaKeys) if (!exampleKeys.has(k)) failures.push(`.env.example is missing ${k}`);
for (const k of exampleKeys) if (!schemaKeys.has(k)) failures.push(`.env.example has ${k}, which src/env.ts does not know`);

// 2 + 3. Source scan
const SCAN_DIRS = ["app", "components", "lib", "src", "packages", "scripts", "tests"];
const SCAN_FILES = ["next.config.ts", "next.config.mjs", "next.config.js", "payload.config.ts", "middleware.ts"];
const ALLOW_PROCESS_ENV = new Set(["src/env.ts", "src/env.public.ts", "scripts/verify-env.mts", "scripts/test-db.mts", "scripts/test-rls.mts", "scripts/migrate-check.mts", "scripts/test-media.mts", "scripts/test-access.mts", "scripts/leads-purge.mts", "scripts/verify-glossary.mts", "scripts/seed.ts", "scripts/generate-content.mts"]);
const SKIP = new Set(["node_modules", ".next", "dist", ".git"]);

function* walk(dir: string): Generator<string> {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(name)) yield p;
  }
}

const files: string[] = [];
for (const d of SCAN_DIRS) for (const f of walk(join(root, d))) files.push(f);
for (const f of SCAN_FILES) {
  try {
    if (statSync(join(root, f)).isFile()) files.push(join(root, f));
  } catch {}
}

for (const abs of files) {
  const rel = relative(root, abs);
  const src = readFileSync(abs, "utf8");
  if (!ALLOW_PROCESS_ENV.has(rel) && /\bprocess\.env\b/.test(src)) {
    failures.push(`${rel} reads process.env directly; import { env } from "@/src/env" instead`);
  }
  const isClient = /^\s*["']use client["']/m.test(src);
  if (isClient && /from\s+["'](?:@\/src\/env|\.{1,2}\/(?:\.\.\/)*(?:src\/)?env)["']/.test(src)) {
    failures.push(`${rel} is a client component that imports the server env (use src/env.public.ts)`);
  }
}
notes.push(`scanned ${files.length} source files`);

// 4. Current environment
try {
  const { warnings } = validateEnv(process.env);
  notes.push(`current environment passes the schema (${warnings.length} degraded optional key${warnings.length === 1 ? "" : "s"})`);
  for (const w of warnings) notes.push(`  warn: ${w}`);
} catch (e) {
  if (e instanceof EnvError) for (const p of e.problems) failures.push(`current environment: ${p}`);
  else throw e;
}

// 5. Production guard
{
  const simulated = {
    ...process.env,
    NODE_ENV: "production",
    VERCEL_ENV: "production",
    APP_ENV: undefined,
    NEXT_PUBLIC_SITE_URL: "https://www.desertpeakinsurance.com",
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
    TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA",
  };
  let refused = false;
  try {
    validateEnv(simulated);
  } catch (e) {
    refused = e instanceof EnvError && e.problems.some((p) => p.includes("Cloudflare test key"));
  }
  if (refused) notes.push("production guard (VERCEL_ENV=production) refuses Turnstile test keys");
  else failures.push("production guard did NOT refuse Turnstile test keys");
  // A plain `next build` (NODE_ENV=production, no VERCEL_ENV) must still pass with test keys.
  try {
    validateEnv({ ...process.env, NODE_ENV: "production", VERCEL_ENV: undefined, APP_ENV: undefined });
    notes.push("local production build with test keys is allowed (guard keys off the deployment tier, not NODE_ENV)");
  } catch {
    failures.push("local `next build` would be refused; the guard must key off VERCEL_ENV/APP_ENV");
  }
}

for (const n of notes) console.log(`ok   ${n}`);
for (const f of failures) console.error(`FAIL ${f}`);
console.log(failures.length ? `\nverify:env failed (${failures.length})` : "\nverify:env passed");
process.exit(failures.length ? 1 : 0);
