import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Workers' compensation insurance explained: a beginner's guide",
  excerpt: "Workers' compensation is a trade: injured employees get medical care and partial wages without proving fault, and generally cannot sue the employer. Who must carry it, what it pays, how payroll, class codes and the experience mod set the premium, and why an uninsured subcontractor is your problem.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Workers' compensation is the oldest bargain in commercial insurance. An employee hurt on the job is paid for medical treatment and for part of the wages lost while recovering, without having to prove the employer did anything wrong. In exchange, the employee generally gives up the right to sue the employer for the injury. The policy that funds the employer's side of that bargain is workers' compensation insurance, and in each of Arizona, Nevada, Utah and Idaho it is required of most employers once they have employees at all.",
        "Because it is required and because the benefits are set by each state rather than by the policy, the coverage itself is close to identical from carrier to carrier. What differs is the price and the service: how the premium is calculated, how claims are handled, and how well the carrier helps an injured worker back to work. This guide explains the mechanism so that the comparison makes sense.",
      ],
    },
    {
      heading: "Who has to carry it",
      paragraphs: [
        "Each of the four states sets its own threshold for when an employer must have coverage, its own rules on whether sole proprietors, partners, LLC members and corporate officers are counted as employees or may elect out, and its own penalties for going without: {{TODO:statute.arizona.workers-comp-threshold}}, {{TODO:statute.nevada.workers-comp-threshold}}, {{TODO:statute.utah.workers-comp-threshold}}, {{TODO:statute.idaho.workers-comp-threshold}}. The pattern is that the threshold is low, often the first employee, and the exemptions for owners are elections that have to be filed rather than assumptions.",
        "Some of the four states have a state-affiliated fund that competes alongside private carriers, and every one has an assigned-risk mechanism for employers no voluntary carrier will write. Domestic workers, some agricultural labour and casual labour are treated differently by state. If you are unsure whether a particular arrangement counts, the safe assumption is that it does; the cost of being wrong is that an injury becomes an uninsured lawsuit with the fault defences stripped away.",
      ],
    },
    {
      heading: "What the policy pays: the two parts",
      paragraphs: [
        "Part One of the policy pays the benefits the state sets, whatever they are, with no policy limit. That covers medical treatment for the injury or occupational illness, wage replacement while the worker cannot work, benefits for permanent impairment, vocational retraining where the worker cannot return to the old job, and death benefits to dependants. The wage benefit is a fraction of the worker's pre-injury earnings, computed from an average weekly wage over a lookback period, and is subject to state maximums and a short waiting period before it begins.",
        "Part Two, employer's liability, pays for the cases that fall outside the bargain: a spouse's claim for loss of consortium, a suit by a third party who was sued by the employee and turns to the employer, or a claim in a state where the employee can sue for an intentional act. Part Two carries limits, shown on the declarations page as three figures for each accident, each employee for disease, and the policy aggregate for disease. Lenders and general contractors sometimes ask for these to be raised.",
      ],
    },
    {
      heading: "The vocabulary of a claim",
      paragraphs: ["The benefit categories have their own names, and they show up on claim letters and the experience rating worksheet."],
      bullets: [
        "Temporary total disability: wage replacement while the worker cannot work at all but is expected to recover.",
        "Temporary partial disability: the difference in wages when the worker returns to lighter or shorter work during recovery.",
        "Maximum medical improvement: the point at which the treating physician says the condition has stabilised; permanent benefits are assessed from here.",
        "Permanent partial disability: a scheduled or rated award for a lasting impairment that still allows work.",
        "Permanent total disability: long-term wage benefits where the worker cannot return to any suitable employment.",
        "Independent medical examination: a second opinion the carrier can require when treatment or the impairment rating is in question.",
      ],
    },
    {
      heading: "How the premium is calculated",
      paragraphs: [
        "The premium starts from payroll. Each job in the business is assigned a classification code that reflects how dangerous the work is; a roofer and the roofer's bookkeeper are different codes even at the same company. Each code has a rate per hundred dollars of payroll, filed with the state or set by the carrier from a rating bureau's loss costs. Payroll in each code multiplied by the rate gives the manual premium. That figure is then multiplied by the experience modification factor, and adjusted by schedule credits or debits the underwriter applies for safety programmes, drug testing, and the like.",
        "Suppose a small landscaping firm has $300,000 of field payroll in a code rated at $8.00 per hundred and $60,000 of clerical payroll rated at $0.30 per hundred. Manual premium is $24,000 plus $180, or $24,180. With an experience mod of 0.90 the premium falls to about $21,760; with a mod of 1.25 it rises to about $30,225. Those are round hypothetical figures, but they show why the mod is the number an owner should care about: it is the one that reflects the company's own claims, and it is the one the company can change.",
        "The policy is auditable. The premium at inception is based on estimated payroll; after the year ends the carrier audits actual payroll, checks that each employee was in the right class, and bills or refunds the difference. Overtime premium pay, certain bonuses and some benefits are excluded from the payroll base under most rules; ask what counts before the audit rather than during it.",
      ],
    },
    {
      heading: "The experience mod, and how to lower it",
      paragraphs: [
        "The experience modification factor compares your claims over a three-year window, excluding the most recent year, to what the rating bureau expects from a business of your size and class. A mod of 1.00 means expected; below it earns a credit, above it a surcharge. The formula weighs the number of claims more heavily than their total cost, so several small claims raise the mod more than one large one, and medical-only claims are usually discounted in the calculation.",
        "That formula points at the practical levers. Report every injury promptly, since late reporting raises cost. Have a return-to-work programme with light-duty assignments, because a claim that pays medical only and no lost wages is counted at a fraction of its weight. Investigate incidents and fix the cause. A high mod follows the business for three years, and general contractors in the four states often refuse to hire subcontractors above a stated mod, which makes it a bidding issue as well as a premium issue.",
      ],
    },
    {
      heading: "Subcontractors, 1099 workers and the audit surprise",
      paragraphs: [
        "The commonest unpleasant audit finding is uninsured subcontractors. If you paid a subcontractor who did not carry workers' compensation of their own, most states and most policies treat their payroll as yours for premium purposes and, worse, treat their injured workers as your employees for claim purposes. Calling someone a 1099 contractor does not settle the question; the tests are about control, tools, the nature of the work and whether they hold themselves out as an independent business, and they vary by state.",
        "The defence is paperwork. Collect a certificate of insurance from every subcontractor before they start, showing workers' compensation in force, and keep it with the contract. Where an owner-only subcontractor has legitimately elected out of coverage, obtain the state exemption document, and understand that in some states an exemption protects the sub from having to buy coverage without protecting you from the sub's injury. Where the sub cannot produce either, the cost of their payroll will be on your audit.",
      ],
    },
    {
      heading: "What it does not cover",
      paragraphs: [
        "Injuries outside the course of employment, including the commute in most circumstances, are not covered. Self-inflicted injuries, injuries while intoxicated, and injuries from horseplay are commonly disputed. Independent contractors who genuinely are independent are outside the policy. Employees working in a state not listed on the policy may be uncovered or covered only under an other-states provision; a Utah firm sending crews to Idaho should list Idaho. Federal workers, longshore workers and railway employees fall under federal schemes rather than state policies.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Pull three documents: the current declarations page with its class codes and estimated payrolls, the most recent experience rating worksheet, and the last audit. Check that the class codes match what people actually do, that the estimated payroll is honest, and that every subcontractor from the last year has a certificate on file. That is the analysis. We run it against the carriers we represent in Arizona, Nevada, Utah and Idaho, including the state-affiliated funds where they compete, and if the current carrier's price and claims service are right for the class, we say so.",
      ],
    },
  ],
  relatedProducts: ["workers-compensation-insurance", "general-liability-insurance", "contractors-insurance", "business-owners-policy"],
  relatedArticles: ["how-to-get-workers-comp-coverage-for-1099-contractors", "starting-a-small-business-insurance-basics", "general-liability-insurance-explained-a-beginner-s-guide", "how-to-get-bonded-as-a-contractor", "how-to-read-a-certificate-of-insurance"],
  relatedTerms: ["experience-modification-rate", "average-weekly-wage", "temporary-total-disability", "return-to-work-program", "manual-rate", "maximum-medical-improvement", "certificate-of-insurance"],
};
