import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Reinsurance vs primary insurance",
  excerpt: "A primary insurer sells your policy and pays your claim; a reinsurer insures the insurer against large or accumulated losses. How the layers connect, why you never deal with a reinsurer but still pay for one, and how reinsurance costs shape home premiums in the region.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Every policy a household or business buys is issued by a primary insurer. That company collects the premium, sets the deductible, sends the adjuster and pays the claim. What the policyholder does not see is that the primary insurer has usually passed part of the risk on to other companies, called reinsurers, under contracts of its own.",
        "Reinsurance is insurance for insurance companies. It is invisible on a declarations page, but it explains a good deal about the market: why premiums in wildfire and hail areas rise even for houses that never file a claim, why a carrier stops writing new homes in a county, and why a carrier can pay thousands of claims after a single catastrophe without failing.",
      ],
    },
    {
      heading: "What a primary insurer does",
      paragraphs: [
        "The primary insurer holds the direct contract with the policyholder. It underwrites the risk, prices it under its filed rates or, in the surplus lines market, its own rates, issues the policy and handles claims. It is also the company regulators watch most closely, requiring it to maintain capital and surplus in proportion to the business it writes.",
        "A primary insurer's capital is finite. A company that insures many homes in one region is exposed to a single event, such as a wildfire, a hailstorm across a metro area or an earthquake, damaging a large number of them at once. Without some way to limit that exposure, it would have to write far less business, hold far more capital or accept the risk of insolvency.",
      ],
    },
    {
      heading: "What a reinsurer does",
      paragraphs: [
        "A reinsurer agrees to pay part of the primary insurer's losses in exchange for part of its premium. The primary insurer is called the ceding company. The reinsurer may in turn buy its own protection, called retrocession, and some catastrophe risk is transferred to capital markets investors through catastrophe bonds. Reinsurance contracts come in two main shapes.",
      ],
      bullets: [
        "Treaty reinsurance covers an entire class of business, such as all homeowner policies in a set of states, automatically under one agreement.",
        "Facultative reinsurance is negotiated for a single large or unusual risk, such as one high-value commercial building, that falls outside the treaty.",
        "Proportional arrangements, such as quota share, split premiums and losses between the insurer and reinsurer in a fixed ratio.",
        "Non-proportional arrangements, such as per-risk or catastrophe excess of loss, pay only the part of a loss or an event above a retention the insurer keeps, up to a limit.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "The key difference is who has a contract with whom. The policyholder's contract is only with the primary insurer, and reinsurance generally does not give the policyholder any right to claim against the reinsurer. If a reinsurer fails to pay, the primary insurer still owes the claim in full. That is why a policyholder's security depends on the primary insurer's financial strength, and why ratings agencies and regulators examine the quality of each insurer's reinsurance when judging that strength.",
        "The second difference is what is being priced. A primary insurer prices individual houses, cars and businesses. A reinsurer prices portfolios and events, using catastrophe models that estimate how much an insurer's whole book in a region could lose in a severe year. When those models or the reinsurer's own losses change, the cost of reinsurance changes, and the primary insurer passes that cost into its rates and its willingness to write business in exposed areas.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a regional insurer writes homeowner policies in Arizona and Utah and buys two layers of reinsurance: a quota share that cedes 40% of premiums and losses, and a catastrophe excess of loss layer that pays up to $150 million of the insurer's retained losses from a single event above a $50 million retention. A wildfire season produces one event causing $200 million of claims. The quota share reinsurer pays 40%, or $80 million, leaving the insurer $120 million. The catastrophe layer pays the $70 million above the $50 million retention, and the insurer's net loss is $50 million. A policyholder whose house was destroyed is paid by the primary insurer throughout, and never hears of either reinsurer.",
        "Now suppose at the next renewal, after heavy losses across the western United States, the catastrophe reinsurer raises the price of that layer from $12 million to $18 million, or raises the retention to $75 million. For example, the insurer might respond by filing for higher homeowner rates, raising wildfire deductibles, tightening underwriting in high-fuel areas or pausing new business in some counties. None of that reflects anything about an individual house. The figures are illustrative only.",
      ],
    },
    {
      heading: "What it means for policyholders",
      paragraphs: ["Reinsurance is never something a household or small business buys, but understanding it helps in reading the market."],
      bullets: [
        "A rate increase or non-renewal driven by an insurer's reinsurance costs is a market decision, not a judgement on the property, and shopping other carriers is often the right response.",
        "A carrier's financial strength rating reflects, among other things, the quality of its reinsurance, which is worth checking for any insurer, admitted or surplus lines.",
        "Regional and smaller insurers tend to rely more heavily on reinsurance than national ones, which can make them more sensitive to reinsurance market swings, and also more flexible in some local markets.",
        "Large commercial risks, such as warehouses, hospitals and manufacturing plants, are often insured with facultative reinsurance behind the primary policy, which affects how quickly a carrier can offer high limits.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Catastrophe models used by reinsurers treat wildfire as a major peril across the forested and interface areas of Arizona, Nevada, Utah and Idaho, hail as a significant peril along the Wasatch Front, in the Treasure Valley and in Arizona's monsoon storms, and earthquake as a peril along the Wasatch Fault and in western Nevada. Changes in how those models see the region have been a real driver of homeowner premiums and of carriers limiting new business in some mountain and foothill communities. Each state's insurance regulator oversees the solvency of the primary insurers it licenses, including how much credit they may take for reinsurance.",
        "Regional and mutual carriers with most of their business concentrated in these four states face a particular version of the problem. A national insurer can spread a bad wildfire year across premium earned in dozens of other states; a carrier writing mainly in the Intermountain West has to buy that diversification from reinsurers. That is part of why coverage availability in a mountain community can change quickly at a July or January reinsurance renewal, and why the carriers still writing there may ask for more mitigation, higher deductibles or a new roof before they will quote.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A household or business with a financially strong carrier, a fair renewal price and coverage that fits its needs should generally stay put; a rate increase that reflects market-wide reinsurance costs will usually appear with other carriers too. A policyholder facing a non-renewal or a sharp increase tied to a carrier's exposure strategy has more reason to look, because another carrier's reinsurance program and appetite for the area may differ. We compare coverage and price across the carriers we represent in Arizona, Nevada, Utah and Idaho, explain what is driving a renewal change where it can be known, and if the current carrier is still the right one, we tell you so.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "earthquake-insurance", "business-owners-policy"],
  relatedArticles: ["primary-vs-excess-insurance", "how-insurance-actually-works-a-plain-english-guide", "how-to-get-coverage-after-a-non-renewal", "wildfire-insurance-preparedness-for-southwest-homeowners", "admitted-vs-non-admitted-carriers"],
  relatedTerms: ["reinsurance", "reinsurance-treaty", "facultative-reinsurance", "quota-share-reinsurance", "excess-of-loss-reinsurance", "catastrophe-bond"],
};
