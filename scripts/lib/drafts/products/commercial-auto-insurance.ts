import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Insures vehicles a business owns, leases or uses for work, from a single pickup to a fleet. It pays what the business owes after a crash, repairs its own vehicles, and, with the right symbols, covers employees driving their own cars on company errands, which a personal auto policy does not.",
  intro: [
    "A personal auto policy is written for a person and carries a business-use exclusion, so a truck that hauls tools to job sites, a van that delivers, or a car titled to an LLC is either uninsured or badly insured on it. Commercial auto is the same set of coverages, liability, collision, comprehensive, uninsured motorist and medical payments, written for the business as the named insured, priced on the vehicles' use and radius, and able to cover drivers the business does not name.",
    "The coverage each vehicle carries is set by numbered symbols on the declarations page rather than by listing the car alone. One symbol covers any auto; others limit coverage to owned autos, hired autos or non-owned autos. Which symbols you buy decides whether an employee's own car on a company errand, a rental picked up at an airport, or a vehicle bought mid-term is covered, and reading the symbols is the first thing we do with an existing policy.",
    "Premium follows the vehicle type and weight, the radius of operation, what is carried, who drives and their records, the garaging address and the limits. A landscaper's dump truck running locally and a sales rep's sedan on the freeway between Phoenix and Las Vegas are rated differently, and a driver with a poor record on a fleet raises the whole account. The analysis prices the same schedule with the carriers we represent and flags the vehicles, drivers and symbols that do not match how the business actually operates.",
  ],
  coverageBlocks: [
    { heading: "Liability", paragraphs: ["Pays injury and property damage the business is legally liable for arising from the ownership, maintenance or use of a covered auto, and defends the suit. Commercial policies usually carry a single combined limit per accident rather than the split limits common on personal policies. Contracts, and the federal and state rules for certain trucking and passenger operations, set floors for the vehicle type; contracts with general contractors and municipalities often require a limit well above what the vehicle alone would suggest, and a commercial umbrella sits above this limit for accounts that need more."] },
    { heading: "Physical damage: collision and comprehensive", paragraphs: ["Collision repairs or replaces a covered vehicle after impact with another vehicle or object; comprehensive covers theft, fire, vandalism, hail, glass, flood and animal strikes. Each is bought per vehicle with its own deductible, so an older truck can carry liability only while the new one carries both. Vehicles are valued at actual cash value unless a stated amount is scheduled, and permanently attached equipment such as a lift gate, a rack or a service body is covered only if it is included in the value."] },
    { heading: "Hired and non-owned autos", paragraphs: ["Hired auto covers vehicles the business rents or borrows; non-owned auto covers vehicles the business does not own, chiefly employees' personal cars used for errands, deliveries and client visits. When an employee causes a crash in their own car on company business, the injured party sues the business, and this coverage is what answers. It is inexpensive, it is missing from a great many small-business policies, and it is the first gap we look for on a company whose staff drive their own cars."] },
    { heading: "Uninsured motorist and medical payments", paragraphs: ["Uninsured and underinsured motorist pays your driver's and passengers' injuries when the at-fault driver has no insurance or too little; the states differ on whether it can be rejected and on the limits offered. Medical payments pays occupants' medical bills regardless of fault. Utah adds personal injury protection under its no-fault system. For a business whose employees are covered by workers' compensation for on-the-job injuries these coverages matter less; for an owner-driver with no compensation policy they matter more."] },
    { heading: "Cargo, tools and other add-ons", paragraphs: ["The auto policy does not cover what the vehicle carries. Tools, materials and equipment need an inland marine or contractor's equipment floater; goods hauled for others need motor truck cargo coverage. Rental reimbursement, towing, and a downtime endorsement that pays lost income while a revenue-producing vehicle is repaired are bought separately, as is an endorsement covering employees as insureds when driving a company vehicle for personal use."] },
  ],
  covered: [
    "Injury and property damage caused by a covered vehicle, and the defence of the suit",
    "Repair or replacement of owned vehicles after a collision, less the deductible",
    "Theft, fire, vandalism, hail, glass and flood damage to owned vehicles",
    "Claims against the business when an employee crashes their own car on company business",
    "Rented and borrowed vehicles used by the business",
    "Injuries to occupants caused by an uninsured or underinsured driver",
    "Permanently attached equipment included in the vehicle's scheduled value",
  ],
  notCovered: [
    "Tools, materials and cargo inside the vehicle",
    "Injuries to your own employees while driving for you, which fall to workers' compensation",
    "Wear, mechanical breakdown and tyre damage",
    "Vehicles not reached by the symbols on the declarations page",
    "Loss of income while a vehicle is in the shop, without a downtime endorsement",
    "Rideshare, delivery-app and for-hire passenger use without a specific endorsement or filing",
    "Racing, and use by a driver the carrier has excluded by name",
  ],
  discounts: [
    { name: "Fleet or multi-vehicle", description: "A schedule of several vehicles is rated as an account with a credit over single-vehicle pricing." },
    { name: "Package with a BOP or general liability", description: "Writing the auto with the rest of the business's policies with one carrier earns a credit on both." },
    { name: "Driver record and hiring practices", description: "Clean motor vehicle records for every listed driver, and a written policy of checking records before hiring." },
    { name: "Telematics and dash cameras", description: "Some carriers credit fleets that run a telematics program or install forward-facing cameras." },
    { name: "Higher deductibles", description: "Raising collision and comprehensive deductibles on a fleet that can absorb them lowers the physical damage premium." },
    { name: "Paid in full", description: "Annual payment instead of monthly instalments." },
  ],
  faqs: [
    { question: "My truck is in my own name. Can I keep it on my personal policy?", answer: ["If it is used for business, telling the personal carrier is the only way to know. Some will endorse a pickup for light business use by a sole proprietor; many will not cover deliveries, hauling for hire, a vehicle titled to a company, or a heavy vehicle. An undisclosed business use is a reason to deny a claim after a crash, which is the worst moment to learn the answer."] },
    { question: "Are employees covered when they drive their own cars for me?", answer: ["Their own policy is primary for their own car, and the business is covered for the claim against it only if the policy carries non-owned auto. The employee's policy may also exclude business use. The prudent setup is non-owned auto on the business policy, proof that employee drivers carry their own insurance, and a record check before allowing anyone to drive on company business."] },
    { question: "What limit do contracts usually ask for?", answer: ["Contracts specify a combined single limit, and larger general contractors, government bodies and property managers ask for more, frequently with an umbrella above it and additional insured status on the auto policy. Federal and state authorities set their own floors for vehicles over a certain weight and for carrying passengers or hazardous materials; those figures depend on the vehicle and the operation, and we confirm them against the current rule before writing the policy."] },
    { question: "Do I need a filing or a certificate for my truck?", answer: ["Operations that cross state lines or carry passengers or hazardous cargo may need a federal filing proving liability coverage, and intrastate for-hire haulers may need a state filing; the carrier files it on request. A certificate of insurance is different: a one-page summary issued by the agency to a customer or contractor showing the auto limits, sent on request at no charge."] },
    { question: "How is a company vehicle covered when an employee takes it home?", answer: ["The business's liability covers the employee as a permissive user while driving a covered auto, including on the way home. What is often missing is coverage for the employee and their family as insureds for personal use, and for the employee's own liability; a drive-other-car or broadened coverage endorsement fills that for an owner or key employee whose only vehicle is the company one."] },
  ],
  relatedProducts: ["general-liability-insurance", "business-owners-policy", "commercial-umbrella-insurance", "contractors-insurance", "workers-compensation-insurance"],
  seo: { description: "Commercial auto insurance for a small business in Arizona, Nevada, Utah and Idaho: coverage symbols, liability limits, physical damage, hired and non-owned autos, filings and certificates, from an independent agency." },
};
