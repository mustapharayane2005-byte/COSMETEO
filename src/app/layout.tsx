import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, Nunito } from "next/font/google";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import ChatBubble from "@/components/ChatBubble";
import MobileDock from "@/components/MobileDock";
import MarqueeBoost from "@/components/ui/MarqueeBoost";
import MotionProvider from "@/components/ui/MotionProvider";
import ReadingProgress from "@/components/ui/ReadingProgress";
import SmoothScroll from "@/components/ui/SmoothScroll";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Uniquement pour le titre du hero (variable dédiée : --font-serif sert déjà à Inter Tight dans le thème).
const instrumentSerif = Instrument_Serif({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Uniquement pour le wordmark « cosméteo ».
const nunito = Nunito({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "COSMÉTÉO — Beauté, soins & bien-être",
  description:
    "Une sélection de soins et de produits de beauté choisis pour accompagner votre quotidien. Livraison au Bénin et à l'international.",
};

export const viewport: Viewport = {
  themeColor: "#EDECE8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${interTight.variable} ${nunito.variable} ${instrumentSerif.variable}`}>
      <body>
        <SmoothScroll />
        <MotionProvider>
        <ReadingProgress />
        <MarqueeBoost />
        <CartProvider>
          {children}
          <CartDrawer />
          <MobileDock />
          <ChatBubble />
        </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
