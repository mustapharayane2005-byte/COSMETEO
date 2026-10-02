import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import { hero } from "@/data/home";

/** Placeholders : hero-desktop / hero-mobile. Pour les visuels « pharma », renommer en hero-pharma-*.jpg dans data/home.ts. */
const chipIcons: IconName[] = ["leaf", "cross", "truck", "shield"];
const fade = "motion-safe:animate-[heroIn_0.6s_ease-out_both]";
const delay = (s: number) => ({ animationDelay: `${s}s` }) as React.CSSProperties;
const label = "font-ui text-[10px] font-medium uppercase tracking-[0.2em] text-[#D99A9A] lg:text-xs";

/** Bannière unique : texte à gauche, image à droite avec fondu ; même structure sur mobile et desktop. */
export default function Hero() {
  return (
    <section
      className="relative m-4 h-[250px] overflow-hidden rounded-2xl bg-[linear-gradient(100deg,#F8F5F0_0%,#F6EDE8_60%,#F1E3DC_100%)] lg:h-[400px] lg:min-h-[360px] lg:max-h-[440px] lg:rounded-3xl"
      aria-labelledby="hero-title"
    >
      {/* images (le texte passe par-dessus) */}
      <div className="absolute right-0 top-0 h-full w-[52%] [mask-image:linear-gradient(to_right,transparent_0%,#000_35%)] lg:hidden">
        <Image
          src={hero.imageMobile}
          alt={hero.imageAlt}
          fill
          priority
          quality={85}
          sizes="52vw"
          className="object-cover object-[70%_center]"
        />
      </div>
      <div className="absolute right-0 top-0 hidden h-full w-[62%] [mask-image:linear-gradient(to_right,transparent_0%,#000_38%)] lg:block">
        <Image
          src={hero.imageDesktop}
          alt={hero.imageAlt}
          fill
          priority
          quality={85}
          sizes="62vw"
          className="object-cover object-[right_center]"
        />
      </div>

      <div className="relative z-10 flex h-full w-[58%] flex-col justify-center p-5 lg:w-[46%] lg:py-0 lg:pl-14 lg:pr-0">
        <p className={`${label} ${fade} flex items-center gap-2.5 whitespace-nowrap`}>
          <span aria-hidden="true" className="hidden h-px w-5 bg-[#D99A9A] lg:block" />
          <span className="lg:hidden">VOTRE PARAPHARMACIE BEAUTÉ</span>
          <span className="hidden lg:inline">{hero.label}</span>
        </p>
        <h1
          id="hero-title"
          className={`${fade} mt-2.5 font-display text-[26px] font-normal leading-[1.1] text-[#173C32] lg:mt-4 lg:text-[clamp(2.4rem,3.6vw,3.4rem)] lg:leading-[1.08]`}
          style={delay(0.08)}
        >
          Des soins experts{" "}
          <br className="hidden lg:block" />
          pour une beauté{" "}
          <br className="hidden lg:block" />
          au quotidien
        </h1>
        <p
          className={`${fade} mt-2 line-clamp-2 font-ui text-xs leading-[1.4] text-[#252525] lg:mt-4 lg:max-w-[380px] lg:text-base lg:leading-[1.5]`}
          style={delay(0.16)}
        >
          <span className="lg:hidden">{hero.subtitleMobile}</span>
          <span className="hidden lg:inline">{hero.subtitle}</span>
        </p>
        <Link
          href={hero.primary.href}
          className={`${fade} group mt-3 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#173C32] px-5 font-ui text-[13px] font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0F2A22] lg:mt-7 lg:h-auto lg:px-7 lg:py-4 lg:uppercase`}
          style={delay(0.24)}
        >
          <span className="lg:hidden">Découvrir</span>
          <span className="hidden lg:inline">DÉCOUVRIR NOS PRODUITS</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* desktop : pastilles de réassurance à l'extrême droite */}
      <ul className="absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-5 lg:flex">
        {hero.chips.map((c, i) => (
          <li key={c} className="flex w-[84px] flex-col items-center gap-1.5 text-center">
            <span className="grid size-11 place-items-center rounded-full border border-[#E8E2D9] bg-white text-[#173C32]">
              <Icon name={chipIcons[i]} size={20} strokeWidth={1.25} />
            </span>
            <span className="font-ui text-[11px] leading-tight text-[#252525]">{c}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
