import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to get workers comp coverage for 1099 contractors",
  excerpt: "The tax form does not decide who is an employee for workers compensation; the state's test does, applied after the injury. How to sort the people you pay, collect the certificates and waivers that keep them off your premium, cover the ones you cannot exclude, and pass the audit.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A business that pays people on a 1099 usually believes it has no workers compensation exposure for them. The workers compensation system in Arizona, Nevada, Utah and Idaho does not work that way. Whether an injured worker is an employee is decided by the state's own test, which looks at who controls the work, who supplies the tools, whether the worker has other customers and whether the work is part of your regular business, and the test is applied by a claims examiner or an administrative judge after someone has been hurt. If the answer is employee, the hiring business owes the medical bills and the wage benefits, and if it had no policy it pays them itself and can face penalties on top.",
        "The carrier looks at the same question from the other side. At the end of the policy year it audits your payroll, and any money paid to a subcontractor who cannot produce their own certificate of insurance is added to your payroll and charged premium as though they were on staff. So the problem has two halves: the injury you might owe for, and the premium you will be charged either way. The steps below deal with both.",
      ],
    },
    {
      heading: "What to gather first",
      paragraphs: ["Sort the paper before deciding anything; the answer is usually visible in it."],
      bullets: [
        "A list of everyone you paid on a 1099 in the past year, with what they did, how much you paid them and whether they worked under your direction or on their own schedule.",
        "Written agreements with each of them, if any exist, and any evidence they hold themselves out as a business: a contractor's licence, a business name, other clients, their own tools and vehicle.",
        "Certificates of insurance you already hold from subcontractors, with the dates checked to see which have expired.",
        "Your current workers compensation policy and the last audit worksheet, which shows what the carrier already charged for uninsured subcontractors.",
        "Your general liability policy, because the subcontractor question appears there too and the certificates you collect serve both.",
        "The contracts you work under, since a general contractor or a customer often specifies what coverage your subcontractors have to show.",
      ],
    },
    {
      heading: "Step one: sort the people you pay into three groups",
      paragraphs: [
        "The first group is the genuine independent business: a licensed electrician who bids your jobs, brings a crew, invoices from a company and works for a dozen other contractors. The second is the sole proprietor who works largely alone, on your schedule, with your equipment, and has no other clients to speak of, but is paid on a 1099 because that was convenient. The third is the person who is plainly an employee by any test and is being paid as a contractor anyway.",
        "Each state's test weighs the factors differently, and Idaho's Industrial Commission, Nevada's Division of Industrial Relations, Utah's Labor Commission and the Industrial Commission of Arizona each publish how they decide. But the direction is the same everywhere: the more you control how, when and where the work is done, and the more the work looks like the core of your business, the more likely the person is your employee for compensation purposes regardless of the tax form. Be honest about the second and third groups now; a claims examiner will be.",
      ],
    },
    {
      heading: "Step two: collect certificates from the genuine businesses",
      paragraphs: [
        "For the first group, the work is to prove to your carrier at audit that each subcontractor carried their own workers compensation for the period you paid them. Ask for a certificate of insurance before the first payment and again at each renewal date on the certificate, and keep them filed by subcontractor and year. Read the certificate: the workers compensation section should show a carrier, a policy number and dates that cover your job, and the insured name should match the name on the invoices. A certificate showing only general liability does nothing for the workers compensation audit.",
        "Where a subcontractor is a sole proprietor with no employees who has legitimately excluded themselves from coverage, the states offer different paperwork. Arizona has a signed declaration by which a sole proprietor or independent contractor acknowledges they are not your employee and are not covered by your policy; Utah issues a coverage waiver through its Labor Commission to qualifying owners without employees; Nevada and Idaho apply their own exemption rules for owners. The form does not by itself make the person an independent contractor if the facts say otherwise, but a carrier will usually accept it at audit in place of a certificate, and it is a clear record that both sides understood the arrangement. Ask us which document applies in the state where the work is done, and keep the original.",
      ],
    },
    {
      heading: "Step three: cover the ones you cannot exclude",
      paragraphs: [
        "For the second and third groups, the practical choice is to accept that they are employees for compensation purposes and put them on your policy. This means reporting what you pay them as payroll in the class code for the work they do, so the carrier prices the exposure up front rather than surprising you at audit. It also means the injury is covered: the worker gets medical care and wage benefits from the carrier, and in exchange the exclusive-remedy rule bars them from suing you for the injury, which is the trade the whole system is built on. A business that has no policy loses both halves of that trade.",
        "If your business has no employees at all except subcontractors, and a customer or general contractor still demands a workers compensation certificate, carriers write a minimum-premium policy on which the owner excludes themselves and the payroll is reported as zero. It exists to produce a certificate and to be there if a subcontractor is later deemed your employee. Ask what it covers and what it does not before relying on it, and expect the carrier to audit it like any other policy.",
        "Where subcontractors have their own employees, the general contractor is treated in most states as the statutory employer of those workers if the subcontractor is uninsured, which is another reason to collect certificates from every tier and to write the requirement into your subcontract.",
      ],
    },
    {
      heading: "Step four: prepare for the audit",
      paragraphs: [
        "At the end of the policy year the carrier asks for payroll records, tax filings and a list of subcontractors with amounts paid. Have the certificates and waivers organised by name so that each payment on the list is matched to a document. Payments to subcontractors who supplied materials as well as labour can be split, with only the labour portion charged, if the invoices show the split; a lump-sum invoice is charged in full. Where a subcontractor's certificate lapsed part way through the year, the payments in the uncovered months are charged and the rest are not.",
        "The audit also sets the record that feeds your experience modification rate, so a claim by a misclassified worker affects your premium for years. Getting the classification right in advance is cheaper than arguing with an auditor afterwards, and far cheaper than paying a claim with no policy behind it.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: ["The pattern in audits and claims that go badly is nearly always one of these."],
      bullets: [
        "Assuming the tax form settles the question. It settles nothing for workers compensation.",
        "Collecting a certificate once and never again; a certificate is a snapshot, and coverage cancelled the following month does not show on it.",
        "Accepting a general liability certificate as proof of workers compensation.",
        "Relying on a signed waiver from someone who works only for you, on your schedule, with your tools; the form will not survive a contested claim.",
        "Declining to carry any policy because there are no W-2 employees, then being deemed the employer of an injured subcontractor with no coverage in place.",
        "Paying subcontractors in cash or without invoices, which leaves the auditor no way to separate labour from materials and no way to match payments to certificates.",
        "Forgetting that a general contractor's contract may require your subcontractors to be insured to a stated standard, and that your certificate can be rejected when theirs is missing.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a Mesa flooring installer with no W-2 staff pays four people on a 1099 over a year: $60,000 to a licensed tile company with its own crew and policy, $30,000 to a carpet installer who runs his own business and holds an Arizona sole proprietor declaration, and $45,000 each to two installers who work only for her, on her schedule, in her van. She carries a workers compensation policy with an owner exclusion and reports the two full-time installers as $90,000 of payroll in the flooring class code, and say the premium comes to $7,200 for the year. At audit, the tile company's certificate and the carpet installer's declaration are on file, so their $90,000 is not charged. Had she reported zero payroll and collected nothing, the auditor would have added all $180,000 and billed an additional premium of roughly $14,400, and an injury to either van installer would have been her personal debt. The figures are hypothetical; the arithmetic is not.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Send us the list of people you pay, how you pay them and the certificates you hold, and we will sort them into the three groups, tell you which state form fits each sole proprietor, and price a policy that reports the exposure honestly across the carriers we represent in Arizona, Nevada, Utah and Idaho. If every subcontractor is a genuine business with a current certificate and your existing policy already reflects that, the finding is that you need nothing new beyond a calendar reminder for renewal dates.",
      ],
    },
  ],
  relatedProducts: ["workers-compensation-insurance", "contractors-insurance", "general-liability-insurance"],
  relatedArticles: ["workers-compensation-insurance-explained-a-beginner-s-guide", "how-to-read-a-certificate-of-insurance", "how-to-insure-a-new-business-in-its-first-year", "contractors-insurance-explained-a-beginner-s-guide", "how-to-get-bonded-as-a-contractor"],
  relatedTerms: ["certificate-of-insurance", "experience-modification-rate", "manual-rate", "workers-compensation-subrogation", "waiver-of-subrogation"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
