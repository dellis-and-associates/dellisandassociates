import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to dispute a denied insurance claim",
  excerpt: "A denial is the carrier's reading of the policy against the facts it has, and both can be challenged. How to decode the letter, gather evidence that answers it, write an appeal, escalate inside the carrier, and use appraisal, the state insurance department and counsel in the right order.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A claim is denied when the adjuster concludes that the loss is not covered, that a condition of the policy was not met, or that the amount claimed is not owed. Each of those is a judgement built from two things: the policy language and the facts the carrier has in its file. The language is fixed, but its application to your loss is a matter of interpretation, and the file is only as complete as what the carrier gathered and what you gave it. A dispute is the process of correcting the file and contesting the interpretation, in writing, in a sequence the carrier's own procedures recognise.",
        "Many denials are reversed at the first or second step, once a missing document is supplied or a misread exclusion is pointed out. Others go further, to appraisal, to the state department of insurance, or to a lawyer. This guide sets out the steps in the order that costs least and keeps every later option open, for home, auto and other personal claims in Arizona, Nevada, Utah and Idaho.",
      ],
    },
    {
      heading: "What to gather",
      paragraphs: ["Build the file before you write a word of the appeal."],
      bullets: [
        "The denial letter, in full. It must state the reason and cite the policy provisions relied on; if it does not, request that in writing, because you are entitled to it.",
        "The complete policy: the declarations page, the policy form, and every endorsement, not only the summary. The carrier will send a certified copy on request.",
        "Your claim file as it stands: the first notice, photographs, estimates, invoices, the inspection report, and any recorded statement you gave. Ask the carrier for a copy of what its file contains, including the adjuster's estimate and any expert or engineer report.",
        "A dated log of every contact with the carrier: who, when, what was said.",
        "Independent evidence that speaks to the reason given: a contractor's or engineer's opinion on cause, a repair shop's estimate, weather records for the date, a police report, medical records, receipts.",
        "Any deadline in the policy or the letter for appealing, requesting appraisal, or bringing suit.",
      ],
    },
    {
      heading: "Step one: decode the denial",
      paragraphs: [
        "Denials fall into a small number of types, and the type determines the response. A coverage denial says the loss is not one the policy insures: the cause was excluded, such as flood, earth movement, wear and tear or gradual seepage, or the property was not covered property. A conditions denial says you did not meet a policy condition: late notice, failure to mitigate further damage, failure to cooperate, a misrepresentation on the application or in the claim. A valuation denial, more often a partial denial, accepts coverage but disputes the amount, the scope of repair or the depreciation applied. A liability denial on a third-party claim says the carrier does not believe its insured was at fault, or that the claimant's damages are not proven.",
        "Read the cited provisions in the policy itself and check that they say what the letter says they say, that they apply to the facts, and that no other provision gives coverage back. Exclusions often have exceptions, and ensuing loss clauses restore coverage for damage that follows an excluded cause. Anti-concurrent causation language, which excludes a loss when an excluded cause contributed in any way, is common in home policies and is frequently the crux of a storm or water denial. Knowing which type of denial you have, and the exact words it rests on, is most of the work.",
      ],
    },
    {
      heading: "Step two: answer the reason with evidence",
      paragraphs: [
        "Each denial type has an evidentiary answer. A cause-of-loss denial is answered with an independent expert: a roofing contractor's written opinion that the damage is hail impact rather than age, a plumber's report that a pipe failed suddenly rather than seeped, an engineer's assessment that a foundation crack followed a plumbing leak rather than soil movement. A conditions denial is answered with the record: the date you first reported, the steps you took to mitigate, the documents you supplied. A valuation dispute is answered with a competing estimate on the same scope of work from a licensed contractor, with the line items the carrier omitted marked. A liability denial is answered with the police report, witness statements and photographs.",
        "The expert's report should address the carrier's report point by point, be signed, and be from someone qualified to give the opinion. A contractor's estimate that says only a new roof is needed does not answer an engineer's finding that the damage is wear; a contractor's written observation of impact marks with photographs, or a second engineer, does. Where the cost of an expert is significant relative to the claim, ask the carrier whether it will accept a joint inspection with its adjuster present before you spend the money.",
      ],
    },
    {
      heading: "Step three: write the appeal and escalate inside the carrier",
      paragraphs: [
        "Write to the adjuster, with the claim number, stating that you dispute the denial, identifying the provisions the carrier relied on, explaining why they do not apply or why coverage is restored, and attaching the evidence. Ask for a written response within a stated reasonable period and for reconsideration by a supervisor if the adjuster stands by the denial. Keep the tone factual; the letter will be read by people who did not write the denial, and it should let them reverse it without embarrassment. Send it by a method that proves delivery.",
        "If the response is another denial, escalate: to the adjuster's supervisor, then to the carrier's claims management or its internal appeals unit, each in writing, each restating the position and enclosing the file. Each of the four states requires carriers to acknowledge and respond to claim communications within set periods and to give reasons for denials; the periods are set by state regulation: {{TODO:statute.arizona.claim-handling-deadlines}}, {{TODO:statute.nevada.claim-handling-deadlines}}, {{TODO:statute.utah.claim-handling-deadlines}}, {{TODO:statute.idaho.claim-handling-deadlines}}. Missed deadlines and unexplained delays belong in your log; they matter at the next step.",
      ],
    },
    {
      heading: "Step four: appraisal, the state, and counsel",
      paragraphs: [
        "If the dispute is about the amount rather than coverage, the policy's appraisal clause is usually the fastest route. Either side may demand it in writing; each appoints an independent appraiser, the two select an umpire, and any two of the three set the amount, which binds both parties on value. It does not decide coverage questions, and demanding it does not waive them, but on scope and price it is quicker and cheaper than a lawsuit.",
        "For a coverage or conduct dispute, a complaint to the state insurance regulator is the next step: the Arizona Department of Insurance and Financial Institutions at https://difi.az.gov/, the Nevada Division of Insurance, the Utah Insurance Department, and the Idaho Department of Insurance at https://doi.idaho.gov/. Each takes written complaints, requires the carrier to respond, and reviews the handling against the state's claims rules. The regulator does not decide who is right on the policy language, but a complaint compels a considered answer from someone senior and often produces the reversal on its own. A public adjuster, licensed in each state, can be engaged for a percentage of the recovery to prepare and negotiate a property claim; that is worth considering for a large, complex loss and rarely for a small one.",
        "Consult a lawyer when the amount justifies it, when the carrier's conduct suggests it is not dealing fairly, or when a deadline is approaching. Each state's law provides remedies for a carrier's unreasonable handling of a claim, beyond the claim amount itself, and each sets a time limit for suing on a policy, which the policy may shorten; the limit is fixed by state law and by the policy wording, and a lawyer will confirm it. Many take first-party insurance cases on a contingency basis; an initial consultation tells you whether the case is one of them.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: ["These are the reasons legitimate disputes fail."],
      bullets: [
        "Accepting a denial given by phone without asking for it in writing with the provisions cited.",
        "Arguing by phone rather than in letters, so there is no record of what was said.",
        "Appealing without new evidence. Repeating the claim produces the same answer.",
        "Getting an expert opinion that does not address the carrier's stated reason.",
        "Starting repairs and discarding damaged materials before the dispute is resolved, which destroys the evidence. Mitigate, photograph and keep samples.",
        "Missing the policy's suit limitation or a proof-of-loss deadline while waiting for an internal appeal.",
        "Signing a release or cashing a cheque marked as full and final settlement on a partial payment.",
        "Cancelling the policy in the middle of the dispute.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a homeowner in Ogden claims for a roof after a spring hailstorm, and the carrier's adjuster denies it, citing the wear-and-tear exclusion and an inspection finding that the shingles were at the end of their life. The homeowner obtains the full policy and the adjuster's report, and hires a roofing contractor who photographs impact fractures on the shingles, dents on the soft metal vents and gutters, and writes a signed opinion that the pattern is consistent with hail on the date in question; weather records confirm hail in the area that day. Her appeal letter cites the policy's coverage for windstorm and hail, notes that the exclusion does not apply to sudden damage from a covered peril, and encloses the report and the records. The adjuster stands by the denial; a supervisor reviews it and orders a joint reinspection, at which the carrier's engineer agrees the vents and gutters show hail and accepts partial coverage but disputes the roof. The homeowner demands appraisal on the amount. The appraisers agree a full replacement at say $14,000 less a $1,500 deductible and depreciation of $2,000 recoverable on completion. The whole process takes four months and costs her $400 for the contractor's report. Figures are illustrative.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "If a claim on a policy we placed is denied, send us the letter and we review it against the policy wording, tell you which type of denial it is and whether it is sound, help you assemble the evidence, and take the appeal to the carrier's claims management on your behalf. If the denial is correct under the policy, we will say so plainly, explain why, and turn to what the policy should have had for next time.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "auto-insurance", "renters-insurance"],
  relatedArticles: ["how-to-file-an-auto-insurance-claim", "how-to-prepare-an-insurance-claim-after-a-storm", "named-perils-vs-open-perils-policies", "indemnity-vs-reimbursement-claims", "how-to-build-a-home-inventory-for-insurance-claims"],
  relatedTerms: ["appraisal-clause", "exclusion", "adjuster", "peril", "claim"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
