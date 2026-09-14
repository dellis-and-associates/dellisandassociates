/** One set: 24-unit grid, 2 px stroke, round caps and joins, currentColor. Decorative unless a label is given. */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { label?: string; size?: 16 | 20 | 22 | 24 };
const base = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });
const wrap = (label?: string) => (label ? { role: "img", "aria-label": label } : { "aria-hidden": true, focusable: false });

export const IconCheckCircle = ({ label, size = 22, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 4.5-5" /></svg>);
export const IconTriangle = ({ label, size = 22, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><path d="M12 4 21 20H3z" /><path d="M12 10v4M12 17.5v.5" /></svg>);
export const IconCrossCircle = ({ label, size = 22, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></svg>);
export const IconPhone = ({ label, size = 20, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>);
export const IconSearch = ({ label, size = 20, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
export const IconChevron = ({ label, size = 20, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><path d="m6 9 6 6 6-6" /></svg>);
export const IconMenu = ({ label, size = 24, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const IconClose = ({ label, size = 24, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const IconInfo = ({ label, size = 20, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.5" /></svg>);
export const IconPrint = ({ label, size = 20, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><path d="M7 8V4h10v4M7 16H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" /><rect x="7" y="13" width="10" height="7" /></svg>);
export const IconCopy = ({ label, size = 20, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><rect x="9" y="9" width="11" height="11" rx="1" /><path d="M5 15V5a1 1 0 0 1 1-1h10" /></svg>);
export const IconFacebook = ({ label, size = 20, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><path d="M14 8h2V4h-2.5A3.5 3.5 0 0 0 10 7.5V10H8v4h2v6h4v-6h2.5l.5-4h-3V8.5a.5.5 0 0 1 .5-.5Z" /></svg>);
export const IconInstagram = ({ label, size = 20, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><path d="M17 7v.5" /></svg>);
export const IconArrowRight = ({ label, size = 20, ...p }: IconProps) => (<svg {...base(size)} {...wrap(label)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
