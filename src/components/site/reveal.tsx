"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll entrance: opacity and a 12px rise, once, the first time the element
 * comes into view. Siblings stagger by --reveal-index, capped at five, because
 * past that a stagger reads as slow rather than considered.
 *
 * The CSS that hides it is gated on [data-js] (set in document.tsx) and on
 * prefers-reduced-motion: no-preference, so a page without JavaScript and a
 * reader who asked for less motion both get the final state immediately, with
 * no layout difference. If hydration never happens the head script's failsafe
 * drops the flag and the content appears anyway — nothing here can leave copy
 * permanently invisible.
 */
export function Reveal({ children, index = 0, as: Tag = "div", className = "" }: { children: ReactNode; index?: number; as?: "div" | "li" | "section"; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    document.documentElement.dataset.revealReady = "1";
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.dataset.revealed = ""; return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).dataset.revealed = ""; io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -12% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} className={`reveal ${className}`} style={{ "--reveal-index": Math.min(index, 4) } as CSSProperties}>
      {children}
    </Tag>
  );
}
