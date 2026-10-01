"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import Icon, { type IconName } from "@/components/ui/Icon";

const items: { label: string; href: string; icon: IconName }[] = [
  { label: "Accueil", href: "/", icon: "home" },
  { label: "Boutique", href: "/boutique", icon: "grid" },
  { label: "Favoris", href: "/favoris", icon: "heart" },
];

/** Barre d'achat fixe en bas, à portée de pouce (mobile uniquement). */
export default function MobileDock() {
  const { count, openCart } = useCart();
  // la fiche produit a sa propre barre d'ajout au panier
  if (usePathname().startsWith("/produit/")) return null;
  const cls = "relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[0.625rem] font-medium tracking-wide";
  return (
    <nav
      aria-label="Accès rapide"
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-brown/10 bg-ivory/95 pb-[env(safe-area-inset-bottom)] font-ui backdrop-blur-md md:hidden"
    >
      {items.map((i) => (
        <Link key={i.label} href={i.href} className={cls}>
          <Icon name={i.icon} size={22} />
          {i.label}
        </Link>
      ))}
      <button type="button" onClick={openCart} className={cls} aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}>
        <span className="relative">
          <Icon name="bag" size={22} />
          {count > 0 && (
            <span className="absolute -right-2 -top-1.5 grid min-w-4 place-items-center rounded-full bg-green px-1 text-[0.625rem] font-semibold leading-4 text-ivory">
              {count}
            </span>
          )}
        </span>
        Panier
      </button>
    </nav>
  );
}
