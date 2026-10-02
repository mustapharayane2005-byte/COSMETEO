import BesoinsBlock from "@/components/BesoinsBlock";
import BrandStrip from "@/components/BrandStrip";
import ConseilsHighlights from "@/components/ConseilsHighlights";
import FamilyPills from "@/components/FamilyPills";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsletterSection from "@/components/NewsletterSection";
import ProductSection from "@/components/ProductSection";
import PromoBanners from "@/components/PromoBanners";
import TrustSection from "@/components/TrustSection";
import UniversCards from "@/components/UniversCards";
import RevealObserver from "@/components/ui/RevealObserver";
import { sections } from "@/data/home";
import { allProducts } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FamilyPills />
        <BesoinsBlock />
        <PromoBanners />
        <ProductSection
          id="best-title"
          title={sections.bestSellers.title}
          subtitle={sections.bestSellers.subtitle}
          link={{ label: "Voir tout →", href: "/boutique" }}
          products={allProducts}
          layout="carousel"
        />
        <UniversCards />
        <BrandStrip />
        <ConseilsHighlights />
        <TrustSection />
        <NewsletterSection />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
