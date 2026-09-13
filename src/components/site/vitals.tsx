"use client";
import { useEffect } from "react";
import { publicEnv } from "@/src/env.public";

/**
 * Real-user Core Web Vitals to our own endpoint (/api/rum). Loads web-vitals
 * lazily after the page is idle so it never competes with the LCP element,
 * and sends with sendBeacon. Off entirely when RUM is not configured.
 */
export function Vitals() {
  useEffect(() => {
    if (!publicEnv.RUM_ENABLED) return;
    const run = () =>
      import("web-vitals").then(({ onCLS, onINP, onLCP, onTTFB }) => {
        const send = (m: { name: string; value: number; id: string; rating: string; navigationType?: string }) => {
          const body = JSON.stringify({ name: m.name, value: m.value, id: m.id, rating: m.rating, path: location.pathname, nav: m.navigationType, ua: navigator.userAgent.slice(0, 120) });
          if (navigator.sendBeacon) navigator.sendBeacon("/api/rum", body);
          else fetch("/api/rum", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
        };
        onCLS(send);
        onINP(send);
        onLCP(send);
        onTTFB(send);
      });
    if ("requestIdleCallback" in window) (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(run);
    else setTimeout(run, 2000);
  }, []);
  return null;
}
