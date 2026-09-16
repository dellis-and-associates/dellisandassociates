/**
 * pnpm rum:report [--days=28] [--device=mobile|desktop] — Core Web Vitals from
 * the site's own beacons (RumSamples, posted to /api/rum), as p75 per path and
 * metric, which is what Search Console's field data reports. Lab numbers come
 * from `pnpm lhci`; this is the field number the playbook reviews.
 * Read-only: it never writes to the database.
 */
import { pathToFileURL } from "node:url";
import { validateEnv } from "../src/env.schema.ts";

/** The targets from the interface standard: LCP ≤ 1.8 s, INP ≤ 100 ms, CLS ≤ 0.05, TTFB ≤ 800 ms. */
const TARGET: Record<string, number> = { LCP: 1800, INP: 100, CLS: 0.05, TTFB: 800 };
const fmt = (metric: string, v: number) => (metric === "CLS" ? v.toFixed(3) : `${Math.round(v)} ${metric === "TTFB" || metric === "INP" ? "ms" : "ms"}`);
const p75 = (values: number[]) => values.sort((a, b) => a - b)[Math.min(values.length - 1, Math.floor(values.length * 0.75))] ?? 0;

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  validateEnv(process.env);
  const arg = (n: string) => process.argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
  const days = Number(arg("days") ?? 28);
  const device = arg("device");
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const { getPayload } = await import("payload");
  const config = (await import("../src/payload.config.ts")).default;
  const payload = await getPayload({ config });
  const where = { createdAt: { greater_than: since }, ...(device ? { device: { equals: device } } : {}) };
  const docs = (await payload.find({ collection: "rum-samples", limit: 0, pagination: false, depth: 0, overrideAccess: true, where: where as never })).docs as unknown as { metric: string; value: number; path: string }[];
  if (!docs.length) {
    console.log(`rum:report — no samples in the last ${days} days${device ? ` on ${device}` : ""}. Either RUM_ENDPOINT is unset or the site has no traffic yet.`);
    process.exit(0);
  }
  const byMetric = new Map<string, number[]>();
  const byPath = new Map<string, Map<string, number[]>>();
  for (const d of docs) {
    if (!byMetric.has(d.metric)) byMetric.set(d.metric, []);
    byMetric.get(d.metric)!.push(d.value);
    if (!byPath.has(d.path)) byPath.set(d.path, new Map());
    const m = byPath.get(d.path)!;
    if (!m.has(d.metric)) m.set(d.metric, []);
    m.get(d.metric)!.push(d.value);
  }
  console.log(`rum:report — ${docs.length} samples, last ${days} days${device ? `, ${device}` : ""}\n`);
  console.log("| Metric | p75 | Target | Meets target |");
  console.log("|---|---:|---:|---|");
  for (const [metric, values] of [...byMetric].sort()) {
    const v = p75(values);
    const target = TARGET[metric];
    console.log(`| ${metric} | ${fmt(metric, v)} | ${target !== undefined ? fmt(metric, target) : "—"} | ${target === undefined ? "—" : v <= target ? "yes" : "no"} |`);
  }
  const worst = [...byPath.entries()]
    .map(([path, metrics]) => ({ path, lcp: metrics.get("LCP")?.length ? p75(metrics.get("LCP")!) : null, samples: [...metrics.values()].reduce((n, a) => n + a.length, 0) }))
    .filter((r) => r.lcp !== null && r.samples >= 5)
    .sort((a, b) => (b.lcp ?? 0) - (a.lcp ?? 0))
    .slice(0, 15);
  if (worst.length) {
    console.log(`\nSlowest paths by LCP p75 (at least 5 samples):\n`);
    console.log("| Path | LCP p75 | Samples |");
    console.log("|---|---:|---:|");
    for (const r of worst) console.log(`| ${r.path} | ${fmt("LCP", r.lcp!)} | ${r.samples} |`);
  }
  process.exit(0);
}
