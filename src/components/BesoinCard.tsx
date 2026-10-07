import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { pastel } from "@/data/pastels";
import type { Besoin } from "@/types/catalog";

/** Carte « besoin » : pastille d'icône, nom, résumé, flèche. Vraie page : /besoins/<slug>. */
export default function BesoinCard({ besoin, index = 0 }: { besoin: Besoin; index?: number }) {
  return (
    <Link
      href={`/besoins/${besoin.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-[#EDE8E0] bg-white p-5 shadow-[0_1px_2px_rgba(23,60,50,0.06),0_6px_18px_rgba(23,60,50,0.05)] transition-[border-color,transform] duration-200 lg:hover:-translate-y-0.5 lg:hover:border-[#173C32]"
    >
      <span style={{ backgroundColor: pastel(index) }} className="grid size-12 place-items-center rounded-full text-[#1A1A1A]">
        <Icon name={besoin.icone} size={24} strokeWidth={1.25} />
      </span>
      <h3 className="mt-4 font-display text-xl leading-tight text-[#1A1A1A]">{besoin.name}</h3>
      <p className="mt-2 line-clamp-2 pr-6 font-ui text-sm leading-snug text-[#252525]">{besoin.resume}</p>
      <span
        aria-hidden="true"
        className="absolute bottom-4 right-5 text-[#1A1A1A] transition-transform duration-200 group-hover:translate-x-[3px]"
      >
        →
      </span>
    </Link>
  );
}
