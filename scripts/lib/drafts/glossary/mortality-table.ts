import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Mortality table",
  definition: [
    "A chart showing, for each age, the proportion of a population expected to die before the next birthday, and from it the remaining life expectancy. Life insurers build them from the experience of the people they have insured, and regulators publish standard versions for setting reserves.",
  ],
  inPractice: [
    "It is the foundation of every life insurance premium. A term policy's price at a given age is, at its core, the probability of death that year multiplied by the benefit, plus expenses and a margin; a level-premium policy spreads the rising annual cost across the term, overcharging in early years to undercharge in later ones. Separate versions exist for men and women, smokers and non-smokers, and for preferred, standard and substandard health classes, which is what underwriting actually assigns. Because insured populations live longer than the general population and lifespans have lengthened over time, the charts are revised periodically, and newer versions have generally lowered term premiums for healthy applicants. Annuity providers use versions weighted toward longer lives, since their risk is the opposite: paying too long rather than too soon. The analysis explains which class a client was placed in and what a different class would have cost.",
  ],
  example: [
    "Suppose a chart gives a healthy fifty-year-old woman a probability of death this year of three in a thousand, rising to five in a thousand by fifty-five. A one-year $1 million policy would cost about $3,000 in pure risk this year; a five-year level policy spreads the rising figures and charges about $4,000 each year. A smoker in the chart's smoker version might show twice the probability and pay roughly twice as much. Hypothetical figures.",
  ],
  relatedTerms: ["actuarial-table", "morbidity-table", "actuary"],
  relatedProducts: ["term-life-insurance", "whole-life-insurance"],
};
