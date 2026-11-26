import { NextResponse } from "next/server";
import { CAMPAIGN_KINDS, sendCampaign, type CampaignKind } from "@/lib/email/campaigns";

/**
 * Tâche planifiée (Vercel Cron, voir vercel.json) : ?kind=reco le 1er du mois, ?kind=services le 15.
 * Protégée par CRON_SECRET. Désactivée tant que NEWSLETTER_AUTO n'est pas "1" :
 * l'envoi automatique à de vrais inscrits est un choix explicite.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const kind = new URL(req.url).searchParams.get("kind");
  if (!CAMPAIGN_KINDS.includes(kind as CampaignKind)) {
    return NextResponse.json({ error: "kind invalide." }, { status: 400 });
  }
  if (process.env.NEWSLETTER_AUTO !== "1") {
    return NextResponse.json({ skipped: "NEWSLETTER_AUTO n'est pas activé." });
  }
  return NextResponse.json(await sendCampaign(kind as CampaignKind));
}
