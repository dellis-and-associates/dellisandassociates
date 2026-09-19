import Link from "next/link";
import type { Product, SiteSetting, State } from "../../payload-types.ts";
import { hasTodo } from "../../fields/index.ts";
import { AUTHOR_PATH } from "../../lib/seo.ts";
import { GROUPS, groupProducts, orderStates } from "../../lib/groups.ts";
import { productPath } from "../../lib/routes.ts";
import { richTextToPlain } from "../../lib/text.ts";
import { Accordion, StrataRule } from "../ui/misc.tsx";
import { IconPhone } from "../ui/icons.tsx";
import { RichText } from "./richtext.tsx";
import certificates from "../../../public/certificates/manifest.json";

export const CTA = "Request the analysis";
const primaryOnBrand = "inline-flex min-h-11 items-center rounded-control bg-brand-ink px-5 font-sans text-small font-semibold text-brand no-underline hover:bg-surface";
const primary = "inline-flex min-h-11 items-center rounded-control bg-brand px-5 font-text text-copy font-semibold text-brand-ink no-underline hover:bg-brand-hover";
/** Secondary action on a light surface: hairline border, no fill, no shadow. */
const secondary = "inline-flex min-h-11 items-center gap-2 rounded-control border border-border-strong px-5 font-text text-copy font-semibold text-ink no-underline hover:border-ink";

/**
 * The watermark behind the advisor panel: the Strata geometry (horizontal
 * bands cut by one normal fault, the right block up-thrown by half a band
 * period), drawn large and faint. It is a device derived from the mark's
 * geometry, not the logo file, so the logo rules about backgrounds hold.
 */
function StrataWatermark() {
  const bands = 7, band = 10, gap = 4, period = band + gap, W = 240, H = bands * period;
  const fault = 138, throwUp = period / 2;
  const rects: string[] = [];
  for (let i = 0; i < bands; i++) {
    const y = i * period;
    rects.push(`M0 ${y}h${fault - 3 - i * 2}l-${2}${" "}${band}H0z`);
    rects.push(`M${fault + 3 - i * 2} ${y - throwUp}H${W}v${band}H${fault + 1 - i * 2}z`);
  }
  return (
    <svg viewBox={`0 ${-throwUp} ${W} ${H + throwUp}`} className="pointer-events-none absolute -right-8 bottom-0 h-auto w-4/5 text-border" aria-hidden focusable="false" preserveAspectRatio="xMaxYMax meet">
      <path d={rects.join("")} fill="currentColor" />
    </svg>
  );
}

/** Sentence per line: the hero's two sentences break where they were written to break, not where the viewport decides. */
const sentences = (text: string): string[] => text.match(/[^.!?]+[.!?]*\s*/g)?.map((t) => t.trim()).filter(Boolean) ?? [text];

export function Hero({ site, states, headline, lede }: { site: SiteSetting; states: State[]; headline: string; lede: string }) {
  const advisor = site.advisor;
  const photo = advisor?.photo && typeof advisor.photo === "object" && advisor.photo.url ? advisor.photo : null;
  const names = orderStates(states).map((s) => s.name);
  const facts = ["Independent", "No fee for the analysis", `Licensed in ${names.join(", ")}`];
  return (
    <section className="band shell grid gap-band-gap md:grid-cols-12" aria-labelledby="hero-h">
      <div className="grid content-start gap-6 md:col-span-7">
        {/* Not revealed: this is the LCP element and must paint immediately. */}
        <h1 id="hero-h" className="display-type text-display-xl text-ink">
          {sentences(headline).map((line) => <span key={line} className="block">{line}</span>)}
        </h1>
        <p className="max-w-measure-editorial font-text text-lede text-ink-secondary">{lede}</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/quote/" className={primary}>{CTA}</Link>
          {site.phoneHref ? <a href={site.phoneHref} className={`${secondary} tabular`}><IconPhone />Call {site.phone}</a> : null}
        </div>
      </div>
      <div className="relative isolate overflow-hidden md:col-span-5 md:col-start-8">
        <StrataWatermark />
        <aside className="relative z-10 grid gap-5 rounded-surface border border-border bg-surface-raised p-6 text-ink md:mt-12" aria-label="Your advisor">
          {photo ? <img src={photo.url!} alt={photo.alt || advisor?.name || ""} width={photo.width ?? 96} height={photo.height ?? 96} className="size-24 rounded-surface object-cover" /> : <StrataRule />}
          <div className="grid gap-1">
            <p className="font-text text-subhead font-semibold">{advisor?.name && !hasTodo(advisor.name) ? <Link href={AUTHOR_PATH} className="ui-link -my-2.5 py-2.5 text-ink">{advisor.name}</Link> : "A licensed advisor"}</p>
            {advisor?.title && !hasTodo(advisor.title) ? <p className="eyebrow">{advisor.title}</p> : null}
          </div>
          {advisor?.statement && !hasTodo(advisor.statement) ? <p className="display-type text-display-m text-ink">{advisor.statement}</p> : null}
        </aside>
      </div>
      <ul className="grid gap-2 border-t border-border pt-5 md:col-span-12 lg:flex lg:items-center lg:gap-0" aria-label="Three facts">
        {facts.map((f, i) => (
          <li key={f} className={`eyebrow text-ink-secondary lg:whitespace-nowrap ${i ? "lg:ml-5 lg:border-l lg:border-border lg:pl-5" : ""}`}>{f}</li>
        ))}
      </ul>
    </section>
  );
}

export function CarrierStrip({ site }: { site: SiteSetting }) {
  const names = (site.carriers?.names ?? []).map((n) => n.name).filter((n) => n && !hasTodo(n));
  const headline = site.carriers?.headline && !hasTodo(site.carriers.headline) ? site.carriers.headline : null;
  if (!headline && !names.length) return null;
  return (
    <div className="border-b border-border bg-surface-raised" data-carrier-strip>
      <div className="mx-auto flex max-w-measure-page flex-wrap items-baseline gap-x-8 gap-y-2 px-4 py-4 font-sans text-small md:px-8">
        {headline ? <p className="font-semibold text-ink">{headline}</p> : null}
        {names.length ? <ul className="flex flex-wrap gap-x-6 gap-y-1 text-ink-muted" aria-label="Carriers named on the legacy site">{names.map((n) => <li key={n}>{n}</li>)}</ul> : null}
        <Link href="/carriers/" className="ui-link font-semibold text-brand">Every carrier</Link>
      </div>
    </div>
  );
}

export function CoverageGroups({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="coverage-h" className="grid gap-6">
      <div className="grid gap-2">
        <h2 id="coverage-h">One review, the whole market.</h2>
        <p className="max-w-measure-body font-sans text-small text-ink-muted">Every line we write, in four groups. The analysis compares what you have against the carriers we represent, line by line.</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GROUPS.map((g) => {
          const { headline } = groupProducts(products, g.key);
          return (
            <li key={g.key} className="grid grid-rows-[auto_1fr_auto] gap-3 rounded-surface border border-border bg-surface-raised p-5 shadow-0">
              <h3 className="font-sans text-title-sm">{g.name}</h3>
              <ul className="grid gap-1 font-sans text-small">
                {headline.map((p) => <li key={p.id}><Link href={productPath(p)} className="ui-link text-ink">{p.name}</Link></li>)}
              </ul>
              <Link href={`/insurance/#g-${g.category}`} className="ui-link pt-2 font-sans text-small font-semibold text-brand">
                All {g.category.toLowerCase()} lines
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const EVENTS = [
  ["A new home", "Dwelling limits, replacement cost and the umbrella above them are set once and rarely revisited."],
  ["A new child", "Life coverage is sized to what you would leave behind; a dependant changes that number."],
  ["A new job", "Employer benefits change what you carry yourself: disability, life and health all move."],
  ["Approaching retirement", "Medicare enrollment windows, annuity income and the policies you no longer need."],
] as const;

export function LifeEvents() {
  return (
    <section aria-labelledby="events-h" className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:gap-12">
      <div className="grid content-start gap-4">
        <h2 id="events-h">Coverage should keep up with your life.</h2>
        <p className="max-w-measure-narrow">A policy review checks that what you carry still matches what you own and owe. We recommend one at each of these moments; it takes twenty minutes and costs nothing.</p>
        <Link href="/quote/" className={`${primary} w-fit`}>{CTA}</Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {EVENTS.map(([t, b]) => (
          <li key={t} className="grid gap-1 border-t-2 border-ink pt-3">
            <h3 className="font-sans text-title-sm">{t}</h3>
            <p className="font-sans text-small text-ink-muted">{b}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export type HomeFaq = { id: string; question: string; answer: NonNullable<Product["faqs"]>[number]["answer"]; product: Product };
/** One question from each of the lines people ask about most, in this order, then the rest until `max`. */
const FAQ_LINES = ["auto-insurance", "home-insurance", "life-insurance", "medicare", "umbrella-insurance", "renters-insurance"];
export const homeFaqs = (products: Product[], max = 6): HomeFaq[] => {
  const all = products.flatMap((p) => (p.faqs ?? []).map((f, i) => ({ id: `faq-${p.slug}-${i}`, question: f.question, answer: f.answer, product: p }))).filter((f) => !hasTodo(f.question) && !hasTodo(richTextToPlain(f.answer)));
  const picked: HomeFaq[] = [];
  for (const slug of FAQ_LINES) { const f = all.find((x) => x.product.slug === slug && !picked.includes(x)); if (f) picked.push(f); }
  for (const f of all) if (picked.length < max && !picked.includes(f)) picked.push(f);
  return picked.slice(0, max);
};

export function Faq({ items }: { items: HomeFaq[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq-h" className="grid gap-6">
      <h2 id="faq-h">Asked and answered.</h2>
      <div className="max-w-measure-wide">
        <Accordion
          name="home-faq"
          items={items.map((f) => ({ id: f.id, question: f.question, answer: <><RichText value={f.answer} className="" /><p className="mt-3 font-sans text-small"><Link href={productPath(f.product)}>More about {f.product.name.toLowerCase()}</Link></p></> }))}
        />
      </div>
    </section>
  );
}

/** Renders only with written consent on file (SiteSettings.testimonialConsentConfirmed); verify:compliance asserts it. */
export function Testimonials({ site }: { site: SiteSetting }) {
  const items = (site.testimonials ?? []).filter((t) => t.quote && t.name && t.consentDate);
  if (!site.testimonialConsentConfirmed || !items.length) return null;
  return (
    <section aria-labelledby="people-h" className="grid gap-6" data-testimonial>
      <h2 id="people-h">What people tell us.</h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {items.map((t) => (
          <li key={t.id ?? t.name}>
            <figure className="grid h-full content-between gap-4 rounded-surface border border-border bg-surface-raised p-5">
              <blockquote className="max-w-measure-narrow">{t.quote}</blockquote>
              <figcaption className="font-sans text-small font-semibold">{t.name}<span className="block font-normal text-ink-muted">Quoted with written consent, {new Date(t.consentDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span></figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

const CERTS = [
  { key: "coc-certificate-py2025", alt: "Circle of Champions certificate for plan year 2025, issued by UnitedHealthcare to Daniel Ellis", caption: "The certificate" },
  { key: "coc-appreciation-letter-py2025", alt: "Letter of appreciation for plan year 2025 from UnitedHealthcare to Daniel Ellis, thanking him for his work with Medicare clients", caption: "The appreciation letter" },
] as const;

export function Recognition() {
  return (
    <section aria-labelledby="recognition-h" className="grid gap-6">
      <div className="grid gap-2">
        <h2 id="recognition-h">Circle of Champions, plan year 2025.</h2>
        <p className="max-w-measure-body">Awarded to Daniel Ellis, principal advisor, by UnitedHealthcare for excellence in serving Medicare clients, plan year 2025. It is a personal recognition of a named producer for one plan year, and it is dated.</p>
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {CERTS.map((c) => {
          const m = certificates[c.key];
          return (
            <li key={c.key}>
              <figure className="grid gap-2">
                <picture>
                  {m.sources.map((s) => <source key={s.type} type={s.type} srcSet={s.srcset} sizes="(min-width: 768px) 50vw, 100vw" />)}
                  <img src={m.fallback} alt={c.alt} width={m.width} height={m.height} loading="lazy" decoding="async" className="w-full rounded-surface border border-border bg-surface-raised" />
                </picture>
                <figcaption className="font-sans text-small text-ink-muted">{c.caption}, plan year 2025</figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ClosingBand({ site }: { site: SiteSetting }) {
  return (
    <section aria-labelledby="closing-h" className="cta-band bg-brand text-brand-ink" data-no-print>
      <div className="mx-auto grid max-w-measure-page gap-6 px-4 py-12 md:grid-cols-[1.4fr_1fr] md:items-center md:px-8 md:py-16">
        <div className="grid gap-3">
          <h2 id="closing-h" className="text-brand-ink">Twenty minutes. Your numbers. No obligation.</h2>
          <p className="max-w-measure-narrow font-sans text-small text-brand-ink">If keeping what you have is the right answer, that is the answer we give.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 md:justify-end">
          <Link href="/quote/" className={primaryOnBrand}>{CTA}</Link>
          {site.phoneHref ? <a href={site.phoneHref} className="ui-link font-sans text-small font-semibold text-brand-ink tabular">{site.phone}</a> : null}
        </div>
      </div>
    </section>
  );
}
