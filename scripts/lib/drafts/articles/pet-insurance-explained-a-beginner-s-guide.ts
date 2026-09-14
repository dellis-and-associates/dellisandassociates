import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Pet insurance explained: a beginner's guide",
  excerpt: "Pet insurance reimburses veterinary bills after a deductible and a coinsurance share, up to an annual limit. How those three levers work together, what accident-only and accident-and-illness plans cover, how pre-existing conditions are defined, and a rule for deciding whether to buy it at all.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Pet insurance is health insurance that behaves like property insurance. You pay the veterinarian, send the invoice to the carrier, and the carrier reimburses a share of the bill after a deductible, up to a limit for the year. There is no network, no pre-authorisation for most plans, and no need to find a vet who accepts the policy. The trade-off is that the reimbursement rules do all the work, and they are worth reading before the first claim rather than after.",
        "This guide explains the three numbers that decide what a plan pays, the difference between the two plan types, the exclusions that generate most disputes, a few regional facts about pets in the desert and the mountains, and a way to decide whether the premium is worth paying at all. Pet insurance is an optional purchase, and for some households the honest answer is to skip it.",
      ],
    },
    {
      heading: "The three levers: deductible, reimbursement rate and annual limit",
      paragraphs: [
        "The deductible is the amount you pay before the plan pays anything. Most plans set it per policy year, so it is met once and every later claim that year skips it; a few set it per condition, so each new illness or injury starts fresh. The reimbursement rate is the share of eligible costs the plan pays after the deductible; the remainder is your coinsurance. The annual limit is the most the plan pays in a policy year; some plans offer an unlimited option at a higher premium, and older plans sometimes carry a lifetime cap as well.",
        "Suppose a dog tears a cruciate ligament and the surgery, imaging and rehabilitation come to $6,000. The plan has a $500 annual deductible, a reimbursement rate of eighty percent, and a $10,000 annual limit. The plan subtracts the deductible to reach $5,500 of eligible cost, pays its eighty-percent share, $4,400, and you pay $1,600 in total. If the same dog needs a second surgery later in the year for $6,000, the deductible has been met, so the plan pays $4,800, leaving $800 of the annual limit for anything else. Those are round figures, but they show why a higher annual limit matters more than a lower deductible: the deductible is a fixed small cost, and the limit is what runs out.",
      ],
    },
    {
      heading: "Accident-only versus accident and illness",
      paragraphs: [
        "An accident-only plan pays for injuries: a broken leg, a swallowed sock, a torn nail, a dog fight, a fall. It is inexpensive and it excludes every illness. An accident-and-illness plan adds disease: cancer, diabetes, kidney disease, allergies, infections, hip dysplasia in breeds that are prone to it, and the diagnostic work that goes with each. Since most of a pet's lifetime veterinary cost comes from illness rather than injury, the accident-and-illness plan is the one people usually mean when they say pet insurance.",
        "Wellness or routine care is a separate add-on on most plans, covering vaccinations, annual exams, flea and tick preventives and dental cleanings at fixed reimbursement amounts. It is not insurance in the usual sense; it is a prepayment plan, and it is worth buying only if the fixed reimbursements exceed what it costs. Run that arithmetic before adding it.",
      ],
    },
    {
      heading: "Pre-existing conditions and waiting periods",
      paragraphs: [
        "Every plan excludes conditions that showed signs before coverage began or during the waiting period after enrolment, and this is the source of most claim disputes. A condition does not need to have been diagnosed to be pre-existing; a vet note about limping or a skin rash before the effective date can be enough to exclude a later diagnosis on the same body part. Some carriers distinguish curable pre-existing conditions, such as an ear infection that resolved and did not recur for a stated period, from incurable ones, and will cover the former after that period. Some also apply a bilateral rule: a cruciate tear in one knee before enrolment excludes the other knee afterwards.",
        "Waiting periods run from enrolment: a short one for accidents, a longer one for illnesses, and on many plans a longer one still for orthopaedic conditions. The practical consequence is that the best time to enrol is when the pet is young and has a clean record, because everything that appears afterwards is covered, and each year of waiting adds conditions to the excluded list. Most carriers ask for the pet's veterinary records at the first claim, not at enrolment, so the exclusion is decided when the money is on the table.",
      ],
    },
    {
      heading: "What else is commonly excluded",
      paragraphs: ["Beyond pre-existing conditions, the usual exclusions are consistent across carriers."],
      bullets: [
        "Elective and cosmetic procedures, including tail docking, ear cropping and declawing.",
        "Breeding, pregnancy and whelping.",
        "Dental disease on many plans, or dental only after a recent cleaning is documented; dental injury from an accident is usually covered.",
        "Prescription food and supplements, unless a plan specifically adds them.",
        "Behavioural treatment, on some plans, and grooming on all of them.",
        "Conditions that some plans exclude by breed, or hereditary conditions on plans that carve them out; read the list for your breed.",
        "Costs for a pet used in a business, such as a working dog or a breeding animal, which may need a different policy.",
      ],
    },
    {
      heading: "Pets in the desert and the mountains",
      paragraphs: [
        "Some regional conditions are worth knowing about because they are expensive and they are covered as illness or accident on a plan bought before they appear. Valley fever, the fungal infection endemic to the low deserts of Arizona and parts of Nevada and Utah, can require months of medication and imaging; it is an illness, and a dog diagnosed before enrolment will have it excluded for life. Rattlesnake bites are accidents and the antivenom is costly; a vaccine exists and some plans reimburse it under wellness. Heat stroke is an accident on most plans. In Idaho and northern Utah, foxtail grass awns lodged in ears, paws and noses generate a steady run of summer surgeries. A plan that covers exam fees as well as treatment matters more where a single condition involves repeated visits.",
      ],
    },
    {
      heading: "What decides the premium",
      paragraphs: [
        "Species and breed first: a large purebred dog with known hereditary conditions is rated far above a mixed-breed cat. Then age, with premiums rising each year and many carriers declining new enrolments above a stated age. Then location, since veterinary costs in Scottsdale differ from those in Twin Falls. Then the three levers, where a higher deductible, a lower reimbursement rate and a lower annual limit each reduce the premium. Premiums are not fixed for the pet's life; expect increases at renewal as the pet ages, and ask how the carrier has handled renewals in the past.",
      ],
    },
    {
      heading: "A decision rule",
      paragraphs: [
        "Pet insurance is worth buying when a large unexpected veterinary bill would force a decision you would regret, when the pet is young and healthy enough that little is excluded, and when the plan's annual limit is high enough to cover a serious diagnosis rather than a routine one. It is worth skipping when the pet is older with a long medical history, since most of what is likely to go wrong is already excluded, or when the household can set aside the premium each month and would honestly do so. The middle path is an accident-and-illness plan with a high deductible and a high limit, which keeps the premium down and covers what matters.",
        "Pet insurance is a specialty line, and the carriers that write it are largely separate from those that write auto and home. Where we can place it, we will say so; where we cannot, the advice above stands on its own, and a renters or homeowner policy's liability section, which covers a dog bite to a guest, is a separate question worth checking at the same time.",
      ],
    },
  ],
  relatedProducts: ["pet-insurance", "home-insurance", "renters-insurance"],
  relatedArticles: ["adopting-a-pet-do-you-need-pet-insurance", "renters-insurance-explained-a-beginner-s-guide", "home-insurance-explained-a-beginner-s-guide", "how-insurance-actually-works-a-plain-english-guide", "how-to-choose-the-right-deductible"],
  relatedTerms: ["deductible", "coinsurance", "pre-existing-condition-exclusion", "exclusion", "premium"],
};
