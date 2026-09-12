/**
 * pnpm test:referrals — the engine invariants on a real database:
 * no reward path from bound · null rule row → refusal · consent gate · one
 * opt-in message · self-referral rejection · ledger append-only · events
 * immutable · status only via the engine · manual review gate · medicare routing.
 */
import type { Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ReferralEngine } from "../../packages/referrals/src/engine/service.ts";

type Doc = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
let payload: Payload;
let engine: ReferralEngine;
let tenant: Doc, program: Doc, referrer: Doc, medicare: Doc, auto: Doc;
const sys = { type: "system", job: "test" } as const;
const c = async (collection: string, data: Doc) => (await payload.create({ collection: collection as never, data: data as never, overrideAccess: true, depth: 0 })) as Doc;
const count = async (collection: string, where: Doc) => (await payload.count({ collection: collection as never, where, overrideAccess: true })).totalDocs;
const events = (referral: number | string, type: string) => count("referral-events", { and: [{ referral: { equals: referral } }, { type: { equals: type } }] });
const lastEvent = async (referral: number | string, type: string) => (await payload.find({ collection: "referral-events" as never, where: { and: [{ referral: { equals: referral } }, { type: { equals: type } }] }, sort: "-createdAt", limit: 1, depth: 0, overrideAccess: true })).docs[0] as Doc | undefined;

const FULL_RULE = { rewardTypeAllowed: "merchandise", perReferralCap: 25, perReferrerAnnualCap: 100, cashEquivalentAllowed: "no", sourceCitation: "test citation" };

beforeAll(async () => {
  const { getPayload } = await import("payload");
  const config = (await import("../../src/payload.config.ts")).default;
  payload = await getPayload({ config });
  for (const col of ["referral-events", "reward-ledger", "referrals", "referrers", "referral-reward-rules", "message-templates", "referral-programs", "tenants", "leads"]) await payload.db.deleteMany({ collection: col as never, where: {} });
  engine = new ReferralEngine(payload);
  tenant = await c("tenants", { name: "T1", slug: "t1", referralsEnabled: true, agencyDisplayName: "Tenant One", velocity: { perReferrerPerDay: 1000, perIpPerHour: 1000 } });
  program = await c("referral-programs", { tenant: tenant.id, name: "Customer", track: "customer", active: true, reward: { type: "merchandise", amount: 20 }, terms: [{ version: "1", effectiveFrom: new Date().toISOString(), text: "t" }], currentTermsVersion: "1" });
  referrer = await c("referrers", { tenant: tenant.id, track: "customer", status: "active", name: "Rita Referrer", email: "rita@example.com", phone: "8015550100" });
  medicare = (await payload.find({ collection: "products", where: { slug: { equals: "medicare" } }, overrideAccess: true, depth: 0 })).docs[0] ?? (await c("products", { name: "Medicare", slug: "medicare", tier: "2", category: "Personal", thirdSubpage: "plans-enrollment-faq", medicareTouching: true }));
  auto = (await payload.find({ collection: "products", where: { slug: { equals: "auto-insurance" } }, overrideAccess: true, depth: 0 })).docs[0] ?? (await c("products", { name: "Auto Insurance", slug: "auto-insurance", tier: "1", category: "Personal" }));
  await c("referral-reward-rules", { tenant: tenant.id, stateAbbr: "AZ", track: "customer", medicareRuleSet: false, ...FULL_RULE });
  await c("referral-reward-rules", { tenant: tenant.id, stateAbbr: "NV", track: "customer", medicareRuleSet: false }); // null row: the seeded state
});
afterAll(async () => {
  await payload?.db?.destroy?.();
});

let n = 0;
// Distinct referees per call: the normalizer strips "+tags", so uniqueness must live in the local part itself.
const refer = (over: Doc = {}, referee: Doc = {}) => {
  n++;
  return engine.createReferral({ tenantId: tenant.id, programId: program.id, referrerId: referrer.id, referee: { firstName: "Sam", lastName: "Referee", email: `sam${Date.now()}x${n}@example.com`, phone: `8015${String(100000 + ((Date.now() + n * 7919) % 900000))}`, stateAbbr: "AZ", ...referee }, interestProductIds: [auto.id], source: "portal", referrerAffirmedPermission: true, botCheckPassed: true, ip: "203.0.113.5", actor: sys, ...over });
};

const optIn = async (id: number | string, accept = true) => {
  const doc = (await payload.findByID({ collection: "referrals" as never, id: id as never, depth: 0, overrideAccess: true })) as Doc;
  return engine.respondOptIn(doc.consent.optInToken, accept);
};

describe("consent gate", () => {
  it("refuses a referral without the referrer's affirmation, with a reason code", async () => {
    const r = await refer({ referrerAffirmedPermission: false });
    expect(r).toMatchObject({ status: "rejected", rejectionReason: "consent-not-affirmed" });
    expect(await events(r.id, "rejected")).toBe(1);
  });
  it("sends exactly one opt-in message, never contacts before opt-in, creates the lead only on accept", async () => {
    const r = await refer();
    expect(r.status).toBe("submitted");
    let doc = (await payload.findByID({ collection: "referrals" as never, id: r.id as never, depth: 0, overrideAccess: true })) as Doc;
    expect(doc.consent.optInMessagesSent).toBe(1);
    expect(doc.lead ?? null).toBeNull();
    await expect(engine.transition(r.id, "contacted", sys)).rejects.toThrow(/not opted in/);
    expect(await count("leads", { type: { equals: "referral" } })).toBe(0);
    await optIn(r.id, true);
    doc = (await payload.findByID({ collection: "referrals" as never, id: r.id as never, depth: 0, overrideAccess: true })) as Doc;
    expect(doc.consent.optInStatus).toBe("accepted");
    expect(doc.lead).toBeTruthy();
    expect(doc.consent.optInMessagesSent).toBe(1);
    expect(await events(r.id, "opt-in-sent")).toBe(1);
    await engine.transition(r.id, "contacted", sys);
  });
  it("a declined opt-in rejects the referral and creates no lead", async () => {
    const r = await refer();
    const before = await count("leads", {});
    const res = await optIn(r.id, false);
    expect(res.status).toBe("rejected");
    expect(await count("leads", {})).toBe(before);
    const doc = (await payload.findByID({ collection: "referrals" as never, id: r.id as never, depth: 0, overrideAccess: true })) as Doc;
    expect(doc.rejectionReason).toBe("referee-declined");
  });
});

describe("fraud", () => {
  it("self-referral is rejected with its reason", async () => {
    const r = await refer({}, { email: "RITA@example.com" });
    expect(r).toMatchObject({ status: "rejected", rejectionReason: "self-referral" });
    const r2 = await refer({}, { email: "other@example.com", phone: "+1 (801) 555-0100" });
    expect(r2.rejectionReason).toBe("self-referral");
  });
  it("the same referee from a second referrer is a duplicate", async () => {
    const ref2 = await c("referrers", { tenant: tenant.id, track: "customer", status: "active", name: "Rob", email: "rob@example.com" });
    const first = await refer({}, { email: "dup@example.com", phone: "8015550777" });
    expect(first.status).toBe("submitted");
    const second = await refer({ referrerId: ref2.id }, { email: "Dup@Example.com", phone: "8015550778" });
    expect(second).toMatchObject({ status: "rejected", rejectionReason: "duplicate-referee" });
  });
  it("velocity limits are per tenant and reject with their own reason codes", async () => {
    const slow = await c("tenants", { name: "Slow", slug: "slow", referralsEnabled: false, velocity: { perReferrerPerDay: 2, perIpPerHour: 1000 } });
    const p = await c("referral-programs", { tenant: slow.id, name: "S", track: "customer", active: false });
    const r = await c("referrers", { tenant: slow.id, track: "customer", status: "active", name: "Speedy", email: "speedy@example.com" });
    const go = () => refer({ tenantId: slow.id, programId: p.id, referrerId: r.id }, { email: `v${Date.now()}${n}@example.com`, phone: undefined });
    expect((await go()).status).toBe("submitted");
    expect((await go()).status).toBe("submitted");
    expect((await go()).rejectionReason).toBe("velocity-referrer");
  });
  it("disposable email and failed bot check are rejected", async () => {
    expect((await refer({}, { email: "x@yopmail.com" })).rejectionReason).toBe("disposable-email");
    expect((await refer({ botCheckPassed: false })).rejectionReason).toBe("bot-check-failed");
  });
});

describe("rewards", () => {
  const qualify = async (over: Doc = {}, referee: Doc = {}) => {
    const r = await refer(over, referee);
    expect(r.status).toBe("submitted");
    await optIn(r.id, true);
    await engine.transition(r.id, "contacted", sys);
    await engine.transition(r.id, "qualified", sys);
    return r.id;
  };
  it("a qualified referral in a state with a filled rule earns an entry with the rule snapshot", async () => {
    const id = await qualify();
    expect(await count("reward-ledger", { and: [{ referral: { equals: id } }, { type: { equals: "earned" } }] })).toBe(1);
    const entry = (await payload.find({ collection: "reward-ledger" as never, where: { referral: { equals: id } }, depth: 0, overrideAccess: true })).docs[0] as Doc;
    expect(entry.amount).toBe(20);
    expect(entry.ruleSnapshot.sourceCitation).toBe("test citation");
    expect(entry.termsVersion).toBe("1");
  });
  it("null rule row → refusal event, no ledger entry", async () => {
    const id = await qualify({}, { stateAbbr: "NV" });
    expect(await count("reward-ledger", { referral: { equals: id } })).toBe(0);
    expect((await lastEvent(id, "reward-refused"))?.detail?.reason).toBe("rule-incomplete");
    const id2 = await qualify({}, { stateAbbr: "UT" });
    expect((await lastEvent(id2, "reward-refused"))?.detail?.reason).toBe("rule-missing");
  });
  it("no reward path from bound: moving through quoted and bound adds nothing to the ledger", async () => {
    const id = await qualify();
    const before = await count("reward-ledger", { referral: { equals: id } });
    await engine.transition(id, "quoted", sys);
    await engine.transition(id, "bound", sys);
    await engine.transition(id, "closed", sys);
    expect(await count("reward-ledger", { referral: { equals: id } })).toBe(before);
    expect(await events(id, "reward-earned")).toBe(1);
    // and a referral cannot reach bound without passing qualified first
    const r = await refer();
    await optIn(r.id, true);
    await engine.transition(r.id, "contacted", sys);
    await expect(engine.transition(r.id, "bound", sys)).rejects.toThrow(/cannot move/);
  });
  it("tenant kill switch off → refusal even with a full rule", async () => {
    await payload.update({ collection: "tenants" as never, id: tenant.id, data: { referralsEnabled: false } as never, overrideAccess: true });
    const id = await qualify();
    expect((await lastEvent(id, "reward-refused"))?.detail?.reason).toBe("tenant-disabled");
    await payload.update({ collection: "tenants" as never, id: tenant.id, data: { referralsEnabled: true } as never, overrideAccess: true });
  });
  it("medicare-touching interest routes to the medicare rule set", async () => {
    const id = await qualify({ interestProductIds: [auto.id, medicare.id] });
    const doc = (await payload.findByID({ collection: "referrals" as never, id: id as never, depth: 0, overrideAccess: true })) as Doc;
    expect(doc.medicareTouching).toBe(true);
    expect((await lastEvent(id, "reward-refused"))?.detail?.reason).toBe("rule-missing");
  });
  it("manual review gate: a pending-review referrer earns but cannot be issued until activated", async () => {
    const newbie = await c("referrers", { tenant: tenant.id, track: "customer", status: "pending-review", name: "New Nell", email: "nell@example.com" });
    const id = await qualify({ referrerId: newbie.id });
    const earned = (await payload.find({ collection: "reward-ledger" as never, where: { referral: { equals: id } }, depth: 0, overrideAccess: true })).docs[0] as Doc;
    expect(earned.type).toBe("earned");
    const doc = (await payload.findByID({ collection: "referrals" as never, id: id as never, depth: 0, overrideAccess: true })) as Doc;
    expect(doc.fraud.manualReview).toBe(true);
    await expect(engine.issueReward(earned.id, sys)).rejects.toThrow(/pending-review/);
    await payload.update({ collection: "referrers" as never, id: newbie.id, data: { status: "active" } as never, overrideAccess: true });
    await engine.issueReward(earned.id, sys);
    expect((await engine.balances(newbie.id)).outstanding).toBe(0);
  });
  it("annual cap: totals across the year stop further earning; annualTotals reports issued per referrer", async () => {
    const capped = await c("referrers", { tenant: tenant.id, track: "customer", status: "active", name: "Cap", email: "cap@example.com" });
    for (let i = 0; i < 5; i++) await qualify({ referrerId: capped.id });
    const b = await engine.balances(capped.id);
    expect(b.earnedThisYear).toBe(100);
    const sixth = await qualify({ referrerId: capped.id });
    expect((await lastEvent(sixth, "reward-refused"))?.detail?.reason).toBe("annual-cap-exceeded");
    const totals = await engine.annualTotals(tenant.id, new Date().getUTCFullYear());
    expect(totals.every((t) => typeof t.issued === "number")).toBe(true);
  });
});

describe("structural guards", () => {
  it("the ledger is append-only even with overrideAccess", async () => {
    const entry = (await payload.find({ collection: "reward-ledger" as never, limit: 1, depth: 0, overrideAccess: true })).docs[0] as Doc;
    await expect(payload.update({ collection: "reward-ledger" as never, id: entry.id, data: { amount: 999 } as never, overrideAccess: true })).rejects.toThrow(/append-only/);
    await expect(payload.delete({ collection: "reward-ledger" as never, id: entry.id, overrideAccess: true })).rejects.toThrow(/append-only/);
  });
  it("events are immutable", async () => {
    const ev = (await payload.find({ collection: "referral-events" as never, limit: 1, depth: 0, overrideAccess: true })).docs[0] as Doc;
    await expect(payload.update({ collection: "referral-events" as never, id: ev.id, data: { type: "x" } as never, overrideAccess: true })).rejects.toThrow(/immutable/);
    await expect(payload.delete({ collection: "referral-events" as never, id: ev.id, overrideAccess: true })).rejects.toThrow(/immutable/);
  });
  it("status cannot be edited directly, only through the engine", async () => {
    const r = await refer();
    await expect(payload.update({ collection: "referrals" as never, id: r.id, data: { status: "qualified" } as never, overrideAccess: true })).rejects.toThrow(/through the engine/);
  });
  it("a program's published terms version is immutable", async () => {
    await expect(payload.update({ collection: "referral-programs" as never, id: program.id, data: { terms: [{ version: "1", effectiveFrom: new Date().toISOString(), text: "changed" }] } as never, overrideAccess: true })).rejects.toThrow(/already published/);
  });
  it("codes are unique per tenant and unambiguous; lookup is rate-limited", async () => {
    const codes = (await payload.find({ collection: "referrers" as never, where: { tenant: { equals: tenant.id } }, limit: 0, depth: 0, overrideAccess: true })).docs.map((d) => (d as Doc).code as string);
    expect(new Set(codes).size).toBe(codes.length);
    for (const code of codes) expect(code).toMatch(/^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{8}$/);
    expect(await engine.lookupCode(tenant.id, referrer.code.toLowerCase())).toMatchObject({ referrerId: referrer.id });
    let allowed = 0;
    for (let i = 0; i < 40; i++) if (await engine.lookupCode(tenant.id, referrer.code, "198.51.100.9")) allowed++;
    expect(allowed).toBeLessThanOrEqual(30);
  });
});
