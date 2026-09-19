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
import { Reveal } from "./reveal.tsx";
import certificates from "../../../public/certificates/manifest.json";

export const CTA = "Request the analysis";
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
            <p className="font-text text-subhead font-semibold">{advisor?.name && !hasTodo(advisor.name) ? <Link href={AUTHOR_PATH} className="ui-link -my-3 py-3 text-ink">{advisor.name}</Link> : "A licensed advisor"}</p>
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
    <section className="band shell" aria-labelledby={headline ? "carriers-h" : undefined} aria-label={headline ? undefined : "Carriers"} data-carrier-strip>
      <div className="grid gap-band-gap md:grid-cols-12">
        <div className="grid content-start gap-4 md:col-span-4">
          <p className="eyebrow">Appointments</p>
          {headline ? <h2 id="carriers-h" className="display-type text-display-l text-ink">{headline}</h2> : null}
          <Link href="/carriers/" className="ui-link min-h-11 font-text text-copy font-semibold text-brand">Every carrier</Link>
        </div>
        {/* Names as text, not logo images: faster, sharper at every size, and no trademark-usage question. */}
        {names.length ? (
          <ul className="grid border-t border-border md:col-span-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-10" aria-label="Carriers named on the legacy site">
            {names.map((n) => <li key={n} className="border-b border-border py-3 font-text text-copy text-ink-secondary">{n}</li>)}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function CoverageGroups({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="coverage-h" className="band shell">
      <div className="grid gap-band-gap">
        <div className="grid max-w-measure-editorial gap-4">
          <p className="eyebrow">Coverage</p>
          <h2 id="coverage-h" className="display-type text-display-l text-ink">One review, the whole market.</h2>
          <p className="font-text text-lede text-ink-secondary">Every line we write, in four groups. The analysis compares what you have against the carriers we represent, line by line.</p>
        </div>
        {/* Hairline-ruled cells, not cards: no shadow, no fill. Every link here is an indexed page and stays visible. */}
        <ul className="grid sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
          {GROUPS.map((g) => {
            const { headline } = groupProducts(products, g.key);
            return (
              <li key={g.key} className="grid content-start gap-3 border-t border-border pb-6 pt-6">
                <h3 className="font-text text-subhead text-ink">{g.name}</h3>
                <ul className="grid">
                  {headline.map((p) => <li key={p.id}><Link href={productPath(p)} className="ui-link min-h-11 font-text text-copy text-ink">{p.name}</Link></li>)}
                </ul>
                <Link href={`/insurance/#g-${g.category}`} className="ui-link min-h-11 font-text text-copy font-semibold text-brand">
                  All {g.category.toLowerCase()} lines
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
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
    <section aria-labelledby="events-h" className="band shell">
      <div className="grid gap-band-gap md:grid-cols-12">
        <div className="grid content-start gap-4 md:col-span-5">
          <p className="eyebrow">When to review</p>
          <h2 id="events-h" className="display-type text-display-l text-ink">Coverage should keep up with your life.</h2>
          <p className="max-w-measure-editorial font-text text-copy text-ink-secondary">A policy review checks that what you carry still matches what you own and owe. We recommend one at each of these moments; it takes twenty minutes and costs nothing.</p>
          <Link href="/quote/" className={`${primary} w-fit`}>{CTA}</Link>
        </div>
        <ol className="grid md:col-span-7">
          {EVENTS.map(([t, b], i) => (
            <Reveal as="li" key={t} index={i} className="grid gap-x-8 gap-y-1 border-t border-border py-6 sm:grid-cols-[3rem_1fr]">
              <span aria-hidden className="figure-mono text-label leading-normal text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              <div className="grid max-w-measure-editorial gap-1">
                <h3 className="font-text text-subhead text-ink">{t}</h3>
                <p className="font-text text-copy text-ink-secondary">{b}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
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
  // The one inverse band on the page. Punctuation, not a theme.
  return (
    <section aria-labelledby="faq-h" data-inverse className="bg-surface-inverse text-ink-inverse">
      <div className="band shell grid gap-band-gap md:grid-cols-12">
        <div className="grid content-start gap-4 md:col-span-4">
          <p className="eyebrow text-ink-inverse-secondary">Questions</p>
          <h2 id="faq-h" className="display-type text-display-l text-ink-inverse">Asked and answered.</h2>
        </div>
        <div className="md:col-span-8">
          <Accordion
            name="home-faq"
            tone="inverse"
            openFirst
            items={items.map((f) => ({ id: f.id, question: f.question, answer: <><RichText value={f.answer} className="" /><p className="mt-3 font-text text-copy"><Link href={productPath(f.product)} className="ui-link min-h-11 text-ink-inverse">More about {f.product.name.toLowerCase()}</Link></p></> }))}
          />
        </div>
      </div>
    </section>
  );
}

/** Renders only with written consent on file (SiteSettings.testimonialConsentConfirmed); verify:compliance asserts it. */
export function Testimonials({ site }: { site: SiteSetting }) {
  const items = (site.testimonials ?? []).filter((t) => t.quote && t.name && t.consentDate);
  if (!site.testimonialConsentConfirmed || !items.length) return null;
  return (
    <section aria-labelledby="people-h" className="band shell" data-testimonial>
      <div className="grid gap-band-gap">
        <div className="grid gap-4">
          <p className="eyebrow">In their words</p>
          <h2 id="people-h" className="display-type text-display-l text-ink">What people tell us.</h2>
        </div>
        <ul className="grid md:grid-cols-3 md:gap-x-10">
          {items.map((t, i) => (
            <Reveal as="li" key={t.id ?? t.name} index={i} className="border-t border-border py-6">
              <figure className="grid h-full content-between gap-5">
                <blockquote className="display-type max-w-measure-editorial text-display-m text-ink">{t.quote}</blockquote>
                <figcaption className="font-text text-meta text-ink-secondary">{t.name}<span className="eyebrow mt-1 block">Quoted with written consent, {new Date(t.consentDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const CERTS = [
  { key: "coc-certificate-py2025", alt: "Circle of Champions certificate for plan year 2025, issued by UnitedHealthcare to Daniel Ellis", caption: "The certificate" },
  { key: "coc-appreciation-letter-py2025", alt: "Letter of appreciation for plan year 2025 from UnitedHealthcare to Daniel Ellis, thanking him for his work with Medicare clients", caption: "The appreciation letter" },
] as const;

export function Recognition() {
  return (
    <section aria-labelledby="recognition-h" className="band shell">
      <div className="grid gap-band-gap md:grid-cols-12">
        <div className="grid content-start gap-4 md:col-span-5">
          <p className="eyebrow">Recognition</p>
          <h2 id="recognition-h" className="display-type text-display-l text-ink">Circle of Champions, plan year 2025.</h2>
          <p className="max-w-measure-editorial font-text text-copy text-ink-secondary">Awarded to Daniel Ellis, principal advisor, by UnitedHealthcare for excellence in serving Medicare clients, plan year 2025. It is a personal recognition of a named producer for one plan year, and it is dated.</p>
        </div>
        <ul className="grid gap-8 md:col-span-7 sm:grid-cols-2">
          {CERTS.map((c, i) => {
            const m = certificates[c.key];
            return (
              <Reveal as="li" key={c.key} index={i}>
                <figure className="grid gap-3">
                  <picture>
                    {m.sources.map((s) => <source key={s.type} type={s.type} srcSet={s.srcset} sizes="(min-width: 768px) 33vw, 100vw" />)}
                    <img src={m.fallback} alt={c.alt} width={m.width} height={m.height} loading="lazy" decoding="async" className="w-full border border-border bg-surface-raised" />
                  </picture>
                  <figcaption className="eyebrow">{c.caption}, plan year 2025</figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ClosingBand({ site }: { site: SiteSetting }) {
  // The page exhaling: one heading, one line, two actions, and as much air as the rhythm allows.
  return (
    <section aria-labelledby="closing-h" className="cta-band band shell border-t border-border" data-no-print>
      <div className="grid justify-items-center gap-8 text-center">
        <h2 id="closing-h" className="display-type max-w-measure-editorial text-display-l text-ink">Twenty minutes. Your numbers. No obligation.</h2>
        <p className="max-w-measure-editorial font-text text-lede text-ink-secondary">If keeping what you have is the right answer, that is the answer we give.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/quote/" className={primary}>{CTA}</Link>
          {site.phoneHref ? <a href={site.phoneHref} className={`${secondary} tabular`}><IconPhone />{site.phone}</a> : null}
        </div>
      </div>
    </section>
  );
}
