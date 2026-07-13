import Link from "next/link";
import type { ReactNode } from "react";
import { Monogram } from "./Logo";
import { Button } from "@/components/ui/button";
import { carriers, site } from "@/lib/site";

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
}) {
  return (
    <section className="border-b border-border py-18">
      <div className="container-site">
        <span className="eyebrow mb-3.5">{eyebrow}</span>
        <h1 className="max-w-[720px] font-medium leading-[1.08] tracking-[-0.025em] text-[clamp(34px,4vw,56px)]">
          {title}
        </h1>
        {lede && <p className="mt-4.5 max-w-[620px] text-slate">{lede}</p>}
      </div>
    </section>
  );
}

export function CarrierBar() {
  return (
    <div className="border-b border-border">
      <div className="container-site flex flex-wrap items-center gap-x-7 gap-y-3.5 py-4">
        <span className="text-[11px] font-semibold tracking-[0.14em] text-stone">
          APPOINTED WITH 40+ CARRIERS
        </span>
        {carriers.map((c) => (
          <span key={c} className="text-sm text-fog">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CtaBand({
  title = "Twenty minutes. Your numbers. No obligation.",
  body = "If keeping what you have is the right answer, that's the answer we give.",
  cta = "Book a policy review",
  href = "/contact-us",
}: {
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-evergreen text-bone">
      <Monogram
        size={280}
        color="#F7F5F0"
        className="pointer-events-none absolute -bottom-16 -right-10 opacity-[0.07]"
      />
      <div className="container-site relative py-18">
        <h2 className="heading-2 mb-2.5 text-bone">{title}</h2>
        <p className="mb-6.5 max-w-[480px] text-sage-light">{body}</p>
        <div className="flex flex-wrap items-center gap-4.5">
          <Button asChild variant="reverse" size="lg">
            <Link href={href}>{cta}</Link>
          </Button>
          <a
            href={site.phoneHref}
            className="text-[15px] font-medium text-copper-soft"
          >
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
  bordered = true,
}: {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      className={`py-22 ${bordered ? "border-b border-border" : ""} ${className}`}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: ReactNode;
}) {
  return (
    <div className="mb-10 max-w-[640px]">
      <span className="eyebrow mb-2">{eyebrow}</span>
      <h2 className="heading-2">{title}</h2>
      {body && <p className="mt-3.5 text-slate">{body}</p>}
    </div>
  );
}
