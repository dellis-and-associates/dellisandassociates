import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Pays when a client says your advice, design or service cost them money, and pays the lawyer to answer the claim. General liability covers the ladder that falls on a visitor; this covers the drawing, the spreadsheet or the recommendation that turned out to be wrong.",
  intro: [
    "Professional liability, also sold as errors and omissions or E&O, responds to a financial loss a client attributes to your professional work: a missed deadline, a wrong calculation, an omission in a report, a design that did not meet the code, a policy an agent failed to bind. No one is hurt and nothing is broken, which is exactly why a general liability policy does not respond. The claim is that you owed a duty of care in your professional capacity and fell short of it, and the policy pays the damages you become legally obligated to pay plus the cost of the defence.",
    "The people who carry it are those whose product is judgement: consultants, insurance and real estate agents, architects and engineers, accountants and bookkeepers, IT firms and software developers, marketing agencies, home inspectors, and contractors who take on design-build work where the design is theirs. Many are made to carry it by a client contract or a professional body, and procurement departments increasingly ask for it from every vendor that gives advice.",
    "The premium is rated on the profession, annual revenue, the size of the largest contract, the limits chosen, the retention and the claims history. The analysis reads the contracts you are being asked to satisfy, checks the retroactive date and limits on any policy you already hold, and compares what the carriers we represent will offer for your class. If your current form is right, that is what you hear.",
  ],
  coverageBlocks: [
    {
      heading: "What the policy pays for",
      paragraphs: [
        "The insuring agreement covers a claim for a negligent act, error or omission in the performance of professional services, as those services are defined on the declarations page. The definition is the whole policy: an engineering firm's policy covers engineering, and if the firm starts doing construction management, the new work is uncovered until the definition is broadened. Damages are the client's financial loss, which can include the cost of redoing the work and the profit they lost. Defence costs are paid either inside the limit, which erodes what is left for the settlement, or outside it; the difference is worth a great deal.",
        "Most forms also pay for things that are not lawsuits: a licensing board complaint, a subpoena for your files in someone else's dispute, or a demand letter that never becomes a suit. Those extensions carry their own small limits and are the claims a small firm actually sees.",
      ],
    },
    {
      heading: "Claims-made form and the retroactive date",
      paragraphs: [
        "Almost every professional liability policy is written claims-made: it responds to claims first made against you during the policy period, whenever the work was done, as long as the work was done after the retroactive date. A general liability policy is the opposite: occurrence-based, looking at when the injury happened. The retroactive date is set when you first buy coverage, and each renewal should carry it forward unchanged; a policy that resets it to the new inception date quietly wipes out cover for every job finished before that day.",
        "The practical rule is that a claims-made policy protects you only while it is in force. Cancel it, let it lapse, or retire, and a claim that arrives next month for work done last year has no policy to land on.",
      ],
    },
    {
      heading: "Tail coverage and the extended reporting period",
      paragraphs: [
        "An extended reporting period, called tail coverage, solves the lapse problem. It is an endorsement that keeps the expired policy open to receive claims for a set number of years, or indefinitely, for work done before the policy ended. Carriers include a short automatic tail at no charge and sell longer ones for a one-time premium. The tail must be bought within a short window after the policy ends, and the option disappears if the window is missed.",
        "You need a tail when you close the firm, retire, sell the practice, or move to a carrier that will not honour the old retroactive date. You do not need one when the new carrier picks up the prior acts, which is the ordinary outcome; the analysis confirms it on the new declarations before the old policy is cancelled.",
      ],
    },
    {
      heading: "Limits, retention and defence",
      paragraphs: [
        "The policy carries a per-claim limit and an annual aggregate, and a retention, which works like a deductible but is paid by you toward defence costs as well as damages. Contracts name the per-claim figure they want, and design professionals working for public bodies are asked for more than a consultant serving small companies. Most of the money in a professional claim is spent on lawyers before liability is decided, so a low retention costs more in premium and is often the right buy for a small firm.",
        "Many forms include a consent to settle clause, so the carrier cannot settle without your agreement, and some pair it with a hammer clause, under which refusing a settlement the carrier recommends leaves you responsible for costs above that figure. Read for both before you buy.",
      ],
    },
    {
      heading: "Professional liability against general liability",
      paragraphs: [
        "The two policies split the world by the kind of harm. General liability pays for bodily injury and physical property damage caused by your premises, operations or completed work, on an occurrence basis, and excludes professional services. Professional liability pays for financial loss caused by your professional services, on a claims-made basis, and excludes bodily injury and property damage on most forms. A consultant needs both if clients visit the office and a contract asks for both; a home-based sole practitioner who never meets clients in person may be served by a professional policy alone. Where an error causes physical damage, the two policies can argue over which responds, which is a reason to carry both with one carrier where possible.",
      ],
    },
  ],
  covered: [
    "A client's financial loss from a mistake, omission or missed deadline in your professional work",
    "Defence costs for a claim, including one that is dismissed",
    "Claims made during the policy period for work done after the retroactive date",
    "Design errors by a contractor on design-build projects, when the design work is scheduled",
    "Responding to a licensing board complaint or a subpoena for your records, up to a sub-limit",
  ],
  notCovered: [
    "Bodily injury and physical property damage, which belong to general liability",
    "Work done before the retroactive date, or claims made after the policy ends without a tail",
    "Claims you knew about, or circumstances you should have reported, before the policy began",
    "Fraud, dishonest acts and criminal conduct, once proven",
    "Services outside the definition on the declarations page",
    "Data breaches and network security failures, which belong to cyber liability unless the form is a combined tech E&O",
  ],
  discounts: [
    { name: "Risk management credit", description: "Written engagement letters, a documented peer review process and completed carrier-approved courses each earn a credit with most carriers." },
    { name: "Claims-free history", description: "Years without a reported claim or circumstance lower the rate; a single closed claim with no payment often does not raise it." },
    { name: "Higher retention", description: "Taking on a larger share of each claim's defence costs lowers the premium, for a firm with the cash to fund it." },
    { name: "Combined general and professional liability", description: "Carriers that write both for a class, such as technology firms or consultants, price the pair below two standalone policies and remove the argument over which responds." },
  ],
  faqs: [
    {
      question: "A client's contract asks for professional liability. Do I really need it for a small consulting practice?",
      answer: [
        "If the contract asks for it, you need it to sign the contract; the question is only whether to carry it beyond that one engagement. The exposure scales with the largest decision a client makes on your advice, not with the size of your firm. The analysis puts the largest contract against the limit the client asks for and the premium for the class, and the recommendation is sometimes a small annual policy and sometimes a project-specific one.",
      ],
    },
    {
      question: "What happens to my coverage if I switch carriers?",
      answer: [
        "The new carrier issues a policy with your existing retroactive date, so work done under the old policy remains covered for claims made under the new one; this is called prior acts coverage. The failure mode is a new carrier that offers only a retroactive date equal to its inception, which leaves every earlier job uncovered unless you buy a tail from the old carrier. We do not cancel the old policy until the new declarations page shows the right date.",
      ],
    },
    {
      question: "I do design-build work as a contractor. Does my contractors' policy cover the design?",
      answer: [
        "No. A contractor's general liability policy excludes professional services, and the design portion of a design-build contract is exactly that, whether you drew it yourself or hired an architect under you. Contractors' professional liability covers your own design work and your vicarious liability for the design professionals you subcontract. General contractors on public projects are increasingly asked for it by name.",
      ],
    },
    {
      question: "What should I do when a client sends an angry email but has not sued?",
      answer: [
        "Report it. Claims-made policies let you notify the carrier of a circumstance that might become a claim, and once noticed, a later claim from that circumstance attaches to the policy in force when you reported it, even if it arrives years after that policy expired. Sitting on it risks the opposite: a claim arriving under a later policy that the carrier can decline because you knew about it before that policy began. Reporting a circumstance does not by itself raise the premium.",
      ],
    },
    {
      question: "Do I need cyber liability as well, if my E&O policy mentions data?",
      answer: [
        "Usually, yes. A professional liability form covers a client's loss from your negligent service; it does not pay your own costs after a breach, such as notifying customers, forensic investigation, ransom demands or lost income while your systems are down. Technology E&O forms combine the two for software and IT firms. For everyone else, a separate cyber policy sits beside the professional policy, and the analysis shows the overlap so you are not paying twice for the third-party piece.",
      ],
    },
  ],
  relatedProducts: ["general-liability-insurance", "cyber-liability-insurance", "business-owners-policy", "contractors-insurance", "commercial-umbrella-insurance"],
  seo: { description: "How professional liability (E&O) insurance works: the claims-made form, the retroactive date, tail coverage, limits and retention, and where it ends and general liability begins, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
