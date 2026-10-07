import Image from "next/image";
import Link from "next/link";
import Media from "@/components/ui/Media";
import { sections, univers } from "@/data/home";
import { pastel } from "@/data/pastels";

/** « Par univers » : 3 grandes cartes photo (images actuelles ou visuels de substitution). */
export default function UniversCards() {
  return (
    <section className="container pt-11 lg:pt-14" aria-labelledby="univers-title">
      <h2 id="univers-title" className="h2 mb-8" data-reveal>
        {sections.univers.title}
      </h2>
      <ul data-reveal-stagger className="grid gap-4 md:grid-cols-3 lg:gap-6">
        {univers.map((u, i) => (
          <li key={u.name}>
            <Link href={u.href} style={{ backgroundColor: pastel(i + 2) }} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl">
              {u.image ? (
                <Image
                  src={u.image}
                  alt={u.imageAlt ?? ""}
                  fill
                  quality={85}
                  sizes="(min-width:1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[400ms] ease-out motion-reduce:transition-none lg:group-hover:scale-[1.03]"
                  style={{ objectPosition: u.imagePosition }}
                />
              ) : (
                <Media alt="" art={u.art} tone={u.tone} variant="scene" sizes="(min-width: 768px) 33vw, 100vw" />
              )}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#173c32]/70 to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6 font-display text-2xl text-white">
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
