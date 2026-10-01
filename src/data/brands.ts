import type { Brand } from "@/types/catalog";

/**
 * ⚠️ Marques fictives, affichées en wordmarks typographiques temporaires.
 * Ne rien afficher ici qui ne soit pas réellement au catalogue.
 * Remplacer par les vraies marques + `logo: "/images/brands/xxx.svg"`.
 */
export const brands: Brand[] = [
  { id: "solenne", name: "Solenne", wordmark: "serif" },
  { id: "aloe-co", name: "Aloé & Co", wordmark: "italic" },
  { id: "karelle", name: "KARELLE", wordmark: "spaced" },
  { id: "verdelle", name: "Verdelle", wordmark: "serif" },
  { id: "iroko", name: "iroko", wordmark: "sans" },
  { id: "hesper", name: "HESPER", wordmark: "spaced" },
];
