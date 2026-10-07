import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { besoins, getBesoin } from "@/data/besoins";
import { conseilsDisclaimer } from "@/data/conseils";
import { allProducts } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return besoins.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBesoin(slug);
  return b ? { title: b.name, description: b.resume } : { title: "Par besoin" };
}

export default async function BesoinPage({ params }: Props) {
  const { slug } = await params;
  const besoin = getBesoin(slug);
  if (!besoin) notFound();
  return (
    <CatalogPage
      title={besoin.name}
      intro={besoin.resume}
      crumbs={[
        { label: "Que recherchez-vous ?", href: "/besoins" },
      ]}
      products={allProducts.filter((p) => p.besoins.includes(slug))}
      after={<p className="mt-12 border-t border-line pt-6 text-sm text-[var(--muted)]">{conseilsDisclaimer}</p>}
    >
      <section className="mx-auto mb-12 max-w-2xl rounded-2xl border border-line bg-[#FAF8F4] p-6" aria-labelledby="tips-title">
        <h2 id="tips-title" className="font-display text-2xl text-[#1A1A1A]">
          Nos conseils
        </h2>
        <ul className="mt-3 grid gap-2 text-sm leading-relaxed">
          {besoin.conseils.map((c) => (
            <li key={c} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#1A1A1A]" />
              {c}
            </li>
          ))}
        </ul>
      </section>
    </CatalogPage>
  );
}
