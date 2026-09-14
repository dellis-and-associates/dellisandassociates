import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Force-placed insurance",
  definition: [
    "Coverage a lender buys on a mortgaged home or financed car when the borrower's own policy lapses or cannot be verified, with the cost added to the loan. It exists to protect the lender's collateral, not the borrower, and it is priced accordingly.",
  ],
  inPractice: [
    "The trigger is almost always paperwork: a policy cancels for non-payment, a renewal is not sent to the mortgage servicer, or the servicer changes and the carrier is still mailing the old one. The lender sends notices, then buys a policy covering the structure only, usually at several times the ordinary premium, with no liability, no contents and no loss-of-use coverage. Auto lenders do the same when collision coverage lapses on a financed car. The fix is to reinstate or buy a proper policy and send proof; most lenders refund the overlapping period. Checking that the mortgagee clause on the declarations page names the current servicer prevents most of these.",
  ],
  example: [
    "Suppose a homeowner's policy cancels in March because a payment bounced. The servicer writes twice, then in June places its own coverage at $3,600 a year, charged to escrow, compared with the $1,200 the homeowner had been paying. Suppose the owner buys a new policy in August and sends proof; the servicer cancels its coverage and credits the months of overlap. Hypothetical figures.",
  ],
  relatedTerms: ["policy-lapse", "declarations-page", "grace-period"],
  relatedProducts: ["home-insurance"],
};
