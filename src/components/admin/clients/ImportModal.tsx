"use client";

import { useState } from "react";
import { ListChecks, ClipboardPaste } from "lucide-react";
import Modal from "@/components/admin/ui/Modal";
import { adminFetch } from "@/lib/admin-fetch";
import {
  WAITING_CLIENTS_2026_11,
  rowToParcels,
  type ImportRow,
} from "@/data/imports/waiting-clients-2026-11";

const MODE_LABEL = { maritime: "Maritime", aerien: "Aérien", mixte: "Mixte" } as const;

/** Lit un texte collé : nom ; ville ; pays ; nombre de colis ; mode (une ligne par client). */
function parsePaste(text: string): ImportRow[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.split(/[;\t]/).map((c) => c.trim()))
    .filter((c) => c[0])
    .map((c) => {
      const m = (c[4] ?? "").toLowerCase();
      return {
        name: c[0],
        city: c[1] || null,
        country: c[2] || null,
        count: Math.max(1, parseInt(c[3], 10) || 1),
        mode: m.includes("/") || m.includes("mixte")
          ? "mixte"
          : m.startsWith("a") ? "aerien" : "maritime",
      } as ImportRow;
    });
}

export default function ImportModal({
  open,
  onClose,
  onDone,
}: {
  open: boolean;
  onClose: () => void;
  onDone: () => void;
}) {
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [paste, setPaste] = useState("");
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<string>("");

  const total = rows.reduce((n, r) => n + r.count, 0);

  async function run() {
    setSaving(true);
    setResult("");
    const res = await adminFetch("/api/clients", {
      method: "POST",
      body: JSON.stringify({
        clients: rows.map((r) => ({
          name: r.name,
          city: r.city,
          country: r.country,
          parcels: rowToParcels(r),
        })),
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) return setResult(data.error ?? "Erreur lors de l'import.");

    setResult(
      `${data.created.length} client(s) créé(s)` +
        (data.skipped.length ? ` · ${data.skipped.length} déjà existant(s) ignoré(s)` : "") +
        (data.failed.length ? ` · ${data.failed.length} en erreur` : ""),
    );
    setRows([]);
    onDone();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      wide
      title="Importer une liste de clients"
      description="Créez plusieurs clients et leurs colis d'un coup. Les clients déjà présents (même nom et même ville) sont ignorés."
      footer={
        <>
          <button onClick={onClose} className="min-h-11 rounded-xl border border-ink-200 bg-white px-5 text-sm font-semibold text-ink-700 hover:bg-ink-50">
            Fermer
          </button>
          <button
            onClick={run}
            disabled={saving || rows.length === 0}
            className="min-h-11 rounded-xl bg-tracoli-500 px-6 text-sm font-bold text-white hover:bg-tracoli-600 disabled:opacity-50"
          >
            {saving ? "Import en cours…" : `Importer ${rows.length} client(s) · ${total} colis`}
          </button>
        </>
      }
    >
      <div className="space-y-5">
        <button
          onClick={() => setRows(WAITING_CLIENTS_2026_11)}
          className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-tracoli-200 bg-tracoli-50/50 p-4 text-left hover:bg-tracoli-50"
        >
          <ListChecks className="size-6 shrink-0 text-tracoli-500" />
          <span>
            <span className="block text-sm font-bold text-ink-900">
              Charger la liste du 15 novembre 2026
            </span>
            <span className="block text-[13px] text-ink-500">
              21 clients en attente d&apos;expédition · 80 colis
            </span>
          </span>
        </button>

        <div>
          <p className="flex items-center gap-2 text-[12px] font-bold text-ink-700">
            <ClipboardPaste className="size-4" /> Ou collez une liste (une ligne par client)
          </p>
          <textarea
            value={paste}
            onChange={(e) => {
              setPaste(e.target.value);
              setRows(parsePaste(e.target.value));
            }}
            rows={4}
            placeholder={"Nom ; Ville ; Pays ; Nombre de colis ; Mode\nDaplogistic ; Kinshasa ; RDC ; 23 ; Maritime"}
            className="mt-2 w-full rounded-xl border border-ink-200 p-3 font-mono text-[12px] outline-none focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/15"
          />
          <p className="mt-1 text-[12px] text-ink-400">
            Mode : Maritime, Aérien ou « Aérien / Maritime ». Copier-coller depuis Excel fonctionne.
          </p>
        </div>

        {rows.length > 0 && (
          <div>
            <p className="mb-2 text-[12px] font-bold tracking-wide text-ink-500 uppercase">
              Aperçu — vérifiez avant d&apos;importer
            </p>
            <div className="max-h-64 overflow-auto rounded-xl border border-ink-200">
              <table className="w-full text-left text-[13px]">
                <thead className="sticky top-0 bg-ink-50 text-[11px] text-ink-400 uppercase">
                  <tr>
                    <th className="px-3 py-2">Client</th>
                    <th className="px-3 py-2">Ville</th>
                    <th className="px-3 py-2 text-right">Colis</th>
                    <th className="px-3 py-2">Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-t border-ink-100">
                      <td className="px-3 py-2 font-semibold">{r.name}</td>
                      <td className="px-3 py-2 text-ink-600">{[r.city, r.country].filter(Boolean).join(", ")}</td>
                      <td className="px-3 py-2 text-right font-bold">{r.count}</td>
                      <td className="px-3 py-2 text-ink-600">{MODE_LABEL[r.mode]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {result && (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{result}</p>
        )}
      </div>
    </Modal>
  );
}
