import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Pays what you owe other people after a crash, and, if you choose, repairs or replaces your own car. The liability limits you pick decide how much of your own money is exposed; the deductibles decide what a claim costs you on the day.",
  intro: [
    "An auto policy is a bundle of separate coverages, each with its own limit or deductible, and the declarations page lists which ones you bought. Liability is the part every state requires: it pays for injuries and property damage you cause to others, up to the limits on the page, and pays for a lawyer if you are sued. Everything else, from collision to rental reimbursement, is optional and priced on its own.",
    "The premium is set by the carrier from the drivers, the vehicles, the garaging address, the coverages chosen and the household's claims and driving record. Two people with the same car in the same city can pay very different amounts, which is why the same policy is worth pricing with several carriers at once.",
    "The analysis takes your current declarations page, checks the limits against what you own and earn, and compares the same coverages across the carriers we represent. If the policy you have is the right one, that is the answer you get.",
  ],
  coverageBlocks: [
    { heading: "Bodily injury and property damage liability", paragraphs: ["Liability pays other people. Bodily injury covers the medical bills, lost wages and pain of anyone you injure in a crash you cause; property damage covers their car, fence, or storefront. Limits are written per person, per accident and per accident for property, and once a limit is spent the rest comes from you. The state minimum is a floor, not a recommendation; most households with a home or savings carry far more, and an umbrella policy sits above these limits."] },
    { heading: "Collision", paragraphs: ["Collision repairs or replaces your own car after it hits, or is hit by, another vehicle or an object, whoever is at fault. It pays the car's actual cash value less your deductible, so an older car can be worth less than the coverage costs over a few years, which is a real decision rather than a default."] },
    { heading: "Comprehensive", paragraphs: ["Comprehensive covers damage that is not a collision: theft, vandalism, hail, a windshield cracked by a rock on the freeway, a tree limb in a monsoon gust, flood water, fire, and hitting an animal. It carries its own deductible, often lower than collision, and glass is sometimes handled with a separate, smaller deductible or none at all."] },
    { heading: "Uninsured and underinsured motorist", paragraphs: ["When the driver who hits you carries no insurance or too little, this coverage stands in for theirs and pays your injuries, and in some states your car, up to your own limits. In the four states we serve a meaningful share of drivers are uninsured, so we usually recommend matching these limits to your liability limits rather than the minimum."] },
    { heading: "Medical payments and personal injury protection", paragraphs: ["Medical payments coverage pays medical bills for you and your passengers regardless of fault, with no deductible, and can fill a health plan's deductible after a crash. Personal injury protection does the same and can add lost wages and other expenses; Utah requires it as part of its no-fault system, and the other three states offer it or medical payments as an option."] },
    { heading: "Rental reimbursement, towing and gap", paragraphs: ["Rental reimbursement pays a daily amount for a rental while your car is repaired after a covered loss. Towing and roadside pays for a tow, a jump or a lockout. Gap coverage pays the difference between what the car is worth and what you still owe on the loan or lease if it is totalled; it matters most in the first years of a long loan."] },
  ],
  covered: [
    "Injuries and property damage you cause to others, up to your liability limits",
    "Your legal defence when you are sued after a crash",
    "Repairs to your own car after a collision, less the deductible",
    "Theft, vandalism, hail, glass, fire, flood and animal strikes under comprehensive",
    "Your injuries when an uninsured or underinsured driver is at fault",
    "Medical bills for you and your passengers regardless of fault",
    "A rental car while yours is repaired after a covered loss",
  ],
  notCovered: [
    "Wear, mechanical breakdown and maintenance",
    "Damage while driving for a delivery or rideshare app without the endorsement",
    "Intentional damage, racing and driving under the influence",
    "Personal belongings stolen from the car (a renters or home policy covers those)",
    "Custom equipment above the policy's small built-in limit, unless scheduled",
    "Business use of a vehicle the policy lists as personal",
  ],
  discounts: [
    { name: "Multi-policy", description: "Auto and home, renters or umbrella with the same carrier. Usually the largest single discount." },
    { name: "Multi-vehicle", description: "Two or more cars on one policy." },
    { name: "Safe driver and claim-free", description: "A record with no at-fault accidents or violations over the carrier's look-back period." },
    { name: "Telematics", description: "A phone app or plug-in device that scores braking, speed and phone use; the discount tracks the score and can go the other way with some carriers." },
    { name: "Paid in full and paperless", description: "Paying the term up front and taking documents electronically." },
    { name: "Good student and driver training", description: "For young drivers with a qualifying grade average or a completed course." },
  ],
  faqs: [
    { question: "How much liability coverage should I carry?", answer: ["Enough that a bad crash does not reach your savings, your home equity or your future wages. The state minimum protects the other driver, not you. A common starting point for a household with assets is a limit well above the minimum with an umbrella policy on top; the analysis puts a number on it from what you own and earn."] },
    { question: "Should I drop collision on an older car?", answer: ["Compare what collision costs per year with the car's actual cash value less the deductible. When the coverage would cost a large share of what it could ever pay, dropping it and keeping comprehensive is a reasonable choice. Keep it if you could not replace the car out of pocket tomorrow."] },
    { question: "Does my policy cover me in a rental car?", answer: ["Usually your liability follows you into a rental in the United States, and collision and comprehensive often extend to the rental too, subject to your deductible. Loss-of-use charges from the rental company are the common gap; some carriers cover them and some do not, so check before declining the counter's waiver."] },
    { question: "What happens if I let a friend drive my car?", answer: ["Coverage generally follows the car, so a permitted driver is covered by your policy, and a claim they cause lands on your record. Household members who drive regularly must be listed; an unlisted regular driver is the most common reason a claim is denied."] },
    { question: "Why did my premium go up when nothing changed?", answer: ["Carriers reprice at renewal on their whole book: repair costs, medical costs, litigation and weather losses in your area all move the rate, along with any new tickets or claims and the age of your vehicles. A renewal increase is the moment to compare, because a different carrier's book may have moved less."] },
    { question: "Do I need an SR-22?", answer: ["Only if a court or the state has told you to file one, typically after a suspension, a DUI or driving without insurance. It is a certificate your insurer files to prove you carry the required liability, not a separate policy; we can place a policy that includes the filing."] },
  ],
  relatedProducts: ["umbrella-insurance", "motorcycle-insurance", "home-insurance", "rv-insurance"],
  seo: { description: "What an auto policy covers, part by part: liability, collision, comprehensive, uninsured motorist, medical payments and the add-ons, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
