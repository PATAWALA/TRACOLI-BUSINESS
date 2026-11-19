"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Upload,
  Download,
  Users,
  Package,
  Warehouse,
  Ship,
  ChevronRight,
  MapPin,
} from "lucide-react";
import StatCard from "@/components/admin/ui/StatCard";
import HelpBanner from "@/components/admin/ui/HelpBanner";
import ClientFormModal from "@/components/admin/clients/ClientFormModal";
import ImportModal from "@/components/admin/clients/ImportModal";
import { adminFetch } from "@/lib/admin-fetch";
import { PARCEL_STATUSES, clientMessage, modeLabel, statusInfo, trackingUrl } from "@/lib/parcels";
import type { ClientWithParcels, ParcelStatus } from "@/types/database.types";

function summarize(c: ClientWithParcels) {
  const counts = new Map<ParcelStatus, number>();
  c.parcels.forEach((p) => counts.set(p.status, (counts.get(p.status) ?? 0) + 1));
  const modes = [...new Set(c.parcels.map((p) => modeLabel(p.mode)))].join(" / ");
  return { counts, modes };
}

function csvCell(v: string | number | null | undefined) {
  return `"${String(v ?? "").replace(/"/g, '""')}"`;
}

export default function AdminClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientWithParcels[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ParcelStatus | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [created, setCreated] = useState<{ name: string; parcels: number } | null>(null);

  const load = useCallback(async () => {
    const res = await adminFetch("/api/clients");
    const data = await res.json();
    if (!res.ok) {
      setError(
        data.error?.includes("clients")
          ? "Les tables clients/colis n'existent pas encore dans Supabase. Exécutez le fichier supabase/migrations/001_clients_parcels.sql."
          : (data.error ?? "Erreur de chargement."),
      );
    } else {
      setError("");
      setClients(data.clients);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
  }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return clients.filter((c) => {
      if (filter !== "all" && !c.parcels.some((p) => p.status === filter)) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        (c.city ?? "").toLowerCase().includes(q) ||
        (c.whatsapp ?? "").includes(q) ||
        c.parcels.some((p) => (p.matricule ?? "").toLowerCase().includes(q) || (p.external_code ?? "").toLowerCase().includes(q))
      );
    });
  }, [clients, search, filter]);

  const totalParcels = clients.reduce((n, c) => n + c.parcels.length, 0);
  const countStatus = (s: ParcelStatus) =>
    clients.reduce((n, c) => n + c.parcels.filter((p) => p.status === s).length, 0);

  async function copy(text: string, key: string, e?: React.MouseEvent) {
    e?.stopPropagation();
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  function exportCsv() {
    const head = ["Client", "Ville", "Pays", "WhatsApp", "Code du colis", "Statut", "Mode", "Lien de suivi"];
    const lines = filtered.flatMap((c) =>
      (c.parcels.length ? c.parcels : [null]).map((p) =>
        [
          c.name,
          c.city,
          c.country,
          c.whatsapp,
          p?.matricule ?? "",
          p ? statusInfo(p.status).label : "",
          p ? modeLabel(p.mode) : "",
          p?.matricule ? trackingUrl(p.matricule) : "",
        ]
          .map(csvCell)
          .join(";"),
      ),
    );
    const blob = new Blob(["﻿" + [head.map(csvCell).join(";"), ...lines].join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `clients-tracoli-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const chips: { value: ParcelStatus | "all"; label: string }[] = [
    { value: "all", label: "Tous" },
    ...PARCEL_STATUSES.map((s) => ({ value: s.value, label: s.label })),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
            Clients &amp; colis
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Les clients dont la marchandise est en agence ou en route. Chaque colis a son propre code de suivi.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <button
            onClick={() => setShowForm(true)}
            className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-5 text-sm font-bold text-white shadow-sm hover:bg-tracoli-600 sm:col-span-1"
          >
            <Plus className="size-4" /> Ajouter un client
          </button>
          <button
            onClick={() => setShowImport(true)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 hover:bg-ink-50"
          >
            <Upload className="size-4" /> Importer
          </button>
          <button
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 hover:bg-ink-50 disabled:opacity-50"
          >
            <Download className="size-4" /> Exporter la liste
          </button>
        </div>
      </div>

      <HelpBanner title="Comment ça marche ?">
        <ol className="list-decimal space-y-0.5 pl-4">
          <li>Ajoutez un client (ou importez une liste), puis ouvrez-le pour saisir le <b>code de chaque colis</b>.</li>
          <li>Envoyez-lui les codes de ses colis (bouton <b>Copier le message</b> dans sa fiche).</li>
          <li>Le client saisit le code d&apos;un colis sur <b>tracolibusiness.com/suivre</b> et voit où il est.</li>
          <li>Ouvrez un client pour changer le statut de ses colis au fil de l&apos;expédition.</li>
        </ol>
      </HelpBanner>

      {created && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-bold text-emerald-800">
            Client {created.name} créé avec {created.parcels} colis.
          </p>
          <p className="mt-1 text-[13px] text-emerald-700">
            Ouvrez sa fiche pour saisir ou modifier le code de chaque colis.
          </p>
        </div>
      )}

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <StatCard label="Clients" value={loading ? "—" : clients.length} icon={Users} color="bg-blue-50 text-blue-600" delay={0} />
        <StatCard label="Colis au total" value={loading ? "—" : totalParcels} icon={Package} color="bg-tracoli-50 text-tracoli-600" delay={0.05} />
        <StatCard label="En agence" value={loading ? "—" : countStatus("en_agence")} icon={Warehouse} color="bg-amber-50 text-amber-600" delay={0.1} />
        <StatCard label="En route" value={loading ? "—" : countStatus("expedie") + countStatus("en_transit")} icon={Ship} color="bg-indigo-50 text-indigo-600" delay={0.15} />
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un client, un code, une ville, un code Alibaba…"
            className="min-h-11 w-full rounded-xl border border-ink-200 bg-white pr-4 pl-10 text-sm outline-none focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/15"
          />
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
          {chips.map((c) => (
            <button
              key={c.value}
              onClick={() => setFilter(c.value)}
              className={`min-h-9 shrink-0 rounded-full border px-4 text-xs font-bold transition-colors ${
                filter === c.value
                  ? "border-tracoli-500 bg-tracoli-500 text-white"
                  : "border-ink-200 bg-white text-ink-600 hover:bg-ink-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center rounded-2xl border border-ink-200 bg-white py-16">
          <div className="size-7 animate-spin rounded-full border-[3px] border-ink-200 border-t-tracoli-500" />
        </div>
      ) : filtered.length === 0 && !error ? (
        <div className="rounded-2xl border border-dashed border-ink-300 bg-white p-8 text-center">
          <Package className="mx-auto size-8 text-ink-300" />
          <p className="mt-3 text-sm font-bold text-ink-800">
            {clients.length === 0 ? "Aucun client pour le moment" : "Aucun résultat"}
          </p>
          <p className="mt-1 text-[13px] text-ink-500">
            {clients.length === 0
              ? "Cliquez sur « Ajouter un client » ou « Importer » pour charger votre liste."
              : "Essayez un autre mot-clé ou un autre filtre."}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((c) => {
            const { counts, modes } = summarize(c);
            return (
              <li
                key={c.id}
                onClick={() => router.push(`/admin/clients/${c.id}`)}
                className="cursor-pointer rounded-2xl border border-ink-200 bg-white p-4 shadow-sm transition-all hover:border-tracoli-200 hover:shadow-md sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="truncate text-[15px] font-extrabold text-ink-900">{c.name}</p>
                      {(c.city || c.country) && (
                        <span className="inline-flex items-center gap-1 text-[12px] text-ink-500">
                          <MapPin className="size-3.5" />
                          {[c.city, c.country].filter(Boolean).join(", ")}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-ink-100 px-2.5 py-1 text-[12px] font-bold text-ink-700">
                        {c.parcels.length} colis
                      </span>
                      {modes && <span className="text-[12px] text-ink-500">{modes}</span>}
                      {c.parcels.some((p) => !p.matricule) && (
                        <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-[12px] font-bold text-amber-700">
                          {c.parcels.filter((p) => !p.matricule).length} sans code
                        </span>
                      )}
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {[...counts.entries()].map(([s, n]) => (
                        <span key={s} className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${statusInfo(s).badge}`}>
                          {n} · {statusInfo(s).label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <ChevronRight className="size-5 text-ink-300" />
                    <button
                      onClick={(e) => copy(clientMessage(c.name, c.parcels.map((p) => p.matricule).filter((x): x is string => !!x)), `m-${c.id}`, e)}
                      className="hidden rounded-lg border border-ink-200 px-3 py-1.5 text-[12px] font-semibold text-ink-600 hover:bg-ink-50 sm:block"
                    >
                      {copied === `m-${c.id}` ? "Copié !" : "Copier le message"}
                    </button>
                  </div>
                </div>
                <button
                  onClick={(e) => copy(clientMessage(c.name, c.parcels.map((p) => p.matricule).filter((x): x is string => !!x)), `m-${c.id}`, e)}
                  className="mt-3 min-h-10 w-full rounded-xl border border-ink-200 text-[13px] font-semibold text-ink-600 hover:bg-ink-50 sm:hidden"
                >
                  {copied === `m-${c.id}` ? "Message copié !" : "Copier le message pour le client"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <ClientFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onCreated={(name, parcels) => {
          setShowForm(false);
          setCreated({ name, parcels });
          load();
        }}
      />
      <ImportModal open={showImport} onClose={() => setShowImport(false)} onDone={load} />
    </div>
  );
}
