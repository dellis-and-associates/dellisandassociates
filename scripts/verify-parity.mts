/** pnpm verify:parity — LEGACY-FEATURE-PARITY.md has zero `missing` rows. */
import { readFileSync } from "node:fs";
const rows = readFileSync("LEGACY-FEATURE-PARITY.md", "utf8").split("\n").filter((l) => /^\| \d+ \|/.test(l));
const counts = new Map<string, number>();
const missing: string[] = [];
for (const r of rows) {
  const cells = r.split("|").map((c) => c.trim());
  const status = (cells[4] ?? "").replace(/\*/g, "");
  counts.set(status, (counts.get(status) ?? 0) + 1);
  if (/missing/.test(status)) missing.push(`row ${cells[1]}: ${cells[2]}`);
}
for (const [s, n] of counts) console.log(`ok   ${n} × ${s}`);
for (const m of missing) console.error(`FAIL ${m}`);
console.log(missing.length ? `\nverify:parity failed (${missing.length})` : `\nverify:parity passed (${rows.length} rows)`);
process.exit(missing.length ? 1 : 0);
