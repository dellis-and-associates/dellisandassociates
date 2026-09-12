/**
 * The engine with a database. Every method authorizes nothing by itself: the
 * caller (a server action, a portal route, an admin job) has already decided
 * the actor may do this, and passes the actor for the audit trail. All writes
 * go through the local API with overrideAccess and `context.referralEngine`,
 * which is how Referrals.status may change at all.
 */
import { randomBytes } from "node:crypto";
import type { Payload } from "payload";
import { referralsOptions } from "../index.ts";
import type { Actor, RejectionReason, ReferralStatus, Track } from "../types.ts";
import { RateLimiter } from "./attribution.ts";
import { normalizeCode } from "./codes.ts";
import { screen } from "./fraud.ts";
import { hashIp } from "./hash.ts";
import { normalizeAddress } from "./normalize.ts";
import { evaluateReward, type QualifiedReferral, type RuleRow } from "./rewards.ts";
import { annualEarnedTotal, annualIssuedTotal, outstandingLiability } from "./totals.ts";
import { canTransition } from "./transitions.ts";

type Id = number | string;
type Doc = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any -- plugin is host-schema-agnostic
const idOf = (v: unknown): Id => (typeof v === "object" && v !== null ? (v as { id: Id }).id : (v as Id));
const CTX = { referralEngine: true } as const;

export type CreateReferralInput = {
  tenantId: Id;
  programId: Id;
  referrerId: Id;
  referee: { firstName: string; lastName?: string; email?: string; phone?: string; address?: string; stateAbbr?: string };
  interestProductIds?: Id[];
  source: "link" | "code" | "form" | "portal";
  attribution?: { code?: string; landingPage?: string; firstTouchAt?: string };
  referrerAffirmedPermission: boolean;
  botCheckPassed: boolean;
  ip?: string;
  actor: Actor;
};

export class ReferralEngine {
  private readonly opts = referralsOptions();
  private readonly codeLookups = new RateLimiter(30, 60_000);
  private readonly payload: Payload;
  constructor(payload: Payload) {
    this.payload = payload;
  }

  private hash(ip?: string) {
    return ip ? hashIp(ip, this.opts.hashSalt) : undefined;
  }
  private async event(e: { tenant: Id; referral?: Id; referrer?: Id; type: string; from?: string; to?: string; actor: Actor; ip?: string; detail?: unknown }) {
    await this.payload.create({ collection: "referral-events" as never, data: { ...e, ipHash: this.hash(e.ip), ip: undefined } as never, overrideAccess: true, context: CTX });
  }
  private get<T = Doc>(collection: string, id: Id): Promise<T> {
    return this.payload.findByID({ collection: collection as never, id: id as never, depth: 0, overrideAccess: true }) as unknown as Promise<T>;
  }

  /** Step 1 of the consent flow. Screens, records, and sends the referee exactly one opt-in message. No lead exists yet. */
  async createReferral(input: CreateReferralInput): Promise<{ id: Id; status: ReferralStatus; rejectionReason?: RejectionReason }> {
    const [tenant, program, referrer] = await Promise.all([this.get("tenants", input.tenantId), this.get("referral-programs", input.programId), this.get("referrers", input.referrerId)]);
    if (String(idOf(program.tenant)) !== String(tenant.id) || String(idOf(referrer.tenant)) !== String(tenant.id)) throw new Error("program and referrer must belong to the tenant");
    if (program.track !== referrer.track) throw new Error("program track and referrer track differ");

    const products = input.interestProductIds?.length
      ? (await this.payload.find({ collection: "products" as never, where: { id: { in: input.interestProductIds } }, depth: 0, limit: 100, overrideAccess: true })).docs as Doc[]
      : [];
    const medicareTouching = products.some((p) => p.medicareTouching === true);

    const since = new Date(Date.now() - Number(tenant.dedupeWindowDays ?? 180) * 86_400_000).toISOString();
    const limits = { perReferrerPerDay: Number(tenant.velocity?.perReferrerPerDay ?? 10), perIpPerHour: Number(tenant.velocity?.perIpPerHour ?? 20) };
    const keys = new Set<string>();
    const probe = screen({ referrer, referee: { ...input.referee, address: input.referee.address ? normalizeAddress(input.referee.address) : undefined }, referrerAffirmedPermission: input.referrerAffirmedPermission, botCheckPassed: input.botCheckPassed, existingRefereeKeys: keys, referralsByReferrerLast24h: 0, referralsByIpLastHour: 0 });
    if (probe.ok) {
      const or: Doc[] = [];
      if (probe.keys.emailNormalized) or.push({ "referee.emailNormalized": { equals: probe.keys.emailNormalized } });
      if (probe.keys.phoneNormalized) or.push({ "referee.phoneNormalized": { equals: probe.keys.phoneNormalized } });
      if (or.length) {
        const dupes = (await this.payload.find({ collection: "referrals" as never, where: { and: [{ tenant: { equals: tenant.id } }, { status: { not_equals: "rejected" } }, { createdAt: { greater_than: since } }, { or }] }, depth: 0, limit: 10, overrideAccess: true })).docs as Doc[];
        for (const d of dupes) {
          if (d.referee?.emailNormalized) keys.add(`email:${d.referee.emailNormalized}`);
          if (d.referee?.phoneNormalized) keys.add(`phone:${d.referee.phoneNormalized}`);
        }
      }
    }
    const dayAgo = new Date(Date.now() - 86_400_000).toISOString();
    const hourAgo = new Date(Date.now() - 3_600_000).toISOString();
    const ipHash = this.hash(input.ip);
    const [byReferrer, byIp] = await Promise.all([
      this.payload.count({ collection: "referrals" as never, where: { and: [{ referrer: { equals: referrer.id } }, { createdAt: { greater_than: dayAgo } }] }, overrideAccess: true }),
      ipHash ? this.payload.count({ collection: "referrals" as never, where: { and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: hourAgo } }] }, overrideAccess: true }) : Promise.resolve({ totalDocs: 0 }),
    ]);
    const result = screen({ referrer, referee: { ...input.referee, address: input.referee.address ? normalizeAddress(input.referee.address) : undefined }, referrerAffirmedPermission: input.referrerAffirmedPermission, botCheckPassed: input.botCheckPassed, existingRefereeKeys: keys, referralsByReferrerLast24h: byReferrer.totalDocs, referralsByIpLastHour: byIp.totalDocs, limits });

    const base = {
      tenant: tenant.id,
      program: program.id,
      referrer: referrer.id,
      referee: { firstName: input.referee.firstName, lastName: input.referee.lastName, email: input.referee.email, phone: input.referee.phone, stateAbbr: input.referee.stateAbbr?.toUpperCase(), emailNormalized: result.ok ? result.keys.emailNormalized : undefined, phoneNormalized: result.ok ? result.keys.phoneNormalized : undefined },
      interest: input.interestProductIds ?? [],
      medicareTouching,
      source: input.source,
      attribution: { code: input.attribution?.code, model: "first-touch", firstTouchAt: input.attribution?.firstTouchAt, landingPage: input.attribution?.landingPage },
      consent: { referrerAffirmedPermission: input.referrerAffirmedPermission, optInMessagesSent: 0, optInStatus: "pending" },
      fraud: { botCheckPassed: input.botCheckPassed, ...(result.ok ? {} : result.flags) },
      ipHash,
    };
    if (!result.ok) {
      const doc = (await this.payload.create({ collection: "referrals" as never, data: { ...base, status: "rejected", rejectionReason: result.reason } as never, overrideAccess: true, context: CTX, depth: 0 })) as Doc;
      await this.event({ tenant: tenant.id, referral: doc.id, referrer: referrer.id, type: "rejected", from: "submitted", to: "rejected", actor: input.actor, ip: input.ip, detail: { reason: result.reason } });
      return { id: doc.id, status: "rejected", rejectionReason: result.reason };
    }
    const doc = (await this.payload.create({ collection: "referrals" as never, data: { ...base, status: "submitted" } as never, overrideAccess: true, context: CTX, depth: 0 })) as Doc;
    await this.event({ tenant: tenant.id, referral: doc.id, referrer: referrer.id, type: "created", to: "submitted", actor: input.actor, ip: input.ip });
    await this.sendOptIn(doc, referrer, tenant, input.actor);
    return { id: doc.id, status: "submitted" };
  }

  /** Exactly one opt-in message per referral, enforced by the counter, whatever the caller does. */
  private async sendOptIn(referral: Doc, referrer: Doc, tenant: Doc, actor: Actor): Promise<void> {
    if ((referral.consent?.optInMessagesSent ?? 0) >= 1) return;
    if (!referral.referee?.email) {
      await this.event({ tenant: tenant.id, referral: referral.id, type: "opt-in-skipped", actor, detail: { reason: "no-email" } });
      return;
    }
    const token = randomBytes(24).toString("hex");
    const tpl = (await this.payload.find({ collection: "message-templates" as never, where: { and: [{ tenant: { equals: tenant.id } }, { key: { equals: "referee-opt-in" } }, { active: { equals: true } }] }, sort: "-version", limit: 1, depth: 0, overrideAccess: true })).docs[0] as Doc | undefined;
    const vars: Record<string, string> = {
      referrerFirstName: String(referrer.name ?? "").split(" ")[0] ?? "",
      refereeFirstName: referral.referee.firstName,
      agencyName: tenant.agencyDisplayName ?? tenant.name,
      acceptUrl: `${this.opts.siteUrl}/r/opt-in/${token}/accept/`,
      declineUrl: `${this.opts.siteUrl}/r/opt-in/${token}/decline/`,
    };
    const render = (s: string) => s.replace(/\{\{(\w+)\}\}/g, (_, k: string) => vars[k] ?? "");
    const subject = render(tpl?.subject ?? "{{referrerFirstName}} suggested we reach out");
    const body = render(tpl?.body ?? "{{referrerFirstName}} asked {{agencyName}} to get in touch. Yes: {{acceptUrl}} — No thanks: {{declineUrl}}");
    // Counter first, send second: a failed send never leads to a second message.
    await this.payload.update({ collection: "referrals" as never, id: referral.id, data: { consent: { ...referral.consent, optInMessagesSent: 1, optInSentAt: new Date().toISOString(), optInToken: token } } as never, overrideAccess: true, context: CTX, depth: 0 });
    const res = await this.opts.sendEmail({ to: referral.referee.email, subject, text: body, purpose: "referee-opt-in" });
    await this.event({ tenant: tenant.id, referral: referral.id, type: "opt-in-sent", actor, detail: { sent: res.sent, skipped: res.skipped, templateVersion: tpl?.version ?? 0 } });
  }

  /** Step 2 of the consent flow: the referee answers. Accept creates the minimal lead; decline rejects the referral. */
  async respondOptIn(token: string, accept: boolean, ip?: string): Promise<{ id: Id; status: ReferralStatus }> {
    if (!token || token.length < 32) throw new Error("unknown opt-in token");
    const referral = (await this.payload.find({ collection: "referrals" as never, where: { and: [{ "consent.optInToken": { equals: token } }, { "consent.optInStatus": { equals: "pending" } }] }, limit: 1, depth: 0, overrideAccess: true })).docs[0] as Doc | undefined;
    if (!referral) throw new Error("unknown opt-in token");
    if (referral.consent?.optInStatus !== "pending") return { id: referral.id, status: referral.status };
    const consent = { ...referral.consent, optInStatus: accept ? "accepted" : "declined", optInRespondedAt: new Date().toISOString(), optInToken: null };
    await this.event({ tenant: idOf(referral.tenant), referral: referral.id, type: "opt-in-response", actor: { type: "referee" }, ip, detail: { accepted: accept } });
    if (!accept) {
      await this.payload.update({ collection: "referrals" as never, id: referral.id, data: { consent } as never, overrideAccess: true, context: CTX, depth: 0 });
      return this.transition(referral.id, "rejected", { type: "referee" }, { ip, reason: "referee-declined" });
    }
    const lead = (await this.payload.create({
      collection: "leads" as never,
      data: { type: "referral", status: "new", contact: { name: [referral.referee.firstName, referral.referee.lastName].filter(Boolean).join(" "), email: referral.referee.email, phone: referral.referee.phone }, interest: referral.interest ?? [], source: { referralCode: referral.attribution?.code, page: referral.attribution?.landingPage, ipHash: this.hash(ip) } } as never,
      overrideAccess: true,
      depth: 0,
    })) as Doc;
    await this.payload.update({ collection: "referrals" as never, id: referral.id, data: { consent, lead: lead.id } as never, overrideAccess: true, context: CTX, depth: 0 });
    return { id: referral.id, status: referral.status };
  }

  /** The only way a referral changes status. `qualified` may earn a reward; nothing after it can. */
  async transition(referralId: Id, to: ReferralStatus, actor: Actor, extra: { ip?: string; reason?: RejectionReason; note?: string } = {}): Promise<{ id: Id; status: ReferralStatus }> {
    const referral = await this.get("referrals", referralId);
    const from = referral.status as ReferralStatus;
    if (!canTransition(from, to)) throw new Error(`cannot move a referral from ${from} to ${to}`);
    if (to === "contacted" && referral.consent?.optInStatus !== "accepted") throw new Error("the referee has not opted in; no contact before opt-in");
    if (to === "rejected" && !extra.reason) throw new Error("a rejection needs a reason code");
    await this.payload.update({ collection: "referrals" as never, id: referral.id, data: { status: to, ...(to === "rejected" ? { rejectionReason: extra.reason } : {}) } as never, overrideAccess: true, context: CTX, depth: 0 });
    await this.event({ tenant: idOf(referral.tenant), referral: referral.id, referrer: idOf(referral.referrer), type: to === "rejected" ? "rejected" : "status-change", from, to, actor, ip: extra.ip, detail: { reason: extra.reason, note: extra.note } });
    if (to === "qualified") await this.earn({ ...referral, status: "qualified" }, actor);
    return { id: referral.id, status: to };
  }

  /** Reward on qualification. Refusals are recorded as events with a reason; nothing is silent. */
  private async earn(referral: Doc & { status: "qualified" }, actor: Actor): Promise<void> {
    const [tenant, program, referrer] = await Promise.all([this.get("tenants", idOf(referral.tenant)), this.get("referral-programs", idOf(referral.program)), this.get("referrers", idOf(referral.referrer))]);
    const q: QualifiedReferral = { id: referral.id, status: "qualified", medicareTouching: Boolean(referral.medicareTouching), refereeStateAbbr: referral.referee?.stateAbbr };
    const rule = (await this.payload.find({ collection: "referral-reward-rules" as never, where: { and: [{ tenant: { equals: tenant.id } }, { stateAbbr: { equals: (q.refereeStateAbbr ?? "").toUpperCase() } }, { track: { equals: program.track as Track } }, { medicareRuleSet: { equals: q.medicareTouching } }] }, limit: 1, depth: 0, overrideAccess: true })).docs[0] as RuleRow | undefined;
    const entries = (await this.payload.find({ collection: "reward-ledger" as never, where: { referrer: { equals: referrer.id } }, limit: 0, pagination: false, depth: 0, overrideAccess: true })).docs as Doc[];
    const year = new Date().getUTCFullYear();
    const evaluation = evaluateReward({ tenant: tenant as { referralsEnabled: boolean }, program: program as never, referrer: referrer as never, referral: q, rule, annualTotalSoFar: annualEarnedTotal(entries as never, year) });
    if (!evaluation.ok) {
      await this.event({ tenant: tenant.id, referral: referral.id, referrer: referrer.id, type: "reward-refused", actor, detail: { reason: evaluation.reason } });
      return;
    }
    const e = evaluation.entry;
    const entry = (await this.payload.create({ collection: "reward-ledger" as never, data: { tenant: tenant.id, referrer: referrer.id, referral: referral.id, type: "earned", rewardType: e.rewardType, amount: e.amount, currency: "USD", ruleSnapshot: e.ruleSnapshot, termsVersion: e.termsVersion, actor } as never, overrideAccess: true, context: CTX, depth: 0 })) as Doc;
    if (e.manualReview) await this.payload.update({ collection: "referrals" as never, id: referral.id, data: { fraud: { ...referral.fraud, manualReview: true } } as never, overrideAccess: true, context: CTX, depth: 0 });
    await this.event({ tenant: tenant.id, referral: referral.id, referrer: referrer.id, type: "reward-earned", actor, detail: { ledger: entry.id, amount: e.amount, rewardType: e.rewardType, manualReview: e.manualReview } });
  }

  /** Manual review gate: a pending-review referrer cannot be issued anything. */
  async issueReward(earnedEntryId: Id, actor: Actor): Promise<Id> {
    const earned = await this.get("reward-ledger", earnedEntryId);
    if (earned.type !== "earned") throw new Error("only an earned entry can be issued");
    const referrer = await this.get("referrers", idOf(earned.referrer));
    if (referrer.status !== "active") throw new Error(`referrer is ${referrer.status}; activate them after review before issuing`);
    const already = await this.payload.count({ collection: "reward-ledger" as never, where: { and: [{ reverses: { equals: earned.id } }, { type: { equals: "issued" } }] }, overrideAccess: true });
    if (already.totalDocs) throw new Error("already issued");
    const issued = (await this.payload.create({ collection: "reward-ledger" as never, data: { tenant: idOf(earned.tenant), referrer: referrer.id, referral: idOf(earned.referral), type: "issued", rewardType: earned.rewardType, amount: earned.amount, currency: earned.currency, ruleSnapshot: earned.ruleSnapshot, termsVersion: earned.termsVersion, actor, reverses: earned.id } as never, overrideAccess: true, context: CTX, depth: 0 })) as Doc;
    await this.event({ tenant: idOf(earned.tenant), referral: idOf(earned.referral), referrer: referrer.id, type: "reward-issued", actor, detail: { ledger: issued.id, amount: earned.amount } });
    return issued.id;
  }

  async reverseReward(entryId: Id, actor: Actor, reason: string): Promise<Id> {
    const entry = await this.get("reward-ledger", entryId);
    if (entry.type === "reversed") throw new Error("a reversal cannot be reversed; write a new earned or issued entry");
    const reversed = (await this.payload.create({ collection: "reward-ledger" as never, data: { tenant: idOf(entry.tenant), referrer: idOf(entry.referrer), referral: idOf(entry.referral), type: "reversed", reversesType: entry.type, rewardType: entry.rewardType, amount: entry.amount, currency: entry.currency, ruleSnapshot: entry.ruleSnapshot, termsVersion: entry.termsVersion, actor, reason, reverses: entry.id } as never, overrideAccess: true, context: CTX, depth: 0 })) as Doc;
    await this.event({ tenant: idOf(entry.tenant), referral: idOf(entry.referral), referrer: idOf(entry.referrer), type: "reward-reversed", actor, detail: { ledger: reversed.id, reverses: entry.id, reason } });
    return reversed.id;
  }

  async balances(referrerId: Id, year = new Date().getUTCFullYear()) {
    const entries = (await this.payload.find({ collection: "reward-ledger" as never, where: { referrer: { equals: referrerId } }, limit: 0, pagination: false, depth: 0, overrideAccess: true })).docs as never[];
    return { outstanding: outstandingLiability(entries), issuedThisYear: annualIssuedTotal(entries, year), earnedThisYear: annualEarnedTotal(entries, year) };
  }

  /** Per-referrer annual issued totals for the accountant. The engine asserts no threshold. */
  async annualTotals(tenantId: Id, year: number): Promise<{ referrer: Id; issued: number }[]> {
    const entries = (await this.payload.find({ collection: "reward-ledger" as never, where: { tenant: { equals: tenantId } }, limit: 0, pagination: false, depth: 0, overrideAccess: true })).docs as Doc[];
    const by = new Map<string, Doc[]>();
    for (const e of entries) by.set(String(idOf(e.referrer)), [...(by.get(String(idOf(e.referrer))) ?? []), e]);
    return [...by.entries()].map(([referrer, es]) => ({ referrer, issued: annualIssuedTotal(es as never, year) })).filter((r) => r.issued > 0);
  }

  /** Rate-limited code lookup for /r/{code} and manual code entry. */
  async lookupCode(tenantId: Id, rawCode: string, ip?: string): Promise<{ referrerId: Id; track: Track } | null> {
    if (!this.codeLookups.allow(this.hash(ip) ?? "anon")) return null;
    const code = normalizeCode(rawCode);
    const doc = (await this.payload.find({ collection: "referrers" as never, where: { and: [{ tenant: { equals: tenantId } }, { code: { equals: code } }, { status: { not_equals: "suspended" } }] }, limit: 1, depth: 0, overrideAccess: true })).docs[0] as Doc | undefined;
    return doc ? { referrerId: doc.id, track: doc.track } : null;
  }
}
