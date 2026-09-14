import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "The plain version of life insurance: a fixed death benefit for a set number of years at a premium that does not change, and nothing paid if you outlive it. It buys the largest benefit per dollar during the years a family depends on an income, which is why it is what we usually recommend.",
  intro: [
    "Term life is a bet the carrier expects to win: you pay a level premium for ten, fifteen, twenty or thirty years, and if you die inside that window your beneficiaries receive the face amount. If you are alive at the end, the coverage stops and the premiums are gone, the same way an unused home policy is gone. Because most policies expire without a claim, the premium for a healthy adult is small against the benefit, and that is the point: the money the benefit replaces is needed for a definable period, not forever.",
    "The right term is the number of years until the need ends: the youngest child through college, the mortgage paid, retirement savings large enough to carry a surviving spouse. Buying a term shorter than that saves a little now and leaves the family exposed in the years the risk is highest; buying much longer pays for years no one depends on you. A pair of policies with different terms, a large one to the children's independence and a smaller one to the end of the mortgage, is often cheaper than one large long policy.",
    "The premium is fixed by the rate class assigned at issue, the amount, the term and the applicant's age, and it does not change during the term. Underwriting looks at the same things for term as for any life policy: health history, labs, prescriptions, tobacco, driving, occupation, hobbies and family history. Term is the most price-competitive line in insurance, and the spread between carriers for the same applicant is wide enough that the analysis prices several every time.",
  ],
  coverageBlocks: [
    { heading: "Level term", paragraphs: ["Level term keeps both the premium and the death benefit fixed for the whole term. It is the standard form. At the end of the term the policy typically becomes annually renewable at the attained-age premium, which climbs steeply every year, and the usual plan is to let it end or convert before then. The level-premium period is on the declarations page; some cheaper policies advertise a long term but hold the premium for a shorter stretch, which is worth reading for."] },
    { heading: "Conversion", paragraphs: ["Most term policies carry a conversion privilege: during a window, often to a stated age or for a portion of the term, the policy can be exchanged for a permanent policy from the same carrier at the original rate class, without a new exam. A person diagnosed with a serious illness during the term can convert and keep coverage for life at a price a new application would never get. The window, the products available to convert into, and whether a partial conversion is allowed differ by carrier and are a reason to prefer one carrier over another at the same premium."] },
    { heading: "Return of premium and decreasing term", paragraphs: ["A return-of-premium rider refunds every premium paid if you outlive the term, at a premium that can be double the plain policy; the arithmetic usually favours buying plain term and investing the difference, though for someone who would not invest it the rider is a forced-savings device. Decreasing term, where the benefit falls each year to track a mortgage balance, is sold by lenders and is rarely a good buy against a level policy for the original balance."] },
    { heading: "Riders", paragraphs: ["The accelerated death benefit rider, usually included at no charge, pays part of the benefit early on a terminal diagnosis. Waiver of premium keeps the policy in force if you are disabled. A child rider covers all children in the family for a small amount and can be converted when they reach adulthood. A guaranteed insurability rider is less common on term but lets you add coverage at life events without underwriting."] },
    { heading: "No-exam and simplified issue", paragraphs: ["Many carriers now underwrite healthy applicants up to an amount threshold from prescription databases, driving records and a phone interview, with a decision in days rather than weeks and no paramedical exam. Simplified issue policies ask a few health questions and skip the exam for anyone, at a higher premium. Both are convenient; for an applicant in good health with time to spare, the full exam often produces the lower class and the lower premium."] },
  ],
  covered: [
    "The full face amount to your beneficiaries if you die during the term, from any cause after the contestability period",
    "Deaths from illness, accident and natural causes alike",
    "An early payment of part of the benefit on a terminal diagnosis",
    "Continued coverage without premiums during a qualifying disability, with the waiver rider",
    "Conversion to a permanent policy at the original rate class within the window",
    "Children under a child rider, for a small fixed amount",
  ],
  notCovered: [
    "Anything if you outlive the term; there is no cash value or refund unless the return-of-premium rider was bought",
    "Suicide within the exclusion period stated in the contract",
    "A death in the contestability period where the application misstated health, tobacco use or hobbies",
    "Death while piloting an aircraft or in a hazardous activity that was not disclosed and rated",
    "A policy that lapsed for non-payment, after the grace period",
  ],
  discounts: [
    { name: "Preferred plus class", description: "Strong labs, a healthy weight, no family history of early heart disease or cancer, and a clean driving record put an applicant in the lowest class." },
    { name: "Non-tobacco", description: "No nicotine use for the carrier's look-back, confirmed by the lab test; some carriers now rate occasional cigar use as non-tobacco." },
    { name: "Right-sizing the term", description: "Ten years less term on a policy bought in your thirties reduces the premium substantially; two laddered policies often cost less than one long one." },
    { name: "Band pricing", description: "Carriers price per thousand of benefit in bands, and the rate per thousand drops at each band; a face amount just over a band can cost less than one just under it." },
    { name: "Annual premium", description: "Paying once a year avoids the loading carriers add for monthly billing." },
    { name: "Shopping the application", description: "The same applicant is placed in different classes by different carriers; an informal pre-screen before the formal application finds the one that treats a given condition most favourably." },
  ],
  faqs: [
    { question: "What happens at the end of the term?", answer: ["Coverage ends unless you renew, and renewal is annual at the premium for your age then, which rises each year and quickly becomes unaffordable by design. Options before the end: convert part or all to a permanent policy during the conversion window, apply for a new term policy if your health still qualifies, or let it lapse because the need has passed, which for most people is the intended outcome."] },
    { question: "Can I get my money back if I never claim?", answer: ["Only with a return-of-premium rider, and you pay for it. Plain term is like auto insurance: the premium buys the coverage for the year, and the fact that no claim was paid means the year went well. The alternative, permanent insurance, returns value but at a premium several times higher for the same benefit."] },
    { question: "How long a term should I buy?", answer: ["Count the years until the last dependant is independent and the mortgage is manageable on one income, and buy that. Suppose the youngest child is five and the mortgage has twenty-five years to run: a twenty-year policy covers the child, and a second smaller policy or a thirty-year term covers the loan. The analysis lays those out with premiums for each."] },
    { question: "Should I convert my term policy?", answer: ["Convert if you have developed a condition that would make new coverage expensive or unavailable and you still need coverage past the term, or if a permanent need has appeared: a dependant who will never be independent, an estate that will owe tax. Convert only the amount you need for life, which is usually a fraction of the term amount."] },
    { question: "Can I have more than one term policy?", answer: ["Yes, and laddering is a standard approach. A large policy to the children's independence plus a smaller one to retirement matches the coverage to the declining need and costs less than one large policy for the longer term. Carriers will ask about total coverage in force to check that the amount is justified by income."] },
    { question: "What if I stop paying?", answer: ["The policy lapses after the grace period and coverage ends; there is no value to surrender. Most carriers allow reinstatement within a period if you pay the missed premiums and answer health questions, and some allow it without questions inside a short window. A missed payment is not a reason to give up a policy bought years ago at a younger age."] },
  ],
  relatedProducts: ["life-insurance", "whole-life-insurance", "indexed-universal-life-insurance", "umbrella-insurance"],
  seo: { description: "Term life insurance explained: level term, conversion privileges, return of premium, riders, no-exam underwriting, how long a term to buy and what happens when it ends. Independent agency in Arizona, Nevada, Utah and Idaho." },
};
