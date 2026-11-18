import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { normalizeCode } from "@/lib/parcels";

/** Masque le nom : le code de suivi seul ne doit pas révéler l'identité complète. */
const mask = (name: string) =>
  name.length <= 3 ? name : `${name.slice(0, 3)}${"•".repeat(Math.min(name.length - 3, 6))}`;

/**
 * Suivi public. Accepte : code client TRC-…, matricule de colis, code externe (Alibaba…),
 * ou référence d'une demande (leads). Ne renvoie que des champs publics.
 */
export async function GET(req: NextRequest) {
  const code = normalizeCode(req.nextUrl.searchParams.get("code") ?? "");
  if (code.length < 4 || code.length > 60) {
    return NextResponse.json({ error: "Code invalide." }, { status: 400 });
  }

  const sb = createServerClient();
  let clientId: string | null = null;
  let highlight: string | null = null;

  // 1. Code client
  const byClient = await sb.from("clients").select("id").eq("code", code).maybeSingle();
  clientId = byClient.data?.id ?? null;

  // 2. Matricule d'un colis
  if (!clientId) {
    const { data } = await sb
      .from("parcels")
      .select("client_id, matricule")
      .eq("matricule", code)
      .maybeSingle();
    if (data) {
      clientId = data.client_id;
      highlight = data.matricule;
    }
  }

  // 3. Code externe (Alibaba, etc.)
  if (!clientId) {
    const { data } = await sb
      .from("parcels")
      .select("client_id, matricule")
      .eq("external_code", code);
    const clients = new Set((data ?? []).map((p) => p.client_id));
    if (clients.size > 1) {
      return NextResponse.json({ type: "ambiguous" });
    }
    if (data?.length) {
      clientId = data[0].client_id;
      highlight = data.length === 1 ? data[0].matricule : null;
    }
  }

  if (clientId) {
    const { data: client } = await sb
      .from("clients")
      .select("code, name, city, country, parcels(id, matricule, mode, status, description, external_code, external_platform, expected_ship_date, updated_at)")
      .eq("id", clientId)
      .single();
    if (!client) return NextResponse.json({ type: "not_found" });

    const parcels = [...client.parcels].sort((a, b) =>
      a.matricule.localeCompare(b.matricule),
    );
    const { data: events } = await sb
      .from("parcel_events")
      .select("parcel_id, status, created_at")
      .in("parcel_id", parcels.map((p) => p.id))
      .order("created_at", { ascending: true });

    return NextResponse.json({
      type: "client",
      highlight,
      client: {
        code: client.code,
        name: mask(client.name),
        city: client.city,
        country: client.country,
      },
      parcels: parcels.map(({ id, ...p }) => ({
        ...p,
        history: (events ?? [])
          .filter((e) => e.parcel_id === id)
          .map((e) => ({ status: e.status, at: e.created_at })),
      })),
    });
  }

  // 4. Demande de sourcing (circuit existant)
  const { data: lead } = await sb
    .from("leads")
    .select("reference, status, name, product_name, destination_city, created_at")
    .eq("reference", code)
    .maybeSingle();
  if (lead) {
    return NextResponse.json({ type: "lead", lead: { ...lead, name: mask(lead.name) } });
  }

  return NextResponse.json({ type: "not_found" });
}
