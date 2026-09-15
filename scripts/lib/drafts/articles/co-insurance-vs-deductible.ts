import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Co-insurance vs deductible",
  excerpt: "A deductible is the fixed amount you absorb before a policy pays. Coinsurance is a share: in health plans, your part of each bill after the deductible; in property policies, a penalty for insuring below value. How each works, with worked examples of both.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Deductibles and coinsurance both decide how much of a covered loss stays with the policyholder, and both appear on declarations pages and plan summaries. They are not two versions of the same thing. A deductible is a fixed amount taken off the top. Coinsurance is proportional, and the word itself means something different in a health plan than in a property policy.",
        "In health insurance, coinsurance is a routine cost share that applies to bills after the deductible is met. In commercial property insurance, and in a similar provision on many homeowner policies, a coinsurance clause is a condition that reduces a claim payment when a building was insured for too little. Confusing the two, or ignoring the second, is how people end up paying far more of a loss than they expected.",
      ],
    },
    {
      heading: "How a deductible works",
      paragraphs: [
        "A deductible is the portion of a covered loss the policyholder pays before the carrier pays anything. On a property or auto policy it usually applies per claim: a flat amount such as the collision deductible on a car, or on some home policies a separate wind and hail deductible expressed as a share of the dwelling limit. On a health plan it usually applies per year, resetting each plan year, with separate individual and family amounts.",
        "Deductibles are chosen when the policy is bought, and the trade-off is straightforward. A higher deductible lowers the premium because the carrier stops paying small claims, and it is a sensible choice for a policyholder with savings who wants insurance for losses they cannot absorb. A lower deductible costs more each year and is worth it mainly when claims are likely or cash reserves are thin.",
      ],
    },
    {
      heading: "Coinsurance in health plans",
      paragraphs: [
        "In a health plan, coinsurance is the share of a covered bill the member pays after meeting the deductible. The plan pays the rest. Coinsurance continues until the member reaches the plan's out-of-pocket maximum, after which the plan pays covered in-network services in full for the rest of the plan year. Copays for office visits and prescriptions sit alongside coinsurance, and on many plans also count toward the out-of-pocket maximum.",
        "Out-of-network care may carry higher coinsurance, a separate deductible and a separate or no out-of-pocket maximum, and the plan's allowed amount rather than the provider's full charge is the base on which coinsurance is calculated. High-deductible plans paired with a health savings account typically have larger deductibles and sometimes no coinsurance at all after the deductible, which changes the calculation again.",
      ],
    },
    {
      heading: "Coinsurance clauses in property policies",
      paragraphs: [
        "Commercial property policies commonly include a coinsurance clause requiring the building or contents to be insured for at least a stated share of their value at the time of loss. If the limit carried is below that requirement, the claim payment is reduced in proportion to the shortfall, even for a partial loss well under the limit. The calculation divides the limit carried by the limit required, multiplies the loss by that fraction and then subtracts the deductible.",
        "The clause exists because property losses are usually partial, and without it a policyholder could insure a building for a fraction of its value, pay a fraction of the premium and still collect in full on most claims. Carriers offer an agreed value endorsement, which suspends the clause for the policy term when a signed statement of values is on file. Many homeowner policies use a related condition: if the dwelling limit is below a stated share of replacement cost, a claim may be paid at actual cash value or on a proportional basis instead of full replacement cost.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "A deductible is a fixed retention the policyholder selects and knows in advance. Health coinsurance is a proportional share that grows with the size of the bill until an annual cap stops it. A property coinsurance clause is neither a retention nor a routine share; it is a penalty that is triggered only when the insured value is too low, and its size depends on how far below the requirement the limit was set. The first two are prices paid for a lower premium. The third is avoided entirely by insuring to value.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "Suppose a member in Reno has a health plan with a $2,000 deductible, 20% coinsurance and a $6,000 out-of-pocket maximum, and has a covered, in-network surgery with an allowed amount of $30,000. The member pays the first $2,000, then 20% of the remaining $28,000, which is $5,600. That totals $7,600, but the out-of-pocket maximum caps the member's share at $6,000 for the year, and the plan pays the other $24,000.",
        "Suppose a retail building in Sparks has a replacement value of $1,000,000 and a commercial property policy with an 80% coinsurance clause, a limit of $600,000 and a $5,000 deductible. A fire causes $200,000 of damage. The required limit was $800,000, so the fraction is $600,000 divided by $800,000, or three quarters. The carrier pays three quarters of $200,000, which is $150,000, less the $5,000 deductible, for $145,000. The owner absorbs $55,000 even though the loss was a third of the limit. Had the building been insured for $800,000 or more, or on agreed value, the payment would have been $195,000. All figures are hypothetical.",
      ],
    },
    {
      heading: "How to set each one",
      paragraphs: ["The rules of thumb follow directly from the mechanics."],
      bullets: [
        "Set property and auto deductibles at an amount you could pay from savings without strain, and compare the annual premium saving against how often you realistically claim.",
        "Choose a health plan's deductible and coinsurance by looking at the out-of-pocket maximum first, since in a bad year that figure, plus premiums, is the real cost.",
        "Never lower a commercial property limit to save premium; update the building's replacement cost regularly and ask for agreed value, which removes the coinsurance penalty.",
        "On a homeowner policy, keep the dwelling limit at the full estimated replacement cost so the replacement cost condition is met and a partial loss is not settled at actual cash value.",
        "Check whether a separate wind and hail deductible applies, since it can be far larger than the all-other-perils deductible in a hail-prone area.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Construction costs in the Phoenix, Las Vegas, Salt Lake City, Boise and Reno markets have risen quickly in recent years, and building values set a few renewals ago are a frequent cause of an unexpected coinsurance penalty on a commercial property claim. Percentage wind and hail deductibles are common in the hail-prone areas of northern Utah, the Treasure Valley and Arizona's monsoon corridor. On the health side, individual plans are sold through HealthCare.gov in Arizona and Utah and through the state-run exchanges Nevada Health Link and Your Health Idaho, and each metal level sets its own mix of deductible, coinsurance and out-of-pocket maximum.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A property or auto policy whose deductibles match the household's savings, and a commercial policy with a current statement of values and agreed value in place, need no change. A health plan whose out-of-pocket maximum the household can cover in a bad year is also likely right, even if another plan has a lower deductible. What deserves attention is a commercial building limit that has not been updated since before recent cost increases, a homeowner dwelling limit below replacement cost, or a percentage wind and hail deductible the owner does not know about. We check limits against current values and explain every deductible and coinsurance term on the policy, compare options across the carriers we represent in Arizona, Nevada, Utah and Idaho, and if your current structure is sound, we say so.",
      ],
    },
  ],
  relatedProducts: ["business-owners-policy", "home-insurance", "health-insurance", "retail-business-insurance"],
  relatedArticles: ["how-to-choose-the-right-deductible", "self-insured-retention-vs-deductible", "hsa-vs-fsa-for-health-costs", "how-to-lower-your-home-insurance-premium"],
  relatedTerms: ["co-insurance", "coinsurance", "deductible", "out-of-pocket-maximum", "agreed-value-policy", "wind-hail-deductible", "high-deductible-health-plan"],
};
