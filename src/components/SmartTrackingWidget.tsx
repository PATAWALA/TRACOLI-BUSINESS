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
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";
import type { Lead, Order } from "@/types/database.types";

type StageStatus = "done" | "active" | "pending";

interface Stage {
  id: string;
  label: string;
  location: string;
  status: StageStatus;
  detail: string;
}

const ORDER_STAGES = [
  { id: "nouveau", label: "Demande reçue", location: "TRACOLI", detail: "Votre demande a été enregistrée." },
  { id: "contacte", label: "Prise de contact", location: "TRACOLI", detail: "Notre équipe vous a contacté." },
  { id: "en_cours", label: "Recherche fournisseur", location: "Guangzhou, Chine", detail: "Identification et négociation en cours." },
  { id: "confirme", label: "Commande confirmée", location: "Guangzhou, Chine", detail: "Le fournisseur a confirmé la commande." },
  { id: "en_production", label: "En production", location: "Usine fournisseur", detail: "Votre produit est en cours de fabrication." },
  { id: "expedie", label: "Expédié", location: "Port / Aéroport Chine", detail: "Votre marchandise a quitté l'entrepôt." },
  { id: "en_transit", label: "En transit", location: "En route", detail: "Transport aérien ou maritime en cours." },
  { id: "dedouanement", label: "Coordination douanière", location: "Pays de destination", detail: "Formalités douanières en cours." },
  { id: "livre", label: "Livré", location: "Votre adresse", detail: "Votre marchandise est disponible." },
] as const;

function buildTimeline(lead: Lead, order: Order | null): Stage[] {
  const leadStatuses = ["nouveau", "contacte", "en_cours"];
  const orderStatuses = ["confirme", "en_production", "expedie", "en_transit", "dedouanement", "livre"];

  const currentLeadIdx = leadStatuses.indexOf(lead.status);
  const isLeadWon = lead.status === "gagne";
  const currentOrderIdx = order ? orderStatuses.indexOf(order.status) : -1;

  return ORDER_STAGES.map((stage) => {
    const leadIdx = leadStatuses.indexOf(stage.id);
    const orderIdx = orderStatuses.indexOf(stage.id);

    let status: StageStatus = "pending";

    if (leadIdx >= 0) {
      if (isLeadWon || leadIdx < currentLeadIdx) status = "done";
      else if (leadIdx === currentLeadIdx) status = "active";
    } else if (orderIdx >= 0 && order) {
      if (orderIdx < currentOrderIdx) status = "done";
      else if (orderIdx === currentOrderIdx) status = "active";
    } else if (isLeadWon && !order && stage.id === "confirme") {
      status = "active";
    }

    return { ...stage, status };
  });
}

export default function SmartTrackingWidget() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<Lead | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  const onSearch = async (e: FormEvent) => {
    e.preventDefault();
    const ref = code.trim().toUpperCase();
    if (!ref) return;

    setLoading(true);
    setNotFound(false);
    setLead(null);
    setOrder(null);

    const { data: leadData } = await supabase
      .from("leads")
      .select("*")
      .eq("reference", ref)
      .single();

    if (!leadData) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setLead(leadData as Lead);

    const { data: orderData } = await supabase
      .from("orders")
      .select("*")
      .eq("lead_id", leadData.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (orderData) setOrder(orderData as Order);
    setLoading(false);
  };

  const stages = lead ? buildTimeline(lead, order) : [];
  const activeStage = stages.find((s) => s.status === "active");

  return (
    <section className="bg-white py-10 pb-24 lg:py-14 lg:pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
              placeholder="Votre référence (ex : TRC-2026-1234)"
              className="w-full min-h-[52px] rounded-xl border border-ink-200 bg-white py-3.5 pr-4 pl-11 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-tracoli-500 focus:ring-4 focus:ring-tracoli-500/10"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 py-3.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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

        <AnimatePresence mode="wait">
          {notFound && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto mt-10 max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center"
            >
              <AlertCircle className="mx-auto size-8 text-red-400" />
              <p className="mt-3 text-sm font-semibold text-red-800">
                Aucune commande trouvée pour cette référence.
              </p>
              <p className="mt-1 text-xs text-red-600">
                Vérifiez le numéro ou contactez-nous sur WhatsApp.
              </p>
            </motion.div>
          )}

          {lead && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-200 bg-gradient-to-r from-white to-ink-50 px-6 py-5">
                <div>
                  <p className="text-[11px] font-bold tracking-wide text-ink-500 uppercase">
                    Référence
                  </p>
                  <p className="mt-0.5 font-mono text-[15px] font-extrabold text-ink-900">
                    {lead.reference}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">{lead.full_name}</p>
                </div>
                {activeStage && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-tracoli-50 px-3 py-1.5 text-[11px] font-bold text-tracoli-700">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-tracoli-500 opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-tracoli-500" />
                    </span>
                    {activeStage.label}
                  </span>
                )}
              </div>

              {order && (
                <div className="grid grid-cols-2 gap-3 border-b border-ink-100 px-6 py-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-ink-400 uppercase">Produit</p>
                    <p className="mt-0.5 text-xs font-semibold text-ink-800">{order.description}</p>
                  </div>
                  {order.tracking_number && (
                    <div>
                      <p className="text-[10px] font-bold tracking-wider text-ink-400 uppercase">Tracking</p>
                      <p className="mt-0.5 font-mono text-xs font-semibold text-ink-800">{order.tracking_number}</p>
                    </div>
                  )}
                  {order.estimated_delivery && (
                    <div>
                      <p className="text-[10px] font-bold tracking-wider text-ink-400 uppercase">Livraison estimée</p>
                      <p className="mt-0.5 text-xs font-semibold text-ink-800">
                        {new Date(order.estimated_delivery).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 sm:p-8">
                <ol className="relative">
                  {stages.map((stage, i) => {
                    const isLast = i === stages.length - 1;
                    return (
                      <li key={stage.id} className="relative flex gap-4 pb-8 last:pb-0">
                        {!isLast && (
                          <span
                            aria-hidden
                            className={`absolute top-8 left-[15px] h-[calc(100%-16px)] w-px ${
                              stage.status === "done" ? "bg-emerald-300" : "bg-ink-200"
                            }`}
                          />
                        )}
                        <span
                          className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full border-2 ${
                            stage.status === "done"
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : stage.status === "active"
                              ? "border-tracoli-500 bg-white text-tracoli-500"
                              : "border-ink-200 bg-white text-ink-400"
                          }`}
                        >
                          {stage.status === "done" && <Check className="size-4" strokeWidth={3} />}
                          {stage.status === "active" && (
                            <span className="relative flex size-3">
                              <span className="absolute inline-flex size-full animate-ping rounded-full bg-tracoli-500 opacity-60" />
                              <span className="relative inline-flex size-3 rounded-full bg-tracoli-500" />
                            </span>
                          )}
                          {stage.status === "pending" && <Clock className="size-3.5" />}
                        </span>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                            <p className={`text-sm font-extrabold tracking-tight ${
                              stage.status === "pending" ? "text-ink-400" : "text-ink-900"
                            }`}>
                              {stage.label}
                            </p>
                          </div>
                          <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink-500">
                            <MapPin className="size-3" />
                            {stage.location}
                          </p>
                          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-500">
                            {stage.detail}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-6 flex flex-col gap-3 border-t border-ink-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12px] text-ink-500">
                    Une question sur votre commande ?
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <a
                      href={waLink(
                        `Bonjour ${CONTACT.manager}, je souhaite des informations sur ma commande ${lead.reference}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-tracoli-500 px-4 py-2.5 text-[12.5px] font-bold text-white shadow-[var(--shadow-red)] hover:bg-tracoli-600"
                    >
                      <ExternalLink className="size-3.5" />
                      Contacter sur WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setLead(null);
                        setOrder(null);
                        setCode("");
                      }}
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

        {!lead && !notFound && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-10 max-w-xl rounded-2xl border border-dashed border-ink-300 bg-ink-50/60 p-6 text-center"
          >
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white text-ink-500">
              <Package className="size-5" />
            </span>
            <p className="mt-4 text-[13.5px] font-semibold text-ink-800">
              Entrez votre référence pour suivre votre commande
            </p>
            <p className="mt-1 text-[12px] text-ink-500">
              La référence vous a été communiquée par WhatsApp ou par email
              (format : TRC-2026-XXXX).
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
