import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Captive insurance vs traditional insurance",
  excerpt: "Traditional insurance transfers risk to a commercial carrier for a premium; a captive is an insurance company a business or group owns to insure its own risks. Who keeps the profit and bears the volatility, what a captive costs to run, and a worked example.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Businesses usually buy insurance the traditional way. A commercial carrier quotes a premium, the business pays it, and the carrier takes on the risk of claims for the year. Whatever the carrier does not pay out in claims and expenses is its profit. When the market hardens after bad industry years, the price rises for every business in the class, including those with clean records.",
        "A captive changes who sits on the other side of that transaction. The business, or a group of businesses, owns an insurance company that insures their own risks. The owners take on more of the volatility and more of the administration, and in return they keep the underwriting profit and investment income that would otherwise go to a carrier. Whether that trade makes sense depends on the size of the business, the predictability of its losses and its tolerance for a bad year.",
      ],
    },
    {
      heading: "How traditional insurance works",
      paragraphs: [
        "Under a guaranteed cost program, the premium is fixed at the start of the policy period, subject only to audits of payroll, sales or vehicle counts, and it does not change based on claims during the year. The carrier's premium includes expected losses, a margin for uncertainty, acquisition and administrative costs, premium taxes and a profit load. The business's own loss history influences future pricing through experience rating and underwriting judgement, but in any single year the carrier absorbs the result.",
        "Larger businesses often move part of the way toward retaining risk while still using traditional carriers, through large deductibles, self-insured retentions, retrospective rating plans or dividend plans. Those loss-sensitive programs are a step on the path toward a captive, without forming a company.",
      ],
    },
    {
      heading: "How a captive works",
      paragraphs: [
        "A captive is a licensed insurance company, formed under the captive laws of a domicile, whose purpose is insuring its owners' risks. There are several structures.",
      ],
      bullets: [
        "A single-parent or pure captive is owned by one business and insures that business and its affiliates.",
        "A group captive is owned by several unrelated businesses, often in the same industry, which pool their risks, share in the results and usually buy reinsurance above a per-claim and aggregate retention.",
        "A risk retention group is a liability-only captive owned by its policyholders, organised under federal law so it can operate across states after licensing in one.",
        "A cell or rent-a-captive lets a business use a segregated cell of an existing captive without forming and capitalising its own company.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "In traditional insurance the carrier owns the risk and the result. In a captive the owners do. Premiums paid to the captive fund a loss account for expected claims and pay for reinsurance above the captive's retention, a fronting carrier where one is needed, claims administration, actuarial work, audits, captive management and regulatory fees. If claims come in below expectations, the surplus stays in the captive and eventually flows back to the owners as dividends or reduced future premiums. If claims come in above expectations, the owners fund the shortfall through capital already posted, assessments or higher future contributions.",
        "Many captives use a fronting arrangement: a licensed commercial carrier issues the policy, so certificates, filings and contract requirements are satisfied, then cedes the risk to the captive by reinsurance and charges a fee. The fronting carrier usually requires collateral, since it remains liable to claimants if the captive cannot pay. That structure lets the captive work behind the scenes while customers and regulators see a conventional policy.",
      ],
    },
    {
      heading: "A worked group captive example",
      paragraphs: [
        "Suppose a mechanical contractor in Phoenix pays $1,200,000 a year for workers compensation, general liability and commercial auto on a guaranteed cost program, and its losses have run at about $550,000 a year for several years. For example, it joins a group captive of similar contractors and pays a $1,150,000 premium, of which $650,000 goes into its loss fund, $250,000 buys reinsurance above a $250,000 per-claim retention, and $250,000 covers fronting, claims handling and management. The contractor also posts collateral.",
        "Suppose the contractor's losses in the first year come to $450,000. The $200,000 left in its loss fund, plus a share of investment income, becomes eligible to return as a dividend once the claims have matured over several years. Now suppose instead a bad year produces $900,000 of retained losses; the contractor's loss fund is short by $250,000, which the group's pooling layer and the contractor's collateral or an assessment must cover, and next year's contribution rises. Under guaranteed cost, neither the good year nor the bad year changes that year's premium. The figures are illustrative only.",
      ],
    },
    {
      heading: "Who each suits",
      paragraphs: ["A captive is a long-term financial commitment, and it rewards businesses that can control and predict their losses."],
      bullets: [
        "Traditional insurance suits small businesses and many mid-sized ones, businesses with volatile or unpredictable losses, and owners who want a fixed cost and no collateral or administrative burden.",
        "A group captive can suit a mid-sized business with a substantial casualty premium, a strong safety culture, a loss history better than its industry peers, and the capital to post collateral and wait several years for dividends.",
        "A single-parent captive generally suits large companies with sizeable, diverse risks, a risk management staff and the scale to justify formation, capital and ongoing management costs.",
        "Risk retention groups suit professionals and businesses in liability classes where the commercial market is expensive or unstable, such as some medical and contracting specialties.",
        "No business should form a captive mainly for tax reasons; small captives electing special tax treatment have drawn sustained IRS enforcement, and arrangements without genuine risk transfer carry real penalties.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Utah has an established captive insurance regulatory program and is home to a large number of captive companies, and Arizona and Nevada also license captives under their own statutes, so owners in the region can form a captive close to home or use an out-of-state domicile. Construction, trucking, healthcare, hospitality and agriculture groups across Arizona, Nevada, Utah and Idaho all have captive and risk retention group options. A captive does not remove state requirements: workers compensation still has to meet each state's rules, commercial auto still needs the required filings, and a fronting carrier licensed in the relevant states is usually how those requirements are met.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A business on a traditional program with fair pricing, good coverage and a loss history that is ordinary for its industry is usually better off staying there; the costs and collateral of a captive only pay off for businesses that beat their peers consistently. A business already in a well-run captive that has returned dividends and kept coverage stable should generally stay as well, since leaving early can forfeit capital and dividends still in the pipeline. The case for looking at a captive is a mid-sized business with years of strong results that keeps paying market prices set by its industry's worst performers. We review loss runs and the full cost of each structure alongside the owners' financial and tax advisers, compare traditional options across the carriers we represent in Arizona, Nevada, Utah and Idaho, and if the existing program is the right one, we say so.",
      ],
    },
  ],
  relatedProducts: ["workers-compensation-insurance", "general-liability-insurance", "commercial-auto-insurance", "commercial-umbrella-insurance"],
  relatedArticles: ["self-insured-retention-vs-deductible", "loss-ratio-vs-combined-ratio-explained", "reinsurance-vs-primary-insurance", "admitted-vs-non-admitted-carriers"],
  relatedTerms: ["captive-insurance", "risk-retention-group", "self-insured-retention", "loss-sensitive-program", "guaranteed-cost-policy"],
};
