/**
 * pnpm mark:reviewed [--collection=products|pages|articles|glossary-terms] [--dry-run]
 *
 * Marks every content document reviewed after the client's confirmation of
 * the content (2026-09-15). Uses the logged `allowReviewed` context flag —
 * the one server path the reviewed guard accepts — so each update is written
 * to the Payload log. indexWave is not touched: promotion stays a separate,
 * deliberate admin act. Logs counts only.
 */
import { pathToFileURL } from "node:url";
import { validateEnv } from "../src/env.schema.ts";
import { ALLOW_REVIEWED_CONTEXT } from "../src/fields/index.ts";

const ALL = ["products", "pages", "articles", "glossary-terms"] as const;
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  validateEnv(process.env);
  const args = process.argv.slice(2);
  const only = args.find((a) => a.startsWith("--collection="))?.slice(13);
  const dryRun = args.includes("--dry-run");
  const { getPayload } = await import("payload");
  const config = (await import("../src/payload.config.ts")).default;
  const payload = await getPayload({ config });
  for (const collection of ALL.filter((c) => !only || c === only)) {
    const docs = (await payload.find({ collection, limit: 0, pagination: false, depth: 0, overrideAccess: true, where: { reviewStatus: { not_equals: "reviewed" } }, select: { reviewStatus: true } as never })).docs as { id: number }[];
    let done = 0;
    if (!dryRun) {
      // One at a time: documents that relate to each other (related products, related terms) rewrite each other's
      // relationship rows, and parallel updates deadlock in Postgres.
      for (const d of docs) {
        await payload.update({ collection, id: d.id, data: { reviewStatus: "reviewed" } as never, overrideAccess: true, depth: 0, context: { [ALLOW_REVIEWED_CONTEXT]: true } });
        done++;
      }
    }
    console.log(`mark:reviewed ${collection}: ${dryRun ? `${docs.length} would be marked` : `${done} marked`} reviewed`);
  }
  process.exit(0);
}
