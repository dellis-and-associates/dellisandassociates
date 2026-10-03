"use client";
import { useEffect, useRef } from "react";
import { publicEnv } from "../../env.public.ts";

/**
 * Cloudflare Turnstile above the Payload login form.
 *
 * Payload's login is its own React form and posts JSON to /api/users/login, so a hidden input rendered
 * beside it would never reach the server. The widget therefore hands the token over in a short-lived,
 * same-site cookie, which the `beforeLogin` hook on the users collection reads and verifies.
 *
 * The cookie is scoped to /api (the only path that reads it) and expires in five minutes, which is longer
 * than a sign-in takes and shorter than a token stays valid at Cloudflare.
 */
const COOKIE = "dp-admin-turnstile";

declare global {
  interface Window { turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string } }
}

export function TurnstileLogin() {
  const box = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (!publicEnv.TURNSTILE_SITE_KEY || rendered.current) return;
    const mount = () => {
      if (rendered.current || !box.current || !window.turnstile) return;
      rendered.current = true;
      window.turnstile.render(box.current, {
        sitekey: publicEnv.TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          const secure = location.protocol === "https:" ? "; secure" : "";
          document.cookie = `${COOKIE}=${encodeURIComponent(token)}; path=/api; max-age=300; samesite=strict${secure}`;
        },
        "expired-callback": () => { document.cookie = `${COOKIE}=; path=/api; max-age=0; samesite=strict`; },
      });
    };
    if (window.turnstile) { mount(); return; }
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true; s.defer = true; s.onload = mount;
    document.head.appendChild(s);
  }, []);

  if (!publicEnv.TURNSTILE_SITE_KEY) return null;
  return <div ref={box} style={{ marginBottom: "1rem" }} />;
}

export default TurnstileLogin;
