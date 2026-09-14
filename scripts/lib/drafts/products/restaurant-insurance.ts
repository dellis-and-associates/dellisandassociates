import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "A package built around what goes wrong in a kitchen and a dining room: fire and equipment breakdown, a guest who slips or gets sick, a walk-in that fails overnight, and the bar's liquor exposure. Priced on sales, seating, cooking method, hours and whether alcohol is served.",
  intro: [
    "A restaurant carries more distinct exposures per square foot than almost any other small business. It cooks over open flame, stores perishable inventory worth a week of sales, serves alcohol, employs a young and changing workforce, and hosts the public in a room with wet floors. A restaurant policy is a business owners package with the parts adjusted for that reality, plus the endorsements a landlord, a liquor licence and a delivery operation each demand.",
    "Who asks for it is usually the landlord first, then the liquor licensing authority, then the lender on the build-out. The landlord's lease sets the liability limit and asks to be named on the policy; the liquor authority may require proof of liquor liability before a licence is issued or renewed; a lender or equipment lessor wants to be listed as loss payee on the kitchen equipment. Each of those is proved with a certificate of insurance, a one-page summary the agency issues showing carriers, limits, dates and the interests named.",
    "The premium is set by annual sales, the split between food and alcohol, seating capacity, hours of operation, the cooking equipment and its fire suppression, the age and construction of the building, and the claims history. A late-night bar with a fryer line and a patio is a different risk from a lunch counter, and the analysis prices your restaurant as it actually operates across the carriers we represent.",
  ],
  coverageBlocks: [
    {
      heading: "Property, kitchen equipment and tenant improvements",
      paragraphs: [
        "The property section insures what you own inside the space: ovens, hoods, refrigeration, furniture, point-of-sale hardware and inventory, plus the improvements you paid for in a leased building, such as the build-out of the kitchen and the bar. Fire is the headline peril, and carriers ask about the hood and duct cleaning schedule and the automatic suppression system before quoting. Equipment breakdown coverage, added to the property section, pays when a compressor, a dishwasher or the hood's electrical panel fails from an internal cause that a fire policy would otherwise exclude.",
      ],
    },
    {
      heading: "General liability and food-borne illness",
      paragraphs: [
        "General liability pays when a guest is injured on the premises or by your product: a fall on a wet floor, a burn from a hot plate, an allergic reaction to an undisclosed ingredient, or a group of guests made ill by a contaminated batch. Products and completed operations coverage is what responds to the illness claims, and it follows the food out the door with catering and delivery orders. Some carriers offer a contamination extension that pays the cost of closing, cleaning and restocking after a health-department order, which the standard liability form does not.",
      ],
    },
    {
      heading: "Liquor liability",
      paragraphs: [
        "General liability excludes injury caused by serving alcohol to anyone who then hurts themselves or someone else. Liquor liability fills that exclusion. It pays when a guest you served drives away and causes a crash, or assaults another patron, and a claim is brought against the restaurant for having served them. Each of the four states has its own law on when a server can be held responsible, and the limit the licensing authority or landlord asks for is often as large as the general liability limit itself.",
        "The premium for this part is driven by the share of sales that is alcohol, closing time, entertainment and whether staff hold a recognised server training certificate. Assault and battery exclusions are common on cheaper forms and are worth reading before choosing a quote, because a bar fight is one of the more frequent claims.",
      ],
    },
    {
      heading: "Spoilage and utility interruption",
      paragraphs: [
        "Spoilage coverage pays for the contents of walk-ins and freezers when refrigeration fails from a mechanical breakdown or a power outage, and it is not included in a basic property policy. It is written with its own limit, usually set from the value of the inventory you carry on a busy weekend. Utility service interruption is the companion coverage: it pays lost income when a power or water outage away from your premises closes the restaurant, subject to a waiting period and, on some forms, a requirement that the damage to the utility be from a covered cause.",
      ],
    },
    {
      heading: "Business income, workers compensation and delivery",
      paragraphs: [
        "Business income replaces the net income and continuing expenses, including payroll and rent, while a covered loss keeps the restaurant closed, and extra expense pays to operate from a temporary location. The period of restoration and any monthly limit decide how long it actually carries you. Workers compensation covers a kitchen's burns, cuts and back injuries and is required for employees in each state under its own rules. If staff deliver in their own cars, hired and non-owned auto coverage is the endorsement that responds when they cause a crash on a run; a personal auto policy may not.",
      ],
    },
  ],
  covered: [
    "Kitchen equipment, furniture and inventory after a fire, theft or water damage",
    "The build-out you paid for in a leased space",
    "A guest injured by a fall, a burn or an allergic reaction",
    "Food-borne illness claims from dine-in, catering and delivery orders",
    "Injuries caused by an intoxicated guest you served, under liquor liability",
    "Spoiled inventory after a refrigeration breakdown or power failure",
    "Lost income and rent while the restaurant is closed after a covered loss",
    "Employee injuries through workers compensation",
  ],
  notCovered: [
    "Losses from a fire in a hood that was not cleaned on the schedule warranted in the application",
    "Alcohol-related injuries when liquor liability is not on the policy or sales exceed what was declared",
    "Spoilage from an employee leaving a door open, on many forms, unless the endorsement covers it",
    "Income lost to a slow season, road construction or a health-department closure with no physical damage",
    "Employee theft of cash or inventory without a crime endorsement",
    "Wage and hour disputes, harassment and wrongful termination claims without employment practices coverage",
    "Delivery drivers' own vehicles, which need hired and non-owned or their own commercial auto coverage",
  ],
  discounts: [
    { name: "Automatic fire suppression and hood cleaning contract", description: "A serviced suppression system and a documented cleaning schedule; most carriers require these before quoting a cooking restaurant at all." },
    { name: "Certified server training", description: "Staff who complete a recognised responsible-service course, which reduces the liquor liability rate with many carriers." },
    { name: "Package policy", description: "Property, liability, liquor and business income written together with one carrier rather than as separate monoline policies." },
    { name: "Security and monitoring", description: "A monitored burglar alarm and cameras at the register and the back door." },
    { name: "Claims-free and years in business", description: "A loss history without liability or fire claims and an established operating record." },
  ],
  faqs: [
    {
      question: "My landlord's lease asks to be an additional insured with a specific limit. What do I do?",
      answer: [
        "Send us the insurance clause of the lease. The landlord is added by endorsement to the liability policy, the limit is raised if needed or an umbrella is added above it, and the certificate is issued to them showing exactly what the lease asks for. Leases also often require you to insure the building's glass and the tenant improvements even where the landlord owns them, which changes the property limit.",
      ],
    },
    {
      question: "We only serve beer and wine. Do we still need liquor liability?",
      answer: [
        "Yes, if any alcohol is sold or served. The general liability exclusion does not distinguish beer from spirits, and the liquor licensing authority does not either. The premium reflects the share of alcohol in your sales, so a restaurant where wine is a small part of the bill pays much less than a bar, but the coverage is the same.",
      ],
    },
    {
      question: "What happens if the power goes out and we lose the walk-in?",
      answer: [
        "Spoilage coverage pays for the inventory if the endorsement is on the policy, up to its limit, whether the cause was an outage or a compressor failure. Lost sales during the outage are a utility interruption claim, which has a waiting period and is only sometimes included. Suppose a summer storm knocks out power for a day and a half and the walk-in holds four thousand dollars of product; the spoilage limit pays the product, and the income for the closed day depends on whether utility interruption was bought and how long its waiting period is.",
      ],
    },
    {
      question: "Does the policy cover a health-department closure?",
      answer: [
        "Not on the standard form. Business income requires physical damage from a covered cause. A closure order after an inspection, or a contaminated product recall with no fire or water event, is covered only by a food contamination endorsement, which some carriers offer with its own limit for cleaning, restocking, lost income and advertising to reopen.",
      ],
    },
    {
      question: "How is the premium audited at the end of the year?",
      answer: [
        "Liability and liquor premiums are charged on estimated sales and trued up against your actual figures at renewal or audit, and workers compensation is trued up on payroll. Reporting sales and alcohol share honestly at the start avoids an audit bill, and undeclared alcohol sales can be treated as a misrepresentation at claim time rather than just a billing adjustment.",
      ],
    },
  ],
  relatedProducts: ["business-owners-policy", "general-liability-insurance", "workers-compensation-insurance", "commercial-auto-insurance"],
  seo: { description: "How a restaurant policy is built: property and equipment breakdown, general liability and food-borne illness, liquor liability, spoilage, business income and delivery, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
