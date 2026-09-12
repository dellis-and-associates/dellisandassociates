import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PartnerIcon, ReviewIcon, StaircaseIcon } from "@/components/Icons";
import {
  CarrierBar,
  CtaBand,
  PageHero,
  Section,
  SectionHead,
} from "@/components/Sections";

export const metadata: Metadata = {
  title: "Work with us",
  description:
    "New and experienced life insurance agents get access to top carriers, competitive compensation, and industry-leading training.",
};

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build an advisory practice, not a sales quota."
        lede="Whether you're new to the industry or an experienced life insurance agent, you'll get access to top carriers, competitive compensation, and industry-leading training."
      />
      <CarrierBar />

      <Section>
        <SectionHead
          eyebrow="Why here"
          title="Prioritizing satisfaction and support."
        />
        <div className="grid grid-cols-1 gap-4 min-[961px]:grid-cols-3">
          <Card className="gap-0 p-7">
            <PartnerIcon />
            <h3 className="mb-2 mt-3.5 text-base font-medium">
              What differentiates us?
            </h3>
            <p className="text-sm leading-relaxed text-slate">
              Customizable coverage options tailored to each client&rsquo;s
              needs — without unnecessary extras. Your recommendations come
              from the whole market, so you can stand behind every one of
              them.
            </p>
          </Card>
          <Card className="gap-0 p-7">
            <ReviewIcon />
            <h3 className="mb-2 mt-3.5 text-base font-medium">
              How we keep clients happy
            </h3>
            <p className="text-sm leading-relaxed text-slate">
              A dedicated support team, streamlined claims processes, and
              regular customer feedback collection — so policyholders have a
              positive experience long after the sale.
            </p>
          </Card>
          <Card className="gap-0 p-7">
            <StaircaseIcon />
            <h3 className="mb-2 mt-3.5 text-base font-medium">
              How you grow
            </h3>
            <p className="text-sm leading-relaxed text-slate">
              Appointments with 40+ carriers, competitive compensation, and
              training that turns new agents into advisors — see the agent
              training portal once you&rsquo;re on the team.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 items-start gap-9 min-[961px]:grid-cols-2 min-[961px]:gap-16">
          <div>
            <span className="eyebrow mb-2">Join now</span>
            <h2 className="heading-2">
              New to the industry or twenty years in — there&rsquo;s a desk
              here.
            </h2>
          </div>
          <div className="text-slate">
            <p>
              We&rsquo;re looking for both new and experienced life insurance
              agents. You bring the work ethic; we bring access to top
              carriers, competitive compensation, and industry-leading
              training.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact-us">Start the conversation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/agent-training">Agent training portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Ready to join the team?"
        body="Tell us about yourself and a principal will get back to you directly."
        cta="Get in touch"
      />
    </>
  );
}
