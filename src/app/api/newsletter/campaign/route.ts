import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { CAMPAIGN_KINDS, sendCampaign, type CampaignKind } from "@/lib/email/campaigns";

/** Admin : { mode: "test" | "all", kind: "reco" | "services" }. "test" envoie à l'adresse de l'admin connecté. */
export async function POST(req: Request) {
  const user = await requireAdmin(req);
  if (!user) return unauthorized();
  const { mode, kind } = (await req.json().catch(() => ({}))) as { mode?: string; kind?: string };
  if (!CAMPAIGN_KINDS.includes(kind as CampaignKind)) {
    return NextResponse.json({ error: "Type d'email invalide." }, { status: 400 });
  }

  if (mode === "test") {
    if (!user.email) return NextResponse.json({ error: "Adresse admin introuvable." }, { status: 400 });
    return NextResponse.json(await sendCampaign(kind as CampaignKind, [user.email]));
  }
  if (mode === "all") return NextResponse.json(await sendCampaign(kind as CampaignKind));
  return NextResponse.json({ error: "Mode invalide." }, { status: 400 });
}
