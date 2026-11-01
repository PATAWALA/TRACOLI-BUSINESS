"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Package,
  Calendar,
  MessageSquare,
  Image as ImageIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Lead, LeadStatus } from "@/types/database.types";

const STATUS_OPTIONS: { value: LeadStatus; label: string; color: string }[] = [
  { value: "nouveau", label: "Nouveau", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { value: "contacte", label: "Contacté", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: "en_cours", label: "En cours", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { value: "gagne", label: "Gagné", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { value: "perdu", label: "Perdu", color: "bg-ink-100 text-ink-500 border-ink-200" },
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
    await supabase
      .from("leads")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    setLead((prev) => (prev ? { ...prev, status } : null));
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

  if (!lead) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-tracoli-200 border-t-tracoli-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push("/admin/leads")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600 transition-colors hover:text-ink-900"
      >
        <ArrowLeft className="size-4" />
        Retour aux leads
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-wider text-ink-500 uppercase">Référence</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-tracoli-500">{lead.reference}</p>
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
              <p className="text-sm font-semibold text-ink-900">{lead.full_name}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 text-ink-400" />
            <div>
              <p className="text-xs font-bold text-ink-500">Téléphone</p>
              <p className="text-sm font-semibold text-ink-900">{lead.phone}</p>
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
              <p className="text-xs font-bold text-ink-500">Type de produit</p>
              <p className="text-sm text-ink-900">{lead.product_type ?? "—"}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3">
          <MessageSquare className="mt-0.5 size-4 text-ink-400" />
          <div>
            <p className="text-xs font-bold text-ink-500">Message</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-700">{lead.message}</p>
          </div>
        </div>

        {lead.image_url && (
          <div className="mt-6 flex items-start gap-3">
            <ImageIcon className="mt-0.5 size-4 text-ink-400" />
            <div>
              <p className="text-xs font-bold text-ink-500">Image</p>
              <a
                href={lead.image_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm font-semibold text-tracoli-500 hover:underline"
              >
                Voir l&apos;image
              </a>
            </div>
          </div>
        )}
      </motion.div>

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

      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold tracking-wider text-ink-500 uppercase">Notes internes</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="mt-3 w-full rounded-xl border border-ink-200 bg-ink-50/50 p-3 text-sm text-ink-900 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
          placeholder="Ajouter des notes sur ce lead…"
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
