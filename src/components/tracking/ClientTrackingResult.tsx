"use client";

import { Check, Package, Plane, Ship } from "lucide-react";
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

function ProgressBar({ percent, height = "h-3" }: { percent: number; height?: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Avancement du colis"
      className={`${height} overflow-hidden rounded-full bg-ink-100`}
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

/** Le colis cherché : pourcentage, étape en cours et étapes à venir, d'un seul coup d'œil. */
function MainParcel({ p }: { p: PublicParcel }) {
  const { index, step, total, percent } = parcelProgress(p.status);
  const current = CLIENT_STEPS[index];
  const next = CLIENT_STEPS[index + 1];

  return (
    <section className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-lg font-extrabold text-ink-900">
          {p.matricule ?? "Code à venir"}
        </p>
        <ModeChip mode={p.mode} />
      </div>
      {p.description && <p className="mt-1 text-base text-ink-700">{p.description}</p>}

      <div className="mt-6 flex items-end gap-4">
        <p className="text-6xl leading-none font-extrabold tracking-tight text-tracoli-500 tabular-nums">
          {percent}&nbsp;%
        </p>
        <p className="pb-1 text-base text-ink-700">
          Étape {step} sur {total}
        </p>
      </div>
      <div className="mt-3">
        <ProgressBar percent={percent} />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-ink-900">{current.label}</h2>
      <p className="mt-1 text-base leading-relaxed text-ink-700">{stepDetail(p, index)}</p>
      {next && (
        <p className="mt-2 text-base text-ink-500">
          Prochaine étape : <b className="text-ink-700">{next.label}</b>
        </p>
      )}
      {p.expected_ship_date && p.status === "en_agence" && (
        <p className="mt-4 rounded-xl bg-ink-50 px-4 py-3 text-base font-semibold text-ink-800">
          Départ prévu le {fmt(p.expected_ship_date)}
        </p>
      )}

      <div className="mt-7 border-t border-ink-100 pt-6">
        <Steps p={p} index={index} />
      </div>

      {p.external_code && (
        <p className="mt-5 text-sm text-ink-500">
          Code {p.external_platform || "externe"} : {p.external_code}
        </p>
      )}
    </section>
  );
}

/** Un autre colis du même client : pourcentage toujours visible, détail au toucher. */
function OtherParcel({ p }: { p: PublicParcel }) {
  const { index, percent } = parcelProgress(p.status);
  const current = CLIENT_STEPS[index];

  return (
    <details className="group rounded-2xl border border-ink-200 bg-white open:shadow-card">
      <summary className="cursor-pointer list-none p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate font-mono text-base font-extrabold text-ink-900">
            {p.matricule ?? "Code à venir"}
          </p>
          <p className="shrink-0 text-xl font-extrabold text-tracoli-500 tabular-nums">
            {percent}&nbsp;%
          </p>
        </div>
        <div className="mt-2.5">
          <ProgressBar percent={percent} height="h-2" />
        </div>
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
          <p className="text-base font-bold text-ink-900">{current.label}</p>
          <ModeChip mode={p.mode} />
        </div>
      </summary>
      <div className="border-t border-ink-100 p-4 sm:p-5">
        <p className="mb-4 text-base text-ink-700">{stepDetail(p, index)}</p>
        <Steps p={p} index={index} />
      </div>
    </details>
  );
}

export default function ClientTrackingResult({ data }: { data: PublicClient }) {
  const { client, parcels, highlight } = data;

  const main =
    parcels.find((p) => highlight && p.matricule === highlight) ??
    (parcels.length === 1 ? parcels[0] : null);
  const others = parcels.filter((p) => p !== main);
  const place = [client.city, client.country].filter(Boolean).join(", ");

  return (
    <div className="mt-10 space-y-6 anim-in">
      <p className="text-base text-ink-700">
        Colis de <b className="text-ink-900">{client.name}</b>
        {place && <span className="text-ink-500"> · {place}</span>}
      </p>

      {main && <MainParcel p={main} />}

      {others.length > 0 && (
        <section>
          <h2 className="text-lg font-extrabold text-ink-900">
            {main ? "Autres colis de ce client" : "Vos colis"} ({others.length})
          </h2>
          <div className="mt-3 space-y-3">
            {others.map((p, i) => (
              <OtherParcel key={p.matricule ?? `sans-code-${i}`} p={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
