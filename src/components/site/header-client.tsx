"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { IconClose, IconSearch } from "../ui/icons.tsx";

/**
 * Progressive enhancement for the shell. Without JavaScript the header is
 * complete: <details> menus, a <details> drawer and a search link. With it:
 *  - the header compresses from 64 to 56 px after the page scrolls;
 *  - only one desktop menu is open at a time, Escape and an outside click close it;
 *  - the phone drawer locks body scroll, traps focus, closes on Escape and on
 *    route change;
 *  - the search link becomes a modal <dialog> (⌘K / Ctrl-K), focus-trapped by
 *    the platform, closed by Escape.
 */
export function HeaderBehaviour() {
  const pathname = usePathname();
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-shell-header]");
    if (!header) return;
    const onScroll = () => header.setAttribute("data-compact", window.scrollY > 24 ? "true" : "false");
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const menus = [...header.querySelectorAll<HTMLDetailsElement>("details[data-menu]")];
    const drawer = header.querySelector<HTMLDetailsElement>("details[data-drawer]");
    const closeMenus = (except?: HTMLDetailsElement) => menus.forEach((m) => { if (m !== except) m.open = false; });
    const onToggle = (e: Event) => { const d = e.currentTarget as HTMLDetailsElement; if (d.open) closeMenus(d); };
    menus.forEach((m) => m.addEventListener("toggle", onToggle));
    const onDoc = (e: MouseEvent) => { if (!header.contains(e.target as Node)) closeMenus(); };
    document.addEventListener("click", onDoc);
    const syncDrawer = () => {
      const open = Boolean(drawer?.open);
      document.documentElement.toggleAttribute("data-drawer-open", open);
      if (open) drawer?.querySelector<HTMLElement>("a, button")?.focus();
    };
    drawer?.addEventListener("toggle", syncDrawer);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeMenus(); if (drawer?.open) { drawer.open = false; drawer.querySelector("summary")?.focus(); } }
      if (e.key === "Tab" && drawer?.open) {
        const f = [...drawer.querySelectorAll<HTMLElement>("summary, a[href], button:not([disabled]), input")].filter((el) => el.offsetParent !== null);
        const first = f[0], last = f[f.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      menus.forEach((m) => m.removeEventListener("toggle", onToggle));
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
      drawer?.removeEventListener("toggle", syncDrawer);
      document.documentElement.removeAttribute("data-drawer-open");
    };
  }, []);
  // Route change closes anything open.
  useEffect(() => {
    document.querySelectorAll<HTMLDetailsElement>("[data-shell-header] details").forEach((d) => { d.open = false; });
    document.documentElement.removeAttribute("data-drawer-open");
  }, [pathname]);
  return null;
}

/** Search: a link to /search/ that JavaScript upgrades to a modal dialog with the same form. */
export function SearchDialog({ quickLinks }: { quickLinks: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => {
    const d = ref.current;
    if (d && typeof d.showModal === "function" && !d.open) { d.showModal(); d.querySelector<HTMLInputElement>("input")?.focus(); return true; }
    return false;
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <Link
        href="/search/"
        className="ui-link inline-flex min-h-11 min-w-11 items-center justify-center rounded-control text-ink hover:bg-surface-sunken"
        aria-label="Search"
        aria-haspopup="dialog"
        onClick={(e) => { if (open()) e.preventDefault(); }}
      >
        <IconSearch />
      </Link>
      <dialog ref={ref} className="search-dialog m-auto max-w-measure-body rounded-surface border border-border bg-surface-raised p-0 text-ink shadow-3 backdrop:bg-surface-inverse/60" aria-labelledby="search-dialog-title" onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}>
        <form action="/search/" method="get" role="search" className="grid gap-4 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 id="search-dialog-title" className="font-sans text-title-sm">Search</h2>
            <button type="button" onClick={() => ref.current?.close()} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control border border-border-strong text-ink" aria-label="Close search"><IconClose /></button>
          </div>
          <label htmlFor="dialog-q" className="font-sans text-small font-semibold">Products, places and glossary terms</label>
          <div className="flex gap-2">
            <input id="dialog-q" name="q" type="search" autoComplete="off" className="min-h-11 flex-1 rounded-control border border-border-strong bg-surface-raised px-3 font-sans text-body" placeholder="auto, Chandler, deductible" />
            <button className="min-h-11 rounded-control bg-brand px-5 font-sans text-small font-semibold text-brand-ink">Search</button>
          </div>
          <div className="grid gap-2 font-sans text-small text-ink-muted">
            <p>Or go straight to</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">{quickLinks}</div>
          </div>
        </form>
      </dialog>
    </>
  );
}
