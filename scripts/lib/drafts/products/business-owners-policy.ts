import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "One policy that packages the building and contents, general liability and lost income for a small business that fits a carrier's eligibility rules. It costs less than the same parts bought separately, and the eligibility test, not the price, decides whether it is the right form.",
  intro: [
    "A business owners policy is a package form written for smaller, lower-hazard businesses: an office, a retail shop, a salon, a small restaurant, a light contractor, a landlord with a few commercial units. Instead of a commercial property policy and a general liability policy with two premiums and two sets of terms, the BOP puts both in one contract and adds business income coverage, which most standalone property policies leave out unless it is asked for. The carrier accepts the lower combined premium because it is writing a class of business it understands and can rate as a group.",
    "Not every business can buy one. Each carrier publishes eligibility rules built around what the business does, its annual sales, its square footage, the building's construction and age, and sometimes the number of employees or locations. A business that fails any test is written on a commercial package instead, the same coverages assembled part by part at a higher combined premium. Growing out of a BOP is normal.",
    "The premium is rated on the building and contents values, the business class, the location, the liability limits and the deductible. The analysis takes the lease or mortgage requirements, the carrier's rating figures, and the contents you would have to replace, and shows the BOP against a package quote for the same business. When the business does not fit the form, we say so and price the package instead.",
  ],
  coverageBlocks: [
    {
      heading: "Building and business personal property",
      paragraphs: [
        "The property side pays to repair or replace the building, if you own it, and the contents you use to run the business: fixtures, furniture, equipment, computers, stock and the improvements you paid for in a rented space. Most BOP forms are written on a special form, meaning any cause of loss is covered unless the policy names it as excluded, and most pay on a replacement cost basis, so the settlement is the cost of new equipment rather than the depreciated value of the old.",
        "The contents limit is the number that goes wrong most often. Owners set it from memory at the first quote and never revisit it, while years of accumulated equipment and stock sit above the limit until a fire settles at the figure on the declarations page. A written inventory, updated at each renewal, is the fix.",
      ],
    },
    {
      heading: "Business income and extra expense",
      paragraphs: [
        "When a covered property loss closes the business, business income coverage replaces the net income you would have earned and pays the continuing expenses, payroll among them, for the time it takes to repair and reopen. Extra expense pays what it costs to keep operating meanwhile: a temporary location, rented equipment, overtime to move stock. Most BOP forms write this as actual loss sustained for a set number of months rather than as a dollar limit, an advantage over a standalone property policy where the limit has to be chosen in advance.",
        "The income loss has to follow physical damage to your own premises from a cause the policy covers. A closure because a power line failed two streets away, or because a public order shut the block, is covered only where an endorsement extends to those situations, and the extensions carry shorter periods and separate limits.",
      ],
    },
    {
      heading: "General liability",
      paragraphs: [
        "The liability section is the same coverage a standalone general liability policy provides, written on the same occurrence basis with the same per-occurrence and aggregate limits: bodily injury and property damage to third parties, products and completed operations, personal and advertising injury, and a small medical payments limit for members of the public. A landlord who asks for a certificate showing general liability is satisfied by a BOP, and the additional insured, waiver of subrogation and primary wording endorsements that leases ask for are all available on the package.",
      ],
    },
    {
      heading: "Endorsements worth asking about",
      paragraphs: [
        "The base form is deliberately narrow, and a BOP is fitted to a business through endorsements. The common ones are equipment breakdown, which covers the mechanical and electrical failure the property form excludes; spoilage, for a restaurant or grocer whose stock depends on refrigeration; employee dishonesty, for theft from the inside; hired and non-owned auto, for the employee who runs an errand in their own car; utility services, which extends business income to an off-premises power or water failure; and a data breach endorsement that adds a limited first-party response to a compromised customer list.",
        "Professional liability is offered as an endorsement for a few classes, such as barbers, funeral directors and printers. For most professions it is not available on the package and is bought as a separate policy.",
      ],
    },
    {
      heading: "What the package does not replace",
      paragraphs: [
        "A BOP does not include workers' compensation, which every state handles separately. It does not cover vehicles titled to the business; those need a commercial auto policy. It does not cover professional advice, errors in the work product, or cyber losses beyond a small endorsement. And it is not a flood or earthquake policy: both are excluded on the property side and written on their own forms. A small business with employees and a van ends up with all three policies, and a general contractor's certificate request will list them.",
      ],
    },
  ],
  covered: [
    "The building you own, including permanently installed fixtures and equipment",
    "Contents, stock, furniture, computers and tenant improvements, at replacement cost on most forms",
    "Lost net income and continuing payroll while a covered loss keeps the business closed",
    "Extra expense to operate from a temporary location during repairs",
    "Injuries to customers and damage to their property arising from your premises or operations",
    "Injury or damage caused by your product or your completed work",
    "Certificates of insurance and additional insured endorsements for landlords and clients",
  ],
  notCovered: [
    "Injuries to your own employees, which belong to workers' compensation",
    "Vehicles owned or leased by the business, which belong to commercial auto",
    "Professional advice, design errors and mistakes in the work product itself",
    "Flood and earthquake damage to the building or contents",
    "Mechanical and electrical breakdown of equipment without the endorsement",
    "Money, securities and employee theft beyond a small built-in limit, without the endorsement",
    "Businesses outside the carrier's eligibility classes, which are written on a commercial package instead",
  ],
  discounts: [
    { name: "Package credit", description: "The BOP itself is the discount: the combined premium is set below what property and general liability would cost separately for an eligible class." },
    { name: "Protective devices", description: "Central-station burglar and fire alarms, sprinklers and a monitored suppression system in a commercial kitchen each earn a credit on the property rate." },
    { name: "Claims-free history", description: "Several years with no property or liability claim lowers the rate, and a single small claim can cost more in lost credit than it paid." },
    { name: "Building age and construction", description: "Newer masonry or steel buildings, and older buildings with updated roofs, wiring, plumbing and heating, rate lower than frame buildings with original systems." },
    { name: "Higher deductible", description: "Raising the property deductible from the carrier's default to a figure the business could absorb lowers the premium each year." },
  ],
  faqs: [
    {
      question: "How do I know whether my business qualifies for a BOP?",
      answer: [
        "Each carrier keeps its own eligibility list, and the lists differ enough that a business one carrier declines another writes without comment. The usual tests are the class of business, annual sales, building size, and for restaurants the share of sales that is alcohol and whether there is cooking with grease. Light-trade contractors qualify with some carriers if they do no work at height. Send us what the business does, where it is and roughly what it sells, and we can tell you which of the carriers we represent will write it on the package.",
      ],
    },
    {
      question: "My landlord's lease asks for property and liability coverage. Does a BOP satisfy it?",
      answer: [
        "Almost always, and it is what the lease is usually written expecting. The lease will name a liability limit, ask that the landlord be added as an additional insured, and often ask for a waiver of subrogation and coverage on the tenant improvements and the glass. All of those are standard BOP endorsements. Bring us the insurance section of the lease before you sign it; the analysis checks each requirement against the policy and lists the ones that need an endorsement.",
      ],
    },
    {
      question: "Why is business income coverage such a large part of the value?",
      answer: [
        "Because a fire that destroys a shop's contents is a loss the owner can picture, and the months of rent, payroll and lost sales that follow are the loss that actually ends the business. On a standalone property policy the income coverage is optional, has to be limited to a chosen figure, and is the item owners most often decline to save premium. On a BOP it is built in on an actual loss sustained basis: the carrier pays what the books show was lost for the restoration period, up to the time limit in the form.",
      ],
    },
    {
      question: "Does a BOP cover my equipment when it leaves the shop?",
      answer: [
        "Only a little. The property section has a small off-premises extension for contents temporarily away from the location, and a separate small limit for property in transit. A contractor whose tools live in the truck, a photographer whose cameras travel to every job, or a mobile groomer with a fitted van has most of their equipment outside the building most of the time, and needs an inland marine floater scheduled alongside the package.",
      ],
    },
    {
      question: "What deductible should I carry on the property side?",
      answer: [
        "One the business could pay from cash on a bad day without borrowing. The arithmetic is short: suppose a higher deductible saves a few hundred dollars a year and raises what you pay on a claim by a few thousand; if the business goes several years between claims, the higher deductible wins, and if it cannot absorb that figure, the lower one is right even though it costs more. Business income coverage carries a waiting period of a few days rather than a dollar deductible, and that is not adjustable on most forms.",
      ],
    },
  ],
  relatedProducts: ["general-liability-insurance", "workers-compensation-insurance", "commercial-auto-insurance", "retail-business-insurance", "restaurant-insurance"],
  seo: { description: "What a business owners policy (BOP) bundles for a small business: building and contents, general liability and business income, who qualifies, what it leaves out and which endorsements to add, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
