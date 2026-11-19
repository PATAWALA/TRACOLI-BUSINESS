import type { SupabaseClient } from "@supabase/supabase-js";
import { isParcelMode, normalizeCode } from "@/lib/parcels";
import type { ParcelMode } from "@/types/database.types";

export interface NewParcelInput {
  /** Code du colis, saisi par l'équipe (facultatif : peut être ajouté plus tard). */
  code?: string | null;
  mode?: ParcelMode;
  description?: string | null;
}

export interface NewClientInput {
  name: string;
  city?: string | null;
  country?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  notes?: string | null;
  source?: string;
  parcels?: NewParcelInput[];
}

const clean = (v?: string | null) => (v && v.trim() ? v.trim() : null);

/** Code de colis normalisé (majuscules, sans espaces) ou null. */
export const cleanCode = (v?: string | null) => {
  const c = v ? normalizeCode(v) : "";
  return c || null;
};

export class DuplicateCodeError extends Error {
  constructor(public code?: string) {
    super(code ? `Le code « ${code} » est déjà utilisé par un autre colis.` : "Code déjà utilisé.");
  }
}

export function buildParcelRows(clientId: string, parcels: NewParcelInput[]) {
  const now = new Date().toISOString();
  return parcels.map((p) => ({
    client_id: clientId,
    matricule: cleanCode(p.code),
    mode: isParcelMode(p.mode) ? p.mode : "a_preciser",
    status: "en_agence",
    description: clean(p.description),
    created_at: now,
    updated_at: now,
  }));
}

/** Détecte les codes en double dans la saisie (avant même d'interroger la base). */
export function findDuplicateCode(parcels: NewParcelInput[]): string | null {
  const seen = new Set<string>();
  for (const p of parcels) {
    const c = cleanCode(p.code);
    if (!c) continue;
    if (seen.has(c)) return c;
    seen.add(c);
  }
  return null;
}

export async function insertParcels(
  sb: SupabaseClient,
  rows: ReturnType<typeof buildParcelRows>,
) {
  if (!rows.length) return;
  const { data, error } = await sb.from("parcels").insert(rows).select("id");
  if (error) {
    if (error.code === "23505") {
      const m = error.message.match(/\(matricule\)=\(([^)]*)\)/);
      throw new DuplicateCodeError(m?.[1]);
    }
    throw new Error(error.message);
  }
  await sb.from("parcel_events").insert(
    (data ?? []).map((p) => ({
      parcel_id: p.id,
      status: "en_agence",
      note: "Colis enregistré",
    })),
  );
}

/** Crée un client + ses colis (codes saisis par l'équipe, ou vides pour plus tard). */
export async function createClientWithParcels(
  sb: SupabaseClient,
  input: NewClientInput,
) {
  const dup = findDuplicateCode(input.parcels ?? []);
  if (dup) throw new DuplicateCodeError(dup);

  const now = new Date().toISOString();
  const { data: client, error } = await sb
    .from("clients")
    .insert({
      name: input.name.trim(),
      city: clean(input.city),
      country: clean(input.country),
      whatsapp: clean(input.whatsapp),
      email: clean(input.email)?.toLowerCase() ?? null,
      notes: clean(input.notes),
      source: input.source ?? "manual",
      created_at: now,
      updated_at: now,
    })
    .select("id")
    .single();
  if (error || !client) throw new Error(error?.message ?? "Erreur");

  try {
    await insertParcels(sb, buildParcelRows(client.id, input.parcels ?? []));
  } catch (e) {
    // Pas de client orphelin si un code est refusé.
    await sb.from("clients").delete().eq("id", client.id);
    throw e;
  }

  return { id: client.id, parcels: input.parcels?.length ?? 0 };
}
