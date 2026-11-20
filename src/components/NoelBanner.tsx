"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NOEL, noelActif } from "@/data/site";
import s from "./NoelBanner.module.css";

const CLE = "noel-bandeau-ferme";

const Etoile = () => (
  <svg className={s.star} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <path d="M5 0l1.2 3.8L10 5 6.2 6.2 5 10 3.8 6.2 0 5l3.8-1.2z" fill="currentColor" />
  </svg>
);

/** Bandeau de Noël au-dessus de l'en-tête : vert foncé, texte crème, étoiles dorées. Fermeture mémorisée pour la session. */
export default function NoelBanner({ lien }: { lien: string }) {
  const [actif] = useState(noelActif);
  const [ferme, setFerme] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CLE)) setFerme(true);
    } catch {}
  }, []);

  if (!actif || ferme) return null;
  return (
    <div className={s.bar} role="region" aria-label="Annonce">
      <p className={s.text}>
        <Etoile />
        <span>
          {NOEL.message}
          <span className={s.suite}> · {NOEL.messageSuite}</span>
        </span>
        <Link href={lien} className={s.link}>
          Découvrir →
        </Link>
        <Etoile />
      </p>
      <button
        type="button"
        className={s.close}
        aria-label="Fermer l'annonce"
        onClick={() => {
          setFerme(true);
          try {
            sessionStorage.setItem(CLE, "1");
          } catch {}
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
