import Image from "next/image";
import Link from "next/link";
import { sections, univers } from "@/data/home";

/** « Par univers » : 3 grandes cartes photo (images actuelles ou visuels de substitution). */
export default function UniversCards() {
  return (
    <section className="container pt-11 lg:pt-14" aria-labelledby="univers-title">
      <h2 id="univers-title" className="h2 mb-8" data-reveal>
        {sections.univers.title}
      </h2>
      <ul data-reveal-stagger className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-6">
        {univers.map((u) => (
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
