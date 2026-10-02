import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = { title: "À propos" };

/** Texte fictif : à remplacer par l'histoire réelle de COSMÉTÉO. */
const values = [
  { icon: "badge", title: "Produits authentiques", text: "Une sélection vérifiée, choisie avec exigence." },
  { icon: "chat", title: "Conseil", text: "Une équipe à votre écoute pour vous guider dans vos choix." },
  { icon: "truck", title: "Livraison", text: "Au Bénin et à l'international, avec soin." },
] as const;

export default function AboutPage() {
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <header className="max-w-2xl py-8 md:py-14">
          <h1 className="h2 !text-[clamp(2.25rem,1.2rem+3.4vw,4rem)]">À propos</h1>
        </header>

        <div className="max-w-2xl">
          <h2 className="font-display text-2xl text-green">Notre histoire</h2>
          <p className="mt-3 leading-relaxed">
            COSMÉTÉO est née d&apos;une envie simple : rendre accessibles des soins et des produits de beauté de
            confiance, pensés pour toutes les peaux. Notre parapharmacie en ligne réunit des soins du visage, du corps
            et des cheveux, ainsi que des produits de bien-être, sélectionnés un à un.
          </p>
          <p className="mt-3 leading-relaxed">
            Nous voulons vous accompagner au quotidien, avec des conseils clairs et une livraison soignée, où que vous
            soyez.
          </p>
        </div>

        <h2 className="mb-6 mt-14 font-display text-2xl text-green">Nos valeurs</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgb(23_60_50/0.06)]">
              <span className="grid size-11 place-items-center rounded-full bg-sage text-green">
                <Icon name={v.icon} />
              </span>
              <h3 className="mt-4 font-display text-xl text-green">{v.title}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{v.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Button href="/contact" variant="secondary">
            NOUS CONTACTER
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
