import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { besoins, getBesoin } from "@/data/besoins";
import { allProducts } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return besoins.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: getBesoin(slug)?.name ?? "Par besoin" };
}

export default async function BesoinPage({ params }: Props) {
  const { slug } = await params;
  const besoin = getBesoin(slug);
  if (!besoin) notFound();
  return (
    <CatalogPage
      title={besoin.name}
      intro={besoin.intro}
      crumbs={[{ label: "Boutique", href: "/boutique" }]}
      chips={besoins.map((b) => ({ label: b.name, href: `/besoins/${b.slug}`, active: b.slug === slug }))}
      products={allProducts.filter((p) => p.besoins.includes(slug))}
    />
  );
}
