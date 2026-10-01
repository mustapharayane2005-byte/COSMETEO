import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <div className="panel grid place-items-center gap-5 px-6 py-24 text-center md:py-32">
          <p className="eyebrow">Erreur 404</p>
          <h1 className="h2">Page introuvable.</h1>
          <p className="lead max-w-md">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
          <Button href="/" variant="secondary">
            RETOUR À L&apos;ACCUEIL
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
