import Image from "next/image";
import Link from "next/link";
import { hero } from "@/data/home";

/** Les 3 lignes du titre (retours à la ligne fixes, chaque ligne a son masque). */
const lines = ["Votre glow up", "commence", "ici."];

// Séquence unique au chargement, en CSS pur (aucun JS : l'image et le LCP ne sont pas retardés).
// trait (0.6 s) → lignes du titre (0.9 s, décalage 120 ms) → bouton en fondu.
const EASE = "cubic-bezier(0.22,1,0.36,1)";
const LINE_START = 0.45;
const STEP = 0.12;
const BUTTON_AT = LINE_START + lines.length * STEP + 0.5;
const delay = (s: number) => ({ animationDelay: `${s}s` }) as React.CSSProperties;

/** Image plein cadre (femme à droite) ; texte à gauche sur desktop, sous l'image sur mobile. */
export default function Hero() {
  return (
    <section className="relative mx-4 text-[#FAF9F4] lg:text-[#5A534E]" aria-labelledby="hero-title">
      <div className="relative h-[clamp(520px,74svh,680px)] overflow-hidden rounded-3xl bg-[#E2DCD4] lg:aspect-auto lg:h-[calc(100svh-56px-100px-48px)] lg:max-h-[820px] lg:min-h-[640px]">
        <div className="absolute left-0 top-0 h-[126%] w-full lg:inset-0 lg:h-full">
        {/* mobile : la bande blanche du bas (≈ 20 %) est exclue par le cadrage 15/16 aligné en haut */}
        <Image
          src="/images/hero-mobile.jpg"
          alt={hero.imageAlt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[30%_top] lg:hidden"
        />
        <Image
          src="/images/hero-desktop.jpg"
          alt={hero.imageAlt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="hidden object-cover object-[right_center] lg:block"
        />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(to top, rgba(41,39,37,0.72) 0%, rgba(41,39,37,0.35) 45%, transparent 75%)" }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 lg:inset-x-auto lg:inset-y-0 lg:bottom-auto lg:inset-y-0 lg:left-0 lg:flex lg:w-[46%] lg:flex-col lg:justify-center lg:p-0 lg:pl-[72px]">
        <p className="flex items-center gap-4 font-ui text-[13px] font-semibold lg:text-sm uppercase tracking-[0.18em]">
          <span
            aria-hidden="true"
            className="block h-[1.5px] w-12 origin-left bg-[#FAF9F4] lg:bg-[#5A534E] motion-safe:animate-[heroLine_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
          />
          {hero.label}
        </p>
        <h1
          id="hero-title"
          className="mt-4 font-[family-name:var(--font-hero)] text-[clamp(2.5rem,11vw,3.25rem)] font-normal leading-none lg:mt-7 lg:leading-[0.98] tracking-[-0.01em] lg:text-[clamp(3.5rem,6vw,6.5rem)]"
        >
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.08em]">
              <span
                className="block motion-safe:animate-[heroMask_0.9s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={delay(LINE_START + i * STEP)}
              >
                {l}
              </span>
            </span>
          ))}
        </h1>
        <Link
          href={hero.primary.href}
          className="pill-fill mt-6 inline-flex h-[52px] w-full items-center justify-center gap-3 whitespace-nowrap rounded-full border-[1.5px] border-[#FAF9F4] bg-[#FAF9F4] px-9 font-ui text-base font-semibold uppercase tracking-[0.08em] text-[#5A534E] lg:mt-10 lg:h-auto lg:border-[#5A534E] lg:bg-transparent lg:py-4 [--fill:#5A534E] [--on-fill:#FAF9F4] motion-safe:animate-[heroFade_0.6s_ease-out_both] lg:w-fit"
          style={delay(BUTTON_AT)}
        >
          {hero.primary.label}
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
            <path d="M0 5h18M14 1l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
