import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How insurance actually works: a plain English guide",
  excerpt: "Insurance is a pool, a contract and a set of numbers that decide what comes out of the pool. How premiums are set from expected losses, why deductibles and limits exist, what the insuring agreement and exclusions actually do, how a claim is adjusted, and where an independent agent sits.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Insurance is a way of turning a large, unpredictable loss into a small, predictable payment. A group of people who each face some chance of a bad year put money into a pool, and the pool pays whichever of them the bad year happens to. The carrier runs the pool: it estimates how much will be paid out, collects enough to cover that plus its costs, invests the money in the meantime, and writes the contract that says exactly who gets paid, for what, and how much.",
        "Everything else in the business follows from that. The premium is your share of the expected losses. The deductible is the part of a loss you keep so that the pool is not spent on small claims. The limit is the most the pool will pay for you. The exclusions are the losses the pool was never priced to carry. This guide walks through each of those in plain terms, then follows a claim from the phone call to the cheque, and ends with what an independent agent does in the middle of it.",
      ],
    },
    {
      heading: "The premium: your share of the expected losses",
      paragraphs: [
        "A carrier prices a policy by estimating, for a person or a property with your characteristics, how likely a loss is and how large it would be. That estimate is the expected loss. To it the carrier adds the cost of running the business, a margin for the years when losses run worse than expected, and the cost of reinsurance, which is the insurance the carrier buys on itself against a catastrophe. From the total it subtracts the investment income it expects to earn on premiums it holds before paying claims. The result is your premium.",
        "Suppose a carrier insures ten thousand houses of a similar kind and expects, over a year, that losses across them will total $20,000,000. Spread evenly that is $2,000 of expected loss per house. Add a share of expenses and margin and the premium might be $2,600. A house with a newer roof, a monitored alarm and no claims history is expected to cost the pool less, so it pays less; a house at the end of a dirt road far from a fire station is expected to cost more, so it pays more. Those numbers are made up, but the logic is the whole of underwriting: the premium is a prediction about you, and the things you can change are the things that change the prediction.",
        "Two things follow. A discount is not a gift; it is the carrier's recognition that a feature lowers the expected loss. And a rate increase after a claim is not a punishment; it is the carrier updating its prediction with the fact that you had a loss.",
      ],
    },
    {
      heading: "Deductibles and limits: the two numbers that shape every claim",
      paragraphs: [
        "A deductible is the amount of a covered loss you pay before the carrier pays anything. It exists for two reasons: small claims cost more to handle than they are worth, and a person who keeps some of each loss has a reason to prevent it. Raising the deductible lowers the premium because it removes the small claims from the pool and, at the margin, some of the medium ones. The right deductible is the largest amount you could pay from savings without borrowing, and no larger; a deductible you cannot afford means a covered loss you cannot afford to claim.",
        "A limit is the most the carrier will pay for a loss, a category of loss, or a policy year. Property policies carry a limit per building and per category of contents; liability policies carry a limit per occurrence and, often, an aggregate for the year. Sublimits carve out smaller amounts inside the main limit for things like jewellery, cash or mould. The limit is your decision and it is the number most often wrong, because it was set once and the house, the business or the income grew. Underinsuring a house does not simply mean a smaller cheque on a total loss; on many forms a coinsurance clause also reduces the payment on a partial loss in proportion to the shortfall.",
      ],
    },
    {
      heading: "The contract: insuring agreement, definitions, exclusions, conditions",
      paragraphs: ["A policy is read in a fixed order, and knowing the order is most of reading it."],
      bullets: [
        "The declarations page lists who is insured, what is insured, for how much, for what period, and at what premium. It is the only page most people ever see and it is where the limits and deductibles live.",
        "The insuring agreement is the carrier's promise: we will pay for direct physical loss to the property described, or we will pay sums the insured becomes legally obligated to pay because of bodily injury or property damage. Everything the policy does starts here, and nothing outside it is covered no matter how sympathetic.",
        "The definitions narrow the ordinary words. Who counts as an insured, what a residence premises is, what an occurrence means. A claim often turns on a definition rather than an exclusion.",
        "The exclusions remove losses from the promise: flood, earthquake, wear and tear, intentional acts, business pursuits, nuclear events, war. Each is there because the pool was not priced for it, and several can be bought back by endorsement for an extra premium.",
        "The conditions are your side of the bargain: pay the premium, report a loss promptly, protect the property from further damage, cooperate with the investigation, not misrepresent anything. A breached condition can void a claim on a loss that was otherwise covered.",
        "Endorsements change any of the above. They are the pages at the back that add, remove or amend, and a policy is read with its endorsements or not at all.",
      ],
    },
    {
      heading: "Named perils, open perils and the burden of proof",
      paragraphs: [
        "Property policies come in two shapes. A named-peril policy lists the causes of loss it covers, fire, lightning, wind, hail, theft and so on, and if the cause is not on the list, the loss is not covered; the burden is on you to show the loss came from a listed peril. An open-peril policy covers every cause of loss except those it specifically excludes; the burden is on the carrier to show an exclusion applies. Open peril is broader and costs more. The distinction matters most on the odd loss, a collapsed shelf, a spilled paint can, a stolen heirloom with no sign of entry, where the question is who has to prove what.",
      ],
    },
    {
      heading: "First party and third party: who the policy pays",
      paragraphs: [
        "A first-party coverage pays you for your own loss: your car, your house, your stock, your medical bills. A third-party coverage pays someone else for a loss you caused, and it pays your lawyer to argue that you did not. Liability insurance is third-party coverage, and its most valuable feature is the duty to defend: the carrier pays the defence costs, on most personal and many commercial forms in addition to the limit, from the first allegation, whether or not the claim has merit. A single policy usually contains both kinds: an auto policy pays to fix your car under collision, a first-party part, and pays the other driver under liability, a third-party part. Which part is responding decides who the adjuster is working for.",
      ],
    },
    {
      heading: "How a claim is adjusted",
      paragraphs: [
        "A claim begins with a report to the carrier, which assigns an adjuster. The adjuster's job is to establish three things in order: whether the loss is covered under the insuring agreement and not removed by an exclusion or a breached condition, what the loss is worth under the policy's valuation terms, and what the policy pays after the deductible and within the limit. For a property claim, valuation means actual cash value, which is replacement cost less depreciation, or replacement cost, which pays the full cost of new once the repair is done; the difference between the two on a fifteen-year-old roof is the commonest surprise in a home claim. For a liability claim, the adjuster investigates fault, negotiates with the other side, and hires defence counsel if a suit is filed. If you and the carrier disagree on the value of a property loss, most policies contain an appraisal clause that sends the dispute to two appraisers and an umpire rather than to court.",
        "Suppose a kitchen fire causes $40,000 of damage to a house insured at replacement cost with a $2,000 deductible. The adjuster confirms fire is a covered peril, finds no exclusion or breached condition, and values the repair. The carrier pays actual cash value, say $30,000 after depreciation of the cabinets and flooring, less the $2,000 deductible, and holds the remaining $10,000 until the repairs are completed and invoiced, at which point it releases it. Made-up figures; the two-stage payment is how replacement cost works on most forms, and it is why a claim that ends at the first cheque was probably paid short.",
      ],
    },
    {
      heading: "Why an independent agent sits where they sit",
      paragraphs: [
        "A carrier's own agent sells that carrier's policies. An independent agent holds appointments with several carriers and places a client with whichever one fits, and is paid a commission by the carrier that writes the policy, so the client pays nothing for the advice. The value of that position is the comparison: the same house, the same driver or the same business will be priced and underwritten differently by different carriers, and only someone holding several pens can see the difference. The obligation that comes with it is to say when the policy a client already holds is the right one, because the comparison sometimes shows that. State insurance departments in Arizona, Nevada, Utah and Idaho license agents, regulate the carriers they represent, approve the policy forms and rates used in the state, and take complaints from consumers about claims; the department is the place to verify a licence and, if a claim is handled badly, the place to say so.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Take every policy you hold and find four numbers on each declarations page: the limit, the deductible, the valuation basis, and the premium. Then find the exclusions and the endorsements. If the limits still match what the house, the car, the business and the income are worth, the deductibles are amounts you could pay tomorrow, and the exclusions are ones you have deliberately accepted, the policy is doing its job and the advice is to renew it. If any of the four has drifted, that is where a review starts. We do that review at no charge, across the carriers we represent, and the answer is as often keep what you have as change it.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "auto-insurance", "renters-insurance", "umbrella-insurance", "life-insurance"],
  relatedArticles: ["how-to-choose-the-right-deductible", "independent-agent-vs-captive-agent", "named-perils-vs-open-perils-policies", "actual-cash-value-vs-replacement-cost-coverage", "how-to-read-your-auto-insurance-declarations-page", "how-to-dispute-a-denied-insurance-claim"],
  relatedTerms: ["premium", "deductible", "declarations-page", "exclusion", "adjuster", "appraisal-clause", "underwriting"],
};
