import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import RevealImage from "@/components/ui/RevealImage";
import Reveal from "@/components/ui/Reveal";
import Media from "@/components/ui/Media";
import { sections } from "@/data/home";
import { featuredProducts } from "@/data/products";
import type { Product } from "@/types/catalog";

const hasFile = (src?: string) => Boolean(src) && existsSync(path.join(process.cwd(), "public", src as string));

function Block({ product, index }: { product: Product; index: number }) {
  const imageLeft = index % 2 === 1;
  const photo = hasFile(product.featuredImage) ? product.featuredImage : undefined;
  const alt = `${product.name} — ${product.brand}`;
  const label = index === 0 ? sections.bestSellers.title : null;
  const title = product.featuredTitle ?? product.name.toLowerCase();
  return (
    <article className="flex flex-col lg:grid lg:overflow-hidden lg:rounded-3xl lg:h-[min(calc(100svh-120px),820px)] lg:min-h-[600px] lg:grid-cols-2">
      {/* mobile : label + titre au-dessus de la photo (la version desktop est dans le bloc texte) */}
      <div className="mb-5 font-ui text-[#5A534E] lg:hidden">
        {label && <p className="mb-4 text-sm font-semibold uppercase tracking-[0.02em]">{label}</p>}
        <h3 className="text-[32px] font-bold leading-[1.1] tracking-[-0.02em]">{title}</h3>
      </div>
      {photo ? (
        <RevealImage
          src={photo}
          alt={alt}
          sizes="50vw"
          imgClassName={index === 0 ? "object-[center_35%]" : "object-[center_5%]"}
          className={`aspect-[4/5] rounded-3xl lg:aspect-auto lg:rounded-none ${imageLeft ? "lg:order-1" : "lg:order-2"}`}
        />
      ) : (
        <div className={`relative aspect-[4/5] overflow-hidden rounded-3xl lg:aspect-auto lg:rounded-none ${imageLeft ? "lg:order-1" : "lg:order-2"}`}>
          <Media alt={alt} art={product.art} tone={product.tone} variant="scene" sizes="50vw" />
        </div>
      )}
      <Reveal
        className={`flex flex-col justify-end pt-5 font-ui text-[#5A534E] lg:bg-[#F2F0EB] lg:p-12 ${
          imageLeft ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="hidden lg:block">
          {label && <p className="mb-4 text-sm font-semibold uppercase tracking-[0.02em]">{label}</p>}
          <h3 className="text-[clamp(2rem,3vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">{title}</h3>
        </div>
        <p className="max-w-[520px] text-[17px] leading-[1.5] lg:mt-6 lg:text-lg">{product.featuredText ?? product.shortDescription}</p>
        <Link
          href={`/produit/${product.slug}`}
          className="pill-fill mt-6 inline-flex lg:mt-8 w-fit items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-[#5A534E] px-8 py-[14px] text-lg font-semibold uppercase [--fill:#5A534E] [--on-fill:#FAF9F4]"
        >
          {product.featuredCta ?? "DÉCOUVRIR"}
        </Link>
      </Reveal>
    </article>
  );
}

/** « Nos incontournables » : 2 grands blocs produit, image et texte alternés (image toujours en haut sur mobile). */
export default function FeaturedProducts() {
  return (
    <section className="mx-5 mt-[72px] flex flex-col gap-12 lg:m-4 lg:gap-4" aria-label={sections.bestSellers.title}>
      {featuredProducts.map((p, i) => (
        <Block key={p.slug} product={p} index={i} />
      ))}
    </section>
  );
}
