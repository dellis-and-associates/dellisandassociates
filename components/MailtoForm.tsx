"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Composes an email to the office from the submitted fields.
 * Swap the submit handler for a form service or API route when one is wired up.
 */
export default function MailtoForm({
  subject,
  submitLabel,
  children,
}: {
  subject: string;
  submitLabel: string;
  children: ReactNode;
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines: string[] = [];
    data.forEach((value, key) => {
      if (String(value).trim() !== "") lines.push(`${key}: ${value}`);
    });
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      {children}
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg">
          {submitLabel}
        </Button>
        <span className="text-[13px] text-stone">
          Or call us directly at{" "}
          <a href={site.phoneHref} className="font-medium text-ink">
            {site.phone}
          </a>
        </span>
      </div>
      {sent && (
        <p className="mt-3.5 text-sm text-evergreen">
          Your email draft has been opened — press send in your mail app and
          we&rsquo;ll be in touch.
        </p>
      )}
    </form>
  );
}
