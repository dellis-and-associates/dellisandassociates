import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Key person insurance vs buy-sell agreement funding",
  excerpt: "Key person insurance pays the business for what it loses when an essential person dies; buy-sell funding pays for an owner's share so the survivors can buy it. Why the two need separate money, how ownership structure changes the tax result, and a worked example.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Both arrangements use life insurance on the people who run a closely held business, and both are often bought in the same meeting. That is where the confusion starts. The policies can look identical, the same carrier, the same face amount, the same insured, while doing entirely different jobs. One replaces value the business loses when a person dies. The other moves ownership from a deceased owner's family to the people who continue the business, at a price agreed in advance.",
        "A business that treats one policy as covering both needs usually finds, at the worst moment, that the money can only be spent once. This article separates the two, explains how each is structured, and shows what happens when a death actually occurs.",
      ],
    },
    {
      heading: "What key person insurance does",
      paragraphs: [
        "Key person coverage is a life policy, and sometimes a disability policy, owned by the business on an individual whose absence would cost it money: a founder who holds the client relationships, an engineer whose licence the firm operates under, a sales lead who produces a large share of revenue. The business pays the premium and is the beneficiary. When the insured dies, the proceeds go to the company to cover lost profit, recruiting and training a replacement, reassuring lenders whose credit lines depend on that person, or winding down in an orderly way.",
        "The insured need not be an owner at all. The face amount is usually justified by a valuation of what the person contributes, such as a multiple of compensation or the profit attributable to their work, and carriers underwrite it against that justification. Premiums are generally not deductible, and the death benefit is generally received free of income tax, provided the business satisfies the federal notice-and-consent rules for employer-owned life insurance before the policy is issued. Skipping the written consent is a common, avoidable mistake.",
      ],
    },
    {
      heading: "What buy-sell funding does",
      paragraphs: [
        "A buy-sell agreement is a contract among the owners, and sometimes the company, stating what happens to an owner's interest on death, disability, retirement or departure: who must buy, who must sell, and how the price is set. Without funding, the agreement is a promise the survivors may not be able to keep, since few owners have the purchase price in cash. Life insurance is the usual way to fund the death trigger, and disability buy-out insurance can fund the disability trigger.",
        "The common structures are these.",
      ],
      bullets: [
        "Cross-purchase: each owner owns and is beneficiary of a policy on each of the other owners, and uses the proceeds to buy the deceased owner's shares personally. The buyers generally receive a cost basis equal to the price paid, which matters when they later sell.",
        "Entity redemption, or stock redemption: the company owns a policy on each owner and uses the proceeds to buy back the deceased owner's interest. It is simpler with many owners, since the business holds one policy per person rather than a web of them.",
        "Hybrid or wait-and-see arrangements let the company and the surviving owners decide at the time of death which of them buys, and a trusteed cross-purchase uses a trust or LLC to hold a single policy per owner.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "Key person proceeds stay in the business and are meant to be spent on the business. Buy-sell proceeds pass through to the deceased owner's estate in exchange for the ownership interest, and they leave the business entirely. If a company holds one policy on an owner and uses it for the redemption, there is nothing left to absorb the lost revenue, and if it spends the proceeds on recovery, the heirs are left holding shares the survivors cannot afford to buy.",
        "Ownership structure also changes the value being transferred. In a 2024 decision, Connelly v. United States, the Supreme Court held that life insurance proceeds a corporation receives to fund a redemption count toward the company's value for federal estate tax purposes, without an offset for the obligation to redeem. For an owner whose estate may be taxable, that can make an entity redemption more costly than a cross-purchase. This is a question for the owners' tax adviser and attorney, and it is one of the reasons to review agreements written years ago.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose two owners each hold half of a heating and cooling company in Boise valued at $2,000,000, and one of them, who runs sales, dies unexpectedly. Their buy-sell agreement sets the price for a half interest at $1,000,000. Say the company also estimates it will lose $400,000 of profit over the eighteen months it takes to replace the sales relationships and hire a manager.",
        "Suppose first that the company owns a single $1,000,000 policy on each owner and intends it to serve both purposes. The proceeds fund the redemption and the estate is paid, but the company absorbs the $400,000 loss from operating cash or new debt at the moment its revenue is falling. Now suppose instead that the surviving owner holds a $1,000,000 cross-purchase policy on the deceased owner and the company separately owns a $500,000 key person policy. The survivor buys the shares personally and receives a basis equal to the purchase price, the estate receives the full agreed value, and the company has cash to carry it through the transition. The figures are illustrative, and the tax outcome depends on the owners' circumstances.",
      ],
    },
    {
      heading: "Who needs which",
      paragraphs: ["A business with more than one owner usually needs both. The weighting depends on who the business relies on and who owns it."],
      bullets: [
        "A company that depends on a non-owner, such as a lead engineer or a top producer, needs key person coverage, and a buy-sell agreement is irrelevant to that person.",
        "A company with two or more owners and families who would inherit their interests needs a funded buy-sell agreement, whether or not any owner is individually essential to operations.",
        "A sole owner planning to sell to a key employee can use a one-way buy-sell funded by a policy the employee owns, often alongside key person coverage the company holds on the owner.",
        "Owners who are both essential to operations and holders of large interests need separate amounts for each purpose, sized from a current valuation rather than an old one.",
      ],
    },
    {
      heading: "Regional context",
      paragraphs: [
        "Arizona, Nevada and Idaho are community property states, and Utah is not. In the first three, an owner's spouse may hold a community interest in business shares acquired during the marriage, which is why buy-sell agreements there often include a spousal consent and why the deceased owner's spouse, rather than the estate alone, may be a party to the sale. Business entity rules, valuation practices and the treatment of family-owned interests also vary by state. The insurance can be arranged identically in all four states, but the agreement it funds should be drafted by an attorney familiar with the state where the business is organised.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A business with a signed, recently reviewed buy-sell agreement, policies whose face amounts match the current valuation, the correct owners and beneficiaries on each policy and separate key person coverage is well structured, and the only ongoing task is to update the valuation and face amounts as the business grows. Term coverage bought for a buy-sell is often perfectly adequate and does not need to be replaced with permanent insurance unless the owners expect to hold the business into the years after the term expires. What deserves a closer look is an agreement that refers to a valuation formula no one has checked in years, an entity redemption structure set up before the Connelly decision for owners with sizeable estates, or a single policy expected to do two jobs. We review the policies against the agreement with the owners' attorney and tax adviser, price any gaps across the carriers we represent in Arizona, Nevada, Utah and Idaho, and if the current arrangement works, we say so.",
      ],
    },
  ],
  relatedProducts: ["life-insurance", "term-life-insurance", "whole-life-insurance", "business-owners-policy"],
  relatedArticles: ["starting-a-small-business-insurance-basics", "how-to-choose-life-insurance-coverage-amounts", "term-life-vs-whole-life-insurance", "how-to-name-life-insurance-beneficiaries-correctly"],
  relatedTerms: ["key-person-insurance", "buy-sell-agreement", "beneficiary-designation", "cash-value-life-insurance"],
};
