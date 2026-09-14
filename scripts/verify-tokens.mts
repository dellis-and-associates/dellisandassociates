/**
 * pnpm verify:tokens — zero hardcoded design values. Scans app/, src/ and
 * packages/ for hex or functional colour literals, Tailwind arbitrary values,
 * raw px/rem in stylesheets, inline style pixel values and non-token colour
 * utilities. Every design value must come from desert-peak-brand/dist.
 * A documented exception carries `tokens-ok: <reason>` on the same or the
 * previous line; opt-outs are counted and printed.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { scanSource } from "./lib/token-rules.mts";

const root = process.cwd();
const SCAN = ["app", "src", "packages"];
const SKIP_DIRS = new Set(["node_modules", ".next", "migrations", "dist"]);
// src/lib/og.tsx draws the brand's own OG template (desert-peak-brand/scripts/build-web.ts) in 1200×630 image pixels: those
// lengths are the template's geometry, not CSS design values; its colours come from the typed token export.
const SKIP_FILES = new Set(["src/payload-types.ts", "app/(payload)/admin/importMap.js", "app/(frontend)/fonts.fallback.css", "src/lib/og.tsx"]);
function* walk(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(tsx?|mts|css|scss)$/.test(name)) yield p;
  }
}
let hits = 0, optOuts = 0, files = 0;
for (const d of SCAN) {
  let list: string[] = [];
  try { list = [...walk(join(root, d))]; } catch { continue; }
  for (const abs of list) {
    const rel = relative(root, abs);
    if (SKIP_FILES.has(rel)) continue;
    files++;
    const r = scanSource(rel, readFileSync(abs, "utf8"));
    optOuts += r.optOuts;
    for (const h of r.hits) { hits++; console.error(`FAIL ${rel}:${h.line}: ${h.snippet} — ${h.rule}`); }
  }
}
console.log(`scanned ${files} files; ${optOuts} documented opt-out(s)`);
console.log(hits ? `\nverify:tokens failed (${hits})` : "\nverify:tokens passed");
process.exit(hits ? 1 : 0);
