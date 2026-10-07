import Link from "next/link";
import { brandTypes } from "@/data/brandTypes";
import type { BrandTypeId } from "@/data/brandTypes";
import { pastel } from "@/data/pastels";

export type BrandTileData = { slug: string; name: string; types: BrandTypeId[]; featured: boolean; count: number };

const initial = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .charAt(0)
    .toUpperCase();

/** Étiquette selon l'univers principal (« Sélection » si à classer) ; le fond pastel alterne selon la position. */
function look(types: BrandTypeId[]) {
  const main = brandTypes.find((t) => t.id === types[0]);
  return { label: main?.label ?? "Sélection" };
}

/** Carte de marque : nom en texte (jamais de logo), initiale en filigrane, nombre de produits réels. */
export default function BrandTile({ brand, index = 0, large = false }: { brand: BrandTileData; index?: number; large?: boolean }) {
  const { label } = look(brand.types);
  const count = brand.count > 0 ? `${brand.count} produit${brand.count > 1 ? "s" : ""}` : "Bientôt disponible";
  const size = large
    ? "h-[190px] text-[clamp(1.5rem,2.2vw,2rem)] [--wm:140px]"
    : "h-[112px] text-[clamp(1.2rem,2vw,1.6rem)] lg:h-[130px] [--wm:100px]";
  return (
    <Link
      href={`/marques/${brand.slug}`}
      style={{ backgroundColor: pastel(index) }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EDE8E0] p-4 shadow-[0_1px_2px_rgba(23,60,50,0.06)] motion-reduce:transition-none lg:p-5 lg:transition-[transform,border-color] lg:duration-200 lg:hover:-translate-y-[3px] lg:hover:border-[#173C32] motion-reduce:lg:hover:translate-y-0 ${size}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 right-3 select-none font-display text-[length:var(--wm)] leading-none text-[#1A1A1A]/[0.07]"
      >
        {initial(brand.name)}
      </span>
      <span className="relative whitespace-nowrap font-ui text-[10px] font-medium uppercase leading-none tracking-[0.07em] text-[#1A1A1A]/65 lg:text-[11px] lg:tracking-[0.12em]">
        {label}
      </span>
      <span className="relative my-auto font-display font-normal leading-[1.1] text-[#1A1A1A]">{brand.name}</span>
      <span className="relative flex items-end justify-between gap-2 whitespace-nowrap font-ui text-xs leading-none text-[#252525]/70 lg:text-[13px]">
        {count}
        <span aria-hidden="true" className="text-base text-[#1A1A1A] transition-transform duration-200 motion-reduce:transition-none lg:group-hover:translate-x-[3px]">
          →
        </span>
      </span>
    </Link>
  );
}
