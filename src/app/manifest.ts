import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TRACOLI BUSINESS — Sourcing & Logistique Chine–Afrique",
    short_name: "TRACOLI",
    description:
      "Votre sourcing Chine → Afrique, simplement. Sourcing, fret, dédouanement et livraison.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#E60000",
    orientation: "portrait",
    icons: [
      { src: "/favicon.ico", sizes: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}