import type { Category } from "@/types/catalog";

/**
 * Catégories temporaires. Pour une vraie photo : renseigner `image`
 * (ex. "/images/categories/visage.webp").
 */
export const categories: Category[] = [
  { id: "visage", slug: "visage", name: "Visage", href: "/boutique/visage", art: "dropper", tone: "sage" },
  { id: "corps", slug: "corps", name: "Corps", href: "/boutique/corps", art: "jar", tone: "sand" },
  { id: "cheveux", slug: "cheveux", name: "Cheveux", href: "/boutique/cheveux", art: "bottle", tone: "cream" },
  { id: "maquillage", slug: "maquillage", name: "Maquillage", href: "/boutique/maquillage", art: "compact", tone: "coral" },
  { id: "solaires", slug: "solaires", name: "Solaires", href: "/boutique/solaires", art: "tube", tone: "sand" },
  { id: "bebe-maman", slug: "bebe-maman", name: "Bébé & Maman", href: "/boutique/bebe-maman", art: "pump", tone: "cream" },
  { id: "hygiene", slug: "hygiene", name: "Hygiène", href: "/boutique/hygiene", art: "bottle", tone: "sage" },
  { id: "complements", slug: "complements", name: "Compléments", href: "/boutique/complements", art: "capsule", tone: "green" },
  { id: "parfums", slug: "parfums", name: "Parfums", href: "/boutique/parfums", art: "perfume", tone: "brown" },
];
