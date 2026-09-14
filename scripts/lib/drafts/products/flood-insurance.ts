import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Pays for water that rises from outside the house: a wash overtopping, a monsoon cell flooding the street, snowmelt across a valley floor. Every standard home policy excludes it, so flood is a separate policy, written through the federal program or a private carrier, each with a waiting period.",
  intro: [
    "Home, renters, condo and landlord policies all exclude flood, which the industry defines as surface water from outside the building: overflow of a wash or river, storm runoff pooling against a foundation, mudflow, or a rising water table. Water that comes through the roof or bursts from a pipe is a home policy question; water that comes across the ground is a flood policy question, and the two are read strictly at claim time.",
    "The desert makes this concrete. A summer storm cell can drop a season's rain on a burn scar or a paved subdivision in an hour, and neither the ground nor the storm drains can take it. Streets in Phoenix, Tucson and Las Vegas are graded to carry that water, which is why cars float in them, and homes at the edge of a wash or at the low end of a cul-de-sac take water even when the county map shows them outside the high-risk zone. In Utah and Idaho the risk is spring snowmelt and rain on frozen ground more than cloudbursts.",
    "There are two ways to buy the coverage. The National Flood Insurance Program, run by FEMA and sold through carriers and agents, writes a standard policy on set terms. Private flood carriers write their own forms with broader terms and their own pricing. Both carry a waiting period between purchase and the day coverage starts, so a policy bought while a storm is on the forecast will not respond to it.",
    "The premium is set from the property's elevation and distance to water, its foundation type, the construction and year built, whether there is a basement or crawlspace, the limits and deductibles chosen, and the flood history of the address. The analysis prices the federal policy and the private options side by side and tells you which, or whether the lender's requirement is the only reason to carry it.",
  ],
  coverageBlocks: [
    { heading: "Building coverage", paragraphs: ["Building coverage pays to repair the structure and what is permanently attached: foundation, walls, floors, electrical and plumbing, the furnace, water heater and air conditioner, built-in appliances, cabinets, and carpet installed over an unfinished floor. The federal program pays replacement cost on a primary residence insured to most of its value and actual cash value otherwise; private forms vary, and some pay replacement cost on any occupied home. The federal program caps building coverage at a fixed federal limit that can fall short of a larger home's rebuild cost, and an excess flood policy or a private policy can sit above it."] },
    { heading: "Contents coverage", paragraphs: ["Contents is bought and priced separately, and a building policy alone pays nothing for furniture, clothing, electronics or a washer and dryer. The federal contents policy pays actual cash value, so a ten-year-old sofa is paid as a ten-year-old sofa. Contents in a basement are limited to a short list of items, mostly the washer, dryer and freezer, which surprises owners in Utah and Idaho where finished basements are common. Private carriers often offer replacement cost on contents and fewer basement restrictions."] },
    { heading: "NFIP versus private flood", paragraphs: [
      "The federal policy is the same form from every agent, backed by the federal government, accepted by every lender for a home in a Special Flood Hazard Area, and rated on the property's own characteristics rather than the zone alone. It does not pay additional living expenses, its contents terms are narrow, and its limits are fixed.",
      "A private flood policy can add loss of use, replacement cost on contents, higher building limits, coverage for detached structures and pools, and a shorter waiting period. Lenders accept a private policy that meets federal standards, though some ask for a compliance statement. The trade-off is that a private carrier can decline to renew after a loss or leave a market, while the federal program renews as long as the community participates. The analysis prices both wherever the address qualifies.",
    ] },
    { heading: "Increased cost of compliance", paragraphs: ["When a flood damages a home in the high-risk zone badly enough that local ordinance requires it to be elevated, floodproofed, relocated or demolished on rebuild, the federal policy includes an allowance toward that work on top of the building payment. It triggers only on a substantial-damage determination by the local floodplain administrator, and the allowance is modest against the cost of raising a slab home, but a homeowner in a mapped floodway should know it exists and that most private forms leave it out."] },
    { heading: "Deductibles and elevation", paragraphs: ["Building and contents each carry their own deductible, and the flood deductible is separate from the home policy's. Raising the deductible lowers the premium; so does an elevation certificate showing the lowest floor above the base flood elevation, and in some cases so does documenting flood vents in a crawlspace or moving the furnace and water heater above the expected water line. Someone quoted a high premium on an old map designation often finds the price changes with a surveyor's certificate in hand."] },
  ],
  covered: [
    "The structure, foundation, electrical, plumbing and HVAC after surface flooding",
    "Built-in appliances, cabinets and permanently installed flooring",
    "Furniture, clothing and electronics under a contents policy",
    "Mudflow carried by flood water",
    "Debris removal and the cost to dry and clean the building",
    "The added cost to elevate or floodproof on rebuild, under the federal allowance",
    "A detached garage, within a limited share of the building limit",
  ],
  notCovered: [
    "Water from a burst pipe, a roof leak or a backed-up drain without flood conditions (the home policy or its water backup endorsement)",
    "Additional living expenses under the federal policy; some private forms include them",
    "Cars, which the auto policy's comprehensive coverage handles",
    "Landscaping, fences, decks, pools, septic systems and wells",
    "Currency, precious metals and most items stored below the lowest elevated floor",
    "Mold and mildew the owner could have prevented after the water receded",
    "Damage from a flood that began before the waiting period ended",
  ],
  discounts: [
    { name: "Elevation certificate", description: "A surveyed certificate showing the lowest floor above the base flood elevation, which can cut a federal premium sharply in a mapped zone." },
    { name: "Flood vents and raised machinery", description: "Engineered openings in a crawlspace and a furnace, water heater or condenser set above the expected water line are rated favourably under the current federal method." },
    { name: "Community rating", description: "Communities that exceed federal floodplain standards earn a program-wide discount for every policyholder inside them; each of the four states has participating communities." },
    { name: "Higher deductible", description: "A larger building or contents deductible lowers the premium; lenders set a ceiling on how high it can go." },
    { name: "Private carrier package credits", description: "Some private carriers credit a home they also insure, or a newer home built to current elevation codes." },
  ],
  faqs: [
    { question: "The map says I am not in a flood zone. Do I need this?", answer: ["Every lot is in a flood zone; the map's letters describe how likely water is to reach it, and the shaded high-risk area is where a lender insists on coverage. A large share of flood claims come from outside that shaded area, because runoff follows grading rather than maps, and a moderate-risk designation prices cheaply for that reason. The recommendation depends on the lot: a raised slab at the top of a subdivision may reasonably go without, while a home at the mouth of a wash or below a burn scar should not."] },
    { question: "How long is the waiting period?", answer: ["The federal policy has a waiting period between the application and the start of coverage, with exceptions when the policy is bought at closing to satisfy a lender or after a map change. Private carriers set their own, often shorter. The practical rule is that coverage is bought in the dry season, because a policy applied for during a monsoon watch will not respond to that storm."] },
    { question: "Does flood insurance cover a sewer backup or a monsoon roof leak?", answer: ["No. Water backing up from a drain without general flooding is a water backup endorsement on the home policy, and rain through a damaged roof is a home policy claim. If the sewer backs up because the street is under water, the flood policy responds. The adjusters for the two policies decide by tracing where the water came from, so photographs of the street and the yard during the event are worth taking."] },
    { question: "My home policy says it covers water damage. Why is flood excluded?", answer: ["Home policies cover sudden water from inside the house, from a supply line or an appliance, and they exclude water that rises from outside because a flood hits every house on the street at once and the loss does not spread across a normal book of business. That is why flood is written separately, and why the federal program exists at all."] },
    { question: "Do I need contents coverage if I have building coverage?", answer: ["The building policy pays nothing for belongings, and a renter needs contents only. A single-storey slab home takes water across every room in a flood, so the contents loss is usually the whole ground floor. Price it; for a household with modest furnishings a small contents limit with a higher deductible is often the right buy."] },
    { question: "Can I get flood coverage on a rental or a manufactured home?", answer: ["Yes. A landlord insures the building and the tenant insures contents; a manufactured home qualifies if it is anchored to a permanent foundation. Private carriers vary on both, so the analysis checks each."] },
  ],
  relatedProducts: ["home-insurance", "renters-insurance", "landlord-rental-property-insurance", "mobile-manufactured-home-insurance"],
  seo: { description: "How flood insurance works in the desert Southwest and the Mountain West: NFIP versus private flood, building and contents, waiting periods, elevation certificates, and why every home policy excludes it. Independent agency in Arizona, Nevada, Utah and Idaho." },
};
