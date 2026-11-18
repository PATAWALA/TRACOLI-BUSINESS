import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { isParcelMode, isParcelStatus } from "@/lib/parcels";
import {
  buildParcelRows,
  insertParcels,
  type NewParcelInput,
} from "@/lib/clients-service";

/** Ajoute un ou plusieurs colis à un client existant. */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { client_id, parcels } = (await req.json()) as {
    client_id?: string;
    parcels?: NewParcelInput[];
  };

  if (!client_id || !parcels?.length || parcels.length > 100) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const sb = createServerClient();
  const { data: client } = await sb
    .from("clients")
    .select("id, code")
    .eq("id", client_id)
    .single();
  if (!client) return NextResponse.json({ error: "Client introuvable." }, { status: 404 });

  const { data: existing } = await sb
    .from("parcels")
    .select("matricule")
    .eq("client_id", client_id);
  const next =
    Math.max(
      0,
      ...(existing ?? []).map((p) => Number(p.matricule.split("-").pop()) || 0),
    ) + 1;

  try {
    await insertParcels(sb, buildParcelRows(client.id, client.code, parcels, next));
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur" },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}

/** Modifie un ou plusieurs colis (statut, mode, contenu, code externe…). */
export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { ids, patch, note } = (await req.json()) as {
    ids?: string[];
    patch?: Record<string, string | null>;
    note?: string;
  };

  if (!ids?.length || ids.length > 500 || !patch) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if ("status" in patch) {
    if (!isParcelStatus(patch.status)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }
    update.status = patch.status;
  }
  if ("mode" in patch) {
    if (!isParcelMode(patch.mode)) {
      return NextResponse.json({ error: "Mode invalide." }, { status: 400 });
    }
    update.mode = patch.mode;
  }
  for (const f of ["description", "external_platform", "expected_ship_date"] as const) {
    if (f in patch) update[f] = patch[f]?.toString().trim() || null;
  }
  if ("external_code" in patch) {
    update.external_code =
      patch.external_code?.toString().trim().toUpperCase().replace(/\s+/g, "") || null;
  }

  const sb = createServerClient();
  const { error } = await sb.from("parcels").update(update).in("id", ids);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (update.status) {
    await sb.from("parcel_events").insert(
      ids.map((parcel_id) => ({
        parcel_id,
        status: update.status as string,
        note: note?.trim() || null,
      })),
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { id } = (await req.json()) as { id?: string };
  if (!id) return NextResponse.json({ error: "Identifiant requis." }, { status: 400 });
  const { error } = await createServerClient().from("parcels").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
