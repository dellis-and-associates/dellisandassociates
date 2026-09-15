import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to read a certificate of insurance",
  excerpt: "A certificate is a one-page snapshot of someone else's policies, and it confers no rights on the person holding it. How to read the standard form box by box, match it against the contract, spot gaps in the grid and the description box, and know when to ask for the endorsement.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A certificate of insurance is the document a business hands over to prove it is insured: to a landlord before a lease, to a general contractor before a subcontract, to a customer before a purchase order, to a city before a permit. Nearly every one in the United States is issued on the same standard form, the ACORD 25, and nearly everyone who receives one files it without reading past the first limit. That is a mistake in both directions. The person receiving it may be relying on coverage that is not there; the person supplying it may be certifying coverage the policy does not contain, which becomes a dispute the day a claim is made.",
        "The form is readable in a few minutes once you know what each box means and, more importantly, what it does not. This guide walks through it in the order it is laid out, for a landlord, a general contractor or a business owner in Arizona, Nevada, Utah or Idaho who is either checking a certificate or about to have one issued.",
      ],
    },
    {
      heading: "What to gather first",
      paragraphs: ["A certificate is only meaningful against the document that required it."],
      bullets: [
        "The contract, lease or bid package with its insurance clause, since the certificate has to be checked line by line against what the clause demands.",
        "The exact legal name of the party you are contracting with, from the contract itself, to compare with the insured name on the certificate.",
        "The dates of the work or the lease term, to compare with the policy periods.",
        "For a certificate you are supplying: your own declarations pages and endorsements, so the certificate describes what is actually there.",
        "If you have received certificates from the same party before, the previous ones, to see what changed.",
      ],
    },
    {
      heading: "Step one: read the header and the insured name",
      paragraphs: [
        "The top of the form names the producer, which is the agency that issued the certificate, the insured, and the carriers writing each policy, each with a code number identifying the company. Start with the insured. It should be the exact legal entity named in your contract; a certificate for a founder personally when the contract is with an LLC, or for a differently named affiliate, is a certificate for someone else. Check the carriers too: the name of each should be a real insurance company, and its financial strength rating and whether it is admitted in your state can be checked through the state insurance department. A contract clause that demands a minimum carrier rating is checked here.",
        "Note the date the certificate was issued. A certificate is a snapshot on that day; it says nothing about whether the policy is still in force a month later, and the producer has no obligation to tell you if it is cancelled unless the policy itself gives the certificate holder that right, which is rare.",
      ],
    },
    {
      heading: "Step two: read the coverage grid line by line",
      paragraphs: [
        "The centre of the form is a grid with one row per policy type, and columns showing whether additional insured or waiver of subrogation applies, the policy number, the effective and expiry dates, and the limits. On the general liability row, check whether the claims-made or occurrence box is ticked, since a contract will usually demand occurrence; check whether the aggregate applies per policy, per project or per location; and read each limit against the clause: each occurrence, general aggregate, products and completed operations aggregate, personal and advertising injury, damage to rented premises and medical expense. Every date in the grid should cover the period of the work, and a policy that expires mid-project needs a renewed certificate when it does.",
        "On the automobile row, the ticked boxes matter as much as the limit. Any auto is the broadest; scheduled autos alone means only listed vehicles; hired and non-owned should be ticked if the party's employees drive personal cars for the work. The umbrella or excess row shows whether there is a layer above the general liability and the auto, and whether it is umbrella form or the narrower excess form. The workers compensation row has a box for statutory limits and separate figures for employers liability; a party with no employees may show a policy with the owner excluded, or nothing at all, and the contract decides whether that is acceptable. The blank rows at the bottom carry professional liability, pollution, cyber or any other coverage the contract asked for, and an empty row where the clause named one is the most common gap on the form.",
      ],
    },
    {
      heading: "Step three: read the description box, and know what the certificate cannot do",
      paragraphs: [
        "Below the grid is a free-text box headed description of operations, locations and vehicles. This is where the producer writes that the certificate holder is an additional insured, that the coverage is primary and noncontributory, that a waiver of subrogation applies, that a per-project aggregate is in place, or that the job is identified by name. Read it carefully, because it is where the contract's conditions are supposed to appear, and because it is also where the most careless promises are made. A producer under pressure to satisfy a customer can type a sentence into the box that the policy does not support.",
        "The form says so itself, in the disclaimer at the top: the certificate is issued as a matter of information only, confers no rights on the holder, and does not amend, extend or alter the coverage afforded by the policies. If the policy has no additional insured endorsement, the sentence in the box does not create one, and when the claim comes the carrier will point to the policy, not the certificate. So for any condition that matters, additional insured status above all, ask for a copy of the endorsement itself, or of the blanket endorsement wording and the contract that triggers it. A party that will not produce the endorsement probably does not have it.",
        "The cancellation box at the bottom says notice will be delivered in accordance with the policy provisions. Older forms promised the holder a set number of days' notice; the current wording promises only what the policy itself promises, which in most cases is notice to the named insured and nothing to you. If you need to know when a subcontractor's policy is cancelled, the answer is a notice-of-cancellation endorsement naming you, not the certificate.",
      ],
    },
    {
      heading: "Step four: match it to the contract and file it properly",
      paragraphs: [
        "Lay the clause and the certificate side by side and tick each requirement: named entity, each coverage type present, each limit at or above the requirement, occurrence rather than claims-made where demanded, the additional insured and waiver columns marked where demanded, the primary wording and the per-project aggregate in the description box with the endorsements behind them, dates covering the job, and the certificate holder box showing your correct legal name and address. Where something is short, ask for a corrected certificate or a change to the policy before the work starts; after the loss it is too late.",
        "File certificates by counterparty and by expiry date, and put the expiry dates in a calendar. A general contractor holding certificates from thirty subcontractors is holding thirty snapshots that go stale on thirty different days, and the workers compensation audit on the contractor's own policy will charge for any subcontractor whose certificate lapsed. If you are the one supplying the certificate, keep a copy of every one issued along with the endorsements that back it, so that what you certified and what you carried can be shown to match.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: ["Both sides of the transaction make these."],
      bullets: [
        "Reading the general liability occurrence limit and nothing else.",
        "Accepting a certificate for a different legal entity than the one on the contract.",
        "Treating a sentence in the description box as proof of additional insured status without seeing the endorsement.",
        "Missing that the general liability is claims-made when the contract requires occurrence.",
        "Ignoring the expiry dates and holding a certificate for a policy that lapsed months ago.",
        "Assuming the cancellation box means you will be told if the policy is cancelled.",
        "As the supplier, letting a producer type conditions into the description box that the policy does not contain, and discovering the gap when the counterparty tenders a claim.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a Salt Lake City general contractor receives a certificate from a drywall subcontractor for a school project whose contract demands general liability of $1,000,000 per occurrence and $2,000,000 aggregate on an occurrence basis, a per-project aggregate, additional insured status with primary and noncontributory wording, a waiver of subrogation, auto liability of $1,000,000, and workers compensation with employers liability of $500,000. The certificate shows general liability at the right limits with the occurrence box ticked, but the aggregate box shows policy rather than project; the auto row shows scheduled autos only, no hired and non-owned; the description box promises additional insured and primary wording; and the workers compensation row shows employers liability of $100,000. The contractor asks for a corrected certificate with a per-project aggregate, hired and non-owned auto added, employers liability raised to $500,000, and copies of the additional insured and primary endorsements. Say the subcontractor's agent adds the endorsements for $350 in total and reissues the certificate within a week. Eight months later a drywall stack falls on an electrician's apprentice; the general contractor is defended as an additional insured under the subcontractor's policy, which pays first because of the primary wording, and the contractor's own carrier is not touched. Every figure is illustrative.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "If you have received a certificate you are unsure about, send it to us with the clause it was meant to satisfy and we will read them against each other and tell you what to ask for. If you are the one being asked, send the clause and we will issue a certificate that describes exactly what your policies contain, add the endorsements the clause actually requires across the carriers we represent in Arizona, Nevada, Utah and Idaho, and say plainly when a demand is one your policy already meets and no change is needed.",
      ],
    },
  ],
  relatedProducts: ["general-liability-insurance", "commercial-auto-insurance", "workers-compensation-insurance", "commercial-umbrella-insurance"],
  relatedArticles: ["named-insured-vs-additional-insured", "how-to-add-additional-insured-status-to-a-policy", "claims-made-vs-occurrence-policies", "how-to-choose-general-liability-coverage-limits", "admitted-vs-non-admitted-carriers"],
  relatedTerms: ["certificate-of-insurance", "additional-insured", "primary-and-noncontributory", "waiver-of-subrogation", "a-m-best-rating"],
};
