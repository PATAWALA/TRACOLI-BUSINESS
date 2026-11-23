"use client";

import Link from "next/link";
import { ArrowRight, Check, Package, Plane, Search, Ship } from "lucide-react";
import { CLIENT_STEPS, modeLabel, parcelProgress } from "@/lib/parcels";

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

const ORDINALS = [
  "Premier",
  "Deuxième",
  "Troisième",
  "Quatrième",
  "Cinquième",
  "Sixième",
  "Septième",
  "Huitième",
  "Neuvième",
  "Dixième",
];

/** « Premier colis », « Deuxième colis »… puis « Colis n° 11 » au-delà de dix. */
const parcelRank = (i: number) =>
  i < ORDINALS.length ? `${ORDINALS[i]} colis` : `Colis n° ${i + 1}`;

/** Phrase de l'étape en cours, précisée selon le mode de transport. */
function stepDetail(p: PublicParcel, index: number): string {
  const step = CLIENT_STEPS[index];
  if (step.value === "en_transit") {
    if (p.mode === "maritime") return "Votre colis voyage par bateau vers votre pays.";
    if (p.mode === "aerien") return "Votre colis voyage par avion vers votre pays.";
  }
  return step.detail;
}

function ModeChip({ mode }: { mode: string }) {
  const Icon = mode === "aerien" ? Plane : mode === "maritime" ? Ship : Package;
  const label = mode === "a_preciser" ? "Transport à confirmer" : modeLabel(mode);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-3 py-1 text-sm font-semibold text-ink-700">
      <Icon className="size-4" aria-hidden />
      {label}
    </span>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Avancement du colis"
      className="h-3 overflow-hidden rounded-full bg-ink-100"
    >
      <div
        style={{ width: `${percent}%` }}
        className="h-full rounded-full bg-tracoli-500 transition-[width] duration-700"
      />
    </div>
  );
}

/** Les 5 étapes, la position actuelle étant marquée « Maintenant ». */
function Steps({ p, index }: { p: PublicParcel; index: number }) {
  return (
    <ol className="space-y-3.5">
      {CLIENT_STEPS.map((s, i) => {
        const delivered = p.status === "livre";
        const done = i < index || (delivered && i === index);
        const current = i === index && !done;
        const when = p.history.find((h) => h.status === s.value)?.at;
        return (
          <li key={s.value} className="flex items-center gap-3">
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full border-2 ${
                done
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : current
                    ? "border-tracoli-500 bg-white"
                    : "border-ink-200 bg-white"
              }`}
            >
              {done ? (
                <Check className="size-4" strokeWidth={3} aria-hidden />
              ) : current ? (
                <span className="size-3 rounded-full bg-tracoli-500" />
              ) : null}
            </span>
            <span
              className={`text-base ${
                current ? "font-extrabold text-ink-900" : done ? "font-semibold text-ink-900" : "text-ink-500"
              }`}
            >
              {s.label}
            </span>
            {current && (
              <span className="rounded-full bg-tracoli-50 px-2.5 py-0.5 text-sm font-bold text-tracoli-700">
                Maintenant
              </span>
            )}
            {when && i <= index && (
              <span className="ml-auto text-sm text-ink-500">{fmt(when)}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Un colis du client. Résumé toujours visible : rang, titre saisi par l'équipe,
 * pourcentage, barre, étape. Le détail s'ouvre au toucher.
 */
function ParcelCard({
  p,
  rank,
  open,
}: {
  p: PublicParcel;
  rank: string;
  open: boolean;
}) {
  const { index, step, total, percent } = parcelProgress(p.status);
  const current = CLIENT_STEPS[index];
  const next = CLIENT_STEPS[index + 1];
  const title = p.description?.trim() || null;

  return (
    <details
      open={open}
      className="group rounded-3xl border border-ink-200 bg-white open:shadow-card"
    >
      <summary className="cursor-pointer list-none p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink-500">{rank}</p>
            <p className="mt-0.5 truncate text-xl font-extrabold text-ink-900">
              {title ?? p.matricule ?? "Code à venir"}
            </p>
          </div>
          <p className="shrink-0 text-4xl leading-none font-extrabold tracking-tight text-tracoli-500 tabular-nums">
            {percent}&nbsp;%
          </p>
        </div>

        <div className="mt-4">
          <ProgressBar percent={percent} />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="text-base font-extrabold text-ink-900">{current.label}</p>
          <div className="flex flex-wrap items-center gap-2">
            {title && p.matricule && (
              <span className="font-mono text-sm font-semibold text-ink-500">
                {p.matricule}
              </span>
            )}
            <ModeChip mode={p.mode} />
          </div>
        </div>
      </summary>

      <div className="border-t border-ink-100 p-5 sm:p-6">
        <p className="text-base leading-relaxed text-ink-700">{stepDetail(p, index)}</p>
        <p className="mt-1 text-base text-ink-500">
          Étape {step} sur {total}
          {next && (
            <>
              {" "}
              · Prochaine étape : <b className="text-ink-700">{next.label}</b>
            </>
          )}
        </p>
        {p.expected_ship_date && p.status === "en_agence" && (
          <p className="mt-4 rounded-xl bg-ink-50 px-4 py-3 text-base font-semibold text-ink-800">
            Départ prévu le {fmt(p.expected_ship_date)}
          </p>
        )}

        <div className="mt-6">
          <Steps p={p} index={index} />
        </div>

        {p.external_code && (
          <p className="mt-5 text-sm text-ink-500">
            Code {p.external_platform || "externe"} : {p.external_code}
          </p>
        )}
      </div>
    </details>
  );
}

export default function ClientTrackingResult({
  data,
  onReset,
}: {
  data: PublicClient;
  onReset: () => void;
}) {
  const { client, parcels, highlight } = data;
  const many = parcels.length > 1;
  const place = [client.city, client.country].filter(Boolean).join(", ");

  return (
    <div className="mt-2 space-y-6 anim-in">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          {many ? (
            <>
              Vous avez <span className="text-tracoli-500">{parcels.length}</span> colis
            </>
          ) : (
            "Votre colis"
          )}
        </h1>
        <p className="mt-2 text-base text-ink-500">
          {client.name}
          {place && ` · ${place}`}
        </p>
        {many && (
          <p className="mt-3 text-base text-ink-700">
            Touchez un colis pour voir où il se trouve.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {parcels.map((p, i) => (
          <ParcelCard
            key={p.matricule ?? `sans-code-${i}`}
            p={p}
            rank={many ? parcelRank(i) : "Colis"}
            open={!many || (!!highlight && p.matricule === highlight)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border-2 border-ink-200 bg-white px-7 py-4 text-[15px] font-bold text-ink-800 transition-colors duration-200 hover:border-tracoli-300 active:scale-[0.98]"
        >
          <Search className="size-[18px]" aria-hidden />
          Suivre le colis de quelqu&apos;un d&apos;autre
        </button>
        <Link
          href="/demande"
          className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border-2 border-ink-200 bg-white px-7 py-4 text-[15px] font-bold text-ink-800 transition-colors duration-200 hover:border-tracoli-300 active:scale-[0.98]"
        >
          Passer une nouvelle commande
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
