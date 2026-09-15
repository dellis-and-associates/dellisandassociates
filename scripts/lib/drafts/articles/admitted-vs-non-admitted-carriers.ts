import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Admitted vs non-admitted carriers",
  excerpt: "An admitted carrier is licensed by the state, files its rates and forms, and is backed by the guaranty fund. A non-admitted carrier writes what the licensed market declines, on its own forms, with no backstop. What each means at claim time, who ends up where, and how to read a surplus lines quote.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "When a house in a wildfire corridor, a contractor with two claims, or a vacant building cannot find a policy from the companies that advertise, the quote that eventually arrives is often from a carrier the household has never heard of, on a form that reads differently, with a tax line on the invoice. That carrier is non-admitted, and the policy is a surplus lines placement. The arrangement is legitimate, regulated and often the only route to coverage. It is also different in ways that matter, and a buyer should understand them before signing.",
        "The difference is not about size or solidity. Some of the largest and strongest insurers in the world write non-admitted business. The difference is about the regulatory contract between the carrier and the state, and about what stands behind the policy if the carrier fails.",
      ],
    },
    {
      heading: "What an admitted carrier is",
      paragraphs: [
        "An admitted carrier holds a certificate of authority from the state insurance department to sell a given line of insurance there. In exchange it files its policy forms and its rates with the department, which can review, approve or disapprove them, and it submits to the state's rules on cancellation and non-renewal notice, claims handling, and market conduct. Its policyholders can complain to the department and expect the department to act.",
        "Most importantly, an admitted carrier participates in the state guaranty association. If it becomes insolvent, the association pays covered claims up to a per-claim cap set by the state, funded by assessments on the other admitted carriers. That cap and the categories it covers vary by state and are the kind of figure that belongs in a statute rather than an article; the mechanism is that the policyholder of a failed admitted carrier does not stand in line with its other creditors for the whole claim.",
      ],
    },
    {
      heading: "What a non-admitted carrier is",
      paragraphs: [
        "A non-admitted carrier is not licensed in the state where the risk sits, though it is licensed and regulated somewhere, usually its home state or country, and it must be approved by the state as an eligible surplus lines insurer, which involves meeting capital and reporting requirements. It does not file rates or forms. It can write a risk at whatever price and on whatever wording it chooses, which is exactly why it can take on the risks the admitted market will not: it is free to charge for them and to draft exclusions around the parts it does not want.",
        "Its policyholders do not have the guaranty association behind them. If a non-admitted carrier fails, the claim is against the estate of the insolvent company, and the financial strength rating of the carrier is the only reassurance the buyer had going in. The placement must be made through a licensed surplus lines broker, who is responsible for confirming that the admitted market was tried first, collecting the surplus lines premium tax and any stamping fee, and attaching the state's required notice that the policy is not covered by the guaranty fund.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "Three things change hands when a risk moves from the admitted to the non-admitted market. Form protection: an admitted policy uses filed wording that the state has read and that courts in the state have interpreted; a non-admitted policy may be on a manuscript form with exclusions and conditions specific to that carrier, and the buyer has to read it rather than assume it matches a standard form. Rate protection: an admitted rate has passed a review for being excessive, inadequate or unfairly discriminatory; a non-admitted rate has passed no such review and is simply what the carrier will accept. Insolvency protection: the guaranty association stands behind one and not the other.",
        "In exchange, the non-admitted market offers availability and flexibility. It will write the home the admitted carriers refuse, the new business with no history, the contractor with claims, the event the standard forms exclude, and it will write them quickly, often on terms an admitted carrier could not file in time. For many risks it is not a downgrade but the only market that exists.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a homeowner in the foothills outside Flagstaff is non-renewed by an admitted carrier over wildfire exposure and receives two options. The first is an admitted carrier that will write the house at $4,200 a year with a $10,000 wildfire deductible and no other changes. The second is a non-admitted carrier at $3,400 plus a surplus lines tax and stamping fee that together bring the invoice to roughly $3,550, with a $5,000 all-perils deductible, but on a manuscript form that excludes water damage from any source other than fire suppression and caps other structures at a fraction of the standard amount. On premium the second looks better. On the exposures the household actually has, a well pump house and a detached workshop, the first is the better contract.",
        "Now suppose the admitted quote had not existed, which is the usual case for that address. The homeowner takes the non-admitted policy, and the right questions become the carrier's financial strength rating, the exact wording of the water and other structures provisions, and whether the broker will remarket the risk to the admitted side at each renewal. All figures are illustrative.",
      ],
    },
    {
      heading: "Who ends up in each market",
      paragraphs: ["The admitted market is the default for anyone it will accept. The surplus lines market fills these gaps."],
      bullets: [
        "Homes in high wildfire or brush exposure, homes with older roofs or knob-and-tube wiring, vacant homes, and homes with a recent liability or water claim history.",
        "Contractors with claims, roofing and demolition trades, and any business whose operations the standard forms exclude, such as certain amusement, security or cannabis-adjacent work.",
        "New businesses with no loss history, businesses that have been cancelled, and businesses with a single very large exposure the admitted market caps.",
        "Special events, short-term rentals in some markets, high-value or unusual property, and coastal or flood-adjacent risks outside our region.",
        "Excess and umbrella layers above admitted primary policies, where the admitted carrier will not go higher and a non-admitted excess carrier sits on top.",
      ],
    },
    {
      heading: "How to judge a surplus lines quote",
      paragraphs: [
        "Start with the carrier's financial strength rating and the rating agency's outlook; a non-admitted carrier with a weak rating is a different proposition from one with a strong one, because the rating is all that stands behind the promise. Read the form rather than the summary: look for the causes of loss wording, the water damage provisions, the definition of vacancy, any protective safeguard warranty that voids coverage if an alarm or sprinkler is not maintained, and the cancellation clause, which may allow the carrier to cancel on shorter notice than an admitted policy would. Confirm the deductible structure, since manuscript forms often use a percentage of the limit rather than a flat amount. And ask the broker whether the risk will be remarketed to the admitted side each year, because a house that was uninsurable there after a claim may be insurable again once the claim ages.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Wildfire is the main driver of surplus lines homeowners placements in northern Arizona, the Sierra front in Nevada, the Wasatch back and the foothill towns of Idaho, and the trend has been toward more homes in that market rather than fewer. Each of the four states operates its own guaranty association and its own surplus lines tax regime, collected through the broker and shown separately on the invoice; the rates and caps are state-specific and are better looked up on the state insurance department's site than quoted here. A buyer can verify whether a carrier is admitted, and whether a non-admitted one is on the state's eligible list, through the Arizona Department of Insurance and Financial Institutions at https://difi.az.gov/ or the Idaho Department of Insurance at https://doi.idaho.gov/ , and through the Nevada Division of Insurance and the Utah Insurance Department for those states.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "If you hold an admitted policy at a premium you can bear, do not move to a non-admitted carrier to save on the premium alone. The saving comes with the loss of the guaranty fund, filed forms and the state's cancellation rules, and that trade is only worth making when the admitted market has closed. Conversely, if you are on a surplus lines policy because that was all that was available, keep it in force and have it remarketed at each renewal; a lapse while waiting for a better market is worse than either option.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "If a non-renewal notice or a surplus lines quote has arrived, send it with the declarations page of the expiring policy. We check the admitted carriers we represent in Arizona, Nevada, Utah and Idaho first, and only if none will write the risk do we place it in the surplus lines market, with the form differences and the carrier's rating set out in writing. When the admitted policy you already hold is the sound choice, that is what we will tell you.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "contractors-insurance", "general-liability-insurance"],
  relatedArticles: ["surplus-lines-vs-standard-market-insurance", "how-to-get-coverage-after-a-non-renewal", "wildfire-insurance-preparedness-for-southwest-homeowners", "how-to-insure-a-vacant-home"],
  relatedTerms: ["admitted-carrier", "non-admitted-carrier", "surplus-lines", "surplus-lines-tax", "a-m-best-rating", "financial-strength-rating"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
