/**
 * pnpm test:access — role × collection × operation matrix on a throwaway
 * Docker database. Loads .env.test, creates the test database if missing,
 * applies the committed migrations, then runs the DB-backed vitest suites.
 */
import { execSync } from "node:child_process";
import pg from "pg";
import { readEnvFile } from "./lib/env-file.mts";

const testEnv = readEnvFile(".env.test");
const env = { ...process.env, ...testEnv };
const uri = new URL(testEnv.PAYLOAD_DATABASE_URI_DIRECT);
const dbName = uri.pathname.slice(1);
const adminUri = new URL(uri.toString());
adminUri.pathname = "/postgres";

const admin = new pg.Client({ connectionString: adminUri.toString() });
try {
  await admin.connect();
} catch (e) {
  console.error(`FAIL cannot reach the Docker database at ${uri.host}. Run \`pnpm db:up\` first. (${(e as Error).message})`);
  process.exit(1);
}
const exists = await admin.query("select 1 from pg_database where datname = $1", [dbName]);
if (exists.rowCount === 0) await admin.query(`create database "${dbName}"`);
await admin.end();

const run = (cmd: string) => execSync(cmd, { stdio: "inherit", env });
run("pnpm -s migrate");
run(`pnpm -s vitest run --config vitest.db.config.mts ${process.argv.slice(2).join(" ")}`);
