import Link from "next/link";
import { PageHero, CtaBand, Section } from "./Sections";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Agent-only pages are gated. Authentication was handled by the old
 * WordPress install; wire this form to your auth provider of choice.
 */
export default function LoginGate({ area }: { area: string }) {
  return (
    <>
      <PageHero
        eyebrow="For agents"
        title={area}
        lede="You must be logged in to see this content. Agent accounts are provisioned by the office."
      />
      <Section bordered={false}>
        <Card className="max-w-[440px] gap-0 p-9 text-base">
          <h2 className="heading-4 mb-6">Agent login</h2>
          <form>
            <div className="space-y-4.5">
              <div className="grid gap-1.5">
                <Label htmlFor="login-user">Username or e-mail</Label>
                <Input
                  id="login-user"
                  name="Username"
                  type="text"
                  autoComplete="username"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="login-pass">Password</Label>
                <Input
                  id="login-pass"
                  name="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <Label className="flex items-center gap-2.5 text-[15px] font-normal text-slate">
                <Checkbox name="remember" />
                Keep me signed in
              </Label>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button type="submit" size="lg">
                Log in
              </Button>
              <a href="#" className="text-sm font-medium text-copper hover:underline">
                Forgot your password?
              </a>
            </div>
          </form>
          <p className="mt-6 border-t border-border pt-4.5 text-[13px] text-stone">
            Interested in joining the team?{" "}
            <Link href="/work-with-us" className="font-medium text-copper hover:underline">
              Work with us
            </Link>
          </p>
        </Card>
      </Section>
      <CtaBand
        title="Thinking about a career in insurance?"
        body="New and experienced agents get access to top carriers, competitive compensation, and industry-leading training."
        cta="Join the team"
        href="/work-with-us"
      />
    </>
  );
}
