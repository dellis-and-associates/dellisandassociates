import Link from "next/link";
import { getCompliance, getProducts, getSiteSettings, getStates } from "../../lib/content.ts";
import { GROUPS, groupProducts, orderStates } from "../../lib/groups.ts";
import { hasTodo } from "../../fields/index.ts";
import { statePath } from "../../lib/routes.ts";
import { IconFacebook, IconInstagram } from "../ui/icons.tsx";
import { Lockup } from "../ui/logo.tsx";

/**
 * Footer on the page surface, one step down, with the primary lockup — the same logo, in the same colours, as the
 * header (client, 2026-09-23: one logo, uniform throughout). Mono column headings, hairline dividers, links and disclosures at body size —
 * the compliance strip is legal text for an audience that skews older, so it is set to be read, not to be
 * technically present. Contact block, five
 * columns, then the compliance strip in this order: independent-agency line,
 * licensed-states line with each state's disclosure page, the Medicare TPMO
 * disclaimer on every page, the copyright, social as labelled icons. Long
 * strings wrap anywhere; nothing here is hidden behind a disclosure.
 */
export async function Footer() {
  const [site, compliance, products, allStates] = await Promise.all([getSiteSettings(), getCompliance(), getProducts(), getStates()]);
  const states = orderStates(allStates);
  const col = "grid content-start font-text text-copy";
  const head = "eyebrow mb-2";
  const link = "ui-link min-h-11 text-ink";
  // Links that sit inside a sentence keep their underline; the column lists are link-only and do not need one.
  const inline = `${link} ui-link-inline`;
  const groups = GROUPS.map((g) => ({ ...g, ...groupProducts(products, g.key) }));
  const address = site.address && [site.address.street, site.address.city, site.address.zip].some((v) => v && !hasTodo(v)) ? site.address : null;
  const year = new Date().getFullYear();
  return (
    <footer className="mt-0 border-t border-border bg-surface-sunken text-ink [overflow-wrap:anywhere] print:hidden">
      <div className="shell grid gap-8 py-14 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] lg:gap-0">
        <div className="grid content-start gap-4 md:col-span-3 lg:col-span-1">
          <Link href="/" className="ui-link w-fit py-2 text-ink no-underline" aria-label="Desert Peak Insurance, home"><Lockup height={56} lazy /></Link>
          <div className="grid font-text text-copy">
            {site.phoneHref ? <a href={site.phoneHref} className={`${link} tabular`} data-contact>{site.phone}</a> : null}
            {site.email ? <a href={`mailto:${site.email}`} className={link}>{site.email}</a> : null}
            {address ? <p className="text-ink">{[address.street, [address.city, typeof address.state === "object" ? address.state?.abbr : null].filter(Boolean).join(", "), address.zip].filter((v) => v && !hasTodo(v)).join(" · ")}</p> : null}
            <Link href="/contact/" className={link}>Contact</Link>
          </div>
        </div>
        <nav aria-label="Insurance" className={`${col} lg:border-l lg:border-border lg:pl-6`}>
          <p className={head}>Insurance</p>
          {groups.map((g) => <Link key={g.key} href={`/insurance/#g-${g.category}`} className={link}>{g.name}</Link>)}
          <Link href="/insurance/" className={`${link} font-semibold`}>All lines</Link>
        </nav>
        <nav aria-label="Licensed in" className={`${col} lg:border-l lg:border-border lg:pl-6`}>
          <p className={head}>Licensed in</p>
          {states.map((s) => <Link key={s.id} href={statePath(s)} className={link}>{s.name}</Link>)}
          <Link href="/locations/" className={`${link} font-semibold`}>Every city</Link>
        </nav>
        <nav aria-label="Resources" className={`${col} lg:border-l lg:border-border lg:pl-6`}>
          <p className={head}>Resources</p>
          <Link href="/resources/" className={link}>Guides</Link>
          <Link href="/resources/glossary/" className={link}>Glossary</Link>
          <Link href="/claims/" className={link}>Claims</Link>
          <Link href="/about/editorial-policy/" className={link}>Editorial policy</Link>
          <Link href="/billing/" className={link}>Billing</Link>
        </nav>
        <nav aria-label="For partners" className={`${col} lg:border-l lg:border-border lg:pl-6`}>
          <p className={head}>For partners</p>
          <Link href="/partners/" className={link}>Work with us</Link>
          <Link href="/partners/portal/" className={link}>Partner portal</Link>
        </nav>
        <nav aria-label="Legal" className={`${col} lg:border-l lg:border-border lg:pl-6`}>
          <p className={head}>Legal</p>
          <Link href="/legal/privacy-policy/" className={link}>Privacy</Link>
          <Link href="/legal/terms-of-use/" className={link}>Terms</Link>
          <Link href="/legal/accessibility/" className={link}>Accessibility</Link>
          <Link href="/legal/do-not-sell-my-info/" className={link}>Do not sell or share my info</Link>
          <Link href="/sitemap/" className={link}>Site map</Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="shell grid gap-3 py-8 font-text text-copy text-ink-secondary">
          <p data-disclosure="independentAgency">{compliance.independentAgencyDisclosure}</p>
          <p data-disclosure="licensedStates">
            Licensed in {states.map((s, i) => <span key={s.id}>{i > 0 ? (i === states.length - 1 ? " and " : ", ") : ""}<Link href={`/legal/licensing/${s.slug}/`} className={inline}>{s.name}</Link></span>)}. Each state&rsquo;s licensing disclosure lists the license number.
          </p>
          {compliance.medicareInScope ? <p data-disclosure="medicareTpmo" className="max-w-measure-wide">{compliance.medicareTpmoDisclaimer}</p> : null}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>© {year} {site.name}</p>
            {site.social?.facebook ? <a href={site.social.facebook} className={`${link} gap-2`} rel="noopener"><IconFacebook /> Facebook</a> : null}
            {site.social?.instagram ? <a href={site.social.instagram} className={`${link} gap-2`} rel="noopener"><IconInstagram /> Instagram</a> : null}
          </div>
        </div>
      </div>
    </footer>
  );
}

