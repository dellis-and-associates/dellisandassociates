import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Client intake forms and contact information for Ellis & Associates.",
};

const resources = [
  {
    href: "/new-client-intake-form",
    title: "New client intake form",
    sub: "Tell us about yourself and your coverage goals before your first appointment.",
  },
  {
    href: "/medication-intake-form",
    title: "Client medication intake form",
    sub: "List current prescriptions so we can check drug coverage across Medicare plans.",
  },
  {
    href: "/contact-us",
    title: "Contact us",
    sub: "Book a policy review, get a quote, or just ask a question.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Forms and next steps for clients."
        lede="Everything we need before an appointment, in one place. Each form takes a few minutes."
      />
      <Section>
        <ul className="max-w-[760px]">
          {resources.map((r) => (
            <li key={r.href} className="border-b border-border">
              <Link
                href={r.href}
                className="group flex items-center justify-between gap-4.5 px-1 py-6"
              >
                <span>
                  <span className="block text-lg font-medium transition-colors group-hover:text-copper">
                    {r.title}
                  </span>
                  <span className="mt-1 block text-sm text-stone">{r.sub}</span>
                </span>
                <span aria-hidden className="shrink-0 text-xl text-copper">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
