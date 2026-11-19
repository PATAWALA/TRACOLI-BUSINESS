"use client";

import { Check, MapPin, Package, Plane, Ship } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";
import { PARCEL_STATUSES, modeLabel, statusInfo } from "@/lib/parcels";

export interface PublicParcel {
  matricule: string | null;
  mode: string;
  status: string;
  description: string | null;
  external_code: string | null;
  external_platform: string | null;
  expected_ship_date: string | null;
  history: { status: string; at: string }[];
}

export interface PublicClient {
  client: { name: string; city: string | null; country: string | null };
  parcels: PublicParcel[];
  highlight: string | null;
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });

function ParcelCard({ p, open }: { p: PublicParcel; open: boolean }) {
  const idx = PARCEL_STATUSES.findIndex((s) => s.value === p.status);
  const info = statusInfo(p.status);
  const ModeIcon = p.mode === "aerien" ? Plane : Ship;
  const pct = Math.round(((idx + 1) / PARCEL_STATUSES.length) * 100);

  return (
    <details open={open} className="group rounded-2xl border border-ink-200 bg-white open:shadow-card">
      <summary className="flex cursor-pointer list-none items-center gap-3 p-4 sm:p-5">
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${p.status === "livre" ? "bg-emerald-50 text-emerald-600" : "bg-tracoli-50 text-tracoli-500"}`}>
          {p.status === "livre" ? <Check className="size-5" strokeWidth={3} /> : <Package className="size-5" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-[15px] font-extrabold text-ink-900">{p.matricule ?? "Code à venir"}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-ink-500">
            <span className="inline-flex items-center gap-1"><ModeIcon className="size-3.5" />{modeLabel(p.mode) === "À préciser" ? "Mode à confirmer" : modeLabel(p.mode)}</span>
            {p.description && <span className="truncate">{p.description}</span>}
          </p>
        </div>
        <span className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${info.badge}`}>{info.label}</span>
      </summary>

      <div className="border-t border-ink-100 p-4 sm:p-5">
        <div className="h-2 overflow-hidden rounded-full bg-ink-100">
          <div style={{ width: `${pct}%` }} className="h-full rounded-full bg-gradient-to-r from-tracoli-500 to-emerald-500 transition-[width] duration-700" />
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-600">
          <MapPin className="size-4 text-tracoli-500" />
          <b>{info.location}</b>
        </p>
        <p className="mt-1 text-sm text-ink-500">{info.detail}</p>
        {p.expected_ship_date && p.status === "en_agence" && (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">
            Expédition prévue le {fmt(p.expected_ship_date)}
          </p>
        )}
        {p.external_code && (
          <p className="mt-2 text-xs text-ink-400">
            Code {p.external_platform || "externe"} : {p.external_code}
          </p>
        )}

        <ol className="mt-5 space-y-3">
          {PARCEL_STATUSES.map((s, i) => {
            const done = i < idx || (i === idx && s.value === "livre");
            const active = i === idx && !done;
            const when = p.history.find((h) => h.status === s.value)?.at;
            return (
              <li key={s.value} className="flex items-center gap-3">
                <span className={`grid size-6 shrink-0 place-items-center rounded-full border-2 text-white ${done ? "border-emerald-500 bg-emerald-500" : active ? "border-tracoli-500 bg-white" : "border-ink-200 bg-white"}`}>
                  {done ? <Check className="size-3.5" strokeWidth={3} /> : active ? <span className="size-2.5 rounded-full bg-tracoli-500" /> : null}
                </span>
                <span className={`text-sm font-semibold ${i > idx ? "text-ink-400" : "text-ink-900"}`}>{s.label}</span>
                {when && i <= idx && <span className="ml-auto text-xs text-ink-400">{fmt(when)}</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </details>
  );
}

export default function ClientTrackingResult({ data }: { data: PublicClient }) {
  const { client, parcels, highlight } = data;
  const delivered = parcels.filter((p) => p.status === "livre").length;
  const inRoute = parcels.filter((p) => ["expedie", "en_transit", "douane"].includes(p.status)).length;
  const inAgency = parcels.filter((p) => p.status === "en_agence").length;

  return (
    <div className="mt-10 space-y-5 anim-in">
      <div className="rounded-3xl border border-ink-200 bg-gradient-to-r from-white to-ink-50 p-6 shadow-card-lg sm:p-8">
        <p className="text-xs font-bold tracking-widest text-ink-400 uppercase">Suivi de vos colis</p>
        <p className="mt-1 text-2xl font-extrabold text-ink-900">
          {client.name}
        </p>
        {(client.city || client.country) && (
          <p className="mt-1 text-base text-ink-600">{[client.city, client.country].filter(Boolean).join(", ")}</p>
        )}

        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          {[
            { n: inAgency, l: "En agence", c: "text-amber-600 bg-amber-50" },
            { n: inRoute, l: "En route", c: "text-indigo-600 bg-indigo-50" },
            { n: delivered, l: "Disponibles", c: "text-emerald-600 bg-emerald-50" },
          ].map((s) => (
            <div key={s.l} className={`rounded-2xl p-3 ${s.c}`}>
              <p className="text-2xl font-extrabold">{s.n}</p>
              <p className="text-xs font-bold">{s.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-500">
          {parcels.length} colis au total. Touchez un colis pour voir où il se trouve.
        </p>
      </div>

      <div className="space-y-3">
        {parcels.map((p, i) => (
          <ParcelCard key={p.matricule ?? `sans-code-${i}`} p={p} open={highlight ? p.matricule === highlight : parcels.length === 1} />
        ))}
      </div>

      <a
        href={waLink(`Bonjour ${CONTACT.manager}, je souhaite des informations sur mon colis ${highlight ?? parcels.find((p) => p.matricule)?.matricule ?? ""}.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-base font-bold text-white hover:bg-emerald-700"
      >
        <FaWhatsapp className="size-5" /> Une question ? Écrire sur WhatsApp
      </a>
    </div>
  );
}
