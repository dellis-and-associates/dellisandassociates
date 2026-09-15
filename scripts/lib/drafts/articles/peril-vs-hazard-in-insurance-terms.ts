import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Peril vs hazard in insurance terms",
  excerpt: "A peril is the event that causes a loss, such as fire or theft; a hazard is a condition that makes that event more likely or more severe. Perils decide whether a claim is covered; hazards decide price and eligibility. With worked examples.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "In everyday speech, peril and hazard mean roughly the same thing: danger. In insurance they mean different things, and the difference explains a good deal about why a policy covers what it covers, why an underwriter asks the questions on an application, and why a carrier sometimes declines to renew a house that has never had a claim.",
        "A peril is the cause of a loss. Fire, lightning, windstorm, hail, theft, vandalism, a collision and a lawsuit for injury are perils. A hazard is a condition that increases the chance a peril will occur or makes the loss worse when it does. Dry brush against a wall, a worn roof, a missing pool fence and a driver who texts behind the wheel are hazards. A policy is written around perils. A carrier's decision to write the policy, and at what price, is made around hazards.",
      ],
    },
    {
      heading: "Perils: what the policy responds to",
      paragraphs: [
        "Perils appear in the insuring agreement and the exclusions. A named-peril policy lists the perils it covers, and a loss from anything else is not covered. An open-peril policy covers direct physical loss from any peril that is not excluded, so the exclusions list effectively names the perils it will not pay for, such as flood, earth movement, wear and tear, and war.",
        "When a claim is made, the adjuster's first job is to identify the peril that caused the loss. A burst pipe from freezing, water seeping for months from a slow leak and water entering from outside after a storm are three different perils with three different coverage answers, even though all three produce wet drywall. When more than one peril contributes, policy language and state law decide how the loss is treated, and anti-concurrent causation wording in many forms can exclude a loss if an excluded peril contributed to it at all.",
      ],
    },
    {
      heading: "Hazards: what the underwriter prices",
      paragraphs: ["Underwriting texts sort hazards into a few groups, and each shows up in a different part of the buying process."],
      bullets: [
        "Physical hazards are tangible conditions of the property or the operation: an old electrical panel, a wood shake roof, vegetation near the house, an unfenced pool, an unsecured construction site or a restaurant's cooking equipment.",
        "Moral hazard is the risk that someone will cause or exaggerate a loss dishonestly, such as inflating a theft claim or setting a fire; it is why carriers look at prior claims and financial history.",
        "Morale hazard, sometimes called attitudinal hazard, is carelessness that comes from being insured, such as leaving a car unlocked with the keys inside because theft is covered anyway.",
        "Legal hazard describes the legal environment in which claims are decided, such as how courts in a jurisdiction treat liability claims, which affects liability pricing by territory.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "Perils determine coverage; hazards determine eligibility, price and occasionally conditions of coverage. That is why a house with a large dead tree leaning over the roof is still covered for a windstorm that drops the tree, since windstorm is the peril, while the carrier may still refuse to renew it, since the tree is a hazard. Hazards enter a policy through application questions, inspections, rating factors, deductibles and credits for mitigation.",
        "They can also enter through policy conditions. Many commercial property forms include a protective safeguards endorsement requiring that sprinklers, fire suppression or alarm systems described on the application be maintained, and they suspend coverage for fire losses while those systems are knowingly out of service. Some forms reduce or remove coverage for certain perils after a building has been vacant for a stated period. In each case, a hazard the policyholder controls changes whether the policy responds to a peril it otherwise covers. Misrepresenting a material hazard on an application can also allow a carrier to rescind a policy entirely.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "Suppose a restaurant in Tempe carries a business owners policy with a protective safeguards endorsement listing its kitchen hood fire suppression system. A grease fire spreads from the fryer and causes $250,000 of damage. Fire is a covered peril, and if the suppression system was serviced and in working order, the policy pays the loss less the deductible. Now suppose the owner had disconnected the system months earlier during a remodel and never had it reinstalled; the endorsement gives the carrier grounds to deny the fire claim, even though fire itself is covered, because the hazard the policy conditioned on was not maintained.",
        "Suppose a homeowner in Flagstaff has a house surrounded by ponderosa pines with needles piled on the roof and a woodpile against the deck. For example, the carrier's inspector notes the vegetation and gives the owner a deadline to clear defensible space or face non-renewal. The owner clears it, and a mitigation credit brings the annual premium from $2,400 to $2,000. If a wildfire later reaches the house, fire is a covered peril either way, but the owner's work on the hazard kept the policy in force and may have saved the house. The figures are hypothetical.",
      ],
    },
    {
      heading: "Using the distinction as a buyer",
      paragraphs: [
        "The practical rule is to read perils to understand what a policy covers and to manage hazards to control what the policy costs and whether it stays in force. That means comparing the covered perils and exclusions of competing forms, not just their premiums, and paying attention to excluded perils that matter locally, such as flood and earthquake, which need separate policies. It also means answering application questions about hazards accurately, telling the carrier about changes such as a new pool, a trampoline, a home business or a renovation, and asking which mitigation steps earn credits. Roof upgrades, monitored alarms, water leak sensors and defensible space work can each move price or eligibility with some carriers.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "The region's signature perils are wildfire, monsoon wind and hail, flash flooding, winter freeze in the high country and northern states, and earthquake along the Wasatch Front and in parts of Idaho and Nevada, with flood and earthquake excluded from standard homeowner forms. Its common hazards are vegetation in the wildland-urban interface, older roofs baked by desert sun, homes built near washes, unreinforced masonry in older Utah neighbourhoods, backyard pools, and older plumbing materials in homes built during certain decades of the Phoenix and Las Vegas building booms. Carriers in all four states increasingly inspect for those hazards, sometimes by aerial imagery, and their findings decide renewals as often as claims do.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A policy whose covered perils match the property's real exposures, backed by an accurate application and hazards the owner has already addressed, needs no change, and the carrier's renewal price will usually reflect that work. A household or business that has received an inspection notice, a non-renewal warning or a surcharge tied to a hazard should first fix the hazard, since switching carriers without doing so often only moves the problem. We read the perils and exclusions on your policy, review what the carriers we represent in Arizona, Nevada, Utah and Idaho look for in underwriting, and tell you which hazards are worth addressing and when the policy you have is already the right one.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "business-owners-policy", "restaurant-insurance", "auto-insurance"],
  relatedArticles: ["named-perils-vs-open-perils-policies", "how-insurance-actually-works-a-plain-english-guide", "how-to-prepare-for-an-insurance-home-inspection", "fire-season-defensible-space-requirements"],
  relatedTerms: ["peril", "exclusion", "underwriting", "defensible-space", "named-peril-policy", "open-peril-policy", "wildfire-mitigation"],
};
