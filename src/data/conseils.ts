import type { Article } from "@/types/catalog";

/**
 * Articles « Conseils ». Contenu généraliste et informatif : aucun diagnostic,
 * aucune promesse médicale. Les `recommended` sont des slugs de produits (data/products.ts).
 */
export const conseilsDisclaimer =
  "Ces conseils sont informatifs et ne remplacent pas l'avis d'un professionnel de santé.";

export const articles: Article[] = [
  {
    slug: "construire-sa-routine-skincare",
    title: "Comment construire sa routine skincare ?",
    summary: "Les étapes de base pour prendre soin de sa peau, matin et soir, sans se compliquer la vie.",
    tone: "sage",
    image: "/images/conseils/routine-skincare.webp",
    imageAlt: "Femme souriante qui nettoie son visage avec une mousse nettoyante",
    sections: [
      { heading: "Commencer simple", text: "Une routine de base tient en trois gestes : nettoyer, hydrater, protéger. Inutile de multiplier les produits au départ." },
      { heading: "Le matin", text: "Nettoyez en douceur, appliquez une crème hydratante, puis terminez par une protection solaire si vous sortez." },
      { heading: "Le soir", text: "Retirez la journée avec un nettoyant adapté, puis appliquez votre soin hydratant. Vous pouvez y ajouter un sérum." },
      { heading: "Être régulier", text: "Introduisez un nouveau produit à la fois et laissez-lui un peu de temps. La régularité compte plus que le nombre d'étapes." },
    ],
    recommended: ["gel-moussant-visage", "creme-hydratante-48h", "ecran-solaire-spf50"],
  },
  {
    slug: "routine-peau-acneique",
    title: "Quelle routine pour une peau acnéique ?",
    summary: "Des repères généraux pour les peaux sujettes aux imperfections, avec des gestes doux.",
    tone: "sand",
    sections: [
      { heading: "Nettoyer sans agresser", text: "Privilégiez un nettoyant doux, matin et soir. Frotter trop fort ou multiplier les lavages peut fragiliser la peau." },
      { heading: "Hydrater quand même", text: "Une peau sujette aux imperfections a aussi besoin d'hydratation. Choisissez des textures légères." },
      { heading: "Ne pas toucher", text: "Évitez de percer les boutons : cela peut laisser des marques. Gardez vos mains propres." },
      { heading: "Demander conseil", text: "Si les imperfections persistent ou vous préoccupent, un dermatologue ou un pharmacien pourra vous orienter." },
    ],
    recommended: ["gel-moussant-visage", "masque-purifiant-argile"],
  },
  {
    slug: "choisir-sa-creme-solaire",
    title: "Comment choisir sa crème solaire ?",
    summary: "Indice, texture, application : les points à regarder pour bien choisir sa protection.",
    tone: "cream",
    image: "/images/conseils/creme-solaire.webp",
    imageAlt: "Femme qui applique de la crème solaire sur son épaule",
    sections: [
      { heading: "L'indice de protection", text: "Plus l'indice (SPF) est élevé, plus la protection contre les UVB est importante. Un SPF 50 est souvent recommandé pour le visage." },
      { heading: "La texture", text: "Fluide, crème ou lait : choisissez celle que vous aimerez porter chaque jour, c'est la clé de la régularité." },
      { heading: "La bonne quantité", text: "On applique généreusement et on renouvelle environ toutes les deux heures, et après la baignade." },
      { heading: "Au quotidien", text: "Le soleil agit aussi quand le ciel est couvert. Pensez à protéger visage, cou et mains." },
    ],
    recommended: ["ecran-solaire-spf50"],
  },
  {
    slug: "niacinamide-a-quoi-ca-sert",
    title: "Niacinamide : à quoi ça sert ?",
    summary: "Un actif cosmétique très répandu : ce qu'il est et comment l'intégrer à sa routine.",
    tone: "sage",
    image: "/images/conseils/niacinamide.webp",
    imageAlt: "Flacon de sérum à pipette laissant tomber une goutte",
    sections: [
      { heading: "De quoi s'agit-il ?", text: "La niacinamide est une forme de vitamine B3 utilisée dans de nombreux soins cosmétiques." },
      { heading: "Pourquoi on l'aime", text: "On la retrouve dans des soins visant à lisser le grain de peau et à uniformiser l'aspect du teint." },
      { heading: "Comment l'utiliser", text: "Elle s'applique en sérum ou en crème, après le nettoyage. Commencez par une utilisation par jour." },
      { heading: "Bon à savoir", text: "Faites un test sur une petite zone avant la première utilisation, surtout si votre peau est sensible." },
    ],
    recommended: ["serum-eclat-vitamine-c", "creme-hydratante-48h"],
  },
  {
    slug: "skincare-homme-essentiels",
    title: "Skincare homme : les essentiels",
    summary: "Trois gestes simples pour une routine efficace, sans y passer des heures.",
    tone: "cream",
    image: "/images/conseils/skincare-homme.webp",
    imageAlt: "Homme qui applique un soin nettoyant sur son visage",
    imagePosition: "center 25%",
    sections: [
      { heading: "Nettoyer", text: "Un nettoyant doux le matin et le soir retire la transpiration, la poussière et l'excès de sébum." },
      { heading: "Hydrater", text: "Une crème légère aide à garder la peau confortable, surtout après le rasage." },
      { heading: "Protéger", text: "Un écran solaire au quotidien est le geste le plus simple pour prendre soin de sa peau sur la durée." },
    ],
    recommended: ["gel-moussant-visage", "ecran-solaire-spf50", "masque-purifiant-argile"],
  },
  {
    slug: "soins-essentiels-de-bebe",
    title: "Les soins essentiels de bébé",
    summary: "Toilette, hydratation, protection : l'essentiel pour prendre soin de la peau des tout-petits.",
    tone: "sand",
    image: "/images/conseils/soins-bebe.webp",
    imageAlt: "Main d'adulte tenant le pied d'un bébé orné d'un cœur de crème",
    imagePosition: "center 25%",
    sections: [
      { heading: "Une toilette douce", text: "Choisissez des produits conçus pour les bébés et rincez soigneusement, sans frotter." },
      { heading: "Hydrater", text: "Après le bain, appliquez un soin hydratant adapté en massant délicatement." },
      { heading: "Protéger du soleil", text: "Les bébés ne doivent pas être exposés directement au soleil. Privilégiez l'ombre et les vêtements couvrants." },
      { heading: "En cas de doute", text: "Pour toute question sur la peau de votre enfant, demandez l'avis de votre pédiatre ou de votre pharmacien." },
    ],
    recommended: ["beurre-corporel-karite"],
  },
  {
    slug: "comprendre-les-actifs-cosmetiques",
    title: "Comprendre les actifs cosmétiques",
    summary: "Hydratants, antioxydants, exfoliants : un petit lexique pour lire les étiquettes.",
    tone: "green",
    image: "/images/conseils/actifs-cosmetiques.webp",
    imageAlt: "Flacon à pipette, pot de crème et tube de soin sur fond crème",
    sections: [
      { heading: "Les hydratants", text: "Glycérine ou acide hyaluronique, par exemple, aident à retenir l'eau dans la peau." },
      { heading: "Les antioxydants", text: "La vitamine C ou la vitamine E sont souvent utilisées dans des soins pensés pour les peaux ternes." },
      { heading: "Les exfoliants", text: "Ils aident à éliminer les cellules mortes en surface. Utilisez-les avec modération." },
      { heading: "Lire l'étiquette", text: "Les ingrédients sont listés par quantité décroissante. Les premiers sont les plus présents dans la formule." },
    ],
    recommended: ["serum-eclat-vitamine-c", "creme-hydratante-48h"],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
