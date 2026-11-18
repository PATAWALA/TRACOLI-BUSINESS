"use client";

import { useState } from "react";
import Modal from "@/components/admin/ui/Modal";
import { adminFetch } from "@/lib/admin-fetch";
import { PARCEL_MODES } from "@/lib/parcels";
import type { ParcelMode } from "@/types/database.types";

const input =
  "w-full min-h-11 rounded-xl border border-ink-200 bg-white px-3.5 text-sm text-ink-900 outline-none focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/15";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-bold text-ink-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[12px] text-ink-400">{hint}</span>}
    </label>
  );
}

export default function ClientFormModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (code: string, name: string) => void;
}) {
  const [f, setF] = useState({
    name: "",
    city: "",
    country: "",
    whatsapp: "",
    email: "",
    count: "1",
    mode: "a_preciser" as ParcelMode,
    description: "",
    external_code: "",
    external_platform: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  async function submit() {
    setError("");
    if (!f.name.trim()) return setError("Indiquez le nom du client.");
    const count = Math.max(0, Math.min(300, parseInt(f.count, 10) || 0));

    setSaving(true);
    const res = await adminFetch("/api/clients", {
      method: "POST",
      body: JSON.stringify({
        name: f.name,
        city: f.city,
        country: f.country,
        whatsapp: f.whatsapp,
        email: f.email,
        parcels: Array.from({ length: count }, () => ({
          mode: f.mode,
          description: f.description,
          external_code: count === 1 ? f.external_code : "",
          external_platform: f.external_platform,
        })),
      }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) return setError(data.error ?? "Erreur lors de l'enregistrement.");
    if (data.skipped?.length) {
      return setError("Ce client existe déjà (même nom et même ville).");
    }
    if (data.failed?.length) return setError(data.failed[0].error);
    onCreated(data.created[0].code, f.name.trim());
    setF((p) => ({ ...p, name: "", city: "", whatsapp: "", email: "", description: "", external_code: "" }));
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Ajouter un client"
      description="Un code de suivi est créé automatiquement. Il suffit de le donner au client."
      footer={
        <>
          <button
            onClick={onClose}
            className="min-h-11 rounded-xl border border-ink-200 bg-white px-5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
          >
            Annuler
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="min-h-11 rounded-xl bg-tracoli-500 px-6 text-sm font-bold text-white hover:bg-tracoli-600 disabled:opacity-60"
          >
            {saving ? "Enregistrement…" : "Créer le client et son code"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Nom du client *">
          <input className={input} value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex : Daplogistic" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ville">
            <input className={input} value={f.city} onChange={(e) => set("city", e.target.value)} placeholder="Ex : Kinshasa" />
          </Field>
          <Field label="Pays">
            <input className={input} value={f.country} onChange={(e) => set("country", e.target.value)} placeholder="Ex : RDC" />
          </Field>
          <Field label="WhatsApp" hint="Facultatif — utile pour envoyer le code.">
            <input className={input} inputMode="tel" value={f.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="+243…" />
          </Field>
          <Field label="Email" hint="Facultatif.">
            <input className={input} type="email" value={f.email} onChange={(e) => set("email", e.target.value)} />
          </Field>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
          <p className="text-[12px] font-bold tracking-wide text-ink-500 uppercase">Colis</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Nombre de colis">
              <input className={input} type="number" min={0} max={300} inputMode="numeric" value={f.count} onChange={(e) => set("count", e.target.value)} />
            </Field>
            <Field label="Mode d'expédition">
              <select className={input} value={f.mode} onChange={(e) => set("mode", e.target.value)}>
                {PARCEL_MODES.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Contenu / ce que le client a commandé" hint="Texte libre : « 2 cartons de vêtements, 1 carton de chaussures ».">
              <textarea className={`${input} min-h-20 py-2.5`} value={f.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Code Alibaba / autre plateforme" hint="Si 1 seul colis. Pour plusieurs, ajoutez-les dans la fiche client.">
              <input className={`${input} uppercase`} value={f.external_code} onChange={(e) => set("external_code", e.target.value)} />
            </Field>
            <Field label="Plateforme">
              <input className={input} value={f.external_platform} onChange={(e) => set("external_platform", e.target.value)} placeholder="Alibaba, 1688, Taobao…" />
            </Field>
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
        )}
      </div>
    </Modal>
  );
}
