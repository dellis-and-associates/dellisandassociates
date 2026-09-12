/**
 * pnpm test:rls — the two-authorization-model boundary (DECISIONS.md, Phase 1).
 *
 *  1. Every table in `payload_cms` has RLS OFF (Payload is the only authority there).
 *  2. Every table in `public` has RLS ON (the Supabase client SDK reaches these).
 *  3. PostgREST does not expose `payload_cms` (PGRST106 on Accept-Profile).
 *  4. Payload's tables exist in `payload_cms`, and `public` holds none of them.
 */
import pg from "pg";
import { validateEnv, isLocalDatabase } from "../src/env.schema.ts";

const { env } = validateEnv(process.env);
const uri = env.PAYLOAD_DATABASE_URI_DIRECT ?? env.PAYLOAD_DATABASE_URI;
const client = new pg.Client({ connectionString: uri });
await client.connect();
const failures: string[] = [];
const ok: string[] = [];

const rows = async <T,>(sql: string, params: unknown[] = []) => (await client.query(sql, params)).rows as T[];
type Rel = { schema: string; table: string; rls: boolean };
const tables = await rows<Rel>(
  `select n.nspname as schema, c.relname as table, c.relrowsecurity as rls
     from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where c.relkind in ('r','p') and n.nspname in ('public','payload_cms') order by 1,2`,
);
const cms = tables.filter((t) => t.schema === "payload_cms");
const pub = tables.filter((t) => t.schema === "public");

if (cms.length === 0) failures.push("payload_cms has no tables; run pnpm migrate first");
else ok.push(`payload_cms holds ${cms.length} tables`);
const cmsOn = cms.filter((t) => t.rls);
if (cmsOn.length) failures.push(`RLS is ON in payload_cms (must be off): ${cmsOn.map((t) => t.table).join(", ")}`);
else if (cms.length) ok.push("RLS off on every payload_cms table");

const pubOff = pub.filter((t) => !t.rls);
if (pubOff.length) failures.push(`RLS is OFF in public (must be on): ${pubOff.map((t) => t.table).join(", ")}`);
else ok.push(`RLS on for every public table (${pub.length} table${pub.length === 1 ? "" : "s"})`);

const payloadInPublic = pub.filter((t) => /^payload_/.test(t.table) || t.table === "users" || t.table === "media");
if (payloadInPublic.length) failures.push(`Payload tables leaked into public: ${payloadInPublic.map((t) => t.table).join(", ")}`);

await client.end();

if (isLocalDatabase(uri)) {
  ok.push("PostgREST check skipped on the local Docker database");
} else {
  const res = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Accept-Profile": "payload_cms",
    },
  });
  const body = (await res.json().catch(() => ({}))) as { code?: string; hint?: string };
  if (res.status === 406 && body.code === "PGRST106") ok.push(`PostgREST does not expose payload_cms (${body.hint ?? "PGRST106"})`);
  else failures.push(`PostgREST responded ${res.status} ${JSON.stringify(body).slice(0, 200)} for payload_cms; it must be excluded from the exposed schemas`);
}

for (const o of ok) console.log(`ok   ${o}`);
for (const f of failures) console.error(`FAIL ${f}`);
console.log(failures.length ? `\ntest:rls failed (${failures.length})` : "\ntest:rls passed");
process.exit(failures.length ? 1 : 0);
