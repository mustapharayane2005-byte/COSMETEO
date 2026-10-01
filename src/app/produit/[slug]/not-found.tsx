import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <div className="panel grid place-items-center gap-5 px-6 py-24 text-center md:py-32">
          <p className="eyebrow">Erreur 404</p>
          <h1 className="h2">Ce produit n&apos;existe pas (ou plus).</h1>
          <p className="lead max-w-md">Il a peut-être été retiré de la boutique. Découvrez le reste de notre sélection.</p>
          <Button href="/boutique" variant="secondary">
            VOIR LA BOUTIQUE
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
