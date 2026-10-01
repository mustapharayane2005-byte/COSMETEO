import type { Metadata } from "next";
import CatalogPage from "@/components/CatalogPage";
import { newProducts } from "@/data/products";

export const metadata: Metadata = { title: "Nouveautés — COSMÉTÉO" };

export default function NewArrivalsPage() {
  return <CatalogPage title="Nouveautés" intro="Les dernières arrivées en boutique." products={newProducts} />;
}
