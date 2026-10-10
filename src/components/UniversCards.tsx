import Image from "next/image";
import Link from "next/link";
import { sections, univers } from "@/data/home";
import { lienVisible } from "@/data/products";

/** « Par univers » : 3 grandes cartes photo (images actuelles ou visuels de substitution). */
export default function UniversCards() {
  // Une carte dont la famille n'a aucun produit n'est pas affichée.
  const cartes = univers.filter((u) => lienVisible(u.href));
  if (cartes.length === 0) return null;
  return (
    <section className="container pt-11 lg:pt-14" aria-labelledby="univers-title">
      <h2 id="univers-title" className="h2 mb-8" data-reveal>
        {sections.univers.title}
      </h2>
      <ul
        data-reveal-stagger
        style={{ "--n": cartes.length } as React.CSSProperties}
        className="grid grid-cols-2 gap-3 md:mx-auto md:max-w-[calc(var(--n)*25%)] md:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-6"
      >
        {cartes.map((u) => (
          <li key={u.name}>
            <Link href={u.href} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl">
              {u.image ? (
                <Image
                  src={u.image}
                  alt={u.imageAlt ?? ""}
                  fill
                  quality={85}
                  sizes="(min-width:768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-[400ms] ease-out motion-reduce:transition-none lg:group-hover:scale-[1.03]"
                  style={{ objectPosition: u.imagePosition }}
                />
              ) : (
                <span aria-hidden="true" className="absolute inset-0 bg-[#2B2B2B]" />
              )}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#173c32]/70 to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 font-display text-xl leading-tight text-white lg:p-6 lg:text-2xl">
                {u.name}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
