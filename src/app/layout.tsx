import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
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

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "TRACOLI BUSINESS",
    title: "TRACOLI BUSINESS — Sourcing & Logistique Chine–Afrique",
    description:
      "Nous trouvons vos fournisseurs en Chine, sécurisons vos achats et organisons votre livraison jusqu'à destination.",
    images: [
      {
        url: `${BASE_URL}/images/hero-delivery.jpeg`,
        width: 1200,
        height: 630,
        alt: "TRACOLI BUSINESS — Sourcing & Logistique Chine–Afrique",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TRACOLI BUSINESS — Sourcing & Logistique Chine–Afrique",
    description: "Votre sourcing Chine → Afrique, simplement.",
    images: [`${BASE_URL}/images/hero-delivery.jpeg`],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TRACOLI Business",
  alternateName:
    "TRACOLI Business - Trade Connectors Logistics International",
  description:
    "Sourcing, expédition et coordination douanière sur le corridor Chine–Afrique. Fret aérien et maritime vers le Burundi, la RDC, l'Ouganda et le Kenya.",
  url: BASE_URL,
  telephone: "+257 69 03 27 65",
  email: "contact@tracoli-business.com",
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Bujumbura",
      addressCountry: "BI",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Guangzhou",
      addressCountry: "CN",
    },
  ],
  areaServed: [
    { "@type": "Country", name: "Burundi" },
    { "@type": "Country", name: "République Démocratique du Congo" },
    { "@type": "Country", name: "Ouganda" },
    { "@type": "Country", name: "Kenya" },
    { "@type": "Country", name: "Chine" },
  ],
  serviceType: [
    "Sourcing international",
    "Fret aérien",
    "Fret maritime",
    "Groupage LCL",
    "Coordination douanière",
  ],
  priceRange: "$$",
  image: `${BASE_URL}/images/hero-delivery.jpeg`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body className="bg-white text-ink-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
