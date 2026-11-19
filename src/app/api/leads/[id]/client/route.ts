import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { createClientWithParcels } from "@/lib/clients-service";
import type { ParcelMode } from "@/types/database.types";

/**
 * Transforme une demande en client + colis (les codes de colis sont saisis ensuite dans fiche client).
 * Idempotent : si la demande a déjà un client, on le renvoie.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin(request))) return unauthorized();
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    parcels?: number;
    mode?: ParcelMode;
  };

  const sb = createServerClient();
  const { data: lead } = await sb.from("leads").select("*").eq("id", id).single();
  if (!lead) return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });

  const meta = (lead.metadata ?? {}) as Record<string, unknown>;
  if (typeof meta.client_id === "string") {
    return NextResponse.json({ clientId: meta.client_id, existing: true });
  }

  const count = Math.min(Math.max(Number(body.parcels) || 1, 1), 100);
  try {
    const created = await createClientWithParcels(sb, {
      name: lead.name,
      city: lead.destination_city,
      country: lead.destination_country,
      whatsapp: lead.whatsapp,
      email: lead.email,
      notes: lead.product_name ? `Demande : ${lead.product_name}` : null,
      source: "lead",
      parcels: Array.from({ length: count }, () => ({
        mode: body.mode ?? "a_preciser",
        description: lead.product_name,
      })),
    });
    await sb
      .from("leads")
      .update({
        metadata: { ...meta, client_id: created.id },
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    return NextResponse.json({ clientId: created.id, parcels: created.parcels });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur lors de la création." },
      { status: 500 },
    );
  }
}
