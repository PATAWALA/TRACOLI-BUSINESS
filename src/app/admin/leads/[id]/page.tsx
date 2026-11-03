"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Package,
  Calendar,
  MessageSquare,
  Image as ImageIcon,
  MapPin,
  Link as LinkIcon,
  Copy,
  Check,
  CreditCard,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Lead, LeadStatus } from "@/types/database.types";

const STATUS_OPTIONS: { value: LeadStatus; label: string; color: string }[] = [
  { value: "en_attente_paiement", label: "En attente de paiement", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: "paiement_soumis", label: "Paiement soumis", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { value: "confirme", label: "Confirmé", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { value: "recherche", label: "Recherche fournisseur", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { value: "devis", label: "Devis envoyé", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { value: "achat", label: "Achat effectué", color: "bg-teal-100 text-teal-700 border-teal-200" },
  { value: "expedition", label: "Expédition", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  { value: "en_transit", label: "En transit", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { value: "douane", label: "Dédouanement", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { value: "livre", label: "Livré", color: "bg-green-100 text-green-700 border-green-200" },
  { value: "cloture", label: "Clôturé", color: "bg-ink-100 text-ink-500 border-ink-200" },
];

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [confirmBanner, setConfirmBanner] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) {
          setLead(data as Lead);
          setNotes((data as Lead).notes ?? "");
        }
      });
  }, [id]);

  async function updateStatus(status: LeadStatus) {
    setSaving(true);
    setConfirmBanner(null);

    const res = await fetch(`/api/leads/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (data.ok) {
      setLead((prev) => {
        if (!prev) return null;
        const updated = { ...prev, status };
        if (data.reference) {
          updated.reference = data.reference;
        }
        return updated;
      });

      if (status === "confirme" && data.reference) {
        setConfirmBanner(data.reference);
      }
    }

    setSaving(false);
  }

  async function saveNotes() {
    setSaving(true);
    await supabase
      .from("leads")
      .update({ notes, updated_at: new Date().toISOString() })
      .eq("id", id);

    setLead((prev) => (prev ? { ...prev, notes } : null));
    setSaving(false);
  }

  async function copyRef() {
    if (!lead?.reference) return;
    await navigator.clipboard.writeText(lead.reference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 1500);
  }

  if (!lead) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-tracoli-200 border-t-tracoli-500" />
      </div>
    );
  }

  const extraImages = (lead.metadata as { images?: string[] } | null)?.images;

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push("/admin/leads")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600 transition-colors hover:text-ink-900"
      >
        <ArrowLeft className="size-4" />
        Retour aux demandes
      </button>

      {/* Confirmation banner */}
      <AnimatePresence>
        {confirmBanner && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
          >
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100">
              <ShieldCheck className="size-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-emerald-800">
                Paiement confirmé — Code de suivi généré
              </p>
              <p className="mt-1 font-mono text-xl font-extrabold tracking-wider text-emerald-700">
                {confirmBanner}
              </p>
              <p className="mt-1 text-xs text-emerald-600">
                Le client a été notifié par email avec son code et le lien de suivi.
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(confirmBanner);
                setCopiedRef(true);
                setTimeout(() => setCopiedRef(false), 1500);
              }}
              className="shrink-0 rounded-lg bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-200"
            >
              {copiedRef ? "Copié !" : "Copier le code"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead info card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-wider text-ink-500 uppercase">Référence</p>
            {lead.reference ? (
              <div className="mt-1 flex items-center gap-2">
                <p className="font-mono text-2xl font-extrabold tracking-tight text-tracoli-500">
                  {lead.reference}
                </p>
                <button
                  onClick={copyRef}
                  className="grid size-8 place-items-center rounded-lg border border-ink-200 bg-white text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-600"
                  title="Copier la référence"
                >
                  {copiedRef ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            ) : (
              <div className="mt-1 flex items-center gap-2">
                <Clock className="size-4 text-amber-500" />
                <p className="text-sm font-semibold text-amber-600">
                  En attente de confirmation
                </p>
              </div>
            )}
          </div>
          <p className="text-sm text-ink-500">
            <Calendar className="mr-1 inline size-4" />
            {new Date(lead.created_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <User className="mt-0.5 size-4 text-ink-400" />
            <div>
              <p className="text-xs font-bold text-ink-500">Nom</p>
              <p className="text-sm font-semibold text-ink-900">{lead.name}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 text-ink-400" />
            <div>
              <p className="text-xs font-bold text-ink-500">WhatsApp</p>
              <p className="text-sm font-semibold text-ink-900">{lead.whatsapp}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 size-4 text-ink-400" />
            <div>
              <p className="text-xs font-bold text-ink-500">Email</p>
              <p className="text-sm text-ink-900">{lead.email ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Package className="mt-0.5 size-4 text-ink-400" />
            <div>
              <p className="text-xs font-bold text-ink-500">Produit</p>
              <p className="text-sm text-ink-900">{lead.product_name ?? "—"}</p>
            </div>
          </div>
          {(lead.destination_city || lead.destination_country) && (
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-ink-400" />
              <div>
                <p className="text-xs font-bold text-ink-500">Destination</p>
                <p className="text-sm text-ink-900">
                  {[lead.destination_city, lead.destination_country].filter(Boolean).join(", ")}
                </p>
              </div>
            </div>
          )}
          {lead.product_url && (
            <div className="flex items-start gap-3">
              <LinkIcon className="mt-0.5 size-4 text-ink-400" />
              <div>
                <p className="text-xs font-bold text-ink-500">Lien produit</p>
                <a
                  href={lead.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-tracoli-500 hover:underline"
                >
                  Voir le produit
                </a>
              </div>
            </div>
          )}
        </div>

        {lead.notes && (
          <div className="mt-6 flex items-start gap-3">
            <MessageSquare className="mt-0.5 size-4 text-ink-400" />
            <div>
              <p className="text-xs font-bold text-ink-500">Message</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">{lead.notes}</p>
            </div>
          </div>
        )}

        {(lead.product_image_url || extraImages) && (
          <div className="mt-6 flex items-start gap-3">
            <ImageIcon className="mt-0.5 size-4 text-ink-400" />
            <div>
              <p className="text-xs font-bold text-ink-500">Images produit</p>
              <div className="mt-2 flex flex-wrap gap-3">
                {lead.product_image_url && (
                  <a href={lead.product_image_url} target="_blank" rel="noopener noreferrer">
                    <img src={lead.product_image_url} alt="Produit" className="size-20 rounded-xl border border-ink-200 object-cover" />
                  </a>
                )}
                {extraImages?.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                    <img src={url} alt={`Image ${i + 2}`} className="size-20 rounded-xl border border-ink-200 object-cover" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Payment proof */}
      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <CreditCard className="size-4 text-tracoli-500" />
          <p className="text-xs font-bold tracking-wider text-ink-500 uppercase">
            Preuve de paiement
          </p>
        </div>
        {lead.payment_proof_url ? (
          <div className="mt-3">
            <a
              href={lead.payment_proof_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block"
            >
              <img
                src={lead.payment_proof_url}
                alt="Preuve de paiement"
                className="max-h-64 rounded-xl border-2 border-ink-200 object-contain transition-all group-hover:border-tracoli-500"
              />
            </a>
            <p className="mt-2 text-xs text-ink-400">
              Cliquez sur l&apos;image pour l&apos;ouvrir en taille réelle.
            </p>
          </div>
        ) : (
          <div className="mt-3 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3">
            <p className="text-sm font-semibold text-amber-700">
              Aucune preuve de paiement envoyée
            </p>
            <p className="mt-1 text-xs text-amber-600">
              Le client n&apos;a pas encore joint de preuve. Vous pouvez le relancer sur WhatsApp.
            </p>
          </div>
        )}
      </div>

      {/* Status change */}
      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold tracking-wider text-ink-500 uppercase">Changer le statut</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateStatus(opt.value)}
              disabled={saving || lead.status === opt.value}
              className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                lead.status === opt.value
                  ? `${opt.color} ring-2 ring-offset-1`
                  : "border-ink-200 bg-white text-ink-600 hover:bg-ink-50"
              } disabled:opacity-60`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Internal notes */}
      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold tracking-wider text-ink-500 uppercase">Notes internes</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="mt-3 w-full rounded-xl border border-ink-200 bg-ink-50/50 p-3 text-sm text-ink-900 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
          placeholder="Ajouter des notes sur cette demande…"
        />
        <button
          onClick={saveNotes}
          disabled={saving}
          className="mt-3 rounded-xl bg-tracoli-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-tracoli-600 disabled:opacity-60"
        >
          {saving ? "Enregistrement…" : "Enregistrer les notes"}
        </button>
      </div>
    </div>
  );
}
