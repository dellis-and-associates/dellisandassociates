import type { ReactNode } from "react";
import { IconCheckCircle, IconCrossCircle, IconInfo, IconTriangle } from "./icons.tsx";

export type CalloutKind = "positive" | "notice" | "critical" | "info";
const STYLE: Record<CalloutKind, { box: string; icon: ReactNode; word: string }> = {
  positive: { box: "border-positive-border bg-positive-surface text-positive-ink", icon: <IconCheckCircle className="text-positive" />, word: "Good." },
  notice: { box: "border-notice-border bg-notice-surface text-notice-ink", icon: <IconTriangle className="text-notice" />, word: "Worth a look." },
  critical: { box: "border-critical-border bg-critical-surface text-critical-ink", icon: <IconCrossCircle className="text-critical" />, word: "Gap." },
  info: { box: "border-border bg-surface-sunken text-ink", icon: <IconInfo className="text-ink-muted" />, word: "Note." },
};

/** Status is never colour alone: icon + a leading word, always. */
export function Callout({ kind = "info", lead, children, className = "" }: { kind?: CalloutKind; lead?: string; children: ReactNode; className?: string }) {
  const s = STYLE[kind];
  return (
    <div role={kind === "critical" ? "alert" : undefined} className={`flex gap-3 rounded-surface border border-l-4 p-4 ${s.box} ${className}`}>
      <span className="mt-0.5 shrink-0">{s.icon}</span>
      <div className="font-text text-copy">
        <strong className="font-semibold">{lead ?? s.word}</strong> {children}
      </div>
    </div>
  );
}
