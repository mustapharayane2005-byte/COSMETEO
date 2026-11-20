import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import FilteredProductGrid from "@/components/FilteredProductGrid";
import NoelImage from "@/components/NoelImage";
import PageShell from "@/components/PageShell";
import { cadeauxActif } from "@/data/noel";
import { cadeauxProducts } from "@/data/products";

/** Régénération horaire : la page redirige vers /boutique dès que le thème de Noël est terminé. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Idées cadeaux de Noël | Cosméteo" },
  description: "Des idées de cadeaux de Noël pour toute la famille : soins, beauté et bien-être.",
  alternates: { canonical: "/cadeaux" },
};

export default function Page() {
  if (!cadeauxActif()) redirect("/boutique");
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)] pt-6 md:pt-10">
        <nav aria-label="Fil d'Ariane" className="mb-4 flex flex-wrap gap-x-2 text-xs text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>{" "}
          /{" "}
          <span aria-current="page">Idées cadeaux de Noël</span>
        </nav>
        <div className="relative mb-8 flex aspect-video items-end overflow-hidden rounded-3xl bg-[#173c32] md:aspect-auto md:min-h-[320px]">
          <NoelImage />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0e241e]/85 to-transparent" />
          <div className="relative p-6 text-white md:p-10">
            <h1 className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] leading-tight">Idées cadeaux de Noël</h1>
            <p className="mt-2 text-sm text-[var(--or-clair)] md:text-base">Des idées pour toute la famille.</p>
          </div>
        </div>
        <FilteredProductGrid products={cadeauxProducts} columns={4} pastillesMarques={false} />
      </section>
    </PageShell>
  );
}
