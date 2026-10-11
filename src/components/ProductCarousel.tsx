"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";

/** Vitesse de l'auto-défilement (px/s) et délai de reprise après une interaction. */
const VITESSE_MOBILE = 45;
const VITESSE_BUREAU = 60;
const REPRISE_MS = 2000;

/**
 * Rail horizontal de produits (accueil et « Vous aimerez aussi ») : défile tout seul, lentement, en boucle.
 * La boucle repose sur 3 copies des cartes ajoutées côté client (aucun doublon dans le HTML serveur ni dans les données) ;
 * le rail reste un conteneur à défilement natif : swipe, molette et flèches fonctionnent toujours.
 * Pause au survol / au toucher / à la molette / au focus, reprise 2 s après. Désactivé si « réduire les animations »,
 * si la rangée n'est pas visible ou si l'onglet est inactif. Les enfants sont des <li>.
 */
export default function ProductCarousel({ children, label }: { children: React.ReactNode; label: string }) {
  const rail = useRef<HTMLUListElement>(null);
  const [boucle, setBoucle] = useState(false);

  // Active la boucle (copies) seulement côté client, sans « réduire les animations » et si la rangée est assez longue.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const calme = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluer = () => setBoucle(!calme.matches && el.scrollWidth > el.clientWidth * 1.15);
    evaluer();
    calme.addEventListener("change", evaluer);
    window.addEventListener("resize", evaluer);
    return () => {
      calme.removeEventListener("change", evaluer);
      window.removeEventListener("resize", evaluer);
    };
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el || !boucle) return;
    const items = Array.from(el.children) as HTMLElement[];
    const n = items.length / 3;
    if (!Number.isInteger(n) || n < 1) return;

    let periode = 0; // largeur d'une copie (cartes + gaps)
    const mesurer = () => {
      periode = items[n].offsetLeft - items[0].offsetLeft;
    };
    mesurer();
    el.scrollLeft = periode; // on démarre sur la copie du milieu : on peut aussi revenir en arrière

    let pos = el.scrollLeft;
    let actif = false; // rangée visible à l'écran
    let pauseJusqua = 0; // 0 = pas de pause ; Infinity = pause tant que l'interaction dure
    let raf = 0;
    let dernier = 0;
    const bureau = window.matchMedia("(min-width: 1024px)");

    const boucler = () => {
      if (periode <= 0) return false;
      let moved = false;
      if (el.scrollLeft >= periode * 2) { el.scrollLeft -= periode; moved = true; }
      else if (el.scrollLeft < periode) { el.scrollLeft += periode; moved = true; }
      return moved;
    };

    const tick = (t: number) => {
      raf = window.requestAnimationFrame(tick);
      const dt = Math.min(t - dernier, 100) / 1000;
      dernier = t;
      if (!actif || document.hidden) return;
      const enPause = pauseJusqua === Infinity || t < pauseJusqua;
      if (enPause) {
        pos = el.scrollLeft;
        boucler();
        return;
      }
      pos += (bureau.matches ? VITESSE_BUREAU : VITESSE_MOBILE) * dt;
      if (pos >= periode * 2) pos -= periode;
      el.scrollLeft = pos;
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft; // l'utilisateur a bougé la rangée : on repart d'où il est
      if (boucler()) pos = el.scrollLeft;
    };

    const pauser = () => { pauseJusqua = Infinity; };
    const reprendre = () => { pauseJusqua = performance.now() + REPRISE_MS; };
    const souris = (fn: () => void) => (e: PointerEvent) => { if (e.pointerType === "mouse") fn(); };
    const onEnter = souris(pauser);
    const onLeave = souris(reprendre);
    const onWheel = () => { pauseJusqua = performance.now() + REPRISE_MS; };
    const onKey = () => { pauseJusqua = performance.now() + REPRISE_MS * 2; };

    const io = new IntersectionObserver(([e]) => { actif = e.isIntersecting; if (actif) pos = el.scrollLeft; }, { threshold: 0.25 });
    io.observe(el);
    const onResize = () => { const r = periode ? el.scrollLeft / periode : 1; mesurer(); el.scrollLeft = r * periode; pos = el.scrollLeft; };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("touchstart", pauser, { passive: true });
    el.addEventListener("touchend", reprendre, { passive: true });
    el.addEventListener("touchcancel", reprendre, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("keydown", onKey);
    el.addEventListener("focusin", onKey);
    window.addEventListener("resize", onResize);
    raf = window.requestAnimationFrame((t) => { dernier = t; tick(t); });

    return () => {
      window.cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("touchstart", pauser);
      el.removeEventListener("touchend", reprendre);
      el.removeEventListener("touchcancel", reprendre);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("focusin", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [boucle]);

  const go = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  const arrow =
    "absolute top-[34%] z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/95 text-[#1A1A1A] shadow-md transition hover:bg-white lg:grid";

  const cartes = Children.toArray(children);
  const copie = (suffixe: string) =>
    cartes.map((c) => (isValidElement<Record<string, unknown>>(c) ? cloneElement(c, { key: `${c.key}${suffixe}`, "aria-hidden": true }) : c));

  return (
    <div className="relative" role="region" aria-roledescription="carrousel" aria-label={label}>
      <ul
        ref={rail}
        className={`flex gap-3.5 overflow-x-auto overflow-y-hidden overscroll-x-contain [touch-action:pan-x_pan-y] [-webkit-overflow-scrolling:touch] pb-2 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden [&>li]:w-[44%] [&>li]:shrink-0 md:[&>li]:w-[30%] xl:[&>li]:w-[23.2%] ${boucle ? "" : "snap-x snap-proximity [&>li]:snap-start"}`}
      >
        {boucle ? (
          <>
            {copie("-a")}
            {cartes}
            {copie("-c")}
          </>
        ) : (
          children
        )}
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
