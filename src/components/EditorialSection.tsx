import Button from "@/components/ui/Button";
import MaskTitle from "@/components/ui/MaskTitle";
import RevealImage from "@/components/ui/RevealImage";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import { editorial } from "@/data/home";
import s from "./EditorialSection.module.css";

export default function EditorialSection() {
  return (
    <section className={s.section} aria-labelledby="edito-title">
      <div className={s.grid}>
        <div className={s.image}>
          <RevealImage
            src={editorial.image}
            alt={editorial.imageAlt}
            sizes="50vw"
            reveal="iris"
            imgClassName="object-[center_30%]"
            className={s.arch}
          />
          {/* sceau tournant : à cheval entre l'arche et la colonne texte, masqué sur mobile */}
          <svg className={s.seal} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <circle cx="60" cy="60" r="60" fill="#FAF9F4" />
            <g className={s.sealText}>
              <defs>
                <path id="seal-circle" d="M60 60 m-43 0 a43 43 0 1 1 86 0 a43 43 0 1 1 -86 0" />
              </defs>
              <text fill="#5A534E" fontSize="10" fontWeight="600" letterSpacing="1.4">
                <textPath href="#seal-circle" textLength="266" lengthAdjust="spacing">
                  POUR TOUTES LES PEAUX ·{"\u00A0"}
                </textPath>
              </text>
            </g>
            <path
              d="M60 74c-9-6-12-16-8-26 8 3 14 11 14 20 0 2-1 4-2 6-1 0-3 0-4 0Zm0 0V52"
              fill="none"
              stroke="#5A534E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Reveal className={s.copy} delay={0.12}>
          <p className={s.eyebrow}>{editorial.eyebrow}</p>
          <h2 id="edito-title" className={s.title}>
            <MaskTitle>{editorial.title}</MaskTitle>
          </h2>
          <p className={s.text}>{editorial.text}</p>
          <ul className={s.tags}>
            {editorial.tags.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="pill-fill">
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href={editorial.cta.href} variant="light">
            {editorial.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
