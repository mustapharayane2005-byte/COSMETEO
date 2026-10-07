import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import { hero } from "@/data/home";

const chipIcons: IconName[] = ["leaf", "cross", "truck", "shield"];

/** Titre sur 3 lignes ; chaque ligne monte derrière un masque (CSS pur). */
const lines = [
  <>Le meilleur</>,
  <>
    du <em className="font-display italic text-[#1A1A1A]">soin</em>
  </>,
  <>au quotidien</>,
];

const LINE_START = 0.15;
const STEP = 0.1;
const delay = (s: number) => ({ animationDelay: `${s}s` }) as React.CSSProperties;
const fade = "motion-safe:animate-[heroFade_0.6s_ease-out_both]";

/** Desktop : photo plein cadre, texte à droite. Mobile : photo en haut, texte dessous. */
export default function Hero() {
  return (
    <section
      className="bg-[#F8F5F0] lg:relative lg:m-4 lg:h-[clamp(460px,44vw,640px)] lg:overflow-hidden lg:rounded-3xl"
      aria-labelledby="hero-title"
    >
      <div className="relative mx-4 mt-4 aspect-[6/5] overflow-hidden rounded-2xl lg:absolute lg:inset-0 lg:m-0 lg:aspect-auto lg:rounded-none lg:[mask-image:linear-gradient(to_left,transparent_0%,#000_10%)]">
        <Image
          src={hero.imageDesktop}
          alt={hero.imageAlt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[left_center] lg:object-[left_35%]"
        />
      </div>

      <div className="p-5 text-center lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:w-[34%] lg:flex-col lg:items-center lg:justify-center lg:py-0 lg:pl-6 lg:pr-12">
        <p className="flex items-center justify-center gap-2.5 whitespace-nowrap font-ui text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A]/70">
          <span aria-hidden="true" className="h-px w-5 bg-[#1A1A1A]/70" />
          {hero.label.replace(/^—\s*/, "")}
        </p>
        <h1
          id="hero-title"
          className="mt-4 font-display text-[2rem] font-normal leading-[1.08] tracking-[-0.01em] text-[#1A1A1A] lg:text-[clamp(2rem,3.2vw,3.1rem)]"
        >
          {lines.map((l, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <span
                className="block motion-safe:animate-[heroMask_0.7s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={delay(LINE_START + i * STEP)}
              >
                {l}
              </span>
            </span>
          ))}
        </h1>
        <p className={`${fade} mt-4 font-ui text-sm leading-normal text-[#252525] lg:max-w-[340px] lg:text-base`} style={delay(0.55)}>
          {hero.subtitle}
        </p>
        <Link
          href={hero.primary.href}
          className={`${fade} group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#173C32] px-7 font-ui text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#0F2A22] lg:mt-7 lg:h-auto lg:w-fit lg:py-4`}
          style={delay(0.65)}
        >
          DÉCOUVRIR NOS PRODUITS
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
        {/* desktop : réassurance en grille 2 x 2 */}
        <ul className={`${fade} mt-6 hidden grid-cols-2 gap-x-4 gap-y-3 lg:grid`} style={delay(0.75)}>
          {hero.chips.map((c, i) => (
            <li key={c} className="flex items-center gap-2">
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#E8E2D9] bg-white text-[#1A1A1A]">
                <Icon name={chipIcons[i]} size={18} strokeWidth={1.25} />
              </span>
              <span className="font-ui text-[11px] leading-tight text-[#252525]">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
