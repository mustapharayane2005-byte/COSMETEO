import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { articles } from "@/data/conseils";
import { sections } from "@/data/home";

/** 3 articles à la une. */
export default function ConseilsHighlights() {
  return (
    <section className="mt-11 bg-[var(--pastel-sable)] py-11 lg:mt-14 lg:py-14" aria-labelledby="conseils-title">
      <div className="container">
      <header className="mb-8 flex flex-col items-center gap-3 text-center" data-reveal>
        <h2 id="conseils-title" className="h2">
          {sections.conseils.title}
        </h2>
        <Link href={sections.conseils.href} className="shrink-0 pb-1 text-sm font-semibold text-[#1A1A1A] hover:underline">
          {sections.conseils.cta}
        </Link>
      </header>
      <ul data-reveal className="-mx-[var(--gutter)] flex snap-x snap-proximity gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[var(--gutter)] pb-3 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [touch-action:pan-x_pan-y] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {articles.slice(0, 3).map((a, i) => (
          <li key={a.slug} className="w-[78%] shrink-0 snap-start md:w-auto">
            <ArticleCard article={a} index={i} />
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
