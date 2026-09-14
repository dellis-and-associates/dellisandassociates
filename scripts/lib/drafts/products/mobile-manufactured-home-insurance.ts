import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Insures a factory-built home on a permanent chassis, whether it sits on leased space in a park or on land you own, against fire, wind, theft and liability. The policy form, and whether it pays replacement cost or actual cash value, depends mostly on the home's age and how it is anchored.",
  intro: [
    "A manufactured home is built to the federal HUD code on a steel chassis and delivered on its own wheels; a mobile home is the same thing built before that code took effect. Neither is a conventional house to an insurer, because the structure can be moved, is anchored rather than founded, and loses value over time while the land under it gains, so carriers write it on its own policy form rather than a standard home policy. Modular homes, built in a factory but set on a permanent foundation to the local building code, are usually insured as ordinary houses.",
    "The form matters more here than in most lines. Some policies pay replacement cost on the home and contents; many, especially on older homes, pay actual cash value, which subtracts depreciation from the payment and can leave an owner well short of a replacement home after a total loss. Coverage for the attached carport, awning, deck, skirting and shed, which are often worth a lot relative to the home, is limited unless scheduled.",
    "In Arizona and Nevada the risk is wind, monsoon rain, wildfire at the valley edges and heat on the roof; in Utah and Idaho it is snow load, freezing pipes under an unheated floor, wind on an open bench and wildfire in the foothills. Whether the home sits in a park or on owned land also changes the policy: the park's lease sets the liability the owner carries, and owned land raises questions about the well, the septic system and the outbuildings.",
    "The premium is set from the home's age, size and construction, its anchoring and skirting, the location and its wind and fire exposure, the coverage form chosen, the deductible, and the household's claims history. The analysis pulls the current policy, checks the form against the home's actual value and the replacement cost of what is attached to it, and prices the alternatives.",
  ],
  coverageBlocks: [
    { heading: "The home itself", paragraphs: ["Dwelling coverage pays to repair or replace the structure after a covered loss: fire, lightning, wind, hail, theft, vandalism, falling objects, the weight of snow, and the sudden escape of water from plumbing. Better forms are open-peril on the home and named-peril on contents; budget forms are named-peril on both, and the difference decides whether a loss that is not on the list is paid. The policy states whether the home is settled at replacement cost or actual cash value; on an older home the carrier may offer only the latter, and the limit should then reflect what the home would actually bring, not what a new one costs."] },
    { heading: "Attached structures and outbuildings", paragraphs: ["A carport, an awning, a covered deck, steps, skirting and a storage shed are insured under other structures or as attached structures, with a limit set as a share of the dwelling amount. On a long-occupied home these additions can be worth more than the coverage allows, and a large Arizona-style carport is a common shortfall after a wind claim. They can be scheduled for their own limits."] },
    { heading: "Contents and loss of use", paragraphs: ["Contents pays for furniture, appliances that are not built in, clothing and electronics, at replacement cost or actual cash value per the form. Loss of use pays for somewhere to live while the home is repaired or replaced; after a total loss in a park it also has to carry the space rent until the replacement is set, so the limit and the time period should be read together."] },
    { heading: "Liability and medical payments", paragraphs: ["Personal liability pays if someone is hurt on the lot or the household damages someone else's property, and it defends a suit. Parks and land-lease communities write a liability limit into the lease, and in a park a fire that spreads to a neighbouring home is the claim liability exists for. Medical payments covers small injuries to guests without a fault finding."] },
    { heading: "Trip and transit", paragraphs: ["A standard policy covers the home at its stated location and not while it is being moved. Trip collision or transit coverage insures the home while it is jacked, towed and reset, including collision, overturn and the damage from a failed hitch, and it is bought for the move itself. A home bought used and moved to a new lot needs the transit coverage, then a new policy at the new address."] },
  ],
  covered: [
    "Fire, lightning, wind, hail and the weight of snow on the roof",
    "Theft and vandalism of the home and its contents",
    "Sudden escape of water from a pipe or an appliance",
    "A carport, awning, deck or shed, within the attached-structures limit",
    "Rent and living costs while the home is uninhabitable",
    "Injuries to guests and damage to a neighbour's home you are responsible for",
    "The home in transit, when trip coverage is bought for the move",
  ],
  notCovered: [
    "Flood and surface water (a separate flood policy, federal or private)",
    "Earth movement, including settling and the shifting of piers",
    "Freezing of pipes when the home is unheated and unoccupied",
    "Wear, rot, rust, pests and mechanical breakdown",
    "Damage during a move made without transit coverage",
    "A home left vacant beyond the period the policy allows",
    "Depreciation, on a form that settles at actual cash value",
  ],
  discounts: [
    { name: "Anchoring and tie-downs", description: "A home anchored to the ground or a permanent foundation to the manufacturer's specification, verified by an inspection." },
    { name: "Newer home", description: "Homes built recently, or fitted with a newer roof and updated wiring, are rated better than older ones." },
    { name: "Multi-policy", description: "Auto or umbrella with the same carrier." },
    { name: "Age-restricted community", description: "Some carriers rate homes in age-restricted communities in Arizona and Nevada more favourably." },
    { name: "Claim-free and paid in full", description: "No claims over the carrier's look-back and paying the year up front." },
  ],
  faqs: [
    { question: "What is the difference between replacement cost and actual cash value on a manufactured home?", answer: ["Replacement cost pays what a comparable new home costs, delivered and set, up to the limit. Actual cash value pays that amount less depreciation, and manufactured homes depreciate quickly in their first years, so on a total loss the payment can be a fraction of a new unit's price. Carriers offer replacement cost on newer homes and often only actual cash value once a home passes a certain age; when only actual cash value is available, the right move is to set the limit at the home's market value, not its replacement cost, so you are not paying premium for a limit that will not be paid."] },
    { question: "The park requires me to carry insurance. What are they asking for?", answer: ["Usually a liability limit written in the lease and proof that the home is insured, with the park listed as an additional interest so it is told if the policy cancels. A lender on the home will want to be listed as lienholder as well. The policy handles both with a few lines on the declarations page."] },
    { question: "Does a homeowners policy work on a manufactured home?", answer: ["Rarely. A standard home policy is built for a site-built house, and most carriers require a manufactured home to be written on a manufactured home form even when it sits on a permanent foundation on owned land. A home that has been retitled as real property and permanently affixed can sometimes be written on a home policy; it depends on the carrier and the foundation."] },
    { question: "What happens if the home is a total loss in a park?", answer: ["The policy pays the dwelling limit less deductible on the form's basis, plus debris removal to clear the lot, which the park will require. Loss of use carries living costs; if the coverage pays replacement cost, the carrier's payment includes delivery and setup of a comparable home. Space rent continues in the meantime, which is why the loss of use limit matters."] },
    { question: "Is wildfire covered?", answer: ["Fire is a covered peril on every form, including wildfire. What changes near the wildland edge in Idaho, Utah and northern Arizona is availability: some carriers decline new business in high-hazard areas, and a home with a metal roof, cleared defensible space and enclosed eaves is easier to place. The analysis checks which carriers write the address."] },
    { question: "Does the policy cover my home while it is being moved?", answer: ["Not unless transit coverage is added for the move. The standard form insures the home at the address on the declarations page and treats it as an uninsured object once it is on the road. Movers carry their own liability, but it is limited and covers their negligence, not everything that can go wrong."] },
  ],
  relatedProducts: ["home-insurance", "flood-insurance", "auto-insurance", "umbrella-insurance"],
  seo: { description: "Mobile and manufactured home insurance explained: replacement cost versus actual cash value, carports and attached structures, park liability requirements, transit coverage, and what decides the premium in Arizona, Nevada, Utah and Idaho." },
};
