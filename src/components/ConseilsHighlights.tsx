import Link from "next/link";
import { articles } from "@/data/conseils";
import { sections } from "@/data/home";

/** 3 articles à la une. */
export default function ConseilsHighlights() {
  return (
    <section className="container pt-14 lg:pt-20" aria-labelledby="conseils-title">
      <header className="mb-8 flex flex-col items-center gap-3 text-center" data-reveal>
        <h2 id="conseils-title" className="h2">
          {sections.conseils.title}
        </h2>
        <Link href={sections.conseils.href} className="shrink-0 pb-1 text-sm font-semibold text-green hover:underline">
          {sections.conseils.cta}
        </Link>
      </header>
      <ul className="grid gap-4 md:grid-cols-3 lg:gap-6">
        {articles.slice(0, 3).map((a, i) => (
          <li key={a.slug} data-reveal>
            <Link
              href={`/conseils/${a.slug}`}
              className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgb(23_60_50/0.06)] transition-shadow hover:shadow-md"
            >
              <div className={`grid aspect-[16/9] place-items-center ${i % 2 ? "bg-blush" : "bg-sage"}`}>
                <span className="font-display text-5xl text-green/40" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl leading-tight text-green">{a.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{a.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
