import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/hooks/useLocale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TRACOLI BUSINESS — Trade Connectors Logistics International",
  description:
    "Sourcing international, importation et logistique entre l'Asie et l'Afrique. Bujumbura, Kinshasa, Goma, Kampala, Mombasa.",
};

export const viewport: Viewport = {
  themeColor: "#E60000",
  width: "device-width",
  initialScale: 1,
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
        </LocaleProvider>
      </body>
    </html>
  );
}