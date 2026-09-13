/**
 * pnpm generate:content --collection=glossary-terms|articles --batch=12 [--dry-run] [--slug=x] [--force-slug=x] [--retry-failed]
 *
 * Resumable content generation for the article and glossary shells the seed
 * created (page-generation Phase 3). Selects up to `batch` documents whose
 * `generation.status` is `pending` and that have an authored draft under
 * scripts/lib/drafts/, validates each draft against the factual-restraint
 * rules, checks the batch for near-duplicates, resolves related slugs to ids,
 * and writes through the local API with no user. `reviewStatus` is never
 * touched: everything generated stays `draft` until a human reviews it.
 *
 * A `drafted` document is never redrafted unless `--force-slug` names it.
 * Failures set `generation.status = failed` with the error on the document;
 * `--retry-failed` puts them back in the selection. Safe to interrupt and
 * re-run: each document is written in one update, and the batch id is
 * recorded on every document it touched. Logs slugs and counts only.
 */
import { pathToFileURL } from "node:url";
import type { Payload } from "payload";
import { validateEnv } from "../src/env.schema.ts";
import { validateArticle, validateGlossary, type Violation } from "./lib/content-rules.mts";
import { SIMILARITY_THRESHOLD, similarityReport, type SimilarPair } from "./lib/similarity.mts";
import {
  articleText,
  articleToFields,
  articleToInput,
  glossaryText,
  glossaryToFields,
  glossaryToInput,
  hasDraft,
  loadArticleDraft,
  loadGlossaryDraft,
  type DraftCollection,
} from "./lib/drafts/index.mts";

export type GenerateOptions = {
  collection: DraftCollection;
  batch: number;
  dryRun: boolean;
  /** Only this slug (still must be pending, or failed with --retry-failed). */
  slug?: string;
  /** Redraft this slug whatever its generation status. The one way past `drafted`. */
  forceSlug?: string;
  retryFailed?: boolean;
  batchId?: string;
};
export type StatusCounts = { pending: number; drafted: number; failed: number; unauthored: number };
export type GenerateReport = {
  batchId: string;
  collection: DraftCollection;
  dryRun: boolean;
  selected: string[];
  drafted: string[];
  failed: { slug: string; error: string }[];
  /** Set when the batch was refused as a whole (near-duplicate pairs); nothing was written. */
  batchError?: string;
  similarPairs: SimilarPair[];
  counts: Record<DraftCollection, StatusCounts>;
};

type Row = { id: number; slug: string; generation?: { status?: string | null } | null };
type Json = Record<string, unknown>;
const COLLECTIONS: DraftCollection[] = ["glossary-terms", "articles"];

const rows = async (payload: Payload, collection: "glossary-terms" | "articles" | "products" | "states"): Promise<Row[]> =>
  (await payload.find({ collection, limit: 0, pagination: false, depth: 0, overrideAccess: true, select: { slug: true, generation: true } as never })).docs as unknown as Row[];

export async function statusCounts(payload: Payload): Promise<Record<DraftCollection, StatusCounts>> {
  const out = {} as Record<DraftCollection, StatusCounts>;
  for (const c of COLLECTIONS) {
    const all = await rows(payload, c);
    const s: StatusCounts = { pending: 0, drafted: 0, failed: 0, unauthored: 0 };
    for (const r of all) {
      const st = (r.generation?.status ?? "pending") as keyof StatusCounts;
      s[st] = (s[st] ?? 0) + 1;
      if (st === "pending" && !hasDraft(c, r.slug)) s.unauthored++;
    }
    out[c] = s;
  }
  return out;
}

/** Resolves slugs to ids for one relationship; unknown slugs are an error, never a guess. */
const resolver = (index: Map<string, number>, what: string) => (slugs: string[]): number[] =>
  slugs.map((s) => {
    const id = index.get(s);
    if (id === undefined) throw new Error(`unresolved ${what} slug "${s}"`);
    return id;
  });

const fail = (v: Violation[]) => new Error(v.map((x) => `[${x.rule}] ${x.message}`).join("\n"));

export async function runGeneration(payload: Payload, opts: GenerateOptions): Promise<GenerateReport> {
  const { collection } = opts;
  const batchId = opts.batchId ?? `${collection}-${new Date().toISOString().replace(/[:.]/g, "-")}`;
  const log = (m: string) => payload.logger.info(`[generate:content] ${m}`);
  const report: GenerateReport = { batchId, collection, dryRun: opts.dryRun, selected: [], drafted: [], failed: [], similarPairs: [], counts: {} as never };

  // ── Selection ───────────────────────────────────────────────────────────
  const all = await rows(payload, collection);
  const bySlug = new Map(all.map((r) => [r.slug, r]));
  let candidates: Row[];
  if (opts.forceSlug) {
    const r = bySlug.get(opts.forceSlug);
    if (!r) throw new Error(`${collection}: no document with slug "${opts.forceSlug}"`);
    candidates = [r];
  } else {
    const eligible = (r: Row) => {
      const st = r.generation?.status ?? "pending";
      return st === "pending" || (opts.retryFailed && st === "failed");
    };
    candidates = all
      .filter((r) => eligible(r) && (!opts.slug || r.slug === opts.slug) && hasDraft(collection, r.slug))
      .sort((a, b) => a.slug.localeCompare(b.slug))
      .slice(0, opts.batch);
    if (opts.slug && !candidates.length) {
      const r = bySlug.get(opts.slug);
      log(r ? `${opts.slug} is ${r.generation?.status ?? "pending"}${hasDraft(collection, opts.slug) ? "" : " and has no authored draft"}; nothing selected` : `no document with slug "${opts.slug}"`);
    }
  }
  report.selected = candidates.map((r) => r.slug);
  log(`${collection}: selected ${candidates.length} of ${all.length} (batch ${batchId}${opts.dryRun ? ", dry run" : ""})`);

  // ── Relationship indexes ────────────────────────────────────────────────
  const index = async (c: "glossary-terms" | "articles" | "products" | "states") => new Map((await rows(payload, c)).map((r) => [r.slug, r.id]));
  const terms = collection === "glossary-terms" ? new Map(all.map((r) => [r.slug, r.id])) : await index("glossary-terms");
  const products = await index("products");
  const articles = collection === "articles" ? new Map(all.map((r) => [r.slug, r.id])) : candidates.length ? await index("articles") : new Map<string, number>();
  const states = collection === "articles" && candidates.length ? await index("states") : new Map<string, number>();

  // ── Draft, validate, resolve (nothing written yet) ──────────────────────
  type Prepared = { row: Row; data: Json; text: string };
  const prepared: Prepared[] = [];
  const failures: { row: Row; error: string }[] = [];
  for (const row of candidates) {
    try {
      let data: Json;
      let text: string;
      if (collection === "glossary-terms") {
        const d = await loadGlossaryDraft(row.slug);
        const v = validateGlossary(glossaryToInput(row.slug, d));
        if (v.length) throw fail(v);
        data = { ...glossaryToFields(d), relatedTerms: resolver(terms, "glossary term")(d.relatedTerms), relatedProducts: resolver(products, "product")(d.relatedProducts) };
        text = glossaryText(d);
      } else {
        const d = await loadArticleDraft(row.slug);
        const v = validateArticle(articleToInput(row.slug, d));
        if (v.length) throw fail(v);
        data = {
          ...articleToFields(d),
          relatedProducts: resolver(products, "product")(d.relatedProducts),
          relatedArticles: resolver(articles, "article")(d.relatedArticles),
          relatedTerms: resolver(terms, "glossary term")(d.relatedTerms),
          ...(d.relatedStates ? { relatedStates: resolver(states, "state")(d.relatedStates) } : {}),
        };
        text = articleText(d);
      }
      prepared.push({ row, data, text });
    } catch (e) {
      failures.push({ row, error: (e as Error).message });
    }
  }

  // ── Uniqueness within the batch ─────────────────────────────────────────
  const sim = similarityReport(prepared.map((p) => ({ slug: p.row.slug, text: p.text })), SIMILARITY_THRESHOLD[collection]);
  report.similarPairs = sim.pairs;
  if (sim.failing.length) {
    report.batchError = `${sim.failing.length} pair(s) above Jaccard ${sim.threshold}: ${sim.failing.map((p) => `${p.a} ~ ${p.b} (${p.score.toFixed(2)})`).join("; ")}`;
    log(`batch refused, nothing written: ${report.batchError}`);
    report.failed = failures.map((f) => ({ slug: f.row.slug, error: f.error }));
    report.counts = await statusCounts(payload);
    return report;
  }

  // ── Write ───────────────────────────────────────────────────────────────
  const generatedAt = new Date().toISOString();
  for (const p of prepared) {
    if (opts.dryRun) {
      report.drafted.push(p.row.slug);
      continue;
    }
    try {
      await payload.update({
        collection,
        id: p.row.id,
        data: { ...p.data, generation: { status: "drafted", generatedAt, batch: batchId, error: null } } as never,
        overrideAccess: true,
        depth: 0,
      });
      report.drafted.push(p.row.slug);
      log(`drafted ${p.row.slug}`);
    } catch (e) {
      failures.push({ row: p.row, error: (e as Error).message });
    }
  }
  for (const f of failures) {
    report.failed.push({ slug: f.row.slug, error: f.error });
    log(`failed ${f.row.slug}: ${f.error.split("\n")[0]}`);
    if (opts.dryRun) continue;
    try {
      await payload.update({ collection, id: f.row.id, data: { generation: { status: "failed", generatedAt, batch: batchId, error: f.error.slice(0, 4000) } } as never, overrideAccess: true, depth: 0 });
    } catch (e) {
      log(`could not record failure on ${f.row.slug}: ${(e as Error).message}`);
    }
  }
  report.counts = await statusCounts(payload);
  return report;
}

export function formatReport(r: GenerateReport): string {
  const lines = [
    `generate:content ${r.collection} batch ${r.batchId} ${r.dryRun ? "(dry run — nothing written)" : "(applied)"}`,
    `selected ${r.selected.length}, drafted ${r.drafted.length}, failed ${r.failed.length}${r.batchError ? ", batch refused" : ""}`,
  ];
  if (r.batchError) lines.push(`batch error: ${r.batchError}`);
  for (const f of r.failed) lines.push(`  failed ${f.slug}:`, ...f.error.split("\n").map((l) => `    ${l}`));
  if (r.similarPairs.length) {
    lines.push("most similar pairs (5-word shingle Jaccard):");
    for (const p of r.similarPairs) lines.push(`  ${p.score.toFixed(3)}  ${p.a} ~ ${p.b}`);
  }
  lines.push("| Collection | pending | drafted | failed | pending without a draft |", "|---|---:|---:|---:|---:|");
  for (const [c, s] of Object.entries(r.counts)) lines.push(`| ${c} | ${s.pending} | ${s.drafted} | ${s.failed} | ${s.unauthored} |`);
  return lines.join("\n");
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const { env } = validateEnv(process.env);
  const args = process.argv.slice(2);
  const arg = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
  const collection = arg("collection");
  if (collection !== "glossary-terms" && collection !== "articles") {
    console.error("usage: pnpm generate:content --collection=glossary-terms|articles --batch=12 [--dry-run] [--slug=x] [--force-slug=x] [--retry-failed]");
    process.exit(2);
  }
  const batch = Number(arg("batch") ?? 12);
  if (!Number.isInteger(batch) || batch < 1) {
    console.error("--batch must be a positive integer");
    process.exit(2);
  }
  const { getPayload } = await import("payload");
  const config = (await import("../src/payload.config.ts")).default;
  const payload = await getPayload({ config });
  console.log(`target: ${new URL(env.PAYLOAD_DATABASE_URI_DIRECT ?? env.PAYLOAD_DATABASE_URI).host}`);
  const report = await runGeneration(payload, { collection, batch, dryRun: args.includes("--dry-run"), slug: arg("slug"), forceSlug: arg("force-slug"), retryFailed: args.includes("--retry-failed") });
  console.log(formatReport(report));
  await payload.db.destroy?.();
  process.exit(report.batchError || report.failed.length ? 1 : 0);
}
