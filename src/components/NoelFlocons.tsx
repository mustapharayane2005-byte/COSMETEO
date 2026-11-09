import { noelActif } from "@/data/site";
import s from "./NoelFlocons.module.css";

const FLOCONS = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 8.3 + 3) % 100}%`,
  taille: 4 + (i % 3) * 2,
  duree: 14 + (i % 5) * 3,
  delai: -((i * 2.7) % 14),
}));

/** Quelques flocons très légers (CSS pur), accueil uniquement ; masqués sur mobile et en mouvement réduit. */
export default function NoelFlocons() {
  if (!noelActif()) return null;
  return (
    <div className={s.layer} aria-hidden="true">
      {FLOCONS.map((f, i) => (
        <span
          key={i}
          className={s.flake}
          style={{ left: f.left, width: f.taille, height: f.taille, animationDuration: `${f.duree}s`, animationDelay: `${f.delai}s` }}
        />
      ))}
    </div>
  );
}
