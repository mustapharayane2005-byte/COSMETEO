import type { Brand } from "@/types/catalog";

/**
 * Marques affichées en TEXTE UNIQUEMENT : jamais de logos ni de packshots de marques.
 * ⚠️ Marques à confirmer avec le client avant mise en ligne (`confirmed: false`).
 * Ne pas employer de formule laissant croire à un partenariat officiel.
 */
const names = [
  "CeraVe",
  "La Roche-Posay",
  "Bioderma",
  "Avène",
  "Anua",
  "COSRX",
  "Beauty of Joseon",
  "SKIN1004",
  "Isntree",
  "Medicube",
  "Some By Mi",
];

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const brands: Brand[] = names.map((name) => ({
  id: slugify(name),
  slug: slugify(name),
  name,
  confirmed: false,
  wordmark: "serif",
}));

/** Marques triées par ordre alphabétique (insensible à la casse). */
export const brandsAZ = [...brands].sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
