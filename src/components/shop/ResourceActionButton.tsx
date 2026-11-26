"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle, Download, Loader2, Mail, ShoppingBag, X } from "lucide-react";
import { getResourceAction } from "@/lib/resource-actions";
import type { Resource } from "@/data/shared/types";
import { trackAction } from "@/components/ActionTracker";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STORAGE_KEY = "tracoli:resource-email";

/**
 * Bouton « Télécharger » / « Commander » d'un livre.
 * Avant d'ouvrir le fichier ou WhatsApp, on demande l'e-mail du visiteur (et seulement l'e-mail),
 * enregistré dans la liste newsletter (sans doublon, voir /api/newsletter).
 */
export default function ResourceActionButton({
  resource,
  className,
}: {
  resource: Resource;
  className?: string;
}) {
  const action = getResourceAction(resource);
  const isPremium = resource.access === "premium";

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function openModal() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setEmail(saved);
    } catch {
      /* stockage indisponible : on continue sans pré-remplir */
    }
    setError("");
    setDone(false);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!EMAIL_RE.test(clean)) {
      setError("Entrez une adresse e-mail valide.");
      return;
    }
    setError("");
    setLoading(true);

    // On ouvre l'onglet tout de suite (geste du clic) pour que le navigateur ne le bloque pas.
    const tab = window.open("", "_blank");
    if (tab) tab.opener = null;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean, source: `ressource:${resource.slug}` }),
      });
      // 409 = déjà inscrit : c'est un succès, pas de doublon créé.
      if (!res.ok && res.status !== 409) throw new Error("save-failed");

      try {
        localStorage.setItem(STORAGE_KEY, clean);
      } catch {
        /* ignoré */
      }
      if (tab) tab.location.href = action.href;
      trackAction("resource_open", resource.slug, clean);
      setDone(true);
    } catch {
      tab?.close();
      setError("Une erreur est survenue. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  }

  const icon = isPremium ? (
    <ShoppingBag className="size-4" aria-hidden />
  ) : action.isFile ? (
    <Download className="size-4" aria-hidden />
  ) : (
    <ArrowRight className="size-4" aria-hidden />
  );

  return (
    <>
      <button ref={triggerRef} type="button" onClick={openModal} className={className}>
        {action.label}
        {icon}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink-900/60 p-4 sm:items-center"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resource-modal-title"
            className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Fermer"
              className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100"
            >
              <X className="size-5" aria-hidden />
            </button>

            {done ? (
              <div className="text-center">
                <CheckCircle className="mx-auto size-12 text-emerald-600" aria-hidden />
                <h2 id="resource-modal-title" className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900">
                  Merci !
                </h2>
                <p className="mt-2 text-base leading-relaxed text-ink-700">
                  {isPremium
                    ? "WhatsApp s'est ouvert avec votre commande. Rien ne s'est ouvert ?"
                    : action.isFile
                      ? "Votre ressource s'est ouverte dans un nouvel onglet. Rien ne s'est ouvert ?"
                      : "WhatsApp s'est ouvert pour demander ce guide. Rien ne s'est ouvert ?"}
                </p>
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeModal}
                  className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-tracoli-500 px-6 text-[15px] font-bold text-white transition-colors hover:bg-tracoli-600"
                >
                  {action.label}
                  {icon}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 id="resource-modal-title" className="pr-10 text-2xl font-extrabold tracking-tight text-ink-900">
                  Recevez « {resource.title} »
                </h2>
                <p className="mt-2 text-base leading-relaxed text-ink-700">
                  Entrez votre e-mail pour continuer. Vous recevrez aussi nos prochains guides et bons plans.
                </p>

                <label htmlFor="resource-email" className="mt-5 block text-sm font-semibold text-ink-800">
                  Votre e-mail
                </label>
                <div className="relative mt-1.5">
                  <Mail className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-400" aria-hidden />
                  <input
                    ref={inputRef}
                    id="resource-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="vous@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? "resource-email-error" : undefined}
                    className="w-full rounded-2xl border-2 border-ink-200 bg-white py-3.5 pr-4 pl-11 text-base text-ink-900 placeholder:text-ink-400 focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/20 focus:outline-none"
                  />
                </div>
                {error && (
                  <p id="resource-email-error" role="alert" className="mt-2 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-tracoli-500 px-6 text-[15px] font-bold text-white transition-colors hover:bg-tracoli-600 active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <>{action.label} {icon}</>}
                </button>
                <p className="mt-3 text-center text-xs text-ink-500">
                  Pas de spam · Désinscription en un clic
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
