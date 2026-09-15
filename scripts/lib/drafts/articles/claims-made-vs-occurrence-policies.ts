import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Claims-made vs occurrence policies",
  excerpt: "An occurrence policy covers an incident that happens during the policy period, whenever the claim arrives. A claims-made policy covers a claim first made during the period, for work back to a retroactive date. How the trigger changes what you owe when you switch carriers or retire.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Liability policies have to decide which policy responds when the thing that caused a claim and the claim itself happen years apart. A contractor's framing fails eight years after the job. An accountant's tax position is challenged three filings later. A patient discovers a missed diagnosis long after the visit. The policy in force when the work was done and the policy in force when the letter from the lawyer arrives are often different policies, from different carriers, with different limits. The trigger clause says which one pays.",
        "General liability is almost always written on an occurrence trigger. Professional liability, directors and officers, employment practices, cyber and most pollution coverage are almost always written claims-made. Buyers rarely choose between them for a given line, but they do have to understand the one they hold, because the claims-made trigger carries obligations that only become visible when a policy ends.",
      ],
    },
    {
      heading: "How an occurrence policy works",
      paragraphs: [
        "An occurrence policy covers bodily injury or property damage that occurs during the policy period, regardless of when the claim is made. If the injury happened in a year the policy was in force, that policy responds, even if the claim is filed a decade later and the carrier has long since been replaced. Each annual policy stands on its own as a permanent promise about its own twelve months, and a business that has carried occurrence coverage for twenty years holds twenty separate policies each still on the hook for its year.",
        "The premium reflects that permanence. The carrier is pricing not only the claims it expects during the year but the ones that will trickle in for years afterwards, which is why occurrence forms cost more than claims-made forms for an equivalent limit and why carriers avoid the occurrence trigger for lines where the delay between act and claim is long and unpredictable.",
      ],
    },
    {
      heading: "How a claims-made policy works",
      paragraphs: [
        "A claims-made policy covers a claim that is first made against the insured and reported to the carrier during the policy period, provided the act that gave rise to it happened on or after a retroactive date stated in the declarations. Two dates therefore bound the coverage: the retroactive date at the back and the expiration date at the front. Work done before the retroactive date is never covered, however late the claim arrives. A claim made after expiration is not covered by that policy at all, however long ago the work was done, unless a renewal or an extended reporting period picks it up.",
        "In practice a business keeps the same retroactive date from year to year as it renews, so that each new policy covers all prior work back to the day it first bought coverage. The current policy is the only one that matters at any moment; the expired ones have no further obligation. That is what makes claims-made coverage cheaper in the early years and what makes leaving it complicated.",
      ],
    },
    {
      heading: "The mechanism that actually differs: what happens when the policy ends",
      paragraphs: [
        "Under an occurrence trigger, cancelling or not renewing costs nothing in terms of past exposure. The old policies remain liable for their years. Under a claims-made trigger, the moment the policy expires without renewal, every claim not yet made is uncovered, including claims arising from work fully insured while the policy was in force. Closing a practice, retiring, switching carriers, or merging a business all create that moment.",
        "The cure is an extended reporting period, usually called tail coverage: an endorsement that keeps the expired policy open to receive claims for a set number of years or indefinitely, for work done between the retroactive date and expiration. It is bought once, at a premium expressed as a multiple of the expiring annual premium, and it must be requested within a short window after expiration stated in the policy. Alternatively, a new carrier can agree to honour the old retroactive date, in which case prior acts coverage continues under the new policy and no tail is needed. A new carrier that resets the retroactive date to the inception of its own policy leaves every prior year exposed, and that gap is invisible on the declarations page unless you know to look for the date.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose an engineering consultant in Salt Lake City has held claims-made professional liability since starting the firm on the first of March six years ago, with that date carried forward as the retroactive date on every renewal, and now pays $6,000 a year for a $1,000,000 limit. In year seven she moves to a new carrier that charges $5,200 but sets the retroactive date to its own inception. Nine months later a client sues over a design delivered in year four. The new policy denies because the design predates its retroactive date. The old policy expired without a tail and has no obligation. The consultant is uninsured for a claim that would have been fully covered had the new carrier matched the original date or had she bought a tail.",
        "Suppose instead she had insisted on full prior acts and the new carrier had agreed at $5,800. The claim is covered. Or say she retires at the end of year seven and buys an unlimited tail at twice the expiring premium, $12,000 paid once; every claim from her six years of work is then covered for as long as the claims keep arriving. The tail looks expensive in the month it is bought and cheap the first time a former client's lawyer writes. All figures are illustrative.",
      ],
    },
    {
      heading: "Who each trigger suits",
      paragraphs: ["The market has largely decided this by line, but the reasoning is worth knowing."],
      bullets: [
        "Occurrence fits exposures where injury is usually discovered promptly and the business wants each year's policy to stand permanently: general liability, contractors, products, premises.",
        "Claims-made fits exposures with a long or unpredictable delay between act and claim, where an occurrence trigger would be unaffordable or unavailable: professional liability, medical malpractice, directors and officers, employment practices, cyber.",
        "Where a line is available on both triggers, occurrence is worth the higher premium for a business that expects to change carriers, close or sell within a few years, because it never needs a tail.",
        "Claims-made suits a stable practice that intends to renew continuously for decades and will budget for the tail at the end, treating it as a retirement cost.",
        "Contractors should note that a claims-made general liability form, which some non-admitted carriers offer, is unusual and creates exactly the tail problem at every carrier change; an occurrence form is worth insisting on for that line.",
      ],
    },
    {
      heading: "What to check on a claims-made policy",
      paragraphs: [
        "Read the retroactive date on the declarations page every renewal and confirm it has not moved. Confirm whether the form is claims-made or claims-made-and-reported, because the latter also requires the claim to be reported within the period, which matters when a claim arrives in the last week. Find the automatic extended reporting period, usually a short window after expiration, and the optional one you can buy, and note the deadline for electing it. Check whether the policy allows you to report a circumstance, a situation that could become a claim, during the period so that it is locked into that policy even if the claim itself arrives later. And when quoting a replacement, ask in writing whether the new carrier will provide full prior acts back to the original retroactive date.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A claims-made policy with a long-established retroactive date is an asset, and the years of prior acts it carries are worth more than a modest premium saving from a carrier that will not match the date. Unless the new carrier honours full prior acts, staying put is usually the right call, and a tail from the old carrier plus a new policy with a fresh date is almost always more expensive than either alone. On the occurrence side, there is rarely a reason to disturb a stable policy for the trigger alone; the decision to move is about premium, limits and carrier strength, and no tail is needed either way.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Send us the declarations page of any liability policy and we will identify the trigger, find the retroactive date and the reporting provisions, and set out what leaving the policy would cost in tail premium. For a professional planning to retire or sell, we can price the tail against continuing the policy. We quote across the carriers we represent in Arizona, Nevada, Utah and Idaho, and if the retroactive date you hold is the reason to stay with your current carrier, we will say exactly that.",
      ],
    },
  ],
  relatedProducts: ["professional-liability-eo-insurance", "general-liability-insurance", "cyber-liability-insurance"],
  relatedArticles: ["occurrence-based-vs-claims-made-cyber-coverage", "professional-liability-e-o-insurance-explained-a-beginner-s-guide", "general-liability-vs-professional-liability", "how-to-cancel-an-insurance-policy-the-right-way"],
  relatedTerms: ["claims-made-policy", "occurrence-policy", "retroactive-date", "tail-coverage", "extended-reporting-period", "prior-acts-coverage"],
};
