import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { normalizeCode } from "@/lib/parcels";
import { notifyVisitorAction } from "@/lib/email/notify";

/** Masque le nom : le code de suivi seul ne doit pas révéler l'identité complète. */
const mask = (name: string) =>
  name.length <= 3 ? name : `${name.slice(0, 3)}${"•".repeat(Math.min(name.length - 3, 6))}`;

/**
 * Suivi public. Accepte : code du colis (saisi par l'équipe), ancien code externe,
 * ou référence d'une demande (leads). Ne renvoie que des champs publics.
 */
async function lookup(req: NextRequest) {
  const code = normalizeCode(req.nextUrl.searchParams.get("code") ?? "");
  if (code.length < 4 || code.length > 60) {
    return NextResponse.json({ error: "Code invalide." }, { status: 400 });
  }

  const sb = createServerClient();
  let clientId: string | null = null;
  let highlight: string | null = null;
  let group: string | null = null;

  // 1. Code du colis (saisi par l'équipe)
  {
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

  // 1bis. Code groupé : un seul code pour tout un lot de colis
  if (!clientId) {
    const { data } = await sb.from("parcels").select("client_id").eq("group_code", code);
    const clients = new Set((data ?? []).map((p) => p.client_id));
    if (clients.size === 1) {
      clientId = data![0].client_id;
      group = code;
    }
  }

  // 2. Ancien code externe (anciens colis) (Alibaba, etc.)
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
      .select("name, city, country, parcels(*)")
      .eq("id", clientId)
      .single();
    if (!client) return NextResponse.json({ type: "not_found" });

    const parcels = [...client.parcels].sort((a, b) =>
      (a.matricule ?? "").localeCompare(b.matricule ?? ""),
    );
    const { data: events } = await sb
      .from("parcel_events")
      .select("parcel_id, status, created_at")
      .in("parcel_id", parcels.map((p) => p.id))
      .order("created_at", { ascending: true });

    return NextResponse.json({
      type: "client",
      highlight,
      group,
      client: {
        name: mask(client.name),
        city: client.city,
        country: client.country,
      },
      parcels: parcels.map((p) => ({
        matricule: p.matricule,
        group_code: p.group_code ?? null,
        mode: p.mode,
        status: p.status,
        description: p.description,
        external_code: p.external_code,
        external_platform: p.external_platform,
        expected_ship_date: p.expected_ship_date,
        history: (events ?? [])
          .filter((e) => e.parcel_id === p.id)
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

/** Recherche de suivi + alerte admin (code cherché et résultat). */
export async function GET(req: NextRequest) {
  const res = await lookup(req);
  try {
    const type = res.status === 200 ? ((await res.clone().json()) as { type?: string }).type : "invalide";
    await notifyVisitorAction({
      type: "tracking_search",
      page: "/suivre",
      label: normalizeCode(req.nextUrl.searchParams.get("code") ?? ""),
      detail: type === "not_found" ? "Code introuvable" : type === "invalide" ? "Code invalide" : "Trouvé (" + type + ")",
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    });
  } catch {
    /* l'alerte ne doit jamais casser le suivi */
  }
  return res;
}
