import Image from "next/image";
import Link from "next/link";
import { hero } from "@/data/home";

/** Image au-dessus du texte sur mobile ; texte à gauche et image arrondie à droite sur desktop. */
export default function Hero() {
  return (
    <section className="container pb-0 pt-5 lg:pt-8" aria-labelledby="hero-title">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sage lg:order-2 lg:aspect-[5/6] lg:max-h-[640px]">
          <Image
            src={hero.imageMobile}
            alt={hero.imageAlt}
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover object-[65%_top] lg:hidden"
          />
          <Image
            src={hero.imageDesktop}
            alt={hero.imageAlt}
            fill
            priority
            quality={85}
            sizes="50vw"
            className="hidden object-cover object-[right_center] lg:block"
          />
          {/* desktop : pastilles de réassurance à droite de l'image */}
          <ul className="absolute bottom-6 right-6 hidden flex-col items-end gap-2 lg:flex">
            {hero.chips.map((c) => (
              <li
                key={c}
                className="rounded-full bg-white px-4 py-2 font-ui text-sm font-medium text-green shadow-[0_1px_3px_rgb(23_60_50/0.12)]"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:order-1">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-rose">{hero.label}</p>
          <h1
            id="hero-title"
            className="mt-4 font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.25rem)] font-normal leading-[1.1] text-green"
          >
            {hero.title}
          </h1>
          <p className="mt-5 max-w-md font-ui text-base text-ink/80 lg:text-lg">{hero.subtitle}</p>
          <Link
            href={hero.primary.href}
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-green px-8 font-ui text-sm font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#0f2a22] max-lg:w-full"
          >
            {hero.primary.label}
          </Link>
          {/* mobile : pastilles sous le bouton */}
          <ul className="mt-6 grid grid-cols-2 gap-2 lg:hidden">
            {hero.chips.map((c) => (
              <li key={c} className="rounded-full bg-sage px-3 py-2 text-center font-ui text-xs font-medium text-green">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
