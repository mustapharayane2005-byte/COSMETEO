import type { Brand } from "@/types/catalog";
import type { BrandTypeId } from "@/data/brandTypes";

/**
 * Marques affichées en TEXTE UNIQUEMENT : jamais de logos ni de packshots de marques.
 * Ne pas employer de formule laissant croire à un partenariat officiel.
 */
// Marques à confirmer avec le client avant mise en ligne. N'afficher que celles réellement vendues.
const entries: { name: string; types: BrandTypeId[]; featured?: boolean }[] = [
  // K-beauty
  { name: "Anua", types: ["k-beauty"] },
  { name: "Beauty of Joseon", types: ["k-beauty"] },
  { name: "COSRX", types: ["k-beauty"] },
  { name: "Isntree", types: ["k-beauty"] },
  { name: "Medicube", types: ["k-beauty"] },
  { name: "SKIN1004", types: ["k-beauty"] },
  { name: "Some By Mi", types: ["k-beauty"] },
  // US-beauty
  { name: "CeraVe", types: ["us-beauty"], featured: true },
  // French beauty
  { name: "La Roche-Posay", types: ["french-beauty"], featured: true },
  { name: "Avène", types: ["french-beauty"], featured: true },
  { name: "ACM", types: ["french-beauty"] },
  { name: "Eucerin", types: [] },
  { name: "Ducray", types: ["french-beauty", "hair-care"] },
  { name: "Mixa", types: ["french-beauty"], featured: true },
  { name: "Garnier", types: ["french-beauty"], featured: true },
  { name: "L'Oréal Paris", types: ["french-beauty"], featured: true },
  { name: "Maison du Savon de Marseille", types: ["french-beauty"] },
  { name: "Byphasse", types: ["french-beauty"] },
  { name: "Blondépil", types: ["french-beauty"] },
  { name: "Bioderma", types: ["french-beauty"] },
  // À classer par univers avec le client
  { name: "MAKARI", types: [] },
  { name: "SKIN BY ZARON", types: [] },
];

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const brands: Brand[] = entries.map((e) => ({
  id: slugify(e.name),
  slug: slugify(e.name),
  name: e.name,
  types: e.types,
  featured: e.featured ?? false,
  confirmed: false,
  wordmark: "serif",
}));

/** Marques triées par ordre alphabétique (insensible à la casse et aux accents). */
export const brandsAZ = [...brands].sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
