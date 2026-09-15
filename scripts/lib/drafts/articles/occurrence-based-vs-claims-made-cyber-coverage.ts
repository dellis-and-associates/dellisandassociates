import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Occurrence-based vs claims-made cyber coverage",
  excerpt: "Cyber policies are mostly written on a claims-made form, and the trigger decides which policy year pays for a breach discovered long after it began. How the triggers work, why the retroactive date matters more than the limit, a worked breach, and how to switch carriers safely.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Every liability policy has a trigger: the event that decides which policy, if any, responds to a loss. An occurrence form is triggered by when the harm happened. A claims-made form is triggered by when the claim is first made against you and reported to the carrier. For a slip on a wet floor the two produce the same answer, because the injury and the claim arrive together. For a data breach they can produce different answers, because an intrusion in one year may be discovered in the next and produce lawsuits and regulatory demands in the year after that.",
        "Cyber liability policies are overwhelmingly claims-made, for reasons that make sense from the carrier's side and that shift a real burden onto the buyer. Understanding the trigger is more important than the limit on a cyber policy, because a policy with a generous limit and the wrong trigger pays nothing for a breach that started before the retroactive date or surfaced after the policy ended.",
      ],
    },
    {
      heading: "Occurrence coverage: the year the harm happened pays",
      paragraphs: [
        "Under an occurrence form the policy in force when the injury or damage took place responds, no matter when the claim is made. A general liability policy bought for a single year continues to cover incidents from that year for as long as anyone can sue over them. The carrier takes on the long tail of claims arriving years later, and prices for it. The buyer never has to think about continuity: each year's policy stands on its own, and cancelling or switching carriers leaves past years intact.",
        "The difficulty for cyber is fixing when the harm occurred. An attacker who gained access in March, moved through the network for months, and extracted records in November created harm on dates that may never be established, and the resulting claims may not name a date at all. Occurrence-based cyber coverage exists, mainly as an endorsement to a package or a business owners policy, and where it does it tends to be narrow: some third-party liability, often no first-party breach response, and definitions that fix the occurrence to a discovery date rather than an intrusion date, which is a claims-made trigger wearing a different label.",
      ],
    },
    {
      heading: "Claims-made coverage: the year you are told about it pays",
      paragraphs: [
        "Under a claims-made form the policy in force when the claim is first made against you, and reported to the carrier within the policy period or a short window after it, responds. Most cyber forms extend that trigger to a discovery basis for first-party losses: the policy in force when you first discover the incident pays for the forensic investigation, notification, credit monitoring, ransom negotiation, business interruption and the rest. The carrier can close its books on each year once the reporting window shuts, which is what makes the coverage priceable for a fast-changing risk.",
        "Two clauses do the work. The retroactive date is the earliest date an incident may have happened for the policy to cover claims arising from it; anything that began before it is excluded however late the claim arrives. Full prior acts, meaning no retroactive date, is the strongest position and is usually offered only when continuous coverage can be shown. The extended reporting period, or tail, is an option to report claims for a set period after the policy ends, for incidents that happened before it ended; it is what protects you when the policy is cancelled or the business closes.",
      ],
    },
    {
      heading: "The mechanism that differs: who carries the gap between event and discovery",
      paragraphs: [
        "On an occurrence form the carrier that was on risk when the intrusion happened carries the time between event and claim, however long. On a claims-made form the buyer carries it, and manages it with three tools: a retroactive date that reaches back far enough, unbroken renewals so that each new policy inherits the old retroactive date, and a tail when coverage ends. Lose any of the three and there is a period in the past for which no policy will ever respond.",
        "The trade is that claims-made coverage is broader and better priced for cyber while it is continuously maintained. Carriers can offer meaningful first-party limits, breach response services and current definitions of computer fraud and social engineering because they are not underwriting incidents that may surface a decade out. The buyer's side of the bargain is discipline about the dates.",
      ],
    },
    {
      heading: "A worked breach",
      paragraphs: [
        "Suppose a medical billing firm in Reno buys its first cyber policy on the first of January of year one, with a retroactive date matching that day and a $1,000,000 limit. Unknown to the firm, an attacker had been inside its email since October of the prior year. In June of year two, now on the renewed policy, the firm discovers that patient records were taken and that the intrusion began the previous October. Say forensic and notification costs come to $180,000 and two patients sue for $250,000 in year three.",
        "On a claims-made and discovered form, the year-two policy is triggered by discovery, but the intrusion began before the retroactive date, so the carrier declines everything: the $180,000 of response costs and the later suits. Had the firm negotiated full prior acts at purchase, or a retroactive date a year earlier, the year-two policy would have paid the response costs and, if the suits were reported in time, the defence and any settlement, up to the $1,000,000 limit. Now suppose instead the firm had an occurrence-based endorsement in force from year one only, and let it lapse without a tail before the discovery: the endorsement would look back to when the harm occurred, find that the intrusion predates its inception, and also decline. The numbers are hypothetical. In both structures the loss fell into a gap before the first policy, which is why the first cyber policy a business buys should reach back as far as the carrier will allow.",
      ],
    },
    {
      heading: "Who each form suits",
      paragraphs: ["The form is mostly chosen for you by the market, but the buyer still decides how to hold it."],
      bullets: [
        "A business that stores, processes or bills against other people's data, that is, most businesses, needs a stand-alone claims-made cyber policy with first-party breach response, and needs to treat the retroactive date as part of the limit.",
        "A very small business with no customer data beyond names and invoices may be adequately served by an occurrence-based cyber endorsement on its package policy, provided it reads what the endorsement excludes, and most exclude ransomware and funds transfer fraud.",
        "A business that expects to close, sell or merge should budget for a tail on its claims-made policy, since the buyer of the business will usually want the seller's incidents kept on the seller's policy.",
        "A business changing carriers should insist the new carrier honour the old retroactive date, in writing, before the old policy expires; a new retroactive date is a new gap.",
      ],
    },
    {
      heading: "The decision rule, and the switching rule",
      paragraphs: [
        "Where both forms are genuinely offered, prefer the one whose first-party breach response is broadest and whose exclusions for ransomware, social engineering and regulatory fines are fewest; in practice that is the claims-made stand-alone form. Then manage it: never let it lapse, match the retroactive date on every renewal or replacement, and buy the tail if coverage ends for any reason other than replacement. When you switch carriers, the sequence is the same as for any policy, new coverage bound before old coverage ends, with one addition: the new declarations page must show a retroactive date no later than the old one.",
        "State breach notification laws in Arizona, Nevada, Utah and Idaho set deadlines and content requirements for telling affected people and, in some cases, the attorney general; a cyber policy's breach coach handles that under the first-party coverage, but only for an incident the policy is triggered for. The deadline itself is {{TODO:statute.arizona.breachNotificationDeadline}} in Arizona and varies in the other three states.",
      ],
    },
    {
      heading: "When the answer is to keep what you have",
      paragraphs: [
        "If you hold a claims-made cyber policy with full prior acts or a retroactive date that predates your first customer record, and it has renewed without a break, you hold the right structure; the question at renewal is the limit and the sublimits, not the form. Moving to a different carrier for a lower premium risks the retroactive date and is rarely worth it unless the new carrier matches it in writing. We compare the trigger, the retroactive date, the reporting window and the first-party sublimits across the cyber markets we can access in the four states, and if your current form is sound, we say so and the renewal proceeds as it is.",
      ],
    },
  ],
  relatedProducts: ["cyber-liability-insurance", "professional-liability-eo-insurance", "business-owners-policy"],
  relatedArticles: ["claims-made-vs-occurrence-policies", "first-party-vs-third-party-cyber-coverage", "cyber-liability-insurance-explained-a-beginner-s-guide", "how-to-respond-to-a-cyber-incident-as-a-small-business"],
  relatedTerms: ["claims-made-policy", "occurrence-policy", "retroactive-date", "tail-coverage", "extended-reporting-period", "data-breach-coverage"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
