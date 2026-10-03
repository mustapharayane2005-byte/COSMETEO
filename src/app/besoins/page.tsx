import type { Metadata } from "next";
import BesoinCard from "@/components/BesoinCard";
import { BesoinsHeader } from "@/components/BesoinsBlock";
import PageShell from "@/components/PageShell";
import { besoins } from "@/data/besoins";

export const metadata: Metadata = { title: "Que recherchez-vous ?" };

export default function BesoinsPage() {
  return (
    <PageShell>
      <section className="container max-w-[1200px] py-14 lg:py-[72px]" aria-labelledby="besoins-title">
        <BesoinsHeader h="h1" showLink={false} />
        <ul data-reveal-stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {besoins.map((b) => (
            <li key={b.slug}>
              <BesoinCard besoin={b} />
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
