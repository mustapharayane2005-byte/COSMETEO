"use client";

import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartContext";

/** Contenu de la page /panier (même état que le tiroir). */
export default function CartView() {
  const { lines, subtotal, count, setQty } = useCart();

  if (lines.length === 0) {
    return (
      <div className="panel grid place-items-center gap-5 px-6 py-24 text-center">
        <p className="h2">Votre panier est vide</p>
        <p className="lead">Découvrez notre sélection de soins.</p>
        <Link
          href="/boutique"
          className="inline-flex min-h-12 items-center rounded-full border border-green px-7 text-[1.125rem] font-semibold uppercase tracking-[0.02em] text-green transition-colors hover:bg-green hover:text-ivory"
        >
          Explorer la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
      <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {lines.map((l) => (
          <li key={l.id} className="flex gap-4 py-6 md:gap-6">
            <div className="size-24 shrink-0 overflow-hidden rounded-2xl md:size-32">
              <Media src={l.image} alt={l.name} art={l.art} tone={l.tone} placeholder={{ brand: l.brand, name: l.name }} sizes="128px" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{l.brand}</p>
              <p className="mt-1 font-medium">{l.name}</p>
              {l.variant && <p className="text-sm text-[var(--muted)]">{l.variant}</p>}
              <p className="mt-1 text-sm">{formatPrice(l.price)}</p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="inline-flex items-center rounded-full border border-[var(--line-strong)]">
                  <button type="button" aria-label={`Retirer une unité : ${l.name}`} onClick={() => setQty(l.id, l.qty - 1)} className="grid size-10 place-items-center">
                    <Icon name="minus" size={16} />
                  </button>
                  <span className="min-w-6 text-center text-sm" aria-live="polite">{l.qty}</span>
                  <button type="button" aria-label={`Ajouter une unité : ${l.name}`} onClick={() => setQty(l.id, l.qty + 1)} className="grid size-10 place-items-center">
                    <Icon name="plus" size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setQty(l.id, 0)}
                  className="text-[1.125rem] font-semibold uppercase tracking-[0.02em] underline underline-offset-4"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="panel h-fit p-6 md:p-8 lg:sticky lg:top-32">
        <h2 className="text-[1.125rem] font-semibold uppercase tracking-[0.02em]">Récapitulatif</h2>
        <p className="mt-5 flex justify-between text-sm">
          <span>{count} article{count > 1 ? "s" : ""}</span>
          <span>{formatPrice(subtotal)}</span>
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">Livraison calculée à l&apos;étape suivante.</p>
        <p className="mt-5 flex items-baseline justify-between border-t border-[var(--line)] pt-5">
          <span className="text-[1.125rem] font-semibold uppercase tracking-[0.02em]">Sous-total</span>
          <span className="text-xl">{formatPrice(subtotal)}</span>
        </p>
        {/* Checkout : à brancher (Mobile Money / carte). */}
        <button
          type="button"
          disabled
          className="mt-6 min-h-12 w-full cursor-not-allowed rounded-full border border-green text-[1.125rem] font-semibold uppercase tracking-[0.02em] text-green opacity-60"
        >
          Commander — Bientôt disponible
        </button>
      </aside>
    </div>
  );
}
