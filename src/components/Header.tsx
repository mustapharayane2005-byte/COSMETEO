"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import { useCart } from "@/components/cart/CartContext";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import { mainNav } from "@/data/site";

export default function Header() {
  const { count: cartCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const searchId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
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

  // Recherche : à brancher plus tard (route /recherche?q=…).
  const onSearch = (e: React.FormEvent) => e.preventDefault();

  const iconBtn = "relative grid size-11 place-items-center rounded-full transition-colors hover:bg-green/10";
  const cartLabel = `Panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`;
  const placeholder = "Rechercher un produit, une marque…";
  const searchBox =
    "h-11 w-full rounded-full border border-[#E3DDD3] bg-white pl-11 pr-4 text-sm outline-none placeholder:text-[#6B6B68] focus-visible:border-green";

  const badge = (
    <m.span
      key={cartCount}
      initial={{ scale: 1.25 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className="absolute right-0 top-0.5 grid min-w-[18px] place-items-center rounded-full bg-rose px-1 text-[0.6875rem] font-semibold leading-[18px] text-green"
      aria-hidden="true"
    >
      {cartCount}
    </m.span>
  );

  return (
    <>
      <AnnouncementBar />
      {/* collé en haut au défilement, sans flou */}
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
            <Logo variant="header" />
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
            <input ref={mobileSearchRef} id={`${searchId}-m`} type="search" placeholder={placeholder} className={searchBox} />
          </form>

          {/* desktop */}
          <div className="hidden h-20 grid-cols-[1fr_minmax(0,560px)_1fr] items-center gap-8 lg:grid">
            <div className="justify-self-start">
              <Logo variant="header" />
            </div>
            <form role="search" onSubmit={onSearch} className="relative">
              <Icon name="search" size={18} className="pointer-events-none absolute left-4 top-[14px]" />
              <label htmlFor={`${searchId}-d`} className="sr-only">
                Rechercher un produit
              </label>
              <input id={`${searchId}-d`} type="search" placeholder={placeholder} className={searchBox} />
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
          <nav className="hidden items-center justify-center gap-10 pb-3 lg:flex" aria-label="Navigation principale">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap py-1 text-sm font-medium transition-colors hover:text-green hover:underline hover:underline-offset-8"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* menu plein écran qui glisse (mobile / tablette) */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] overflow-y-auto bg-ivory lg:hidden"
          >
            <div className="container grid h-14 grid-cols-[1fr_auto_1fr] items-center">
              <button
                type="button"
                className={`${iconBtn} -ml-2 justify-self-start`}
                aria-label="Fermer le menu"
                onClick={() => setMenuOpen(false)}
              >
                <Icon name="close" />
              </button>
              <Logo variant="header" />
              <span />
            </div>
            <nav aria-label="Menu mobile" className="container pb-12 pt-6">
              <ul>
                {mainNav.map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 font-display text-[28px] leading-tight text-green"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
