import type { Metadata } from "next";
import MailtoForm from "@/components/MailtoForm";
import { PageHero, Section } from "@/components/Sections";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "New client intake form",
};

export default function NewClientIntakePage() {
  return (
    <>
      <PageHero
        eyebrow="Client resources"
        title="New client intake form"
        lede="A few details before your first appointment so your advisor can prepare a comprehensive analysis. Nothing here obligates you to anything."
      />
      <Section>
        <Card className="max-w-[760px] gap-0 p-9 text-base">
          <MailtoForm subject="New client intake" submitLabel="Submit intake form">
            <div className="grid grid-cols-1 gap-4.5 min-[681px]:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="n-name">
                  Full name <span className="text-brick">*</span>
                </Label>
                <Input id="n-name" name="Name" type="text" required />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="n-dob">Date of birth</Label>
                <Input id="n-dob" name="Date of birth" type="date" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="n-phone">
                  Phone <span className="text-brick">*</span>
                </Label>
                <Input id="n-phone" name="Phone" type="tel" required />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="n-email">Email</Label>
                <Input id="n-email" name="Email" type="email" />
              </div>
              <div className="grid gap-1.5 min-[681px]:col-span-2">
                <Label htmlFor="n-address">Address (city, state, ZIP)</Label>
                <Input id="n-address" name="Address" type="text" />
              </div>

              <fieldset className="mt-2 border-t border-border pt-5 min-[681px]:col-span-2">
                <legend className="eyebrow !mb-0 pr-3">
                  Coverage you&rsquo;re interested in
                </legend>
                <div className="mt-4 grid grid-cols-1 gap-2.5 min-[681px]:grid-cols-2">
                  {services.map((s) => (
                    <Label
                      key={s.href}
                      className="flex items-center gap-2.5 text-[15px] font-normal text-slate"
                    >
                      <Checkbox name={`Interested: ${s.label}`} value="yes" />
                      {s.label}
                    </Label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-2 border-t border-border pt-5 min-[681px]:col-span-2">
                <legend className="eyebrow !mb-0 pr-3">Current situation</legend>
                <div className="mt-4 grid grid-cols-1 gap-4.5 min-[681px]:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="n-household">Household size</Label>
                    <Input id="n-household" name="Household size" type="text" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="n-current">Current coverage, if any</Label>
                    <Input
                      id="n-current"
                      name="Current coverage"
                      type="text"
                      placeholder="Carrier and policy type"
                    />
                  </div>
                  <div className="grid gap-1.5 min-[681px]:col-span-2">
                    <Label htmlFor="n-notes">
                      Anything else your advisor should know?
                    </Label>
                    <Textarea id="n-notes" name="Notes" rows={4} />
                  </div>
                </div>
              </fieldset>
            </div>
          </MailtoForm>
          <p className="mt-5 border-t border-border pt-4 text-[13px] leading-relaxed text-stone">
            Your information is used only to prepare your review and is never
            sold or shared.
          </p>
        </Card>
      </Section>
    </>
  );
}
