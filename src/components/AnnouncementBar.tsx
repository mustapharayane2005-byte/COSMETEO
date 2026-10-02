import Link from "next/link";
import { announcements } from "@/data/site";

/** Barre verte, une seule ligne fixe (aucun défilement). Aide / compte à droite sur desktop. */
export default function AnnouncementBar() {
  return (
    <div className="bg-green font-ui text-xs text-white" role="region" aria-label="Informations">
      <div className="container flex h-9 items-center justify-center whitespace-nowrap lg:justify-between">
        <p className="overflow-hidden text-ellipsis">
          {announcements.map((text, i) => (
            <span
              key={text}
              className={i === 1 ? "hidden min-[480px]:inline" : i === 2 ? "hidden min-[640px]:inline" : undefined}
            >
              {i > 0 && " · "}
              {text}
            </span>
          ))}
        </p>
        <ul className="hidden items-center gap-6 lg:flex">
          <li>
            <Link href="/faq" className="hover:underline hover:underline-offset-4">
              Aide
            </Link>
          </li>
          <li>
            <Link href="/compte" className="hover:underline hover:underline-offset-4">
              Mon compte
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
