import type { Metadata } from "next";
import MailtoForm from "@/components/MailtoForm";
import { PageHero, Section } from "@/components/Sections";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Client medication intake form",
};

const medRows = [1, 2, 3, 4, 5];

export default function MedicationIntakePage() {
  return (
    <>
      <PageHero
        eyebrow="Client resources"
        title="Client medication intake form"
        lede="Listing your current prescriptions lets us check drug coverage across Medicare Part D and Medicare Advantage plans before your appointment."
      />
      <Section>
        <Card className="max-w-[760px] gap-0 p-9 text-base">
          <MailtoForm
            subject="Client medication intake"
            submitLabel="Submit medication list"
          >
            <div className="grid grid-cols-1 gap-4.5 min-[681px]:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="m-name">
                  Full name <span className="text-brick">*</span>
                </Label>
                <Input id="m-name" name="Name" type="text" required />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="m-dob">Date of birth</Label>
                <Input id="m-dob" name="Date of birth" type="date" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="m-phone">
                  Phone <span className="text-brick">*</span>
                </Label>
                <Input id="m-phone" name="Phone" type="tel" required />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="m-pharmacy">Preferred pharmacy</Label>
                <Input id="m-pharmacy" name="Pharmacy" type="text" />
              </div>

              <fieldset className="mt-2 border-t border-border pt-5 min-[681px]:col-span-2">
                <legend className="eyebrow !mb-0 pr-3">
                  Current medications
                </legend>
                <div className="mt-4 space-y-3">
                  {medRows.map((n) => (
                    <div
                      key={n}
                      className="grid grid-cols-1 gap-3 min-[681px]:grid-cols-[2fr_1fr_1fr]"
                    >
                      <Input
                        aria-label={`Medication ${n} name`}
                        name={`Medication ${n}`}
                        type="text"
                        placeholder={`Medication ${n}`}
                      />
                      <Input
                        aria-label={`Medication ${n} dosage`}
                        name={`Medication ${n} dosage`}
                        type="text"
                        placeholder="Dosage"
                      />
                      <Input
                        aria-label={`Medication ${n} frequency`}
                        name={`Medication ${n} frequency`}
                        type="text"
                        placeholder="Frequency"
                      />
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-1.5 min-[681px]:col-span-2">
                <Label htmlFor="m-allergies">Known drug allergies</Label>
                <Input id="m-allergies" name="Allergies" type="text" />
              </div>
              <div className="grid gap-1.5 min-[681px]:col-span-2">
                <Label htmlFor="m-notes">Notes for your advisor</Label>
                <Textarea id="m-notes" name="Notes" rows={4} />
              </div>
            </div>
          </MailtoForm>
          <p className="mt-5 border-t border-border pt-4 text-[13px] leading-relaxed text-stone">
            Your health information is used only to check plan coverage and is
            never sold or shared.
          </p>
        </Card>
      </Section>
    </>
  );
}
