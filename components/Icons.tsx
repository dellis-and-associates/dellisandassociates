import type { ReactNode } from "react";

/* Rule & Weight icon set — 1.75 stroke, square caps, miter joins, evergreen. */

function Icon({
  children,
  size = 26,
  label,
}: {
  children: ReactNode;
  size?: number;
  label?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1B3B33"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}

/** The canopy — concentric coverage arcs sheltering a dot. Life / household. */
export function CanopyIcon({ size }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M8 16 A4 4 0 0 1 16 16" />
      <path d="M5.25 16 A6.75 6.75 0 0 1 18.75 16" />
      <path d="M2.5 16 A9.5 9.5 0 0 1 21.5 16" />
      <circle cx="12" cy="18.75" r="1.75" fill="#1B3B33" stroke="none" />
    </Icon>
  );
}

/** The staircase — ascending income steps. Annuities / income. */
export function StaircaseIcon({ size }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M3.5 20.5 H8 V16 H12.5 V11.5 H17 V7 H19.5" />
      <path d="M3.5 20.5 V17.5" />
      <circle cx="20.5" cy="7" r="1.75" fill="#1B3B33" stroke="none" />
    </Icon>
  );
}

/** The review — a policy document with a check. Policy analysis. */
export function ReviewIcon({ size }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M6.5 3 H14.5 L19 7.5 V21 H6.5 Z" />
      <path d="M14.5 3 V7.5 H19" />
      <path d="M9.5 11.5 H15.5" />
      <path d="M9.5 16.25 L11.25 18 L14.75 14.5" />
    </Icon>
  );
}

/** Calendar with a level line — term coverage windows. */
export function TermIcon({ size }: { size?: number }) {
  return (
    <Icon size={size}>
      <rect x="3.5" y="5" width="17" height="15.5" />
      <path d="M3.5 9.5 H20.5" />
      <path d="M8 3 V6.5 M16 3 V6.5" />
      <path d="M7 14.5 H13" />
    </Icon>
  );
}

/** Index line over a baseline — IUL growth linked to an index. */
export function IndexIcon({ size }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M3.5 20.5 H20.5" />
      <path d="M4.5 15.5 L9.5 10.5 L13 14 L19 8" />
      <circle cx="19.5" cy="7.5" r="1.75" fill="#1B3B33" stroke="none" />
    </Icon>
  );
}

/** Medical cross in a card. Medicare / health. */
export function CrossIcon({ size }: { size?: number }) {
  return (
    <Icon size={size}>
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M12 8 V16 M8 12 H16" />
    </Icon>
  );
}

/** Open eye — dental & vision. */
export function EyeIcon({ size }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M2.5 12 C5 7.5 8.5 5.5 12 5.5 C15.5 5.5 19 7.5 21.5 12 C19 16.5 15.5 18.5 12 18.5 C8.5 18.5 5 16.5 2.5 12 Z" />
      <circle cx="12" cy="12" r="1.75" fill="#1B3B33" stroke="none" />
    </Icon>
  );
}

/** Two interlocked squares — working together. Recruiting / partnership. */
export function PartnerIcon({ size }: { size?: number }) {
  return (
    <Icon size={size}>
      <rect x="3.5" y="3.5" width="12" height="12" />
      <rect x="8.5" y="8.5" width="12" height="12" />
    </Icon>
  );
}
