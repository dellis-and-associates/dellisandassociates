import type { ReferralStatus } from "../types.ts";

/**
 * The pipeline. `bound` and `closed` are terminal for rewards: nothing that
 * happens after `qualified` can earn anything (see rewards.ts, which only
 * accepts a `qualified` referral).
 */
export const TRANSITIONS: Record<ReferralStatus, readonly ReferralStatus[]> = {
  submitted: ["contacted", "rejected"],
  contacted: ["qualified", "rejected"],
  qualified: ["quoted", "closed", "rejected"],
  quoted: ["bound", "closed", "rejected"],
  bound: ["closed"],
  closed: [],
  rejected: [],
};

export const canTransition = (from: ReferralStatus, to: ReferralStatus): boolean => TRANSITIONS[from].includes(to);
