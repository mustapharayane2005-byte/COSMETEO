import { allProducts, inFamille } from "@/data/products";
import { COLONNES, taxonomie, trouverEntree, type Colonne, type Rubrique } from "@/data/taxonomie";
import type { Product } from "@/types/catalog";

/** Filtres lus dans l'adresse : ?categorie=visage&sous_categorie=serums-visage (une valeur par paramètre). */
export type Filtres = { categorie?: string } & Partial<Record<Colonne, string>>;

type SearchParams = Record<string, string | string[] | undefined>;

/** Extrait les filtres connus d'un objet searchParams (valeurs vides ou multiples : la première non vide). */
export function lireFiltres(sp: SearchParams): Filtres {
  const un = (v: string | string[] | undefined) => (Array.isArray(v) ? v : [v]).find((x) => x && x.trim())?.trim();
  const f: Filtres = {};
  const categorie = un(sp.categorie);
  if (categorie) f.categorie = categorie;
  for (const c of COLONNES) {
    const v = un(sp[c]);
    if (v) f[c] = v;
  }
  return f;
}

export const aDesFiltres = (f: Filtres) => Object.keys(f).length > 0;

/** Produits qui respectent tous les filtres : la rubrique (famille principale ou « aussi dans ») puis chaque colonne. */
export function filtrerProduits(produits: Product[], f: Filtres): Product[] {
  return produits.filter(
    (p) => (!f.categorie || inFamille(p, f.categorie)) && COLONNES.every((c) => !f[c] || p.tags?.[c]?.includes(f[c]!)),
  );
}

export type EntreeAvecNombre = { label: string; slug: string; count: number; href: string };
export type GroupeAvecNombre = { id: string; label: string; colonne: Colonne; entrees: EntreeAvecNombre[] };
export type RubriqueAvecNombre = { slug: string; label: string; groupes: GroupeAvecNombre[] };

/**
 * Menu par rubrique : uniquement les groupes et entrées qui ont au moins un produit, avec leur nombre.
 * Une entrée sans produit n'est jamais renvoyée : aucun lien du menu ne mène à une page vide.
 * Sans argument : toutes les rubriques non vides ; avec un slug : cette rubrique seule (ou undefined si vide).
 */
export function taxonomieAvecProduits(): RubriqueAvecNombre[];
export function taxonomieAvecProduits(rubrique: string): RubriqueAvecNombre | undefined;
export function taxonomieAvecProduits(rubrique?: string): RubriqueAvecNombre[] | RubriqueAvecNombre | undefined {
  const calculer = (r: Rubrique): RubriqueAvecNombre | undefined => {
    const groupes = r.groupes
      .map((g) => ({
        id: g.id,
        label: g.label,
        colonne: g.colonne,
        entrees: g.entrees
          .map((e) => ({
            label: e.label,
            slug: e.slug,
            count: filtrerProduits(allProducts, { categorie: r.slug, [g.colonne]: e.slug }).length,
            href: `/boutique?categorie=${r.slug}&${g.colonne}=${e.slug}`,
          }))
          .filter((e) => e.count > 0),
      }))
      .filter((g) => g.entrees.length > 0);
    return groupes.length > 0 ? { slug: r.slug, label: r.label, groupes } : undefined;
  };
  if (rubrique) {
    const r = taxonomie.find((x) => x.slug === rubrique);
    return r && calculer(r);
  }
  return taxonomie.map(calculer).filter((r): r is RubriqueAvecNombre => r !== undefined);
}

/** Titre, rubrique et libellé de l'entrée la plus précise d'un jeu de filtres (pour l'en-tête de page). */
export function decrireFiltres(f: Filtres) {
  const colonne = COLONNES.find((c) => f[c]);
  const trouve = colonne ? trouverEntree(colonne, f[colonne]!) : undefined;
  const rubrique = taxonomie.find((r) => r.slug === (f.categorie ?? trouve?.rubrique.slug));
  return { entree: trouve?.entree, groupe: trouve?.groupe, rubrique };
}
