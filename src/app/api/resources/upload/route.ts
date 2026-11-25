import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";

const KINDS: Record<string, string[]> = {
  cover: ["jpg", "png", "webp"],
  pdf: ["pdf"],
};

/**
 * Prépare un envoi direct navigateur → stockage (les PDF dépassent la limite de taille des routes serveur).
 * Renvoie une adresse d'envoi à usage unique + l'adresse publique finale du fichier.
 */
export async function POST(req: Request) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { kind, ext } = (await req.json().catch(() => ({}))) as { kind?: string; ext?: string };
  const e = (ext ?? "").toLowerCase();
  if (!kind || !KINDS[kind]?.includes(e)) {
    return NextResponse.json({ error: "Format non accepté (image JPG/PNG/WebP ou PDF)." }, { status: 400 });
  }
  const sb = createServerClient();
  const path = `resources/${kind}-${Date.now()}-${Math.random().toString(36).slice(2)}.${e}`;
  const { data, error } = await sb.storage.from("files").createSignedUploadUrl(path);
  if (error || !data) return NextResponse.json({ error: `Envoi impossible : ${error?.message}` }, { status: 500 });
  const { data: pub } = sb.storage.from("files").getPublicUrl(path);
  return NextResponse.json({ path, token: data.token, publicUrl: pub.publicUrl });
}
