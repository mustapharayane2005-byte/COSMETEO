"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NOEL, noelActif } from "@/data/site";
import s from "./NoelBanner.module.css";

const CLE = "noel-bandeau-ferme";

/** Bandeau de Noël au-dessus de l'en-tête. Pose aussi `data-noel` sur <html> (couleurs du badge « Cadeau »). */
export default function NoelBanner() {
  const [actif] = useState(noelActif);
  const [ferme, setFerme] = useState(false);

  useEffect(() => {
    if (!noelActif()) return;
    document.documentElement.setAttribute("data-noel", "");
    try {
      if (sessionStorage.getItem(CLE)) setFerme(true);
    } catch {}
    return () => document.documentElement.removeAttribute("data-noel");
  }, []);

  if (!actif || ferme) return null;
  return (
    <div className={s.bar} role="region" aria-label="Annonce">
      <Link href={NOEL.lien} className={s.link}>
        {NOEL.message}
      </Link>
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
