/**
 * pnpm review:stale [--months=12] — content whose review has aged out.
 * Lists every product, page, article and glossary term whose `reviewedAt` is
 * older than the window (or missing while the document is marked reviewed),
 * newest first, so the refresh cadence in SEO-PLAYBOOK.md has a number.
 * Read-only: it never writes to the database.
 */
import { pathToFileURL } from "node:url";
import { validateEnv } from "../src/env.schema.ts";

const COLLECTIONS = ["products", "pages", "articles", "glossary-terms"] as const;

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  validateEnv(process.env);
  const months = Number(process.argv.find((a) => a.startsWith("--months="))?.slice(9) ?? 12);
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  const { getPayload } = await import("payload");
  const config = (await import("../src/payload.config.ts")).default;
  const payload = await getPayload({ config });
  const rows: { collection: string; label: string; reviewedAt: string | null }[] = [];
  for (const collection of COLLECTIONS) {
    const docs = (await payload.find({ collection, limit: 0, pagination: false, depth: 0, overrideAccess: true, where: { reviewStatus: { equals: "reviewed" } } })).docs as unknown as Record<string, unknown>[];
    for (const d of docs) {
      const reviewedAt = typeof d.reviewedAt === "string" ? d.reviewedAt : null;
      if (!reviewedAt || new Date(reviewedAt) < cutoff) rows.push({ collection, label: String(d.title ?? d.term ?? d.name ?? d.path ?? d.slug ?? d.id), reviewedAt });
    }
  }
  rows.sort((a, b) => (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? ""));
  console.log(`review:stale — reviewed more than ${months} months ago (or with no review date): ${rows.length}`);
  if (rows.length) {
    console.log("| Collection | Document | Last reviewed |");
    console.log("|---|---|---|");
    for (const r of rows.slice(0, 100)) console.log(`| ${r.collection} | ${r.label} | ${r.reviewedAt ? r.reviewedAt.slice(0, 10) : "never stamped"} |`);
    if (rows.length > 100) console.log(`…and ${rows.length - 100} more`);
  }
  process.exit(0);
}
