import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { articles, conseilsDisclaimer } from "@/data/conseils";

export const metadata: Metadata = { title: "Conseils" };

export default function ConseilsPage() {
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <header className="py-8 text-center md:py-14">
          <h1 className="h2 !text-[clamp(2.25rem,1.2rem+3.4vw,4rem)]">Conseils</h1>
          <p className="lead mx-auto mt-3 max-w-xl">Nos guides pour mieux comprendre vos soins.</p>
        </header>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {articles.map((a, i) => (
            <li key={a.slug}>
              <Link
                href={`/conseils/${a.slug}`}
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-line shadow-[0_1px_2px_rgba(23,60,50,0.06),0_6px_18px_rgba(23,60,50,0.05)] card-lift"
              >
                <div className={`grid aspect-[16/9] place-items-center ${i % 2 ? "bg-blush" : "bg-sage"}`}>
                  <span className="font-display text-5xl text-green/40" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-display text-2xl leading-tight text-green">{a.title}</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">{a.summary}</p>
                  <span className="mt-auto pt-4 text-sm font-semibold text-green">Lire l&apos;article →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-[var(--muted)]">{conseilsDisclaimer}</p>
      </section>
    </PageShell>
  );
}
