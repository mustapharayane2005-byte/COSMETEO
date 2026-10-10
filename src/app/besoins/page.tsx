import type { Metadata } from "next";
import BesoinCard from "@/components/BesoinCard";
import { BesoinsHeader } from "@/components/BesoinsBlock";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";
import { besoinsAvecProduits } from "@/data/products";

export const metadata: Metadata = { title: "Que recherchez-vous ?" };

export default function BesoinsPage() {
  return (
    <PageShell>
      <section className="container max-w-[1200px] py-14 lg:py-[72px]" aria-labelledby="besoins-title">
        <BesoinsHeader h="h1" showLink={false} />
        {besoinsAvecProduits.length === 0 ? (
          <div className="grid place-items-center gap-5 rounded-2xl border border-[#EDE8E0] bg-[#FAF8F4] px-6 py-16 text-center">
            <p className="font-display text-2xl text-[#1A1A1A]">Cette sélection arrive très vite.</p>
            <Button href="/boutique" variant="secondary">
              VOIR TOUTE LA BOUTIQUE
            </Button>
          </div>
        ) : (
        <ul data-reveal-stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {besoinsAvecProduits.map((b, i) => (
            <li key={b.slug}>
              <BesoinCard besoin={b} index={i} />
            </li>
          ))}
        </ul>
        )}
      </section>
    </PageShell>
  );
}
