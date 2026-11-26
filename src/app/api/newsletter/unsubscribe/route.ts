import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { verifyUnsubscribe } from "@/lib/email/campaigns";

const page = (msg: string, status = 200) =>
  new Response(
    `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Newsletter TRACOLI</title></head>
<body style="font-family:system-ui,sans-serif;background:#f9fafb;display:grid;place-items:center;min-height:100vh;margin:0"><div style="background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;max-width:420px;text-align:center"><h1 style="font-size:18px;color:#E60000;margin:0 0 12px">TRACOLI BUSINESS</h1><p style="color:#374151;margin:0 0 16px">${msg}</p><a href="/" style="color:#E60000;font-weight:600">Retour au site</a></div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );

async function unsubscribe(req: NextRequest) {
  const email = (req.nextUrl.searchParams.get("e") ?? "").trim().toLowerCase();
  const token = req.nextUrl.searchParams.get("t") ?? "";
  if (!email || !verifyUnsubscribe(email, token)) return page("Lien invalide.", 400);
  await createServerClient()
    .from("email_captures")
    .delete()
    .ilike("email", email.replace(/[\\%_]/g, "\\$&"));
  return page("Vous êtes désinscrit(e). Vous ne recevrez plus nos emails.");
}

export const GET = unsubscribe;
export const POST = unsubscribe;
