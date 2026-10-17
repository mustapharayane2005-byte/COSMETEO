import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";

export const metadata: Metadata = { title: "Livraison & retours" };

const aCompleter = "[À COMPLÉTER]";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Paiement",
    body: (
      <p>
        Le paiement se fait en ligne, au moment de la commande. Moyens acceptés : Mobile Money (MTN), cartes Visa et
        Mastercard, et les autres moyens de paiement en ligne disponibles au Bénin sur notre plateforme de paiement.
      </p>
    ),
  },
  {
    title: "À la réception du colis",
    body: <p>Vérifiez l&apos;état du colis devant le livreur et signalez tout problème tout de suite.</p>,
  },
  {
    title: "Colis endommagé, erroné ou manquant",
    body: (
      <p>
        À signaler dans un délai de 24 à 48 heures après la réception, avec une photo, par WhatsApp ou par téléphone.
      </p>
    ),
  },
  {
    title: "Retours acceptés",
    body: <p>Produit erroné ou abîmé à la livraison, signalé dans le même délai de 24 à 48 heures après la réception.</p>,
  },
  {
    title: "Retours refusés",
    body: <p>Produit ouvert, utilisé ou descellé, pour des raisons d&apos;hygiène et de santé.</p>,
  },
  {
    title: "Remboursement ou échange",
    body: (
      <ul className="grid gap-1">
        <li>Délai : {aCompleter}</li>
        <li>Mode de remboursement : {aCompleter}</li>
      </ul>
    ),
  },
  {
    title: "Contact",
    body: (
      <>
        <p>Par WhatsApp ou par téléphone.</p>
        <ul className="mt-2 grid gap-1">
          <li>Numéro : {aCompleter}</li>
          <li>Horaires : {aCompleter}</li>
        </ul>
      </>
    ),
  },
];

export default function LivraisonPage() {
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <header className="mx-auto max-w-2xl py-8 text-center md:py-14" data-reveal>
          <h1 className="h2 !text-[clamp(2.25rem,1.2rem+3.4vw,4rem)]">Livraison &amp; retours</h1>
          <p className="lead mt-3">Nous livrons partout au Bénin.</p>
        </header>

        <div className="mx-auto grid max-w-2xl gap-4">
          {sections.map((s) => (
            <section
              key={s.title}
              className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(23,60,50,0.06),0_6px_18px_rgba(23,60,50,0.05)]"
            >
              <h2 className="font-display text-2xl text-[#1A1A1A]">{s.title}</h2>
              <div className="mt-2 leading-relaxed">{s.body}</div>
            </section>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/boutique" variant="secondary">
            DÉCOUVRIR LA BOUTIQUE
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
