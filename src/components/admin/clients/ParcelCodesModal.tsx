"use client";

import { useRef, useState } from "react";
import Modal from "@/components/admin/ui/Modal";
import ParcelStatusBadge from "@/components/admin/clients/ParcelStatusBadge";
import { adminFetch } from "@/lib/admin-fetch";
import { normalizeCode } from "@/lib/parcels";
import type { ClientWithParcels } from "@/types/database.types";

/**
 * Saisie des codes de tous les colis d'un client sur un seul écran :
 * un champ par colis. Entrée = colis suivant. Coller une colonne (Excel, WhatsApp)
 * remplit automatiquement les champs suivants.
 */
export default function ParcelCodesModal({
  client,
  open,
  onClose,
  onSaved,
}: {
  client: ClientWithParcels | null;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const parcels = client?.parcels ?? [];
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Réinitialise le formulaire à chaque ouverture (ajustement d'état pendant le rendu, sans effet).
  const sessionKey = open ? `${client?.id ?? ""}|${parcels.map((p) => p.matricule ?? "").join(",")}` : "";
  const [seen, setSeen] = useState("");
  if (seen !== sessionKey) {
    setSeen(sessionKey);
    setValues(Object.fromEntries(parcels.map((p) => [p.id, p.matricule ?? ""])));
    setError("");
  }

  const changed = parcels.filter((p) => normalizeCode(values[p.id] ?? "") !== (p.matricule ?? ""));
  const empty = parcels.filter((p) => !normalizeCode(values[p.id] ?? "")).length;

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>, index: number) {
    const text = e.clipboardData.getData("text");
    if (!/[\r\n]/.test(text.trim())) return;
    e.preventDefault();
    const codes = text.split(/[\r\n]+/).map((c) => normalizeCode(c)).filter(Boolean);
    setValues((prev) => {
      const next = { ...prev };
      codes.forEach((c, i) => {
        const p = parcels[index + i];
        if (p) next[p.id] = c;
      });
      return next;
    });
  }

  async function save() {
    setError("");
    const codes = parcels.map((p) => normalizeCode(values[p.id] ?? "")).filter(Boolean);
    const dup = codes.find((c, i) => codes.indexOf(c) !== i);
    if (dup) return setError(`Le code « ${dup} » est saisi deux fois.`);

    setSaving(true);
    const res = await adminFetch("/api/parcels", {
      method: "PATCH",
      body: JSON.stringify({
        assign: changed.map((p) => ({ id: p.id, code: normalizeCode(values[p.id] ?? "") || null })),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) return setError(data.error ?? "Erreur : codes non enregistrés.");
    onSaved();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      wide
      title={client ? `Codes des colis — ${client.name}` : "Codes des colis"}
      description="Saisissez le code de chaque colis. Entrée passe au colis suivant. Vous pouvez aussi coller une liste (un code par ligne) dans le premier champ."
      footer={
        <>
          <button onClick={onClose} className="min-h-11 rounded-xl border border-ink-200 bg-white px-5 text-sm font-semibold text-ink-700 hover:bg-ink-50">
            Fermer
          </button>
          <button
            onClick={save}
            disabled={saving || changed.length === 0}
            className="min-h-11 rounded-xl bg-tracoli-500 px-6 text-sm font-bold text-white hover:bg-tracoli-600 disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : changed.length ? `Enregistrer (${changed.length})` : "Enregistrer"}
          </button>
        </>
      }
    >
      {parcels.length === 0 ? (
        <p className="rounded-xl bg-ink-50 p-4 text-sm text-ink-600">
          Ce client n&apos;a pas encore de colis. Ouvrez sa fiche et cliquez sur « Ajouter des colis ».
        </p>
      ) : (
        <div>
          <p className="mb-3 text-[13px] text-ink-500">
            {parcels.length} colis · <strong className={empty ? "text-amber-700" : "text-emerald-700"}>{empty} sans code</strong>
          </p>
          <ul className="space-y-2">
            {parcels.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-[12px] font-bold text-ink-400">Colis {i + 1}</span>
                <input
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  value={values[p.id] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [p.id]: e.target.value }))}
                  onPaste={(e) => onPaste(e, i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      refs.current[i + 1]?.focus();
                    }
                  }}
                  autoFocus={i === 0}
                  placeholder="Code du colis…"
                  aria-label={`Code du colis ${i + 1}`}
                  className="min-h-11 min-w-0 flex-1 rounded-xl border border-ink-200 bg-white px-3.5 font-mono text-sm font-bold text-ink-900 uppercase outline-none placeholder:font-sans placeholder:font-medium placeholder:normal-case placeholder:text-ink-300 focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/15"
                />
                <span className="hidden shrink-0 sm:block">
                  <ParcelStatusBadge status={p.status} />
                </span>
              </li>
            ))}
          </ul>
          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
        </div>
      )}
    </Modal>
  );
}
