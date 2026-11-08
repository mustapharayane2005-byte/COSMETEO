/**
 * Taxonomie du grand menu par rubrique (façon aroma-zone).
 * Chaque groupe correspond à UNE colonne de products.csv ; plusieurs valeurs s'y séparent par « | ».
 * Les slugs sont uniques dans toute la taxonomie (d'où les suffixes -corps, -visage, -bebe).
 * Pour ajouter une entrée : l'ajouter ici, puis étiqueter les produits dans products.csv et lancer `npm run catalogue`
 * (le script ignore avec un avertissement tout slug absent de ce fichier). Le menu n'affiche que les entrées qui ont au moins un produit.
 */
export type Colonne = "sous_categorie" | "type_peau" | "type_cheveux" | "preoccupation";

export type EntreeTaxonomie = { label: string; slug: string };
export type GroupeTaxonomie = { id: string; label: string; colonne: Colonne; entrees: EntreeTaxonomie[] };
export type Rubrique = {
  /** Slug de famille de la boutique (paramètre `categorie`). */
  slug: string;
  /** Libellé affiché dans le menu. */
  label: string;
  groupes: GroupeTaxonomie[];
};

export const COLONNES: Colonne[] = ["sous_categorie", "type_peau", "type_cheveux", "preoccupation"];

export const taxonomie: Rubrique[] = [
  {
    slug: "visage",
    label: "Visage",
    groupes: [
      {
        id: "soin-visage",
        label: "Soin visage",
        colonne: "sous_categorie",
        entrees: [
          { label: "Sérums visage", slug: "serums-visage" },
          { label: "Crèmes et soins hydratants", slug: "cremes-soins-hydratants" },
          { label: "Nettoyants, démaquillants, toniques", slug: "nettoyants-demaquillants-toniques" },
          { label: "Masques et gommages", slug: "masques-gommages" },
          { label: "Huiles visage", slug: "huiles-visage" },
          { label: "Protection solaire visage", slug: "protection-solaire-visage" },
          { label: "Baumes à lèvres", slug: "baumes-levres" },
        ],
      },
      {
        id: "type-de-peau",
        label: "Type de peau",
        colonne: "type_peau",
        entrees: [
          { label: "Peau normale", slug: "peau-normale" },
          { label: "Peau sèche", slug: "peau-seche" },
          { label: "Peau grasse", slug: "peau-grasse" },
          { label: "Peau mixte", slug: "peau-mixte" },
          { label: "Peau sensible", slug: "peau-sensible" },
          { label: "Peau mature", slug: "peau-mature" },
        ],
      },
      {
        id: "preoccupation-visage",
        label: "Préoccupation visage",
        colonne: "preoccupation",
        entrees: [
          { label: "Boutons, imperfections", slug: "boutons-imperfections" },
          { label: "Points noirs, pores dilatés", slug: "points-noirs-pores-dilates" },
          { label: "Rougeurs, irritations", slug: "rougeurs-irritations" },
          { label: "Taches brunes, hyperpigmentation", slug: "taches-brunes-hyperpigmentation" },
          { label: "Rides et relâchement cutané", slug: "rides-relachement-cutane" },
          { label: "Sécheresse, déshydratation", slug: "secheresse-deshydratation" },
          { label: "Manque d'éclat, teint terne", slug: "manque-eclat-teint-terne" },
          { label: "Excès de sébum, brillances", slug: "exces-sebum-brillances" },
        ],
      },
    ],
  },
  {
    slug: "corps",
    label: "Corps",
    groupes: [
      {
        id: "soin-corps",
        label: "Soin corps",
        colonne: "sous_categorie",
        entrees: [
          { label: "Crèmes, laits, baumes corps", slug: "cremes-laits-baumes-corps" },
          { label: "Huiles corps", slug: "huiles-corps" },
          { label: "Gommages corps", slug: "gommages-corps" },
          { label: "Déodorants", slug: "deodorants" },
          { label: "Soins mains, pieds", slug: "soins-mains-pieds" },
          { label: "Gels douche, crèmes lavantes", slug: "gels-douche-cremes-lavantes" },
          { label: "Savons", slug: "savons" },
          { label: "Huiles, gels de massage", slug: "huiles-gels-massage" },
          { label: "Soins solaires", slug: "soins-solaires" },
        ],
      },
      {
        id: "preoccupation-corps",
        label: "Préoccupation corps",
        colonne: "preoccupation",
        entrees: [
          { label: "Sécheresse, déshydratation", slug: "secheresse-deshydratation-corps" },
          { label: "Fermeté, cellulite, vergetures", slug: "fermete-cellulite-vergetures" },
          { label: "Taches brunes, hyperpigmentation", slug: "taches-brunes-hyperpigmentation-corps" },
          { label: "Irritations, démangeaisons, rougeurs", slug: "irritations-demangeaisons-rougeurs" },
          { label: "Transpiration excessive", slug: "transpiration-excessive" },
          { label: "Poils incarnés", slug: "poils-incarnes" },
          { label: "Pieds secs, abîmés", slug: "pieds-secs-abimes" },
        ],
      },
      {
        id: "thematique-corps",
        label: "Thématique",
        colonne: "preoccupation",
        entrees: [
          { label: "Soins du sportif", slug: "soins-sportif" },
          { label: "Maternité", slug: "maternite" },
        ],
      },
    ],
  },
  {
    slug: "cheveux",
    label: "Cheveux",
    groupes: [
      {
        id: "soin-cheveux",
        label: "Soin cheveux",
        colonne: "sous_categorie",
        entrees: [
          { label: "Shampoings", slug: "shampoings" },
          { label: "Après-shampoings, masques", slug: "apres-shampoings-masques" },
          { label: "Sérums cheveux", slug: "serums-cheveux" },
          { label: "Huiles cheveux", slug: "huiles-cheveux" },
          { label: "Soins sans rinçage", slug: "soins-sans-rincage" },
          { label: "Pousse de cheveux", slug: "pousse-cheveux" },
        ],
      },
      {
        id: "type-de-cheveux",
        label: "Type de cheveux",
        colonne: "type_cheveux",
        entrees: [
          { label: "Cheveux secs", slug: "cheveux-secs" },
          { label: "Cheveux gras", slug: "cheveux-gras" },
          { label: "Cheveux normaux", slug: "cheveux-normaux" },
          { label: "Cheveux mixtes (pointes sèches, racines grasses)", slug: "cheveux-mixtes" },
          { label: "Cheveux ondulés, bouclés ou texturés", slug: "cheveux-ondules-boucles-textures" },
          { label: "Cheveux crépus, frisés", slug: "cheveux-crepus-frises" },
        ],
      },
      {
        id: "preoccupation-cheveux",
        label: "Préoccupation cheveux",
        colonne: "preoccupation",
        entrees: [
          { label: "Chute de cheveux", slug: "chute-cheveux" },
          { label: "Cheveux secs, abîmés, cassants, fourchus", slug: "cheveux-abimes-cassants-fourchus" },
          { label: "Douceur et brillance", slug: "douceur-brillance" },
          { label: "Définition et hydratation des boucles", slug: "definition-hydratation-boucles" },
          { label: "Manque de volume", slug: "manque-volume" },
          { label: "Cuir chevelu gras, pellicules", slug: "cuir-chevelu-gras-pellicules" },
        ],
      },
    ],
  },
  {
    slug: "bebe-enfant",
    label: "Soin bébé",
    groupes: [
      {
        id: "soin-bebe",
        label: "Soin bébé",
        colonne: "sous_categorie",
        entrees: [
          { label: "Toilette (gels lavants, shampoings)", slug: "toilette-bebe" },
          { label: "Hydratation (laits, crèmes, baumes)", slug: "hydratation-bebe" },
          { label: "Change et érythème fessier", slug: "change-erytheme" },
          { label: "Protection solaire", slug: "protection-solaire-bebe" },
          { label: "Soins enfants", slug: "soins-enfants" },
        ],
      },
    ],
  },
];

/** Retrouve une entrée (avec son groupe et sa rubrique) à partir de sa colonne et de son slug. */
export function trouverEntree(colonne: Colonne, slug: string) {
  for (const r of taxonomie)
    for (const g of r.groupes)
      if (g.colonne === colonne) {
        const e = g.entrees.find((x) => x.slug === slug);
        if (e) return { entree: e, groupe: g, rubrique: r };
      }
  return undefined;
}
