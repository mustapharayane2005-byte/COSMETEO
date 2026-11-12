import BesoinsBlock from "@/components/BesoinsBlock";
import ConseilsHighlights from "@/components/ConseilsHighlights";
import FamilyPills from "@/components/FamilyPills";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import TrustSection from "@/components/TrustSection";
import UniversCards from "@/components/UniversCards";
import GrandesMarques from "@/components/GrandesMarques";
import RevealObserver from "@/components/ui/RevealObserver";
import { sections } from "@/data/home";
import NoelFlocons from "@/components/NoelFlocons";
import { bestSellers, cadeauxProducts } from "@/data/products";
import { noelActif } from "@/data/site";

/** Régénération horaire : la section cadeaux disparaît toute seule après la date de fin du thème. */
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {noelActif() && cadeauxProducts.length > 0 && (
          <ProductSection
            id="cadeaux-title"
            title="Idées cadeaux"
            link={{ label: "Voir tout →", href: "/cadeaux" }}
            products={cadeauxProducts.slice(0, 6)}
            layout="carousel"
            gift
          />
        )}
        <FamilyPills />
        <GrandesMarques />
        <BesoinsBlock />
        <ProductSection
          id="best-title"
          title={sections.bestSellers.title}
          subtitle={sections.bestSellers.subtitle}
          link={{ label: "Voir tout →", href: "/boutique" }}
          products={bestSellers}
          layout="carousel"
        />
        <div className="bg-[var(--fond-section)] pb-11 lg:pb-14">
          <UniversCards />
        </div>
        <ConseilsHighlights />
        <TrustSection />
      </main>
      <Footer />
      <RevealObserver />
      <NoelFlocons />
    </>
  );
}
