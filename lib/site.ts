export const site = {
  name: "Ellis & Associates",
  legalName: "Ellis & Associates Insurance Group",
  phone: "801-300-9980",
  phoneHref: "tel:8013009980",
  email: "daniel@dellisandassociates.com",
  facebook:
    "https://www.facebook.com/people/DEllis-and-Associates/100063451816513/",
  instagram: "https://www.instagram.com/dellisandassociates/",
};

export type NavLink = { label: string; href: string };

export const services: NavLink[] = [
  { label: "Life Insurance", href: "/life-insurance" },
  { label: "Whole Life Insurance", href: "/whole-life-insurance" },
  { label: "Term Life Insurance", href: "/term-life-insurance" },
  { label: "IUL", href: "/iul" },
  { label: "Annuities", href: "/annuities" },
  { label: "Medicare", href: "/medicare" },
  { label: "Health Insurance", href: "/health-insurance" },
  { label: "Dental & Vision Insurance", href: "/dental-and-vision-insurance" },
];

export const agentLinks: NavLink[] = [
  { label: "Agents Resource", href: "/agents-resource" },
  { label: "Agent Training", href: "/agent-training" },
];

export const carriers = [
  "Mutual of Omaha",
  "UnitedHealthcare",
  "Aetna",
  "Humana",
  "Cigna",
];

export const medicareDisclaimer =
  "Plans are insured or covered by a Medicare Advantage (HMO, PPO and PFFS) organization with a Medicare-approved Part D sponsor. Enrollment in the plan depends on the plan's contract renewal with Medicare. We do not offer every plan in your area. Please contact Medicare.gov or 1-800-Medicare to get information on all your options.";
