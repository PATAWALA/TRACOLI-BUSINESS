"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Envoie une action visiteur à /api/events (sans jamais gêner la navigation). */
export function trackAction(type: string, label = "", detail = "") {
  try {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, page: location.pathname, label, detail }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignoré */
  }
}

/** Détecte tout clic sur un lien WhatsApp du site et prévient l'admin. */
export default function ActionTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a || !/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(a.href)) return;
      let msg = "";
      try {
        msg = new URL(a.href).searchParams.get("text") ?? "";
      } catch {
        /* ignoré */
      }
      trackAction("whatsapp_click", (a.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 80), msg);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);
  return null;
}
