import type { Metadata, Viewport } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Comfortaa } from "next/font/google";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import ChatBubble from "@/components/ChatBubble";
import MobileDock from "@/components/MobileDock";
import SplashScreen, { splashScript } from "@/components/SplashScreen";
import MotionProvider from "@/components/ui/MotionProvider";
import "./globals.css";

// Interface et contenu : Comfortaa (variable, 300 à 700), auto-hébergée par next/font.
const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  display: "swap",
});

// Surimi (titres) : fichiers officiels à déposer dans public/fonts/ (voir LISEZMOI.txt).
// Détectés au build : sans fichier, aucune requête vers /fonts/ n'est émise (pas de 404).
const surimiFiles = [
  { file: "surimi-regular.woff2", weight: 400 },
  { file: "surimi-bold.woff2", weight: 700 },
].filter((f) => existsSync(join(process.cwd(), "public", "fonts", f.file)));
const surimiCss = surimiFiles
  .map(
    (f) =>
      `@font-face{font-family:"Surimi";font-style:normal;font-weight:${f.weight};font-display:swap;src:url("/fonts/${f.file}") format("woff2")}`,
  )
  .join("");

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
    <html lang="fr" className={`${comfortaa.variable}${surimiFiles.length ? " has-surimi" : ""}`} suppressHydrationWarning>
      <head>
        {surimiFiles.length > 0 && <style dangerouslySetInnerHTML={{ __html: surimiCss }} />}
        {surimiFiles.map((f) => (
          <link key={f.file} rel="preload" href={`/fonts/${f.file}`} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
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
