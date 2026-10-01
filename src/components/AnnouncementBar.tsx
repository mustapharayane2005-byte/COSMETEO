import { announcements } from "@/data/site";

/**
 * Bloc arrondi beige avec marquee continu (CSS pur, droite → gauche, pause au survol).
 * Deux copies identiques de la liste : la translation de -50 % boucle sans coupure.
 */
export default function AnnouncementBar() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[...announcements, ...announcements].map((text, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-8">{text}</span>
          <span className="size-1 rounded-full bg-brown/60" />
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="group mx-4 mb-4 mt-4 h-14 overflow-hidden rounded-2xl bg-[#F2F0EB] font-ui text-sm font-semibold uppercase tracking-[0.04em] text-brown"
      role="region"
      aria-label="Informations"
    >
      <div className="flex h-full w-max items-center motion-safe:animate-[marquee_70s_linear_infinite] motion-safe:group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
