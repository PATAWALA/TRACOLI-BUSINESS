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
import { PARCEL_MODES, PARCEL_STATUSES, clientMessage, parseCodes, trackingUrl } from "@/lib/parcels";
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
  const [add, setAdd] = useState({ count: "1", mode: "a_preciser" as ParcelMode, description: "", codes: "" });
  const [showCodes, setShowCodes] = useState(false);
  const [codesText, setCodesText] = useState("");
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

  /** Attribue ou modifie le code d'un ou plusieurs colis (un code par colis). */
  async function assignCodes(assign: { id: string; code: string | null }[]) {
    const res = await adminFetch("/api/parcels", { method: "PATCH", body: JSON.stringify({ assign }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      flash(data.error ?? "Erreur : code non enregistré.");
      await load();
      return false;
    }
    flash(assign.length > 1 ? `${assign.length} codes enregistrés ✓` : "Code enregistré ✓");
    await load();
    return true;
  }

  async function saveBulkCodes() {
    const codes = parseCodes(codesText);
    const free = (client?.parcels ?? []).filter((p) => !p.matricule);
    if (codes.length === 0) return;
    if (codes.length > free.length) {
      return flash(`Vous avez collé ${codes.length} codes mais il y a seulement ${free.length} colis sans code.`);
    }
    const ok = await assignCodes(codes.map((code, i) => ({ id: free[i].id, code })));
    if (ok) {
      setShowCodes(false);
      setCodesText("");
    }
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
    const codes = parseCodes(add.codes);
    const count = Math.max(1, Math.min(300, Math.max(codes.length, parseInt(add.count, 10) || 1)));
    const res = await adminFetch("/api/parcels", {
      method: "POST",
      body: JSON.stringify({
        client_id: id,
        parcels: Array.from({ length: count }, (_, i) => ({
          code: codes[i] ?? "",
          mode: add.mode,
          description: add.description,
        })),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return flash(data.error ?? "Erreur : colis non ajoutés.");
    setShowAdd(false);
    setAdd({ count: "1", mode: "a_preciser", description: "", codes: "" });
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
  const codedCodes = parcels.map((p) => p.matricule).filter((c): c is string => !!c);
  const uncoded = parcels.length - codedCodes.length;
  const message = clientMessage(client.name, codedCodes);
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
            <p className="text-[11px] font-bold tracking-wider text-tracoli-600 uppercase">Suivi par code de colis</p>
            <p className="mt-1 text-[13px] text-ink-700">
              <strong>{codedCodes.length}</strong> colis avec code
              {uncoded > 0 && <> · <strong className="text-amber-700">{uncoded} sans code</strong></>}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {uncoded > 0 && (
                <button onClick={() => setShowCodes(true)} className="min-h-10 rounded-xl bg-tracoli-500 px-3 text-[13px] font-bold text-white hover:bg-tracoli-600">
                  Saisir les codes en lot
                </button>
              )}
              {codedCodes.length > 0 && (
                <button onClick={() => copy(message, "msg")} className="min-h-10 rounded-xl bg-white px-3 text-[13px] font-bold text-ink-700 hover:bg-ink-50">
                  {copied === "msg" ? "Message copié !" : "Copier le message avec les codes"}
                </button>
              )}
              {wa && codedCodes.length > 0 && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 text-[13px] font-bold text-white hover:bg-emerald-700">
                  <FaWhatsapp className="size-4" /> Envoyer sur WhatsApp
                </a>
              )}
              {codedCodes.length > 0 && (
                <a href={trackingUrl(codedCodes[0])} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-tracoli-200 px-3 text-[13px] font-semibold text-tracoli-600 hover:bg-white">
                  <ExternalLink className="size-4" /> Voir ce que voit le client
                </a>
              )}
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
                    aria-label={`Sélectionner ${p.matricule ?? "ce colis"}`}
                    checked={selected.has(p.id)}
                    onChange={() => {
                      const n = new Set(selected);
                      if (n.has(p.id)) n.delete(p.id); else n.add(p.id);
                      setSelected(n);
                    }}
                    className="size-4 accent-[#e60000]"
                  />
                  <input
                    key={`${p.id}-${p.matricule ?? ""}`}
                    aria-label="Code du colis"
                    defaultValue={p.matricule ?? ""}
                    placeholder="Code du colis…"
                    className="min-h-10 w-52 rounded-lg border border-ink-200 bg-white px-3 font-mono text-[13px] font-bold text-ink-900 uppercase outline-none placeholder:font-sans placeholder:font-medium placeholder:normal-case placeholder:text-ink-400 focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/15"
                    onBlur={(e) => {
                      const v = e.target.value.trim().toUpperCase().replace(/\s+/g, "");
                      if (v !== (p.matricule ?? "")) assignCodes([{ id: p.id, code: v || null }]);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                  />
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
        description="Collez le code de chaque colis (un par ligne). Vous pouvez aussi les ajouter plus tard."
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
          <label className="block sm:col-span-2">
            <span className="text-[12px] font-bold text-ink-700">Codes des colis (un par ligne)</span>
            <textarea className={`${field} min-h-24 py-2 font-mono uppercase`} value={add.codes} onChange={(e) => setAdd({ ...add, codes: e.target.value })} placeholder={"COLIS-001\nCOLIS-002"} />
            <span className="mt-1 block text-[12px] text-ink-400">Facultatif. Le nombre de colis s&apos;ajuste au nombre de codes.</span>
          </label>
        </div>
      </Modal>

      <Modal
        open={showCodes}
        onClose={() => setShowCodes(false)}
        title="Saisir les codes en lot"
        description={`${uncoded} colis n'ont pas encore de code. Collez les codes, un par ligne : ils sont attribués dans l'ordre.`}
        footer={
          <>
            <button onClick={() => setShowCodes(false)} className="min-h-11 rounded-xl border border-ink-200 bg-white px-5 text-sm font-semibold text-ink-700">Annuler</button>
            <button onClick={saveBulkCodes} className="min-h-11 rounded-xl bg-tracoli-500 px-6 text-sm font-bold text-white hover:bg-tracoli-600">Enregistrer les codes</button>
          </>
        }
      >
        <textarea className={`${field} min-h-40 py-2 font-mono uppercase`} value={codesText} onChange={(e) => setCodesText(e.target.value)} placeholder={"CODE-1\nCODE-2\nCODE-3"} />
        <p className="mt-2 text-[12px] text-ink-500">{parseCodes(codesText).length} code(s) collé(s) pour {uncoded} colis sans code.</p>
      </Modal>

      <ConfirmModal
        open={confirmDelete}
        title="Supprimer ce client ?"
        message={`« ${client.name} » et ses ${parcels.length} colis seront supprimés définitivement. Le suivi de ses colis ne fonctionnera plus.`}
        confirmLabel="Supprimer"
        onConfirm={removeClient}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
