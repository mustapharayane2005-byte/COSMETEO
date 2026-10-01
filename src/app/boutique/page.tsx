import type { Metadata } from "next";
import CatalogPage from "@/components/CatalogPage";
import { allProducts } from "@/data/products";

export const metadata: Metadata = { title: "Boutique — COSMÉTÉO" };

export default function ShopPage() {
  return (
    <CatalogPage
      title="Boutique"
      intro="Tous nos soins et produits de beauté."
      products={allProducts}
      filter={{ active: "" }}
    />
  );
}
