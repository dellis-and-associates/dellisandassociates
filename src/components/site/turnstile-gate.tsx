"use client";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Holds a form's submit button until Turnstile has answered.
 *
 * Two things this must not do. It must not disable the button for a visitor without JavaScript — the form
 * is a native POST for them and the server already accepts a lead with no token, flagged for review, because
 * a lost lead costs more than a reviewed one (src/lib/turnstile.ts). And it must not strand a visitor whose
 * browser never reaches Cloudflare: a blocked script or an outage would otherwise leave the button dead with
 * nothing to click.
 *
 * So the gate closes only after mount, which is the moment JavaScript is known to be running, and opens again
 * on its own if the widget has not answered within the grace period. `waiting` is false in the server render
 * and in the first client render, so hydration matches.
 */
const GRACE_MS = 8000;

declare global {
  interface Window {
    dpTurnstileSolved?: () => void;
    dpTurnstileExpired?: () => void;
  }
}

/** False while rendering on the server and through hydration, true once the client is live. */
const subscribe = () => () => {};
const useHydrated = () => useSyncExternalStore(subscribe, () => true, () => false);

export function useTurnstileGate(siteKey?: string): { waiting: boolean } {
  const [solved, setSolved] = useState(false);
  const [graceOver, setGraceOver] = useState(false);
  const scriptRunning = useHydrated();

  useEffect(() => {
    if (!siteKey) return;
    // The callbacks are the fast path, but they are not enough on their own: Turnstile can solve before React
    // hydrates — it routinely does with an auto-pass key — and a callback fired then lands on a global that does
    // not exist yet. So the token field is polled as well, which catches a solve from either side of hydration.
    window.dpTurnstileSolved = () => setSolved(true);
    window.dpTurnstileExpired = () => setSolved(false);
    const token = () => (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value;
    if (token()) setSolved(true);
    const poll = setInterval(() => { if (token()) { setSolved(true); clearInterval(poll); } }, 250);
    const grace = setTimeout(() => setGraceOver(true), GRACE_MS);
    return () => {
      clearInterval(poll);
      clearTimeout(grace);
      delete window.dpTurnstileSolved;
      delete window.dpTurnstileExpired;
    };
  }, [siteKey]);

  return { waiting: Boolean(siteKey) && scriptRunning && !solved && !graceOver };
}

/** The line that says why the button is not available yet. Rendered only while the gate is closed. */
export function TurnstileWaiting() {
  return (
    <p role="status" className="font-text text-meta text-ink-secondary">
      Finishing the bot check…
    </p>
  );
}
