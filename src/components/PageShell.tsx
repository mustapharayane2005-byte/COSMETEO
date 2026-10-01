import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RevealObserver from "@/components/ui/RevealObserver";

/** Cadre des pages intérieures : header (dans le flux), contenu, footer. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <RevealObserver />
    </>
  );
}
