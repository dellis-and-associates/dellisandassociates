/**
 * Regenerates every Stage 5 asset from brand/design-tokens.json, brand/logos, people.json,
 * collateral.config.json and content/*.json. Order matters: web/logos PNGs feed the decks and
 * the showcase; the inventory is composed last. Usage: node scripts/build-collateral.ts [--skip web,social,...]
 */
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { ROOT } from "./collateral/lib.ts";

const skip = new Set((process.argv.find((a) => a.startsWith("--skip="))?.slice(7) ?? "").split(",").filter(Boolean));
const steps: [string, string][] = [
  ["glossary", "import-glossary.ts"],
  ["web", "build-web.ts"],
  ["social", "build-social.ts"],
  ["signatures", "build-signatures.ts"],
  ["decks", "build-decks.ts"],
  ["print", "build-print.ts"],
  ["inventory", "build-inventory.ts"],
];
const t0 = Date.now();
for (const [name, script] of steps) {
  if (skip.has(name)) { console.log(`build-collateral: skip ${name}`); continue; }
  const t = Date.now();
  console.log(`\n== ${name}: node scripts/${script}`);
  execFileSync(process.execPath, [join(ROOT, "scripts", script)], { stdio: "inherit", cwd: ROOT });
  console.log(`== ${name} done in ${((Date.now() - t) / 1000).toFixed(1)}s`);
}
console.log(`\nbuild-collateral: all surfaces regenerated in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
