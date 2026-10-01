import type { Metadata } from "next";
import BrandStrip from "@/components/BrandStrip";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = { title: "Marques — COSMÉTÉO" };

/** Marques et logos factices : à remplacer par le vrai catalogue (data/brands.ts). */
export default function BrandsPage() {
  return (
    <PageShell>
      <BrandStrip />
    </PageShell>
  );
}
