import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to file an auto insurance claim",
  excerpt: "An auto claim is a sequence: report, document, choose which policy pays, get the car inspected, agree the repair or the total loss, and settle. What to gather before you call, what happens at each step, the decisions that are yours to make, and the mistakes that cost people money or coverage.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Filing an auto claim is mostly paperwork done in a fixed order, and the order is the same whether the loss is a fender scrape in a Tempe parking lot or a rollover on the interstate outside Elko. What differs is which coverage on the declarations page responds, whether another driver's carrier is involved, and how much of the outcome depends on what you did in the first hour. The carrier's claims process is built to move quickly once it has what it needs; delays come from missing information and from decisions the policyholder did not know were theirs.",
        "This guide lays out the steps in order, what to check at each, and where the choices sit. It assumes the immediate safety steps at the scene have been handled; a separate guide covers those. It applies in the at-fault states of Arizona, Nevada and Idaho and in Utah's no-fault system, with the differences noted where they change what you do.",
      ],
    },
    {
      heading: "What to gather before you call",
      paragraphs: ["Have these in hand and the first call takes minutes rather than a series of callbacks."],
      bullets: [
        "Your policy number and the declarations page, so you know which coverages you carry before the adjuster tells you.",
        "The date, time and location of the loss, and a short factual account of what happened, written the same day while the details are fresh.",
        "The other driver's name, licence number, plate, carrier and policy number, taken from their insurance card, and the same for any other vehicle involved.",
        "Photographs: all four sides of every vehicle, the damage close up, the scene, skid marks, signage, and the other party's licence and insurance card.",
        "Names and phone numbers of witnesses, and the police report number if officers attended. In all four states an officer's report can be requested afterwards if you did not get the number.",
        "For theft or vandalism: the police report, which most carriers require before the claim proceeds.",
        "For a windshield or glass loss: usually nothing beyond the policy number; many carriers route glass claims directly to a repair network.",
      ],
    },
    {
      heading: "Step one: report the loss",
      paragraphs: [
        "Report to your own carrier promptly, even if the other driver was at fault and you intend to claim against their policy. Every auto policy contains a condition requiring prompt notice of any accident, and a late report can be a reason to deny coverage if the delay prejudiced the carrier's investigation. Reporting is not the same as claiming: you can report and then decide to pay a small loss yourself, but you cannot un-delay a report. Most carriers take the first notice by phone, app or web form, and issue a claim number on the spot.",
        "When you report, describe what happened, not who was at fault. Fault is a conclusion the adjusters reach from the evidence, and a policyholder's early apology or guess is quoted back later. Give the same factual account to your carrier, to the other carrier if they call, and to the police. If the other driver's carrier calls asking for a recorded statement, you are not obliged to give one to them; your own carrier is entitled to your cooperation, and can handle the other side.",
      ],
    },
    {
      heading: "Step two: decide which policy pays",
      paragraphs: [
        "Damage to your own car can be claimed two ways. Under your own collision coverage, the carrier pays the repair minus your deductible and then pursues the at-fault driver's carrier to recover both, a process called subrogation; when it recovers, your deductible comes back to you. Under the other driver's property damage liability, their carrier pays without a deductible, but only after it accepts that its driver was at fault, which can take weeks and can end in a partial acceptance. Claiming under your own collision is faster and puts your carrier's weight behind the recovery; claiming against the other driver avoids the deductible up front and keeps the claim off your own policy's record with some carriers. If you do not carry collision, the other driver's policy is the only route for the car.",
        "In Arizona, Nevada and Idaho, injuries are claimed against the at-fault driver's bodily injury liability, with your own medical payments coverage, if you carry it, paying early bills regardless of fault. In Utah, your own personal injury protection pays your medical bills and some lost wages first, whoever was at fault, and a claim against the other driver for injury is available only above a threshold set by the state. If the other driver is uninsured or carries too little, your uninsured and underinsured motorist coverage responds for injuries, and in some policies for the car; that claim is against your own carrier and has its own conditions.",
        "Comprehensive claims, for theft, hail, flood, fire, a windshield, an animal strike, do not involve another driver and go under your own policy with its comprehensive deductible. A glass-only claim often has a separate lower deductible or none.",
      ],
    },
    {
      heading: "Step three: the inspection and the estimate",
      paragraphs: [
        "The carrier will inspect the car: at a drive-in centre, through a mobile appraiser, at a body shop in its direct repair network, or by photographs uploaded through its app for smaller losses. The inspection produces an estimate written to the carrier's standards, which may include aftermarket or used parts where the policy allows and a labour rate the carrier considers reasonable in your area. You may take the car to any licensed shop; the carrier's network shops are convenient and their work is usually warrantied by the carrier, but the choice of shop is yours in all four states.",
        "Read the estimate. If the shop finds more damage once the panels are off, it submits a supplement and the carrier reviews it; that is normal and is not a dispute. If you disagree with the estimate itself, on the parts, the labour or the scope, ask for the basis in writing and get a second estimate from your own shop. If the disagreement persists, most policies contain an appraisal clause under which each side appoints an appraiser and the two choose an umpire; it is slower than agreement but it is binding and it is the intended way to resolve valuation disagreements without a lawsuit.",
      ],
    },
    {
      heading: "Step four: repair, total loss and the settlement",
      paragraphs: [
        "If the repair cost approaches the car's value, the carrier declares a total loss. Each state sets a threshold by formula or by percentage of value; the carrier applies it and then owes you the car's actual cash value, which is what a comparable car in similar condition sells for in your area, less the deductible if the claim is under your own policy. Ask for the valuation report and check the comparable vehicles it uses. Mileage, trim, options and recent tyres or a new transmission are the details most often missed, and a documented correction changes the figure. If the car is financed, the carrier pays the lender first; gap coverage, if you have it, pays the difference between the actual cash value and the loan balance.",
        "During the repair, rental reimbursement coverage on your policy pays for a substitute car up to a daily limit and a total number of days; if the other driver was at fault, their carrier owes you a rental for a reasonable repair period, and loss of use if you did not rent. Keep receipts. Payment on the claim arrives as a cheque to you, to the shop, or jointly with the lender, depending on the policy and the lienholder, and the claim closes when the last supplement is paid.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: ["Each of these shows up repeatedly in claims that went badly, and each is avoidable in the first day."],
      bullets: [
        "Admitting fault at the scene or in the first call. Describe events; let the adjusters decide.",
        "Waiting to report because the damage looked small. Hidden damage and a late notice condition make a small claim a large problem.",
        "Not getting the other driver's insurance information because the police were coming; the officer's report can take days to obtain.",
        "Accepting the first total-loss valuation without reading the comparables.",
        "Filing small claims that fall below or barely above the deductible. Each claim is rated at renewal; paying a small loss yourself is often the better arithmetic.",
        "Giving the other carrier a recorded statement without your own carrier's involvement.",
        "Signing a release from the other driver's carrier for injury before treatment is complete. A release ends the claim, including for symptoms that appear later.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a driver in Henderson is rear-ended at a light. Her car needs $6,000 of repairs; she carries collision with a $500 deductible and rental reimbursement of $40 a day for thirty days. She reports to her own carrier the same afternoon, submits photographs and the other driver's details, and claims under her own collision. Her carrier's appraiser writes the estimate, the shop finds $800 more once the bumper is off and submits a supplement, and her carrier pays $6,300 to the shop while she pays the $500 deductible. The repair takes twelve days and her rental is covered at $480. Her carrier then subrogates against the other driver's carrier, which accepts fault and repays the $6,300 and her $500 deductible, so she ends the claim out of pocket only for a tank of fuel. The figures are hypothetical; the route through her own collision rather than the other driver's liability is what made it a two-week matter rather than a two-month one.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "If you are a client, call us before or right after the first notice and we will tell you which coverage to claim under, what the deductible and rental limits are, and whether the claim is worth filing at all against what it will do to the premium. If you are not, the declarations page will tell you most of the same things, and the steps above are the same with any carrier. After the claim, the renewal is the moment to revisit deductibles and limits; we compare it against the carriers we represent in Arizona, Nevada, Utah and Idaho, and if the current policy handled the claim well and is still priced fairly, we say so.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "umbrella-insurance"],
  relatedArticles: ["what-to-do-after-a-car-accident-step-by-step", "how-to-dispute-a-denied-insurance-claim", "diminished-value-vs-total-loss-claims", "comprehensive-vs-collision-coverage", "how-to-read-your-auto-insurance-declarations-page"],
  relatedTerms: ["subrogation", "appraisal-clause", "actual-cash-value", "rental-reimbursement-coverage", "total-loss-threshold", "personal-injury-protection"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
