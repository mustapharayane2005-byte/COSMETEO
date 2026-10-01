import type { Promo } from "@/types/catalog";

export const promos: Promo[] = [
  {
    id: "best-sellers",
    eyebrow: "Sélection",
    title: "Nos best-sellers",
    text: "Les produits préférés de nos clients.",
    cta: "VOIR LA SÉLECTION →",
    href: "/boutique?tri=meilleures-ventes",
    theme: "sage",
    art: ["pump", "jar"],
  },
  {
    id: "promotions",
    eyebrow: "Promotions",
    title: "Jusqu'à -30%",
    text: "Une sélection de produits à prix doux.",
    cta: "J'EN PROFITE →",
    href: "/promotions",
    theme: "green",
    highlight: true,
    art: ["dropper", "tube"],
  },
  {
    id: "routine-eclat",
    eyebrow: "Routine",
    title: "Routine peau éclatante",
    text: "Découvrez notre sélection de soins.",
    cta: "DÉCOUVRIR →",
    href: "/routines/peau-eclatante",
    theme: "sand",
    art: ["bottle", "dropper"],
  },
];
