import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Self-insured retention vs deductible",
  excerpt: "Both make the insured pay the first part of a loss, but a deductible is subtracted from a claim the carrier handles, while a retention must be paid before the carrier is involved at all. Who handles the claim, who pays defence costs, how limits are affected, and a worked example.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A deductible and a self-insured retention look identical on a quote: a figure the insured pays before the carrier pays. On a personal auto or home policy the two words are used loosely and the difference rarely matters. On a commercial liability policy, an umbrella, or a professional liability form, the difference is structural. It decides who adjusts the claim, who hires the lawyer, whether defence costs count toward the figure, and whether the policy limit is reduced by what you paid.",
        "This matters most to business owners quoted a large retention in exchange for a lower premium, and to anyone buying a personal or commercial umbrella whose drop-down coverage is written over a retention. The two devices shift money the same way and responsibility very differently, and the cheaper-looking option often carries administrative obligations the buyer did not price.",
      ],
    },
    {
      heading: "A deductible: the carrier pays, then collects from you",
      paragraphs: [
        "Under a deductible the carrier is on the claim from the first notice. Its adjuster investigates, its lawyers defend, and it pays the claimant the full settlement. It then recovers the deductible from you, either by billing you after the loss or, on a property claim, simply by paying you the loss less the deductible. The carrier's duty to defend and to settle is not conditional on your having paid anything first; your obligation is a reimbursement.",
        "Because the carrier controls the claim from the start, the deductible is an underwriting device, not a claims-handling one. It reduces small claims the carrier would otherwise pay in full and gives you a reason to prevent them, and the premium credit for a higher deductible reflects the claims the carrier expects to avoid or shrink. On most liability forms a deductible is within the limit: a policy with a $1,000,000 limit and a $25,000 deductible, for example, pays at most $975,000 of the carrier's money on a claim.",
        "One point people miss on commercial forms: whether the deductible applies to defence costs as well as damages. A liability deductible that applies to indemnity only leaves defence with the carrier; one that applies to loss and expense means your first dollars go to the lawyers before any settlement is reached. The form states which, and the two are priced differently.",
      ],
    },
    {
      heading: "A self-insured retention: you handle it until the retention is exhausted",
      paragraphs: [
        "Under a self-insured retention the carrier's obligations begin only once you have paid losses up to the retention amount. Below that figure the claim is yours: you investigate, you defend or hire counsel, you negotiate and pay the claimant, and you keep the records that prove the retention has been satisfied. The carrier typically requires notice of any claim that could reach the retention and may reserve the right to associate in the defence, but it is not paying and not obliged to defend until you have spent the retention.",
        "The retention usually sits beneath the limit rather than inside it, so a $1,000,000 limit over a $25,000 retention, for example, provides the full $1,000,000 of carrier money above your $25,000. Whether defence costs count toward eroding the retention is, again, a matter of the form: some retentions erode with defence spending, some only with payments to claimants. A retention that erodes only with indemnity can leave you funding a long defence entirely on your own, which is the single largest surprise in this structure.",
        "The carrier is also relying on you to be able to pay. Large retention programmes often require collateral, a letter of credit or audited financials, and a retention on an umbrella policy assumes the underlying policy or your own funds will respond first. If you cannot pay, the carrier's excess obligation may still attach only above the retention figure, leaving a hole the claimant pursues you for directly.",
      ],
    },
    {
      heading: "The mechanism that differs: control, timing and the limit",
      paragraphs: ["Reduced to essentials, the two devices differ in four places."],
      bullets: [
        "Who controls the claim below the figure. Deductible: the carrier. Retention: you, subject to the carrier's reporting and consent requirements.",
        "When the carrier's money moves. Deductible: immediately, with reimbursement later. Retention: only once you have paid out the retention, which for a slow claim can be years.",
        "Whether the figure sits inside or beneath the limit. Deductible: usually inside, reducing what the carrier pays at the top. Retention: usually beneath, leaving the full limit intact.",
        "Whether defence costs count. Both vary by form, but retentions that do not erode with defence spending are common, and that is where the cost of the structure hides.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a landscaping contractor in Meridian is offered a general liability policy two ways: with a $10,000 per-claim deductible, or with a $10,000 self-insured retention and a premium that is $3,000 a year lower. A customer trips over equipment left on a walkway and sues for $60,000; the defence costs $18,000 and the case settles for $40,000.",
        "Suppose first that the contractor took the deductible. The carrier assigns counsel, defends, settles for $40,000 and bills the contractor $10,000, which under this form applies to indemnity only. The contractor's total cost is $10,000 plus the higher premium. Under the retention, the contractor receives the suit, must engage counsel, notify the carrier and manage the case. If the retention erodes with defence costs, the $18,000 of defence exhausts the retention and the carrier takes over both the remaining defence and the $40,000 settlement, so the contractor's cost is $10,000 plus the administrative burden, and the lower premium has paid off. If the retention erodes only with indemnity, the contractor pays the $18,000 defence in full and the first $10,000 of the settlement, $28,000 in total, and the $3,000 premium saving looks very different. The figures are invented; the sensitivity to the erosion clause is not.",
      ],
    },
    {
      heading: "Who each structure suits",
      paragraphs: [
        "A deductible suits an insured who wants a premium credit for absorbing small losses but has no wish, and no staff, to adjust claims. That describes nearly every household and most small businesses. A retention suits an organisation with the cash to fund losses, the discipline to report and document them, and either in-house risk management or a third-party administrator to handle claims below the figure. Larger contractors, fleets, non-profits with many volunteers and professional firms sometimes reach that point; a two-truck operation almost never does.",
        "On umbrella policies the retention is not optional; it is how the umbrella's drop-down coverage is written for losses no underlying policy covers. There the figure is usually modest and the retention applies only to those drop-down claims, so the analysis is about whether the underlying policies are broad enough that the retention rarely applies.",
      ],
    },
    {
      heading: "The decision rule",
      paragraphs: [
        "Take the premium difference between the two structures and set it against three things: the number of claims a year that would fall below the figure, the cost of handling each of those yourself including counsel, and whether the retention erodes with defence. If the premium saving is less than the expected handling cost plus the defence exposure, take the deductible. If you would need to hire someone or engage an administrator to manage the retention, add that cost too. A retention only makes sense when the insured is genuinely equipped to be its own insurer up to the figure, and the test is whether a claim arriving tomorrow would be handled by a process or by panic.",
      ],
    },
    {
      heading: "When the answer is to keep what you have",
      paragraphs: [
        "A business on a guaranteed cost policy with a modest deductible is usually right to stay there until its claims history and its administration justify something else. A retention offered as a renewal option because the carrier wants to shed small claims is a signal to compare markets, not a reason to accept it. We read the erosion clause, the reporting duties and the collateral terms on retention quotes for businesses in Arizona, Nevada, Utah and Idaho, price the handling burden honestly, and if the deductible you have is the better structure, we tell you to leave it alone.",
      ],
    },
  ],
  relatedProducts: ["general-liability-insurance", "commercial-umbrella-insurance", "umbrella-insurance", "contractors-insurance"],
  relatedArticles: ["primary-vs-excess-insurance", "co-insurance-vs-deductible", "how-to-choose-the-right-deductible", "commercial-umbrella-insurance-explained-a-beginner-s-guide"],
  relatedTerms: ["self-insured-retention", "deductible", "loss-sensitive-program", "guaranteed-cost-policy", "excess-liability"],
};
