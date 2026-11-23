import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** Envoie la photo d'un produit dans le stockage (côté serveur : pas de blocage par les règles du navigateur). */
export async function POST(request: Request) {
  if (!(await requireAdmin(request))) return unauthorized();

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucune image reçue." }, { status: 400 });
  }
  const ext = TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Format non accepté : utilisez JPG, PNG ou WebP." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image trop lourde (5 Mo maximum)." }, { status: 400 });
  }

  const sb = createServerClient();
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await sb.storage
    .from("files")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) {
    return NextResponse.json({ error: `Envoi impossible : ${error.message}` }, { status: 500 });
  }

  const { data } = sb.storage.from("files").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
