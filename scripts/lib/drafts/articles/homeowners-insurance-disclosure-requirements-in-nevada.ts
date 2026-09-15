import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Homeowners insurance disclosure requirements in Nevada",
  excerpt: "The disclosures a Nevada homeowner meets at application, at purchase, at renewal and after a claim: loss history reports, insurance score notices, seller disclosures on flooding and fire, roof and valuation terms, and the notice rules for cancellation and non-renewal.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Most of what a carrier knows about a Nevada house arrives before the homeowner fills in a single field. Past claims, a credit-based insurance score, a wildfire model for the Tahoe basin or the Reno foothills, and a flood map for the Las Vegas valley are all pulled automatically. What protects the homeowner is a set of disclosure rules: some federal, some set by Nevada, some built into the real estate transaction. Each gives the homeowner a document to ask for and a point at which to push back.",
        "This article follows those disclosures through the life of a policy, from application to the day it ends. The regulator for all of it is the Nevada Division of Insurance, and where a rule turns on a specific number of days, the article describes the rule and leaves the figure to the division to confirm rather than guessing it.",
      ],
    },
    {
      heading: "At application: the reports behind the quote",
      paragraphs: [
        "Two reports shape a homeowners quote. The first is the loss history report, commonly called a CLUE report, which lists property claims tied to the applicant and to the address over a look-back period. The second is the credit-based insurance score, which Nevada permits carriers to use subject to limits on how it is weighed and how often the applicant can ask for it to be recalculated; the Nevada Division of Insurance can explain those limits.",
        "Both are consumer reports under the federal Fair Credit Reporting Act. You can get a free copy of each underlying file once a year, and if either one leads a carrier to charge more or decline, the carrier has to send an adverse action notice that names the reporting agency and explains how to dispute an error. A single wrongly attributed water claim or a stale collection account can change the quote, so the notice is worth acting on.",
      ],
    },
    {
      heading: "At purchase: what the seller has to say",
      paragraphs: [
        "Nevada requires sellers of most residential property to complete the Seller's Real Property Disclosure form before the buyer is committed; state law sets the timing and the sales that are exempt, and the listing agent can confirm both. The form asks about defects the seller knows of, including roof problems, water damage, drainage, soils and past repairs. A yes on any of those is also a question for the insurance quote, because the carrier's loss history report may show the same event as a paid claim.",
        "Flood information reaches a buyer through two other channels. A lender making a federally backed loan checks the FEMA flood map, and when the house is in a special flood hazard area it requires flood insurance and tells the buyer before closing. Outside the mapped zones, the Las Vegas valley's flash floods run through washes and channels that the Clark County Regional Flood Control District manages, and a lot beside one is a candidate for flood coverage even with no lender requirement. The homeowners policy covers none of it.",
        "Earthquake is the other exclusion Nevada buyers overlook. The Reno and Carson City areas sit in an active seismic zone, and the standard homeowners form excludes earth movement. An earthquake policy or endorsement is a separate purchase, and no disclosure form will prompt it.",
      ],
    },
    {
      heading: "At renewal: changes the carrier has to show",
      paragraphs: [
        "A renewal is a new contract on the carrier's current terms, and the changes are easy to miss in a thick envelope. A carrier that reduces coverage at renewal, for instance by adding a roof payment schedule, raising a wind or wildfire deductible, or lowering a sublimit, has to tell the policyholder in writing; the Nevada Division of Insurance can confirm the form and timing that notice must follow. Compare the list of forms on the new declarations page against the old one, line by line.",
        "Valuation is the other renewal item. Carriers raise the dwelling limit by an inflation factor, but the factor is an index, not an estimate of rebuilding this house in this market. Suppose a house in northwest Las Vegas is insured at $380,000 and a contractor's estimate for a like-for-like rebuild comes to $440,000. On a total loss, the policy pays up to $380,000 unless it carries extended replacement cost, and the $60,000 difference is the owner's. The figures are hypothetical; the habit of checking the limit against a real estimate every few renewals is not.",
      ],
    },
    {
      heading: "After a claim: the explanation of payment",
      paragraphs: [
        "A claim payment should come with a written breakdown: the estimate, the deductible, any depreciation withheld, and the limit or sublimit applied. On a replacement cost policy, carriers commonly pay the actual cash value first and release the withheld depreciation once the repair is done, within a time the policy states. Read that time limit on the day the first cheque arrives.",
        "If a claim is denied in whole or in part, ask for the denial in writing with the policy language it relies on. Nevada sets standards for how promptly carriers acknowledge, investigate and pay claims, and a carrier that cannot point to the clause it is applying has a problem the Division of Insurance will want to hear about.",
      ],
    },
    {
      heading: "When the policy ends: cancellation and non-renewal",
      paragraphs: [
        "A new policy can be cancelled for underwriting reasons during a short initial period, often after the carrier's inspection. Past that point, Nevada limits mid-term cancellation to stated reasons such as non-payment of premium, misrepresentation or a substantial change in the risk. The initial period, the permitted reasons and the notice required for each are set by Nevada law, and the Nevada Division of Insurance can confirm them.",
        "Nevada requires advance written notice before a carrier non-renews a homeowners policy; the notice itself states the date coverage ends, and the homeowner can ask for the specific reason. In wildfire areas around Lake Tahoe, Verdi, Galena and Mount Charleston, the reason is often an address-level fire score or an inspection finding. Ask for the finding in writing; clearance and hardening work can bring a house back to a carrier, and the written reason is what shows a new carrier the work was done.",
      ],
    },
    {
      heading: "A checklist of documents",
      paragraphs: ["Keep these together, digitally, for as long as you own the house."],
      bullets: [
        "The Seller's Real Property Disclosure form and the inspection report from the purchase.",
        "Your own loss history report and the one for the property.",
        "Every adverse action notice and the credit report it references.",
        "The lender's flood zone determination.",
        "Each year's declarations page with its list of forms and endorsements.",
        "Claim estimates, payment breakdowns and any denial letter.",
        "Any cancellation or non-renewal notice, with the envelope showing the mailing date.",
      ],
    },
    {
      heading: "Where to take a question",
      paragraphs: [
        "The Nevada Division of Insurance regulates carriers writing homeowners policies in the state and takes complaints about notices, claim handling and non-renewals. Before filing a complaint, send us the notice or the declarations page. We read it against the carriers we represent in Nevada, explain which disclosure applies and what it should have said, and quote alternatives if the house needs a new home. If the policy you have is the right one once the facts are straight, that is our recommendation. The analysis costs nothing.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "earthquake-insurance", "flood-insurance"],
  relatedArticles: ["how-to-get-coverage-after-a-non-renewal", "how-to-dispute-a-denied-insurance-claim", "insurance-checklist-for-first-time-homebuyers", "replacement-cost-vs-extended-replacement-cost", "homeowners-insurance-disclosure-requirements-in-arizona"],
  relatedTerms: ["declarations-page", "underwriting", "flood-zone", "sublimit", "replacement-cost"],
  relatedStates: ["nevada"],
};
