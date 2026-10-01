"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import { useCart } from "@/components/cart/CartContext";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import { categories } from "@/data/categories";
import { mainNav } from "@/data/site";

export default function Header() {
  const { count: cartCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchId = useId();

  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      // se cache en descendant, réapparaît dès qu'on remonte
      if (Math.abs(y - lastY.current) > 4) {
        setHidden(y > lastY.current && y > 200);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
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

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const solid = scrolled || menuOpen || searchOpen;
  // Recherche : à brancher plus tard (route /recherche?q=…).
  const onSearch = (e: React.FormEvent) => e.preventDefault();

  const iconBtn =
    "relative grid size-11 place-items-center rounded-full transition-colors hover:bg-current/10";

  return (
    <>
      <AnnouncementBar />
      {/* réserve la place du header : il est dans le flux, puis passe en sticky (fixed) après 80 px de scroll */}
      <div className="mx-4 mb-4 h-[72px] lg:h-[100px]">
        <header
          className={`z-50 w-full rounded-3xl font-ui text-[#5A534E] transition-[transform,background-color,box-shadow,backdrop-filter] duration-[350ms] ease-out ${
            scrolled
              ? `fixed inset-x-4 top-3 w-auto ${
                  solid
                    ? "bg-[#EDECE8]"
                    : "bg-[rgba(237,236,232,0.82)] shadow-[0_1px_0_#D9D6D0] backdrop-blur-[14px]"
                } ${hidden && !solid ? "-translate-y-[120%]" : ""}`
              : "relative bg-[#EDECE8]"
          }`}
        >
          <div className={`grid h-[72px] grid-cols-[1fr_auto_1fr] items-center px-3 transition-[height] duration-300 md:px-6 lg:px-12 ${scrolled ? "lg:h-[72px]" : "lg:h-[100px]"}`}>
            {/* gauche : menu (mobile) / navigation (desktop) */}
            <div className="flex items-center justify-self-start">
              <button
                type="button"
                className={`${iconBtn} -ml-2 lg:hidden`}
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => {
                  setMenuOpen((v) => !v);
                  setSearchOpen(false);
                }}
              >
                <Icon name={menuOpen ? "close" : "menu"} />
              </button>
              <nav className="hidden items-center gap-[clamp(20px,2.2vw,40px)] lg:flex" aria-label="Navigation principale">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="whitespace-nowrap py-2 text-[clamp(15px,1.25vw,18px)] font-semibold uppercase tracking-[0.01em]"
                  >
                    {item.label}
                                      </Link>
                ))}
              </nav>
            </div>

            <Logo variant={scrolled ? "headerCompact" : "header"} />

            <div className="flex items-center justify-end justify-self-end">
              {/* desktop : libellés MAJUSCULES */}
              <div className="hidden items-center gap-[clamp(20px,2.2vw,40px)] whitespace-nowrap text-[clamp(15px,1.25vw,18px)] font-semibold uppercase tracking-[0.01em] lg:flex">
                <button
                  type="button"
                  aria-expanded={searchOpen}
                  aria-controls={`${searchId}-panel`}
                  onClick={() => {
                    setSearchOpen((v) => !v);
                    setMenuOpen(false);
                  }}
                  className="py-2 uppercase hover:underline hover:underline-offset-4"
                >
                  {searchOpen ? "Fermer" : "Recherche"}
                </button>
                <Link href="/compte" className="py-2 hover:underline hover:underline-offset-4">
                  Compte
                </Link>
                <button
                  type="button"
                  onClick={openCart}
                  aria-label={`Panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`}
                  className="inline-flex gap-1 py-2 uppercase hover:underline hover:underline-offset-4"
                >
                  Panier
                  <m.span
                    key={cartCount}
                    initial={{ scale: 1.25 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    aria-hidden="true"
                  >
                    ({cartCount})
                  </m.span>
                </button>
              </div>
              {/* mobile / tablette : icônes */}
              <button
                type="button"
                className={`${iconBtn} lg:hidden`}
                aria-label="Rechercher"
                aria-expanded={searchOpen}
                aria-controls={`${searchId}-panel`}
                onClick={() => {
                  setSearchOpen((v) => !v);
                  setMenuOpen(false);
                }}
              >
                <Icon name={searchOpen ? "close" : "search"} />
              </button>
              <button
                type="button"
                onClick={openCart}
                className={`${iconBtn} -mr-2 lg:hidden`}
                aria-label={`Panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`}
              >
                <Icon name="bag" />
                {(
                  <m.span
                    key={cartCount}
                    initial={{ scale: 1.25 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    className="absolute right-0.5 top-1 grid min-w-[18px] place-items-center rounded-full bg-green px-1 text-[0.6875rem] font-semibold leading-[18px] text-ivory"
                    aria-hidden="true"
                  >
                    {cartCount}
                  </m.span>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {searchOpen && (
              <m.div
                id={`${searchId}-panel`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden border-t border-brown/10"
              >
                <form
                  role="search"
                  onSubmit={onSearch}
                  className="mx-auto flex h-16 w-[min(100%-40px,900px)] items-center gap-3"
                >
                  <Icon name="search" size={20} />
                  <label htmlFor={`${searchId}-input`} className="sr-only">
                    Rechercher un produit
                  </label>
                  <input
                    ref={searchRef}
                    id={`${searchId}-input`}
                    type="search"
                    placeholder="Rechercher un soin, une marque…"
                    className="h-11 flex-1 bg-transparent text-base outline-none placeholder:text-brown/50"
                  />
                </form>
              </m.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* menu plein écran (mobile / tablette) */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ivory px-5 pb-10 pt-[180px] lg:hidden"
          >
            <nav aria-label="Menu mobile">
              <ul>
                {mainNav.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.08, duration: 0.4, ease: "easeOut" }}
                    className="border-b border-brown/10"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-4 font-display text-[2rem] leading-tight ${
                        item.accent ? "text-[#b4492f]" : "text-green"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <p className="mb-2 mt-8 font-ui text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brown/60">
                Nos univers
              </p>
              <ul className="grid grid-cols-2 gap-x-4 font-ui">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link href={c.href} onClick={() => setMenuOpen(false)} className="block py-3 text-[0.9375rem]">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/favoris"
                onClick={() => setMenuOpen(false)}
                className="mt-6 inline-flex items-center gap-2.5 py-3 font-ui text-[0.9375rem] font-medium"
              >
                <Icon name="heart" size={20} /> Mes favoris
              </Link>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
