import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TRACOLI BUSINESS — Sourcing & Logistique Chine–Afrique",
    short_name: "TRACOLI",
    description:
      "Votre sourcing Chine → Afrique, simplement. Sourcing, fret, dédouanement et livraison.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#E50209",
    theme_color: "#E50209",
    lang: "fr",
    scope: "/",
    icons: [
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}