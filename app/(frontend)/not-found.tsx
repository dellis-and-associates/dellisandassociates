import Link from "next/link";
import { PageHero } from "@/components/Sections";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="That page isn't on the books."
        lede="The page you're looking for may have moved during the rebrand."
      />
      <section className="py-22">
        <div className="container-site flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/insurance-services">Browse coverage</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
