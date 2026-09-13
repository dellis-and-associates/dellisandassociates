/** pnpm todo:report — every {{TODO:…}} token in the database, by collection and owner, for BUILD-REPORT.md. */
import { validateEnv } from "../src/env.schema.ts";
validateEnv(process.env);
const { getPayload } = await import("payload");
const config = (await import("../src/payload.config.ts")).default;
const payload = await getPayload({ config });
const TOKEN = /\{\{TODO:([^}]+)\}\}/g;
const found: { collection: string; slug: string; key: string }[] = [];
const walk = (v: unknown, collection: string, slug: string) => {
  if (typeof v === "string") for (const m of v.matchAll(TOKEN)) found.push({ collection, slug, key: m[1]! });
  else if (Array.isArray(v)) v.forEach((x) => walk(x, collection, slug));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => walk(x, collection, slug));
};
for (const c of ["products", "states", "cities", "pages", "articles", "glossary-terms", "forms", "referral-programs"] as const) {
  const docs = (await payload.find({ collection: c, limit: 0, pagination: false, depth: 0, overrideAccess: true })).docs as unknown as Record<string, unknown>[];
  for (const d of docs) walk(d, c, String(d.slug ?? d.path ?? d.name ?? d.id));
}
for (const g of ["site-settings", "compliance-settings"] as const) walk(await payload.findGlobal({ slug: g, depth: 0, overrideAccess: true }), g, g);
const OWNER: [RegExp, string][] = [[/^state\..*licenseNumber/, "client (licensing)"], [/^statute\./, "counsel / DOI verification"], [/^city\./, "office (local knowledge)"], [/^compliance\.medicare/, "client (plan-year TPMO text)"], [/^referrals\.terms/, "counsel"], [/^site\./, "client"]];
const by = new Map<string, number>();
for (const f of found) { const owner = OWNER.find(([re]) => re.test(f.key))?.[1] ?? "unassigned"; by.set(`${f.collection} · ${owner}`, (by.get(`${f.collection} · ${owner}`) ?? 0) + 1); }
console.log(`| Collection · owner | Open tokens |\n|---|---:|`);
for (const [k, n] of [...by].sort()) console.log(`| ${k} | ${n} |`);
console.log(`| **total** | **${found.length}** |`);
await payload.db.destroy?.();
process.exit(0);
