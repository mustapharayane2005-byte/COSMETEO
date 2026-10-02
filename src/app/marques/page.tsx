import type { Metadata } from "next";
import BrandIndex from "@/components/BrandIndex";
import PageShell from "@/components/PageShell";
import { brandsAZ } from "@/data/brands";

export const metadata: Metadata = { title: "Nos marques" };

export default function BrandsPage() {
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <header className="py-8 text-center md:py-14">
          <h1 className="h2 !text-[clamp(2.25rem,1.2rem+3.4vw,4rem)]">Nos marques</h1>
          <p className="lead mx-auto mt-3 max-w-xl">Parcourez les marques de A à Z.</p>
        </header>
        <BrandIndex brands={brandsAZ} />
      </section>
    </PageShell>
  );
}
