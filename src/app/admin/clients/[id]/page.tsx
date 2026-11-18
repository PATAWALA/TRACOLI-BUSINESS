"use client";

import { use, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Copy,
  Check,
  Plus,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Pencil,
  ExternalLink,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import HelpBanner from "@/components/admin/ui/HelpBanner";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import Modal from "@/components/admin/ui/Modal";
import ParcelStatusBadge from "@/components/admin/clients/ParcelStatusBadge";
import { adminFetch } from "@/lib/admin-fetch";
import { PARCEL_MODES, PARCEL_STATUSES, clientMessage, trackingUrl } from "@/lib/parcels";
import type { ClientWithParcels, Parcel, ParcelMode } from "@/types/database.types";

const field =
  "w-full min-h-10 rounded-lg border border-ink-200 bg-white px-3 text-[13px] text-ink-900 outline-none focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/15";

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [client, setClient] = useState<ClientWithParcels | null>(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState({ name: "", city: "", country: "", whatsapp: "", email: "" });
  const [showAdd, setShowAdd] = useState(false);
  const [add, setAdd] = useState({ count: "1", mode: "a_preciser" as ParcelMode, description: "", external_code: "", external_platform: "" });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const load = useCallback(async () => {
    const res = await adminFetch(`/api/clients/${id}`);
    const data = await res.json();
    if (!res.ok) return setError(data.error ?? "Erreur de chargement.");
    setClient(data.client);
    setInfo({
      name: data.client.name,
      city: data.client.city ?? "",
      country: data.client.country ?? "",
      whatsapp: data.client.whatsapp ?? "",
      email: data.client.email ?? "",
    });
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }

  async function copy(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  async function patchParcels(ids: string[], patch: Record<string, string | null>) {
    const res = await adminFetch("/api/parcels", {
      method: "PATCH",
      body: JSON.stringify({ ids, patch }),
    });
    if (!res.ok) return flash("Erreur : modification non enregistrée.");
    flash("Enregistré ✓");
    await load();
  }

  async function saveInfo() {
    const res = await adminFetch(`/api/clients/${id}`, { method: "PATCH", body: JSON.stringify(info) });
    const data = await res.json();
    if (!res.ok) return flash(data.error ?? "Erreur.");
    setEditing(false);
    flash("Informations enregistrées ✓");
    load();
  }

  async function addParcels() {
    const count = Math.max(1, Math.min(100, parseInt(add.count, 10) || 1));
    const res = await adminFetch("/api/parcels", {
      method: "POST",
      body: JSON.stringify({
        client_id: id,
        parcels: Array.from({ length: count }, () => ({
          mode: add.mode,
          description: add.description,
          external_code: count === 1 ? add.external_code : "",
          external_platform: add.external_platform,
        })),
      }),
    });
    if (!res.ok) return flash("Erreur : colis non ajoutés.");
    setShowAdd(false);
    flash(`${count} colis ajouté(s) ✓`);
    load();
  }

  async function removeParcel(p: Parcel) {
    await adminFetch("/api/parcels", { method: "DELETE", body: JSON.stringify({ id: p.id }) });
    load();
  }

  async function removeClient() {
    await adminFetch(`/api/clients/${id}`, { method: "DELETE" });
    router.replace("/admin/clients");
  }

  if (error) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">{error}</div>;
  }
  if (!client) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-tracoli-200 border-t-tracoli-500" />
      </div>
    );
  }

  const parcels = client.parcels;
  const allSelected = parcels.length > 0 && selected.size === parcels.length;
  const message = clientMessage(client.name, client.code, parcels.length);
  const wa = client.whatsapp
    ? `https://wa.me/${client.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    : null;

  return (
    <div className="space-y-6 pb-24">
      <button onClick={() => router.push("/admin/clients")} className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-ink-600 hover:text-ink-900">
        <ArrowLeft className="size-4" /> Retour aux clients
      </button>

      {/* En-tête client */}
      <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold text-ink-900 sm:text-2xl">{client.name}</h1>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-500">
              {(client.city || client.country) && (
                <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" />{[client.city, client.country].filter(Boolean).join(", ")}</span>
              )}
              {client.whatsapp && <span className="inline-flex items-center gap-1.5"><Phone className="size-4" />{client.whatsapp}</span>}
              {client.email && <span className="inline-flex items-center gap-1.5"><Mail className="size-4" />{client.email}</span>}
            </div>
            <button onClick={() => setEditing(true)} className="mt-3 inline-flex min-h-9 items-center gap-1.5 text-[13px] font-bold text-tracoli-500 hover:text-tracoli-600">
              <Pencil className="size-3.5" /> Modifier les informations
            </button>
          </div>

          <div className="rounded-2xl bg-tracoli-50 p-4 lg:min-w-72">
            <p className="text-[11px] font-bold tracking-wider text-tracoli-600 uppercase">Code de suivi à donner au client</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="font-mono text-2xl font-extrabold text-tracoli-600">{client.code}</p>
              <button onClick={() => copy(client.code, "code")} aria-label="Copier le code" className="grid size-9 place-items-center rounded-lg bg-white text-ink-500 hover:text-ink-800">
                {copied === "code" ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
              </button>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <button onClick={() => copy(message, "msg")} className="min-h-10 rounded-xl bg-white px-3 text-[13px] font-bold text-ink-700 hover:bg-ink-50">
                {copied === "msg" ? "Message copié !" : "Copier le message"}
              </button>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 text-[13px] font-bold text-white hover:bg-emerald-700">
                  <FaWhatsapp className="size-4" /> Envoyer sur WhatsApp
                </a>
              )}
              <a href={trackingUrl(client.code)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-tracoli-200 px-3 text-[13px] font-semibold text-tracoli-600 hover:bg-white">
                <ExternalLink className="size-4" /> Voir ce que voit le client
              </a>
            </div>
          </div>
        </div>
      </section>

      <HelpBanner title="Mettre à jour les colis">
        Changez le statut d&apos;un colis avec le menu de sa ligne. Pour en changer plusieurs d&apos;un coup,
        cochez-les : une barre apparaît en bas de l&apos;écran. Le client voit la mise à jour immédiatement sur le site.
      </HelpBanner>

      {/* Colis */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex min-h-10 cursor-pointer items-center gap-2.5 text-sm font-bold text-ink-800">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => setSelected(allSelected ? new Set() : new Set(parcels.map((p) => p.id)))}
              className="size-4 accent-[#e60000]"
            />
            {parcels.length} colis
          </label>
          <button onClick={() => setShowAdd(true)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 text-[13px] font-bold text-ink-700 hover:bg-ink-50">
            <Plus className="size-4" /> Ajouter des colis
          </button>
        </div>

        {parcels.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-300 bg-white p-8 text-center text-sm text-ink-500">
            Aucun colis. Cliquez sur « Ajouter des colis ».
          </div>
        ) : (
          <ul className="space-y-3">
            {parcels.map((p) => (
              <li key={p.id} className={`rounded-2xl border bg-white p-4 shadow-sm ${selected.has(p.id) ? "border-tracoli-300 ring-2 ring-tracoli-500/10" : "border-ink-200"}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="checkbox"
                    aria-label={`Sélectionner ${p.matricule}`}
                    checked={selected.has(p.id)}
                    onChange={() => {
                      const n = new Set(selected);
                      if (n.has(p.id)) n.delete(p.id); else n.add(p.id);
                      setSelected(n);
                    }}
                    className="size-4 accent-[#e60000]"
                  />
                  <p className="font-mono text-[13px] font-bold text-ink-900">{p.matricule}</p>
                  <ParcelStatusBadge status={p.status} />
                  <button onClick={() => removeParcel(p)} aria-label="Supprimer ce colis" className="ml-auto grid size-9 place-items-center rounded-lg text-ink-300 hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <label className="block">
                    <span className="text-[11px] font-bold text-ink-500">Statut</span>
                    <select className={field} value={p.status} onChange={(e) => patchParcels([p.id], { status: e.target.value })}>
                      {PARCEL_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[11px] font-bold text-ink-500">Mode</span>
                    <select className={field} value={p.mode} onChange={(e) => patchParcels([p.id], { mode: e.target.value })}>
                      {PARCEL_MODES.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                  </label>
                  <label className="block sm:col-span-2 xl:col-span-2">
                    <span className="text-[11px] font-bold text-ink-500">Contenu</span>
                    <input className={field} defaultValue={p.description ?? ""} placeholder="Ex : 2 cartons de vêtements" onBlur={(e) => e.target.value !== (p.description ?? "") && patchParcels([p.id], { description: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="text-[11px] font-bold text-ink-500">Code Alibaba / autre</span>
                    <input className={`${field} uppercase`} defaultValue={p.external_code ?? ""} placeholder="Facultatif" onBlur={(e) => e.target.value.toUpperCase() !== (p.external_code ?? "") && patchParcels([p.id], { external_code: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="text-[11px] font-bold text-ink-500">Plateforme</span>
                    <input className={field} defaultValue={p.external_platform ?? ""} placeholder="Alibaba, 1688…" onBlur={(e) => e.target.value !== (p.external_platform ?? "") && patchParcels([p.id], { external_platform: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="text-[11px] font-bold text-ink-500">Date d&apos;expédition prévue</span>
                    <input type="date" className={field} defaultValue={p.expected_ship_date ?? ""} onBlur={(e) => e.target.value !== (p.expected_ship_date ?? "") && patchParcels([p.id], { expected_ship_date: e.target.value })} />
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button onClick={() => setConfirmDelete(true)} className="inline-flex min-h-10 items-center gap-2 text-[13px] font-semibold text-red-500 hover:text-red-700">
        <Trash2 className="size-4" /> Supprimer ce client et tous ses colis
      </button>

      {/* Barre d'action groupée */}
      {selected.size > 0 && (
        <div className="fixed inset-x-3 bottom-20 z-50 flex flex-col gap-2 rounded-2xl border border-ink-200 bg-white p-3 shadow-2xl sm:flex-row sm:items-center lg:right-8 lg:bottom-6 lg:left-auto lg:w-[34rem]">
          <p className="px-1 text-[13px] font-bold text-ink-800">{selected.size} colis sélectionné(s)</p>
          <select
            defaultValue=""
            onChange={async (e) => {
              if (!e.target.value) return;
              await patchParcels([...selected], { status: e.target.value });
              setSelected(new Set());
              e.target.value = "";
            }}
            className={`${field} sm:ml-auto sm:w-56`}
          >
            <option value="">Changer le statut…</option>
            {PARCEL_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button onClick={() => setSelected(new Set())} className="min-h-10 rounded-lg px-3 text-[13px] font-semibold text-ink-500 hover:bg-ink-50">Annuler</button>
        </div>
      )}

      {toast && (
        <div className="fixed top-4 left-1/2 z-[300] -translate-x-1/2 rounded-xl bg-ink-900 px-5 py-2.5 text-[13px] font-bold text-white shadow-xl">{toast}</div>
      )}

      {/* Modifier les informations */}
      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        title="Informations du client"
        footer={
          <>
            <button onClick={() => setEditing(false)} className="min-h-11 rounded-xl border border-ink-200 bg-white px-5 text-sm font-semibold text-ink-700">Annuler</button>
            <button onClick={saveInfo} className="min-h-11 rounded-xl bg-tracoli-500 px-6 text-sm font-bold text-white hover:bg-tracoli-600">Enregistrer</button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {([["name", "Nom"], ["whatsapp", "WhatsApp"], ["city", "Ville"], ["country", "Pays"], ["email", "Email"]] as const).map(([k, label]) => (
            <label key={k} className={`block ${k === "name" || k === "email" ? "sm:col-span-2" : ""}`}>
              <span className="text-[12px] font-bold text-ink-700">{label}</span>
              <input className={`${field} min-h-11`} value={info[k]} onChange={(e) => setInfo({ ...info, [k]: e.target.value })} />
            </label>
          ))}
        </div>
      </Modal>

      {/* Ajouter des colis */}
      <Modal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="Ajouter des colis"
        description="Les nouveaux matricules continuent la numérotation existante."
        footer={
          <>
            <button onClick={() => setShowAdd(false)} className="min-h-11 rounded-xl border border-ink-200 bg-white px-5 text-sm font-semibold text-ink-700">Annuler</button>
            <button onClick={addParcels} className="min-h-11 rounded-xl bg-tracoli-500 px-6 text-sm font-bold text-white hover:bg-tracoli-600">Ajouter</button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px] font-bold text-ink-700">Nombre de colis</span>
            <input type="number" min={1} max={100} className={`${field} min-h-11`} value={add.count} onChange={(e) => setAdd({ ...add, count: e.target.value })} />
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-ink-700">Mode</span>
            <select className={`${field} min-h-11`} value={add.mode} onChange={(e) => setAdd({ ...add, mode: e.target.value as ParcelMode })}>
              {PARCEL_MODES.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="text-[12px] font-bold text-ink-700">Contenu</span>
            <input className={`${field} min-h-11`} value={add.description} onChange={(e) => setAdd({ ...add, description: e.target.value })} />
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-ink-700">Code Alibaba / autre (1 colis)</span>
            <input className={`${field} min-h-11 uppercase`} value={add.external_code} onChange={(e) => setAdd({ ...add, external_code: e.target.value })} />
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-ink-700">Plateforme</span>
            <input className={`${field} min-h-11`} value={add.external_platform} onChange={(e) => setAdd({ ...add, external_platform: e.target.value })} />
          </label>
        </div>
      </Modal>

      <ConfirmModal
        open={confirmDelete}
        title="Supprimer ce client ?"
        message={`« ${client.name} » et ses ${parcels.length} colis seront supprimés définitivement. Son code ne fonctionnera plus.`}
        confirmLabel="Supprimer"
        onConfirm={removeClient}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
