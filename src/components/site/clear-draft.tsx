"use client";
import { useEffect } from "react";
/** The quote was sent: forget the client-side drafts. */
export function ClearDraft() {
  useEffect(() => { try { for (const k of Object.keys(sessionStorage)) if (k.startsWith("dp_quote_draft_")) sessionStorage.removeItem(k); } catch { /* ignore */ } }, []);
  return null;
}
