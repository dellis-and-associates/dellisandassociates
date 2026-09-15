import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to name life insurance beneficiaries correctly",
  excerpt: "The beneficiary form, not the will, decides who receives a death benefit, and small errors send money to probate, a court-supervised account or an ex-spouse. How to name primary and contingent beneficiaries, handle minors and trusts, and keep the form current.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A life insurance death benefit is paid to the people named on the carrier's beneficiary designation form. It does not pass through the insured's will, and a will that says something different does not change who the carrier pays. That is the great advantage of life insurance for a family: the money can reach the beneficiaries within weeks, outside probate, without creditors of the estate reaching it. It is also the source of the most painful mistakes, because a form filled in years ago, and never looked at again, controls the result.",
        "Naming beneficiaries correctly takes a short form and some thought about the ways the obvious choice can go wrong. This guide covers the decisions in order, with the points that matter in Arizona, Nevada and Idaho, which are community property states, and in Utah, which is not.",
      ],
    },
    {
      heading: "What to gather",
      paragraphs: ["Collect these for every policy before filling in any form."],
      bullets: [
        "A list of every life insurance policy and annuity, including group life through an employer and any accidental death coverage, with the current beneficiary on each.",
        "Full legal names, dates of birth and relationships for each person you intend to name. Some carriers also ask for a Social Security number or contact details.",
        "For a trust: the trust's exact name, the date it was signed, and the trustee's name.",
        "Your will and any estate plan, so the beneficiary choices and the plan agree.",
        "Any divorce decree or property settlement that requires a particular beneficiary.",
      ],
    },
    {
      heading: "Step one: name primary and contingent beneficiaries",
      paragraphs: [
        "The primary beneficiary receives the death benefit if they are alive when the insured dies. The contingent beneficiary receives it only if every primary beneficiary has died first. Always name both. Where no living beneficiary exists, the policy typically pays the insured's estate, which pulls the money into probate, delays it, and can expose it to the estate's creditors.",
        "Use full names, not descriptions. A form that says my wife or my children leaves room for disputes after a remarriage, a stepchild or a child born later. If you want a class of people such as all of my children, some carriers accept it with the names listed as well; follow the carrier's instructions exactly. Where several beneficiaries share, state each share clearly and make sure the shares add up to the whole.",
      ],
    },
    {
      heading: "Step two: decide what happens if a beneficiary dies before you",
      paragraphs: [
        "When one of several primary beneficiaries has died, the default on many forms is that the survivors share that person's portion. That may not be what you want. If one of three adult children dies before you, leaving children of their own, the default sends that child's share to their siblings and nothing to the grandchildren.",
        "A per stirpes designation changes that result: a deceased beneficiary's share passes down to their own descendants. A per capita designation divides the benefit equally among the beneficiaries alive at the time. Carriers handle these differently on their forms, and some require specific wording, so ask how to state the choice.",
      ],
    },
    {
      heading: "Step three: handle minors, dependants with disabilities and trusts",
      paragraphs: [
        "Carriers will not pay a large death benefit directly to a minor child. If a minor is named outright, a court may need to appoint a guardian or conservator to manage the money, which costs time and fees and ends with the child receiving control at the age of majority. Better routes are to name a custodian for the child under the state's Uniform Transfers to Minors Act, where the carrier allows it, or to name a trust that holds the money for the child on terms you set.",
        "For a beneficiary who receives means-tested government benefits because of a disability, an outright payment can end their eligibility. A special needs trust named as beneficiary can hold the money for them without that effect. Trusts should be drafted by an estate planning attorney, and the beneficiary form should name the trust exactly as the trust document does.",
      ],
    },
    {
      heading: "Step four: check spousal rights and submit the form properly",
      paragraphs: [
        "In the community property states of Arizona, Nevada and Idaho, premiums paid with marital income can give a spouse a claim to part of the death benefit even if someone else is named, and some carriers ask for a spouse's written consent when the spouse is not the primary beneficiary. Employer group life plans may be governed by federal law with their own rules. If you plan to name anyone other than your spouse, get advice before signing, and get the consent where it is needed.",
        "Submit the change on the carrier's own form, or through its online service, and keep the confirmation. A beneficiary change is not effective until the carrier records it, and a letter or a line in a will is not a substitute. Once the confirmation arrives, check it against what you intended. An irrevocable beneficiary designation, sometimes required by a divorce decree, cannot be changed later without that beneficiary's consent, so do not name one unless you intend it to be permanent.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: ["The following cause most beneficiary disputes and delays."],
      bullets: [
        "Leaving an ex-spouse named after a divorce. Some states revoke that designation automatically, but not every policy or plan is subject to those laws.",
        "Naming no contingent beneficiary.",
        "Naming a minor child directly.",
        "Naming the estate, and pulling the benefit into probate.",
        "Assuming the will overrides the beneficiary form.",
        "Forgetting to update group life coverage at a new job.",
        "Naming a trust incorrectly, or naming one that was never signed.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a widower in Reno buys a $600,000 policy and names his three adult children as equal primary beneficiaries, with no contingent and no per stirpes election. His daughter dies in a car accident, leaving two young children, and he never updates the form. When he dies, the carrier pays his two surviving sons $300,000 each, and his grandchildren receive nothing from the policy. Now suppose instead he had chosen per stirpes, and named a trust for his grandchildren's share. The carrier would pay $200,000 to each son and $200,000 to the trust, with the trustee managing it for the grandchildren until the ages he chose. The figures are hypothetical; a single line on the form changed who received a third of the benefit.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Send us a list of your policies and we will help you request the current beneficiary designations from each carrier, check them against what you intend, and provide the correct change forms. For trusts and community property questions, we will work alongside your estate planning attorney. If the designations on file already say what you want, we will confirm that and suggest reviewing them after the next major life event.",
      ],
    },
  ],
  relatedProducts: ["life-insurance", "term-life-insurance", "annuities"],
  relatedArticles: ["getting-divorced-updating-beneficiaries-and-policies", "having-a-baby-updating-your-life-insurance", "how-to-choose-life-insurance-coverage-amounts", "group-life-vs-individual-life-insurance"],
  relatedTerms: ["beneficiary-designation", "contingent-beneficiary", "per-stirpes-designation", "irrevocable-beneficiary"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
