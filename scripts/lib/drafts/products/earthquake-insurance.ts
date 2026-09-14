import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Pays to repair a home and replace its contents after earth movement, which every standard home policy excludes. Written as a standalone policy or an endorsement, with a deductible set as a share of the dwelling limit rather than a flat amount, which is the number to understand before buying.",
  intro: [
    "Earth movement is an exclusion in every standard home, condo, renters and landlord policy: earthquake, landslide, subsidence, sinkhole, and the settling and cracking that follows. Fire that starts because a quake ruptures a gas line is usually still paid by the home policy, because fire is the peril, but the shaking damage itself, the cracked foundation, the collapsed chimney, the contents thrown from shelves, is not. Earthquake coverage fills that gap, either as an endorsement to the home policy or as a standalone policy from a specialty carrier.",
    "Of the four states we serve, Utah has the clearest exposure. The Wasatch Front, from Brigham City through Salt Lake City to Provo, sits along a fault system that geologists expect to produce a large quake, and the valley floor is soft lakebed sediment that amplifies shaking and can liquefy. Nevada is among the more seismically active states, with faulting around Reno, Carson City and the western valleys; Idaho's mountains produced the Borah Peak and Stanley quakes; and Arizona has a lower but real exposure around Flagstaff and Yuma. Much of the older housing along the Wasatch Front is unreinforced brick, which is the construction that fails first.",
    "The premium is set from the address and its soil, the construction type and age, the number of storeys, whether the home is bolted to its foundation and its water heater is strapped, the presence of a masonry chimney or brick veneer, the dwelling and contents limits, and the deductible chosen. Wood-frame homes on firm ground cost the least to insure and take the least damage; brick homes on the valley floor are the opposite on both counts.",
    "The analysis prices an endorsement against the standalone options for the address, shows what each deductible would mean in dollars for your dwelling limit, and tells you whether the coverage is worth carrying. For a newer wood-frame home with a paid-off mortgage and reserves, the answer is sometimes no.",
  ],
  coverageBlocks: [
    { heading: "Dwelling", paragraphs: ["Dwelling coverage pays to repair or rebuild the house after shaking damage, usually at the same limit as the home policy, and includes the foundation, which some home policies leave out. Masonry veneer is often excluded or limited by default, with an option to buy it back; on a brick home that exclusion can remove a large part of the claim, so it is the first line to read on any quote. Aftershocks within a set window are treated as a single event, so one deductible applies to the sequence."] },
    { heading: "The percentage deductible", paragraphs: [
      "The deductible is written as a share of the dwelling limit, not as a flat amount, and it is the reason earthquake coverage is misunderstood. Suppose a home is insured for $400,000 with a deductible of ten percent: the first $40,000 of dwelling damage is the owner's, and a lower deductible of five percent would leave $20,000 with the owner at a higher premium. Contents and other structures sometimes carry their own share-based deductible and sometimes the dwelling deductible applies once across every coverage; the form decides, and the difference matters.",
      "The coverage is built for the loss that ends a home, not for cracked drywall. A household that could absorb a modest repair but not a rebuild should choose the higher deductible and the lower premium, and put the savings into retrofitting.",
    ] },
    { heading: "Other structures and contents", paragraphs: ["Detached garages, sheds, walls and fences are covered under other structures, usually at a limited share of the dwelling limit. Contents pays for furniture, electronics, dishes and everything else thrown, broken or crushed, at replacement cost or actual cash value depending on the form. Breakable items such as china, glassware and artwork are commonly excluded unless scheduled, and some forms exclude anything that fell from a shelf rather than being damaged by the building itself, which is worth asking about before buying."] },
    { heading: "Loss of use and building code upgrades", paragraphs: ["Loss of use pays hotel, rent and added living costs while the home is uninhabitable, and after a regional quake that period runs long because every contractor is booked. Building code upgrade coverage pays the added cost of rebuilding to today's seismic code rather than the code the house was built under, which for a mid-century home on the Wasatch Front can be a large share of the rebuild. Some forms include an amount by default and others require it to be added."] },
    { heading: "Standalone policy or endorsement", paragraphs: ["An endorsement on the home policy is simpler and often cheaper, uses the same limits and renews with the home policy, but the carrier can withdraw it and the terms are the carrier's. A standalone policy from a specialty carrier can offer lower deductibles, higher code-upgrade limits, and coverage on a home whose primary carrier does not write earthquake, and it survives a change of home carrier. In Utah the standalone market is deep enough that the two are worth pricing against each other."] },
  ],
  covered: [
    "Shaking damage to the house, its foundation and attached structures",
    "Contents broken, crushed or thrown during a quake",
    "Hotel and rent while the home is unsafe to occupy",
    "The added cost of rebuilding to current seismic code, where the coverage is included",
    "Detached garages, sheds and walls under other structures",
    "Aftershocks within the policy's single-event window, under one deductible",
    "Emergency repairs to make the home weathertight and safe",
  ],
  notCovered: [
    "Fire following a quake (the home policy covers it, and the home carrier is who to call)",
    "Flood or tsunami caused by earth movement",
    "Damage below the percentage deductible, which is the owner's share by design",
    "Masonry veneer and chimneys, unless the exclusion is bought back",
    "Cars (comprehensive coverage on the auto policy responds)",
    "Landscaping, pools, walkways and retaining walls on most forms",
    "Pre-existing cracks, settling and foundation movement not caused by a quake",
  ],
  discounts: [
    { name: "Retrofitted foundation", description: "A home bolted to its foundation with braced cripple walls, documented by a contractor or an inspection, earns the largest credit." },
    { name: "Newer wood-frame construction", description: "Homes built to modern seismic codes with wood framing and no masonry veneer are rated lowest." },
    { name: "Strapped water heater and gas shutoff", description: "Some carriers credit an automatic gas shutoff valve and a strapped water heater, which also prevent the fire that follows a quake." },
    { name: "Higher deductible", description: "Moving from the lowest available share to a higher one is the main lever on price." },
    { name: "Same-carrier endorsement", description: "Adding earthquake to the home policy with the same carrier is often cheaper than a standalone policy, at the cost of the standalone's terms." },
  ],
  faqs: [
    { question: "I live on the Wasatch Front. Is this coverage worth it?", answer: ["For an owner of an unreinforced brick home on the valley floor with a mortgage, it usually is, because the loss that could occur is the whole house plus the loan on it. For a newer wood-frame home on the bench, the expected damage is far smaller and the coverage is a closer call. The analysis puts the deductible in dollars against the equity at risk and the premium, and the honest answer for some households is to retrofit first and insure second."] },
    { question: "Why is the deductible so large?", answer: ["Because a damaging quake hits every insured home in a region on the same day, and a carrier that paid small claims on all of them would not survive to pay the large ones. The percentage deductible keeps the coverage priced for the catastrophic loss, which is the one that matters. A lower deductible is available at a higher premium, and whether it is worth buying depends on how much repair you could absorb yourself."] },
    { question: "Does my home policy cover anything after an earthquake?", answer: ["Fire and explosion following a quake are covered by most home policies, and so is theft from a damaged home. Water damage from a broken supply line inside the house is often covered too. The shaking damage to the structure and contents is not, and neither is the landslide or ground failure that follows."] },
    { question: "How does the aftershock rule work?", answer: ["Policies define a single occurrence as the initial quake plus every aftershock within a stated number of hours afterward, so one deductible applies to all of them. A separate quake after the window closes is a second occurrence with a second deductible. The window varies by carrier and is on the declarations page."] },
    { question: "Can I buy earthquake coverage after a quake?", answer: ["Carriers stop writing new earthquake policies for a period after a significant event, and some suspend the whole region while aftershocks continue. Coverage bought in a quiet year is the only kind that is reliably available."] },
    { question: "Does earthquake insurance cover my condo?", answer: ["A condo owner's earthquake policy covers the interior finishes, contents, loss of use and the owner's share of a loss assessment when the association's master policy has a large deductible or no earthquake coverage at all. The master policy question comes first, because many associations carry a high deductible or none, and that assessment lands on every unit owner."] },
  ],
  relatedProducts: ["home-insurance", "flood-insurance", "renters-insurance", "landlord-rental-property-insurance"],
  seo: { description: "Earthquake insurance explained for the Wasatch Front, Nevada, Idaho and Arizona: what the home policy excludes, how the percentage deductible works, endorsement versus standalone, and when the coverage is worth carrying. Independent agency, four states." },
};
