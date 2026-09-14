import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to switch insurance companies without a coverage lapse",
  excerpt: "Moving a policy to a new carrier is safe when the new one starts before the old one ends and the cancellation is done in writing, in that order. The steps for auto and home, what to check at each, the lender and state-verification details that trip people up, and a worked example of the dates.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A lapse is any period, even a day, in which a policy is not in force. For an auto policy it is recorded by the state's insurance verification system and shows up on every future quote as a gap in continuous coverage, which carriers rate as a higher risk for years. For a home policy it means a mortgage lender buying expensive coverage on your behalf and a loss during the gap that nobody pays. Neither happens because the new carrier was slow; they happen because the old policy was cancelled before the new one was bound, or because nobody cancelled the old one at all and two premiums ran until the second bill arrived.",
        "The sequence below avoids both. It is written for a personal auto or home policy but the logic holds for renters, umbrella and most other lines: bind the new policy with a start date on or before the old one's end date, confirm it is in force, and only then cancel the old policy effective the same date, in writing. Everything else in this guide is detail around those three steps.",
      ],
    },
    {
      heading: "What to gather before you start",
      paragraphs: ["The new carrier needs the same facts the old one has, and the quote is only comparable if it is built on them."],
      bullets: [
        "The current declarations page for each policy you are moving, with limits, deductibles, endorsements and the policy period.",
        "The renewal offer, if one has arrived, so you know the date the current period ends and what the old carrier wants for the next one.",
        "Driver licence numbers and dates of birth for every household driver, and the vehicle identification numbers.",
        "For a home: the year built, roof age, square footage, any updates to wiring, plumbing and heating, and the mortgage lender's name and loan number.",
        "The claims history for the past several years; the new carrier will pull it and a mismatch with what you said delays the binding.",
        "Any proof of continuous coverage the old carrier can give you, usually a letter or the declarations pages, in case a future carrier asks.",
      ],
    },
    {
      heading: "Step one: compare on identical terms",
      paragraphs: [
        "Ask the new carrier to quote the coverage you have now, line for line, before asking for anything different. A quote that is lower because it dropped the uninsured motorist limit or moved contents to actual cash value is not a saving. Once the identical quote is in hand, ask for the changes you actually want, such as a higher liability limit or a different deductible, as a second figure. Both should be in writing, with the effective date on them.",
        "Check what the switch itself will cost. Cancelling an annual policy mid-term can carry a short-rate penalty, where the refund is less than the unused premium; cancelling at renewal usually carries none. A multi-policy discount on a policy you are not moving may end when its partner leaves. A claims-free or loyalty discount earned over years does not transfer. The comparison is the new premium against the old premium plus those losses, not the headline figures alone.",
      ],
    },
    {
      heading: "Step two: pick the dates",
      paragraphs: [
        "The cleanest switch happens at renewal: the new policy starts on the day the old period ends, at the same time of day, and the old policy simply does not renew. If you are switching mid-term, choose a date a few days out, long enough for the new carrier to complete underwriting and issue the policy, and use the same date for the new start and the old cancellation. Policies begin and end at a stated time, commonly a minute after midnight, and both carriers should be told the date rather than left to assume it.",
        "A one-day overlap is harmless; the two carriers sort out which pays if a loss happens in it, and the unused day is refunded. A one-day gap is a lapse. If in doubt, start the new policy a day early.",
      ],
    },
    {
      heading: "Step three: bind the new policy and confirm it is in force",
      paragraphs: [
        "Binding is the carrier's agreement to cover you from the effective date; it happens when the application is accepted and the first payment is made, and the carrier issues a binder or the policy itself. A quote is not a binder. Until you have a policy number, a declarations page or a binder with the effective date on it, nothing has started. Ask for the document and read the date and the vehicles or property on it before doing anything to the old policy.",
        "For an auto policy in Arizona, Nevada, Utah or Idaho, the new carrier reports the policy to the state's verification system electronically. The report can take days to appear, and a registration renewal that falls in that window can be flagged. Keep the new ID card in the car and the binder in your files. For a home policy with a mortgage, the new carrier needs the lender's name and loan number to issue the mortgagee clause, and the lender's insurance department needs the new declarations page; the escrow account will pay the new carrier only once the lender has it.",
      ],
    },
    {
      heading: "Step four: cancel the old policy in writing",
      paragraphs: [
        "Carriers require a cancellation request from the named insured, and most want it signed, whether on their form, by email or through an agent. Give the effective date, the policy number and a request for the unused premium to be refunded. Do not stop paying and let it lapse for non-payment; that is recorded differently from a voluntary cancellation and is the worst kind of gap on the record. Ask for written confirmation of the cancellation and the refund amount, and keep it with the new binder.",
        "If the old policy was paid through escrow, tell the lender the old carrier is refunding a premium; the refund goes to whoever paid it, and a refund cheque that lands in your account while the escrow is short is the lender's money. If the old policy was on automatic payment, cancel the authorisation after the confirmation arrives, not before, so the last instalment due before the cancellation date is paid.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: ["The pattern in almost every lapse is one of the following."],
      bullets: [
        "Cancelling the old policy on the strength of a quote, before the new carrier has issued a binder.",
        "Assuming the old policy will cancel itself when the new one starts. It will not; it renews and bills.",
        "Setting the new start date a day after the old end date because the dates on the paperwork looked adjacent.",
        "Forgetting a second vehicle, a trailer or an umbrella that was attached to the old policy and is now uninsured.",
        "Switching the auto policy without telling the umbrella carrier; the umbrella requires underlying limits it can verify, and a new carrier it has not been told about is a gap in the umbrella's eyes.",
        "Not telling the lender, so the escrow pays the old carrier's renewal and the new carrier cancels for non-payment.",
        "Moving to a carrier that asks for a home inspection and then fails the inspection after the old policy is gone. Ask what the new carrier will inspect and whether the binder is conditional.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a household in Sandy has an auto policy renewing on the first of June and a home policy renewing on the fifteenth of August, and wants to move both to one carrier for a multi-policy discount. Say the new carrier quotes the auto at $1,400 against a renewal offer of $1,750 on identical limits, and the home at $1,600 against $1,900. They bind the auto with the new carrier effective the first of June, receive the binder on the twentieth of May, and confirm to the old carrier in writing that the policy is not to renew. The home is trickier: moving it on the first of June would cost a short-rate penalty of around $120 on the old policy, so they bind the new home policy effective the fifteenth of August, and the new carrier holds the multi-policy discount on the auto from June on the promise of the home in August. On the fourteenth of August the lender has the new declarations page and the mortgagee clause; the old home policy is sent a written non-renewal. No day is uncovered and no premium is paid twice. The figures are illustrative.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "If you are considering a move, send the declarations pages and the renewal offers, and we quote the identical coverage across the carriers we represent in Arizona, Nevada, Utah and Idaho, count the discounts that would be lost, and if the move is worth it, handle the binder, the lender notice and the written cancellation so the dates line up. If the renewal offer is already the better deal once the lost discounts are counted, we say so and the policy stays where it is.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "home-insurance", "umbrella-insurance"],
  relatedArticles: ["how-to-cancel-an-insurance-policy-the-right-way", "bundling-vs-separate-auto-home-policies", "annual-vs-six-month-auto-insurance-policies", "how-to-get-coverage-after-a-non-renewal", "independent-agent-vs-captive-agent"],
  relatedTerms: ["policy-lapse", "binder", "declarations-page", "grace-period", "multi-policy-discount"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
