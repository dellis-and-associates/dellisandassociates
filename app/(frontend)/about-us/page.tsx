import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CarrierBar,
  CtaBand,
  PageHero,
  Section,
  SectionHead,
} from "@/components/Sections";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "All of us here at Ellis & Associates are here to help you navigate the complicated process of providing the quality financial protection you need at an affordable cost.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Advisory first. Products second."
        lede={`Welcome to ${site.legalName}. All of us here are here to help you navigate the complicated process of providing the quality financial protection you need at an affordable cost.`}
      />
      <CarrierBar />

      <Section>
        <div className="grid grid-cols-1 items-start gap-9 min-[961px]:grid-cols-2 min-[961px]:gap-16">
          <div>
            <span className="eyebrow mb-2">How we work</span>
            <h2 className="heading-2">
              You don&rsquo;t have to do this alone — and there&rsquo;s never a
              fee.
            </h2>
          </div>
          <div className="text-slate">
            <p>
              This process does not need to be done alone, and there is never a
              fee for our service. Please schedule a time and one of our
              licensed agents will be in contact to provide a comprehensive
              analysis of yours and your family&rsquo;s needs.
            </p>
            <p className="mt-4">
              As independent advisors we are appointed with more than 40
              carriers, which means the recommendation is a finding from the
              market — not a pitch for a single company&rsquo;s product. If
              keeping what you have is the right answer, that&rsquo;s the
              answer we give.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact-us">Book a policy review</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={site.phoneHref}>Call {site.phone}</a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="What we cover"
          title="One review, the whole market."
          body="Every engagement starts with a comprehensive analysis across the lines below."
        />
        <div className="grid grid-cols-1 gap-4 min-[681px]:grid-cols-2 min-[961px]:grid-cols-4">
          {services.map((s) => (
            <Card key={s.href} asChild className="group gap-0 p-5">
              <Link href={s.href}>
                <h3 className="text-[15px] font-medium group-hover:text-copper">
                  {s.label}
                </h3>
                <span className="mt-2 block text-[13px] font-medium text-copper">
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
