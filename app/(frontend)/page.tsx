import Link from "next/link";
import { Monogram } from "@/components/Logo";
import {
  CanopyIcon,
  CrossIcon,
  ReviewIcon,
  StaircaseIcon,
} from "@/components/Icons";
import RecognitionGallery from "@/components/RecognitionGallery";
import {
  CarrierBar,
  CtaBand,
  Section,
  SectionHead,
} from "@/components/Sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/lib/site";

const testimonials = [
  {
    quote:
      "My experience with D Ellis & Associates during a recent claim was impressive. They processed my claim swiftly, and their adjuster was friendly and helpful throughout the process. It's reassuring to know they have your back when you need them.",
    name: "Meliza",
  },
  {
    quote:
      "One thing I love about D Ellis & Associates is their transparent policies. There are no hidden fees or surprises. They make it easy to understand what you're covered for, and that peace of mind is invaluable.",
    name: "Jacob",
  },
  {
    quote:
      "I switched to D Ellis & Associates because of their stellar reputation in the industry. They've been around for decades and have a track record of taking care of their customers. I can see why they're so highly regarded.",
    name: "Amelia",
  },
];

const faqs = [
  {
    value: "life-policy",
    question:
      "How can I find the right life insurance policy for my family's needs?",
    answer: [
      "Start from your obligations, not a product: what income would need replacing, what debts would need paying, and what future costs — like education — you want covered. Your health, age, and budget then determine whether term, whole, or indexed universal life fits best.",
      "A licensed advisor can compare quotes across carriers so the policy is sized to your actual numbers. That comparison is exactly what our no-fee review does.",
    ],
  },
  {
    value: "health-costs",
    question: "What factors affect my health insurance costs?",
    answer: [
      "Several factors influence health insurance costs, including your age, location, smoking status, the level of coverage you choose, and any pre-existing health conditions. You can often save on premiums by selecting a plan with a higher deductible or by using in-network healthcare providers.",
      "Additionally, maintaining a healthy lifestyle can lead to lower long-term healthcare expenses and potentially lower insurance costs.",
    ],
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-site grid min-h-[480px] grid-cols-1 min-[961px]:grid-cols-[7fr_5fr]">
          <div className="py-16 pr-0 min-[961px]:py-21 min-[961px]:pr-12">
            <span className="eyebrow mb-3.5">
              Independent insurance advisory
            </span>
            <h1 className="heading-display mb-5 max-w-[560px]">
              The right coverage is a{" "}
              <span className="border-b-4 border-copper pb-0.5">finding</span>,
              not a pitch.
            </h1>
            <p className="mb-7.5 max-w-[460px] text-slate">
              Licensed advisors compare the market across life, Medicare,
              health, and annuities — then walk you through the math. The
              analysis costs you nothing.
            </p>
            <div className="mb-8.5 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact-us">Book a policy review</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={site.phoneHref}>Call {site.phone}</a>
              </Button>
            </div>
            <p className="max-w-[460px] border-t border-border pt-3.5 text-[13px] tracking-[0.02em] text-stone">
              Independent&ensp;·&ensp;Licensed in UT + 12 states&ensp;·&ensp;No
              fee for advisory
            </p>
          </div>
          <div className="relative flex items-end overflow-hidden bg-evergreen p-8 max-[960px]:min-h-[220px]">
            <Monogram
              size={300}
              color="#F7F5F0"
              className="absolute -bottom-14 -right-14 opacity-[0.07]"
            />
            <p className="relative max-w-[300px] text-[13px] leading-relaxed text-sage-light">
              <strong className="mb-1.5 block text-[15px] font-medium text-bone">
                D. Ellis, principal advisor
              </strong>
              Never a fee for our service — schedule a time and a licensed
              agent will provide a comprehensive analysis of your family&rsquo;s
              needs.
            </p>
          </div>
        </div>
      </section>

      <CarrierBar />

      {/* Welcome */}
      <Section>
        <div className="grid grid-cols-1 items-start gap-9 min-[961px]:grid-cols-2 min-[961px]:gap-16">
          <div>
            <span className="eyebrow mb-2">Welcome</span>
            <h2 className="heading-2">
              Welcome to {site.legalName}.
            </h2>
          </div>
          <div className="text-slate">
            <p>
              All of us here at Ellis &amp; Associates are here to help you
              navigate the complicated process of providing the quality
              financial protection you need at an affordable cost. This process
              does not need to be done alone — and there is never a fee for our
              service.
            </p>
            <p className="mt-4">
              Please schedule a time and one of our licensed agents will be in
              contact to provide a comprehensive analysis of yours and your
              family&rsquo;s needs.
            </p>
            <div className="mt-7">
              <Button asChild variant="outline" size="lg">
                <Link href="/about-us">Know more</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Coverage bento */}
      <Section>
        <SectionHead
          eyebrow="Coverage"
          title="One review, the whole market."
        />
        <div className="grid grid-cols-1 gap-4 min-[681px]:grid-cols-2">
          <Card asChild className="group gap-0 p-7 min-[681px]:row-span-2">
            <Link href="/life-insurance">
              <CanopyIcon />
              <h3 className="mb-1.5 mt-3.5 text-base font-medium">
                Life insurance
              </h3>
              <p className="mb-3.5 text-sm leading-relaxed text-slate">
                Protection sized to your actual obligations — mortgage, income,
                education — not a round number.
              </p>
              <p className="mb-auto text-[13px] text-stone">
                Term&ensp;·&ensp;Whole&ensp;·&ensp;Indexed universal
              </p>
              <span className="mt-4 text-sm font-medium text-copper group-hover:underline">
                Compare the market →
              </span>
            </Link>
          </Card>

          <Card asChild className="gap-0 p-5.5">
            <Link href="/medicare">
              <span className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-[15px] font-medium">Medicare</h3>
                <Badge variant="secondary" className="uppercase tracking-[0.08em]">
                  Circle of Champions
                </Badge>
              </span>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Four parts, one decision. We handle enrollment windows and plan
                spread — supplements, Part D, and Medicare Advantage.
              </p>
            </Link>
          </Card>

          <div className="grid grid-cols-1 gap-4 min-[521px]:grid-cols-2">
            <Card asChild className="gap-0 p-4.5">
              <Link href="/annuities">
                <h3 className="mb-1 text-sm font-medium">Annuities</h3>
                <p className="text-[13px] text-slate">
                  Contractual income, in steps.
                </p>
              </Link>
            </Card>
            <Card asChild className="gap-0 p-4.5">
              <Link href="/health-insurance">
                <h3 className="mb-1 text-sm font-medium">Health</h3>
                <p className="text-[13px] text-slate">
                  Individual and family plans.
                </p>
              </Link>
            </Card>
          </div>
        </div>
        <p className="mt-6 text-sm text-stone">
          Also:{" "}
          <Link href="/whole-life-insurance" className="font-medium text-copper hover:underline">
            Whole life
          </Link>
          ,{" "}
          <Link href="/term-life-insurance" className="font-medium text-copper hover:underline">
            Term life
          </Link>
          ,{" "}
          <Link href="/iul" className="font-medium text-copper hover:underline">
            Indexed universal life
          </Link>
          , and{" "}
          <Link href="/dental-and-vision-insurance" className="font-medium text-copper hover:underline">
            Dental &amp; vision
          </Link>
          .
        </p>
      </Section>

      {/* Policy review */}
      <Section>
        <div className="grid grid-cols-1 items-start gap-9 min-[961px]:grid-cols-2 min-[961px]:gap-16">
          <div>
            <span className="eyebrow mb-2">The policy review</span>
            <h2 className="heading-2">
              Coverage should keep up with your life.
            </h2>
          </div>
          <div className="text-slate">
            <div className="mb-5 flex gap-4">
              <ReviewIcon size={30} />
              <StaircaseIcon size={30} />
              <CrossIcon size={30} />
            </div>
            <p>
              A policy discussion appointment is a valuable opportunity to
              ensure that your insurance coverage aligns with your current
              needs and circumstances. We recommend scheduling one during major
              life changes — a new home, a new child, a new job, or
              approaching retirement.
            </p>
            <div className="mt-7">
              <Button asChild size="lg">
                <Link href="/contact-us">Get appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHead eyebrow="Questions" title="Asked and answered." />
        <Accordion type="single" collapsible className="max-w-[760px]">
          {faqs.map((faq) => (
            <AccordionItem key={faq.value} value={faq.value}>
              <AccordionTrigger className="py-5.5 text-lg font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:text-copper">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-[680px] pb-6 text-base text-slate">
                {faq.answer.map((p, i) => (
                  <p key={i} className={i > 0 ? "mt-3" : ""}>
                    {p}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHead eyebrow="Clients" title="What people tell us." />
        <div className="grid grid-cols-1 gap-4 min-[961px]:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} asChild className="gap-0 p-7">
              <figure>
                <div
                  className="mb-3.5 text-sm tracking-[3px] text-copper"
                  aria-label="Five stars"
                >
                  ★★★★★
                </div>
                <blockquote className="flex-1 text-[15px] leading-relaxed text-slate">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-4.5 text-sm font-medium">
                  {t.name}
                </figcaption>
              </figure>
            </Card>
          ))}
        </div>
      </Section>

      {/* Recognition */}
      <Section>
        <SectionHead
          eyebrow="Recognition"
          title="Circle of Champions, plan year 2025."
          body="Awarded by UnitedHealthcare for excellence in serving Medicare clients."
        />
        <RecognitionGallery
          items={[
            {
              src: "/certificates/coc-certificate-py2025.jpg",
              alt: "Circle of Champions certificate, plan year 2025",
              caption: "PY2025 Circle of Champions certificate",
            },
            {
              src: "/certificates/coc-appreciation-letter-py2025.jpg",
              alt: "Circle of Champions appreciation letter, plan year 2025",
              caption: "PY2025 appreciation letter",
            },
          ]}
        />
      </Section>

      <CtaBand />
    </>
  );
}
