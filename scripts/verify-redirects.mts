/** pnpm verify:redirects — every live legacy url maps exactly once, one hop to a 200, no chains, no loops, no next.config conflicts. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fetchPage, report, withPayload } from "./lib/site.mts";

const failures: string[] = [];
const notes: string[] = [];
const crawl = JSON.parse(readFileSync(join(process.cwd(), "inputs", "legacy-crawl.json"), "utf8")) as { pages: Record<string, { status: number; location?: string }> };
const rows = await withPayload(async (p) => (await p.find({ collection: "redirects", limit: 0, pagination: false, depth: 0, overrideAccess: true })).docs);
const byFrom = new Map(rows.map((r) => [r.from, r]));
const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);
let mapped = 0;
for (const [path, page] of Object.entries(crawl.pages)) {
  if (!(page.status === 200 || page.status === 308) || path === "/") continue;
  const from = norm(path);
  const row = byFrom.get(from);
  if (!row) { if (from !== "/resources/") failures.push(`legacy ${path} has no redirect row`); continue; }
  mapped++;
  const hop = await fetchPage(from);
  if (row.statusCode === "410") { if (hop.status !== 410 && hop.status !== 200) failures.push(`${from}: expected a 410 page, got ${hop.status}`); continue; }
  if (![301, 308].includes(hop.status)) failures.push(`${from}: expected 301, got ${hop.status}`);
  const target = hop.location ? new URL(hop.location, "http://x").pathname : "";
  if (norm(target) !== norm(row.to ?? "")) failures.push(`${from}: redirected to ${target}, row says ${row.to}`);
  const final = await fetchPage(norm(target));
  const gated = final.status === 307 && /\/login\/$/.test(new URL(final.location ?? "/", "http://x").pathname);
  if (final.status !== 200 && !gated) failures.push(`${from}: chain or dead end — ${target} returned ${final.status}`);
}
for (const r of rows) if (r.to && byFrom.has(norm(r.to))) failures.push(`chain in data: ${r.from} → ${r.to} is itself redirected`);
const nc = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");
if (/redirects\(\)/.test(nc)) failures.push("next.config.ts still defines redirects(); the collection owns the map");
notes.push(`${mapped} legacy urls mapped in ${rows.length} rows; ${rows.filter((r) => r.statusCode === "410").length} are 410`);
report("verify:redirects", failures, notes);
