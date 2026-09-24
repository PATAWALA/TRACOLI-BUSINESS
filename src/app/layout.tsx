import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/hooks/useLocale";
import Header from "@/components/Header";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const BASE_URL = "https://tracoli-business.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TRACOLI BUSINESS — Sourcing & Logistique Chine–Afrique",
    template: "%s | TRACOLI BUSINESS",
  },
  description:
    "Votre sourcing Chine → Afrique, simplement. Nous trouvons vos fournisseurs, sécurisons vos achats et organisons votre livraison à Bujumbura, Kinshasa, Goma, Kampala et Mombasa.",
  keywords: [
    "sourcing Chine Afrique",
    "import Chine Burundi",
    "import Chine RDC",
    "fret aérien Chine Afrique",
    "fret maritime groupage",
    "dédouanement Kinshasa",
    "dédouanement Bujumbura",
    "TRACOLI BUSINESS",
    "transit international",
    "groupage LCL",
    "conteneur FCL",
  ],
  authors: [{ name: "TRACOLI BUSINESS" }],
  creator: "TRACOLI BUSINESS",
  publisher: "TRACOLI BUSINESS",

  /* ---------- ICÔNES / FAVICONS ---------- */
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/maskable-icon-512x512.png",
        color: "#E50209",
      },
    ],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: BASE_URL,
    siteName: "TRACOLI BUSINESS",
    title: "TRACOLI BUSINESS — Sourcing & Logistique Chine–Afrique",
    description:
      "Nous trouvons vos fournisseurs en Chine, sécurisons vos achats et organisons votre livraison jusqu'à destination.",
  },

  twitter: {
    card: "summary_large_image",
    title: "TRACOLI BUSINESS — Sourcing & Logistique Chine–Afrique",
    description: "Votre sourcing Chine → Afrique, simplement.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#E50209",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body className="bg-white text-ink-900 antialiased">
        <LocaleProvider>
          <Header />
          {children}
          <Footer />
          <MobileBottomNav />
        </LocaleProvider>
      </body>
    </html>
  );
}