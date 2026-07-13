"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Monogram, Wordmark } from "./Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { agentLinks, services, site, type NavLink } from "@/lib/site";

function DesktopDropdown({
  label,
  links,
}: {
  label: string;
  links: NavLink[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-stone outline-none hover:text-ink aria-expanded:text-ink">
        {label}
        <ChevronDown className="size-3.5" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[230px]">
        {links.map((l) => (
          <DropdownMenuItem key={l.href} asChild>
            <Link href={l.href}>{l.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const mobileLink =
    "block border-b border-border py-3 text-[15px] text-slate hover:text-ink";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container-site flex items-center justify-between gap-6 py-3.5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Monogram />
          <Wordmark compact />
        </Link>

        <nav aria-label="Main" className="hidden min-[861px]:block">
          <ul className="flex items-center gap-5.5">
            <li>
              <DesktopDropdown label="Coverage" links={services} />
            </li>
            <li>
              <Link href="/about-us" className="text-sm text-stone hover:text-ink">
                About
              </Link>
            </li>
            <li>
              <Link href="/work-with-us" className="text-sm text-stone hover:text-ink">
                Work with us
              </Link>
            </li>
            <li>
              <Link href="/resources" className="text-sm text-stone hover:text-ink">
                Resources
              </Link>
            </li>
            <li>
              <DesktopDropdown label="For agents" links={agentLinks} />
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3.5">
          <a
            href={site.phoneHref}
            className="whitespace-nowrap text-sm font-medium text-slate hover:text-ink max-[560px]:hidden"
          >
            {site.phone}
          </a>
          <Button asChild>
            <Link href="/contact-us">Book a review</Link>
          </Button>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className="min-[861px]:hidden"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto bg-background">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5">
                  <Monogram size={22} />
                  <Wordmark />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-4 pb-8">
                <p className="eyebrow mb-1 mt-2">Coverage</p>
                {services.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={mobileLink}
                    onClick={() => setSheetOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <p className="eyebrow mb-1 mt-6">Company</p>
                {[
                  { label: "About", href: "/about-us" },
                  { label: "Work with us", href: "/work-with-us" },
                  { label: "Resources", href: "/resources" },
                  { label: "Contact", href: "/contact-us" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={mobileLink}
                    onClick={() => setSheetOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <p className="eyebrow mb-1 mt-6">For agents</p>
                {agentLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={mobileLink}
                    onClick={() => setSheetOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <Button asChild size="lg" className="mt-7 w-full">
                  <Link href="/contact-us" onClick={() => setSheetOpen(false)}>
                    Book a policy review
                  </Link>
                </Button>
                <a
                  href={site.phoneHref}
                  className="mt-4 block text-center text-sm font-medium text-slate"
                >
                  Call {site.phone}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
