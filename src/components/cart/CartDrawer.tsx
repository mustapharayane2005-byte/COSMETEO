"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { isOpen, closeCart, lines, count, subtotal, setQty } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            key="overlay"
            className="fixed inset-0 z-[60] bg-brown/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />
          <m.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Panier"
            className="fixed right-0 top-0 z-[61] flex h-dvh w-full max-w-[440px] flex-col bg-ivory font-ui shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 0.8, 0.2, 1] }}
          >
            <header className="flex h-16 items-center justify-between border-b border-brown/10 px-5">
              <h2 className="font-display text-2xl text-green">
                Panier <span className="font-ui text-sm text-brown/60">({count})</span>
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={closeCart}
                aria-label="Fermer le panier"
                className="grid size-11 place-items-center rounded-full hover:bg-green/10"
              >
                <Icon name="close" />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <p className="font-display text-2xl text-green">Votre panier est vide</p>
                <p className="text-sm text-brown/70">Découvrez notre sélection de soins.</p>
                <Link
                  href="/boutique"
                  onClick={closeCart}
                  className="rounded-full bg-green px-8 py-4 text-[1.125rem] font-semibold uppercase tracking-[0.02em] text-ivory"
                >
                  Explorer la boutique
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-brown/10 overflow-y-auto px-5">
                  {lines.map((l) => (
                    <li key={l.id} className="flex gap-4 py-5">
                      <div className="size-24 shrink-0 overflow-hidden rounded-xl">
                        <Media src={l.image} alt={l.name} art={l.art} tone={l.tone} sizes="96px" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brown/60">
                          {l.brand}
                        </p>
                        <p className="mt-0.5 text-sm font-medium leading-snug">{l.name}</p>
                        {l.variant && <p className="text-xs text-brown/60">{l.variant}</p>}
                        <p className="mt-1 text-sm font-bold text-green">{formatPrice(l.price)}</p>
                        <div className="mt-auto inline-flex w-fit items-center rounded-full border border-brown/20">
                          <button
                            type="button"
                            aria-label={`Retirer une unité : ${l.name}`}
                            onClick={() => setQty(l.id, l.qty - 1)}
                            className="grid size-9 place-items-center"
                          >
                            <Icon name="minus" size={16} />
                          </button>
                          <span className="min-w-6 text-center text-sm" aria-live="polite">
                            {l.qty}
                          </span>
                          <button
                            type="button"
                            aria-label={`Ajouter une unité : ${l.name}`}
                            onClick={() => setQty(l.id, l.qty + 1)}
                            className="grid size-9 place-items-center"
                          >
                            <Icon name="plus" size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <footer className="border-t border-brown/10 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <p className="flex items-baseline justify-between text-sm">
                    <span>Sous-total</span>
                    <span className="text-lg font-bold text-green">{formatPrice(subtotal)}</span>
                  </p>
                  <p className="mt-1 text-xs text-brown/60">Livraison calculée à l&apos;étape suivante.</p>
                  {/* Checkout : à brancher (Mobile Money / carte). */}
                  <button
                    type="button"
                    disabled
                    className="mt-4 h-[52px] w-full cursor-not-allowed rounded-full bg-green/90 text-[1.125rem] font-semibold uppercase tracking-[0.02em] text-ivory opacity-80"
                  >
                    Passer la commande (bientôt)
                  </button>
                </footer>
              </>
            )}
          </m.aside>
        </>
      )}
    </AnimatePresence>
  );
}
