/**
 * Hard rule 6: seeding is idempotent and non-destructive. Runs via pnpm test:access.
 */
import type { Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { runSeed } from "../../scripts/seed.ts";

let payload: Payload;
const wipe = async () => {
  // ComplianceSettings.rewardRules holds foreign keys to states; clear it before the states go.
  await payload.updateGlobal({ slug: "compliance-settings", data: { rewardRules: [] }, overrideAccess: true });
  for (const c of ["leads", "location-overrides", "articles", "glossary-terms", "pages", "agents", "carriers", "cities", "redirects", "forms", "products", "states"] as const) {
    await payload.delete({ collection: c, where: { id: { exists: true } }, overrideAccess: true });
  }
};

beforeAll(async () => {
  const { getPayload } = await import("payload");
  const config = (await import("../../src/payload.config.ts")).default;
  payload = await getPayload({ config });
  await wipe();
});
afterAll(async () => {
  await payload?.db?.destroy?.();
});

describe("seed", () => {
  it("dry run writes nothing and reports what it would create", async () => {
    const r = await runSeed(payload, { dryRun: true });
    expect(r.products.created).toBe(36);
    expect(r.states.created).toBe(4);
    expect(r.cities.created).toBe(38);
    expect(r.pages.created).toBe(29);
    expect(r.articles.created).toBe(186);
    expect(r["glossary-terms"].created).toBe(221);
    expect(r.forms.created).toBe(3);
    expect((await payload.count({ collection: "products", overrideAccess: true })).totalDocs).toBe(0);
  });
  it("real run creates everything as draft; second run creates nothing and reports no conflicts", async () => {
    const r1 = await runSeed(payload, { dryRun: false });
    expect(r1.products.created).toBe(36);
    expect(r1.articles.created).toBe(186);
    const drafts = await payload.count({ collection: "articles", where: { reviewStatus: { equals: "draft" } }, overrideAccess: true });
    expect(drafts.totalDocs).toBe(186);
    const reviewed = await payload.count({ collection: "glossary-terms", where: { reviewStatus: { not_equals: "draft" } }, overrideAccess: true });
    expect(reviewed.totalDocs).toBe(0);
    const r2 = await runSeed(payload, { dryRun: false });
    const totals = Object.entries(r2).filter(([k]) => k !== "redirects:unresolved").map(([, c]) => c);
    expect(totals.reduce((n, c) => n + c.created, 0)).toBe(0);
    expect(totals.reduce((n, c) => n + c.updated, 0)).toBe(0);
    expect(totals.reduce((n, c) => n + c.conflicts, 0)).toBe(0);
  });
  it("never overwrites editor work: a changed county is reported as a conflict and kept; a filled empty field is not touched", async () => {
    const phoenix = (await payload.find({ collection: "cities", where: { slug: { equals: "phoenix" } }, overrideAccess: true, depth: 0 })).docs[0]!;
    await payload.update({ collection: "cities", id: phoenix.id, data: { cityFacts: { ...phoenix.cityFacts, county: "Editor County", housingStock: "Stucco tract homes" }, intro: undefined }, overrideAccess: true });
    const r = await runSeed(payload, { dryRun: false, only: new Set(["cities"]) });
    expect(r.cities.conflicts).toBe(1);
    expect(r.cities.conflictList).toEqual(["phoenix: cityFacts.county"]);
    const after = (await payload.findByID({ collection: "cities", id: phoenix.id, overrideAccess: true, depth: 0 }));
    expect(after.cityFacts?.county).toBe("Editor County");
    expect(after.cityFacts?.housingStock).toBe("Stucco tract homes");
  });
  it("fills a TODO token when the seed knows the value, and keeps a real value over a TODO", async () => {
    const nv = (await payload.find({ collection: "states", where: { slug: { equals: "nevada" } }, overrideAccess: true, depth: 0 })).docs[0]!;
    await payload.update({ collection: "states", id: nv.id, data: { doi: { name: "{{TODO:x}}", url: "{{TODO:x}}" }, licenseNumber: "NV-123" }, overrideAccess: true });
    const r = await runSeed(payload, { dryRun: false, only: new Set(["states"]) });
    expect(r.states.updated).toBe(1);
    expect(r.states.conflicts).toBe(0);
    const after = await payload.findByID({ collection: "states", id: nv.id, overrideAccess: true, depth: 0 });
    expect(after.doi?.url).toBe("https://doi.nv.gov/");
    expect(after.licenseNumber).toBe("NV-123");
  });
  it("legacy redirects: every mapped legacy URL once, dead WordPress paths 410, no chains", async () => {
    const all = (await payload.find({ collection: "redirects", limit: 0, overrideAccess: true, depth: 0 })).docs;
    const froms = all.map((r) => r.from);
    expect(new Set(froms).size).toBe(froms.length);
    expect(all.filter((r) => r.statusCode === "410").map((r) => r.from).sort()).toEqual(["/feed/", "/wp-admin/", "/wp-login.php/"]);
    for (const r of all) if (r.to) expect(froms).not.toContain(r.to);
    expect(all.find((r) => r.from === "/iul/")?.to).toBe("/insurance/indexed-universal-life-insurance/");
    expect(all.find((r) => r.from === "/dental-and-vision-insurance-2/")?.to).toBe("/insurance/dental-and-vision-insurance/");
  });
  it("links life sub-lines to the life hub and flags medicare", async () => {
    const term = (await payload.find({ collection: "products", where: { slug: { equals: "term-life-insurance" } }, overrideAccess: true, depth: 0 })).docs[0]!;
    const life = (await payload.find({ collection: "products", where: { slug: { equals: "life-insurance" } }, overrideAccess: true, depth: 0 })).docs[0]!;
    expect(term.parent).toBe(life.id);
    const medicare = (await payload.find({ collection: "products", where: { slug: { equals: "medicare" } }, overrideAccess: true, depth: 0 })).docs[0]!;
    expect(medicare.medicareTouching).toBe(true);
    expect(medicare.thirdSubpage).toBe("plans-enrollment-faq");
  });
});
