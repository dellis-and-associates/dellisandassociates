import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Relocating out of state: the insurance to-do list",
  excerpt: "An auto policy is written for one state and cannot simply follow you across a border. What moves with you, what has to be rewritten, why Utah's no-fault system changes the auto form, how to keep the old house covered after you leave, what a move does to health plans, and the order that avoids a gap.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Insurance is regulated state by state, and a move across a state line is the one life event that forces every policy to be looked at rather than just updated. An auto policy is filed and rated for the state where the car is garaged, and the carrier that wrote it may not hold a licence in the state you are moving to. A homeowners policy ends when the house is sold and has to be replaced by one bound before the closing on the next one. Health plans bought on an exchange are state-specific, and Medicare Advantage and drug plans are tied to a county.",
        "This is the list in the order that keeps everything in force, with the traps that catch households moving between Arizona, Nevada, Utah and Idaho, and those moving in from elsewhere. It assumes an ordinary household with cars, a house or an apartment, and health coverage; a business owner moving a company has a second list, and workers compensation heads it.",
      ],
    },
    {
      heading: "Auto: the policy has to be rewritten, not forwarded",
      paragraphs: [
        "Most carriers allow a short grace period for a car temporarily in another state, but once the car is garaged at a new address the policy has to be reissued on that state's form with that state's rating. If the carrier is licensed in both states, the agent rewrites it; if not, a new carrier is needed. Either way, the new policy should begin on the day the car starts living at the new address, and the old one should be cancelled after that, not before, with the effective dates matching to the day. Each state runs a verification program that matches registered cars against insurance records, and a gap between the two policies is exactly what it looks for.",
        "The form itself changes. Arizona, Nevada and Idaho are at-fault states: the driver who causes the crash pays for the other side's injuries through liability coverage, and medical payments coverage is optional. Utah is a no-fault state: every policy carries personal injury protection that pays the policyholder's own medical costs after a crash regardless of who caused it, and the right to sue the other driver is limited until a threshold is met. A household moving into Utah gains a coverage it did not have; a household leaving Utah loses one and should decide whether to replace it with medical payments coverage. Uninsured and underinsured motorist coverages also differ in how they can be stacked and rejected from state to state, and the new policy should be read for them rather than assumed to match the old one.",
        "Registration and a driver licence come next. Each state gives a new resident a period to register the car and obtain a licence; the periods are short and differ by state, and the motor vehicle agency's site is the source for them. The new policy has to exist before the registration appointment, because proof of insurance in the new state is part of the registration. If anyone in the household is under an SR-22 filing, the filing has to be redone in the new state and the old state told, or the old state may treat the missing filing as a lapse.",
      ],
    },
    {
      heading: "Home and renters: two houses, one gap to avoid",
      paragraphs: [
        "The house you are leaving stays covered under its policy until the sale closes, but the policy assumes someone lives there. Once the furniture is gone and the family has left, many forms restrict or exclude coverage for vandalism, water damage and glass breakage after the house has been vacant for a stated stretch, and some carriers require a vacancy endorsement or a separate vacant-dwelling policy if the sale drags. Tell the carrier the date you are leaving and the expected closing date, and ask what the policy does in between.",
        "The house you are buying needs a policy bound before closing, with the lender listed as mortgagee, and the lender will ask for evidence of insurance days before the closing date. This is the moment to underwrite the region rather than the house alone. A Phoenix-area home is rated for monsoon wind and hail and for roof age. A Reno or Boise-foothills home is rated for wildfire exposure and may need defensible space work before a carrier will write it. A Wasatch Front home sits near a mapped fault and earthquake coverage is a separate decision, as it is in Nevada. An Idaho or northern Utah home carries snow load and freeze risks, and a spring snowmelt floodplain check is worth doing before the flood policy decision. Renters have a simpler version: a new renters policy on the new address before move-in, since most leases in the four states require one, and the old one cancelled after the keys are returned.",
      ],
    },
    {
      heading: "Health, Medicare, life and the rest",
      paragraphs: ["The policies below do not all need rewriting, but each has a moving-related rule."],
      bullets: [
        "Employer health coverage usually continues across a move if the plan's network covers the new area; check the network before assuming it does.",
        "An exchange or marketplace plan is state-specific. A permanent move to a new state is a qualifying event that opens a special enrolment window, and the plan in the old state ends when the new one begins.",
        "Medicare itself moves with you. A Medicare Advantage plan or a stand-alone drug plan is tied to its service area, and moving out of that area opens a special enrolment window to pick a new one. Medigap policies are portable, but the premium may be recalculated for the new address, and the rules on switching Medigap plans without underwriting differ by state.",
        "Life insurance follows the insured anywhere. Update the address so the carrier and the beneficiary can find each other, and review the beneficiary while the file is open.",
        "An umbrella policy is written over the auto and home policies and is rewritten with them; the underlying limits required by the umbrella carrier must be carried on the new policies from day one.",
        "Boats, RVs, motorcycles and ATVs each have their own state registration and the same garaging-address logic as the car.",
        "Pet, identity and travel policies simply need the new address.",
      ],
    },
    {
      heading: "Moving day: what covers the contents in transit",
      paragraphs: [
        "A moving company's valuation coverage is a limit on its own liability, not insurance for your goods, and the default option pays by weight rather than by value. Your homeowners policy covers personal property anywhere in the world against the perils it names, usually at a reduced sublimit away from the residence, so a load stolen from the truck overnight is a claim on your policy, subject to the deductible. Goods you carry yourself in a rented truck are covered the same way; the rented truck itself is a separate question, since a personal auto policy often excludes vehicles above a stated weight, and the rental counter's damage waiver may be the only coverage for it. Valuables such as jewellery and art should travel with you rather than on the truck, and if they are scheduled on the home policy the schedule should be carried over to the new one.",
      ],
    },
    {
      heading: "The order, with dates",
      paragraphs: ["Suppose a household is moving from Henderson to Meridian with two cars, a house to sell, a house to buy and an umbrella, and the closing on the new house is on the first of the month. A workable sequence, for example, looks like this."],
      bullets: [
        "Six weeks out: confirm which existing carriers are licensed in Idaho; request quotes on the new house from the address alone, and ask about wildfire and floodplain findings.",
        "Three weeks out: bind the new homeowners policy effective on the closing date; send the evidence of insurance to the lender; bind the new auto policies effective on the day the cars arrive.",
        "Two weeks out: tell the Nevada home carrier the move-out date and ask about vacancy treatment; order the umbrella rewrite over the new policies.",
        "Moving week: photograph the contents before they are loaded; confirm the movers' valuation option in writing.",
        "First week in Idaho: register the cars and obtain licences within the state's period; cancel the Nevada auto policies effective the day the Idaho ones began; handle the marketplace or Medicare Advantage special enrolment if either applies.",
        "After the Nevada closing: cancel the old home policy effective the closing date, not earlier, and request the unearned premium refund.",
      ],
    },
    {
      heading: "The timing traps",
      paragraphs: [
        "Three mistakes account for most of the trouble. Cancelling the old auto policy on the day the moving truck leaves, which creates a gap the old state's verification program reports before the new state's records catch up. Assuming the old carrier writes in the new state and discovering at the registration counter that it does not. And letting the sold house sit empty for months with a policy that has quietly stopped covering vandalism and water damage. A fourth is subtler: forgetting that the umbrella's required underlying limits have to be met on the new policies, so that the new auto policy is bound at lower limits and the umbrella has a hole in it for a year.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "We are licensed in Arizona, Nevada, Utah and Idaho, so a move inside that footprint can usually stay with the same agency and often the same carriers. Send us the new address, the closing date, the vehicle list and the current declarations pages, and we will build the date sequence above for your move and bind the new policies to match it. Where a current carrier is licensed in both states and its rates hold up in the new one, the recommendation is to rewrite rather than replace, and that is what we will say.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "home-insurance", "renters-insurance", "umbrella-insurance", "health-insurance"],
  relatedArticles: ["how-to-update-insurance-after-a-move", "how-to-switch-insurance-companies-without-a-coverage-lapse", "how-to-insure-a-vacant-home", "insurance-checklist-for-first-time-homebuyers"],
  relatedTerms: ["policy-lapse", "no-fault-insurance", "personal-injury-protection", "binder", "sr-22"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
