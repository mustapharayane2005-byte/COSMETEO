import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import ChatBubble from "@/components/ChatBubble";
import MobileDock from "@/components/MobileDock";
import SplashScreen, { splashScript } from "@/components/SplashScreen";
import MotionProvider from "@/components/ui/MotionProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Titres.
const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const title = "COSMÉTÉO – Boutique beauté et soins au Bénin";
const description =
  "Soins et produits de beauté authentiques pour toutes les peaux. Livraison au Bénin et à l'international.";
const ogImage = { url: "/og-cosmeteo.png?v=4", width: 1200, height: 630, alt: "COSMÉTÉO" };

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
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
      </head>
      <body>
        <SplashScreen />
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
