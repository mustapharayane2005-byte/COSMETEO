import MaskTitle from "@/components/ui/MaskTitle";
import RevealImage from "@/components/ui/RevealImage";
import ScrollWords from "@/components/ui/ScrollWords";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

/** Bandeau « Toutes les peaux » : image puis bloc texte 2 colonnes (desktop), empilé sur mobile. */
export default function SkinTonesBanner() {
  return (
    <section className="m-4 font-ui text-[#5A534E]" aria-labelledby="skin-title">
      <Reveal>
      <div className="grid gap-6 px-6 pb-6 pt-6 lg:grid-cols-2 lg:items-end lg:gap-12 lg:bg-[#EDECE8] lg:px-12 lg:pb-6 lg:pt-12">
        <div>
          <p className="text-lg font-semibold uppercase tracking-[0.02em]">Pour tous les types de peau</p>
          <h2
            id="skin-title"
            className="mt-3 text-[2rem] font-normal leading-[1.1] tracking-[-0.01em] text-balance lg:text-[clamp(2.5rem,4vw,4rem)]"
          >
            <MaskTitle>Une beauté pour chaque peau.</MaskTitle>
          </h2>
        </div>
        <div className="flex flex-col items-start gap-6 lg:items-start">
          <ScrollWords
            className="max-w-[520px] text-lg leading-[1.5]"
            text="Du teint le plus clair au plus profond, trouvez les soins pensés pour vous."
          />
          <Link
            href="/boutique"
            className="pill-fill inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-[#5A534E] px-8 py-[14px] text-lg font-semibold uppercase tracking-[0.02em] [--fill:#5A534E] [--on-fill:#FAF9F4] lg:w-auto"
          >
            TROUVER MES SOINS
          </Link>
        </div>
      </div>
      </Reveal>
      <RevealImage
        src="/images/peaux.jpg"
        alt="Femmes aux carnations variées"
        sizes="100vw"
        parallax
        imgClassName="lg:object-[center_52%]"
        className="aspect-square rounded-3xl lg:aspect-video lg:max-h-[720px]"
      />
    </section>
  );
}
