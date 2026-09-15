import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Loss ratio vs combined ratio explained",
  excerpt: "The loss ratio measures claims against premium; the combined ratio adds the cost of running the business to show whether underwriting made money. How each is calculated, why they drive rates for a whole state and for a single business account, and a worked example.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Loss ratio and combined ratio are the two numbers insurers use most to judge whether a line of business, a state or a single customer's account is working. They sound like industry jargon, and mostly they are, but they explain things policyholders care about directly: why a homeowner's premium rose after a year without a claim, why a contractor's renewal quote jumped after two small accidents, and why a carrier suddenly stops writing new business in a county.",
        "The loss ratio looks at claims alone. The combined ratio looks at claims plus everything else it costs to sell and service insurance. The gap between them, and whether the combined figure sits above or below the break-even line, tells you whether the insurance itself is profitable before any investment income.",
      ],
    },
    {
      heading: "What the loss ratio measures",
      paragraphs: [
        "The loss ratio compares incurred losses with earned premium over a period. Incurred losses include claims paid plus reserves set aside for claims reported but not yet settled, and usually an estimate for claims that have happened but have not yet been reported. Many carriers include loss adjustment expenses, the cost of investigating and settling claims, and call the result a loss and LAE ratio. Earned premium is the portion of premium corresponding to coverage already provided during the period, not the full amount billed.",
        "Because reserves are estimates, a loss ratio for a recent year is provisional. It often changes as claims develop, particularly for liability lines where lawsuits take years to resolve. A property line with fast-settling claims gives a clearer early picture than a workers compensation or commercial auto line.",
      ],
    },
    {
      heading: "What the combined ratio adds",
      paragraphs: [
        "The combined ratio adds the expense ratio to the loss ratio. The expense ratio compares underwriting expenses, such as commissions, premium taxes, salaries, technology, marketing and policy administration, with premium. Some carriers also add policyholder dividends. The sum shows how much of each premium dollar went out in claims and costs combined.",
        "A combined ratio below the break-even point means the carrier made an underwriting profit; above it means an underwriting loss. Insurers also earn investment income on premiums held before claims are paid, and on reserves and capital, so a carrier can lose money on underwriting and still earn a profit overall. That cushion is larger for long-tail liability lines, where claim money is held for years, and smaller for property lines, where claims are paid quickly.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "The loss ratio isolates the risk side of the business: how well a carrier selected and priced policies relative to the claims that followed. The combined ratio adds the operating side: how efficiently it acquired and serviced that business. A carrier can have a healthy loss ratio and still lose money because its expenses are high, or have a poor loss ratio in a catastrophe year with otherwise lean operations.",
        "They are used at different levels, too. At the carrier and state level, both ratios drive rate filings and decisions about where to grow or pull back. At the account level, underwriters rarely calculate a full combined ratio for one customer, but they look closely at the account's loss ratio over several years, because the expense side of a single account is roughly fixed and the losses are what change.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a regional carrier's homeowner line earns $100 million of premium in a year and incurs $65 million of losses and loss adjustment expenses. Its loss ratio is 65%. Its commissions, taxes and operating costs come to $32 million, an expense ratio of 32%, so its combined ratio is 97% and it earns an underwriting profit of $3 million before investment income. Now suppose the next year a wildfire and a severe hailstorm push incurred losses to $80 million on the same premium. The loss ratio rises to 80%, the combined ratio to 112%, and the carrier loses $12 million on underwriting, which it will try to recover through rate increases, higher deductibles or tighter underwriting.",
        "Suppose, at the account level, a roofing contractor in Boise pays $50,000 a year for general liability and commercial auto. For example, over three years the account has earned $150,000 of premium and incurred $120,000 of losses, an 80% loss ratio. The underwriter compares that with the loss ratio the carrier needs on this class and proposes a significant increase. A similar contractor with $15,000 of losses over the same period has a 10% loss ratio and a strong case for a flat renewal or a credit. The figures are illustrative only.",
      ],
    },
    {
      heading: "How policyholders can use these numbers",
      paragraphs: ["Nobody needs to calculate an insurer's ratios to buy a policy, but the concepts are useful at renewal."],
      bullets: [
        "Business owners should request loss runs from their carrier each year and review them before renewal, since the account's loss ratio is the basis of the conversation with the underwriter.",
        "Closing out old claims and challenging reserves that look too high on an open claim can improve an account's loss ratio, because reserves count as incurred losses until the claim closes.",
        "Workers compensation policyholders see the same idea in the experience modification rate, and larger accounts may see it directly in retrospective rating plans and dividend programs.",
        "Homeowners and drivers facing a rate increase after a claim-free year can reasonably conclude it reflects the carrier's or the state's loss experience, and comparing carriers is often more productive than disputing the increase.",
        "When judging a carrier, a combined ratio over several years alongside its financial strength rating says more than a single year's figure.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Homeowner loss ratios in Arizona, Nevada, Utah and Idaho can swing sharply with a single wildfire season or a major hail event, which is why premiums in the region have at times risen even for households without claims. Auto loss ratios across all four states have been pushed up by higher repair costs for vehicles with sensors and cameras and by larger injury settlements. Rate filings, which explain the loss experience behind a requested change, are generally available for public review through each state's insurance regulator, and carriers must justify rate changes with that experience in the lines where filing is required. Health insurers are separately subject to federal medical loss ratio rules that set a minimum share of premium to be spent on care and require rebates when it is not met.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A carrier that raises rates after a bad industry year is not necessarily a carrier to leave; if its coverage, service and financial strength are sound and the increase is in line with the market, staying may be the right answer. A business with a strong loss ratio should use its loss runs to negotiate at renewal before assuming it needs to move, since a long clean history with one carrier has its own value. What deserves attention is an increase far above the market for a clean account, or loss runs showing reserves on claims that should have closed. We review loss runs and renewal terms with you, compare the market across the carriers we represent in Arizona, Nevada, Utah and Idaho, and if staying is the right call, we say so.",
      ],
    },
  ],
  relatedProducts: ["business-owners-policy", "workers-compensation-insurance", "commercial-auto-insurance", "home-insurance"],
  relatedArticles: ["how-insurance-actually-works-a-plain-english-guide", "reinsurance-vs-primary-insurance", "self-insured-retention-vs-deductible", "how-to-insure-a-new-business-in-its-first-year"],
  relatedTerms: ["loss-ratio", "combined-ratio", "underwriting-profit", "experience-modification-rate", "retrospective-rating-plan", "policyholder-surplus"],
};
