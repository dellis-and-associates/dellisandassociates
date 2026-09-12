/**
 * pnpm test:db — 50 concurrent queries through the transaction pooler.
 *
 * The failure mode this guards against is `prepared statement "…" already
 * exists` (or `does not exist`) under load on Supavisor transaction mode. It
 * only shows up with concurrency, so this runs 50 parameterized queries at
 * once on a pool wide enough to hold several pooler connections, then 50
 * concurrent Payload local-API reads on the real adapter (pool size 1, so
 * these also prove the single-client path queues cleanly).
 */
import pg from "pg";
import { validateEnv, isLocalDatabase } from "../src/env.schema.ts";

const { env } = validateEnv(process.env);
const uri = env.PAYLOAD_DATABASE_URI;
const port = new URL(uri).port;
if (!isLocalDatabase(uri) && port !== "6543") {
  console.error(`FAIL PAYLOAD_DATABASE_URI is on port ${port}; test:db must run through the transaction pooler (6543)`);
  process.exit(1);
}
console.log(`target: ${new URL(uri).hostname}:${port} (${isLocalDatabase(uri) ? "local docker" : "transaction pooler"})`);

const N = 50;
let failures = 0;

// 1. Raw driver, wide pool, parameterized queries (extended protocol, unnamed statements).
{
  const pool = new pg.Pool({ connectionString: uri, max: 10 });
  const t0 = performance.now();
  const results = await Promise.allSettled(
    Array.from({ length: N }, (_, i) =>
      pool.query("select $1::int as i, pg_backend_pid() as pid, (select count(*) from pg_tables where schemaname = $2)::int as tables", [i, "payload_cms"]),
    ),
  );
  const errs = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  const pids = new Set(results.filter((r) => r.status === "fulfilled").map((r) => (r as PromiseFulfilledResult<pg.QueryResult>).value.rows[0].pid));
  console.log(`raw pg: ${N - errs.length}/${N} ok in ${Math.round(performance.now() - t0)} ms across ${pids.size} backend pids`);
  for (const e of errs.slice(0, 3)) console.error("  ", (e.reason as Error).message);
  if (errs.length) failures++;
  await pool.end();
}

// 2. Payload local API on the real adapter config.
{
  const { getPayload } = await import("payload");
  const config = (await import("../src/payload.config.ts")).default;
  const payload = await getPayload({ config });
  const t0 = performance.now();
  const results = await Promise.allSettled(
    Array.from({ length: N }, (_, i) =>
      i % 2 === 0
        ? payload.find({ collection: "users", limit: 1, depth: 0 })
        : payload.count({ collection: "media" }),
    ),
  );
  const errs = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  console.log(`payload local API: ${N - errs.length}/${N} ok in ${Math.round(performance.now() - t0)} ms`);
  for (const e of errs.slice(0, 3)) console.error("  ", (e.reason as Error).message);
  if (errs.length) failures++;
  await payload.db.destroy?.();
}

console.log(failures ? "\ntest:db failed" : "\ntest:db passed");
process.exit(failures ? 1 : 0);
