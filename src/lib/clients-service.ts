import type { SupabaseClient } from "@supabase/supabase-js";
import { matriculeFor, isParcelMode } from "@/lib/parcels";
import type { ParcelMode } from "@/types/database.types";

export interface NewParcelInput {
  mode?: ParcelMode;
  description?: string | null;
  external_code?: string | null;
  external_platform?: string | null;
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

function randomCode(): string {
  return `TRC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function buildParcelRows(
  clientId: string,
  clientCode: string,
  parcels: NewParcelInput[],
  startAt = 1,
) {
  const now = new Date().toISOString();
  return parcels.map((p, i) => ({
    client_id: clientId,
    matricule: matriculeFor(clientCode, startAt + i),
    mode: isParcelMode(p.mode) ? p.mode : "a_preciser",
    status: "en_agence",
    description: clean(p.description),
    external_code: clean(p.external_code)?.toUpperCase().replace(/\s+/g, "") ?? null,
    external_platform: clean(p.external_platform),
    created_at: now,
    updated_at: now,
  }));
}

export async function insertParcels(
  sb: SupabaseClient,
  rows: ReturnType<typeof buildParcelRows>,
) {
  if (!rows.length) return;
  const { data, error } = await sb.from("parcels").insert(rows).select("id");
  if (error) throw new Error(error.message);
  await sb.from("parcel_events").insert(
    (data ?? []).map((p) => ({
      parcel_id: p.id,
      status: "en_agence",
      note: "Colis enregistré",
    })),
  );
}

/** Crée un client (code unique garanti) + ses colis (matricules -01, -02…). */
export async function createClientWithParcels(
  sb: SupabaseClient,
  input: NewClientInput,
) {
  const now = new Date().toISOString();
  let client: { id: string; code: string } | null = null;

  for (let attempt = 0; attempt < 8 && !client; attempt++) {
    const { data, error } = await sb
      .from("clients")
      .insert({
        code: randomCode(),
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
      .select("id, code")
      .single();
    if (data) client = data;
    else if (error?.code !== "23505") throw new Error(error?.message ?? "Erreur");
  }
  if (!client) throw new Error("Impossible de générer un code unique.");

  const rows = buildParcelRows(client.id, client.code, input.parcels ?? []);
  await insertParcels(sb, rows);

  return { id: client.id, code: client.code, parcels: rows.map((p) => p.matricule) };
}
