"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Plus,
  X,
  Pencil,
  Trash2,
  Phone,
  RefreshCw,
} from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import type { PaymentMethod } from "@/types/database.types";

interface PaymentForm {
  id?: string;
  country: string;
  provider: string;
  phone_number: string;
}

const EMPTY_FORM: PaymentForm = {
  country: "",
  provider: "",
  phone_number: "",
};

export default function AdminPaymentsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PaymentForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<PaymentMethod | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadMethods();
  }, []);

  async function loadMethods() {
    setLoading(true);
    const res = await fetch("/api/payment-methods");
    if (res.ok) {
      const data = await res.json();
      setMethods(data.methods ?? []);
    }
    setLoading(false);
  }

  function openEdit(m: PaymentMethod) {
    setForm({
      id: m.id,
      country: m.country,
      provider: m.provider,
      phone_number: m.phone_number,
    });
    setSaveError("");
    setShowForm(true);
  }

  function openNew() {
    setForm(EMPTY_FORM);
    setSaveError("");
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveError("");
    setSaving(true);

    const res = await fetch("/api/payment-methods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: form.id || undefined,
        country: form.country,
        provider: form.provider,
        phone_number: form.phone_number,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setSaveError(data.error ?? "Erreur.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setShowForm(false);
    loadMethods();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch("/api/payment-methods", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteTarget.id }),
    });
    setDeleting(false);
    setDeleteTarget(null);
    loadMethods();
  }

  return (
    <div className="space-y-6">
      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer ce moyen de paiement ?"
        message={
          deleteTarget
            ? `Le numéro ${deleteTarget.phone_number} (${deleteTarget.country}) sera supprimé.`
            : ""
        }
        confirmLabel="Supprimer"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Moyens de paiement"
          description="Numéros affichés aux clients pour envoyer leurs frais de dossier."
        />
        <div className="flex items-center gap-2">
          <button
            onClick={loadMethods}
            className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-bold text-ink-600 transition-all hover:bg-ink-50"
          >
            <RefreshCw className="size-4" />
            Actualiser
          </button>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-tracoli-600"
          >
            <Plus className="size-4" />
            Ajouter un numéro
          </button>
        </div>
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-2xl border border-ink-200 bg-white p-6 shadow-card-lg"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600"
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500">
                  <CreditCard className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-ink-900">
                  {form.id ? "Modifier" : "Nouveau numéro"}
                </h3>
              </div>

              <form onSubmit={handleSave} className="mt-5 space-y-4">
                {saveError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {saveError}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-ink-700">
                    Pays
                  </label>
                  <input
                    type="text"
                    required
                    value={form.country}
                    onChange={(e) =>
                      setForm({ ...form, country: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                    placeholder="Ex: Burundi, Congo…"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-ink-700">
                    Opérateur / Service
                  </label>
                  <input
                    type="text"
                    required
                    value={form.provider}
                    onChange={(e) =>
                      setForm({ ...form, provider: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                    placeholder="Ex: Orange Money, Lumicash…"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-ink-700">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone_number}
                    onChange={(e) =>
                      setForm({ ...form, phone_number: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                    placeholder="+257 69 032 765"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-xl bg-tracoli-500 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 disabled:opacity-60"
                >
                  {saving ? "Enregistrement…" : "Enregistrer"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Methods list */}
      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-ink-200 bg-white py-16">
          <div className="size-7 animate-spin rounded-full border-[3px] border-ink-200 border-t-tracoli-500" />
        </div>
      ) : methods.length === 0 ? (
        <div className="rounded-2xl border border-ink-200 bg-white px-6 py-16 text-center">
          <CreditCard className="mx-auto size-10 text-ink-300" />
          <p className="mt-3 text-base font-semibold text-ink-600">
            Aucun moyen de paiement configuré.
          </p>
          <button
            onClick={openNew}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-tracoli-600"
          >
            <Plus className="size-4" />
            Ajouter le premier numéro
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {methods.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-2xl border border-ink-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Phone className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-bold text-ink-900">
                    {m.country}
                  </p>
                  <p className="mt-0.5 text-[12px] font-semibold text-ink-500">
                    {m.provider}
                  </p>
                  <p className="mt-2 font-mono text-lg font-bold tracking-wide text-tracoli-500">
                    {m.phone_number}
                  </p>
                </div>
              </div>
              <div className="absolute top-3 right-3 flex gap-1">
                <button
                  onClick={() => openEdit(m)}
                  className="grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-600"
                >
                  <Pencil className="size-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget(m)}
                  className="grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
