/**
 * pnpm leads:purge [--dry-run] — deletes leads whose retention period has
 * elapsed (Leads.retainUntil < now). Run daily in CI/cron. Prints counts only;
 * never prints a lead's contents.
 */
import { validateEnv } from "../src/env.schema.ts";
validateEnv(process.env);
const dryRun = process.argv.includes("--dry-run");
const { getPayload } = await import("payload");
const config = (await import("../src/payload.config.ts")).default;
const payload = await getPayload({ config });
const now = new Date().toISOString();
const expired = await payload.find({ collection: "leads", where: { retainUntil: { less_than: now } }, limit: 0, depth: 0, overrideAccess: true });
console.log(`${expired.totalDocs} lead(s) past retention`);
if (!dryRun && expired.totalDocs > 0) {
  const r = await payload.delete({ collection: "leads", where: { retainUntil: { less_than: now } }, overrideAccess: true });
  console.log(`deleted ${r.docs.length}, errors ${r.errors.length}`);
}
await payload.db.destroy?.();
