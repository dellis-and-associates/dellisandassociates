import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "A second layer of liability limit above your general liability, commercial auto and employers liability policies that pays once one of them is exhausted by a claim. Bought in round increments, priced on the exposures underneath it, and often demanded by contracts before work can start.",
  intro: [
    "A commercial umbrella does one job: when a lawsuit against the business exceeds the limit on the policy that would normally respond, the umbrella pays the excess up to its own limit. It does not replace the general liability, auto or employers liability policies beneath it. It names them on a schedule of underlying insurance, requires each to carry a stated minimum limit, and then follows those policies' terms for what is and is not a covered claim.",
    "The businesses that buy it in Arizona, Nevada, Utah and Idaho are usually the ones whose work can hurt someone badly: contractors, trucking and delivery operations, landscapers, manufacturers, anyone with a fleet, and any company that hosts the public. The trigger is often not the owner's own risk assessment but a contract. A general contractor's subcontract, a municipal bid, a commercial lease or a national customer's vendor terms will list a total liability limit that no single primary policy reaches, and the umbrella is how the gap is closed.",
    "The premium is set from the size and nature of the underlying exposures: payroll and receipts for the liability side, the number and type of vehicles and drivers for the auto side, and the limit purchased. The analysis checks that the underlying limits actually match what the umbrella carrier requires, because a mismatch there is the most common way an umbrella fails to pay.",
  ],
  coverageBlocks: [
    {
      heading: "How the layer attaches",
      paragraphs: [
        "Every umbrella policy lists the underlying policies it sits over and the minimum limit each must carry. A bodily injury verdict against a landscaping company, for example, is paid first by the general liability policy to its per-occurrence limit and then by the umbrella for the rest. If the underlying policy carried less than the scheduled minimum, the business is treated as self-insuring the difference before the umbrella starts. The same logic applies to the aggregate: once the primary policy's annual aggregate is spent on earlier claims, the umbrella can drop down and pay as primary for later ones, subject to a retention that works like a deductible.",
      ],
    },
    {
      heading: "Follow-form excess versus a true umbrella",
      paragraphs: [
        "Two products are sold under the same name. A follow-form excess policy adopts the underlying policy's terms exactly: what the primary excludes, the excess excludes. A true umbrella has its own, sometimes broader, insuring agreement and can pay claims the underlying policies do not cover at all, after a self-insured retention. The difference shows up in the wording, not the price list, so the analysis reads the form. For most small businesses a follow-form excess over a well-written package is the right buy; the broader form matters where the primary policies leave known gaps.",
      ],
    },
    {
      heading: "What it sits over",
      paragraphs: [
        "The typical schedule lists general liability, commercial auto liability and the employers liability part of the workers compensation policy. Employers liability is the piece owners overlook: it pays when an injured employee sues outside the workers compensation system, and a contract's umbrella requirement usually assumes it is included. Some umbrellas can also be written over liquor liability, hired and non-owned auto, and a non-profit's directors and officers coverage, but each has to be scheduled; an umbrella pays nothing over a policy it does not list.",
      ],
    },
    {
      heading: "Contracts, certificates and additional insureds",
      paragraphs: [
        "A certificate of insurance is the document your customer or landlord receives to confirm the umbrella is in force. It shows the carrier, the policy period, the limit and, when the contract asks for it, that the requesting party is an additional insured. Contracts frequently ask for the umbrella to follow the underlying policies in granting additional insured status and in being primary and non-contributory, which means it pays before the other party's own insurance. Those are endorsements, not certificate wording, so the requirement has to be matched on the policy before the certificate can truthfully say so.",
      ],
    },
  ],
  covered: [
    "Bodily injury and property damage judgments above the general liability limit",
    "Auto liability claims above the commercial auto policy's limit",
    "Employee injury suits above the employers liability limit",
    "Defence costs, with many forms paying them in addition to the limit",
    "Claims after the primary aggregate is exhausted, with the umbrella dropping down",
    "Additional insured obligations that follow the underlying policies, when endorsed",
  ],
  notCovered: [
    "Any claim the scheduled underlying policy also excludes, on a follow-form policy",
    "Professional errors and omissions, unless a professional liability policy is scheduled",
    "Workers compensation benefits themselves, which are paid only by that policy",
    "Damage to the business's own property, vehicles or equipment",
    "Pollution, asbestos and similar exclusions that mirror the primary form",
    "The gap created when an underlying policy is cancelled, lapses or carries less than the scheduled minimum",
    "Cyber events, which need a separate policy and are not usually schedulable",
  ],
  discounts: [
    { name: "Same carrier as the underlying package", description: "Writing the umbrella with the carrier that holds the general liability or auto policy simplifies claims and is usually priced lower." },
    { name: "Fleet safety programme", description: "Documented driver screening, motor vehicle record checks and telematics on commercial vehicles, since auto losses drive most large umbrella claims." },
    { name: "Written safety and contract procedures", description: "A safety manual, subcontractor agreements with insurance requirements, and certificate collection from subs." },
    { name: "Higher underlying limits", description: "Carrying more primary limit than the umbrella carrier's minimum lowers the umbrella rate because the layer attaches higher." },
    { name: "Claims-free history", description: "No large liability losses over the carrier's look-back period, verified with loss runs." },
  ],
  faqs: [
    {
      question: "The contract asks for a limit our general liability does not have. Do we raise that limit or buy an umbrella?",
      answer: [
        "Usually the umbrella. Primary carriers cap what they will write per occurrence, and above that point an umbrella is priced lower per unit of limit because it is rarely reached. The exception is a contract that requires the higher limit on the general liability policy specifically, which some public works agreements do. Send us the insurance section of the contract and the analysis will show which structure satisfies it at the lower cost.",
      ],
    },
    {
      question: "Do we need a commercial umbrella if we already have a personal umbrella?",
      answer: [
        "Yes, if the business has its own liability policies. A personal umbrella sits over personal auto and homeowners policies and excludes business activities. It will not respond to a suit against the company or to a crash in a company truck, and it cannot be certified to a customer.",
      ],
    },
    {
      question: "Why does the umbrella carrier care what my auto and liability limits are?",
      answer: [
        "Because the umbrella is priced on the assumption that it starts paying only after a specific amount of primary limit is gone. If the underlying policy is lower than scheduled, the umbrella still attaches at the scheduled point and you owe the difference personally. It is also a condition of the policy that the underlying coverage stays in force for the whole term, so a mid-term change to the auto policy needs to be reported to the umbrella carrier too.",
      ],
    },
    {
      question: "How much umbrella limit does a small business need?",
      answer: [
        "Start from the largest limit any current contract or lease requires, then consider what a serious injury from your operations would cost to defend and settle. A business with vehicles on the road has a materially larger exposure than an office. Suppose a delivery company carries an auto liability limit of one million dollars and a customer's terms require five million in total; the umbrella would be written at four million above the auto policy, and the analysis would check that the general liability and employers liability limits meet the same carrier's minimums.",
      ],
    },
    {
      question: "Does the umbrella pay defence costs?",
      answer: [
        "Once the primary policy's limit is exhausted, most umbrella forms take over the defence and pay those costs in addition to the limit, though some pay them within it. On a true umbrella responding to a claim the primary policies do not cover, defence starts after the self-insured retention. The wording differs by carrier and it is one of the items the analysis compares.",
      ],
    },
  ],
  relatedProducts: ["umbrella-insurance", "general-liability-insurance", "commercial-auto-insurance", "workers-compensation-insurance"],
  seo: { description: "How a commercial umbrella attaches over general liability, commercial auto and employers liability, follow-form versus true umbrella, underlying limits and contract requirements, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
