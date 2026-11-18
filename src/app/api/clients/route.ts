import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import {
  createClientWithParcels,
  type NewClientInput,
} from "@/lib/clients-service";

const MAX_BATCH = 200;
const MAX_PARCELS = 300;

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorized();
  const sb = createServerClient();

  const { data, error } = await sb
    .from("clients")
    .select("*, parcels(*)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ clients: data ?? [] });
}

/** Crée un client, ou une liste de clients (import). Les doublons nom+ville sont ignorés. */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorized();

  const body = (await req.json()) as
    | { clients: NewClientInput[] }
    | NewClientInput;
  const list = "clients" in body ? body.clients : [body];

  if (!Array.isArray(list) || list.length === 0 || list.length > MAX_BATCH) {
    return NextResponse.json({ error: "Liste invalide." }, { status: 400 });
  }
  for (const c of list) {
    if (!c.name?.trim()) {
      return NextResponse.json({ error: "Le nom du client est requis." }, { status: 400 });
    }
    if ((c.parcels?.length ?? 0) > MAX_PARCELS) {
      return NextResponse.json({ error: "Trop de colis pour un client." }, { status: 400 });
    }
  }

  const sb = createServerClient();
  const { data: existing } = await sb.from("clients").select("name, city");
  const key = (n: string, c?: string | null) =>
    `${n.trim().toLowerCase()}|${(c ?? "").trim().toLowerCase()}`;
  const known = new Set((existing ?? []).map((e) => key(e.name, e.city)));

  const created: Awaited<ReturnType<typeof createClientWithParcels>>[] = [];
  const skipped: string[] = [];
  const failed: { name: string; error: string }[] = [];

  for (const c of list) {
    const k = key(c.name, c.city);
    if (known.has(k)) {
      skipped.push(c.name);
      continue;
    }
    try {
      const r = await createClientWithParcels(sb, {
        ...c,
        source: list.length > 1 ? "import" : "manual",
      });
      known.add(k);
      created.push({ ...r });
    } catch (e) {
      failed.push({ name: c.name, error: e instanceof Error ? e.message : "Erreur" });
    }
  }

  return NextResponse.json({ created, skipped, failed }, { status: 201 });
}
