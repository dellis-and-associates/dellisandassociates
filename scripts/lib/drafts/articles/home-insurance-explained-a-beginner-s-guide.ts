import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Home insurance explained: a beginner's guide",
  excerpt: "A homeowner policy is six coverages sharing one page. What each one pays for, how the dwelling limit is set, which perils are excluded, and the handful of choices that decide both the premium and how a claim turns out. Written for a first-time buyer in the Southwest and the Mountain West.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A homeowner policy looks like one product and behaves like six. The declarations page lists them as Coverage A through F: the house, the detached structures, the contents, the cost of living elsewhere while the house is repaired, your liability to other people, and small medical bills for guests. Each has its own limit, and most of the limits are set as a fraction of the first one, so the dwelling figure decides nearly everything else.",
        "This guide takes the six parts in order, explains what turns each one on, and then covers the questions a buyer in Arizona, Nevada, Utah or Idaho should ask before signing: which perils are excluded here, how the roof is valued, and what a deductible written as a percentage does to a hail claim. It does not quote a premium; that depends on the house, the address, the claims history and the carrier.",
      ],
    },
    {
      heading: "Coverage A: the dwelling, and the number everything hangs on",
      paragraphs: [
        "The dwelling limit is the most the policy pays to rebuild the house after a covered loss. It is not the purchase price and not the tax assessment; it is an estimate of construction cost, which can be higher or lower than either. A lot on a hillside in Prescott or on the Wasatch bench can be worth more than the house on it, and the policy insures only the house.",
        "Carriers estimate the figure with a replacement-cost calculator fed by square footage, construction type, roof material, finishes and local labour cost. The estimate drifts. If materials and labour rise and the limit does not, the house becomes underinsured without anyone changing anything. Two features address this: an inflation guard that lifts the limit a little each renewal, and extended replacement cost, which adds a cushion above the limit if rebuilding costs more than expected. Ask for both.",
        "Suppose the dwelling limit is $400,000, the house burns to the foundation, and the rebuild estimate comes in at $440,000 because every contractor in the county is busy after the same fire. With no extended replacement cost the policy stops at $400,000. With a cushion of one quarter above the limit it pays the full $440,000. Those figures are invented to show the mechanism; the cushion available varies by carrier.",
      ],
    },
    {
      heading: "Coverages B, C and D: the rest of the property side",
      paragraphs: [
        "Other structures, Coverage B, pays for things on the lot that are not attached to the house: a detached garage, a block wall, a shed, a pool house, a well house. It is usually set as a fraction of the dwelling limit. A property with a large shop building or a long run of masonry fencing often needs the fraction raised.",
        "Personal property, Coverage C, pays for what you own inside the house, and to a lesser extent anywhere in the world. It is also a fraction of Coverage A. The choice here is valuation: at actual cash value the carrier pays what a ten-year-old sofa is worth today; at replacement cost it pays what a new one costs once you buy it. Certain categories carry sublimits regardless, so jewellery, firearms, cash, collectibles and business equipment are capped at modest amounts unless scheduled separately.",
        "Loss of use, Coverage D, pays the extra cost of living elsewhere while the house is uninhabitable after a covered loss: rent, hotel nights, the difference in grocery bills. It is the coverage that turns a fire from a housing crisis into an inconvenience, and it is often the one people have never read. It responds to a covered loss only; a house that is unlivable because of a flood is a flood-policy question.",
      ],
    },
    {
      heading: "Coverages E and F: the liability side",
      paragraphs: [
        "Personal liability, Coverage E, pays what you owe if someone is injured on the property or you or a household member injure someone or damage their property elsewhere. A guest who falls on the pool deck, a dog that bites a delivery driver, a child who breaks a neighbour's window. It also pays the cost of defending the claim, which is often the larger part. Medical payments to others, Coverage F, pays small medical bills for guests regardless of fault, so that a sprained ankle does not become a lawsuit.",
        "The liability limit is the second number worth thinking hard about. It follows you off the lot, it covers the family, and it is where an umbrella policy attaches when the limit is used up. If the household owns a pool, a trampoline, an ATV or a large dog, ask how each is treated; some carriers exclude certain breeds or require a fenced pool.",
      ],
    },
    {
      heading: "Perils: what is in, what is out, and what needs its own policy",
      paragraphs: [
        "Most owner-occupied houses are written on an open-peril form for the structure, which means every cause of loss is covered unless the policy names it as excluded, and a named-peril form for the contents. The exclusions are where the regional questions live."
      ],
      bullets: [
        "Flood and surface water: excluded everywhere. Insured separately through the national programme or a private flood carrier, and relevant far beyond mapped zones after an Arizona monsoon or a spring melt in Idaho.",
        "Earth movement: excluded, including earthquake and landslide. Along the Wasatch Front and in parts of Nevada and Idaho this is a real question; earthquake coverage is a separate policy or endorsement with its own large deductible.",
        "Wear, tear, neglect and deterioration: excluded. A roof that fails from age is maintenance, not a claim.",
        "Water backup through a drain or sewer: excluded unless endorsed. The endorsement is inexpensive relative to what a finished basement in Salt Lake City costs to dry out.",
        "Wildfire: covered as fire on a standard form, but carriers underwrite it. In the wildland-urban interface around Flagstaff, Boise and the Sierra front, expect questions about defensible space and roofing, and in some areas a separate inspection.",
        "Mould, ordinance and law, and service lines: covered only up to sublimits or by endorsement. Ordinance and law coverage matters in an older house, because the city will make you rebuild to current code.",
      ],
    },
    {
      heading: "Deductibles, and the one written as a percentage",
      paragraphs: [
        "The standard deductible is a flat amount you pay on each claim before the carrier pays. Raising it lowers the premium; the right figure is the largest one you could write a cheque for tomorrow. Many carriers in hail-prone parts of the four states add a separate wind and hail deductible written as a percentage of the dwelling limit rather than a flat sum, and this changes the arithmetic on the most common claim there is.",
        "Suppose the dwelling limit is $400,000, the flat deductible is $1,000 and the wind and hail deductible is two percent. A monsoon hailstorm does $12,000 of roof damage. The wind and hail deductible applies, so you pay $8,000 and the carrier pays $4,000. Had the same loss been a kitchen fire, you would have paid $1,000. That is a hypothetical, but it is why the declarations page needs reading in full rather than skimmed for the premium.",
      ],
    },
    {
      heading: "How the roof is valued",
      paragraphs: [
        "In the desert and the high country the roof is the part of the house most likely to be claimed and the part most likely to be underpaid. Carriers increasingly write roofs at actual cash value once they pass a certain age, or apply a depreciation schedule tied to the roofing material. Tile in Phoenix ages differently from asphalt shingle in Boise, and the schedules reflect that.",
        "Before buying, ask three questions: is the roof at replacement cost or actual cash value, at what age does that change, and does the carrier require a roof inspection or a replacement before it will write the policy. A new roof is often the single fact that changes both the premium and the carrier's willingness to quote.",
      ],
    },
    {
      heading: "What moves the premium",
      paragraphs: ["The rating is a mix of facts about the house and choices you make."],
      bullets: [
        "The dwelling limit, since most other limits scale from it.",
        "Construction and roof: masonry versus frame, roof age and material, and whether the house is in a wildfire or hail territory.",
        "Deductibles, flat and percentage.",
        "Claims history, both yours and the property's; a prior water claim at the address follows the house.",
        "Protection class: distance to a fire station and a hydrant, which matters in rural Idaho and outside the Las Vegas valley.",
        "Discounts: a monitored alarm, a new roof, impact-resistant shingles, bundling with auto, and a claims-free history.",
        "Carrier appetite, which shifts by territory and year; the same house can be welcome at one carrier and declined at another.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Pull the declarations page and write down six things: the dwelling limit and whether it has a cushion, the contents valuation, the flat deductible, any percentage deductible, the roof valuation, and the liability limit. Then ask whether flood, earthquake and water backup are anywhere on the page. Those answers are what a real comparison starts from. We put them against the carriers we represent in the four states we are licensed in, and if the policy you already hold answers them well, that is what we tell you.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "flood-insurance", "earthquake-insurance", "umbrella-insurance"],
  relatedArticles: ["arizona-monsoon-season-home-prep-guide", "actual-cash-value-vs-replacement-cost-coverage", "ho-3-vs-ho-5-homeowners-policies", "how-to-lower-your-home-insurance-premium", "insurance-checklist-for-first-time-homebuyers"],
  relatedTerms: ["replacement-cost", "actual-cash-value", "wind-hail-deductible", "ho-3-policy", "open-peril-policy", "additional-living-expenses-coverage", "sublimit"],
};
