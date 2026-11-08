import type { Metadata } from "next";
import BesoinsBlock from "@/components/BesoinsBlock";
import CatalogPage from "@/components/CatalogPage";
import FamilyGrid from "@/components/FamilyGrid";
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
      />
    );
  }

  return (
    <PageShell>
      <div className="container pt-8 md:pt-14">
        <h1 className="h2 !text-[clamp(2.25rem,1.2rem+3.4vw,4rem)]">Boutique</h1>
        <p className="lead mx-auto mt-3 max-w-xl">Tous nos soins et produits de beauté.</p>
      </div>
      <BesoinsBlock />
      <section className="container pb-10" aria-label="Familles de produits">
        <FamilyGrid />
      </section>
      <section className="container pb-[clamp(56px,8vw,112px)] pt-6" aria-labelledby="all-title">
        <h2 id="all-title" className="h2 mb-8">
          Tous nos produits
        </h2>
        <FilteredProductGrid products={allProducts} columns={4} />
      </section>
    </PageShell>
  );
}
