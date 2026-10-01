import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = { title: "Panier" };

export default function CartPage() {
  return (
    <PageShell>
      <section className="container pb-[clamp(56px,8vw,112px)]">
        <h1 className="h2 py-8 !text-[clamp(2.25rem,1.2rem+3.4vw,4rem)] md:py-14">Panier</h1>
        <CartView />
      </section>
    </PageShell>
  );
}
