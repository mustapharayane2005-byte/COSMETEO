import Link from "next/link";
import { categoryIcons, Etoile } from "@/components/icons/CategoryIcons";

/** Pastille de catégorie : cercle pastel uni, icône au trait colorée, libellé noir dessous. */
export default function CategoryBubble({
  id,
  name,
  href,
  fond,
  trait,
}: {
  id: string;
  name: string;
  href: string;
  fond: string;
  trait: string;
}) {
  const Icon = categoryIcons[id] ?? Etoile;
  return (
    <Link href={href} className="group flex w-[96px] flex-col items-center md:w-[116px]">
      <span
        style={{ backgroundColor: fond, color: trait }}
        className="grid size-[88px] place-items-center rounded-full md:size-[108px] md:transition-shadow md:group-hover:shadow-[0_0_0_2px_#1A1A1A] motion-reduce:transition-none"
      >
        <Icon className="size-[46%] md:transition-transform md:group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:md:group-hover:scale-100" />
      </span>
      <span className="mt-2.5 line-clamp-2 text-center font-ui text-xs font-medium leading-snug text-[#1A1A1A] md:text-[13px]">{name}</span>
    </Link>
  );
}
