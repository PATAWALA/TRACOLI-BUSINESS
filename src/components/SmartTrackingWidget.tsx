"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  Check,
  Loader2,
  CircleDot,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { DEMO_TRACKING, CONTACT, waLink } from "@/data/content";

export default function SmartTrackingWidget() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const onSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setResult(code.trim().toUpperCase());
  };

  const reset = () => {
    setResult(null);
    setCode("");
  };

  return (
    <section id="tracking" className="scroll-mt-24 bg-ink-50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-tracoli-600 uppercase">
            📍 Suivi en temps réel
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            Où est ma marchandise ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14.5px] text-ink-500">
            Saisissez votre numéro de suivi TRACOLI (ex : <span className="font-mono text-ink-800">CTN-2041</span>) pour voir l&apos;avancement.
          </p>
        </div>

        {/* Barre de recherche */}
        <form
          onSubmit={onSearch}
          className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Entrez votre numéro de suivi…"
              className="w-full rounded-xl border border-ink-200 bg-white py-3.5 pr-4 pl-11 text-[14px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-tracoli-500 focus:ring-4 focus:ring-tracoli-500/10"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Recherche…
              </>
            ) : (
              <>
                <Search className="size-4" />
                Tracer
              </>
            )}
          </button>
        </form>

        {/* Résultats */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card-lg"
            >
              {/* Header résultat */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-200 bg-gradient-to-r from-white to-ink-50 px-6 py-5">
                <div>
                  <p className="text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                    Numéro de suivi
                  </p>
                  <p className="mt-0.5 font-mono text-[15px] font-extrabold text-ink-900">
                    {result}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  En transit
                </span>
              </div>

              {/* Timeline */}
              <div className="p-6 sm:p-8">
                <ol className="relative">
                  {DEMO_TRACKING.map((stage, i) => {
                    const isLast = i === DEMO_TRACKING.length - 1;
                    return (
                      <li key={stage.id} className="relative flex gap-4 pb-8 last:pb-0">
                        {/* Ligne verticale */}
                        {!isLast && (
                          <span
                            aria-hidden
                            className="absolute top-8 left-[15px] h-[calc(100%-16px)] w-px bg-ink-200"
                          />
                        )}

                        {/* Pastille */}
                        <span
                          className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full border-2 ${
                            stage.status === "done"
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : stage.status === "active"
                              ? "border-tracoli-500 bg-white text-tracoli-500"
                              : "border-ink-200 bg-white text-ink-400"
                          }`}
                        >
                          {stage.status === "done" && (
                            <Check className="size-4" strokeWidth={3} />
                          )}
                          {stage.status === "active" && (
                            <span className="relative flex size-3">
                              <span className="absolute inline-flex size-full animate-ping rounded-full bg-tracoli-500 opacity-60" />
                              <span className="relative inline-flex size-3 rounded-full bg-tracoli-500" />
                            </span>
                          )}
                          {stage.status === "pending" && (
                            <Clock className="size-3.5" />
                          )}
                        </span>

                        {/* Contenu */}
                        <div className="min-w-0 flex-1 pt-0.5">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                            <p
                              className={`text-[14px] font-extrabold tracking-tight ${
                                stage.status === "pending"
                                  ? "text-ink-500"
                                  : "text-ink-900"
                              }`}
                            >
                              {stage.label}
                            </p>
                            <p className="text-[11.5px] font-semibold text-ink-400">
                              {stage.date}
                            </p>
                          </div>

                          <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink-500">
                            <MapPin className="size-3" />
                            {stage.location}
                          </p>

                          {stage.detail && (
                            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">
                              {stage.detail}
                            </p>
                          )}

                          {/* Barre de progression sur l'étape active */}
                          {stage.status === "active" && (
                            <div className="mt-3">
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: "65%" }}
                                  transition={{
                                    duration: 1.2,
                                    delay: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="h-full rounded-full bg-tracoli-500"
                                />
                              </div>
                              <p className="mt-1.5 text-[11px] font-bold text-tracoli-600">
                                65% du trajet parcouru
                              </p>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3 border-t border-ink-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12px] text-ink-500">
                    Une question sur ce colis ?
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <a
                      href={waLink(
                        `Bonjour ${CONTACT.manager}, je souhaite des informations sur mon colis ${result}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-tracoli-500 px-4 py-2.5 text-[12.5px] font-bold text-white shadow-[var(--shadow-red)] hover:bg-tracoli-600"
                    >
                      <ExternalLink className="size-3.5" />
                      Contacter {CONTACT.manager}
                    </a>
                    <button
                      onClick={reset}
                      className="rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-ink-700 hover:bg-ink-50"
                    >
                      Nouvelle recherche
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* État initial */}
        {!result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-10 max-w-xl rounded-2xl border border-dashed border-ink-300 bg-white/60 p-6 text-center"
          >
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-ink-100 text-ink-500">
              <Package className="size-5" />
            </span>
            <p className="mt-4 text-[13.5px] font-semibold text-ink-800">
              Aucun envoi en cours de consultation
            </p>
            <p className="mt-1 text-[12px] text-ink-500">
              Démo : saisissez <span className="font-mono font-bold text-tracoli-500">CTN-2041</span> pour voir la timeline interactive.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}