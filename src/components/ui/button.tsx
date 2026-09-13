import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "quiet" | "destructive";
const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-brand text-brand-ink hover:bg-brand-hover active:bg-brand-active",
  secondary: "bg-transparent text-ink border border-border-strong hover:bg-surface-sunken",
  quiet: "bg-transparent text-brand hover:underline underline-offset-4",
  destructive: "bg-transparent text-critical border border-critical hover:bg-critical-surface",
};
const BASE = "inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-5 font-sans text-small font-semibold no-underline transition-colors duration-(--dp-duration-fast) aria-disabled:cursor-not-allowed aria-disabled:opacity-45 disabled:cursor-not-allowed disabled:opacity-45";

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `${BASE} ${VARIANT[variant]} ${extra}`;
}

export function Button({ variant = "primary", className = "", loading, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; loading?: boolean }) {
  return (
    <button className={buttonClass(variant, className)} aria-busy={loading || undefined} aria-disabled={loading || props.disabled || undefined} {...props}>
      {loading ? <span className="inline-block size-4 animate-spin rounded-pill border-2 border-current border-r-transparent" aria-hidden /> : null}
      {children}
    </button>
  );
}

export function LinkButton({ href, variant = "primary", className = "", children, ...rest }: { href: string; variant?: ButtonVariant; className?: string; children: ReactNode } & Record<string, unknown>) {
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
    </Link>
  );
}
