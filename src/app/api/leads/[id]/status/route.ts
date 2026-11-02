import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { resend } from "@/lib/email/resend";
import { statusChangeHtml } from "@/lib/email/templates";
import type { LeadStatus } from "@/types/database.types";

const VALID_STATUSES: LeadStatus[] = [
  "received",
  "researching",
  "quoted",
  "validating",
  "payment_confirmed",
  "purchased",
  "shipping",
  "arrived",
  "delivered",
  "closed",
];

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

    const { data: lead, error } = await supabase
      .from("leads")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("reference, name, email")
      .single();

    if (error || !lead) {
      return NextResponse.json(
        { error: "Lead introuvable." },
        { status: 404 },
      );
    }

    if (lead.email) {
      await resend.emails
        .send({
          from: "TRACOLI Business <noreply@tracoli-business.com>",
          to: lead.email,
          subject: `Mise à jour — ${lead.reference}`,
          html: statusChangeHtml(lead.name, lead.reference, status),
        })
        .catch(() => {});
    }

    return NextResponse.json({ ok: true, status });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 },
    );
  }
}
