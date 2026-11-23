"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  Search,
  Package,
  Check,
  Loader2,
  Clock,
  MapPin,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import TrackingHero from "@/components/tracking/TrackingHero";
import ClientTrackingResult, {
  type PublicClient,
} from "@/components/tracking/ClientTrackingResult";
import type { LeadStatus } from "@/types/database.types";

type StageStatus = "done" | "active" | "pending";

interface Stage {
  id: LeadStatus;
  label: string;
  location: string;
  status: StageStatus;
  detail: string;
  step: number;
}

interface PublicLead {
  reference: string;
  status: LeadStatus;
  name: string;
  product_name: string | null;
  destination_city: string | null;
  created_at: string;
}

const STAGES: {
  id: LeadStatus;
  label: string;
  location: string;
  detail: string;
}[] = [
  {
    id: "confirme",
    label: "Demande confirmée",
    location: "TRACOLI",
    detail: "Votre paiement a été confirmé et votre projet est activé.",
  },
  {
    id: "recherche",
    label: "Recherche fournisseur",
    location: "Guangzhou, Chine",
    detail: "Notre équipe identifie les meilleurs fournisseurs pour vous.",
  },
  {
    id: "devis",
    label: "Devis envoyé",
    location: "TRACOLI",
    detail: "Un devis détaillé vous a été transmis par WhatsApp ou email.",
  },
  {
    id: "achat",
    label: "Achat effectué",
    location: "Guangzhou, Chine",
    detail: "La commande a été passée auprès du fournisseur. Production en cours.",
  },
  {
    id: "expedition",
    label: "Expédition",
    location: "Port / Aéroport, Chine",
    detail: "Votre marchandise est en cours de chargement pour l'expédition.",
  },
  {
    id: "en_transit",
    label: "En transit",
    location: "En mer / En vol",
    detail: "Votre marchandise a quitté la Chine et est en route.",
  },
  {
    id: "douane",
    label: "Dédouanement",
    location: "Pays de destination",
    detail: "La marchandise est arrivée. Formalités douanières en cours.",
  },
  {
    id: "livre",
    label: "Livré",
    location: "Votre adresse",
    detail: "Votre marchandise est disponible. Bonne réception !",
  },
];

const STATUS_ORDER: LeadStatus[] = STAGES.map((s) => s.id);

function buildTimeline(lead: PublicLead): Stage[] {
  const currentIdx = STATUS_ORDER.indexOf(lead.status);
  const isClosed = lead.status === "cloture";

  return STAGES.map((stage, i) => {
    const idx = STATUS_ORDER.indexOf(stage.id);
    let status: StageStatus = "pending";

    if (isClosed) {
      status = "done";
    } else if (idx < currentIdx) {
      status = "done";
    } else if (idx === currentIdx) {
      status = "active";
    }

    return { ...stage, status, step: i + 1 };
  });
}

export default function SmartTrackingWidget() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<PublicLead | null>(null);
  const [clientData, setClientData] = useState<PublicClient | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [ambiguous, setAmbiguous] = useState(false);

  const search = useCallback(async (raw: string) => {
    const ref = raw.trim().toUpperCase();
    if (!ref) return;

    setLoading(true);
    setNotFound(false);
    setAmbiguous(false);
    setLead(null);
    setClientData(null);

    try {
      const res = await fetch(`/api/track?code=${encodeURIComponent(ref)}`);
      const data = await res.json();

      if (data.type === "client") setClientData(data as PublicClient);
      else if (data.type === "lead") setLead(data.lead as PublicLead);
      else if (data.type === "ambiguous") setAmbiguous(true);
      else setNotFound(true);
    } catch {
      setNotFound(true);
    }
    setLoading(false);
  }, []);

  // Lien reçu par email/WhatsApp : /suivre?ref=TRC-2026-0001
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (!ref) return;
    const t = setTimeout(() => {
      setCode(ref);
      search(ref);
    }, 0);
    return () => clearTimeout(t);
  }, [search]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    search(code);
  };

  const hasResult = !!(lead || clientData);

  /** Retour au champ de saisie : pour un autre colis, ou pour un proche. */
  const reset = () => {
    setLead(null);
    setClientData(null);
    setNotFound(false);
    setAmbiguous(false);
    setCode("");
    window.history.replaceState(null, "", "/suivre");
    window.scrollTo({ top: 0 });
  };

  const stages = lead ? buildTimeline(lead) : [];
  const activeStage = stages.find((s) => s.status === "active");
  const doneCount = stages.filter((s) => s.status === "done").length;
  const progress = lead
    ? lead.status === "cloture"
      ? 100
      : Math.round(
          ((doneCount + (activeStage ? 0.5 : 0)) / STAGES.length) * 100,
        )
    : 0;

  return (
    <>
    {!hasResult && <TrackingHero />}
    <section className={`bg-white pb-28 lg:pb-24 ${hasResult ? "pt-8 lg:pt-12" : "py-10 lg:py-14"}`}>
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {/* Search bar */}
        {!hasResult && (
        <form
          onSubmit={onSearch}
          className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code de votre colis"
              className="w-full min-h-[56px] rounded-xl border-2 border-ink-200 bg-white py-4 pr-4 pl-12 text-base text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-tracoli-500 focus:ring-4 focus:ring-tracoli-500/10"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-8 py-4 text-base font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Recherche…
              </>
            ) : (
              <>
                <Search className="size-5" />
                Tracer
              </>
            )}
          </button>
        </form>
        )}

        <>
          {/* Not found */}
          {notFound && (
            <div key="not-found" className="mx-auto mt-10 max-w-xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center anim-in">
              <AlertCircle className="mx-auto size-10 text-red-400" />
              <p className="mt-4 text-lg font-bold text-red-800">
                Référence introuvable
              </p>
              <p className="mt-2 text-base leading-relaxed text-red-600">
                Vérifiez le code inscrit sur votre colis, puis réessayez.
              </p>
            </div>
          )}

          {/* Plusieurs clients pour un même code externe */}
          {ambiguous && (
            <div key="ambiguous" className="mx-auto mt-10 max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center anim-in">
              <AlertCircle className="mx-auto size-10 text-amber-500" />
              <p className="mt-4 text-lg font-bold text-amber-800">
                Ce code correspond à plusieurs colis
              </p>
              <p className="mt-2 text-base text-amber-700">
                Entrez plutôt le code inscrit sur votre colis.
              </p>
            </div>
          )}

          {/* Result : client avec ses colis */}
          {clientData && (
            <div key="client-result">
              <ClientTrackingResult data={clientData} onReset={reset} />
            </div>
          )}

          {/* Result : demande de sourcing */}
          {lead && (
            <div key="result" className="mt-10 overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card-lg anim-in">
              {/* Header */}
              <div className="border-b border-ink-200 bg-gradient-to-r from-white to-ink-50 px-6 py-6 sm:px-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-ink-400 uppercase">
                      Référence
                    </p>
                    <p className="mt-1 font-mono text-xl font-extrabold text-ink-900">
                      {lead.reference}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {lead.product_name && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-ink-100 px-2.5 py-1 text-sm font-medium text-ink-600">
                          <Package className="size-3.5" />
                          {lead.product_name}
                        </span>
                      )}
                      {lead.destination_city && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-ink-100 px-2.5 py-1 text-sm font-medium text-ink-600">
                          <MapPin className="size-3.5" />
                          {lead.destination_city}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {activeStage && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-tracoli-50 px-4 py-2 text-sm font-bold text-tracoli-700">
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-tracoli-500 opacity-75" />
                          <span className="relative inline-flex size-2 rounded-full bg-tracoli-500" />
                        </span>
                        {activeStage.label}
                      </span>
                    )}
                    {lead.status === "cloture" && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                        <Check className="size-4" strokeWidth={3} />
                        Commande terminée
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-ink-600">
                      Progression
                    </span>
                    <span className="font-bold text-tracoli-500">
                      {progress}%
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-100">
                    <div style={{ width: `${progress}%` }} className="h-full rounded-full bg-tracoli-500 transition-[width] duration-700" />
                  </div>
                  <p className="mt-1.5 text-sm text-ink-400">
                    Étape {doneCount + (activeStage ? 1 : 0)} sur{" "}
                    {STAGES.length}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-6 sm:p-8">
                <h3 className="text-base font-bold text-ink-800">
                  Détail du parcours
                </h3>
                <ol className="relative mt-6">
                  {stages.map((stage, i) => {
                    const isLast = i === stages.length - 1;
                    return (
                      <li
                        key={stage.id}
                        className="relative flex gap-5 pb-8 last:pb-0"
                      >
                        {!isLast && (
                          <span
                            aria-hidden
                            className={`absolute top-10 left-[17px] h-[calc(100%-24px)] w-px ${
                              stage.status === "done"
                                ? "bg-emerald-300"
                                : "bg-ink-200"
                            }`}
                          />
                        )}
                        <span
                          className={`relative z-10 grid size-9 shrink-0 place-items-center rounded-full border-2 text-sm font-bold ${
                            stage.status === "done"
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : stage.status === "active"
                                ? "border-tracoli-500 bg-white text-tracoli-500"
                                : "border-ink-200 bg-white text-ink-400"
                          }`}
                        >
                          {stage.status === "done" && (
                            <Check className="size-4.5" strokeWidth={3} />
                          )}
                          {stage.status === "active" && (
                            <span className="relative flex size-3.5">
                              <span className="absolute inline-flex size-full animate-ping rounded-full bg-tracoli-500 opacity-60" />
                              <span className="relative inline-flex size-3.5 rounded-full bg-tracoli-500" />
                            </span>
                          )}
                          {stage.status === "pending" && (
                            <Clock className="size-4" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1 pt-1">
                          <p
                            className={`text-base font-bold tracking-tight ${
                              stage.status === "pending"
                                ? "text-ink-400"
                                : "text-ink-900"
                            }`}
                          >
                            {stage.label}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                            <MapPin className="size-3.5" />
                            {stage.location}
                          </p>
                          <p
                            className={`mt-1.5 text-sm leading-relaxed ${
                              stage.status === "pending"
                                ? "text-ink-400"
                                : "text-ink-600"
                            }`}
                          >
                            {stage.detail}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={reset}
                    className="rounded-xl border border-ink-200 bg-white px-5 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-100"
                  >
                    Suivre un autre colis
                  </button>
                </div>
              </div>
            </div>
          )}
        </>

        {/* Empty state */}
        {!lead && !clientData && !notFound && !ambiguous && (
          <div className="mx-auto mt-10 max-w-xl anim-in">
            {/* CTA */}
            <div className="rounded-3xl bg-tracoli-500 p-6 text-center text-white sm:p-8">
              <p className="text-lg font-bold">
                Pas encore de commande ?
              </p>
              <p className="mt-1 text-base text-white">
                Passez votre première commande et recevez votre code de suivi
                instantanément.
              </p>
              <a
                href="/demande"
                className="mt-5 inline-flex min-h-[56px] items-center gap-2 rounded-2xl bg-white px-8 py-4 text-[15px] font-bold text-tracoli-600 transition-colors hover:bg-tracoli-50 active:scale-[0.98]"
              >
                Passer commande
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
