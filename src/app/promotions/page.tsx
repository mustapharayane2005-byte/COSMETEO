import type { Metadata } from "next";
import CatalogPage from "@/components/CatalogPage";
import { promoProducts } from "@/data/products";

export const metadata: Metadata = { title: "Promotions — COSMÉTÉO" };

export default function PromotionsPage() {
  return (
    <CatalogPage title="Promotions" intro="Une sélection de produits à prix doux." products={promoProducts} />
  );
}
