import type { Metadata } from "next";
import Link from "next/link";
import {
  CanopyIcon,
  CrossIcon,
  EyeIcon,
  IndexIcon,
  StaircaseIcon,
  TermIcon,
} from "@/components/Icons";
import { CarrierBar, CtaBand, PageHero, Section } from "@/components/Sections";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Insurance services",
  description:
    "Life, whole life, term life, IUL, annuities, Medicare, health, and dental & vision — one review across the whole market.",
};

const cards = [
  {
    href: "/life-insurance",
    label: "Life Insurance",
    desc: "Protection sized to your actual obligations — mortgage, income, education — not a round number.",
    Icon: CanopyIcon,
  },
  {
    href: "/whole-life-insurance",
    label: "Whole Life Insurance",
    desc: "Lifetime coverage with a fixed death benefit and guaranteed cash value growth.",
    Icon: CanopyIcon,
  },
  {
    href: "/term-life-insurance",
    label: "Term Life Insurance",
    desc: "Level premiums for a defined window — 10 to 30 years of straightforward protection.",
    Icon: TermIcon,
  },
  {
    href: "/iul",
    label: "Indexed Universal Life",
    desc: "Permanent coverage with cash value growth linked to an index, accumulating tax-deferred.",
    Icon: IndexIcon,
  },
  {
    href: "/annuities",
    label: "Annuities",
    desc: "Contractual income for life or a set period — fixed, variable, or indexed.",
    Icon: StaircaseIcon,
  },
  {
    href: "/medicare",
    label: "Medicare",
    desc: "Four parts, one decision. Supplements, Part D, and Medicare Advantage — we handle the windows.",
    Icon: CrossIcon,
  },
  {
    href: "/health-insurance",
    label: "Health Insurance",
    desc: "Individual and family plans, explained down to the deductible.",
    Icon: CrossIcon,
  },
  {
    href: "/dental-and-vision-insurance",
    label: "Dental & Vision Insurance",
    desc: "Individual and group plans covering routine care, exams, and eyewear.",
    Icon: EyeIcon,
  },
];

export default function InsuranceServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="One review, the whole market."
        lede="Licensed advisors compare the market across every line below — then walk you through the math. The analysis costs you nothing."
      />
      <CarrierBar />
      <Section>
        <div className="grid grid-cols-1 gap-4 min-[681px]:grid-cols-2 min-[961px]:grid-cols-3">
          {cards.map(({ href, label, desc, Icon }) => (
            <Card key={href} asChild className="group gap-0 p-7">
              <Link href={href}>
                <Icon />
                <h2 className="mb-1.5 mt-3.5 text-base font-medium">{label}</h2>
                <p className="flex-1 text-sm leading-relaxed text-slate">
                  {desc}
                </p>
                <span className="mt-4 text-sm font-medium text-copper group-hover:underline">
                  Compare the market →
                </span>
              </Link>
            </Card>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
