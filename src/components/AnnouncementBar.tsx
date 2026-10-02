import Link from "next/link";
import { announcements } from "@/data/site";
import s from "./AnnouncementBar.module.css";

/** Répétitions de la liste dans un groupe : le groupe dépasse ainsi 2 fois la largeur d'un grand écran. */
const REPEAT = 3;

/** Un groupe = la liste répétée ; chaque message est suivi d'un point rose. */
function Group({ hidden }: { hidden?: boolean }) {
  return (
    <ul className={s.group} aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEAT }).flatMap((_, r) =>
        announcements.flatMap((text, i) => [
          <li key={`${r}-${i}`} className={`${s.msg} ${r > 0 || hidden ? s.extra : ""}`} aria-hidden={r > 0 || undefined}>
            {text}
          </li>,
          <li key={`${r}-${i}-dot`} className={s.dot} aria-hidden="true" />,
        ]),
      )}
    </ul>
  );
}

/** Barre verte : défilement continu en CSS pur (aucun JS). « Aide » / « Mon compte » fixes à droite sur desktop. */
export default function AnnouncementBar() {
  return (
    <div className={s.bar} role="region" aria-label="Informations">
      <div className={s.viewport}>
        <div className={s.track}>
          <Group />
          <Group hidden />
        </div>
      </div>
      <ul className={s.links}>
        <li>
          <Link href="/contact">Aide</Link>
        </li>
        <li>
          <Link href="/compte">Mon compte</Link>
        </li>
      </ul>
    </div>
  );
}
