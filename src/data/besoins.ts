import type { Besoin } from "@/types/catalog";

/**
 * Entrées « Par besoin ». Un produit y est rattaché via son champ `besoins` (data/products.ts).
 * Textes informatifs et généralistes : aucune promesse médicale.
 */
export const besoins: Besoin[] = [
  {
    slug: "acne-imperfections",
    name: "Acné & imperfections",
    intro:
      "Une peau sujette aux imperfections apprécie les gestes simples et réguliers. Retrouvez ici des nettoyants et des soins légers pensés pour les peaux mixtes à grasses.",
  },
  {
    slug: "peau-seche",
    name: "Peau sèche",
    intro:
      "Une peau sèche a besoin de textures nourrissantes et confortables au quotidien. Découvrez des crèmes, huiles et beurres pour le visage et le corps.",
  },
  {
    slug: "taches-pigmentaires",
    name: "Taches pigmentaires",
    intro:
      "Pour un teint plus uniforme, la régularité et la protection solaire comptent autant que les soins. Voici une sélection de produits cosmétiques à intégrer à votre routine.",
  },
  {
    slug: "peau-sensible",
    name: "Peau sensible",
    intro:
      "Les peaux sensibles préfèrent des formules simples et douces. Retrouvez des soins au toucher apaisant pour le quotidien.",
  },
  {
    slug: "chute-de-cheveux",
    name: "Chute de cheveux",
    intro:
      "Prendre soin du cuir chevelu et de la fibre capillaire fait partie d'une routine équilibrée. Découvrez des shampoings et compléments à associer à vos soins.",
  },
  {
    slug: "hydratation",
    name: "Hydratation",
    intro:
      "Hydrater sa peau, c'est un geste de base, matin et soir. Parcourez les soins qui apportent confort et souplesse, du visage au corps.",
  },
  {
    slug: "protection-solaire",
    name: "Protection solaire",
    intro:
      "Sous le soleil du Bénin, protéger sa peau au quotidien est un bon réflexe. Retrouvez nos écrans solaires et soins après-soleil.",
  },
  {
    slug: "hygiene-intime",
    name: "Hygiène intime",
    intro:
      "Des soins doux, adaptés à une zone délicate, pour le quotidien. Cette sélection sera enrichie très bientôt.",
  },
  {
    slug: "bebe",
    name: "Bébé",
    intro:
      "La peau des tout-petits mérite des soins doux et simples. Découvrez des produits pour la toilette et l'hydratation de bébé.",
  },
  {
    slug: "homme",
    name: "Homme",
    intro:
      "Une routine efficace tient en quelques gestes : nettoyer, hydrater, protéger. Retrouvez les essentiels pensés pour les hommes.",
  },
  {
    slug: "grossesse",
    name: "Grossesse",
    intro:
      "Pendant la grossesse, la peau a besoin de confort et de douceur. Découvrez des soins hydratants pour le corps, et demandez conseil à votre professionnel de santé.",
  },
  {
    slug: "bien-etre",
    name: "Bien-être",
    intro:
      "Prendre soin de soi passe aussi par les petits rituels du quotidien. Retrouvez des parfums, compléments et soins pour se faire du bien.",
  },
];

export const getBesoin = (slug: string) => besoins.find((b) => b.slug === slug);
