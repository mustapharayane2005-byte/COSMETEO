"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import NoelBanner from "@/components/NoelBanner";
import { useCart } from "@/components/cart/CartContext";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import type { NavData, NavEntry } from "@/data/nav";

export default function HeaderClient({ nav }: { nav: NavData }) {
  const { count: cartCount, openCart } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [accordion, setAccordion] = useState<string | null>(null);
  const delay = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const searchId = useId();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  // En-tête réduit après un peu de défilement (deux seuils pour éviter le clignotement).
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled((v) => (v ? window.scrollY > 16 : window.scrollY > 72)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Changement de page : panneau et tiroir se ferment.
  useEffect(() => {
    setOpenKey(null);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        clearTimeout(delay.current);
        setOpenKey(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Recherche : /recherche?q=… (nom, marque, catégorie).
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    if (!q) return;
    setMenuOpen(false);
    router.push(`/recherche?q=${encodeURIComponent(q)}`);
  };

  const iconBtn = "relative grid size-11 place-items-center rounded-full transition-colors hover:bg-green/10";
  const cartLabel = `Panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`;
  const placeholder = "Rechercher un produit, une marque…";
  const searchBox =
    "h-11 w-full rounded-full border border-[#E3DDD3] bg-white pl-11 pr-4 text-sm outline-none placeholder:text-[#6B6B68] focus-visible:border-green";

  const isActive = (href: string) => (href === "/" ? isHome : pathname === href || pathname.startsWith(`${href}/`));
  const barre: NavEntry[] = [...(isHome ? [] : [{ label: "Accueil", href: "/" }]), ...nav.primary];
  const current = (href: string) => (isActive(href) ? ("page" as const) : undefined);

  const navLink = (active: boolean) =>
    `flex h-full items-center whitespace-nowrap border-b-2 px-0.5 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[#1A1A1A] transition-colors hover:border-green focus-visible:border-green ${
      active ? "border-green" : "border-transparent"
    }`;
  // Ouverture au survol avec un léger délai (évite les ouvertures accidentelles) ; si un panneau est déjà ouvert, on change tout de suite.
  const survol = (key: string | null) => {
    clearTimeout(delay.current);
    if (key === null || openKey !== null) setOpenKey(key);
    else delay.current = setTimeout(() => setOpenKey(key), 120);
  };
  const fermer = () => {
    clearTimeout(delay.current);
    setOpenKey(null);
  };
  const closeOnLeave = (ev: React.FocusEvent<HTMLLIElement>) => {
    if (!ev.currentTarget.contains(ev.relatedTarget as Node | null)) setOpenKey(null);
  };
  const plusActive = nav.more.some((e) => isActive(e.href));

  const badge = (
    <m.span
      key={cartCount}
      initial={{ scale: 1.25 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className="absolute right-0 top-0.5 grid min-w-[18px] place-items-center rounded-full bg-[#1A1A1A] px-1 text-[0.6875rem] font-semibold leading-[18px] text-white"
      aria-hidden="true"
    >
      {cartCount}
    </m.span>
  );

  return (
    <>
      <NoelBanner />
      <AnnouncementBar />
      {/* collé en haut au défilement, sans flou ; se réduit légèrement (desktop) */}
      <header className="sticky top-0 z-50 border-b border-line bg-ivory font-ui text-ink">
        <div className="container">
          {/* mobile / tablette */}
          <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center lg:hidden">
            <button
              type="button"
              className={`${iconBtn} -ml-2 justify-self-start`}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" />
            </button>
            <Logo variant="header" priority compact />
            <div className="-mr-2 flex items-center justify-self-end">
              <button type="button" className={iconBtn} aria-label="Rechercher" onClick={() => mobileSearchRef.current?.focus()}>
                <Icon name="search" />
              </button>
              <button type="button" onClick={openCart} className={iconBtn} aria-label={cartLabel}>
                <Icon name="bag" />
                {cartCount > 0 && badge}
              </button>
            </div>
          </div>
          <form role="search" onSubmit={onSearch} className="relative pb-3 lg:hidden">
            <Icon name="search" size={18} className="pointer-events-none absolute left-4 top-[14px]" />
            <label htmlFor={`${searchId}-m`} className="sr-only">
              Rechercher un produit
            </label>
            <input ref={mobileSearchRef} id={`${searchId}-m`} type="search" name="q" placeholder={placeholder} className={searchBox} />
          </form>

          {/* desktop */}
          <div
            className={`hidden grid-cols-[1fr_minmax(0,560px)_1fr] items-center gap-8 lg:grid ${scrolled ? "min-h-14 py-2" : "min-h-20 py-3.5"}`}
          >
            <div className="justify-self-start">
              <Logo variant="header" priority className={scrolled ? "lg:[--fs:0.43rem]! lg:[--w:112px]!" : ""} />
            </div>
            <form role="search" onSubmit={onSearch} className="relative">
              <Icon name="search" size={18} className="pointer-events-none absolute left-4 top-[14px]" />
              <label htmlFor={`${searchId}-d`} className="sr-only">
                Rechercher un produit
              </label>
              <input id={`${searchId}-d`} type="search" name="q" placeholder={placeholder} className={searchBox} />
            </form>
            <div className="flex items-center justify-end gap-1">
              <Link href="/favoris" className={iconBtn} aria-label="Favoris">
                <Icon name="heart" />
              </Link>
              <button type="button" onClick={openCart} className={iconBtn} aria-label={cartLabel}>
                <Icon name="bag" />
                {cartCount > 0 && badge}
              </button>
              <Link href="/compte" className={iconBtn} aria-label="Mon compte">
                <Icon name="user" />
              </Link>
            </div>
          </div>
          <nav className="hidden h-11 lg:block" aria-label="Navigation principale">
            <ul className="flex h-full items-stretch justify-center gap-6 xl:gap-8">
              {barre.map((e) => {
                const hasPanel = Boolean(e.brands);
                return (
                  <li
                    key={e.href}
                    className="flex"
                    onMouseEnter={() => survol(hasPanel ? e.href : null)}
                    onMouseLeave={fermer}
                    onBlur={closeOnLeave}
                  >
                    <Link
                      href={e.href}
                      className={navLink(isActive(e.href))}
                      aria-current={current(e.href)}
                      aria-haspopup={hasPanel ? "true" : undefined}
                      aria-expanded={hasPanel ? openKey === e.href : undefined}
                      onFocus={() => setOpenKey(hasPanel ? e.href : null)}
                    >
                      {e.label}
                    </Link>
                    {e.rubrique && openKey === e.href && <GrandMenu entry={e} onNavigate={fermer} />}
                    {hasPanel && !e.rubrique && openKey === e.href && (
                      <div className="absolute inset-x-0 top-full border-b border-t border-line bg-ivory shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
                        <div className="container flex items-start justify-between gap-8 py-6">
                          <div>
                            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#6B6B68]">Marques</p>
                            {e.brands!.length > 0 ? (
                              <ul className="grid grid-flow-col grid-rows-5 gap-x-10 gap-y-1.5">
                                {e.brands!.map((b) => (
                                  <li key={b.href}>
                                    <Link
                                      href={b.href}
                                      onClick={() => setOpenKey(null)}
                                      className="text-sm text-[#1A1A1A] hover:underline hover:decoration-green hover:underline-offset-4 focus-visible:underline focus-visible:decoration-green focus-visible:underline-offset-4"
                                    >
                                      {b.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-[#6B6B68]">Aucune marque pour le moment.</p>
                            )}
                          </div>
                          <Link
                            href={e.href}
                            onClick={() => setOpenKey(null)}
                            className="whitespace-nowrap text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-green underline underline-offset-4"
                          >
                            Voir tout
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
              {nav.more.length > 0 && (
                <li className="relative flex" onMouseEnter={() => setOpenKey("plus")} onMouseLeave={() => setOpenKey(null)} onBlur={closeOnLeave}>
                  <button
                    type="button"
                    className={`${navLink(plusActive)} cursor-pointer`}
                    aria-haspopup="true"
                    aria-expanded={openKey === "plus"}
                    onClick={() => setOpenKey(openKey === "plus" ? null : "plus")}
                  >
                    Plus
                  </button>
                  {openKey === "plus" && (
                    <ul className="absolute right-0 top-full z-10 min-w-56 border border-line bg-ivory py-2 shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
                      {nav.more.map((e) => (
                        <li key={e.href}>
                          <Link
                            href={e.href}
                            onClick={() => setOpenKey(null)}
                            aria-current={current(e.href)}
                            className={`block px-4 py-2 text-sm text-[#1A1A1A] hover:bg-green/10 focus-visible:bg-green/10 ${isActive(e.href) ? "underline decoration-green underline-offset-4" : ""}`}
                          >
                            {e.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* tiroir latéral (mobile / tablette), dans un portail : hors du contexte d'empilement de template.tsx, donc au-dessus de la barre du bas et du chat */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <m.div
                key="drawer"
                className="fixed inset-0 z-[55] lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} aria-hidden="true" />
                <m.div
                  id="mobile-menu"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Menu"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-y-0 left-0 flex w-[min(86vw,340px)] flex-col bg-ivory font-ui"
                >
                  <div className="flex h-14 flex-none items-center justify-between border-b border-line pl-4 pr-2">
                    <Logo variant="header" compact />
                    <button type="button" className={iconBtn} aria-label="Fermer le menu" onClick={() => setMenuOpen(false)}>
                      <Icon name="close" />
                    </button>
                  </div>
                  <nav aria-label="Menu mobile" className="flex-1 overflow-y-auto px-4 py-2">
                    <ul>
                      {[...barre, ...nav.more].map((e) => (
                        <li key={e.href} className="border-b border-line">
                          {e.rubrique && e.rubrique.groupes.length > 0 && (
                            <div>
                              <button
                                type="button"
                                aria-expanded={accordion === e.href}
                                aria-controls={`acc-${e.href}`}
                                onClick={() => setAccordion(accordion === e.href ? null : e.href)}
                                className="flex min-h-11 w-full items-center justify-between py-3.5 text-left text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-[#1A1A1A]"
                              >
                                {e.label}
                                <span
                                  aria-hidden="true"
                                  className={`ml-3 size-2 flex-none border-b-2 border-r-2 border-green transition-transform ${accordion === e.href ? "-rotate-[135deg]" : "rotate-45"}`}
                                />
                              </button>
                              {accordion === e.href && (
                                <div id={`acc-${e.href}`} className="pb-4">
                                  <Link href={e.href} onClick={() => setMenuOpen(false)} className="mb-3 block text-sm font-semibold text-green underline underline-offset-4">
                                    Voir tout {e.label}
                                  </Link>
                                  {e.rubrique.groupes.map((g) => (
                                    <div key={g.id} className="mb-3">
                                      <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-green">{g.label}</p>
                                      <ul>
                                        {g.entrees.map((en) => (
                                          <li key={en.href}>
                                            <Link href={en.href} onClick={() => setMenuOpen(false)} className="block break-words py-2 text-sm text-[#1A1A1A]">
                                              {en.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          {!(e.rubrique && e.rubrique.groupes.length > 0) && (
                          <Link
                            href={e.href}
                            onClick={() => setMenuOpen(false)}
                            aria-current={current(e.href)}
                            className={`block py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-[#1A1A1A] ${
                              isActive(e.href) ? "underline decoration-green decoration-2 underline-offset-8" : ""
                            }`}
                          >
                            {e.label}
                          </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <ul className="flex flex-none gap-6 border-t border-line px-4 py-4">
                    {nav.secondary.map((e) => (
                      <li key={e.href}>
                        <Link
                          href={e.href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={current(e.href)}
                          className={`text-[0.8125rem] text-[#1A1A1A] ${isActive(e.href) ? "underline decoration-green underline-offset-4" : ""}`}
                        >
                          {e.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </m.div>
              </m.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

/** Grand menu d'une rubrique (ordinateur) : groupes de la taxonomie à gauche, cartes à droite. Tout est calculé côté serveur (nav.ts). */
function GrandMenu({ entry, onNavigate }: { entry: NavEntry; onNavigate: () => void }) {
  const r = entry.rubrique!;
  const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green";
  const lien = `text-sm text-[#1A1A1A] hover:text-green hover:underline hover:underline-offset-4 focus-visible:underline focus-visible:underline-offset-4 ${focus}`;
  const marques = entry.brands ?? [];
  return (
    <div className="absolute inset-x-0 top-full z-10 max-h-[calc(100vh-9rem)] overflow-y-auto border-t border-line bg-white shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
      <div className="container flex items-start gap-10 py-8">
        {r.groupes.length > 0 ? (
          <div className="grid min-w-0 flex-1 gap-x-8 gap-y-6" style={{ gridTemplateColumns: `repeat(${r.groupes.length}, minmax(0, 1fr))` }}>
            {r.groupes.map((g) => (
              <div key={g.id}>
                <p className="mb-3 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-green">{g.label}</p>
                <ul className="space-y-2">
                  {g.entrees.map((en) => (
                    <li key={en.href}>
                      <Link href={en.href} onClick={onNavigate} className={lien}>
                        {en.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="min-w-0 flex-1">
            {marques.length > 0 && (
              <>
                <p className="mb-3 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-green">Marques</p>
                <ul className="grid grid-flow-col grid-rows-5 gap-x-10 gap-y-2">
                  {marques.map((b) => (
                    <li key={b.href}>
                      <Link href={b.href} onClick={onNavigate} className={lien}>
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
        <div className="flex w-[300px] flex-none flex-col gap-4">
          <Link
            href={entry.href}
            onClick={onNavigate}
            className={`group relative flex h-36 items-end overflow-hidden rounded-xl bg-green p-4 text-ivory ${focus}`}
          >
            {r.image && <Image src={r.image} alt={r.imageAlt ?? ""} fill sizes="300px" className="object-cover transition-transform duration-300 group-hover:scale-105" />}
            {r.image && <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />}
            <span className="relative text-sm font-semibold uppercase tracking-[0.1em]">Voir tout {entry.label} →</span>
          </Link>
          {r.produit && (
            <Link href={r.produit.href} onClick={onNavigate} className={`flex items-center gap-3 rounded-xl border border-line p-3 hover:border-green ${focus}`}>
              {r.produit.image && (
                <span className="relative size-16 flex-none overflow-hidden rounded-lg bg-white">
                  <Image src={r.produit.image} alt="" fill sizes="64px" className="object-contain" />
                </span>
              )}
              <span className="min-w-0">
                <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-green">{r.produit.badge}</span>
                <span className="block truncate text-xs text-[#6B6B68]">{r.produit.brand}</span>
                <span className="line-clamp-2 text-sm text-[#1A1A1A]">{r.produit.name}</span>
              </span>
            </Link>
          )}
          {r.conseil && (
            <Link href={r.conseil.href} onClick={onNavigate} className={`rounded-xl border border-line p-3 hover:border-green ${focus}`}>
              <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-green">Conseil</span>
              <span className="line-clamp-2 text-sm text-[#1A1A1A]">{r.conseil.title}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
