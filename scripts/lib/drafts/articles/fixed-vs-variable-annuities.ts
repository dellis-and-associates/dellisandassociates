import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Fixed vs variable annuities",
  excerpt: "A fixed annuity is a carrier's promise to credit a stated rate; a variable annuity is your own investments held inside an insurance wrapper. Where the risk sits, the fees that separate them, a worked example through a market fall, and when a certificate of deposit is the honest answer.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "An annuity is a contract with a life insurance carrier. You hand over a sum, or a series of payments, and the carrier holds it in a tax-deferred account and later either pays it back with growth or converts it into an income stream for a period or for life. The word covers a wide range of products, and the two broad families are named for what happens to the money while it sits there: in a fixed annuity the carrier decides the return and bears the investment risk; in a variable annuity you choose the investments and bear the risk yourself.",
        "The two are sold to the same people, often in the same meeting, and the paperwork for each runs to dozens of pages. Underneath, the question is simple and it is the same one that separates a savings account from a brokerage account: do you want a known result or a chance at a larger one. This article explains how each is built, what the fees actually pay for, and how to decide, including the case where neither is the right tool.",
      ],
    },
    {
      heading: "Fixed annuities: the carrier's rate, the carrier's risk",
      paragraphs: [
        "A fixed annuity credits interest at a rate the carrier declares. A traditional fixed annuity sets the rate for a year at a time with a guaranteed minimum for the life of the contract; a multi-year guarantee annuity locks a single rate for a term of several years, much like a certificate of deposit with tax deferral. The carrier invests your premium in its general account, mostly bonds and mortgages, earns a spread over what it credits you, and absorbs the difference if its investments underperform. Your account value never goes down unless you withdraw.",
        "An indexed annuity is a fixed annuity with a different crediting formula: instead of a declared rate, interest is tied to the change in a market index, subject to a cap, a participation rate or a spread, and with a floor of zero so that a falling index credits nothing rather than a loss. It is still the carrier's promise, not a market investment, and the cap is where the carrier pays for that promise. An illustration showing what an indexed annuity would have credited over a past decade is a backtest of a formula the carrier can change at each anniversary, within contractual limits.",
        "The costs of a fixed annuity are mostly invisible: the spread the carrier keeps, and a surrender charge schedule that penalises withdrawals above a free amount during the early years. There is usually no separately stated annual fee unless a rider is added.",
      ],
    },
    {
      heading: "Variable annuities: your investments inside an insurance wrapper",
      paragraphs: [
        "A variable annuity places your premium in sub-accounts, which are mutual-fund-like portfolios you select, held in a separate account of the carrier rather than its general account. The value of the contract rises and falls with those portfolios daily. The carrier does not promise a return on the account value; it promises the insurance features wrapped around it, principally a death benefit that pays at least the premiums paid to a beneficiary if the owner dies while the account is below that figure, and the option to convert the account to a lifetime income at set rates.",
        "The costs are explicit and layered. There is a mortality and expense charge for the insurance features, an administration charge, the expense ratios of the sub-accounts themselves, and optional rider charges for living benefits such as a guaranteed minimum withdrawal benefit that promises an income based on a benefit base even if the account falls. Added together those charges are the reason a variable annuity has to outperform the same portfolio held in a plain brokerage account by a clear margin just to match it. Whether the tax deferral and the insurance features are worth that margin is the whole of the analysis.",
      ],
    },
    {
      heading: "The mechanism that differs: who owns the downside",
      paragraphs: [
        "Strip away the riders and the two products differ in one place. In a fixed annuity a market fall is the carrier's problem; your value is where the contract says it is. In a variable annuity a market fall is your problem; your value is what the sub-accounts are worth that day, less the charges that were deducted on the way down. Every rider on a variable annuity is a way of buying back some of that downside from the carrier, and each is priced as a percentage of the benefit base every year, which is a drag in the good years to pay for a floor in the bad ones.",
        "Two things follow. A fixed annuity's return will not keep pace with a long bull market, because the carrier kept the spread and the cap did its job. A variable annuity's return will not keep pace with the same portfolio held outside the wrapper, because the wrapper is not free. Each product is worse than the alternative it is often compared to in the scenario that alternative is built for, and better in the other scenario. Choosing is a statement about which scenario you cannot afford.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a sixty-two-year-old has $200,000 she does not need for ten years and is deciding between a fixed annuity crediting 4 percent for a seven-year term and a variable annuity with a balanced portfolio of sub-accounts, total annual charges of 2.5 percent, and a guaranteed minimum withdrawal benefit rider on top. Say the portfolio inside the variable contract earns 7 percent in a good year and loses 15 percent in a bad one.",
        "Suppose the first year is good and the second is bad. In the fixed contract the account is $208,000 after year one and $216,320 after year two, regardless of markets. In the variable contract that sequence leaves the account at roughly $200,000 times 1.045 times 0.825, about $172,400, once the 2.5 percent in charges is taken off each year's return. The rider's benefit base, however, might still stand at $200,000 or higher, and the withdrawal benefit would pay income on that base for life; the price for that promise was the rider charge, already inside the 2.5 percent, paid in the good year too. Reverse the order, two good years, and the variable account reaches about $218,000, ahead of the fixed contract. The figures are illustrative. The point is that the fixed contract's result was known on day one, and the variable contract's result depended on the sequence of returns and on whether she ever used the rider she paid for.",
      ],
    },
    {
      heading: "Who each suits",
      paragraphs: ["The buyer's situation, not the product literature, decides this."],
      bullets: [
        "A fixed or indexed annuity suits money that must be there on a date: the years between retirement and the start of a pension or Social Security, a known expense several years out, or a portion of savings the owner cannot emotionally tolerate seeing fall. It also suits someone who has used up other tax-deferred room and wants a bond-like holding to grow untaxed.",
        "A variable annuity suits an owner with a long horizon who has exhausted retirement plan contributions, wants tax deferral on a portfolio of equities, and is prepared to pay for a death benefit or a lifetime income floor as insurance rather than as an investment. It suits that owner less if the same growth is available in a low-cost brokerage account and no floor is wanted.",
        "Neither suits money that may be needed in the next few years; the surrender charge schedule on both designs is long and steep at the start.",
        "Neither suits a buyer who does not understand what the rider actually pays. A living benefit that pays income on a benefit base is not the same as the account value, and it cannot be taken as a lump sum.",
      ],
    },
    {
      heading: "Two checks before signing either",
      paragraphs: [
        "First, ask what the free withdrawal amount is and how long the surrender charge runs, and match that against every plausible need for the money, including a long-term care event. An annuity that cannot be reached without a penalty for eight years is a poor emergency fund. Second, ask for every charge as a single annual figure. On a fixed contract that means the spread and any rider fee; on a variable contract it means the mortality and expense charge, administration, sub-account expenses and riders, added together. A number you cannot get in writing is a number to walk away from.",
        "Annuities held inside an individual retirement account add nothing to the tax deferral the account already provides, so a variable annuity in an IRA is paying wrapper charges for a benefit that is already there; the only reason to do it is the insurance rider, and that should be the stated reason. Annuity income is taxed as ordinary income on the gain, and a 1035 exchange allows one contract to be swapped for another without triggering that tax, though usually with a new surrender period.",
      ],
    },
    {
      heading: "When the answer is neither, or to keep what you have",
      paragraphs: [
        "If the money is needed inside five years, a certificate of deposit or a Treasury ladder does what a fixed annuity does without the surrender schedule and with federal insurance rather than a carrier's promise and a state guaranty association behind it. If the goal is growth and there is no wish for a floor or a death benefit, a taxable brokerage account with low-cost funds does what a variable annuity does without the wrapper. An annuity earns its place when the tax deferral is genuinely valuable, the surrender period is genuinely tolerable, and the insurance feature is genuinely wanted.",
        "An annuity already owned is rarely improved by exchange. Surrender charges restart, a new commission is paid, and an old contract may carry a guaranteed minimum rate or a rider priced on terms no longer offered. If a variable annuity's charges are high and the rider is unused, the repair may be to stop paying for the rider rather than to move. We review existing contracts for owners in Arizona, Nevada, Utah and Idaho, lay out the charges and the surrender schedule against what the money is for, and say plainly whether to hold, adjust or replace. If holding is right, that is what we say.",
      ],
    },
  ],
  relatedProducts: ["annuities", "life-insurance", "whole-life-insurance"],
  relatedArticles: ["retiring-how-your-insurance-needs-change", "whole-life-vs-universal-life-insurance", "turning-65-medicare-and-insurance-transitions", "tax-season-using-refunds-to-improve-coverage"],
  relatedTerms: ["fixed-annuity", "variable-annuity", "indexed-annuity", "surrender-charge", "free-withdrawal-amount", "qualified-annuity", "1035-exchange"],
};
