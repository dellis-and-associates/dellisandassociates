import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "One policy for a working farm or ranch: the house and outbuildings, the equipment listed by serial number and the tools covered as a blanket, the livestock, and the liability that comes with animals, machinery and a public road. Crop yield and price losses are federal programmes bought separately.",
  intro: [
    "A farm policy combines a homeowners policy and a commercial property and liability policy into one contract, because on a farm the house, the shop, the tractor and the cattle share a fence line and a single loss can touch all of them. The form has separate sections for the dwelling and household contents, for farm personal property, for barns and other structures, and for liability, and each section carries its own limit and its own set of causes of loss.",
    "It is written for operations across the size range in Arizona, Nevada, Utah and Idaho: a cow-calf ranch in the mountains, an irrigated row-crop farm, a pecan or apple orchard, a dairy, a horse boarding stable, or a hobby farm on a few acres that sells eggs and hay. What changes between them is which sections carry weight. The lender on the land or the equipment, a grain buyer or packing house, a leased-ground landlord, and a county fair or a producers market that hosts your stand will each ask for a certificate of insurance, the agency-issued summary of your carrier, limits and the parties named on the policy.",
    "The premium is set by the value and construction of the buildings, the equipment schedule, the number and kind of livestock, acreage and what is grown on it, whether the public visits, and the operation's claims history. The analysis reads the schedule against what is actually in the yard and the barn, because the commonest problem with a farm policy is not what it excludes but what was never listed.",
  ],
  coverageBlocks: [
    {
      heading: "The farm dwelling and household contents",
      paragraphs: [
        "The house on the farm is insured much as a homeowners policy would insure it: the structure at replacement cost, household contents, additional living expense if a loss makes it unlivable, and personal liability for the family. The difference is that the same policy also knows about the shop next door and the fuel tank behind it, so the coverage does not fail because of a business use on the premises the way a standard homeowners policy might. A second dwelling for a hired hand or a family member is listed as an additional structure with its own limit.",
      ],
    },
    {
      heading: "Scheduled and unscheduled farm personal property",
      paragraphs: [
        "Farm personal property is the equipment and supplies of the operation, and the policy insures it two ways. Scheduled items are listed individually with a value: the tractors, combine, balers, pivots, a stock trailer, a horse trailer, a skid steer. Unscheduled property is a blanket limit for everything else, such as hand tools, fencing supplies, feed, seed, fertiliser and harvested crops in storage. A scheduled item is paid at its listed value, less the deductible; an unscheduled loss is paid from the blanket up to its limit, with sub-limits on some classes. The choice is a real one: scheduling costs more per item and pays more precisely, and a blanket bought too small is the usual shortfall after a shop fire.",
        "Equipment away from the home place is a separate question. Machinery working leased ground across the county, a truck and trailer hauling to the sale barn, or a header on a trailer parked at a neighbour's needs the policy's off-premises provision to reach it, and some forms limit that distance or require the equipment to be listed.",
      ],
    },
    {
      heading: "Livestock",
      paragraphs: [
        "Livestock coverage on the farm form is for named causes of loss, not illness or age. Animals are typically covered against fire, lightning, windstorm, flood in some forms, attack by dogs or wild animals, electrocution, drowning, collision with a vehicle on a road, and theft, either as a blanket by head count or scheduled for higher-value breeding stock and horses. Death from disease, calving loss, a hard winter or a plant poisoning is not a covered cause on the standard form. Animals in transit and at a show or sale barn need the off-premises extension, and a separate mortality policy is the product for a valuable stallion or bull whose loss from illness would matter.",
      ],
    },
    {
      heading: "Barns, shops, wells and outbuildings",
      paragraphs: [
        "Every structure other than the house is listed with its own value and cause-of-loss form: hay barns, the machine shed, calving sheds, grain bins, the shop, corrals, pump houses and the irrigation well itself. Older pole barns are often insured at actual cash value rather than replacement cost because the carrier will not pay to rebuild them to the same standard, and that choice should be made knowingly. Hay and straw in the open, fences and windmills are covered only with small sub-limits or by endorsement, and wind on a rural property in the four states is the single most frequent building claim.",
      ],
    },
    {
      heading: "Farm liability and what it does not reach",
      paragraphs: [
        "Farm liability pays when the operation injures someone or damages their property: cattle out on the highway, a bale that falls from a trailer, a pesticide drift claim from a neighbour, a visitor hurt at a pumpkin patch or a u-pick, or a product claim from eggs sold at a stand. It also covers the family's personal liability. Custom work for hire, agritourism with paid admission, boarding other people's horses and selling processed food each need to be declared, because several are excluded or limited unless they are rated. Hired-hand injuries fall under workers compensation, which each state treats differently for agricultural employers and which the analysis checks rather than assumes.",
        "Crop insurance is the part a farm policy does not include. Loss of yield or revenue on a growing crop from drought, hail, frost or price is insured through the federal crop insurance programme, sold through separately licensed crop agents on a fixed calendar, and the farm policy's crop coverage is limited to harvested crops in storage and, on some forms, a small limit for hail on standing crops. The two are bought and claimed separately.",
      ],
    },
  ],
  covered: [
    "The farmhouse and its contents at replacement cost",
    "Tractors, implements and trailers listed on the schedule, after a fire, storm, theft or overturn",
    "Hand tools, feed, seed and stored harvested crops under the blanket limit",
    "Livestock killed by fire, lightning, storm, dogs, electrocution or a vehicle collision",
    "Barns, sheds, shops and grain bins listed on the policy",
    "Injury to a visitor and damage to a neighbour's property caused by the operation",
    "Cattle that escape onto a road and cause a crash",
    "Products liability for eggs, hay, produce or meat sold from the farm",
  ],
  notCovered: [
    "Yield or revenue loss on a growing crop, which is federal crop insurance",
    "Livestock lost to disease, calving, age, weather stress or poisoning",
    "Equipment breakdown, wear and hydraulic or engine failure, without the endorsement",
    "Machinery that was never scheduled and exceeds the unscheduled blanket",
    "Flood damage to buildings, which needs a separate flood policy",
    "Pollution from fuel, manure or chemicals except within a limited endorsement",
    "Custom farming, agritourism or boarding income that was not declared and rated",
    "Vehicles registered for the road, which belong on a farm or commercial auto policy",
  ],
  discounts: [
    { name: "Package credit", description: "Home, farm property, liability and the farm trucks placed with one carrier." },
    { name: "Newer equipment and updated buildings", description: "Recent machinery on the schedule and updated wiring, roofing and heating in the house and shop." },
    { name: "Fire protection and distance to a hydrant or station", description: "A rural fire district membership and water on the premises; farm property rates are sensitive to response time." },
    { name: "Higher deductible", description: "A larger per-occurrence deductible on the property sections, which suits an operation that can absorb small losses." },
    { name: "Claims-free history", description: "No property or liability claims over the carrier's look-back period." },
  ],
  faqs: [
    {
      question: "Why is my tractor not covered when the shop burned?",
      answer: [
        "Because it was not on the schedule and the unscheduled blanket was spent on the hand tools and supplies in the same fire. Farm property policies pay listed equipment at listed values and everything else from one shared limit. Each renewal is the moment to walk the yard against the schedule: new purchases added, sold items removed, and the blanket sized to what is left over.",
      ],
    },
    {
      question: "Does a farm policy insure my crops?",
      answer: [
        "Only after harvest, while the crop is in storage on the premises, and on some forms with a small hail limit for standing crops. Losses to a growing crop from weather or price are insured under the federal crop insurance programme through its own agents, deadlines and forms, and the farm policy neither replaces nor overlaps it. If you carry crop insurance, tell us, so the storage limits on the farm policy line up with what you keep in the bins.",
      ],
    },
    {
      question: "We sell at a market and host a fall festival. Is that a problem?",
      answer: [
        "It is a declared activity rather than a problem. Retail sales, u-pick, hayrides and paid events bring the public onto the farm, and carriers rate them or exclude them depending on scale. A market organiser or county will ask for a certificate naming them as an additional insured, and some carriers need the event on the policy before the certificate can be issued. Say what you do on the application and the coverage follows.",
      ],
    },
    {
      question: "How are horses and cattle valued at a claim?",
      answer: [
        "Blanket livestock coverage pays a stated amount per head up to the total limit, whichever is less than the animal's market value. Registered breeding stock, show animals and horses worth more than the per-head figure should be scheduled at an agreed value with documentation. Suppose a policy blankets cattle at a figure of two thousand dollars a head and a registered bull worth twelve thousand is struck by lightning; without a schedule, the claim pays two thousand.",
      ],
    },
    {
      question: "Are the farm trucks and the side-by-side on the farm policy?",
      answer: [
        "Unlicensed equipment used only on the farm, such as the side-by-side, a four-wheeler or a farm utility vehicle, is usually covered as farm personal property with liability under the farm section. Anything registered for the road, including the ranch pickup and the semi that hauls to the elevator, goes on a farm or commercial auto policy. Occasional road use of the ATV between fields is where coverage is uncertain, and the answer varies by carrier.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "commercial-auto-insurance", "general-liability-insurance", "commercial-umbrella-insurance", "workers-compensation-insurance"],
  seo: { description: "How a farm or ranch policy works: the farm dwelling, scheduled and unscheduled equipment, livestock by named cause, outbuildings and farm liability, with federal crop insurance explained as separate, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
