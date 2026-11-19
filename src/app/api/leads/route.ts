import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { notifyNewLead } from "@/lib/email/notify";

const cut = (v: unknown, max: number) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

/** Création d'une demande — publique (formulaires du site), enregistrée AVANT toute redirection WhatsApp. */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // Anti-spam : champ piège que seuls les robots remplissent.
    if (body.website) return NextResponse.json({ ok: true }, { status: 201 });

    const name = cut(body.name, 120);
    const whatsapp = cut(body.whatsapp, 40);
    if (!name || !whatsapp) {
      return NextResponse.json(
        { error: "Nom et numéro WhatsApp sont requis." },
        { status: 400 },
      );
    }

    const email = cut(body.email, 160)?.toLowerCase() ?? null;
    const imageUrls = Array.isArray(body.imageUrls)
      ? (body.imageUrls as unknown[]).filter((u): u is string => typeof u === "string").slice(0, 8)
      : [];
    const paymentProofUrl = cut(body.paymentProofUrl, 600);
    const source = cut(body.source, 30) ?? "site";
    const productName = cut(body.productName, 200);
    const destination = [cut(body.destinationCity, 80), cut(body.destinationCountry, 80)]
      .filter(Boolean)
      .join(", ") || null;

    const metadata: Record<string, unknown> = {};
    if (imageUrls.length > 1) metadata.images = imageUrls.slice(1);
    if (cut(body.productId, 80)) metadata.product_id = cut(body.productId, 80);

    const initialStatus = paymentProofUrl ? "paiement_soumis" : "en_attente_paiement";
    const now = new Date().toISOString();

    const supabase = createServerClient();
    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        reference: null,
        name,
        whatsapp,
        email,
        product_name: productName,
        product_url: cut(body.productUrl, 600),
        product_image_url: imageUrls[0] ?? null,
        payment_proof_url: paymentProofUrl,
        destination_city: cut(body.destinationCity, 80),
        destination_country: cut(body.destinationCountry, 80),
        type: cut(body.type, 30) ?? "sourcing",
        source,
        status: initialStatus,
        notes: cut(body.message, 2000),
        metadata: Object.keys(metadata).length ? metadata : null,
        created_at: now,
        updated_at: now,
      })
      .select("id")
      .single();

    if (dbError || !lead) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Impossible d'enregistrer la demande. Réessayez." },
        { status: 500 },
      );
    }

    // Les demandes créées depuis l'admin ne déclenchent pas d'alerte.
    if (source !== "admin") {
      await notifyNewLead({
        id: lead.id,
        name,
        whatsapp,
        email,
        productName,
        message: cut(body.message, 2000),
        destination,
        hasPaid: !!paymentProofUrl,
        sourcing: source === "sourcer",
      });
    }

    return NextResponse.json(
      { id: lead.id, code: `DEM-${lead.id.slice(0, 6).toUpperCase()}`, status: initialStatus },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Erreur serveur inattendue." }, { status: 500 });
  }
}

/** Liste des demandes — admin uniquement. ?status=… &limit=… &count=1 (compteurs du tableau de bord). */
export async function GET(request: Request) {
  if (!(await requireAdmin(request))) return unauthorized();

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const limit = Math.min(Number(url.searchParams.get("limit")) || 500, 1000);
  const sb = createServerClient();

  if (url.searchParams.get("stats")) {
    const [all, fresh, active, recent] = await Promise.all([
      sb.from("leads").select("id", { count: "exact", head: true }),
      sb.from("leads").select("id", { count: "exact", head: true }).eq("status", "en_attente_paiement"),
      sb
        .from("leads")
        .select("id", { count: "exact", head: true })
        .not("status", "in", '("en_attente_paiement","livre","cloture")'),
      sb.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
    ]);
    return NextResponse.json({
      total: all.count ?? 0,
      nouvelles: fresh.count ?? 0,
      enCours: active.count ?? 0,
      recent: recent.data ?? [],
    });
  }

  let q = sb.from("leads").select("*").order("created_at", { ascending: false }).limit(limit);
  if (status && status !== "all") q = q.eq("status", status);
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: data ?? [] });
}
