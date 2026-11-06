import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { topVentesProducts } from "@/data/products";

export const metadata: Metadata = { title: "Top ventes" };

export default function Page() {
  if (topVentesProducts.length === 0) notFound();
  return <CatalogPage title="Top ventes" intro="Les produits les plus appréciés." products={topVentesProducts} />;
}
