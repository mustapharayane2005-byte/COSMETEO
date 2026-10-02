import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageShell from "@/components/PageShell";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Contact" };

/** Coordonnées fictives : à remplacer par les vraies avant mise en ligne. */
const whatsapp = { label: "+229 00 00 00 00", href: "https://wa.me/22900000000" };
const email = "contact@exemple.com";

export default function ContactPage() {
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <header className="py-8 md:py-14">
          <h1 className="h2 !text-[clamp(2.25rem,1.2rem+3.4vw,4rem)]">Contact</h1>
          <p className="lead mt-3 max-w-xl">Une question sur un produit ou une commande ? Écrivez-nous.</p>
        </header>
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div className="max-w-xl">
            <ContactForm />
          </div>
          <ul className="grid content-start gap-4">
            <li className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgb(23_60_50/0.06)]">
              <span className="grid size-11 place-items-center rounded-full bg-sage text-green">
                <Icon name="whatsapp" />
              </span>
              <h2 className="mt-4 font-display text-xl text-green">WhatsApp</h2>
              <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm hover:underline">
                {whatsapp.label}
              </a>
            </li>
            <li className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgb(23_60_50/0.06)]">
              <span className="grid size-11 place-items-center rounded-full bg-blush text-green">
                <Icon name="chat" />
              </span>
              <h2 className="mt-4 font-display text-xl text-green">Email</h2>
              <a href={`mailto:${email}`} className="mt-1 block text-sm hover:underline">
                {email}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
