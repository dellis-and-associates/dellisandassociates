import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CanopyIcon,
  CrossIcon,
  EyeIcon,
  IndexIcon,
  ReviewIcon,
  StaircaseIcon,
  TermIcon,
} from "@/components/Icons";
import { CarrierBar, CtaBand, PageHero, Section } from "@/components/Sections";
import { serviceContent } from "@/lib/services-content";
import { services } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const label = services.find((s) => s.href === `/${slug}`)?.label;
  return { title: label ?? "Coverage" };
}

const icons = {
  canopy: CanopyIcon,
  staircase: StaircaseIcon,
  review: ReviewIcon,
  term: TermIcon,
  index: IndexIcon,
  cross: CrossIcon,
  eye: EyeIcon,
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = serviceContent[slug];
  if (!content) notFound();

  const IconComp = icons[content.icon];

  return (
    <>
      <PageHero eyebrow="Coverage" title={content.title} lede={content.lede} />
      <CarrierBar />

      {content.sections.map((section, i) => (
        <Section key={i}>
          <div className="grid grid-cols-1 items-start gap-8 min-[961px]:grid-cols-[1fr_2fr] min-[961px]:gap-16">
            <div className="flex items-start gap-4">
              {i === 0 && <IconComp size={30} />}
              {section.heading && (
                <h2 className="heading-3 max-w-[320px]">{section.heading}</h2>
              )}
            </div>
            <div>
              {section.paragraphs?.map((p, j) => (
                <p key={j} className={`text-slate ${j > 0 ? "mt-4" : ""}`}>
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul
                  className={`space-y-1 ${section.paragraphs ? "mt-5" : ""}`}
                >
                  {section.bullets.map((b) => (
                    <li key={b} className="dash-bullet py-1.5">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.features && (
                <dl className="grid grid-cols-1 gap-x-8 min-[681px]:grid-cols-2">
                  {section.features.map((f) => (
                    <div
                      key={f.term}
                      className="border-b border-border py-4 text-[15px]"
                    >
                      <dt className="mb-0.5 font-medium text-ink">{f.term}</dt>
                      <dd className="text-slate">{f.desc}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </Section>
      ))}

      <CtaBand
        title="See how this fits your numbers."
        body="Twenty minutes with a licensed advisor. If keeping what you have is the right answer, that's the answer we give."
        cta="Get a quote"
      />
    </>
  );
}
