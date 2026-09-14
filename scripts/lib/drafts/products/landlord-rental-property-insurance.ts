import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Insures a house, condo or small building you rent to others: the structure, the rent you lose while it is repaired, and lawsuits from tenants and visitors. Written on a dwelling fire form, because a homeowners policy stops responding once the owner moves out and a tenant moves in.",
  intro: [
    "A homeowners policy is written for an owner who lives in the house. Once the house is rented, the risk changes: the person living there has no stake in the building, the owner is not there to notice a leak, and any injury on the property becomes a claim against a business, so carriers write rented homes on a dwelling fire form instead. Keeping a homeowners policy on a home you have moved out of is the common mistake, and it surfaces at the worst time, when a carrier finds a tenant on a policy that assumes an owner.",
    "The dwelling fire forms come in three grades. The basic form covers a short list of named perils, fire and lightning and a few others, and settles at actual cash value; the broad form adds more perils; the special form covers the building on an open-peril basis, everything not excluded, and is what an owner with a mortgage and a decent property should carry. Contents coverage on all three is for what the landlord owns, the stove, the refrigerator, the washer, not the tenant's belongings.",
    "Rented single-family homes around Phoenix, Las Vegas, Salt Lake and Boise are mostly stucco or frame on slab, with the risks a home policy knows: monsoon roofs, wind, water from an old supply line, a tenant who leaves the tap running. A duplex or fourplex is still a landlord policy; a larger building is usually a commercial property policy.",
    "The premium is set from the building's replacement cost, construction, age and roof, the location, the form chosen, the liability limit, the number of units, whether the tenancy is short-term or long-term, and the owner's claims record. The analysis looks at the current policy, checks that the form matches the tenancy, that the liability limit fits what you own, and that the rent loss coverage would actually carry a vacancy through a rebuild.",
  ],
  coverageBlocks: [
    { heading: "Dwelling and other structures", paragraphs: ["Dwelling pays to repair or rebuild the building after a covered loss, at replacement cost on the special form or actual cash value on the basic form. Other structures covers a detached garage, a block wall, a shed or a casita. The limit should be the rebuild cost, not the market price or the loan balance; on a Salt Lake bungalow the two are far apart in both directions. Ordinance or law coverage, which pays the added cost of bringing an old building to current code on rebuild, is an add-on worth carrying on any home older than the current code cycle."] },
    { heading: "Loss of rents", paragraphs: ["When a covered loss makes the unit uninhabitable, loss of rents, also called fair rental value, pays the rent you would have collected for the time it takes to repair, subject to a limit or a number of months. It does not pay for a tenant who simply leaves or stops paying, and it does not pay during ordinary turnover. On a property where the rent covers the mortgage, this coverage is what keeps the loan current after a fire."] },
    { heading: "Premises liability", paragraphs: ["Liability pays if a tenant, a guest or a contractor is injured on the property and claims the owner was negligent, and it defends the suit. The claims are stairs, railings, a dog the tenant keeps, a pool, ice on a walkway in Idaho. Landlord forms also offer personal injury coverage for claims of wrongful eviction, wrongful entry and invasion of privacy, which arise from a landlord's actions rather than a hazard on the property and are excluded without it. A personal umbrella can extend over a landlord policy, and for an owner with several rentals it usually should."] },
    { heading: "Landlord contents and equipment", paragraphs: ["Contents on a landlord policy covers appliances, window coverings, furniture in a furnished unit, and the tools and mower kept on the property for maintenance. It does not cover the tenant's belongings, which is why a lease that requires renters insurance is in both parties' interest: the tenant's policy pays for their things and carries their own liability, and a kitchen fire the tenant starts can be recovered from it."] },
    { heading: "Vacancy and short-term rental", paragraphs: ["Every landlord form has a vacancy clause that limits or removes coverage after a unit has been empty for a stated period, because empty buildings suffer vandalism, freezing and undetected water. Between tenants the owner should tell the carrier and buy a vacancy endorsement if the gap will run long. Short-term rental, on a booking platform or otherwise, is a different exposure with different forms; a landlord policy written for a twelve-month tenant may exclude it, and the platform's coverage is a backstop rather than a policy."] },
  ],
  covered: [
    "Fire, wind, hail, lightning and vandalism to the building",
    "Sudden water damage from a burst supply line or an appliance",
    "Rent lost while a unit is repaired after a covered loss",
    "A tenant's or guest's injury claim, and the cost of defending it",
    "The landlord's appliances, window coverings and maintenance equipment",
    "A detached garage, casita or storage building",
    "Claims of wrongful eviction or entry, where personal injury coverage is included",
  ],
  notCovered: [
    "The tenant's furniture, electronics and clothing (their renters policy)",
    "Unpaid rent, eviction costs and a tenant who leaves early",
    "Flood, earthquake and sewer backup, without their own policy or endorsement",
    "Damage that builds over time: rot, mold, pests, a slow leak the tenant never reported",
    "Intentional damage by a tenant, on many forms, unless the endorsement is added",
    "Losses during a vacancy longer than the policy allows",
    "Short-term rental activity when the policy is written for long-term tenancy",
  ],
  discounts: [
    { name: "Multi-property", description: "Several rentals with the same carrier, sometimes on one schedule." },
    { name: "Newer roof and updated systems", description: "A recent roof, updated electrical and plumbing, and a replaced water heater rate better and are easier to place." },
    { name: "Protective devices", description: "Smoke detectors, a monitored alarm, a water leak shutoff and deadbolts." },
    { name: "Package with the owner's home and auto", description: "The landlord policy alongside the owner's personal lines with one carrier." },
    { name: "Long-term tenancy", description: "A property under a lease of a year or more is rated lower than one rented by the week." },
  ],
  faqs: [
    { question: "I am moving out and renting my house. Can I keep my homeowners policy?", answer: ["No. Tell your carrier the date the tenant moves in and switch to a landlord form on that date. Some carriers will endorse the home policy for a short rental; most require a new policy. A claim that arises while the house is rented on a homeowners policy can be denied on the misrepresentation, and the mortgage lender will want to see the correct form."] },
    { question: "How much liability should a landlord carry?", answer: ["Enough to cover a serious injury claim without reaching your other property, which for an owner with equity in several buildings means a limit well above the form's default and an umbrella on top. Titling the property in an LLC changes who is sued, not whether the claim happens, and the LLC has to be named on the policy for the coverage to follow it."] },
    { question: "Should I require my tenants to carry renters insurance?", answer: ["Yes, in the lease and as a condition of move-in. It costs the tenant little, it pays for their belongings after a loss your policy does not cover, and it gives your carrier a policy to recover from when the tenant causes the fire. Ask for a certificate naming you as an interested party so you learn if it lapses."] },
    { question: "Does the policy cover a tenant who trashes the unit?", answer: ["Vandalism by an outsider is covered. Deliberate damage by the tenant is excluded on many landlord forms and covered on others, sometimes with a separate endorsement and a separate deductible; it is one of the questions the analysis puts to each carrier. Ordinary wear, a dirty carpet and nail holes are never a claim; that is what the deposit is for."] },
    { question: "Is a condo I rent out covered by the association's master policy?", answer: ["The master policy covers the building's common elements and, depending on the bylaws, some or none of the unit's interior. A landlord condo policy covers the interior finishes from the studs in, the appliances, the rent loss, the liability and the owner's share of a loss assessment from the association. The bylaws decide where the master policy stops, and the unit policy starts there."] },
    { question: "My rental is in a floodplain. Is flood included?", answer: ["No. Flood is excluded from every dwelling fire form and is bought separately, through the federal program or a private carrier; a lender on a property in the mapped high-risk zone will require it. The tenant's contents are their own flood question, and a renters policy excludes flood too."] },
  ],
  relatedProducts: ["home-insurance", "renters-insurance", "umbrella-insurance", "flood-insurance", "business-owners-policy"],
  seo: { description: "Landlord and rental property insurance explained: dwelling fire forms, loss of rents, premises liability, vacancy clauses, short-term rental, and why a homeowners policy stops working once a tenant moves in. Independent agency in Arizona, Nevada, Utah and Idaho." },
};
