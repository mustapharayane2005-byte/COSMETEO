import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, Nunito } from "next/font/google";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import ChatBubble from "@/components/ChatBubble";
import MobileDock from "@/components/MobileDock";
import MotionProvider from "@/components/ui/MotionProvider";
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

const title = "COSMÉTÉO – Boutique beauté et soins au Bénin";
const description =
  "Soins et produits de beauté authentiques pour toutes les peaux. Livraison au Bénin et à l'international.";
const ogImage = { url: "/og-cosmeteo.png", width: 1200, height: 630, alt: "COSMÉTÉO" };

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmeteo.vercel.app"),
  title: { default: title, template: "%s | COSMÉTÉO" },
  description,
  openGraph: {
    type: "website",
    locale: "fr_BJ",
    alternateLocale: ["fr_FR"],
    siteName: "COSMÉTÉO",
    url: "/",
    title,
    description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
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
        <MotionProvider>
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
