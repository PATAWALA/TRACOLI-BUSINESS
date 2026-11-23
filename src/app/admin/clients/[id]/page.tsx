"use client";

import { use, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Pencil,
  ExternalLink,
  Layers,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import HelpBanner from "@/components/admin/ui/HelpBanner";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import Modal from "@/components/admin/ui/Modal";
import ParcelCodesModal from "@/components/admin/clients/ParcelCodesModal";
import ParcelStatusBadge from "@/components/admin/clients/ParcelStatusBadge";
import { adminFetch } from "@/lib/admin-fetch";
import { PARCEL_MODES, PARCEL_STATUSES, clientMessage, parseCodes, trackingUrl } from "@/lib/parcels";
import type { ClientWithParcels, Parcel, ParcelMode } from "@/types/database.types";

const field =
  "w-full min-h-11 rounded-lg border border-ink-200 bg-white px-3 text-[15px] text-ink-900 outline-none focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/15";

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
  const [showGroup, setShowGroup] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const [groupError, setGroupError] = useState("");

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

  /** Un seul code pour tous les colis cochés (code null = les retirer du lot). */
  async function saveGroup(code: string | null) {
    setGroupError("");
    const res = await adminFetch("/api/parcels", {
      method: "PATCH",
      body: JSON.stringify({ group: { ids: [...selected], code } }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return setGroupError(data.error ?? "Erreur : code non enregistré.");
    flash(code ? `Code ${code} donné à ${selected.size} colis ✓` : "Colis retirés du lot ✓");
    setShowGroup(false);
    setSelected(new Set());
    await load();
  }

  function suggestGroupCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const rnd = Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
    return `LOT-${rnd}`;
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
  const groupCodes = [...new Set(parcels.map((p) => p.group_code).filter((c): c is string => !!c))];
  const soloCodes = parcels.filter((p) => !p.group_code).map((p) => p.matricule).filter((c): c is string => !!c);
  const codedCodes = [...groupCodes, ...soloCodes];
  const uncoded = parcels.filter((p) => !p.group_code && !p.matricule).length;
  const selectedInGroup = parcels.some((p) => selected.has(p.id) && p.group_code);
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
              <strong>{parcels.length - uncoded}</strong> colis avec code
              {groupCodes.length > 0 && <> · <strong>{groupCodes.length}</strong> lot{groupCodes.length > 1 ? "s" : ""}</>}
              {uncoded > 0 && <> · <strong className="text-amber-700">{uncoded} sans code</strong></>}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {uncoded > 0 && (
                <button onClick={() => setShowCodes(true)} className="min-h-10 rounded-xl bg-tracoli-500 px-3 text-[13px] font-bold text-white hover:bg-tracoli-600">
                  Saisir les codes des colis
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

      <HelpBanner title="Comment ça marche ?">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Un colis :</strong> changez son statut avec le menu de sa ligne. Le client voit la mise à jour tout de suite.</li>
          <li><strong>Plusieurs colis :</strong> cochez-les (ou « Tout sélectionner »). Une barre apparaît en bas de l&apos;écran.</li>
          <li><strong>Un seul code pour plusieurs colis :</strong> cochez-les, puis « Donner un seul code ». Le client tape ce code et voit tous ces colis dans une seule carte.</li>
        </ul>
      </HelpBanner>

      {/* Colis */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-base font-bold text-ink-900">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => setSelected(allSelected ? new Set() : new Set(parcels.map((p) => p.id)))}
              className="size-5 accent-[#e60000]"
            />
            {allSelected ? "Tout désélectionner" : "Tout sélectionner"} ({parcels.length} colis)
          </label>
          <div className="flex flex-wrap gap-2">
            {parcels.length > 0 && (
              <button onClick={() => setShowCodes(true)} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-tracoli-500 px-5 text-[13px] font-bold text-white shadow-sm hover:bg-tracoli-600">
                {uncoded > 0 ? `Saisir les codes (${uncoded} à faire)` : "Modifier les codes"}
              </button>
            )}
            <button onClick={() => setShowAdd(true)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 text-[13px] font-bold text-ink-700 hover:bg-ink-50">
              <Plus className="size-4" /> Ajouter des colis
            </button>
          </div>
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
                    className="size-5 accent-[#e60000]"
                  />
                  <input
                    key={`${p.id}-${p.matricule ?? ""}`}
                    aria-label="Code du colis"
                    defaultValue={p.matricule ?? ""}
                    placeholder="Code du colis…"
                    className="min-h-11 w-56 rounded-lg border border-ink-200 bg-white px-3 font-mono text-base font-bold text-ink-900 uppercase outline-none placeholder:font-sans placeholder:font-medium placeholder:normal-case placeholder:text-ink-400 focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/15"
                    onBlur={(e) => {
                      const v = e.target.value.trim().toUpperCase().replace(/\s+/g, "");
                      if (v !== (p.matricule ?? "")) assignCodes([{ id: p.id, code: v || null }]);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                  />
                  {p.group_code && (
                    <span className="inline-flex min-h-9 items-center rounded-lg bg-tracoli-50 px-3 font-mono text-sm font-bold text-tracoli-700">
                      Lot : {p.group_code}
                    </span>
                  )}
                  <ParcelStatusBadge status={p.status} />
                  <button onClick={() => removeParcel(p)} aria-label="Supprimer ce colis" className="ml-auto grid size-9 place-items-center rounded-lg text-ink-300 hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <label className="block">
                    <span className="text-sm font-bold text-ink-700">Statut</span>
                    <select className={field} value={p.status} onChange={(e) => patchParcels([p.id], { status: e.target.value })}>
                      {PARCEL_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-ink-700">Mode</span>
                    <select className={field} value={p.mode} onChange={(e) => patchParcels([p.id], { mode: e.target.value })}>
                      {PARCEL_MODES.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                  </label>
                  <label className="block sm:col-span-2 xl:col-span-2">
                    <span className="text-sm font-bold text-ink-700">Contenu</span>
                    <input className={field} defaultValue={p.description ?? ""} placeholder="Ex : 2 cartons de vêtements" onBlur={(e) => e.target.value !== (p.description ?? "") && patchParcels([p.id], { description: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-ink-700">Date d&apos;expédition prévue</span>
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
        <div className="fixed inset-x-3 bottom-20 z-50 max-h-[80dvh] space-y-3 overflow-y-auto rounded-2xl border border-ink-200 bg-white p-4 shadow-2xl lg:right-8 lg:bottom-6 lg:left-auto lg:w-[36rem]">
          <p className="text-base font-extrabold text-ink-900">
            {selected.size} colis sélectionné{selected.size > 1 ? "s" : ""}
          </p>
          <button
            onClick={() => {
              setGroupCode(suggestGroupCode());
              setGroupError("");
              setShowGroup(true);
            }}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-4 text-[15px] font-bold text-white hover:bg-tracoli-600"
          >
            <Layers className="size-5" aria-hidden /> Donner un seul code à ces colis
          </button>
          <label className="block">
            <span className="text-sm font-bold text-ink-700">Ou changer le statut de ces colis</span>
            <select
              defaultValue=""
              onChange={async (e) => {
                if (!e.target.value) return;
                await patchParcels([...selected], { status: e.target.value });
                setSelected(new Set());
                e.target.value = "";
              }}
              className={field}
            >
              <option value="">Choisir le nouveau statut…</option>
              {PARCEL_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedInGroup && (
              <button onClick={() => saveGroup(null)} className="min-h-11 rounded-lg border border-ink-200 px-4 text-sm font-bold text-ink-700 hover:bg-ink-50">
                Retirer du lot
              </button>
            )}
            <button onClick={() => setSelected(new Set())} className="min-h-11 rounded-lg px-4 text-sm font-semibold text-ink-600 hover:bg-ink-50">
              Annuler la sélection
            </button>
          </div>
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
        open={showGroup}
        onClose={() => setShowGroup(false)}
        title={`Un seul code pour ${selected.size} colis`}
        description="Le client tape ce code sur la page de suivi et voit tous ces colis dans une seule carte, avec leur nom et leur pourcentage."
        footer={
          <>
            <button onClick={() => setShowGroup(false)} className="min-h-12 rounded-xl border border-ink-200 bg-white px-5 text-[15px] font-semibold text-ink-700">Annuler</button>
            <button onClick={() => saveGroup(groupCode)} disabled={groupCode.trim().length < 4} className="min-h-12 rounded-xl bg-tracoli-500 px-6 text-[15px] font-bold text-white hover:bg-tracoli-600 disabled:opacity-50">
              Enregistrer le code
            </button>
          </>
        }
      >
        <label className="block">
          <span className="text-sm font-bold text-ink-800">Code du lot</span>
          <input
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            autoFocus
            className={`${field} min-h-12 font-mono text-lg font-bold uppercase`}
          />
        </label>
        <button type="button" onClick={() => setGroupCode(suggestGroupCode())} className="mt-3 min-h-11 rounded-lg border border-ink-200 px-4 text-sm font-bold text-ink-700 hover:bg-ink-50">
          Proposer un autre code
        </button>
        <p className="mt-3 text-sm text-ink-600">
          Au moins 4 caractères. Le code proposé convient tel quel, ou remplacez-le par le vôtre. Envoyez-le ensuite au client avec « Copier le message avec les codes ».
        </p>
        {groupError && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{groupError}</p>}
      </Modal>

      <ParcelCodesModal client={client} open={showCodes} onClose={() => setShowCodes(false)} onSaved={load} />

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
