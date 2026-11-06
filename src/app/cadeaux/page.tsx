import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { cadeauxProducts } from "@/data/products";

export const metadata: Metadata = { title: "Cadeaux" };

export default function Page() {
  if (cadeauxProducts.length === 0) notFound();
  return <CatalogPage title="Cadeaux" intro="Des idées pour faire plaisir." products={cadeauxProducts} />;
}
