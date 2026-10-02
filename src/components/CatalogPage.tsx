import Link from "next/link";
import PageShell from "@/components/PageShell";
import ProductGrid from "@/components/ProductGrid";
import Button from "@/components/ui/Button";
import type { Product } from "@/types/catalog";

export type Chip = { label: string; href: string; active?: boolean };

type Props = {
  title: string;
  intro?: string;
  products: Product[];
  /** Pastilles de navigation (sous-catégories, familles…). */
  chips?: Chip[];
  /** Fil d'Ariane simple. */
  crumbs?: { label: string; href: string }[];
  /** Contenu libre entre l'en-tête et la liste. */
  children?: React.ReactNode;
};

const chipCls =
  "inline-flex min-h-11 shrink-0 items-center rounded-full border px-5 text-sm font-medium transition-colors";

/** Liste produits partagée par /boutique/…, /besoins/…, /marques/…, /promotions et /nouveautes. */
export default function CatalogPage({ title, intro, products, chips, crumbs, children }: Props) {
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <header className="py-8 md:py-14" data-reveal>
          {crumbs && (
            <nav aria-label="Fil d'Ariane" className="mb-4 flex flex-wrap gap-x-2 text-xs text-[var(--muted)]">
              {crumbs.map((c) => (
                <span key={c.href}>
                  <Link href={c.href} className="hover:underline">
                    {c.label}
                  </Link>{" "}
                  /
                </span>
              ))}
              <span aria-current="page">{title}</span>
            </nav>
          )}
          <h1 className="h2 !text-[clamp(2.25rem,1.2rem+3.4vw,4rem)]">{title}</h1>
          {intro && <p className="lead mt-3 max-w-xl">{intro}</p>}
        </header>

        {chips && chips.length > 0 && (
          <nav
            aria-label="Sous-catégories"
            className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {chips.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                aria-current={c.active ? "page" : undefined}
                className={`${chipCls} ${
                  c.active ? "border-green bg-green text-ivory" : "border-line bg-sage text-green hover:border-green"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </nav>
        )}

        {children}

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
