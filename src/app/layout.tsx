import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TRACOLI BUSINESS — Transit & Fret Chine–Afrique",
  description:
    "Leader Supply-Chain, Transit & Fret Chine–Afrique. Spécialiste RD Congo, Burundi et Afrique Centrale/Est. Cotation fret aérien & maritime en 30 secondes.",
  keywords: [
    "fret Chine Afrique", "transit RD Congo", "dédouanement Kinshasa",
    "groupage maritime Burundi", "sourcing Guangzhou", "TRACOLI BUSINESS",
  ],
  openGraph: {
    title: "TRACOLI BUSINESS — Transit & Fret Chine–Afrique",
    description:
      "Fret aérien express, maritime LCL/FCL et sourcing usines. Hubs Guangzhou · Yiwu · Kinshasa · Bujumbura.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body className="bg-navy-900 text-slate-100 antialiased">{children}</body>
    </html>
  );
}