/**
 * pnpm verify:glossary — the glossary link graph. Every reviewed term must be
 * linked from at least one other reviewed term, reviewed article, or product;
 * no term relates to itself. Reports counts; fails on any orphan.
 */
import { validateEnv } from "../src/env.schema.ts";
validateEnv(process.env);
const { getPayload } = await import("payload");
const config = (await import("../src/payload.config.ts")).default;
const payload = await getPayload({ config });
const idOf = (v: unknown) => String(typeof v === "object" && v ? (v as { id: unknown }).id : v);

const terms = (await payload.find({ collection: "glossary-terms", limit: 0, depth: 0, overrideAccess: true })).docs;
const articles = (await payload.find({ collection: "articles", limit: 0, depth: 0, overrideAccess: true, where: { reviewStatus: { equals: "reviewed" } } })).docs;
const inbound = new Map<string, number>();
for (const t of terms) for (const r of t.relatedTerms ?? []) inbound.set(idOf(r), (inbound.get(idOf(r)) ?? 0) + (t.reviewStatus === "reviewed" ? 1 : 0));
for (const a of articles) for (const r of a.relatedTerms ?? []) inbound.set(idOf(r), (inbound.get(idOf(r)) ?? 0) + 1);
const reviewed = terms.filter((t) => t.reviewStatus === "reviewed");
const selfLinked = terms.filter((t) => (t.relatedTerms ?? []).some((r) => idOf(r) === String(t.id)));
const orphans = reviewed.filter((t) => !(inbound.get(String(t.id)) ?? 0));
console.log(`terms: ${terms.length} (reviewed ${reviewed.length}); reviewed articles: ${articles.length}`);
console.log(`orphans among reviewed terms: ${orphans.length}; self-links: ${selfLinked.length}`);
for (const t of orphans.slice(0, 20)) console.error(`  orphan: ${t.slug}`);
await payload.db.destroy?.();
const failed = orphans.length + selfLinked.length > 0;
console.log(failed ? "\nverify:glossary failed" : "\nverify:glossary passed");
process.exit(failed ? 1 : 0);
