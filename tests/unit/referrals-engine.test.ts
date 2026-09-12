import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CODE_ALPHABET, generateCode, isValidCode, normalizeCode } from "../../packages/referrals/src/engine/codes.ts";
import { normalizeAddress, normalizeEmail, normalizePhone } from "../../packages/referrals/src/engine/normalize.ts";
import { screen } from "../../packages/referrals/src/engine/fraud.ts";
import { evaluateReward, type RuleRow } from "../../packages/referrals/src/engine/rewards.ts";
import { TRANSITIONS, canTransition } from "../../packages/referrals/src/engine/transitions.ts";
import { annualEarnedTotal, annualIssuedTotal, outstandingLiability } from "../../packages/referrals/src/engine/totals.ts";
import { attributionCookie, readAttributionCookie, RateLimiter } from "../../packages/referrals/src/engine/attribution.ts";

describe("codes", () => {
  it("alphabet has no 0/O/1/I/L", () => {
    for (const ch of "0O1IL") expect(CODE_ALPHABET.includes(ch)).toBe(false);
  });
  it("generates valid 8-char codes, unique across a sample", () => {
    const codes = new Set(Array.from({ length: 2000 }, () => generateCode()));
    expect(codes.size).toBe(2000);
    for (const c of codes) expect(isValidCode(c)).toBe(true);
  });
  it("normalizes typed input", () => {
    expect(normalizeCode(" ab-cd ef23 ")).toBe("ABCDEF23");
    expect(isValidCode(normalizeCode("ABCDEF0O"))).toBe(false);
  });
});

describe("normalize", () => {
  it("email: case, plus tags, gmail dots", () => {
    expect(normalizeEmail(" Jo.Han+promo@GMAIL.com ")).toBe("johan@gmail.com");
    expect(normalizeEmail("a.b+c@example.com")).toBe("a.b@example.com");
  });
  it("phone: digits, leading 1", () => {
    expect(normalizePhone("+1 (801) 300-9980")).toBe("8013009980");
    expect(normalizePhone("801.300.9980")).toBe("8013009980");
  });
  it("address abbreviations", () => {
    expect(normalizeAddress("123 North Main Street, Apt. 4")).toBe("123 n main st apt 4");
  });
});

describe("fraud screen", () => {
  const base = { referrer: { emailNormalized: "ref@example.com", phoneNormalized: "8015550100" }, referee: { email: "new@example.com", phone: "8015550199" }, referrerAffirmedPermission: true, botCheckPassed: true, existingRefereeKeys: new Set<string>(), referralsByReferrerLast24h: 0, referralsByIpLastHour: 0 };
  it("passes a clean referral", () => expect(screen(base).ok).toBe(true));
  it("consent not affirmed is rejected first", () => expect(screen({ ...base, referrerAffirmedPermission: false })).toMatchObject({ ok: false, reason: "consent-not-affirmed" }));
  it("bot check failed", () => expect(screen({ ...base, botCheckPassed: false })).toMatchObject({ ok: false, reason: "bot-check-failed" }));
  it("self-referral by email or phone", () => {
    expect(screen({ ...base, referee: { email: "REF+x@example.com" } })).toMatchObject({ ok: false, reason: "self-referral" });
    expect(screen({ ...base, referee: { phone: "+1 801 555 0100" } })).toMatchObject({ ok: false, reason: "self-referral" });
  });
  it("duplicate referee across referrers", () => expect(screen({ ...base, existingRefereeKeys: new Set(["email:new@example.com"]) })).toMatchObject({ ok: false, reason: "duplicate-referee" }));
  it("disposable email", () => expect(screen({ ...base, referee: { email: "x@mailinator.com" } })).toMatchObject({ ok: false, reason: "disposable-email" }));
  it("velocity per referrer and per ip", () => {
    expect(screen({ ...base, referralsByReferrerLast24h: 10 })).toMatchObject({ ok: false, reason: "velocity-referrer" });
    expect(screen({ ...base, referralsByIpLastHour: 20 })).toMatchObject({ ok: false, reason: "velocity-ip" });
  });
});

describe("transitions", () => {
  it("bound leads nowhere but closed; rejected and closed are terminal", () => {
    expect(TRANSITIONS.bound).toEqual(["closed"]);
    expect(TRANSITIONS.closed).toEqual([]);
    expect(TRANSITIONS.rejected).toEqual([]);
    expect(canTransition("submitted", "qualified")).toBe(false);
    expect(canTransition("contacted", "qualified")).toBe(true);
  });
});

describe("evaluateReward", () => {
  const rule: RuleRow = { stateAbbr: "AZ", track: "customer", medicareRuleSet: false, rewardTypeAllowed: "merchandise", perReferralCap: 25, perReferrerAnnualCap: 100, cashEquivalentAllowed: "no", sourceCitation: "A.R.S. § — (counsel)" };
  const ok = { tenant: { referralsEnabled: true }, program: { active: true, track: "customer" as const, reward: { type: "merchandise" as const, amount: 20 }, currentTermsVersion: "1" }, referrer: { status: "active" as const }, referral: { id: 1, status: "qualified" as const, medicareTouching: false, refereeStateAbbr: "AZ" }, rule, annualTotalSoFar: 0 };
  it("earns when every gate passes", () => expect(evaluateReward(ok)).toMatchObject({ ok: true, entry: { amount: 20, rewardType: "merchandise", manualReview: false } }));
  it("tenant disabled refuses", () => expect(evaluateReward({ ...ok, tenant: { referralsEnabled: false } })).toEqual({ ok: false, reason: "tenant-disabled" }));
  it("program inactive refuses", () => expect(evaluateReward({ ...ok, program: { ...ok.program, active: false } })).toEqual({ ok: false, reason: "program-inactive" }));
  it("missing rule row refuses", () => expect(evaluateReward({ ...ok, rule: null })).toEqual({ ok: false, reason: "rule-missing" }));
  it("a rule row with any null field refuses (the seeded state)", () => {
    for (const k of ["rewardTypeAllowed", "perReferralCap", "perReferrerAnnualCap", "cashEquivalentAllowed", "sourceCitation"] as const)
      expect(evaluateReward({ ...ok, rule: { ...rule, [k]: null } })).toEqual({ ok: false, reason: "rule-incomplete" });
  });
  it("caps: per referral and annual", () => {
    expect(evaluateReward({ ...ok, program: { ...ok.program, reward: { type: "merchandise", amount: 30 } } })).toEqual({ ok: false, reason: "per-referral-cap-exceeded" });
    expect(evaluateReward({ ...ok, annualTotalSoFar: 90 })).toEqual({ ok: false, reason: "annual-cap-exceeded" });
  });
  it("cash equivalents need the rule's permission; medicare is never cash-equivalent", () => {
    expect(evaluateReward({ ...ok, program: { ...ok.program, reward: { type: "gift-card", amount: 20 } }, rule: { ...rule, rewardTypeAllowed: "gift-card" } })).toEqual({ ok: false, reason: "cash-equivalent-not-allowed" });
    expect(evaluateReward({ ...ok, referral: { ...ok.referral, medicareTouching: true }, program: { ...ok.program, reward: { type: "gift-card", amount: 20 } }, rule: { ...rule, medicareRuleSet: true, rewardTypeAllowed: "gift-card", cashEquivalentAllowed: "yes" } })).toEqual({ ok: false, reason: "medicare-non-cash-only" });
  });
  it("routes medicare-touching referrals to the medicare rule set", () => {
    expect(evaluateReward({ ...ok, referral: { ...ok.referral, medicareTouching: true } })).toEqual({ ok: false, reason: "rule-missing" });
    expect(evaluateReward({ ...ok, referral: { ...ok.referral, medicareTouching: true }, rule: { ...rule, medicareRuleSet: true } })).toMatchObject({ ok: true });
  });
  it("a pending-review referrer earns into the manual review queue; suspended earns nothing", () => {
    expect(evaluateReward({ ...ok, referrer: { status: "pending-review" } })).toMatchObject({ ok: true, entry: { manualReview: true } });
    expect(evaluateReward({ ...ok, referrer: { status: "suspended" } })).toEqual({ ok: false, reason: "referrer-not-active" });
  });
  it("the reward module has no code path from a bound policy", () => {
    const src = readFileSync(join(process.cwd(), "packages/referrals/src/engine/rewards.ts"), "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
    expect(src).not.toMatch(/bound/i);
    expect(src).toContain('status: "qualified"');
  });
});

describe("ledger totals", () => {
  const e = (type: "earned" | "issued" | "reversed", amount: number, y: number, reversesType?: "earned" | "issued") => ({ type, amount, reversesType, createdAt: `${y}-06-01T00:00:00Z` });
  it("computes outstanding, issued and earned per year; a reversal voids an earned or claws back an issued", () => {
    const es = [e("earned", 25, 2026), e("issued", 25, 2026), e("earned", 25, 2026), e("earned", 10, 2025), e("issued", 10, 2025), e("reversed", 10, 2025, "issued"), e("earned", 5, 2026), e("reversed", 5, 2026, "earned")];
    expect(outstandingLiability(es)).toBe(35); // 65 earned − 5 voided − 35 issued + 10 clawed back
    expect(annualIssuedTotal(es, 2026)).toBe(25);
    expect(annualIssuedTotal(es, 2025)).toBe(0);
    expect(annualEarnedTotal(es, 2026)).toBe(50);
    expect(annualEarnedTotal(es, 2025)).toBe(10);
  });
});

describe("attribution", () => {
  it("sets a first-party, HttpOnly, 90-day cookie and reads it back", () => {
    const c = attributionCookie("ABCDEF23", 90, { secure: true });
    expect(c).toContain("Max-Age=7776000");
    expect(c).toContain("HttpOnly");
    expect(c).toContain("Secure");
    expect(readAttributionCookie(`other=1; dp_ref=abcdef23`)).toBe("ABCDEF23");
    expect(readAttributionCookie(undefined)).toBeUndefined();
  });
  it("rate-limits lookups per key", () => {
    const rl = new RateLimiter(3, 1000);
    expect([rl.allow("k"), rl.allow("k"), rl.allow("k"), rl.allow("k")]).toEqual([true, true, true, false]);
    expect(rl.allow("other")).toBe(true);
  });
});
