import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Benefit period",
  definition: ["The maximum length of time, or the total pool of money, that a disability or care policy will pay on a claim once payments begin. It sets the outer limit of the promise, alongside the daily or monthly maximum and the waiting time."],
  inPractice: ["In care policies the length is usually converted to a dollar pool by multiplying the daily maximum by the number of days, and the pool then lasts longer than the stated years if the insured claims less than the maximum each day. Shared care riders let spouses draw on each other's pools. Lifetime options have largely disappeared from new care policies, so a few years is the typical range, chosen to cover a stay long enough to matter without paying for the rare very long one. In disability income policies it commonly runs to a retirement age for an occupation-based policy, or a fixed number of years for cheaper coverage, and short-term policies count in weeks. Medicare uses the phrase differently, for a hospital stay measured from admission until a set stretch without inpatient care."],
  example: ["Suppose a policy pays up to $200 a day for three years, a pool of $219,000. Suppose the insured's actual care costs $150 a day. The policy pays $150 daily and the pool lasts four years, not three. Had the care cost $250 a day, the policy would still pay $200 and the pool would run out on schedule. Hypothetical figures."],
  relatedTerms: ["elimination-period", "long-term-care-insurance", "activities-of-daily-living"],
  relatedProducts: ["life-insurance", "medicare"],
};
