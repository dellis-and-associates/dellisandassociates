import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Reimburses a share of veterinary bills for accidents and illnesses after a deductible, on terms fixed when the pet enrolls. What counts as pre-existing, how the deductible resets and whether the limit is annual or lifetime decide what a plan is worth.",
  intro: [
    "Pet insurance is a reimbursement contract. You pay the veterinarian, submit the invoice, and the carrier pays back a stated share of the covered charges after the deductible. It is closer to a health plan than to a property policy, with a waiting period, a reimbursement rate, a deductible that is annual or per condition, and a limit that is annual, per incident or lifetime. The clause that matters most is the definition of a pre-existing condition, because it decides what the plan will never pay.",
    "The premium is set by species, breed, age at enrollment, the ZIP code's veterinary prices, and the reimbursement rate, deductible and limit chosen. On most plans it rises with the pet's age at each renewal, which is the fact people miss when they enroll a puppy: the plan costs least when the animal is young and healthy and most when it is old and needs it. The right way to read a plan is at the pet's tenth year, not its first.",
    "The analysis asks one question first: if a major surgery or a chronic illness happened, would you pay for it, and could you? If you would and could, a high-deductible plan or setting the premium aside yourself are both reasonable. If you would but could not, a plan is the answer. For an older pet with conditions already in its record, the honest finding is often that a plan would pay little, and we say so.",
  ],
  coverageBlocks: [
    {
      heading: "Accident and illness",
      paragraphs: [
        "Accident coverage pays for the sudden things: a broken leg, a swallowed sock, a torn cruciate ligament, a fight at the dog park, a car strike. In the desert it also means rattlesnake bites, heat stroke, cholla spines in a paw and foxtails in an ear; in the Idaho and Utah mountains, porcupine quills and tick-borne disease. Illness coverage pays for what develops: ear infections, allergies, urinary crystals, cancer, diabetes, kidney disease, and the valley fever that Arizona dogs contract from the soil. Both pay for the diagnostics, surgery, hospitalization and medications that follow. An accident-only plan costs less and covers only the first list.",
      ],
    },
    {
      heading: "Deductible, reimbursement rate and limit",
      paragraphs: [
        "Three numbers set what comes back. Suppose a plan with a $500 annual deductible, an 80 percent reimbursement rate and a $10,000 annual limit, and a $3,000 surgery in a year with no other claims: the carrier pays $2,000 and you pay $1,000. An annual deductible resets once a year across every condition; a per-condition deductible is met separately for each diagnosis and resets for a chronic one every year, which favors pets with one long-running problem and punishes pets with several. A lifetime limit caps what the plan will ever pay for the animal; an annual limit caps a year and starts fresh.",
      ],
    },
    {
      heading: "Pre-existing conditions and waiting periods",
      paragraphs: [
        "Anything that showed signs in the medical record before enrollment or during the waiting period is pre-existing and excluded, whether or not it was diagnosed. Some plans distinguish curable conditions, which can be covered again after a symptom-free stretch, from incurable ones, which never are. Bilateral conditions are the trap: a cruciate tear in one knee often excludes the other knee for the life of the plan. Waiting periods run days for accidents and illnesses and often months for orthopedic conditions, and the carrier will read the vet records when the first claim arrives.",
      ],
    },
    {
      heading: "Wellness and routine care",
      paragraphs: [
        "A wellness add-on reimburses vaccines, annual exams, dental cleaning, flea and heartworm prevention and spay or neuter, up to a scheduled amount per item. It is a prepayment plan more than insurance: over a year it pays back roughly what it costs, with a small convenience premium. It is worth adding only when the schedule pays more than you would otherwise spend.",
      ],
    },
    {
      heading: "Hereditary, dental and behavioral conditions",
      paragraphs: [
        "Hip dysplasia in a large breed, airway disease in a flat-faced dog, heart disease in a cat of a particular breed: whether these are covered, excluded or covered only after a longer wait varies by plan and is worth checking against your animal's breed before enrolling. Dental illness, meaning extractions and abscesses rather than cleanings, is covered by some plans and not others. Behavioral treatment, prescription food and physical therapy are each their own line in the fine print.",
      ],
    },
  ],
  covered: [
    "Emergency surgery after a car strike or a swallowed sock",
    "Rattlesnake antivenom and the hospital stay that follows, a common desert claim",
    "Diagnosis and treatment of valley fever, cancer, diabetes and kidney disease",
    "Prescription medications for a covered condition",
    "X-rays, ultrasound, bloodwork and MRI ordered for a covered condition",
    "Hereditary conditions, when the plan includes them and they were not already showing",
    "Specialist and emergency clinic visits, at the same reimbursement rate",
  ],
  notCovered: [
    "Conditions that showed symptoms before enrollment or during the waiting period",
    "Routine exams, vaccines, flea and heartworm prevention, without the wellness add-on",
    "Spay, neuter and other elective procedures",
    "Breeding, pregnancy and whelping",
    "Grooming, food, supplements and boarding",
    "The exam fee itself, on plans that exclude it",
    "Cosmetic procedures such as tail docking or ear cropping",
  ],
  discounts: [
    { name: "Multi-pet", description: "A second and each additional animal on the same account." },
    { name: "Annual payment", description: "The year's premium paid at once rather than monthly." },
    { name: "Employer or association group", description: "Plans offered through an employer benefits program or a membership group are often priced below individual enrollment." },
    { name: "Spayed, neutered or microchipped", description: "A small reduction with some carriers for an altered or chipped animal." },
  ],
  faqs: [
    {
      question: "When is the right time to enroll?",
      answer: [
        "Before the record has anything in it. A puppy or kitten enrolled at its first visit has no pre-existing conditions, and everything that develops later is covered. Every vet visit before enrollment adds to the list of what the plan can exclude. Enrolling an older animal is still possible, but the plan will be priced for its age and will exclude what the record already shows.",
      ],
    },
    {
      question: "Why does my premium go up every year?",
      answer: [
        "Two reasons stack. The pet is a year older and older animals claim more, so most plans step the premium up with age. And the carrier reprices its whole book for what veterinary care now costs in your area, which has been rising faster than most household expenses. A plan that looked modest at enrollment can double or more by the animal's senior years, and switching carriers late resets the pre-existing clock against you, so the plan you pick at the start is the one you should expect to keep.",
      ],
    },
    {
      question: "What counts as a pre-existing condition?",
      answer: [
        "Any condition, symptom or injury that appears in the medical record, or that a vet would reasonably have noticed, before coverage began or during the waiting period. It does not require a diagnosis: a note that the dog was limping is enough to exclude the knee later. Some carriers will review the records before enrollment and tell you what they would exclude, which is worth asking for.",
      ],
    },
    {
      question: "Is a wellness plan worth adding?",
      answer: [
        "Do the arithmetic on the schedule. Add up what the wellness add-on would reimburse for the things you already do each year and compare it to what the add-on costs. If the schedule pays more, take it; if not, keep the money. It rarely produces a large difference either way, because it is designed to be a wash for the carrier.",
      ],
    },
    {
      question: "Does the plan pay the vet directly?",
      answer: [
        "Usually not. You pay the clinic, submit the invoice and the records, and the carrier reimburses you, which means you need to be able to cover the bill first. A few carriers offer direct payment at participating clinics or a card that draws on the plan at the counter; if paying a large bill up front would be the problem, ask for one of those.",
      ],
    },
    {
      question: "Is it worth it for an indoor cat?",
      answer: [
        "An indoor cat avoids the car strikes and fights but not the urinary blockages, kidney disease, dental abscesses and cancers that fill a cat's later years, and those are the expensive claims. An illness plan with a higher deductible is the reasonable shape for a cat; an accident-only plan is not, because the accidents are the part an indoor life mostly removes.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "renters-insurance", "umbrella-insurance"],
  seo: { description: "How pet insurance works: accident and illness, deductible and reimbursement rate, pre-existing conditions, waiting periods, wellness add-ons and when a plan is not worth it, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
