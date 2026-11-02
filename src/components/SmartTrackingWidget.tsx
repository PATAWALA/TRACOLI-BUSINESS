"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/lib/supabase/client";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";
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
    id: "received",
    label: "Demande reçue",
    location: "TRACOLI",
    detail: "Votre demande a été enregistrée dans notre système.",
  },
  {
    id: "researching",
    label: "Recherche fournisseur",
    location: "Guangzhou, Chine",
    detail: "Notre équipe identifie les meilleurs fournisseurs pour vous.",
  },
  {
    id: "quoted",
    label: "Devis envoyé",
    location: "TRACOLI",
    detail: "Un devis détaillé vous a été transmis par WhatsApp ou email.",
  },
  {
    id: "validating",
    label: "Validation en cours",
    location: "TRACOLI",
    detail: "Nous attendons votre accord pour lancer la commande.",
  },
  {
    id: "payment_confirmed",
    label: "Paiement confirmé",
    location: "TRACOLI",
    detail: "Votre paiement a bien été reçu. Merci !",
  },
  {
    id: "purchased",
    label: "Achat effectué",
    location: "Guangzhou, Chine",
    detail:
      "La commande a été passée auprès du fournisseur. Production en cours.",
  },
  {
    id: "shipping",
    label: "Expédition en cours",
    location: "Port / Aéroport, Chine",
    detail: "Votre marchandise a quitté la Chine et est en route.",
  },
  {
    id: "arrived",
    label: "Arrivée à destination",
    location: "Pays de destination",
    detail:
      "La marchandise est arrivée dans votre pays. Formalités en cours.",
  },
  {
    id: "delivered",
    label: "Livré",
    location: "Votre adresse",
    detail: "Votre marchandise est disponible. Bonne réception !",
  },
];

const STATUS_ORDER: LeadStatus[] = STAGES.map((s) => s.id);

function buildTimeline(lead: PublicLead): Stage[] {
  const currentIdx = STATUS_ORDER.indexOf(lead.status);
  const isClosed = lead.status === "closed";

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
  const [notFound, setNotFound] = useState(false);

  const onSearch = async (e: FormEvent) => {
    e.preventDefault();
    const ref = code.trim().toUpperCase();
    if (!ref) return;

    setLoading(true);
    setNotFound(false);
    setLead(null);

    const { data } = await supabase
      .from("leads")
      .select(
        "reference, status, name, product_name, destination_city, created_at",
      )
      .eq("reference", ref)
      .single();

    if (!data) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setLead(data as PublicLead);
    setLoading(false);
  };

  const stages = lead ? buildTimeline(lead) : [];
  const activeStage = stages.find((s) => s.status === "active");
  const doneCount = stages.filter((s) => s.status === "done").length;
  const progress = lead
    ? lead.status === "closed"
      ? 100
      : Math.round(
          ((doneCount + (activeStage ? 0.5 : 0)) / STAGES.length) * 100,
        )
    : 0;

  return (
    <section className="bg-white py-10 pb-28 lg:py-14 lg:pb-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {/* Search bar */}
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
              placeholder="Entrez votre code (ex : TRC-2026-0001)"
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

        <AnimatePresence mode="wait">
          {/* Not found */}
          {notFound && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto mt-10 max-w-xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
            >
              <AlertCircle className="mx-auto size-10 text-red-400" />
              <p className="mt-4 text-lg font-bold text-red-800">
                Référence introuvable
              </p>
              <p className="mt-2 text-base leading-relaxed text-red-600">
                Vérifiez votre code de suivi ou contactez-nous sur WhatsApp pour
                obtenir de l&apos;aide.
              </p>
              <a
                href={waLink(
                  `Bonjour ${CONTACT.manager}, je n'arrive pas à tracer ma commande. Pouvez-vous m'aider ?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-base font-bold text-white hover:bg-emerald-700"
              >
                <FaWhatsapp className="size-5" />
                Contacter le support
              </a>
            </motion.div>
          )}

          {/* Result */}
          {lead && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card-lg"
            >
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
                    {lead.status === "closed" && (
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
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-tracoli-500 to-emerald-500"
                    />
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

                {/* Bottom actions */}
                <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-ink-200 bg-ink-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-semibold text-ink-800">
                      Une question sur votre commande ?
                    </p>
                    <p className="mt-0.5 text-sm text-ink-500">
                      Notre équipe répond sous 24h sur WhatsApp.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <a
                      href={waLink(
                        `Bonjour ${CONTACT.manager}, je souhaite des informations sur ma commande ${lead.reference}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                    >
                      <FaWhatsapp className="size-4" />
                      Contacter sur WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setLead(null);
                        setCode("");
                      }}
                      className="rounded-xl border border-ink-200 bg-white px-5 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-100"
                    >
                      Nouvelle recherche
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!lead && !notFound && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-12 max-w-xl"
          >
            <div className="rounded-2xl border border-dashed border-ink-300 bg-ink-50/60 p-8 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-ink-500 shadow-sm">
                <Package className="size-6" />
              </span>
              <p className="mt-5 text-lg font-bold text-ink-800">
                Entrez votre référence ci-dessus
              </p>
              <p className="mt-2 text-base leading-relaxed text-ink-500">
                Votre code de suivi vous a été communiqué par WhatsApp ou par
                email lors de votre commande (format : TRC-2026-XXXX).
              </p>
            </div>

            {/* How it works */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Entrez votre code",
                  desc: "Tapez le code reçu après votre commande.",
                },
                {
                  step: "2",
                  title: "Suivez en temps réel",
                  desc: "Voyez chaque étape de votre commande.",
                },
                {
                  step: "3",
                  title: "Restez informé",
                  desc: "Recevez des mises à jour par email.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-ink-200 bg-white p-5 text-center"
                >
                  <span className="mx-auto grid size-10 place-items-center rounded-xl bg-tracoli-50 text-base font-extrabold text-tracoli-500">
                    {item.step}
                  </span>
                  <p className="mt-3 text-sm font-bold text-ink-800">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-ink-500">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-tracoli-500 to-tracoli-600 p-6 text-center text-white sm:p-8">
              <p className="text-lg font-bold">
                Pas encore de commande ?
              </p>
              <p className="mt-1 text-base text-white/80">
                Passez votre première commande et recevez votre code de suivi
                instantanément.
              </p>
              <a
                href="/demande"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-bold text-tracoli-500 shadow-lg transition-all hover:bg-ink-50"
              >
                Passer commande
                <ArrowRight className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
