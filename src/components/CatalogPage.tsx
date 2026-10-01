import Link from "next/link";
import PageShell from "@/components/PageShell";
import ProductGrid from "@/components/ProductGrid";
import Button from "@/components/ui/Button";
import { categories } from "@/data/categories";
import type { Product } from "@/types/catalog";

type Props = {
  title: string;
  intro?: string;
  products: Product[];
  /** Affiche les filtres par catégorie ; `active` = slug courant ("" = tout). */
  filter?: { active: string };
};

const chip = "inline-flex min-h-12 shrink-0 items-center rounded-full border px-5 text-[1.125rem] font-semibold uppercase tracking-[0.02em] transition-colors";

/** Liste produits partagée par /boutique, /boutique/[categorie], /promotions et /nouveautes. */
export default function CatalogPage({ title, intro, products, filter }: Props) {
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <header className="py-8 md:py-14" data-reveal>
          <h1 className="h2 !text-[clamp(2.25rem,1.2rem+3.4vw,4rem)]">{title}</h1>
          {intro && <p className="lead mt-3 max-w-xl">{intro}</p>}
        </header>

        {filter && (
          <nav
            aria-label="Catégories"
            className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {[{ slug: "", name: "Tout", href: "/boutique" }, ...categories.map((c) => ({ slug: c.slug, name: c.name, href: c.href }))].map(
              (c) => (
                <Link
                  key={c.slug || "all"}
                  href={c.href}
                  aria-current={filter.active === c.slug ? "page" : undefined}
                  className={`${chip} ${
                    filter.active === c.slug
                      ? "border-green bg-green text-ivory"
                      : "border-[var(--line-strong)] text-green hover:border-green"
                  }`}
                >
                  {c.name}
                </Link>
              ),
            )}
          </nav>
        )}

        {products.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-[var(--muted)]">
              {products.length} produit{products.length > 1 ? "s" : ""}
            </p>
            <ProductGrid products={products} columns={4} />
          </>
        ) : (
          <div className="panel grid place-items-center gap-5 px-6 py-20 text-center">
            <p className="h2">Bientôt disponible</p>
            <p className="lead">Cette sélection arrive très vite.</p>
            <Button href="/boutique" variant="secondary">
              VOIR TOUTE LA BOUTIQUE
            </Button>
          </div>
        )}
      </section>
    </PageShell>
  );
}
