import type { Brand, BrandType } from "@/types/catalog";

/**
 * Marques affichées en TEXTE UNIQUEMENT : jamais de logos ni de packshots de marques.
 * ⚠️ Marques à confirmer avec le client avant mise en ligne (`confirmed: false`) : marque à confirmer avec le client avant mise en ligne.
 * Ne pas employer de formule laissant croire à un partenariat officiel.
 */
const entries: [string, BrandType][] = [
  ["CeraVe", "dermo"],
  ["La Roche-Posay", "dermo"],
  ["Bioderma", "dermo"],
  ["Avène", "dermo"],
  ["Anua", "coreen"],
  ["COSRX", "coreen"],
  ["Beauty of Joseon", "coreen"],
  ["SKIN1004", "coreen"],
  ["Isntree", "coreen"],
  ["Medicube", "coreen"],
  ["Some By Mi", "coreen"],
  ["Garnier", "grand-public"],
  ["L'Oréal Paris", "grand-public"],
  ["Byphasse", "grand-public"],
];

export const brandTypeLabels: Record<BrandType, string> = {
  dermo: "Dermo-cosmétique",
  coreen: "Soins coréens",
  "grand-public": "Grand public",
};

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Toutes les marques (page /marques, pages /marques/[slug], sitemap). */
export const allBrands: Brand[] = entries.map(([name, type]) => ({
  id: slugify(name),
  slug: slugify(name),
  name,
  type,
  confirmed: false,
  wordmark: "serif",
}));

/** Bande de l'accueil (BrandStrip) : sélection d'origine, inchangée (sans les marques grand public). */
export const brands: Brand[] = allBrands.filter((b) => b.type !== "grand-public");

/** Marques triées par ordre alphabétique (insensible à la casse). */
export const brandsAZ = [...allBrands].sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));

export const getBrand = (slug: string) => allBrands.find((b) => b.slug === slug);
