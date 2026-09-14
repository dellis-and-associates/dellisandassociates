import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "A package for a shop that holds stock and serves the public: the inventory and fixtures, the customer who falls in the aisle, the income lost while the store is closed after a loss, and the cash and goods that walk out through the register. Priced on sales, stock, location and what you sell.",
  intro: [
    "A retail store is mostly stock and foot traffic. The insurance follows those two facts: a property section for the merchandise, fixtures and the improvements you paid for in a leased space, and a liability section for the people who come through the door. Most shops buy it as a business owners policy, a package that bundles property, liability and business income at a single price, and then add the endorsements their particular goods and their lease require.",
    "The landlord is usually the first to ask for it, with a lease that names a liability limit, requires the landlord to be an additional insured, and often makes the tenant responsible for plate glass and interior improvements. A lender on the inventory line, a franchisor, or a shopping-centre management company will each ask for a certificate of insurance, the one-page summary the agency issues that lists your carrier, policy period, limits and the parties named on the policy.",
    "The premium is set from annual sales, the value of stock at its seasonal peak, the type of merchandise, the building's construction and fire protection, the neighbourhood's theft experience and whether you sell online as well as in the store. A jeweller, a vape shop and a bookstore in the same plaza are priced very differently. The analysis prices the store as it operates across the carriers we represent and says plainly if the package you already have is the right one.",
  ],
  coverageBlocks: [
    {
      heading: "Stock, fixtures and tenant improvements",
      paragraphs: [
        "The property section covers merchandise, shelving, displays, registers and computers, and the improvements and betterments you installed in a rented space, against fire, theft, vandalism, water from a burst pipe and similar perils. Stock is the number that goes wrong most often. It is insured at cost, not retail, and the limit has to be set from the busiest month, not a typical one; many forms include a peak-season increase for a stated window, and a store that stocks up for the holidays should confirm it is there. Property in transit and at trade shows or a second location needs its own small extension.",
      ],
    },
    {
      heading: "Premises and products liability",
      paragraphs: [
        "General liability pays when a customer is injured in the store or by something you sold: a fall on a wet entry mat, a display that tips, a child hurt by a toy that was recalled, an allergic reaction to a cosmetic. Products liability is the part that follows the goods home, and it matters more for a store that imports, private-labels or resells goods from small makers, because the manufacturer's own insurance may be thin or overseas. The lease's additional insured requirement is met on this section by endorsement.",
      ],
    },
    {
      heading: "Business income and extra expense",
      paragraphs: [
        "When a covered loss closes the store, business income pays the net profit you would have earned and the expenses that continue, including rent and payroll, for the period it takes to repair and restock. Extra expense pays the cost of operating another way, such as a temporary location or expedited shipping on replacement stock. Package policies often write this on an actual-loss-sustained basis for a set number of months rather than with a dollar limit, and the length of that period is the thing to check against how long a rebuild of your space and a reorder of your stock would really take. Civil authority coverage extends it when access to the store is blocked by damage nearby.",
      ],
    },
    {
      heading: "Crime: employee theft, money and forgery",
      paragraphs: [
        "Property insurance covers theft by outsiders. It excludes theft by your own employees, and it limits money and securities to a small amount. A crime section, or a separate crime policy, adds employee dishonesty for stock and cash taken over time, money and securities inside and outside the premises including the deposit run to the bank, forgery of cheques, and, with an endorsement, funds transferred out after a deceptive email. For a store with a few employees and a cash drawer, the employee dishonesty limit is the one that pays most often, and it usually has to be requested.",
      ],
    },
    {
      heading: "Equipment breakdown, spoilage and online sales",
      paragraphs: [
        "Equipment breakdown pays when refrigeration, the HVAC system or the point-of-sale network fails from an internal electrical or mechanical cause, which a fire policy excludes. A store with perishable stock adds spoilage for the contents of coolers after a breakdown or outage. If you sell online, the card data and customer records you hold bring a cyber exposure that the package does not cover, and a cyber section or standalone policy fills it; the card processor's agreement puts breach costs on you regardless of what your package says.",
      ],
    },
  ],
  covered: [
    "Merchandise, shelving, displays and registers after fire, theft or water damage",
    "Improvements you installed in a leased space",
    "A customer injured by a fall or a falling display in the store",
    "Injuries caused by a product you sold, including private-label goods",
    "Lost profit and continuing rent and payroll while the store is closed after a covered loss",
    "Cash and merchandise stolen by an employee, with the crime section",
    "The bank deposit taken in a robbery on the way to the bank",
    "Refrigerated stock lost after a compressor failure, with spoilage",
  ],
  notCovered: [
    "Stock above the policy limit during a season peak the limit was not set for",
    "Unexplained inventory shortage discovered at a count, with no proof of a theft",
    "Employee theft when no crime section was bought",
    "Income lost to a slow season, a competitor opening or road works with no physical damage",
    "Customer card data breaches and hacked online stores, without a cyber policy",
    "Flood and earthquake, which need their own policies in the four states",
    "Goods consigned to you or held for customers, unless the policy is endorsed for property of others",
  ],
  discounts: [
    { name: "Business owners package", description: "Property, liability and business income written as one policy rather than three, which is nearly always the lower price for a store." },
    { name: "Central-station burglar and fire alarm", description: "Monitored alarms and, in some cases, a sprinklered building; the property rate is lowered directly." },
    { name: "Higher property deductible", description: "Raising the property deductible on the package in exchange for a lower rate, sensible where stock turns over quickly." },
    { name: "Claims-free renewal", description: "No property or liability claims over the carrier's look-back period." },
    { name: "Paid in full", description: "Paying the annual premium at inception rather than by instalment, which removes billing fees with most carriers." },
  ],
  faqs: [
    {
      question: "How do I set the stock limit?",
      answer: [
        "At cost, at the highest point in your year, plus a margin for goods on order that arrive before the old stock sells. Many package policies include a seasonal increase for a stated window and a stated increase, which covers the holiday build if your base limit is honest the rest of the year. Suppose a gift shop carries stock costing sixty thousand dollars most months and one hundred thousand in November; a policy with a limit set at sixty and a seasonal increase would pay the November loss only if the increase reaches the higher number, so the analysis checks the endorsement against your actual buying pattern.",
      ],
    },
    {
      question: "The lease makes me responsible for the storefront glass. Is that on the policy?",
      answer: [
        "Glass is covered as part of building or tenant improvement coverage on most package forms, but a lease that assigns it to the tenant means the limit has to include it, and some carriers write it with a separate small deductible. Send us the lease's insurance clause and the certificate will be issued to match what it requires.",
      ],
    },
    {
      question: "What does business income actually pay if I have to close for two months?",
      answer: [
        "The net income the store would have earned in those months, based on your prior sales records, plus the expenses that keep running, such as rent, loan payments and the payroll you choose to keep paying, and the extra cost of any temporary arrangement. The claim is documented from your books, so accurate sales records are what make it pay quickly. Coverage stops at the end of the period of restoration or when the store could reasonably have reopened, whichever comes first.",
      ],
    },
    {
      question: "Are my goods covered while I sell at a market or a pop-up?",
      answer: [
        "Only within the small off-premises and transit extensions the package includes, which are often a fraction of the main limit. A store that regularly sells away from its address adds an inland marine floater for stock in transit and at temporary locations, and liability follows you to the event but the venue may ask to be an additional insured for the day.",
      ],
    },
    {
      question: "I am a sole owner with two part-time staff. Do I need workers compensation?",
      answer: [
        "Each state sets its own threshold for when an employer must carry it, and part-time staff generally count. It is a separate policy from the package, priced on payroll and the retail classification, and the cost for a small store is modest. The analysis confirms the rule for your state and the owner exclusion options.",
      ],
    },
  ],
  relatedProducts: ["business-owners-policy", "general-liability-insurance", "cyber-liability-insurance", "workers-compensation-insurance"],
  seo: { description: "How a retail store's insurance is built: stock and fixtures, premises and products liability, business income, employee theft and money coverage, equipment breakdown and online sales, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
