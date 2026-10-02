import BrandStrip from "@/components/BrandStrip";
import CategorySection from "@/components/CategorySection";
import EditorialSection from "@/components/EditorialSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BesoinsBlock from "@/components/BesoinsBlock";
import Hero from "@/components/Hero";
import NewsletterSection from "@/components/NewsletterSection";
import ProductSection from "@/components/ProductSection";
import SkinTonesBanner from "@/components/SkinTonesBanner";
import PromoSection from "@/components/PromoSection";
import TrustSection from "@/components/TrustSection";
import RevealObserver from "@/components/ui/RevealObserver";
import { sections } from "@/data/home";
import { newArrivals } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BesoinsBlock />
        <CategorySection />
        <SkinTonesBanner />
        <FeaturedProducts />
        <PromoSection />
        <ProductSection
          id="new-title"
          title={sections.newArrivals.title}
          link={{ label: sections.newArrivals.cta, href: sections.newArrivals.href }}
          products={newArrivals}
          layout="carousel"
        />
        <BrandStrip />
        <EditorialSection />
        <TrustSection />
        <NewsletterSection />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
