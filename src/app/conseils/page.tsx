import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
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
              <ArticleCard article={a} index={i} heading="h2" />
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-[var(--muted)]">{conseilsDisclaimer}</p>
      </section>
    </PageShell>
  );
}
