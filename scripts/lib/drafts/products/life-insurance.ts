import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Pays a lump sum to the people you name when you die, generally free of income tax, so that the income, the mortgage and the plans that depended on you continue. Term covers a period; permanent covers a lifetime and builds cash value. Which one, and how much, is arithmetic rather than instinct.",
  intro: [
    "A life policy is a contract: you pay premiums, and when you die the carrier pays the death benefit to your beneficiaries. The benefit is a fixed amount named on the policy, paid directly to the people you name without passing through probate, and generally not counted as income to them. What the policy is for decides how large it should be and how long it should last: replacing a salary until the children are independent, paying off a mortgage, funding a business buyout, covering estate taxes, or simply paying for a funeral.",
    "There are two families of policy. Term life covers a set number of years at a level premium, pays only if you die in that period, and builds no value; it is the least expensive way to buy a large benefit for the years a household depends on an income. Permanent life, which includes whole life and indexed universal life, is designed to stay in force for your whole life, costs several times as much for the same benefit, and accumulates cash value that can be borrowed or withdrawn.",
    "The premium is set by underwriting: your age, sex, health history, tobacco use, family history, driving record, occupation and hobbies, the amount and term chosen, and the carrier's own pricing. Two carriers can put the same applicant in different rate classes, so a life application is worth shopping across several carriers before it is submitted, because an application that draws a poor class becomes part of the record.",
    "The analysis starts with what the benefit has to do, arrives at an amount and a duration, and prices the policy type that fits across the carriers we represent. If the group coverage at work and the savings you already have cover the need, that is what you are told.",
  ],
  coverageBlocks: [
    { heading: "Term life", paragraphs: ["Term pays the death benefit if you die within the term, most often ten, twenty or thirty years, at a premium that stays level for the whole term. At the end of the term the policy either ends or renews annually at a much higher premium. Most term policies can be converted to a permanent policy from the same carrier without new underwriting during a conversion window, which is the feature to check if health may change. It is the right product for the mortgage, the children's years and the working life."] },
    { heading: "Whole life", paragraphs: ["Whole life stays in force as long as premiums are paid, at a premium fixed at issue, with a guaranteed death benefit and a guaranteed cash value that grows on a schedule printed in the contract. A mutual carrier may add dividends, which are not a guarantee but have a long record. It costs the most per dollar of benefit and suits needs that never expire: estate liquidity, a special-needs dependant, a business succession plan, or a person who wants a forced-savings vehicle with a death benefit attached."] },
    { heading: "Indexed universal life", paragraphs: ["Indexed universal life is a flexible-premium permanent policy whose cash value earns interest tied to a market index, subject to a cap and a floor set by the carrier, without the money being invested in the market directly. Premiums can be raised, lowered or skipped within limits, and the policy's internal charges for the cost of insurance rise with age, so a policy funded at the minimum can lapse late in life. Illustrated values are projections, not promises, and the guaranteed minimum column of the illustration is the one to read first."] },
    { heading: "Riders", paragraphs: ["Riders bolt extra features onto the base policy. An accelerated death benefit pays part of the benefit early on a terminal diagnosis and is often included at no cost; a waiver of premium keeps the policy in force if you become disabled; a child rider covers each child for a small amount; a guaranteed insurability rider lets you buy more coverage later without underwriting; a return-of-premium rider on term refunds premiums if you outlive it, at a much higher price. Each is priced, and most households need one or two."] },
    { heading: "Underwriting and rate classes", paragraphs: ["Carriers sort applicants into rate classes, from preferred plus through standard to rated classes with a surcharge, based on the medical exam, prescription history, lab results, motor vehicle record and the application. Some carriers offer accelerated underwriting with no exam for healthy applicants under an age and amount threshold. Tobacco use in any form, including vaping, puts an applicant in a separate class at a premium that can be double the non-tobacco rate for the same benefit."] },
  ],
  covered: [
    "A lump sum to named beneficiaries on death from any cause after the contestability period",
    "Death from illness, accident or natural causes, during the term or for life",
    "An early payment on a terminal diagnosis, under the accelerated benefit rider",
    "Premiums during a disability, with the waiver rider",
    "Cash value that can be borrowed against, on permanent policies",
    "Conversion from term to permanent without new underwriting, within the window",
    "Coverage for children under a child rider, convertible when they reach adulthood",
  ],
  notCovered: [
    "Suicide within the policy's exclusion period, usually the first two years",
    "A death within the contestability period where the application was materially misstated",
    "Death during an act of war or while committing a felony, on some contracts",
    "Aviation as a pilot or hazardous hobbies unless disclosed and rated",
    "A policy that lapsed for non-payment before the death",
    "Group coverage at work after you leave, unless ported or converted",
  ],
  discounts: [
    { name: "Preferred rate class", description: "Good blood pressure, cholesterol, weight and family history earn the lowest class, which can cost a fraction of standard." },
    { name: "Non-tobacco", description: "No nicotine in any form for the carrier's look-back period, typically a year or more." },
    { name: "Applying younger", description: "Premiums are locked at the age of issue; a thirty-year term bought in your late twenties costs far less than the same term bought at forty." },
    { name: "Amount bands", description: "Carriers price per unit of coverage in bands; a slightly larger benefit sometimes costs less per dollar than a smaller one just under the band." },
    { name: "Annual payment", description: "Paying yearly avoids the modal loading added to monthly payments." },
    { name: "Choosing the right term", description: "Matching the term to the years the income is actually needed, rather than defaulting to the longest, is the largest lever on price." },
  ],
  faqs: [
    { question: "How much life insurance do I need?", answer: ["Add up what the benefit has to do: replace the income for the years dependants need it, pay off the mortgage and debts, fund education, and cover final expenses, then subtract savings, existing coverage and a surviving spouse's income. Suppose a household needs $60,000 a year for fifteen years and has a $200,000 mortgage and $100,000 saved: a benefit around $1,000,000 does the job, and that arithmetic is what the analysis produces for your figures rather than a rule of thumb."] },
    { question: "Term or permanent?", answer: ["For most households the need is temporary, the income years, and term covers it at a price that leaves money for retirement accounts. Permanent coverage fits a need that lasts for life or a person who will use the cash value deliberately and can fund the policy well. Buying a small permanent policy instead of the right amount of term is the common error, because it leaves the family under-insured during the years it matters."] },
    { question: "Is the coverage at work enough?", answer: ["Group life is usually a multiple of salary, it ends when the job does, and it cannot be taken along at the same price. It is a good supplement and a poor foundation. Own an individual policy sized to the need, and treat the group amount as extra."] },
    { question: "Do I need a medical exam?", answer: ["It depends on the carrier, your age and the amount. Many carriers underwrite healthy applicants from prescription and medical databases with no exam up to a threshold; larger amounts and older applicants take a paramedical exam at home. Guaranteed issue policies with no health questions exist for small amounts at a high price, with a graded benefit in the early years."] },
    { question: "What happens to the money in a permanent policy if I stop paying?", answer: ["The cash value can carry the premiums for a while, the policy can be converted to a smaller paid-up benefit, or it can be surrendered for the cash value less any surrender charge. Each choice is on the contract's nonforfeiture provisions, and the carrier will tell you the figures on request."] },
    { question: "Can I change my beneficiary?", answer: ["Yes, at any time, unless you named an irrevocable beneficiary. Name a contingent beneficiary as well, keep the designations current after a marriage, divorce or birth, and avoid naming a minor directly, because a court will have to appoint someone to hold the money."] },
  ],
  relatedProducts: ["term-life-insurance", "whole-life-insurance", "indexed-universal-life-insurance", "annuities", "umbrella-insurance"],
  seo: { description: "Life insurance explained plainly: term versus permanent, whole life and indexed universal life, riders, underwriting and rate classes, and how to size the benefit. Independent agency in Arizona, Nevada, Utah and Idaho." },
};
