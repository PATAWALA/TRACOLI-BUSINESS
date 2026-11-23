import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

const refresh = () => revalidatePath("/");

/** Toutes les photos (visibles et masquées), pour le tableau de bord. */
export async function GET(req: Request) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { data, error } = await createServerClient()
    .from("gallery_photos")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ photos: data ?? [] });
}

/** Ajoute une photo : fichier + légende. La photo apparaît en premier. */
export async function POST(req: Request) {
  if (!(await requireAdmin(req))) return unauthorized();
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const caption = String(form?.get("caption") ?? "").trim();
  const width = Math.round(Number(form?.get("width"))) || 1200;
  const height = Math.round(Number(form?.get("height"))) || 900;

  if (!(file instanceof File)) return NextResponse.json({ error: "Choisissez une photo." }, { status: 400 });
  if (!caption) return NextResponse.json({ error: "Écrivez une légende (ex : Chargement d'un conteneur)." }, { status: 400 });
  const ext = TYPES[file.type];
  if (!ext) return NextResponse.json({ error: "Format non accepté : utilisez JPG, PNG ou WebP." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Photo trop lourde (4 Mo maximum)." }, { status: 400 });

  const sb = createServerClient();
  const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error: upErr } = await sb.storage.from("files").upload(path, file, { contentType: file.type });
  if (upErr) return NextResponse.json({ error: `Envoi impossible : ${upErr.message}` }, { status: 500 });
  const { data: pub } = sb.storage.from("files").getPublicUrl(path);

  const { data: first } = await sb.from("gallery_photos").select("position").order("position", { ascending: true }).limit(1);
  const position = (first?.[0]?.position ?? 1) - 1;
  const { data, error } = await sb
    .from("gallery_photos")
    .insert({ caption: caption.slice(0, 120), image_url: pub.publicUrl, width, height, position })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  refresh();
  return NextResponse.json({ photo: data }, { status: 201 });
}

/** Légende, visible/masquée, ou nouvel ordre : { order: [ids] }. */
export async function PATCH(req: Request) {
  if (!(await requireAdmin(req))) return unauthorized();
  const body = (await req.json().catch(() => ({}))) as {
    id?: string;
    caption?: string;
    published?: boolean;
    order?: string[];
  };
  const sb = createServerClient();

  if (body.order?.length) {
    for (const [i, id] of body.order.entries()) {
      const { error } = await sb.from("gallery_photos").update({ position: i + 1 }).eq("id", id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
    refresh();
    return NextResponse.json({ ok: true });
  }

  if (!body.id) return NextResponse.json({ error: "Photo introuvable." }, { status: 400 });
  const update: Record<string, unknown> = {};
  if (typeof body.caption === "string") {
    const c = body.caption.trim();
    if (!c) return NextResponse.json({ error: "La légende ne peut pas être vide." }, { status: 400 });
    update.caption = c.slice(0, 120);
  }
  if (typeof body.published === "boolean") update.published = body.published;
  const { error } = await sb.from("gallery_photos").update(update).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  refresh();
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  if (!id) return NextResponse.json({ error: "Photo introuvable." }, { status: 400 });
  const { error } = await createServerClient().from("gallery_photos").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  refresh();
  return NextResponse.json({ ok: true });
}
