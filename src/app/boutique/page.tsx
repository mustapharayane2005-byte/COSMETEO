import type { Metadata } from "next";
import CatalogPage from "@/components/CatalogPage";
import PageShell from "@/components/PageShell";
import FilteredProductGrid from "@/components/FilteredProductGrid";
import { allProducts } from "@/data/products";
import { aDesFiltres, decrireFiltres, filtrerProduits, lireFiltres } from "@/data/taxonomie-filtres";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const filtres = lireFiltres(await searchParams);
  const { entree, rubrique } = decrireFiltres(filtres);
  const titre = entree?.label ?? rubrique?.label;
  return { title: aDesFiltres(filtres) && titre ? titre : "Boutique" };
}

export default async function ShopPage({ searchParams }: Props) {
  const filtres = lireFiltres(await searchParams);

  // Adresse filtrée (?categorie=…&sous_categorie=…) : grille filtrée avec compteur, via le système de filtres existant.
  if (aDesFiltres(filtres)) {
    const { entree, rubrique } = decrireFiltres(filtres);
    return (
      <CatalogPage
        title={entree?.label ?? rubrique?.label ?? "Boutique"}
        crumbs={[
          { label: "Boutique", href: "/boutique" },
          ...(entree && rubrique ? [{ label: rubrique.label, href: `/boutique/${rubrique.slug}` }] : []),
        ]}
        products={filtrerProduits(allProducts, filtres)}
        pastillesMarques={false}
      />
    );
  }

  return (
    <PageShell>
      {/* Titre masqué : la page s'ouvre directement sur la grille (compteur au-dessus). */}
      <h1 className="sr-only">Boutique</h1>
      <section className="container pb-[clamp(56px,8vw,112px)] pt-6 md:pt-10" aria-label="Tous nos produits">
        <FilteredProductGrid products={allProducts} columns={4} pastillesMarques={false} />
      </section>
    </PageShell>
  );
}
