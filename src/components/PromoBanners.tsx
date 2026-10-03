import Image from "next/image";
import Link from "next/link";
import { banners } from "@/data/home";

/** Deux bannières côte à côte (empilées sur mobile). Images en lazy loading, sans parallax ni zoom. */
export default function PromoBanners() {
  return (
    <section className="container" aria-label="Offres et sélections">
      <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {banners.map((b) => (
          <li
            key={b.id}
            data-reveal
            className={`relative flex flex-col overflow-hidden rounded-3xl lg:min-h-[280px] ${
              b.theme === "blush" ? "bg-[#F5E4E2]" : "bg-[#E3EBE4]"
            }`}
          >
            {/* mobile : image en haut */}
            <div data-reveal="image" className="relative aspect-[4/3] w-full lg:hidden">
              <Image src={b.imageMobile} alt="" fill quality={90} sizes="100vw" className="object-cover object-[center_20%]" />
            </div>
            {/* desktop : image à droite, fondu à gauche */}
            <div data-reveal="image" className="absolute right-0 top-0 hidden h-full w-[62%] [mask-image:linear-gradient(to_right,transparent_0%,#000_34%)] lg:block">
              <Image
                src={b.imageDesktop}
                alt=""
                fill
                quality={90}
                sizes="40vw"
                className="object-cover object-[right_center]"
              />
            </div>

            <div className="relative z-[2] flex flex-1 flex-col items-start justify-between gap-8 p-5 lg:max-w-[52%] lg:p-10">
              <h2 className="max-w-[18ch] font-display text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] leading-[1.1] text-green">
                {b.title}
              </h2>
              <Link
                href={b.href}
                className="inline-flex min-h-12 items-center rounded-full bg-green px-8 font-ui text-sm font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#0f2a22]"
              >
                {b.cta}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
