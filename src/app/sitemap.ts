import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { allProducts } from "@/data/products";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmeteo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/boutique", "/nouveautes", "/promotions", "/marques"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...categories.map((c) => ({ url: `${base}/boutique/${c.slug}` })),
    ...allProducts.map((p) => ({ url: `${base}/produit/${p.slug}` })),
  ];
}
