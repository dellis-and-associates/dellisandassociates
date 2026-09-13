import Link from "next/link";
import { getCompliance, getProducts, getSiteSettings, getStates } from "../../lib/content.ts";
import { productPath, statePath } from "../../lib/routes.ts";
import { Mark } from "../ui/logo.tsx";

/** Footer on surface-inverse: lines, states, resources, legal; then the licensing and compliance lines in caption size, never hidden. */
export async function Footer({ medicare = false }: { medicare?: boolean }) {
  const [site, compliance, products, states] = await Promise.all([getSiteSettings(), getCompliance(), getProducts(), getStates()]);
  const col = "grid content-start gap-2 font-sans text-small";
  const link = "ui-link text-ink-inverse hover:underline";
  const lines = products.filter((p) => p.tier === "1");
  return (
    <footer className="mt-16 bg-surface-inverse text-ink-inverse print:hidden">
      <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="grid content-start gap-4">
          <Mark className="h-10 w-auto text-ink-inverse" />
          <p className="font-sans text-small">{site.name}{site.legalName && !site.legalName.includes("{{TODO") ? <span className="block text-ink-inverse">{site.legalName}</span> : null}</p>
          {site.phoneHref ? <a href={site.phoneHref} className={`${link} tabular`} data-contact>{site.phone}</a> : null}
          {site.email ? <a href={`mailto:${site.email}`} className={`${link} break-all`}>{site.email}</a> : null}
          <Link href="/contact/" className={link}>Contact</Link>
        </div>
        <nav aria-label="Insurance lines" className={col}>
          <h2 className="kicker text-ink-inverse">Insurance</h2>
          {lines.map((p) => <Link key={p.id} href={productPath(p)} className={link}>{p.name}</Link>)}
          <Link href="/insurance/" className={`${link} font-semibold`}>All lines</Link>
        </nav>
        <nav aria-label="States" className={col}>
          <h2 className="kicker text-ink-inverse">Where we are licensed</h2>
          {states.map((s) => <Link key={s.id} href={statePath(s)} className={link}>{s.name}</Link>)}
          <Link href="/locations/" className={`${link} font-semibold`}>Every city</Link>
        </nav>
        <nav aria-label="Resources and legal" className={col}>
          <h2 className="kicker text-ink-inverse">Resources</h2>
          <Link href="/resources/" className={link}>Guides</Link>
          <Link href="/resources/glossary/" className={link}>Glossary</Link>
          <Link href="/claims/" className={link}>Claims</Link>
          <Link href="/billing/" className={link}>Billing</Link>
          <Link href="/partners/" className={link}>Partners</Link>
          <Link href="/legal/privacy-policy/" className={link}>Privacy</Link>
          <Link href="/legal/terms-of-use/" className={link}>Terms</Link>
          <Link href="/legal/accessibility/" className={link}>Accessibility</Link>
          <Link href="/legal/do-not-sell-my-info/" className={link}>Do not sell or share my info</Link>
          <Link href="/sitemap/" className={link}>Site map</Link>
        </nav>
      </div>
      <div className="border-t border-ink-muted">
        <div className="mx-auto grid max-w-measure-page gap-3 px-4 py-6 font-sans text-caption text-ink-inverse md:px-8">
          <p data-disclosure="independentAgency">{compliance.independentAgencyDisclosure}</p>
          {medicare && compliance.medicareInScope ? <p data-disclosure="medicareTpmo">{compliance.medicareTpmoDisclaimer}</p> : null}
          <p>Licensed in {states.map((s) => s.name).join(", ")}. License numbers are listed on each state&rsquo;s licensing disclosure page.</p>
          <p>© {new Date().getFullYear()} {site.name}. {site.social?.facebook ? <a href={site.social.facebook} className={link} rel="noopener">Facebook</a> : null} {site.social?.instagram ? <> · <a href={site.social.instagram} className={link} rel="noopener">Instagram</a></> : null}</p>
        </div>
      </div>
    </footer>
  );
}
