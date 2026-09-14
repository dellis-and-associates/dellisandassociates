import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Guaranteed cost policy",
  definition: [
    "The ordinary form of commercial coverage in which the premium is fixed at the start of the term and does not change with the claims that occur during it. The only later adjustment is an audit of exposure, such as payroll or sales, not of losses.",
  ],
  inPractice: [
    "It is what most small and mid-sized businesses buy without thinking about the alternative, and for most of them it is the right choice: the carrier bears the variability, the budget is known, and there is no bill arriving three years later. The price still reflects the business's own history through the experience modification rate and schedule credits, so it is not indifferent to losses; it just settles them in future years' premiums rather than in the current one. Larger employers with steady, predictable claims sometimes pay more this way than under a retrospective or deductible plan, because the carrier's price includes a margin for the risk it is absorbing. The threshold at which a loss-sensitive program becomes worth considering depends on premium size and cash flow, and the analysis says plainly when the fixed form should stay in place.",
  ],
  example: [
    "Suppose a bakery with twelve employees pays a $20,000 workers compensation premium. During the year an employee suffers a serious burn and the claim costs $90,000. The premium for that year does not change; the audit adjusts only for the payroll that was actually paid. At the following renewal the claim enters the experience modification calculation and the premium rises to, say, $24,000. Hypothetical figures, to show where the loss lands.",
  ],
  relatedTerms: ["retrospective-rating-plan", "loss-sensitive-program", "experience-modification-rate"],
  relatedProducts: ["workers-compensation-insurance", "business-owners-policy"],
};
