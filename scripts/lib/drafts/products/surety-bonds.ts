import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "A bond is a guarantee, not insurance: a surety promises a third party that you will do what a licence, a contract or a court requires, and if you do not, the surety pays and you repay the surety. License, contract, court and fiduciary bonds are placed through the same office.",
  intro: [
    "An insurance policy transfers risk from you to a carrier; a surety bond does not. It is a three-party agreement in which the surety promises the party requiring the bond that you, the principal, will perform an obligation. If you fail and the obligee suffers a loss, the surety pays the obligee up to the bond amount and then collects the full amount back from you under an indemnity agreement you sign at the start. The surety is lending you its credit and its reputation, which is why bonds are underwritten more like a loan than a policy.",
    "In Arizona, Nevada, Utah and Idaho the most common request is the contractor license bond, required by each state's contractor licensing board as a condition of issuing or renewing a licence. After that come contract bonds for public and larger private construction jobs, and a long list of licence and permit bonds for other trades and businesses: auto dealers, mortgage brokers, notaries, freight brokers, collection agencies, alcohol and tobacco sellers and others whose regulator wants a guarantee behind the licence. Court and fiduciary bonds are required by a judge when someone administers an estate or a guardianship or seeks an injunction.",
    "The premium is a percentage of the bond amount, set from the principal's personal credit, the business's financial statements where the bond is large, years in operation and any prior bond claims. Because the surety expects to be repaid, an applicant with clean credit and clear books pays a lower rate, and one with weak credit pays more or posts collateral. The analysis reads what the licensing board or the contract actually demands and matches the bond form to it, since a bond on the wrong form is rejected at filing.",
  ],
  coverageBlocks: [
    {
      heading: "Principal, obligee and surety",
      paragraphs: [
        "Every bond names three parties. The principal is the person or business whose performance is being promised: the contractor, the dealer, the executor. The obligee is the party the promise is made to and the only one who can claim on the bond: the state licensing board, the project owner, the court. The surety is the company that issues the bond and pays a valid claim. Insurance protects the person who buys it; a bond protects the obligee, and the person who buys it remains fully liable to the surety for whatever it pays. That is the whole difference, and every other feature of a bond follows from it.",
      ],
    },
    {
      heading: "Contractor license bonds",
      paragraphs: [
        "State contractor licensing boards require a license bond before a contractor can hold a licence in the classification they work in. The bond guarantees that the contractor will comply with the licensing law and the board's rules, and it gives a homeowner or a supplier who is harmed by a violation, such as abandoning a job, taking a deposit and not performing, or failing to pay for materials, a way to recover up to the bond amount. Each board sets the bond amount and the form by classification and by whether the contractor works residential or commercial, and publishes the current figures; the bond has to be filed with the board on its form and kept continuous, because a lapse suspends the licence.",
        "A claim against a license bond is paid by the surety to the claimant and then collected from the contractor with the surety's costs. A paid claim also makes the next bond harder and more expensive to obtain, so a dispute with a customer is worth resolving before it reaches the board.",
      ],
    },
    {
      heading: "Contract bonds: bid, performance and payment",
      paragraphs: [
        "Public agencies, and increasingly private owners and general contractors, require contract bonds on construction work. A bid bond guarantees that the low bidder will sign the contract and provide the further bonds if awarded the job. A performance bond guarantees that the contractor will complete the work according to the contract; if the contractor defaults, the surety finishes the job, pays for another contractor to finish it, or pays the owner the cost of completion up to the bond amount. A payment bond guarantees that subcontractors and suppliers will be paid, which is why they cannot lien public property. These bonds are underwritten on the contractor's financial statements, work in progress, bank line and history, and a surety's capacity for a contractor is expressed as a limit per job and in total.",
      ],
    },
    {
      heading: "Licence, permit, court and fiduciary bonds",
      paragraphs: [
        "Beyond contractors, many regulators require a bond as a condition of a licence or permit: a motor vehicle dealer bond, a mortgage broker bond, a notary bond, a freight broker bond, a bond for a business that collects sales tax or sells alcohol, a right-of-way permit bond for work in a city street. Each is written on the regulator's own form with its own amount, and most are renewed annually or for a multi-year term. Court bonds are required when someone asks a judge for a remedy that could harm the other side, such as an injunction or an appeal, and fiduciary bonds when a person is appointed to manage someone else's money as an executor, administrator, guardian or trustee; these guarantee faithful performance and are sized to the estate.",
      ],
    },
    {
      heading: "The indemnity agreement and what happens on a claim",
      paragraphs: [
        "Before a surety issues a bond it has the principal, and usually the owners personally and their spouses, sign a general indemnity agreement. It obliges them to reimburse the surety for any amount paid on the bond plus its investigation and legal costs, and it allows the surety to settle a claim it judges valid. On a claim, the surety investigates whether the principal failed the obligation; if it did, the surety pays the obligee and pursues the indemnitors. If the principal has a defence, the surety raises it. Understanding that a bond is a credit instrument with personal recourse is the point most applicants miss when they compare its premium to an insurance premium.",
      ],
    },
  ],
  covered: [
    "The obligee's loss when a licensed contractor violates the licensing law, up to the bond amount",
    "A project owner's cost to complete the work after a bonded contractor defaults",
    "Subcontractors and suppliers left unpaid on a bonded public job",
    "An owner's loss when a bid winner refuses to sign the contract",
    "A regulator's or consumer's loss from a bonded dealer, broker or notary failing a licence duty",
    "An estate's or ward's loss from a bonded fiduciary's misconduct",
  ],
  notCovered: [
    "Any loss of the principal's own: a bond pays the obligee, never the person who bought it",
    "Amounts above the bond's stated amount, which is a ceiling on the surety, not on the principal's liability",
    "Repayment relief: every amount the surety pays is collected from the principal and the indemnitors",
    "Injury or property damage caused by the work, which is general liability",
    "Faulty work or missed deadlines on a job that was not bonded",
    "Obligations under a form the obligee did not accept or a bond that lapsed before the claim",
  ],
  discounts: [
    { name: "Strong personal credit", description: "License, permit and small commercial bonds are rated almost entirely on the owner's credit score; a clean file gets the preferred rate tier." },
    { name: "Reviewed financial statements", description: "For contract bonds and larger commercial bonds, accountant-prepared statements and a clean work-in-progress schedule raise capacity and lower the rate." },
    { name: "Multi-year term", description: "Paying a license bond for two or three years at once, where the board allows it, at a lower total than annual renewals." },
    { name: "Claims-free bonding history", description: "No paid bond claims and no cancellations on the record the surety checks." },
    { name: "Placed alongside the business package", description: "Sureties that also write the contractor's liability and auto policies often price small bonds as an accommodation." },
  ],
  faqs: [
    {
      question: "If I pay the premium, why do I have to pay the claim back too?",
      answer: [
        "Because the premium is a fee for the surety's guarantee, not a transfer of the risk. Insurance pools losses across many policyholders and expects to pay some of them; a surety expects to pay nothing and, if it does, to be made whole by the principal under the indemnity agreement. The premium reflects that expectation, which is why a bond costs a small fraction of the amount it guarantees.",
      ],
    },
    {
      question: "Which bond does the licensing board want?",
      answer: [
        "The board's own form, in the amount set for your classification and licence type, naming the board as obligee. Each of the four state boards publishes its bond amounts and forms and changes them from time to time. Send us the licence application or renewal notice and we will match it; the wrong form or an old amount is returned at filing and delays the licence.",
      ],
    },
    {
      question: "Can I get bonded with poor credit?",
      answer: [
        "Usually, at a higher rate, and in some cases with collateral or a co-indemnitor. Sureties have programmes for applicants with credit problems, bankruptcies or tax liens, and the rate improves as the credit does. Being honest on the application matters more than the score itself; an undisclosed judgment found later is treated as misrepresentation.",
      ],
    },
    {
      question: "How much does a bond cost?",
      answer: [
        "A rate applied to the bond amount, set by the bond type and the applicant's credit and financials, for the term of the bond. For example, on a licence bond that guarantees ten thousand dollars, an applicant with good credit might pay a premium in the low hundreds of dollars for the year, while one with weak credit might pay several times that for the same bond. The bond amount itself is never the price, which is the most common confusion on a first application.",
      ],
    },
    {
      question: "What is the difference between a performance bond and builders risk or liability insurance?",
      answer: [
        "The performance bond guarantees to the owner that the contract will be completed; it pays the owner if the contractor defaults, and the contractor repays the surety. Liability insurance pays third parties injured by the work, and builders risk pays for damage to the structure while it is being built. A job usually needs all three, from three different products, and the contract's insurance and bonding sections list each separately.",
      ],
    },
    {
      question: "How long does a bond stay in force?",
      answer: [
        "License bonds run for a term and renew as long as the licence does, and most are continuous until cancelled with notice to the obligee. Contract bonds run until the work is accepted and any warranty period ends. Court and fiduciary bonds run until the court discharges them. A bond that is cancelled or allowed to lapse is reported to the obligee, which for a contractor means the board suspends the licence until a replacement is filed.",
      ],
    },
  ],
  relatedProducts: ["contractors-insurance", "general-liability-insurance", "business-owners-policy"],
  seo: { description: "What a surety bond is and how it differs from insurance: the principal, obligee and surety, contractor license bonds required by state licensing boards, contract bonds, court and fiduciary bonds and the indemnity agreement, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
