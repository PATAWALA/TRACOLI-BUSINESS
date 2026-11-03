import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { resend } from "@/lib/email/resend";
import { paymentConfirmedHtml, statusChangeHtml } from "@/lib/email/templates";
import type { LeadStatus } from "@/types/database.types";

const VALID_STATUSES: LeadStatus[] = [
  "en_attente_paiement",
  "paiement_soumis",
  "confirme",
  "recherche",
  "devis",
  "achat",
  "expedition",
  "en_transit",
  "douane",
  "livre",
  "cloture",
];

function generateReference(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `TRC-${year}-${rand}`;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { status } = (await request.json()) as { status: string };

    if (!VALID_STATUSES.includes(status as LeadStatus)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }

    const supabase = createServerClient();
    const now = new Date().toISOString();

    const updateData: Record<string, unknown> = {
      status,
      updated_at: now,
    };

    if (status === "confirme") {
      const { data: existing } = await supabase
        .from("leads")
        .select("reference")
        .eq("id", id)
        .single();

      if (!existing?.reference) {
        updateData.reference = generateReference();
      }
    }

    const { data: lead, error } = await supabase
      .from("leads")
      .update(updateData)
      .eq("id", id)
      .select("reference, name, email, whatsapp")
      .single();

    if (error || !lead) {
      return NextResponse.json(
        { error: "Demande introuvable." },
        { status: 404 },
      );
    }

    if (lead.email && lead.reference) {
      const trackingUrl = `https://tracolibusiness.com/suivre?ref=${lead.reference}`;

      if (status === "confirme") {
        await resend.emails
          .send({
            from: "TRACOLI Business <noreply@tracoli-business.com>",
            to: lead.email,
            subject: `Paiement confirmé — ${lead.reference}`,
            html: paymentConfirmedHtml(
              lead.name,
              lead.reference,
              trackingUrl,
            ),
          })
          .catch(() => {});
      } else {
        await resend.emails
          .send({
            from: "TRACOLI Business <noreply@tracoli-business.com>",
            to: lead.email,
            subject: `Mise à jour — ${lead.reference}`,
            html: statusChangeHtml(lead.name, lead.reference, status),
          })
          .catch(() => {});
      }
    }

    return NextResponse.json({
      ok: true,
      status,
      reference: lead.reference,
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 },
    );
  }
}
