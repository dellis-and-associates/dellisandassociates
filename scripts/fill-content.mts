/**
 * pnpm fill:content --collection=products|pages|cities [--dry-run] [--slug=x]
 *
 * Writes authored drafts (scripts/lib/drafts/{products,pages,cities}) into the
 * documents the seed created. Non-destructive: a field is written only when
 * the document's current value is empty or a {{TODO}} token, so an editor's
 * changes in the admin are never overwritten. Every draft is validated
 * against the factual-restraint rules first; a draft with a violation is
 * skipped and reported. reviewStatus is never touched: everything stays
 * `draft` until a licensed person reviews it. Logs slugs and counts only.
 */
import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { Payload } from "payload";
import { LOCAL_HAZARDS } from "../src/collections/Cities.ts";
import { hasTodo } from "../src/fields/index.ts";
import { richTextToPlain } from "../src/lib/text.ts";
import { validateEnv } from "../src/env.schema.ts";
import { validateCity, validatePage, validateProduct, type Violation } from "./lib/content-rules.mts";
import { cityProse, cityToFields, loadCityDraft, loadPageDraft, loadProductDraft, pageFileSlug, pageProse, pageToFields, productProse, productToFields, type FillCollection } from "./lib/drafts/index.mts";

type Json = Record<string, unknown>;
const isEmpty = (v: unknown): boolean => {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return v.trim() === "" || hasTodo(v);
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "object") { const t = richTextToPlain(v); if ("root" in (v as Json)) return t.trim() === "" || hasTodo(t); return Object.values(v as Json).every(isEmpty); }
  return false;
};
/** Keeps only the draft fields whose current value is empty; nested groups are merged key by key. */
const patchFor = (current: Json, draft: Json): Json => {
  const out: Json = {};
  for (const [k, v] of Object.entries(draft)) {
    const cur = current[k];
    if (v && typeof v === "object" && !Array.isArray(v) && !("root" in (v as Json)) && cur && typeof cur === "object" && !Array.isArray(cur)) {
      const nested = patchFor(cur as Json, v as Json);
      if (Object.keys(nested).length) out[k] = { ...(cur as Json), ...nested };
    } else if (isEmpty(cur)) out[k] = v;
  }
  return out;
};
const fail = (v: Violation[]) => v.map((x) => `[${x.rule}] ${x.message}`).join("; ");

export async function fillContent(payload: Payload, opts: { collection: FillCollection; dryRun: boolean; slug?: string }) {
  const dir = fileURLToPath(new URL(`./lib/drafts/${opts.collection}/`, import.meta.url));
  const slugs = readdirSync(dir).filter((f) => f.endsWith(".ts")).map((f) => f.slice(0, -3)).filter((s) => !opts.slug || s === opts.slug).sort();
  const log = (m: string) => payload.logger.info(`[fill:content] ${m}`);
  const counts = { filled: 0, unchanged: 0, missing: 0, invalid: 0, fields: 0 };
  const docs = (await payload.find({ collection: opts.collection, limit: 0, pagination: false, depth: 0, overrideAccess: true })).docs as unknown as (Json & { id: number; slug?: string; path?: string })[];
  const byKey = new Map(docs.map((d) => [opts.collection === "pages" ? pageFileSlug(d.path as string) : (d.slug as string), d]));
  for (const slug of slugs) {
    const doc = byKey.get(slug);
    if (!doc) { counts.missing++; log(`${slug}: no ${opts.collection} document; skipped`); continue; }
    let fields: Json;
    try {
      if (opts.collection === "products") {
        const d = await loadProductDraft(slug);
        const v = validateProduct(slug, { summary: d.summary, introCount: d.intro.length, blocks: d.coverageBlocks.length, covered: d.covered.length, notCovered: d.notCovered.length, discounts: d.discounts ? d.discounts.length : null, faqs: d.faqs.length, relatedProducts: d.relatedProducts }, productProse(d));
        if (v.length) throw new Error(fail(v));
        const ids = d.relatedProducts.map((s) => { const r = byKey.get(s); if (!r) throw new Error(`unresolved product slug "${s}"`); return r.id; });
        fields = { ...productToFields(d), relatedProducts: ids };
      } else if (opts.collection === "pages") {
        const d = await loadPageDraft(slug);
        const v = validatePage(slug, { lede: d.lede, blocks: d.blocks.length }, pageProse(d));
        if (v.length) throw new Error(fail(v));
        fields = pageToFields(d);
        // A seeded placeholder title (the path's last segment in Title Case) counts as empty so the draft's title lands.
        if (fields.title && typeof doc.title === "string" && !doc.lede) fields = { ...fields };
      } else {
        const d = await loadCityDraft(slug);
        const v = validateCity(slug, { localHazards: d.localHazards, neighborhoods: d.neighborhoods }, cityProse(d), LOCAL_HAZARDS);
        if (v.length) throw new Error(fail(v));
        fields = cityToFields(d);
      }
    } catch (e) { counts.invalid++; log(`${slug}: invalid, skipped: ${(e as Error).message.split("\n")[0].slice(0, 300)}`); continue; }
    // The SEO fields have hard maximums (title 60, description 155); trim at a word boundary rather than fail the document.
    if (fields.seo && typeof fields.seo === "object") {
      const seo = fields.seo as { title?: string; description?: string };
      const trim = (t: string | undefined, n: number) => (t && t.length > n ? `${t.slice(0, n - 1).replace(/\s+\S*$/, "")}…` : t);
      fields.seo = { ...seo, ...(seo.title ? { title: trim(seo.title, 60) } : {}), ...(seo.description ? { description: trim(seo.description, 155) } : {}) };
    }
    const patch = patchFor(doc, fields);
    // Page titles: the seed wrote a placeholder from the path; a drafted title replaces it when the page has no lede yet (i.e. never edited).
    if (opts.collection === "pages" && fields.title && isEmpty(doc.lede) && !patch.title) patch.title = fields.title;
    if (!Object.keys(patch).length) { counts.unchanged++; continue; }
    counts.filled++; counts.fields += Object.keys(patch).length;
    if (opts.dryRun) { log(`${slug}: would fill ${Object.keys(patch).join(", ")}`); continue; }
    try {
      await payload.update({ collection: opts.collection, id: doc.id, data: patch as never, overrideAccess: true, depth: 0 });
      log(`${slug}: filled ${Object.keys(patch).join(", ")}`);
    } catch (e) {
      counts.filled--; counts.invalid++;
      log(`${slug}: write refused: ${(e as Error).message.split("\n")[0].slice(0, 300)}`);
    }
  }
  return counts;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  validateEnv(process.env);
  const args = process.argv.slice(2);
  const arg = (n: string) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
  const collection = arg("collection");
  if (collection !== "products" && collection !== "pages" && collection !== "cities") { console.error("usage: pnpm fill:content --collection=products|pages|cities [--dry-run] [--slug=x]"); process.exit(2); }
  const { getPayload } = await import("payload");
  const config = (await import("../src/payload.config.ts")).default;
  const payload = await getPayload({ config });
  const counts = await fillContent(payload, { collection, dryRun: args.includes("--dry-run"), slug: arg("slug") });
  console.log(`fill:content ${collection}${args.includes("--dry-run") ? " (dry run)" : ""}: ${counts.filled} document(s) filled (${counts.fields} fields), ${counts.unchanged} unchanged, ${counts.invalid} invalid, ${counts.missing} without a document`);
  process.exit(counts.invalid ? 1 : 0);
}
