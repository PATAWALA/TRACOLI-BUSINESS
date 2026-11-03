"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ship,
  Plane,
  Plus,
  X,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import type { ShippingRate } from "@/types/database.types";

interface RateForm {
  id?: string;
  destination: string;
  mode: "maritime" | "aerien";
  price: string;
  unit: string;
  delivery_min_days: string;
  delivery_max_days: string;
}

const EMPTY_FORM: RateForm = {
  destination: "",
  mode: "maritime",
  price: "",
  unit: "CBM",
  delivery_min_days: "",
  delivery_max_days: "",
};

export default function AdminShippingPage() {
  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<RateForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<ShippingRate | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadRates();
  }, []);

  async function loadRates() {
    setLoading(true);
    const res = await fetch("/api/shipping-rates");
    if (res.ok) {
      const data = await res.json();
      setRates(data.rates ?? []);
    }
    setLoading(false);
  }

  function openEdit(rate: ShippingRate) {
    setForm({
      id: rate.id,
      destination: rate.destination,
      mode: rate.mode,
      price: String(rate.price),
      unit: rate.unit,
      delivery_min_days: String(rate.delivery_min_days),
      delivery_max_days: String(rate.delivery_max_days),
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

    const res = await fetch("/api/shipping-rates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: form.id || undefined,
        destination: form.destination,
        mode: form.mode,
        price: Number(form.price),
        unit: form.unit,
        delivery_min_days: Number(form.delivery_min_days),
        delivery_max_days: Number(form.delivery_max_days),
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
    loadRates();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch("/api/shipping-rates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteTarget.id }),
    });
    setDeleting(false);
    setDeleteTarget(null);
    loadRates();
  }

  const maritime = rates.filter((r) => r.mode === "maritime");
  const aerien = rates.filter((r) => r.mode === "aerien");

  return (
    <div className="space-y-6">
      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer ce tarif ?"
        message={
          deleteTarget
            ? `Le tarif ${deleteTarget.destination} (${deleteTarget.mode}) sera supprimé.`
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
          title="Tarifs d'expédition"
          description="Ces tarifs sont affichés sur le site public et dans l'estimateur de fret."
        />
        <div className="flex items-center gap-2">
          <button
            onClick={loadRates}
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
            Nouveau tarif
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

              <h3 className="text-lg font-bold text-ink-900">
                {form.id ? "Modifier le tarif" : "Nouveau tarif"}
              </h3>

              <form onSubmit={handleSave} className="mt-5 space-y-4">
                {saveError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {saveError}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-ink-700">
                    Destination
                  </label>
                  <input
                    type="text"
                    required
                    value={form.destination}
                    onChange={(e) =>
                      setForm({ ...form, destination: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                    placeholder="Ex: Burundi, Congo…"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-ink-700">
                      Mode
                    </label>
                    <select
                      value={form.mode}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          mode: e.target.value as "maritime" | "aerien",
                          unit:
                            e.target.value === "aerien" ? "kg" : "CBM",
                        })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                    >
                      <option value="maritime">Maritime</option>
                      <option value="aerien">Aérien</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink-700">
                      Prix ({form.unit})
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                      placeholder="230"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-ink-700">
                      Délai min (jours)
                    </label>
                    <input
                      type="number"
                      required
                      value={form.delivery_min_days}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          delivery_min_days: e.target.value,
                        })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                      placeholder="35"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink-700">
                      Délai max (jours)
                    </label>
                    <input
                      type="number"
                      required
                      value={form.delivery_max_days}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          delivery_max_days: e.target.value,
                        })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                      placeholder="45"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-xl bg-tracoli-500 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 disabled:opacity-60"
                >
                  {saving
                    ? "Enregistrement…"
                    : form.id
                      ? "Enregistrer"
                      : "Ajouter le tarif"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-ink-200 bg-white py-16">
          <div className="size-7 animate-spin rounded-full border-[3px] border-ink-200 border-t-tracoli-500" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Maritime */}
          <div className="rounded-2xl border border-ink-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-ink-100 px-6 py-4">
              <Ship className="size-5 text-blue-600" />
              <h2 className="text-sm font-bold text-ink-800">
                Maritime (par CBM)
              </h2>
            </div>
            {maritime.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-ink-400">
                Aucun tarif maritime configuré.
              </p>
            ) : (
              <div className="divide-y divide-ink-100">
                {maritime.map((rate) => (
                  <div
                    key={rate.id}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <div>
                      <p className="text-[13px] font-bold text-ink-900">
                        {rate.destination}
                      </p>
                      <p className="mt-0.5 text-[12px] text-ink-500">
                        {rate.delivery_min_days}–{rate.delivery_max_days}{" "}
                        jours
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-extrabold text-tracoli-500">
                        {rate.price}$
                      </span>
                      <span className="text-[11px] text-ink-500">
                        / {rate.unit}
                      </span>
                      <button
                        onClick={() => openEdit(rate)}
                        className="grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-600"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(rate)}
                        className="grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Aérien */}
          <div className="rounded-2xl border border-ink-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-ink-100 px-6 py-4">
              <Plane className="size-5 text-cyan-600" />
              <h2 className="text-sm font-bold text-ink-800">
                Aérien (par kg)
              </h2>
            </div>
            {aerien.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-ink-400">
                Aucun tarif aérien configuré.
              </p>
            ) : (
              <div className="divide-y divide-ink-100">
                {aerien.map((rate) => (
                  <div
                    key={rate.id}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <div>
                      <p className="text-[13px] font-bold text-ink-900">
                        {rate.destination}
                      </p>
                      <p className="mt-0.5 text-[12px] text-ink-500">
                        {rate.delivery_min_days}–{rate.delivery_max_days}{" "}
                        jours
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-extrabold text-tracoli-500">
                        {rate.price}$
                      </span>
                      <span className="text-[11px] text-ink-500">
                        / {rate.unit}
                      </span>
                      <button
                        onClick={() => openEdit(rate)}
                        className="grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-600"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(rate)}
                        className="grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
