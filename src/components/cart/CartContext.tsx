"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ArtShape, Product, Tone } from "@/types/catalog";

/**
 * Panier côté client : état React + localStorage (aucun backend).
 * Plus tard : synchroniser avec l'API commandes / le compte client.
 */
export type CartLine = {
  /** slug, ou slug::variante. */
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image?: string;
  art: ArtShape;
  tone: Tone;
  variant?: string;
  qty: number;
};

type AddOptions = { qty?: number; variant?: string; openDrawer?: boolean };

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, options?: AddOptions) => void;
  setQty: (id: string, qty: number) => void;
};

const STORAGE_KEY = "cosmeteo-cart-v1";
const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Hydratation depuis localStorage (après le premier rendu pour éviter tout écart serveur/client).
  /* eslint-disable react-hooks/set-state-in-effect -- hydratation volontaire après montage (SSR sans localStorage) */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* stockage indisponible : panier vide */
    }
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* quota / mode privé : on garde l'état en mémoire */
    }
  }, [lines, ready]);

  const addItem = useCallback((p: Product, { qty = 1, variant, openDrawer = true }: AddOptions = {}) => {
    if (p.price == null) return; // sans prix : jamais dans le panier
    const id = variant ? `${p.slug}::${variant}` : p.slug;
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [
        ...prev,
        { id, slug: p.slug, name: p.name, brand: p.brand, price: p.price ?? 0, image: p.images[0], art: p.art, tone: p.tone, variant, qty },
      ];
    });
    if (openDrawer) setOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);

  const value = useMemo<CartValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      addItem,
      setQty,
    }),
    [lines, isOpen, addItem, setQty],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
