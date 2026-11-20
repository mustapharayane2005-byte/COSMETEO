import Image from "next/image";
import Link from "next/link";
import { sections, univers } from "@/data/home";
import NoelImage from "@/components/NoelImage";
import { cadeauxActif } from "@/data/noel";
import { lienVisible } from "@/data/products";

/** « Par univers » : 3 grandes cartes photo (images actuelles ou visuels de substitution). */
export default function UniversCards() {
  // Une carte dont la famille n'a aucun produit n'est pas affichée.
  const cartes = univers.filter((u) => lienVisible(u.href));
  const cadeaux = cadeauxActif();
  if (cartes.length === 0 && !cadeaux) return null;
  const impair = (cartes.length + (cadeaux ? 1 : 0)) % 2 === 1;
  return (
    <section className="container pt-11 lg:pt-14" aria-labelledby="univers-title">
      <h2 id="univers-title" className="h2 mb-8" data-reveal>
        {sections.univers.title}
      </h2>
      <ul
        data-reveal-stagger
        className="mx-auto grid grid-cols-2 gap-3 md:max-w-[560px] md:gap-6 lg:max-w-[830px] lg:gap-[30px]"
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
        {cadeaux && (
          <li className={impair ? "col-span-2" : undefined}>
            <Link
              href="/cadeaux"
              className={`group relative block overflow-hidden rounded-3xl bg-[#173c32] ${impair ? "aspect-[8/5]" : "aspect-[4/5]"}`}
            >
              <NoelImage />
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#173c32]/70 to-transparent" />
              <svg className="absolute right-3 top-3" width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true" focusable="false">
                <path d="M17 18c-6-1-11-4-11-9 0-3 3-4 5-3 3 1 5 6 6 12z" fill="#c9a45c" />
                <path d="M17 18c6-1 11-4 11-9 0-3-3-4-5-3-3 1-5 6-6 12z" fill="#e6cf9a" />
                <circle cx="17" cy="18" r="3" fill="#c9a45c" />
                <path d="M15 21l-4 9M19 21l4 9" stroke="#c9a45c" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 font-display text-xl leading-tight text-white lg:p-6 lg:text-2xl">
                Cadeaux
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-full bg-white/90 text-base text-[#173c32] transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
