import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { isParcelMode, isParcelStatus } from "@/lib/parcels";
import {
  DuplicateCodeError,
  buildParcelRows,
  cleanCode,
  findDuplicateCode,
  insertParcels,
  type NewParcelInput,
} from "@/lib/clients-service";

/** Ajoute un ou plusieurs colis (avec leur code) à un client existant. */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { client_id, parcels } = (await req.json()) as {
    client_id?: string;
    parcels?: NewParcelInput[];
  };

  if (!client_id || !parcels?.length || parcels.length > 300) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const sb = createServerClient();
  const { data: client } = await sb.from("clients").select("id").eq("id", client_id).single();
  if (!client) return NextResponse.json({ error: "Client introuvable." }, { status: 404 });

  const dup = findDuplicateCode(parcels);
  if (dup) return NextResponse.json({ error: new DuplicateCodeError(dup).message }, { status: 409 });

  try {
    await insertParcels(sb, buildParcelRows(client.id, parcels));
  } catch (e) {
    if (e instanceof DuplicateCodeError) {
      return NextResponse.json({ error: e.message }, { status: 409 });
    }
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur" },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}

/**
 * Modifie un ou plusieurs colis (statut, mode, contenu, date).
 * Pour attribuer des codes : { assign: [{ id, code }] } (un code différent par colis).
 */
export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorized();
  const body = (await req.json()) as {
    ids?: string[];
    patch?: Record<string, string | null>;
    note?: string;
    assign?: { id: string; code: string | null }[];
  };
  const sb = createServerClient();
  const now = new Date().toISOString();

  // Attribution / modification des codes de colis
  if (body.assign) {
    if (!body.assign.length || body.assign.length > 500) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }
    const dup = findDuplicateCode(body.assign);
    if (dup) return NextResponse.json({ error: new DuplicateCodeError(dup).message }, { status: 409 });

    for (const a of body.assign) {
      const { error } = await sb
        .from("parcels")
        .update({ matricule: cleanCode(a.code), updated_at: now })
        .eq("id", a.id);
      if (error) {
        if (error.code === "23505") {
          return NextResponse.json(
            { error: new DuplicateCodeError(cleanCode(a.code) ?? undefined).message },
            { status: 409 },
          );
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ ok: true });
  }

  const { ids, patch, note } = body;
  if (!ids?.length || ids.length > 500 || !patch) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const update: Record<string, unknown> = { updated_at: now };
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
  for (const f of ["description", "expected_ship_date"] as const) {
    if (f in patch) update[f] = patch[f]?.toString().trim() || null;
  }

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
