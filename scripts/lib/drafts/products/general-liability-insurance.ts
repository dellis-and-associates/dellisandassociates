import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Pays when your business is blamed for injuring someone or damaging their property, and pays the lawyer whether or not the claim has merit. It is the policy landlords, general contractors and clients ask to see a certificate for before they let you on site or sign the lease.",
  intro: [
    "General liability is the base layer of commercial insurance: it responds when someone outside the business claims you caused them bodily injury or property damage, or harmed them through your advertising or by injuring their reputation. A customer who trips on a cord in your shop, a plumber who floods the unit below the one being worked on, a landscaper whose mower throws a stone through a window: each is a general liability claim. The policy pays the injured party what you legally owe, up to the limit, and pays your defence costs on top of the limit under most forms.",
    "Nobody is made to carry it by statute in the four states, and almost everyone is made to carry it by contract. Commercial leases, general contractors' subcontract agreements, municipal permits, vendor agreements with larger companies and event venues all require it and name the limits they want, and they ask for a certificate of insurance proving it before the work starts or the keys are handed over.",
    "The premium is rated on what the business does, measured by payroll, sales or square footage depending on the class, plus the limits chosen and the claims history. A consultant working from a home office and a roofing contractor are both general liability risks and are priced a long way apart. The analysis reads the contracts you are being asked to satisfy, checks the limits and endorsements they require against your policy, and tells you which requirements you already meet.",
  ],
  coverageBlocks: [
    { heading: "Bodily injury and property damage", paragraphs: ["Coverage A pays sums you become legally obligated to pay for injury to a person or damage to property that happens during the policy period and arises from your premises, your operations, your products or your completed work. The trigger is an occurrence, an accident, including continuous exposure to the same harmful condition. Injury to your own employees is excluded here; that belongs to workers' compensation. Damage to property you own, rent or are working on is excluded too, which is why contractors carry separate coverage for the thing they are building."] },
    { heading: "Products and completed operations", paragraphs: ["Once you have handed over the work or the product, a claim that it later caused injury or damage falls under products-completed operations. A deck that collapses a year after the carpenter finished, a bakery's product that sickens a customer, an electrician's wiring that causes a fire: all are completed operations claims, and they are the ones that follow a contractor for years after the job. Some carriers exclude or restrict this coverage for certain trades, and a general contractor's certificate request will usually ask for it by name."] },
    { heading: "Personal and advertising injury", paragraphs: ["Coverage B pays for offences rather than accidents: libel, slander, wrongful eviction, invasion of privacy, misuse of another company's advertising idea, and infringing a copyright or slogan in your own advertising. It is the part of the policy that responds to a defamation claim over a social media post or a dispute with a former tenant, subject to exclusions for knowing falsehood and for businesses in advertising, publishing and web design, which need a media policy instead."] },
    { heading: "Medical payments", paragraphs: ["Coverage C pays small medical bills for a member of the public injured on your premises or by your operations without anyone having to prove you were at fault. It is a goodwill coverage with a low limit per person, meant to settle a sprained ankle before it becomes a lawsuit; it does not apply to employees or to your own household."] },
    { heading: "Limits, aggregates and certificates", paragraphs: ["The policy carries a per-occurrence limit and an annual general aggregate that caps everything the policy pays in a year, with a separate aggregate for products-completed operations. Contracts ask for both, and they often ask for endorsements: additional insured status for the landlord or general contractor, a waiver of subrogation, and primary and non-contributory wording that puts your policy ahead of theirs. A certificate of insurance is a one-page summary the agency issues to a third party showing your limits and endorsements; it does not change the policy, and we issue them at no charge for the businesses we insure."] },
  ],
  covered: [
    "Injuries to customers, visitors and other members of the public on your premises",
    "Damage you cause to a client's property while working there",
    "Injury or damage caused by your product or completed work after delivery",
    "Defence costs, including for claims that go nowhere",
    "Libel, slander and copyright infringement in your advertising",
    "Small medical bills for a member of the public injured on site, without proof of fault",
    "Fire damage to a rented premises, up to a separate sub-limit",
  ],
  notCovered: [
    "Injuries to your own employees, which belong to workers' compensation",
    "Your professional advice or a mistake in the work product itself, which belong to professional liability",
    "Vehicles while driven on the road, which belong to commercial auto",
    "Damage to your own property, tools and stock",
    "Faulty workmanship itself, as opposed to damage the faulty work causes",
    "Pollution, asbestos and liquor liability without an endorsement",
    "Intentional acts and claims you knew about before the policy started",
    "Data breaches and cyber events",
  ],
  discounts: [
    { name: "Bundled business owners policy", description: "Packaging general liability with property in a BOP usually costs less than buying both standalone, for businesses that qualify." },
    { name: "Claims-free history", description: "Several years without a liability claim earns a credit on the base rate." },
    { name: "Safety and contract practices", description: "Written safety programs, signed subcontractor agreements and collecting certificates from your own subs lower the rate for contractors." },
    { name: "Paid in full", description: "Paying the annual premium up front avoids instalment fees and sometimes earns a credit." },
    { name: "Accurate audit records", description: "Not a discount but a saving: correct payroll and sales figures at audit avoid the additional premium a carrier charges when estimates were low." },
  ],
  faqs: [
    { question: "What limits does a landlord or general contractor usually ask for?", answer: ["Contracts name a per-occurrence figure and an aggregate, and the figures vary with the size of the job and the counterparty; larger general contractors and public bodies ask for more, and often for an umbrella above the general liability policy. Bring us the contract before signing it. Meeting a requirement is usually a matter of an endorsement or a limit increase that costs less than losing the job, and sometimes the requirement is one we can push back on with the counterparty."] },
    { question: "What is a certificate of insurance and how do I get one?", answer: ["A certificate is a standard one-page form, issued by the agency on the carrier's behalf, that lists your policies, limits, effective dates and any endorsements naming the certificate holder as additional insured. It is evidence of coverage on the day it is issued, nothing more. Send us the requester's name, address and the wording their contract requires, and we issue it, usually the same working day; requests that need an endorsement first take longer because the carrier has to add it."] },
    { question: "Does general liability cover my work if it is faulty?", answer: ["It covers the damage faulty work causes to other property, not the cost of redoing the work itself. If a tile setter's shower leaks and ruins the ceiling below, the ceiling is covered and the shower is not. That gap is the reason contractors carry the coverage and also stand behind their own warranty; a builder's risk or installation floater covers the work in progress, and a surety bond is what a client asks for when they want the work itself backed."] },
    { question: "I work from home. Do I still need it?", answer: ["If clients visit, if you visit them, if you sell a product or if a contract asks for it, yes. A homeowners policy excludes most business liability, so a client injured at your kitchen-table office or a product you sell online are both uninsured without a commercial policy. A sole consultant who never meets clients in person has a smaller exposure and may be served by a BOP or by professional liability alone; the analysis says which."] },
    { question: "What is an additional insured and why is everyone asking to be one?", answer: ["An additional insured is a person or company added to your policy by endorsement so that your policy defends and pays for claims against them arising out of your work. Your landlord wants it so a customer injured in your unit is your claim, not theirs; a general contractor wants it so an injury on site caused by your crew lands on your policy first. Blanket additional insured endorsements grant the status automatically to anyone your contract requires, which saves issuing a new endorsement for each job."] },
    { question: "What happens at audit?", answer: ["Because the premium is rated on payroll or sales, the carrier estimates at the start of the term and audits at the end, asking for the real figures. If you grew, you owe additional premium; if you shrank, you get some back. Uncooperative audits are charged at a multiple of the estimate on some policies, so answering the audit is worth doing even when the result is a bill."] },
  ],
  relatedProducts: ["business-owners-policy", "workers-compensation-insurance", "commercial-umbrella-insurance", "contractors-insurance", "professional-liability-eo-insurance"],
  seo: { description: "What general liability insurance pays for a small business: bodily injury, property damage, completed operations and advertising injury, plus certificates of insurance and additional insured endorsements, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
