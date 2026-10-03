import { existsSync } from "node:fs";
import path from "node:path";
import { paiements } from "@/data/site";
import s from "./PaymentMethods.module.css";

const hasFile = (src: string) => existsSync(path.join(process.cwd(), "public", src));

/** Rangée « Paiements sécurisés » du footer : logos dans des tuiles blanches (nom en texte si le fichier manque). */
export default function PaymentMethods({ className = "" }: { className?: string }) {
  const items = paiements.filter((p) => p.actif);
  if (items.length === 0) return null;
  return (
    <div className={`${s.wrap} ${className}`}>
      <p className={s.title}>PAIEMENTS SÉCURISÉS</p>
      <ul className={s.row} aria-label={`Moyens de paiement acceptés : ${items.map((p) => p.nom).join(", ")}`}>
        {items.map((p) => (
          <li key={p.nom} className={s.tile}>
            {hasFile(p.fichier) ? (
              // eslint-disable-next-line @next/next/no-img-element -- petits logos (SVG/PNG), pas besoin de l'optimiseur
              <img src={p.fichier} alt={p.alt} loading="lazy" decoding="async" className={s.logo} style={{ height: p.hauteur }} />
            ) : (
              <span className={s.text}>{p.nom}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
