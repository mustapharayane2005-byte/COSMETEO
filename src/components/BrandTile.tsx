import Link from "next/link";
import { brandTypeLabels } from "@/data/brands";
import type { BrandType } from "@/types/catalog";

const bg: Record<BrandType, string> = {
  dermo: "bg-[#E3EBE4]",
  coreen: "bg-[#F5E4E2]",
  "grand-public": "bg-[#F3EAE0]",
};

export type BrandTileData = { slug: string; name: string; type: BrandType; count: number };

/** Carte de marque : nom en texte (jamais de logo), initiale en filigrane, nombre de produits réels. */
export default function BrandTile({ brand }: { brand: BrandTileData }) {
  const count = brand.count > 0 ? `${brand.count} produit${brand.count > 1 ? "s" : ""}` : "Bientôt disponible";
  return (
    <Link
      href={`/marques/${brand.slug}`}
      className={`group relative flex h-[124px] flex-col justify-between overflow-hidden rounded-2xl border border-[#EDE8E0] p-5 shadow-[0_1px_2px_rgba(23,60,50,0.06)] motion-reduce:transition-none lg:h-[150px] lg:transition-[transform,border-color] lg:duration-200 lg:hover:-translate-y-[3px] lg:hover:border-[#173C32] motion-reduce:lg:hover:translate-y-0 ${bg[brand.type]}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 right-3 select-none font-display text-[120px] leading-none text-[#173C32]/[0.07]"
      >
        {brand.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").charAt(0).toUpperCase()}
      </span>
      <span className="relative font-ui text-[11px] font-medium uppercase leading-none tracking-[0.12em] text-[#173C32]/65">
        {brandTypeLabels[brand.type]}
      </span>
      <span className="relative my-auto font-display text-[clamp(1.4rem,2vw,1.9rem)] font-normal leading-[1.1] text-[#173C32]">
        {brand.name}
      </span>
      <span className="relative flex items-end justify-between font-ui text-[13px] leading-none text-[#252525]/70">
        {count}
        <span aria-hidden="true" className="text-base text-[#173C32] transition-transform duration-200 motion-reduce:transition-none lg:group-hover:translate-x-[3px]">
          →
        </span>
      </span>
    </Link>
  );
}
