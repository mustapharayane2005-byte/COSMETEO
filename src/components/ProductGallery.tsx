"use client";

import { useRef, useState } from "react";
import Media from "@/components/ui/Media";
import type { ArtShape, Product } from "@/types/catalog";

type Frame = { src?: string; variant: "packshot" | "scene"; art: ArtShape[] };

/** Desktop : grandes images empilées. Mobile : carrousel swipe (scroll-snap) avec pastilles. */
export default function ProductGallery({ product }: { product: Product }) {
  const rail = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const frames: Frame[] = product.images.length
    ? product.images.map((src) => ({ src, variant: "packshot", art: [product.art] }))
    : [{ variant: "packshot", art: [product.art] }];

  return (
    <div>
      <div
        ref={rail}
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] md:grid md:gap-4 md:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {frames.map((f, i) => (
          <div key={i} className="aspect-[4/5] w-full shrink-0 snap-center overflow-hidden rounded-3xl md:w-auto">
            <Media
              src={f.src}
              alt={`${product.name} — vue ${i + 1}`}
              art={f.art}
              tone={product.tone}
              placeholder={{ brand: product.brand, name: product.name }}
              variant={f.variant}
              contain
              priority={i === 0}
              sizes="(min-width: 768px) 50vw, 92vw"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2 md:hidden" aria-hidden="true">
        {frames.map((_, i) => (
          <span key={i} className={`size-1.5 rounded-full transition-colors ${i === index ? "bg-green" : "bg-[var(--line-strong)]"}`} />
        ))}
      </div>
    </div>
  );
}
