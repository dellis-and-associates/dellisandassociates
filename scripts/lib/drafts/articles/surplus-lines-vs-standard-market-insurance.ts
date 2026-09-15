import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Surplus lines vs standard market insurance",
  excerpt: "Standard market carriers are licensed in your state and file their rates and forms; surplus lines carriers are not, so they can write risks the standard market declines. What that freedom costs in protection, fees and policy wording, with worked examples.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Personal and small-business insurance is mainly written by admitted carriers, companies licensed by the state insurance department to do business there. Some risks do not fit their filed underwriting guidelines: a house in heavy wildfire fuel, a bar that stays open late, a roofing contractor, a vacant building, a property with several past claims. For those risks, the market has a second channel, surplus lines insurance, also called excess and surplus lines or the non-admitted market.",
        "A surplus lines policy is legitimate, regulated insurance, but it is regulated differently, and those differences show up in the price, the policy wording and the protections behind the policy. Understanding them helps a buyer decide whether a surplus lines quote is an acceptable solution or a signal to keep working on the standard market.",
      ],
    },
    {
      heading: "How the standard market works",
      paragraphs: [
        "An admitted carrier holds a certificate of authority from the state insurance regulator. It files its rates, rules and policy forms with the regulator, and depending on the line and state, those filings may need approval before use. The carrier must follow state rules on cancellation and non-renewal notices, claims handling and unfair trade practices, and it pays into the state's insurance guaranty association, which pays covered claims up to statutory limits if an admitted carrier becomes insolvent.",
        "That structure produces consistency. Homeowner, auto and business owners policies from admitted carriers tend to use standardised or closely related forms, prices change only through filings, and a policyholder has a clear path to the state regulator with a complaint. The trade-off is rigidity. A carrier that has filed guidelines excluding a class of risk generally cannot simply decide to write it at a higher price.",
      ],
    },
    {
      heading: "How the surplus lines market works",
      paragraphs: [
        "A surplus lines carrier is not licensed in the insured's home state, but it is permitted to write business there through a licensed surplus lines broker, provided it meets the state's eligibility standards for financial strength. Because it is not admitted, the carrier sets its own rates and writes its own forms without the filing process, which lets it price and shape coverage for unusual or high-hazard risks the admitted market will not accept.",
        "The broker carries regulatory duties that stand in for the carrier's. States generally require a diligent search showing that admitted carriers declined the risk, unless the risk is on a list of classes exempt from that search. The broker must file the placement with the state's surplus lines office, collect and remit the surplus lines premium tax and any stamping fee from the insured, and give the insured a disclosure that the carrier is not admitted and that the state guaranty fund generally does not protect the policy.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "Freedom of rate and form is the whole difference, and everything else follows from it. A surplus lines carrier can say yes where an admitted carrier must say no, and it can price the risk as it sees it. It can also narrow the coverage to make that yes workable. Surplus lines forms commonly include exclusions and sublimits rarely seen on admitted policies, such as assault and battery exclusions for bars, habitability or mould exclusions for rental property, roof settlement at actual cash value, larger percentage deductibles for wildfire or wind, and claims-made triggers on lines that are usually written on an occurrence basis.",
        "The financial terms differ as well. A surplus lines policy usually carries a policy fee and a minimum earned premium, meaning part of the premium is kept even if the policy is cancelled early, plus the surplus lines tax. Cancellation and non-renewal rules are often less protective. And without guaranty fund backing, the carrier's own financial strength is the main protection, which makes its rating worth checking before binding.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "Suppose a homeowner near Prescott, surrounded by national forest, receives a non-renewal, and admitted carriers decline because of wildfire exposure. For example, a surplus lines carrier offers a policy at $6,000 a year with a $250 policy fee, a 25% minimum earned premium, surplus lines tax on top, a separate wildfire deductible of $10,000 and actual cash value settlement on the roof. The house is insured, but a small roof claim that an admitted policy would have paid at replacement cost now pays depreciated value, and cancelling after two months to move to a cheaper admitted policy forfeits a quarter of the premium.",
        "Suppose a late-night bar in Scottsdale cannot get general liability from admitted carriers because of its hours and liquor sales. Say a surplus lines carrier writes a $1,000,000 occurrence policy with an assault and battery sublimit of $100,000. A fight in the parking lot injures a customer, who sues the bar for failing to provide security, and the case settles for $300,000. The surplus lines policy pays $100,000 under the sublimit, and the bar owes the other $200,000. The figures are illustrative only.",
      ],
    },
    {
      heading: "Who each market suits",
      paragraphs: ["The standard market is the default. The surplus lines market is the place for risks that genuinely do not fit it."],
      bullets: [
        "Households and businesses that qualify for admitted coverage should normally take it, because of the filed forms, state protections and guaranty fund backing.",
        "Properties in severe wildfire fuel, vacant or unoccupied buildings, homes with serious loss history or older roofs, and short-term rentals the admitted market will not write often need surplus lines coverage to be insured at all.",
        "High-hazard businesses such as bars and nightclubs, roofing and residential construction contractors, cannabis operations, and certain trucking and security firms frequently rely on surplus lines carriers.",
        "Businesses with large or unusual exposures, such as high liability limits or specialised professional risks, use surplus lines carriers for their flexibility even when some admitted capacity exists.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Surplus lines placements are handled through each state's own surplus lines filing process in Arizona, Nevada, Utah and Idaho, and the insured's home state determines the tax and regulatory rules for a policy covering property in several states. Wildfire has pushed a growing number of homes in the forested communities of northern Arizona, the Sierra foothills around Reno and Lake Tahoe, the Wasatch benches and the Idaho mountain towns toward surplus lines carriers. Arizona and Nevada's licensed cannabis industries depend heavily on the non-admitted market. Short-term rentals in Scottsdale, Las Vegas, Park City and Sun Valley, and the region's large residential construction trades, are other regular users.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A homeowner or business on an admitted policy with adequate coverage should stay there. A policyholder in the surplus lines market who has no realistic admitted alternative is also properly placed, as long as the policy's exclusions, sublimits and deductibles are understood and the carrier is financially strong. What is worth revisiting is a surplus lines policy bought after a non-renewal years ago, when mitigation, a new roof or a clean claims history may have made the property acceptable to admitted carriers again. We check the admitted market first across the carriers we represent in Arizona, Nevada, Utah and Idaho, explain any surplus lines quote term by term, and if the policy you have is the right fit, we say so.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "general-liability-insurance", "restaurant-insurance", "contractors-insurance"],
  relatedArticles: ["admitted-vs-non-admitted-carriers", "how-to-get-coverage-after-a-non-renewal", "wildfire-insurance-preparedness-for-southwest-homeowners", "how-to-insure-a-short-term-rental-property"],
  relatedTerms: ["surplus-lines", "non-admitted-carrier", "admitted-carrier", "surplus-lines-tax", "financial-strength-rating"],
};
