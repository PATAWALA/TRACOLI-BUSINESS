"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Handshake, Plus, MapPin, Mail, Phone, X } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { supabase } from "@/lib/supabase/client";
import type { Partner } from "@/types/database.types";

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    country: "",
    contact_email: "",
    contact_phone: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPartners();
  }, []);

  async function loadPartners() {
    setLoading(true);
    const { data } = await supabase
      .from("partners")
      .select("*")
      .order("created_at", { ascending: false });
    setPartners((data as Partner[]) ?? []);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("partners").insert({
      name: form.name,
      category: form.category || null,
      country: form.country || null,
      contact_email: form.contact_email || null,
      contact_phone: form.contact_phone || null,
      notes: form.notes || null,
      active: true,
    });
    setForm({ name: "", category: "", country: "", contact_email: "", contact_phone: "", notes: "" });
    setShowForm(false);
    setSaving(false);
    loadPartners();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Partenaires"
          description="Fournisseurs, transitaires et ambassadeurs."
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-tracoli-600"
        >
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />}
          {showForm ? "Annuler" : "Ajouter"}
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAdd}
          className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold tracking-wider text-ink-400 uppercase">Nom *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-wider text-ink-400 uppercase">Catégorie</label>
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Fournisseur, Transitaire, Ambassadeur…"
                className="mt-1 w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-wider text-ink-400 uppercase">Pays</label>
              <input
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="mt-1 w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-wider text-ink-400 uppercase">Email</label>
              <input
                type="email"
                value={form.contact_email}
                onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                className="mt-1 w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-wider text-ink-400 uppercase">Téléphone</label>
              <input
                value={form.contact_phone}
                onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                className="mt-1 w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-wider text-ink-400 uppercase">Notes</label>
              <input
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="mt-1 w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="mt-4 rounded-xl bg-tracoli-500 px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-tracoli-600 disabled:opacity-60"
          >
            {saving ? "Enregistrement…" : "Ajouter le partenaire"}
          </button>
        </motion.form>
      )}

      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-ink-200 bg-white py-16">
          <div className="size-7 animate-spin rounded-full border-[3px] border-ink-200 border-t-tracoli-500" />
        </div>
      ) : partners.length === 0 ? (
        <div className="rounded-2xl border border-ink-200 bg-white px-6 py-16 text-center">
          <Handshake className="mx-auto size-10 text-ink-300" />
          <p className="mt-3 text-sm font-semibold text-ink-600">Aucun partenaire enregistré.</p>
          <p className="mt-1 text-xs text-ink-400">Ajoutez vos fournisseurs et transitaires ici.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-ink-900">{p.name}</p>
                  {p.category && (
                    <span className="mt-1 inline-block rounded-lg bg-tracoli-50 px-2 py-0.5 text-[10px] font-bold text-tracoli-600">
                      {p.category}
                    </span>
                  )}
                </div>
                <span
                  className={`size-2.5 rounded-full ${p.active ? "bg-emerald-500" : "bg-ink-300"}`}
                  title={p.active ? "Actif" : "Inactif"}
                />
              </div>
              <div className="mt-3 space-y-1.5">
                {p.country && (
                  <p className="flex items-center gap-2 text-xs text-ink-500">
                    <MapPin className="size-3.5" /> {p.country}
                  </p>
                )}
                {p.contact_email && (
                  <p className="flex items-center gap-2 text-xs text-ink-500">
                    <Mail className="size-3.5" /> {p.contact_email}
                  </p>
                )}
                {p.contact_phone && (
                  <p className="flex items-center gap-2 text-xs text-ink-500">
                    <Phone className="size-3.5" /> {p.contact_phone}
                  </p>
                )}
              </div>
              {p.notes && (
                <p className="mt-3 border-t border-ink-100 pt-3 text-[11px] text-ink-400">
                  {p.notes}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
