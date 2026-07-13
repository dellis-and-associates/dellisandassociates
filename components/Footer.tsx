import Link from "next/link";
import { Monogram, Wordmark } from "./Logo";
import { agentLinks, medicareDisclaimer, services, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 bg-evergreen text-sage-light">
      <div className="container-site grid grid-cols-1 gap-12 py-16 min-[681px]:grid-cols-2 min-[961px]:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Monogram color="#F7F5F0" />
            <Wordmark reversed />
          </div>
          <p className="mt-4 max-w-[300px] text-sm leading-relaxed">
            Independent insurance advisory. Licensed advisors compare the
            market across life, Medicare, health, and annuities — the analysis
            costs you nothing.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-sage">
            Contact us
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={site.phoneHref} className="hover:text-bone">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-bone">
                {site.email}
              </a>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-bone">
                Book a policy review
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-sage">
            Coverage
          </h4>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="hover:text-bone">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-sage">
            For agents
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/work-with-us" className="hover:text-bone">
                Work with us
              </Link>
            </li>
            {agentLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-bone">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/resources" className="hover:text-bone">
                Client resources
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site pb-7 text-xs leading-relaxed text-sage">
        {medicareDisclaimer}
      </div>

      <div className="border-t border-bone/15">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 py-5 text-[13px] text-sage">
          <span>Copyright © 2026 {site.name}</span>
          <div className="flex gap-4">
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bone"
            >
              Facebook
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bone"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
