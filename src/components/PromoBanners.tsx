import Image from "next/image";
import Link from "next/link";
import { banners } from "@/data/home";

/** Bandeau pleine largeur (max 1200 px, 260 px de haut) : texte à gauche, image à droite avec fondu. Même rendu sur mobile. */
export default function PromoBanners() {
  return (
    <section className="mx-auto w-[min(100%-40px,1200px)] lg:w-[min(100%-64px,1200px)]" aria-label="Offres et sélections">
      <ul>
        {banners.map((b) => (
          <li
            key={b.id}
            data-reveal
            className="relative flex h-[260px] items-center overflow-hidden rounded-3xl bg-[var(--pastel-rose)]"
          >
            <div
              data-reveal="image"
              className="absolute right-0 top-0 h-full w-[62%] [mask-image:linear-gradient(to_right,transparent_0%,#000_34%)]"
            >
              <Image src={b.image} alt="" fill quality={90} sizes="(min-width: 1024px) 744px, 62vw" className="object-cover object-[right_center]" />
            </div>
            <div className="relative z-[2] flex max-w-[58%] flex-col items-start gap-5 p-5 lg:max-w-[52%] lg:gap-6 lg:p-10">
              <h2 className="max-w-[18ch] font-display text-[clamp(1.25rem,0.9rem+1.8vw,2.5rem)] leading-[1.1] text-[#1A1A1A]">
                {b.title}
              </h2>
              <Link
                href={b.href}
                className="inline-flex min-h-11 items-center rounded-full bg-green px-6 font-ui text-sm font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#0f2a22] lg:min-h-12 lg:px-8"
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
