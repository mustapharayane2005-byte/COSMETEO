import Link from "next/link";
import Media from "@/components/ui/Media";
import type { Category } from "@/types/catalog";
import s from "./CategoryCard.module.css";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={category.href} className={s.card}>
      <div className={s.thumb}>
        <Media
          src={category.image}
          alt=""
          art={category.art}
          tone={category.tone}
          variant="scene"
          sizes="(min-width: 1200px) 140px, 150px"
        />
      </div>
      <span className={s.name}>{category.name}</span>
    </Link>
  );
}
