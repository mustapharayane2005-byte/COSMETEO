import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";
import { placeholderPages } from "@/data/pages";

type Props = { params: Promise<{ page: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(placeholderPages).map((key) => ({ page: key.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const title = placeholderPages[page.join("/")];
  return { title: title ?? "COSMÉTÉO" };
}

/** Pages « Bientôt disponible » : compte, favoris, infos légales, routines… */
export default async function PlaceholderPage({ params }: Props) {
  const { page } = await params;
  const title = placeholderPages[page.join("/")];
  if (!title) notFound();
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <div className="panel grid place-items-center gap-5 px-6 py-24 text-center md:py-32">
          <h1 className="h2 !text-[clamp(2.25rem,1.2rem+3.4vw,4rem)]">{title}</h1>
          <p className="lead">Bientôt disponible.</p>
          <Button href="/boutique" variant="secondary">
            DÉCOUVRIR LA BOUTIQUE
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
