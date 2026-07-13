import type { Metadata } from "next";
import MailtoForm from "@/components/MailtoForm";
import { PageHero, Section } from "@/components/Sections";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Book a policy review with a licensed advisor. Twenty minutes, your numbers, no obligation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Twenty minutes. Your numbers. No obligation."
        lede="Book a policy review and one of our licensed agents will be in contact to provide a comprehensive analysis of yours and your family's needs — there is never a fee for our service."
      />
      <Section>
        <div className="grid grid-cols-1 items-start gap-12 min-[961px]:grid-cols-[2fr_1fr]">
          <Card className="max-w-[720px] gap-0 p-9 text-base">
            <h2 className="heading-4 mb-6">Book a policy review</h2>
            <MailtoForm subject="Policy review request" submitLabel="Book a policy review">
              <div className="grid grid-cols-1 gap-4.5 min-[681px]:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="c-name">
                    Full name <span className="text-brick">*</span>
                  </Label>
                  <Input id="c-name" name="Name" type="text" required />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="c-phone">
                    Phone <span className="text-brick">*</span>
                  </Label>
                  <Input id="c-phone" name="Phone" type="tel" required />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="c-email">Email</Label>
                  <Input id="c-email" name="Email" type="email" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="c-interest">I&rsquo;m interested in</Label>
                  <Select name="Interest" defaultValue="A full policy review">
                    <SelectTrigger id="c-interest" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A full policy review">
                        A full policy review
                      </SelectItem>
                      {services.map((s) => (
                        <SelectItem key={s.href} value={s.label}>
                          {s.label}
                        </SelectItem>
                      ))}
                      <SelectItem value="Working as an agent">
                        Working as an agent
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5 min-[681px]:col-span-2">
                  <Label htmlFor="c-msg">Anything we should know?</Label>
                  <Textarea id="c-msg" name="Message" rows={5} />
                </div>
              </div>
            </MailtoForm>
          </Card>

          <div>
            <h2 className="mb-4.5 text-xs font-semibold uppercase tracking-[0.14em] text-stone">
              Reach us directly
            </h2>
            <ul>
              <li className="flex items-baseline gap-3.5 border-b border-border py-3.5 text-[15px]">
                <span className="min-w-[64px] text-xs font-semibold uppercase tracking-[0.1em] text-stone">
                  Phone
                </span>
                <a href={site.phoneHref} className="font-medium hover:text-copper">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-baseline gap-3.5 border-b border-border py-3.5 text-[15px]">
                <span className="min-w-[64px] text-xs font-semibold uppercase tracking-[0.1em] text-stone">
                  Email
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium break-all hover:text-copper"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-baseline gap-3.5 border-b border-border py-3.5 text-[15px]">
                <span className="min-w-[64px] text-xs font-semibold uppercase tracking-[0.1em] text-stone">
                  Social
                </span>
                <span className="flex gap-3.5">
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-copper"
                  >
                    Facebook
                  </a>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-copper"
                  >
                    Instagram
                  </a>
                </span>
              </li>
            </ul>
            <p className="mt-4.5 text-[13px] leading-relaxed text-stone">
              Independent&ensp;·&ensp;Licensed in UT + 12 states&ensp;·&ensp;No
              fee for advisory
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
