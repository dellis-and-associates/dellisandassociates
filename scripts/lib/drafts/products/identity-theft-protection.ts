import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Pays the cost of putting your identity back together after someone uses it: legal fees, lost wages, certified mail, replacement documents, and a case manager who makes the calls. Sold as an endorsement on a home or renters policy or as a standalone service with monitoring.",
  intro: [
    "Identity theft is someone opening credit, filing a tax return, claiming benefits or renting an apartment in your name. The money they take is usually not the largest cost; banks and card issuers reverse fraudulent charges under consumer protection rules, and a stolen card is closed in a phone call. The cost is the months afterward: disputing accounts with three credit bureaus, affidavits, notarised letters, time off work to appear at a bank or a courthouse, and a legal bill when a collector or a court does not accept that it was not you.",
    "The insurance is built around that aftermath. An identity theft endorsement on a home, condo or renters policy reimburses the expenses of restoring your identity up to a modest limit, and many carriers now include a restoration service, a case manager with a limited power of attorney who works the disputes for you. Standalone services add credit and dark-web monitoring, alerts, and a larger expense limit, for a monthly fee.",
    "What it does not do is refund the money taken from an account, which is the bank's job under federal and state rules, or prevent the theft in the first place. A credit freeze at each bureau costs nothing, stops new accounts from being opened, and does more to prevent the loss than any policy; the recommendation from this desk is to freeze first and insure the aftermath second.",
    "The cost is set by whether it is an endorsement or a standalone plan, the expense limit, whether monitoring and restoration are included, and the number of people covered. On an endorsement it is a small line on the home policy, and the analysis simply checks whether you already have it.",
  ],
  coverageBlocks: [
    { heading: "Expense reimbursement", paragraphs: ["The core of every form is a list of out-of-pocket costs paid back up to the limit: attorney fees to defend a suit or clear a wrongful arrest, the cost of re-filing loan applications rejected because of the theft, notary and certified mail fees, long-distance calls, the fees for credit reports, and lost wages for the time taken off to do the work, usually capped per day and per claim. Some forms add the cost of replacing a driver's licence, passport or Social Security card and of childcare during the restoration."] },
    { heading: "Restoration services", paragraphs: ["Restoration is the part that saves the most hours. A case manager, employed by the carrier or a service it contracts, takes a limited power of attorney and does the disputes with the bureaus, the creditors, the collection agencies and the government agencies, tracking each until the record is corrected. On a claim that runs for months, having someone whose job is to sit on hold is worth more than the reimbursement limit on most endorsements."] },
    { heading: "Monitoring and alerts", paragraphs: ["Standalone services watch credit files at the bureaus, public records, change-of-address filings and the dark-web markets where stolen data is sold, and send an alert when something moves. Monitoring does not stop anything; it shortens the time between the theft and your knowing about it, which is what limits the damage. A credit freeze prevents new accounts outright, and the two work together rather than as substitutes."] },
    { heading: "Tax, medical and criminal identity", paragraphs: ["The broader forms extend to the varieties of theft that the credit bureaus never see: a fraudulent tax return filed in your name to take the refund, medical services billed to your health plan by someone using your card, and an arrest or citation recorded against your name because someone gave it to an officer. Each takes a different kind of work to undo, and the case manager's experience with the IRS and the courts is the coverage."] },
    { heading: "Family coverage", paragraphs: ["Endorsements usually cover every resident of the household; standalone plans price by individual or family and can include children, whose clean credit files make them a target, and elderly parents. A child's identity theft often goes unnoticed until the first credit application, so the monitoring on a family plan is the part with real value for that member."] },
  ],
  covered: [
    "Attorney fees to clear a suit, judgment or wrongful arrest tied to the theft",
    "Lost wages for time taken off to restore your identity, within a daily limit",
    "Notary, certified mail, phone and credit report fees",
    "Re-application fees on loans declined because of the fraud",
    "A case manager who works the disputes under a power of attorney",
    "Replacement of a driver's licence, passport or other documents",
    "Fraudulent tax, medical and criminal records, on the broader forms",
  ],
  notCovered: [
    "Money stolen from your accounts or charged to your cards (recovered from the bank or issuer)",
    "Losses from a scam you paid voluntarily, such as a wire to a fraudster",
    "Business, professional or commercial identity theft",
    "Theft by a household member or someone you gave your credentials to, on many forms",
    "A theft you knew about before the coverage started",
    "Monitoring services you bought on your own outside the plan",
    "Fines, penalties and the underlying debt itself",
  ],
  discounts: [
    { name: "Endorsement rather than standalone", description: "Adding the coverage to a home, condo or renters policy costs a fraction of a standalone plan; the trade is a smaller limit and often no monitoring." },
    { name: "Family plan", description: "One plan covering the household costs less per person than individual plans." },
    { name: "Annual billing", description: "Standalone services price a year paid up front below the monthly rate." },
    { name: "Employer or membership benefit", description: "Some employers, credit unions and card issuers include a restoration or monitoring service; checking before buying avoids paying twice." },
    { name: "Included with the carrier's package", description: "Some home carriers include a basic identity theft benefit at no additional premium on their upper-tier package." },
  ],
  faqs: [
    { question: "Does this replace the money someone stole from my bank account?", answer: ["No. Fraudulent card charges and unauthorised transfers are reversed by the bank or card issuer under federal consumer rules, and the sooner you report, the fuller the protection. The policy pays the costs around the theft, not the theft. Where a bank declines to reverse a transfer you were tricked into sending yourself, neither the bank nor the policy responds, and that is the growing category of loss."] },
    { question: "I have a credit freeze. Do I need this?", answer: ["A freeze stops new credit accounts, which is the most common form of theft, and it costs nothing at any bureau. It does not stop a fraudulent tax return, a medical claim, or someone using an existing account. If you already have the freeze and an endorsement on your home policy, the recommendation is usually to keep both and skip the standalone plan; the analysis reads the endorsement's limit and services and says whether that holds for you."] },
    { question: "Is the endorsement on my home policy enough?", answer: ["For a household that freezes its credit and checks its statements, usually yes. The endorsement's expense limit is modest, but the restoration service that comes with most of them is where the value is. A person with a complex financial life, a business, or a prior theft benefits more from a standalone plan's larger limit and monitoring."] },
    { question: "What do I do first if my identity is stolen?", answer: ["Freeze your credit at every bureau, file a report with the Federal Trade Commission at https://www.identitytheft.gov/ and with the local police, place fraud alerts, and call the carrier or service to open the claim so the case manager can begin. Keep a log of every call, letter and hour, because reimbursement is paid against receipts and time records."] },
    { question: "Does it cover my children?", answer: ["Household endorsements typically cover every resident relative, including children; standalone family plans list each member. A minor's identity is valuable because nothing checks it for years, so parents should freeze the child's credit at each bureau, which is allowed and costs nothing, and rely on the plan for the clean-up if something was already done."] },
  ],
  relatedProducts: ["home-insurance", "renters-insurance", "cyber-liability-insurance", "umbrella-insurance"],
  seo: { description: "Identity theft protection explained: expense reimbursement, restoration case managers, monitoring, what a home policy endorsement includes, what a standalone plan adds, and why a credit freeze comes first. Independent agency in Arizona, Nevada, Utah and Idaho." },
};
