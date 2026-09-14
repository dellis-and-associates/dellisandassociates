import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Professional liability (E&O) insurance explained: a beginner's guide",
  excerpt: "Errors and omissions coverage pays when advice or work you were paid for turns out to be wrong and a client loses money. Why general liability will not respond, how claims-made policies and retroactive dates work, what defence inside the limit means, and how to size the limit from your contracts.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "General liability pays when your business hurts a person or breaks a thing. Professional liability, also called errors and omissions or E&O, pays when your business gives advice, a design, a diagnosis or a service that turns out to be wrong and the client loses money because of it. Nobody is injured and nothing is broken; the loss is financial, and a general liability policy excludes it in so many words.",
        "Any business paid for judgement is exposed: accountants, consultants, architects, engineers, real estate agents, insurance agents, IT firms, marketing agencies, home inspectors, notaries, therapists and, increasingly, anyone whose contract says they will deliver a result. This guide explains what the policy responds to, why almost every E&O form is written on a claims-made basis and what that demands of you, what sits inside and outside the limit, and how to pick a figure.",
      ],
    },
    {
      heading: "What counts as a professional liability claim",
      paragraphs: [
        "The trigger is an alleged negligent act, error or omission in performing professional services for others, causing financial loss. Three words in that sentence carry the weight. Alleged means the policy responds to the accusation, not only to the proven mistake; the defence is the main thing you are buying. Negligent means the standard is what a reasonably competent professional would have done, not perfection. Financial means the claim is measured in dollars a client lost or failed to gain, not in medical bills.",
      ],
      bullets: [
        "An accountant misses a filing election and the client pays a penalty and loses a deduction.",
        "A structural engineer's beam sizing is wrong and the owner pays to shore and rebuild before anything fails.",
        "A real estate agent fails to disclose a known drainage problem and the buyer sues after the first monsoon.",
        "An IT consultant's migration corrupts a database and the client loses a week of orders.",
        "A marketing agency's campaign uses a photograph without a licence and the client is billed by the rights holder.",
        "A home inspector misses active termite damage in a Tucson crawlspace and the buyer discovers it after closing.",
      ],
    },
    {
      heading: "Claims-made: the policy form that punishes a lapse",
      paragraphs: [
        "Nearly all E&O is written on a claims-made form, which is the opposite of the occurrence form used for general liability. An occurrence policy covers incidents that happen during the policy period, no matter when the claim arrives. A claims-made policy covers claims first made against you during the policy period, provided the underlying work was done after the policy's retroactive date. Both conditions must hold at once.",
        "The retroactive date is the earliest date of work the policy will respond to. On a first policy it is usually the inception date, so work you did before you were insured is never covered. On each renewal the carrier should carry the original retroactive date forward, which is what gives you prior-acts coverage for your whole insured history. If you switch carriers, the new carrier must agree to honour the old retroactive date; if it does not, or if you let the policy lapse, every year of work before the new date becomes uninsured at a stroke.",
        "Suppose you started an engineering practice in year one and bought E&O with a retroactive date of that year. In year six you let it lapse for three months to save money, then buy a new policy with a year-six retroactive date. In year seven a client sues over a design from year four. The old policy is gone, the new one will not reach back past year six, and the claim is yours alone. The years are made up, but this is the shape of the commonest E&O gap, and it is entirely avoidable by never letting the coverage lapse and never accepting a reset retroactive date without knowing what it costs you.",
      ],
    },
    {
      heading: "Tail coverage: what happens when you stop",
      paragraphs: [
        "Because a claims-made policy only responds to claims made while it is in force, retiring, selling the practice or simply cancelling the policy leaves you exposed to claims about past work that arrive afterwards. The fix is an extended reporting period, called tail coverage, which keeps the policy open to new claims for a set number of years after cancellation, for work done before the cancellation. It is bought as a one-time premium at the point of cancellation, and the price is usually expressed as a multiple of the final annual premium. Some professions and some contracts require it; a retiring architect, for example, may be liable for a building for many years after the drawings were stamped. Ask what the tail options are before you buy the policy, not when you leave.",
      ],
    },
    {
      heading: "Defence inside the limit, and what that does to the arithmetic",
      paragraphs: [
        "On most E&O forms the cost of defending a claim is paid from the same limit that pays the settlement or judgement. That is called defence within limits or eroding limits, and it is the opposite of a standard general liability form. Legal fees on a professional negligence case, with expert witnesses on both sides, run high, and they run before anyone knows whether you did anything wrong.",
        "Suppose an IT firm carries a $500,000 per-claim limit with defence inside it. A client alleges a botched migration cost them $400,000. The defence takes eighteen months and costs $200,000 in fees and experts. At mediation the case settles for $300,000. The limit has now paid $500,000 and is exhausted, and the firm has covered nothing beyond its deductible; had the fees run higher or the settlement been larger, the balance would have been the firm's. Figures invented, but the point holds: on an eroding form the limit has to be sized for the lawyers as well as the loss, and a form that offers defence outside the limit, where available, is worth its higher premium.",
        "The deductible on E&O is often larger than a small business expects and may apply to defence costs as well as indemnity. Some carriers offer a first-dollar defence option, where the deductible only applies once money is paid to the claimant. Read which you are being quoted.",
      ],
    },
    {
      heading: "What the policy excludes",
      paragraphs: ["The exclusions cluster around things that are not honest mistakes and things another policy is meant to cover."],
      bullets: [
        "Bodily injury and property damage, which belong to general liability; a therapist's client who trips in the waiting room is a GL claim, and one who alleges bad treatment is an E&O claim.",
        "Fraud, dishonesty and intentional wrongdoing, though most forms still defend you until the conduct is proven.",
        "Contractual guarantees of a result, such as a promise that a website will produce a stated volume of sales; the policy covers negligence, not warranties.",
        "Return of fees. If a client refuses to pay because the work was poor, the policy does not pay you back.",
        "Services outside the professional description on the declarations page. An accountant who also gives investment advice needs the application to say so.",
        "Fines, penalties and punitive damages, in most states and on most forms.",
        "Cyber events and data breaches, unless the E&O form includes a technology and network security part; many technology E&O policies now do, and many others do not.",
      ],
    },
    {
      heading: "Sizing the limit from the work, not the revenue",
      paragraphs: [
        "The right limit relates to the largest plausible loss a client could suffer from one mistake, not to how much you bill. A bookkeeper billing modestly for a client whose payroll tax deposits run large has a bigger exposure than the fees suggest. Three inputs decide the figure: what your contracts require, which is often stated by a client, a lender or a licensing board; the value of the projects or transactions your work touches; and whether the form erodes the limit with defence costs, which argues for a higher number.",
        "Two limits appear on the declarations page: per claim and aggregate for the policy year. A busy practice with many small engagements wants the aggregate to be a healthy multiple of the per-claim figure. Also check whether related claims from one error are treated as a single claim, which caps your exposure at one deductible but also at one per-claim limit.",
      ],
    },
    {
      heading: "Notes for the four states",
      paragraphs: [
        "Licensing boards in the four states differ in what they require. Some professions face a mandatory E&O requirement as a condition of licence and some do not; where a requirement exists the minimum limit is set by the board or by statute and the analysis shows it against your contracts rather than treating it as a target. Real estate brokerages in the region commonly require every agent to carry an individual policy or be covered under the brokerage's group programme, and it is worth confirming which applies before the first listing. Arizona and Nevada's volume of new construction keeps design professionals busy and exposed, and Idaho and Utah's growth markets bring the same exposure to inspectors and surveyors. In all four states a client's suit will usually name the individual as well as the firm, so the policy should list both.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Collect three things: your current declarations page with its retroactive date, the insurance clause from your largest client contract, and a one-line description of every service you actually sell. From those we can say whether the form fits the work, whether the limit is sized for an eroding defence, and whether the retroactive date reaches back to your first engagement. If the policy you have does all three, the analysis ends there and we say so. If you have no E&O and you are paid for judgement, the most important date is the one the first policy sets as retroactive, and the earlier you buy, the more of your history it covers.",
      ],
    },
  ],
  relatedProducts: ["professional-liability-eo-insurance", "general-liability-insurance", "cyber-liability-insurance", "business-owners-policy"],
  relatedArticles: ["general-liability-vs-professional-liability", "claims-made-vs-occurrence-policies", "general-liability-insurance-explained-a-beginner-s-guide", "starting-a-small-business-insurance-basics", "how-to-insure-a-new-business-in-its-first-year"],
  relatedTerms: ["claims-made-policy", "retroactive-date", "tail-coverage", "prior-acts-coverage", "extended-reporting-period", "occurrence-policy"],
};
