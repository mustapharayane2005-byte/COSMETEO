import type { Besoin } from "@/types/catalog";

/**
 * Entrées « Par besoin ». Un produit y est rattaché via son champ `besoins` (data/products.ts).
 * Textes informatifs et généralistes : aucune promesse médicale.
 */
export const besoins: Besoin[] = [
  {
    slug: "acne-imperfections",
    name: "Acné & imperfections",
    resume: "Nettoyants doux et soins légers pour les peaux à imperfections.",
    icone: "pore",
    couleur: "sage",
    conseils: [
      "Nettoyez votre visage matin et soir avec un produit doux.",
      "Choisissez des textures légères, non grasses, pour hydrater.",
      "Évitez de toucher ou de percer les boutons.",
    ],
  },
  {
    slug: "peau-seche",
    name: "Peau sèche",
    resume: "Des textures riches pour retrouver confort et souplesse.",
    icone: "leaf",
    couleur: "blush",
    conseils: [
      "Appliquez votre soin hydratant sur peau encore légèrement humide.",
      "Préférez une eau tiède plutôt que très chaude pour la toilette.",
      "Pensez aux beurres et huiles végétales pour le corps.",
    ],
  },
  {
    slug: "taches-pigmentaires",
    name: "Taches pigmentaires",
    resume: "Soins du teint et protection solaire pour une peau uniforme.",
    icone: "bottle",
    couleur: "sage",
    conseils: [
      "Utilisez une protection solaire chaque jour, même par temps couvert.",
      "Introduisez un nouveau soin à la fois, progressivement.",
      "Soyez régulier : les résultats cosmétiques demandent du temps.",
    ],
  },
  {
    slug: "peau-sensible",
    name: "Peau sensible",
    resume: "Formules simples et douces pour le confort de tous les jours.",
    icone: "heart",
    couleur: "blush",
    conseils: [
      "Privilégiez les produits à la liste d'ingrédients courte.",
      "Testez un nouveau produit sur une petite zone avant usage.",
      "Limitez le nombre de produits dans votre routine.",
    ],
  },
  {
    slug: "chute-de-cheveux",
    name: "Chute de cheveux",
    resume: "Soins du cuir chevelu et compléments à découvrir.",
    icone: "hair",
    couleur: "sage",
    conseils: [
      "Massez doucement le cuir chevelu au moment du shampoing.",
      "Évitez les coiffures qui tirent trop sur les racines.",
      "En cas d'inquiétude, demandez conseil à un professionnel de santé.",
    ],
  },
  {
    slug: "hydratation",
    name: "Hydratation",
    resume: "Visage et corps : des soins pour garder une peau confortable.",
    icone: "drop",
    couleur: "blush",
    conseils: [
      "Hydratez matin et soir, en insistant sur les zones sèches.",
      "Appliquez le soin après la douche pour garder le confort.",
      "Buvez régulièrement de l'eau tout au long de la journée.",
    ],
  },
  {
    slug: "protection-solaire",
    name: "Protection solaire",
    resume: "Visage, corps et enfants : la bonne protection au quotidien.",
    icone: "sun",
    couleur: "sage",
    conseils: [
      "Appliquez généreusement, puis renouvelez toutes les deux heures.",
      "Protégez aussi le cou, les oreilles et le dessus des mains.",
      "Cherchez l'ombre aux heures les plus ensoleillées.",
    ],
  },
  {
    slug: "hygiene-intime",
    name: "Hygiène intime",
    resume: "Des soins doux, pensés pour le quotidien et le confort.",
    icone: "shield",
    couleur: "blush",
    conseils: [
      "Choisissez des produits spécialement conçus pour cet usage.",
      "Rincez soigneusement et évitez les parfums trop marqués.",
      "Pour toute gêne persistante, consultez un professionnel de santé.",
    ],
  },
  {
    slug: "bebe",
    name: "Bébé",
    resume: "Toilette, hydratation et douceur pour la peau des tout-petits.",
    icone: "bear",
    couleur: "sage",
    conseils: [
      "Choisissez des produits conçus pour les bébés et rincez bien.",
      "Hydratez après le bain en massant délicatement.",
      "Demandez conseil à votre pédiatre ou pharmacien en cas de doute.",
    ],
  },
  {
    slug: "homme",
    name: "Homme",
    resume: "Les essentiels du visage et du rasage, simples et efficaces.",
    icone: "man",
    couleur: "blush",
    conseils: [
      "Nettoyez, hydratez, protégez : trois gestes suffisent pour débuter.",
      "Après le rasage, choisissez un soin apaisant sans alcool.",
      "Un écran solaire au quotidien protège aussi la peau masculine.",
    ],
  },
  {
    slug: "grossesse",
    name: "Grossesse",
    resume: "Des soins hydratants et confortables pour le corps.",
    icone: "heart",
    couleur: "sage",
    conseils: [
      "Hydratez régulièrement le ventre, les hanches et la poitrine.",
      "Choisissez des formules douces et peu parfumées.",
      "Demandez conseil à votre professionnel de santé avant tout nouveau soin.",
    ],
  },
  {
    slug: "bien-etre",
    name: "Bien-être",
    resume: "Petits rituels, parfums et compléments pour se faire du bien.",
    icone: "leaf",
    couleur: "blush",
    conseils: [
      "Prenez un moment par jour rien que pour vous.",
      "Associez un soin du corps à un moment de détente.",
      "Gardez une alimentation variée et un sommeil régulier.",
    ],
  },
  {
    slug: "cernes-regard-fatigue",
    name: "Cernes & regard fatigué",
    resume: "Soins du contour des yeux pour un regard reposé.",
    icone: "eye",
    couleur: "sage",
    conseils: [
      "Tapotez le soin du bout du doigt, sans frotter la zone.",
      "Une nuit de sommeil régulière aide à garder un regard reposé.",
      "Protégez le contour des yeux du soleil avec des lunettes.",
    ],
  },
  {
    slug: "peau-grasse-pores",
    name: "Peau grasse & pores",
    resume: "Textures fluides et nettoyants pour une peau plus nette.",
    icone: "pore",
    couleur: "blush",
    conseils: [
      "Nettoyez sans agresser : trop de lavages peut stimuler le sébum.",
      "Hydratez avec un gel ou une crème fluide.",
      "Utilisez un masque purifiant une à deux fois par semaine.",
    ],
  },
  {
    slug: "teint-terne-eclat",
    name: "Teint terne & éclat",
    resume: "Sérums et soins lumineux pour un teint plus frais.",
    icone: "sparkle",
    couleur: "sage",
    conseils: [
      "Associez nettoyage doux, sérum et crème hydratante.",
      "Un antioxydant comme la vitamine C se place souvent le matin.",
      "Dormez suffisamment et hydratez-vous pour un teint reposé.",
    ],
  },
  {
    slug: "cheveux-secs-abimes",
    name: "Cheveux secs & abîmés",
    resume: "Shampoings, masques et huiles pour des cheveux plus souples.",
    icone: "hair",
    couleur: "blush",
    conseils: [
      "Utilisez un shampoing doux et un après-shampoing sur les longueurs.",
      "Faites un masque nourrissant une fois par semaine.",
      "Limitez la chaleur des appareils de coiffure.",
    ],
  },
];

export const getBesoin = (slug: string) => besoins.find((b) => b.slug === slug);
