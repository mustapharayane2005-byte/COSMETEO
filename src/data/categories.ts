import type { Category } from "@/types/catalog";

/**
 * Familles de la boutique et leurs sous-catégories.
 * Pour une vraie photo : renseigner `image` (ex. "/images/categories/visage.webp").
 * Routes : /boutique/<famille> et /boutique/<famille>/<sous-categorie>.
 */
export const categories: Category[] = [
  {
    id: "visage",
    slug: "visage",
    name: "Visage",
    href: "/boutique/visage",
    art: "dropper",
    tone: "sage",
    sousCategories: [
      { slug: "nettoyants", name: "Nettoyants" },
      { slug: "hydratants", name: "Hydratants" },
      { slug: "serums", name: "Sérums" },
      { slug: "anti-imperfections", name: "Anti-imperfections" },
      { slug: "anti-age", name: "Anti-âge" },
      { slug: "protection-solaire", name: "Protection solaire" },
      { slug: "demaquillants", name: "Démaquillants" },
    ],
  },
  {
    id: "corps",
    slug: "corps",
    name: "Corps",
    href: "/boutique/corps",
    art: "jar",
    tone: "sand",
    sousCategories: [
      { slug: "hydratation", name: "Hydratation" },
      { slug: "douche-et-bain", name: "Douche & bain" },
      { slug: "deodorants", name: "Déodorants" },
      { slug: "soins-specifiques", name: "Soins spécifiques" },
      { slug: "mains-et-pieds", name: "Mains & pieds" },
    ],
  },
  {
    id: "homme",
    slug: "homme",
    name: "Homme",
    href: "/boutique/homme",
    art: "tube",
    tone: "cream",
    sousCategories: [
      { slug: "visage", name: "Visage" },
      { slug: "rasage", name: "Rasage" },
      { slug: "corps", name: "Corps" },
      { slug: "cheveux", name: "Cheveux" },
      { slug: "hygiene", name: "Hygiène" },
    ],
  },
  {
    id: "bebe-enfant",
    slug: "bebe-enfant",
    name: "Bébé & Enfant",
    href: "/boutique/bebe-enfant",
    art: "pump",
    tone: "cream",
    sousCategories: [
      { slug: "toilette", name: "Toilette" },
      { slug: "hydratation", name: "Hydratation" },
      { slug: "change", name: "Change" },
      { slug: "solaires", name: "Solaires" },
      { slug: "maman-et-grossesse", name: "Maman & grossesse" },
    ],
  },
  {
    id: "cheveux",
    slug: "cheveux",
    name: "Cheveux",
    href: "/boutique/cheveux",
    art: "bottle",
    tone: "sage",
    sousCategories: [
      { slug: "shampoings", name: "Shampoings" },
      { slug: "apres-shampoings", name: "Après-shampoings" },
      { slug: "masques", name: "Masques" },
      { slug: "huiles-et-serums", name: "Huiles & sérums" },
      { slug: "chute-de-cheveux", name: "Chute de cheveux" },
    ],
  },
  {
    id: "hygiene",
    slug: "hygiene",
    name: "Hygiène",
    href: "/boutique/hygiene",
    art: "bottle",
    tone: "sand",
    sousCategories: [
      { slug: "bucco-dentaire", name: "Bucco-dentaire" },
      { slug: "hygiene-intime", name: "Hygiène intime" },
      { slug: "hygiene-corporelle", name: "Hygiène corporelle" },
      { slug: "protection", name: "Protection" },
    ],
  },
  {
    id: "sante-bien-etre",
    slug: "sante-bien-etre",
    name: "Santé & Bien-être",
    href: "/boutique/sante-bien-etre",
    art: "capsule",
    tone: "green",
    sousCategories: [
      { slug: "vitamines-et-mineraux", name: "Vitamines & minéraux" },
      { slug: "complements-alimentaires", name: "Compléments alimentaires" },
      { slug: "immunite", name: "Immunité" },
      { slug: "digestion", name: "Digestion" },
      { slug: "sommeil", name: "Sommeil" },
      { slug: "bien-etre", name: "Bien-être" },
    ],
  },
  {
    id: "beaute",
    slug: "beaute",
    name: "Beauté",
    href: "/boutique/beaute",
    art: "compact",
    tone: "coral",
    sousCategories: [
      { slug: "maquillage", name: "Maquillage" },
      { slug: "parfums", name: "Parfums" },
      { slug: "accessoires-beaute", name: "Accessoires beauté" },
    ],
  },
  {
    id: "solaire",
    slug: "solaire",
    name: "Solaire",
    href: "/boutique/solaire",
    art: "tube",
    tone: "sand",
    sousCategories: [
      { slug: "visage", name: "Visage" },
      { slug: "corps", name: "Corps" },
      { slug: "enfants", name: "Enfants" },
      { slug: "apres-soleil", name: "Après-soleil" },
    ],
  },
];

export const getFamille = (slug: string) => categories.find((c) => c.slug === slug);
export const getSousCategorie = (famille: string, slug: string) =>
  getFamille(famille)?.sousCategories.find((s) => s.slug === slug);
