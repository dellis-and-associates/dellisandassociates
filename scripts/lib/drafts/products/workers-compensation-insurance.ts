import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Pays an employee's medical bills and part of their wages when they are hurt at work, whoever was at fault, and in return the employee generally cannot sue you. Arizona, Nevada, Utah and Idaho each require it at their own employee threshold and run the system differently.",
  intro: [
    "Workers' compensation is a bargain written into state law: an injured worker gets medical care and wage replacement without having to prove the employer was negligent, and the employer gets immunity from most lawsuits over that injury. The policy funds the employer's side of the bargain. It pays the medical bills in full, a share of lost wages after a waiting period, benefits for permanent impairment, retraining where the worker cannot return to the old job, and death benefits to dependants.",
    "Arizona, Nevada, Utah and Idaho each require employers to carry it, and each sets its own rule for when the requirement starts, which is a count of employees, a type of work or both; sole proprietors and partners are typically outside it unless they elect in, and corporate officers can sometimes elect out. Independent contractors are the trap: a state agency deciding after an injury that your contractor was really an employee makes you the uninsured employer, with penalties on top of the claim. We read your state's definition against how you actually work.",
    "The premium is payroll multiplied by a rate for each class code, the classification that describes the work being done, adjusted by an experience modifier once the business is large enough to earn one. A clerical worker and a roofer on the same payroll are rated many times apart. The analysis checks that your employees are in the right class codes, because misclassification is the commonest reason a premium is too high, and then prices the same payroll with the carriers we represent.",
  ],
  coverageBlocks: [
    { heading: "Medical benefits", paragraphs: ["The policy pays all reasonable medical treatment for a work injury or occupational illness, with no deductible and no copay for the worker, for as long as treatment is related to the injury. Which doctor the worker sees is governed by state rules: some states let the employer or carrier direct care initially, others let the worker choose. The carrier pays the provider directly, and the employee never receives a bill for covered care."] },
    { heading: "Wage replacement", paragraphs: ["After a waiting period set by the state, an employee who cannot work receives temporary disability payments, a fraction of their average weekly wage up to a state maximum, until they return to work or reach maximum medical improvement. Light-duty work reduces or ends these payments and is the single most effective thing an employer can do to hold down a claim; a return-to-work plan written before anyone is hurt is worth having."] },
    { heading: "Permanent disability and death benefits", paragraphs: ["When the worker reaches maximum medical improvement with a lasting impairment, the policy pays a permanent partial or permanent total disability benefit under a schedule set by the state. Vocational rehabilitation pays for retraining where the worker cannot go back to the old job. If a worker dies from a work injury, the policy pays funeral costs and a benefit to the surviving spouse and dependent children. These benefits are fixed by statute, and the policy pays whatever the state's schedule says with no limit chosen by you."] },
    { heading: "Employers liability", paragraphs: ["Part Two of the policy covers the lawsuits the exclusive-remedy bargain does not stop: a spouse's loss-of-consortium claim, a third-party suit where a manufacturer sued by your employee turns round and sues you, and claims in states where the injury falls outside the compensation system. It carries limits per accident, per employee for disease and per policy for disease, and contracts and umbrella carriers usually ask for higher limits than the standard ones."] },
    { heading: "Other states and the monopolistic exception", paragraphs: ["The policy lists the states where you have employees and pays under each state's law. Adding a state before you hire there matters, because a worker hired in Nevada and injured in Utah is a Utah claim. A few states, none of the four we serve, run monopolistic state funds where the coverage has to be bought from the state; Nevada, Utah, Idaho and Arizona all have competitive markets where private carriers and, in some, a state-chartered fund write the coverage."] },
  ],
  covered: [
    "Medical treatment for a workplace injury or occupational illness, with no deductible for the worker",
    "A share of lost wages after the state's waiting period",
    "Permanent impairment benefits under the state schedule",
    "Retraining when the worker cannot return to the old job",
    "Funeral costs and dependants' benefits after a work-related death",
    "Your defence and damages in lawsuits the exclusive remedy does not bar, under employers liability",
    "Injuries to employees working temporarily in another listed state",
  ],
  notCovered: [
    "Injuries from intoxication or a deliberate self-inflicted act, in most states",
    "Injuries on the commute to and from work, with exceptions for travel that is part of the job",
    "Independent contractors who genuinely meet the state's test, and their own workers",
    "Wages above the state maximum weekly benefit",
    "Fines and penalties for failing to carry coverage before the policy started",
    "Employees in a state not listed on the policy",
    "Owners and partners who have not elected coverage",
  ],
  discounts: [
    { name: "Experience modifier below one", description: "A claims history better than expected for your class reduces the rate for a business large enough to be experience-rated; a bad year raises it for three years." },
    { name: "Safety program credit", description: "Some states and carriers credit a written safety program, drug-free workplace policy or safety committee." },
    { name: "Scheduled credits", description: "Carrier underwriting credits for good housekeeping, training and return-to-work practices, applied at the underwriter's discretion." },
    { name: "Pay-as-you-go billing", description: "Not a rate cut, but reporting payroll each pay period instead of estimating removes the audit bill and the deposit." },
    { name: "Correct classification", description: "Splitting payroll between clerical and field class codes where the records support it, so office staff are not rated as tradespeople." },
  ],
  faqs: [
    { question: "Do I need it if I only have one or two employees?", answer: ["Probably, and each state answers differently. Arizona, Nevada, Utah and Idaho each set an employee count or a type of employment at which the requirement starts, and some start at the first hire. Family members, part-timers and casual labour count in some states and not others. Rather than reading the numbers off a website, tell us who works for you and how they are paid and we will apply the state's rule; the cost of a policy for a small payroll is usually modest against the penalty for being uninsured when someone is hurt."] },
    { question: "Can I cover myself as the owner?", answer: ["In the four states a sole proprietor or partner is generally outside the system and can elect in; corporate officers and LLC members are generally inside and can sometimes elect out. Electing out saves premium on your own wages but leaves your own injuries to your health plan and disability policy, which may exclude work injuries. A general contractor will often demand that subs cover their owners, because an uninsured sole proprietor hurt on site can become the GC's claim."] },
    { question: "What is an experience modifier?", answer: ["A number that compares your business's claims over a look-back window with what is expected for the same class codes and payroll. A modifier of one is neutral; above one raises the premium, below one lowers it. Frequency counts for more than severity: several small claims move the modifier more than one large one. Suppose your class rates produce a $10,000 manual premium; a modifier of 0.85 would bring it to $8,500 and a modifier of 1.20 to $12,000, which is why a return-to-work program pays for itself."] },
    { question: "What happens if I hire a subcontractor without insurance?", answer: ["In each state, the subcontractor's employees can become your employees for compensation purposes if the sub has no policy, and the auditor will charge you premium on the sub's payroll at the end of the term. Collecting a certificate of insurance from every sub before they start, and keeping it on file, is what keeps their payroll off your audit and their injuries off your policy."] },
    { question: "How do I report a claim?", answer: ["Get the worker treated, then report it to the carrier the same day, whatever you think of the injury. Every state sets a deadline for the employer's first report, and late reporting is penalised. Early reporting also lowers the eventual cost: claims reported promptly close faster, and the carrier's nurse case manager can direct care from the start. The claims page on this site lists what to have ready."] },
  ],
  relatedProducts: ["general-liability-insurance", "business-owners-policy", "commercial-auto-insurance", "contractors-insurance"],
  seo: { description: "How workers' compensation works for a small employer in Arizona, Nevada, Utah and Idaho: medical and wage benefits, class codes and the experience modifier, owner elections, subcontractors and audits, from an independent agency." },
};
