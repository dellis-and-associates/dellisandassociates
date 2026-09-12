/**
 * Reward evaluation. Pure. The only input status this module accepts is
 * `qualified`; there is no code path from any later status. If a client asks
 * for a reward tied to a policy being sold, that is a counsel conversation,
 * not a change here.
 */
import type { RewardRefusal, RewardType, Track } from "../types.ts";

export type QualifiedReferral = { id: number | string; status: "qualified"; medicareTouching: boolean; refereeStateAbbr: string | null | undefined };
export type RuleRow = {
  id?: number | string;
  stateAbbr: string;
  track: Track;
  medicareRuleSet: boolean;
  rewardTypeAllowed: RewardType | null | undefined;
  perReferralCap: number | null | undefined;
  perReferrerAnnualCap: number | null | undefined;
  cashEquivalentAllowed: "yes" | "no" | null | undefined;
  sourceCitation: string | null | undefined;
};
export type EvaluateInput = {
  tenant: { referralsEnabled: boolean };
  program: { active: boolean; track: Track; activeFrom?: string | null; activeTo?: string | null; reward?: { type?: RewardType | null; amount?: number | null } | null; currentTermsVersion?: string | null };
  referrer: { status: "pending-review" | "active" | "suspended" };
  referral: QualifiedReferral;
  rule: RuleRow | null | undefined;
  annualTotalSoFar: number;
  now?: Date;
};
export type Evaluation =
  | { ok: true; entry: { rewardType: RewardType; amount: number; ruleSnapshot: RuleRow; termsVersion: string; manualReview: boolean } }
  | { ok: false; reason: RewardRefusal };

const CASH_EQUIVALENT: readonly RewardType[] = ["gift-card", "account-credit"];

export function ruleMatches(rule: RuleRow, referral: QualifiedReferral, track: Track): boolean {
  return rule.track === track && rule.medicareRuleSet === referral.medicareTouching && rule.stateAbbr.toUpperCase() === (referral.refereeStateAbbr ?? "").toUpperCase();
}

export function evaluateReward(input: EvaluateInput): Evaluation {
  const now = input.now ?? new Date();
  if (!input.tenant.referralsEnabled) return { ok: false, reason: "tenant-disabled" };
  const p = input.program;
  if (!p.active || (p.activeFrom && new Date(p.activeFrom) > now) || (p.activeTo && new Date(p.activeTo) < now)) return { ok: false, reason: "program-inactive" };
  if (input.referrer.status === "suspended") return { ok: false, reason: "referrer-not-active" };
  const rule = input.rule;
  if (!rule || !ruleMatches(rule, input.referral, p.track)) return { ok: false, reason: "rule-missing" };
  if (rule.rewardTypeAllowed == null || rule.perReferralCap == null || rule.perReferrerAnnualCap == null || rule.cashEquivalentAllowed == null || !rule.sourceCitation) return { ok: false, reason: "rule-incomplete" };
  const rewardType = p.reward?.type ?? rule.rewardTypeAllowed;
  if (rewardType === "none" || rule.rewardTypeAllowed === "none") return { ok: false, reason: "reward-type-not-allowed" };
  if (rewardType !== rule.rewardTypeAllowed) return { ok: false, reason: "reward-type-not-allowed" };
  if (CASH_EQUIVALENT.includes(rewardType) && rule.cashEquivalentAllowed !== "yes") return { ok: false, reason: "cash-equivalent-not-allowed" };
  if (input.referral.medicareTouching && CASH_EQUIVALENT.includes(rewardType)) return { ok: false, reason: "medicare-non-cash-only" };
  const requested = p.reward?.amount ?? rule.perReferralCap;
  if (requested > rule.perReferralCap) return { ok: false, reason: "per-referral-cap-exceeded" };
  if (input.annualTotalSoFar + requested > rule.perReferrerAnnualCap) return { ok: false, reason: "annual-cap-exceeded" };
  if (!p.currentTermsVersion) return { ok: false, reason: "program-inactive" };
  return {
    ok: true,
    entry: { rewardType, amount: requested, ruleSnapshot: rule, termsVersion: p.currentTermsVersion, manualReview: input.referrer.status === "pending-review" },
  };
}
