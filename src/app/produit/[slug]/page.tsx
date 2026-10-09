import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchase from "@/components/ProductPurchase";
import ProductSection from "@/components/ProductSection";
import Icon from "@/components/ui/Icon";
import { categories } from "@/data/categories";
import { allProducts, getProduct, getRelated } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

/** Une page statique par produit du catalogue ; un slug inconnu affiche not-found.tsx. */
export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Produit introuvable" };
  const title = `${p.name} — ${p.brand}`;
  return {
    title,
    description: p.shortDescription,
    alternates: { canonical: `/produit/${p.slug}` },
    // l'image de partage est générée par ./opengraph-image.tsx
    openGraph: { title, description: p.shortDescription, type: "website", locale: "fr_FR", siteName: "COSMÉTÉO" },
    twitter: { card: "summary_large_image", title, description: p.shortDescription ?? p.description },
  };
}

const panel = "group border-b border-[var(--line)]";
const summary =
  "flex cursor-pointer list-none items-center justify-between py-5 text-xs font-semibold uppercase tracking-[0.06em] [&::-webkit-details-marker]:hidden";

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const category = categories.find((c) => c.slug === p.famille);
  const related = getRelated(p);
  const sections = [
    { title: "Description", body: p.description, open: true },
    { title: "Ingrédients", body: p.ingredients },
    { title: "Utilisation", body: p.howToUse },
    {
      title: "Livraison & retours",
      // À valider avec les vraies conditions (délais, frais, politique de retour).
      body: "Livraison au Bénin et à l'international. Délais et frais calculés à l'étape suivante. Retrouvez nos conditions de retour sur la page Retours.",
    },
  ].filter((s): s is { title: string; body: string; open?: boolean } => Boolean(s.body));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    brand: { "@type": "Brand", name: p.brand },
    description: p.shortDescription ?? p.description,
    ...(p.images.length > 0 && { image: p.images }),
    ...(p.price != null && {
      offers: {
        "@type": "Offer",
        priceCurrency: "XOF",
        price: p.price,
        availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    }),
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container">
        <nav aria-label="Fil d'Ariane" className="pb-5 text-xs uppercase tracking-[0.06em] text-[var(--muted)]">
          <Link href="/boutique" className="hover:underline">Boutique</Link>
          {category && (
            <>
              {" / "}
              <Link href={category.href} className="hover:underline">{category.name}</Link>
            </>
          )}
        </nav>

        <div className="grid gap-8 pb-[clamp(48px,7vw,96px)] md:grid-cols-2 md:gap-12 lg:gap-20">
          <ProductGallery product={p} />
          <div className="self-start md:sticky md:top-32">
            <ProductPurchase product={p} />
            <div className="mt-10 border-t border-[var(--line)]">
              {sections.map((s) => (
                <details key={s.title} className={panel} open={s.open}>
                  <summary className={summary}>
                    {s.title}
                    <Icon name="plus" size={18} className="transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-6 text-sm leading-relaxed text-[var(--muted)]">{s.body}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <ProductSection id="related-title" title="Vous aimerez aussi" products={related} layout="carousel" />
      )}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </PageShell>
  );
}
