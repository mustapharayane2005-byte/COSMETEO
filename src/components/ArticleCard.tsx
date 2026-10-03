import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/catalog";

/** Carte d'article : photo 16/10 avec pastille numérotée, ou fond de couleur avec gros numéro. */
export default function ArticleCard({ article, index, heading: H = "h3" }: { article: Article; index: number; heading?: "h2" | "h3" }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Link
      href={`/conseils/${article.slug}`}
      className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(23,60,50,0.06),0_6px_18px_rgba(23,60,50,0.05)]"
    >
      <div className={`relative aspect-[16/10] overflow-hidden ${article.image ? "bg-sage" : index % 2 ? "bg-blush" : "bg-sage"}`}>
        {article.image ? (
          <>
            <Image
              src={article.image}
              alt={article.imageAlt ?? ""}
              fill
              quality={85}
              sizes="(min-width:1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-[400ms] ease-out motion-reduce:transition-none lg:group-hover:scale-[1.03]"
              style={{ objectPosition: article.imagePosition ?? "center" }}
            />
            <span
              aria-hidden="true"
              className="absolute left-3 top-3 grid size-8 place-items-center rounded-full bg-white font-display text-sm text-green"
            >
              {num}
            </span>
          </>
        ) : (
          <span className="grid h-full place-items-center font-display text-5xl text-green/40" aria-hidden="true">
            {num}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <H className="font-display text-xl leading-tight text-green">{article.title}</H>
        <p className="mt-2 text-sm text-[var(--muted)]">{article.summary}</p>
      </div>
    </Link>
  );
}
