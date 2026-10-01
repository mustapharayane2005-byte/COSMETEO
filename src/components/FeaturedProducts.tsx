import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import MaskTitle from "@/components/ui/MaskTitle";
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
  return (
    <article
      className={`grid overflow-hidden rounded-3xl lg:h-[min(calc(100svh-120px),820px)] lg:min-h-[600px] lg:grid-cols-2 ${
        index === 0 ? "lg:sticky lg:top-4" : "relative z-10"
      }`}
    >
      {photo ? (
        <RevealImage
          src={photo}
          alt={alt}
          sizes="50vw"
          imgClassName={index === 0 ? "object-[center_35%]" : "object-[center_5%]"}
          className={`aspect-[4/5] lg:aspect-auto ${imageLeft ? "lg:order-1" : "lg:order-2"}`}
        />
      ) : (
        <div className={`relative aspect-[4/5] lg:aspect-auto ${imageLeft ? "lg:order-1" : "lg:order-2"}`}>
          <Media alt={alt} art={product.art} tone={product.tone} variant="scene" sizes="50vw" />
        </div>
      )}
      <Reveal
        className={`flex flex-col justify-end bg-[#F2F0EB] p-6 font-ui text-[#5A534E] lg:p-12 ${
          imageLeft ? "lg:order-2" : "lg:order-1"
        }`}
      >
        {index === 0 && (
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.02em]">{sections.bestSellers.title}</p>
        )}
        <h3 className="text-[clamp(2rem,3vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
          <MaskTitle>{product.featuredTitle ?? product.name.toLowerCase()}</MaskTitle>
        </h3>
        <p className="mt-6 max-w-[520px] text-lg leading-[1.5]">{product.featuredText ?? product.shortDescription}</p>
        <Link
          href={`/produit/${product.slug}`}
          className="pill-fill mt-8 inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-[#5A534E] px-8 py-[14px] text-lg font-semibold uppercase [--fill:#5A534E] [--on-fill:#FAF9F4]"
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
    <section className="m-4 flex flex-col gap-4" aria-label={sections.bestSellers.title}>
      {featuredProducts.map((p, i) => (
        <Block key={p.slug} product={p} index={i} />
      ))}
    </section>
  );
}
