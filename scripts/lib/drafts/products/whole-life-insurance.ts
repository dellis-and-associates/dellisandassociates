import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Permanent coverage with three fixed things: a premium that never rises, a death benefit that never falls, and a cash value that grows on a schedule printed in the contract. Costs several times what term does for the same benefit, and fits needs that do not expire.",
  intro: [
    "Whole life is the original permanent policy. The premium is calculated at issue to keep the policy in force to a very old age, and it does not change; part of each premium covers the cost of insuring you that year and part is set aside to build cash value, which is why the premium is high in the early years compared with term. The death benefit is fixed, and the cash value follows a table in the contract that the carrier is bound to.",
    "Mutual carriers add dividends on participating policies, paid from surplus when the carrier's investment returns, claims and expenses come in better than its pricing assumed. Dividends are not a guarantee, but they can be taken in cash, used to reduce the premium, left to earn interest, or used to buy paid-up additions, small slices of extra paid-up insurance that raise both the death benefit and the cash value over time. The illustration shows the guaranteed minimum values and a projection with dividends at the current scale, and the two diverge over decades.",
    "The premium is set from age, sex, rate class and the amount, and, because it is level for life, from how many years of payment are chosen: ordinary whole life is paid to a late age, limited-pay versions are paid over ten or twenty years or to a set age, and single-premium versions are paid once. Shorter payment periods mean a larger annual premium for a policy that is paid up sooner.",
    "The analysis sizes the permanent need separately from the temporary one, prices whole life against term and against indexed universal life for that amount, and reads the illustration column by column. For a household that has not yet bought enough term or funded its retirement accounts, the usual recommendation is to do those first.",
  ],
  coverageBlocks: [
    { heading: "The death benefit", paragraphs: ["The face amount is paid to the beneficiaries whenever death occurs, provided the policy is in force, after any outstanding loan and interest are subtracted. With paid-up additions from dividends the benefit grows above the face amount; with an unpaid loan it shrinks. Because the benefit is permanent, whole life is used where a benefit must exist at an unknown date: to pay estate tax so heirs do not sell the ranch, to fund a buy-sell agreement between business partners, to leave a set amount to a charity or an heir, or to provide for a dependant with a lifelong disability."] },
    { heading: "Cash value", paragraphs: ["Cash value is the policy's savings component, growing at a rate the contract sets and on a schedule the contract prints, tax-deferred. It can be borrowed against at an interest rate the contract states, with no credit check and no fixed repayment, or withdrawn up to the premiums paid without tax. A loan reduces the death benefit until repaid and, on some policies, reduces the dividend on the borrowed portion. Early cash value is small, because the first years' premiums fund the carrier's costs, and a policy surrendered in its first decade usually returns less than was paid in."] },
    { heading: "Dividends and paid-up additions", paragraphs: ["On a participating policy the annual dividend depends on the carrier's actual experience, and the scale used in the illustration is the carrier's current rate, which it can lower. Using dividends to buy paid-up additions is the choice that compounds: each addition is a fully paid slice of insurance with its own cash value, and over a long period the additions can exceed the original face amount. Taking dividends in cash or against the premium keeps the cost down but leaves the policy where it started."] },
    { heading: "Surrender and nonforfeiture", paragraphs: ["A policy that is stopped does not simply vanish. Nonforfeiture options in the contract let the owner take the cash surrender value, use it to buy a smaller fully paid-up policy for life, or use it to buy extended term coverage for the full face amount for as long as the value will carry it. Most whole life contracts have no separate surrender charge; the low early cash values do the same work. Surrendering for more than the premiums paid produces taxable gain."] },
    { heading: "Final expense and simplified issue", paragraphs: ["Small whole life policies, sold as final expense or burial insurance, are written on simplified or guaranteed issue underwriting for older applicants, with a modest face amount and a graded benefit that pays only premiums plus interest if death occurs from illness in the first years. They are expensive per dollar of benefit and serve people who cannot qualify for anything else; for someone in reasonable health, an ordinary underwritten policy costs less for the same amount."] },
  ],
  covered: [
    "The face amount to beneficiaries at any age, as long as the policy is in force",
    "Cash value growth on the schedule the contract prints, tax-deferred",
    "Dividends, on participating policies, when the carrier declares them",
    "Policy loans against the cash value, without a credit check",
    "Paid-up additions that raise the death benefit and the cash value over time",
    "An accelerated benefit on a terminal diagnosis, under the rider",
    "A reduced paid-up policy or extended term if premiums stop",
  ],
  notCovered: [
    "Suicide within the contract's exclusion period",
    "A death in the contestability period where the application was materially misstated",
    "The portion of the death benefit offset by an unpaid policy loan and its interest",
    "Dividends in a year the carrier declares none; they are not part of the contract",
    "Illness deaths in the graded period of a guaranteed issue final expense policy, beyond the premiums paid",
    "Growth in cash value beyond the guaranteed minimum if dividends fall short of the illustration",
  ],
  discounts: [
    { name: "Rate class", description: "Whole life is underwritten like term; preferred classes pay materially less for life, and the difference compounds across decades." },
    { name: "Non-tobacco", description: "A non-tobacco class on a permanent policy saves the most of any single factor, because the surcharge would otherwise be paid for life." },
    { name: "Age at issue", description: "The premium is fixed at the age of purchase, so a policy for a child or a young adult is inexpensive and stays that way." },
    { name: "Dividends applied to premium", description: "On a participating policy, dividends can be directed to reduce the out-of-pocket premium, eventually to zero in a well-performing policy, at the cost of growth." },
    { name: "Annual payment", description: "Monthly billing carries a loading; paying annually removes it." },
    { name: "Blended designs", description: "Pairing a smaller base policy with a term rider and paid-up additions lowers the premium per dollar of benefit while keeping the permanent core." },
  ],
  faqs: [
    { question: "Is whole life a good investment?", answer: ["It is insurance with a conservative savings component, and it should be compared with that in mind. The cash value grows at a modest rate the contract sets, plus dividends that have historically been paid but are not promised, and the early years are heavily loaded with cost. Against a retirement account with an employer match it loses; against a bank account for money that must be safe, and for a person who values the death benefit, it holds its own. Buy it for the permanent death benefit first; the cash value is the secondary reason."] },
    { question: "Why is the premium so much higher than term?", answer: ["Term prices the chance you die in twenty years, which for a healthy adult is small. Whole life prices the certainty that you die at some point, and it collects enough early to hold the premium level to the end. The difference is the savings component and the certainty of the claim, not a mark-up."] },
    { question: "Can I borrow from my policy?", answer: ["Yes, at the contract's loan rate, with no application and no fixed repayment. Interest accrues, and an unpaid loan plus interest is subtracted from the death benefit; if the loan grows past the cash value, the policy lapses and the gain becomes taxable. A loan is a reasonable source of funds for someone who will repay it; it is a slow way to unwind a policy for someone who will not."] },
    { question: "What is a modified endowment contract?", answer: ["A policy funded faster than the tax code's limits allow becomes a modified endowment contract, and loans and withdrawals from it are taxed as income, gains first, with a penalty before a certain age. Carriers test each policy and warn before the line is crossed. It matters for anyone using a single-premium or heavily overfunded whole life policy; the death benefit's tax treatment is unchanged."] },
    { question: "Should I read the illustration or trust the agent?", answer: ["Read it. The illustration has a column of values the carrier is bound to and a column of projected values using the current dividend scale, and the difference between them is the risk you carry. Ask for the projection at a lower dividend scale as well. An illustration is a set of assumptions, not a contract; the contract is the pages that come after it."] },
    { question: "I already have a whole life policy. Should I keep it?", answer: ["Usually, if it was bought some years ago; the expensive early years are behind you and the cash value is compounding. Replacing an old policy with a new one restarts those costs and starts a new contestability period, and the agent proposing it should show you why on paper. The analysis will read the in-force illustration and say whether keeping it is right, which it often is."] },
  ],
  relatedProducts: ["life-insurance", "term-life-insurance", "indexed-universal-life-insurance", "annuities"],
  seo: { description: "Whole life insurance explained: level premiums, cash value, dividends and paid-up additions, policy loans, nonforfeiture options, modified endowment contracts and how to read an illustration. Independent agency in Arizona, Nevada, Utah and Idaho." },
};
