import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TRACOLI BUSINESS — Sourcing, Fret & Suivi Chine–Afrique",
  description:
    "Le pont logistique entre la Chine et l'Afrique. Sourcing, fret aérien/maritime, dédouanement et suivi en temps réel.",
};

export const viewport: Viewport = {
  themeColor: "#E60000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body className="bg-white text-ink-900 antialiased">{children}</body>
    </html>
  );
}