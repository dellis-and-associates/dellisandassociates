/**
 * pnpm migrate:check — CI fails if the committed migrations do not fully
 * describe src/payload.config.ts. Runs `payload migrate:create --skip-empty`;
 * if Payload produces a new migration there is drift. The stray file is
 * removed so the check leaves the tree as it found it.
 */
import { execSync } from "node:child_process";
import { readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "src", "migrations");
const before = new Set(readdirSync(dir));
let output = "";
try {
  output = execSync("pnpm -s migrate:create migrate_check --skip-empty", {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PAYLOAD_MIGRATING: "true" },
  });
} catch (e) {
  const err = e as { stdout?: string; stderr?: string };
  console.error(err.stdout ?? "", err.stderr ?? "");
  console.error("\nmigrate:check failed: migrate:create errored");
  process.exit(1);
}
const created = readdirSync(dir).filter((f) => !before.has(f));
for (const f of created) rmSync(join(dir, f));
if (created.length) {
  console.error(output);
  console.error(`FAIL schema drift: Payload generated ${created.join(", ")}. Run pnpm migrate:create <name> and commit it.`);
  console.log("\nmigrate:check failed");
  process.exit(1);
}
console.log(`ok   ${[...before].filter((f) => f.endsWith(".ts") && f !== "index.ts").length} committed migration(s) fully describe the config`);
console.log("\nmigrate:check passed");
