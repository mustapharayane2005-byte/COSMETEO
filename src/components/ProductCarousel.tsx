"use client";

import { useRef } from "react";
import Icon from "@/components/ui/Icon";

/** Rail horizontal avec scroll-snap natif + flèches (desktop). Les enfants sont des <li>. */
export default function ProductCarousel({ children, label }: { children: React.ReactNode; label: string }) {
  const rail = useRef<HTMLUListElement>(null);
  const go = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  const arrow =
    "absolute top-[34%] z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/95 text-green shadow-md transition hover:bg-white lg:grid";

  return (
    <div className="relative" role="region" aria-roledescription="carrousel" aria-label={label}>
      <ul
        ref={rail}
        className="flex snap-x snap-proximity gap-3.5 overflow-x-auto overflow-y-hidden overscroll-x-contain [touch-action:pan-x_pan-y] [-webkit-overflow-scrolling:touch] pb-2 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden [&>li]:w-[44%] [&>li]:shrink-0 [&>li]:snap-start md:[&>li]:w-[30%] xl:[&>li]:w-[23.2%]"
      >
        {children}
      </ul>
      <button type="button" aria-label="Précédent" onClick={() => go(-1)} className={`${arrow} -left-5`}>
        <Icon name="arrow" className="rotate-180" />
      </button>
      <button type="button" aria-label="Suivant" onClick={() => go(1)} className={`${arrow} -right-5`}>
        <Icon name="arrow" />
      </button>
    </div>
  );
}
