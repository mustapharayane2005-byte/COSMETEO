import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import ProductGrid from "@/components/ProductGrid";
import { articles, conseilsDisclaimer, getArticle } from "@/data/conseils";
import { getProduct } from "@/data/products";
import type { Product } from "@/types/catalog";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  return a ? { title: a.title, description: a.summary } : { title: "Conseils" };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const recommended = article.recommended.map(getProduct).filter((p): p is Product => Boolean(p));

  return (
    <PageShell>
      <article className="container pb-[clamp(56px,8vw,112px)]">
        <header className="max-w-2xl py-8 md:py-14">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-xs text-[var(--muted)]">
            <Link href="/conseils" className="hover:underline">
              Conseils
            </Link>{" "}
            /
          </nav>
          <h1 className="h2 !text-[clamp(2rem,1.2rem+3vw,3.5rem)]">{article.title}</h1>
          <p className="lead mt-4">{article.summary}</p>
        </header>

        <div className="max-w-2xl">
          {article.sections.map((s) => (
            <section key={s.heading} className="mb-8">
              <h2 className="font-display text-2xl text-green">{s.heading}</h2>
              <p className="mt-2 leading-relaxed">{s.text}</p>
            </section>
          ))}
        </div>

        {recommended.length > 0 && (
          <section className="mt-14" aria-labelledby="reco-title">
            <h2 id="reco-title" className="h2 mb-8">
              Produits recommandés
            </h2>
            <ProductGrid products={recommended} columns={4} />
          </section>
        )}

        <p className="mt-12 border-t border-line pt-6 text-sm text-[var(--muted)]">{conseilsDisclaimer}</p>
      </article>
    </PageShell>
  );
}
