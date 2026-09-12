/**
 * pnpm verify:data — the sitemap package is a test fixture, the XML data files
 * are the source. Checks slugs and structure, applies the six Phase 0.A
 * corrections plus RECONCILIATION.md decision B, and prints the route plan
 * with the numbers the build is held to.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "desert-peak-insurance-sitemap");
const read = (f: string) => readFileSync(join(dir, f), "utf8");
const failures: string[] = [];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type Product = { slug: string; tier: 1 | 2; category: string; name: string; parent?: string; subpage3: string };
const products: Product[] = [...read("data-products.xml").matchAll(/<product\s+([^>]*)>([^<]*)<\/product>/g)].map((m) => {
  const attrs = Object.fromEntries([...m[1].matchAll(/(\w+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
  return { slug: attrs.slug, tier: Number(attrs.tier) as 1 | 2, category: attrs.category, name: m[2], parent: attrs.parent, subpage3: attrs.subpage3 ?? "discounts-faq" };
});
type State = { slug: string; abbr: string; name: string; cities: { slug: string; name: string }[] };
const states: State[] = [...read("data-locations.xml").matchAll(/<state\s+([^>]*)>([\s\S]*?)<\/state>/g)].map((m) => {
  const attrs = Object.fromEntries([...m[1].matchAll(/(\w+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
  const cities = [...m[2].matchAll(/<city\s+slug="([^"]*)">([^<]*)<\/city>/g)].map((c) => ({ slug: c[1], name: c[2] }));
  return { slug: attrs.slug, abbr: attrs.abbr, name: attrs.name, cities };
});
const fixtureUrls = [...read("full-sitemap.xml").matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

// --- structure ---
const dupe = <T,>(xs: T[]) => xs.filter((x, i) => xs.indexOf(x) !== i);
const pSlugs = products.map((p) => p.slug);
if (dupe(pSlugs).length) failures.push(`duplicate product slugs: ${dupe(pSlugs).join(", ")}`);
for (const p of products) {
  if (!SLUG.test(p.slug)) failures.push(`product slug not normalized: ${p.slug}`);
  if (![1, 2].includes(p.tier)) failures.push(`product ${p.slug} has tier ${p.tier}`);
  if (!["Personal", "Commercial"].includes(p.category)) failures.push(`product ${p.slug} has category ${p.category}`);
  if (p.parent && !pSlugs.includes(p.parent)) failures.push(`product ${p.slug} parent ${p.parent} does not exist`);
  if (/(\b[a-z-]+)-\1$/.test(p.slug)) failures.push(`doubled slug (Phase 0.A correction 1 not applied at seed): ${p.slug}`);
}
const cSlugs = states.flatMap((s) => s.cities.map((c) => `${s.slug}/${c.slug}`));
if (dupe(cSlugs).length) failures.push(`duplicate city slugs: ${dupe(cSlugs).join(", ")}`);
for (const s of states) {
  if (!SLUG.test(s.slug)) failures.push(`state slug not normalized: ${s.slug}`);
  for (const c of s.cities) if (!SLUG.test(c.slug)) failures.push(`city slug not normalized: ${c.slug}`);
}
for (const u of fixtureUrls) if (!/^\/(?:[a-z0-9-]+\/)*$/.test(u) && u !== "/") failures.push(`fixture URL not normalized: ${u}`);

// --- route plan ---
const tier1 = products.filter((p) => p.tier === 1);
const tier2 = products.filter((p) => p.tier === 2);
const cities = states.reduce((n, s) => n + s.cities.length, 0);
const fixture = {
  total: fixtureUrls.length,
  agents: fixtureUrls.filter((u) => /^\/agents\/[^/]+\/$/.test(u)).length,
  carriers: fixtureUrls.filter((u) => /^\/carriers\/[^/]+\/$/.test(u)).length,
  doubledBop: fixtureUrls.filter((u) => u.includes("/business-owners-policy-business-owners-policy/")).length,
  tier1StateHubs: fixtureUrls.filter((u) => tier1.some((p) => states.some((s) => u === `/insurance/${p.slug}/${s.slug}/`))).length,
};
const groups: [string, number, string][] = [
  ["Core pages", 20, "hand-built"],
  ["Legal & policy", 9, "hand-built"],
  [`Product hub + coverage + third subpage (${products.length} products × 3)`, products.length * 3, `${products.length} Product docs`],
  [`State hubs`, states.length, `${states.length} State docs`],
  [`Tier-1 product × state hubs (${tier1.length} × ${states.length})`, tier1.length * states.length, "composed"],
  [`Tier-1 product × city (${tier1.length} × ${cities})`, tier1.length * cities, "composed; LocationOverrides sparse"],
  [`Tier-2 product × state (${tier2.length} × ${states.length})`, tier2.length * states.length, "composed"],
  ["Resource articles", 186, "186 Article docs"],
  ["Glossary terms", 221, "221 GlossaryTerm docs"],
  ["Agent profiles (hub is a core page)", 30, "BLOCKED: real roster"],
  ["Carrier profiles (hub is a core page)", 15, "BLOCKED: appointments"],
];
const total = groups.reduce((n, g) => n + g[1], 0);
const blocked = 30 + 15;
const buildable = total - blocked;

// Cross-check against the fixture: fixture − placeholders + Tier-1 state hubs + reconciliation products.
const added = products.length - 29;
const expectedTotal = fixture.total + tier1.length * states.length - fixture.tier1StateHubs + added * 7;
if (fixture.total !== 1028) failures.push(`fixture has ${fixture.total} URLs, expected 1028`);
if (fixture.agents !== 30 || fixture.carriers !== 15) failures.push(`fixture placeholders: ${fixture.agents} agents, ${fixture.carriers} carriers (expected 30/15)`);
if (fixture.doubledBop !== 41) failures.push(`fixture doubled-BOP URLs: ${fixture.doubledBop} (expected 41)`);
if (total !== expectedTotal) failures.push(`route plan ${total} ≠ fixture-derived ${expectedTotal}`);
// Reconciliation decision B
const reconciled = ["medicare", "health-insurance", "annuities", "dental-and-vision-insurance", "term-life-insurance", "whole-life-insurance", "indexed-universal-life-insurance"];
for (const r of reconciled) if (!pSlugs.includes(r)) failures.push(`RECONCILIATION.md product missing: ${r}`);
for (const p of products.filter((p) => ["medicare", "annuities"].includes(p.slug))) if (p.subpage3 !== "plans-enrollment-faq") failures.push(`${p.slug} must use the plans-enrollment-faq subpage`);

console.log(`products: ${products.length} (tier 1: ${tier1.length}, tier 2: ${tier2.length}; ${products.filter((p) => p.parent).length} with a parent)`);
console.log(`states: ${states.length}; cities: ${cities}; fixture URLs: ${fixture.total}\n`);
console.log("| Route group | Routes | Source |\n|---|---:|---|");
for (const [g, n, s] of groups) console.log(`| ${g} | ${n} | ${s} |`);
console.log(`| **Total** | **${total}** | |\n| Buildable now | ${buildable} | |\n| Blocked on client data | ${blocked} | |`);
const extra = JSON.parse(readFileSync(join(process.cwd(), "src", "seed-data", "extra-routes.json"), "utf8")) as { path: string; kind: string }[];
const utility = extra.filter((r) => r.kind === "utility").length;
const partner = extra.filter((r) => r.kind.startsWith("partner")).length;
console.log(`\nOutside the plan — utility routes: ${utility} (noindex, not in sitemap); partner routes: ${partner} (1 public recruiting page, 1 gated portal entry)`);
if (extra.some((r) => !/^\/(?:[a-z0-9-]+\/)+$/.test(r.path))) failures.push("extra-routes.json has a non-normalized path");
for (const f of failures) console.error(`\nFAIL ${f}`);
console.log(failures.length ? `\nverify:data failed (${failures.length})` : "\nverify:data passed");
process.exit(failures.length ? 1 : 0);
