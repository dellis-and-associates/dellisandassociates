import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Inland marine vs commercial property insurance",
  excerpt: "Commercial property insures what stays at the address on the policy; inland marine insures what moves, is in transit, or belongs to someone else. How the two forms decide where coverage stops, a worked loss on a jobsite, which equipment belongs on which form, and when the property policy alone.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A commercial property policy is built around a location. It lists the building and the business personal property at a scheduled address, and it pays for loss to that property at that address, with a small allowance for property temporarily elsewhere. An inland marine policy is built around the property itself, wherever it happens to be: on a truck, at a customer's site, in a rented storage unit, or in the hands of a subcontractor. The name is an accident of history, since the ocean marine underwriters who insured cargo at sea extended the idea to goods moving over land, and it has stuck to a family of forms that have nothing to do with water.",
        "The two are not competing products. Almost every business that owns equipment ends up with both, and the question is never which one to buy but where the line between them should sit, because property that falls on the wrong side of it is either uninsured or insured twice.",
      ],
    },
    {
      heading: "What commercial property covers",
      paragraphs: [
        "The commercial property form insures the building, if the business owns it, and business personal property: furniture, fixtures, inventory, machinery and stock, at the premises described in the declarations. The named location matters. Coverage for property away from the premises is limited to a modest off-premises extension and a short window for property in transit or newly acquired locations, and those extensions are sub-limited, often in the low tens of thousands, and expire on a schedule the policyholder rarely reads.",
        "The form settles either at replacement cost or actual cash value, subject to a coinsurance clause that penalises the insured for carrying a limit below a stated share of the property's value. Perils are usually written on a special form, covering everything not excluded, with the standard exclusions for flood, earth movement, wear, and mechanical breakdown. For a shop, an office or a warehouse whose contents rarely leave the building, this is the whole answer.",
      ],
    },
    {
      heading: "What inland marine covers",
      paragraphs: [
        "Inland marine is a category rather than a single form, and the forms inside it share one feature: coverage follows the property rather than the address. The commonest ones for a small business are the contractors equipment floater for tools and machinery used at jobsites, the installation floater for materials the contractor has bought but not yet built in, the transit or motor truck cargo form for goods moving on the insured's own vehicles, bailee coverage for customers' property in the insured's care, and the electronic data processing form for computers and portable devices.",
        "Because these forms were written for mobile property, they price the exposures a stationary property form ignores: theft from an unattended site, damage in loading and unloading, collision and overturn of the truck carrying the goods, and loss at a location the carrier has never heard of. Many are written on a scheduled basis, listing each item and its value, with a blanket amount for small unscheduled tools, and they usually settle at actual cash value unless replacement cost is bought for scheduled items.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "The difference is the trigger for where coverage exists. A commercial property policy asks, was the property at the insured premises, or within one of the narrow extensions, when the loss happened. An inland marine policy asks, is this one of the items or classes of property we agreed to cover, and did a covered cause damage it, and the location is irrelevant unless the form excludes a specific one. That single distinction explains why an excavator stolen from a jobsite is a straightforward inland marine claim and a nearly hopeless commercial property claim, and why a stockroom fire is the reverse.",
        "There is a second, quieter difference in what the forms think property is worth away from the premises. A property form's off-premises extension pays up to its sub-limit and then stops. A contractors equipment floater pays up to the scheduled value of each item, and the coinsurance clause on the property policy does not touch it. A business that has been relying on the property extension to cover a trailer full of tools usually discovers the sub-limit at the worst moment.",
      ],
    },
    {
      heading: "A worked loss",
      paragraphs: [
        "Suppose an electrical contractor in Mesa carries a commercial property policy with a business personal property limit of $150,000 at the shop and an off-premises extension of $15,000. The crew leaves a locked job trailer at a new-build site overnight, and by morning the trailer, a wire-pulling machine, a set of conduit benders and the crew's hand tools are gone, a total of $48,000 at replacement. Under the property policy alone, the carrier pays the $15,000 extension and nothing more, and the contractor absorbs $33,000.",
        "Now suppose the same contractor also carries a contractors equipment floater listing the trailer at $12,000, the wire-pulling machine at $22,000 and the benders at $6,000, with a $10,000 blanket for unscheduled hand tools and a $1,000 deductible. The floater pays the scheduled items at their scheduled values, pays the hand tools up to the blanket, and the contractor's out-of-pocket is the deductible plus whatever the hand tools exceeded the blanket by. The property policy is not touched, so the claim does not count against the shop's loss history. The figures are illustrative; the point is that the same theft is a small deductible on one form and a five-figure gap on the other.",
      ],
    },
    {
      heading: "Which property belongs on which form",
      paragraphs: ["The decision rule is about how the property spends its time, not what it is."],
      bullets: [
        "Property that stays at the premises belongs on the commercial property form: shelving, shop machinery bolted down, inventory in the warehouse, office furniture and fixed computers.",
        "Property that regularly leaves the premises to earn money belongs on an inland marine form: contractors equipment, tools in trucks, mobile medical or survey equipment, catering equipment, portable signage and staging.",
        "Materials bought for a specific job and stored on the jobsite until installed belong on an installation floater; the property form's transit extension is too small and too short for them.",
        "Goods moving on the business's own vehicles belong on a motor truck cargo or transit form; a commercial auto policy pays for the truck, not for what is in it.",
        "Customers' property in the business's care, such as items in for repair, garments at a cleaner, or vehicles at a shop, belongs on a bailee form; the property policy generally treats it as someone else's property and pays little or nothing.",
        "Computers and phones that travel with staff belong on an electronic data processing form or a scheduled inland marine item; the property form's coverage for them away from the building is thin.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Across Arizona, Nevada, Utah and Idaho the exposure that drives inland marine claims is theft from unattended sites and vehicles, and carriers rate it by where the equipment is parked overnight. Equipment stored in a fenced yard in Boise is priced differently from equipment left on open lots in the Phoenix or Las Vegas metro. Long haul distances between jobs in rural Nevada and Idaho put more equipment on the road for more hours, which raises the transit share of the exposure. Monsoon flash flooding in Arizona can reach equipment left in washes and low-lying lots, and most inland marine forms cover flood where the property form excludes it, which is a real advantage for jobsite property in the desert. Wildfire smoke and ash damage to equipment stored outside on the urban edge is a covered peril on most floaters as well.",
      ],
    },
    {
      heading: "When the property policy alone is enough",
      paragraphs: [
        "A business whose property genuinely stays put, an office, a retail store, a restaurant, a small manufacturer whose machinery is fixed, does not need an inland marine form, and adding one buys nothing. The test is to walk through the last month and ask what left the building and what it was worth while it was out. If the honest answer is a laptop and a few boxes of samples, the property form's extension already covers that, and a floater would duplicate it at a cost.",
        "The business that should not stand pat is the one that has grown a mobile side without noticing: the shop that started sending crews to customers, the retailer doing pop-up events, the contractor whose tool inventory has doubled since the policy was written. In each case the property limit at the premises has kept pace while the off-premises exposure has quietly outgrown the extension. A schedule of what travels, with a value against each item, is all it takes to see whether the line between the two forms is in the right place, and if it is, that is what the review will say.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Bring the property declarations, the equipment list and the last few months of jobs or deliveries. We show what the current property form would pay on a theft or damage away from the premises against what the equipment is worth, and price a floater or transit form across the carriers we represent in Arizona, Nevada, Utah and Idaho where the gap is real. Where the property policy already covers what leaves the building, we say so and leave the structure alone.",
      ],
    },
  ],
  relatedProducts: ["contractors-insurance", "business-owners-policy", "commercial-auto-insurance"],
  relatedArticles: ["how-to-insure-equipment-and-tools-for-a-contracting-business", "builders-risk-vs-standard-property-insurance", "bop-vs-buying-coverages-separately", "how-to-insure-a-food-truck-or-mobile-business"],
  relatedTerms: ["inland-marine-insurance", "floater", "cargo-insurance", "co-insurance", "builders-risk-insurance"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
