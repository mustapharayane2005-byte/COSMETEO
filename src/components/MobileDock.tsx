"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import Icon, { type IconName } from "@/components/ui/Icon";

const links: { label: string; href: string; icon: IconName }[] = [
  { label: "Accueil", href: "/", icon: "home" },
  { label: "Boutique", href: "/boutique", icon: "grid" },
  { label: "Favoris", href: "/favoris", icon: "heart" },
];

/** Barre du bas (mobile uniquement) : Accueil | Boutique | Favoris | Panier | Compte. */
export default function MobileDock() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  // la fiche produit a sa propre barre d'ajout au panier
  if (pathname.startsWith("/produit/")) return null;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const cls = (active: boolean) =>
    `relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
      active ? "text-green" : "text-[#5F5F5C]"
    }`;
  const item = (l: { label: string; href: string; icon: IconName }) => (
    <Link key={l.label} href={l.href} className={cls(isActive(l.href))} aria-current={isActive(l.href) ? "page" : undefined}>
      <Icon name={l.icon} size={22} strokeWidth={1.25} />
      {l.label}
    </Link>
  );
  return (
    <nav
      aria-label="Accès rapide"
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-line bg-ivory pb-[env(safe-area-inset-bottom)] font-ui md:hidden"
    >
      {links.map(item)}
      <button type="button" onClick={openCart} className={cls(false)} aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}>
        <span className="relative">
          <Icon name="bag" size={22} strokeWidth={1.25} />
          {count > 0 && (
            <span className="absolute -right-2.5 -top-1.5 grid min-w-4 place-items-center rounded-full bg-rose px-1 text-[10px] font-semibold leading-4 text-green">
              {count}
            </span>
          )}
        </span>
        Panier
      </button>
      {item({ label: "Compte", href: "/compte", icon: "user" })}
    </nav>
  );
}
