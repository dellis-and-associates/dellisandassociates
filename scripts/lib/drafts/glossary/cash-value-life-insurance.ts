import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Cash value life insurance",
  definition: [
    "Any permanent policy that builds a savings component alongside the death benefit, funded by the part of each premium not needed to pay for the pure cost of coverage. Whole life, universal life and their variants all belong to the family; term does not.",
  ],
  inPractice: [
    "The savings grow tax-deferred, can be borrowed against or withdrawn, and can be surrendered for cash if the policy is given up; in some designs they can also pay the premiums in later years. The trade-off is price: a permanent policy costs several times what the same death benefit costs on a term policy at the same age, because it is funding the savings and is designed to stay in force for life. Loans reduce the death benefit until repaid and accrue interest, and a policy that lapses with a loan outstanding can produce a tax bill. Early surrender returns less than was paid in, since surrender charges and acquisition costs come first. It suits people who have already funded retirement accounts, who need coverage that will not expire, or who have an estate or business purpose for a permanent benefit. For most families with a temporary need, the analysis says so and recommends term, which is the point of doing the analysis.",
  ],
  example: [
    "Suppose a forty-year-old pays $6,000 a year for a permanent policy with a $500,000 death benefit. After fifteen years the savings component is about $80,000. She borrows $30,000 for a down payment at the policy's loan rate. The death benefit while the loan is outstanding is $470,000 less accrued interest owed. Had she bought a twenty-year term policy for $600 a year instead and invested the $5,400 difference, the comparison depends on her returns, which is the calculation to run. Hypothetical figures.",
  ],
  relatedTerms: ["term-life-insurance", "surrender-charge", "non-forfeiture-options"],
  relatedProducts: ["whole-life-insurance", "indexed-universal-life-insurance"],
};
