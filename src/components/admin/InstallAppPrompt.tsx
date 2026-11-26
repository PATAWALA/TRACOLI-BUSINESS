"use client";

import { useEffect, useState } from "react";
import { Download, Monitor, X } from "lucide-react";

interface InstallEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "tracoli:admin-install-dismissed";

/**
 * Propose d'installer l'espace admin comme application de bureau (Chrome / Edge) :
 * une icône sur le PC, une fenêtre à part, sans passer par Google.
 */
export default function InstallAppPrompt() {
  const [evt, setEvt] = useState<InstallEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* ignoré */
    }
    // Déjà installée et ouverte comme application : rien à proposer.
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    setHidden(false);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/admin-sw.js", { scope: "/admin" }).catch(() => {});
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as InstallEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignoré */
    }
    setHidden(true);
  }

  async function install() {
    if (!evt) {
      setShowHelp(true);
      return;
    }
    await evt.prompt();
    const { outcome } = await evt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setEvt(null);
  }

  if (hidden) return null;

  return (
    <div className="mt-6 rounded-2xl border border-ink-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500">
          <Monitor className="size-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          {installed ? (
            <p className="text-sm font-semibold text-emerald-700">
              Application installée ✓ Ouvrez « TRACOLI Admin » depuis votre bureau ou le menu Démarrer.
            </p>
          ) : (
            <>
              <p className="text-sm font-bold text-ink-900">Installer l&apos;application sur ce PC</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-500">
                Une icône sur votre bureau pour gérer TRACOLI en un clic, sans chercher sur Google.
              </p>
              <button
                type="button"
                onClick={install}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-tracoli-600"
              >
                <Download className="size-4" aria-hidden />
                Installer l&apos;application
              </button>
              {showHelp && (
                <p className="mt-3 rounded-lg bg-ink-50 px-3 py-2 text-xs leading-relaxed text-ink-600">
                  Votre navigateur ne propose pas l&apos;installation automatique. Dans <strong>Chrome</strong> ou{" "}
                  <strong>Edge</strong> : menu <strong>⋮</strong> (en haut à droite) → <strong>Enregistrer et partager</strong> →{" "}
                  <strong>Installer TRACOLI Admin</strong> (ou l&apos;icône d&apos;écran dans la barre d&apos;adresse).
                </p>
              )}
            </>
          )}
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fermer"
          className="grid size-7 shrink-0 place-items-center rounded-lg text-ink-400 hover:bg-ink-50 hover:text-ink-600"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
