import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { digitsOnly } from "@/lib/resources";

const TYPES = ["guide", "ebook", "formation", "template"];
const ACCESS = ["free", "premium"];

const refresh = (slug?: string) => {
  revalidatePath("/ressources");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/ressources/${slug}`);
};

const lines = (v: unknown): string[] =>
  Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean).slice(0, 12) : [];

const clean = (v: unknown, max: number) => {
  const s = typeof v === "string" ? v.trim().slice(0, max) : "";
  return s || null;
};

const isHttps = (v: string) => {
  try {
    return new URL(v).protocol === "https:";
  } catch {
    return false;
  }
};

const slugify = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "livre";

/** Valide le formulaire de l'admin. Renvoie les champs prêts à enregistrer, ou un message d'erreur clair. */
function parse(b: Record<string, unknown>): { fields: Record<string, unknown> } | { error: string } {
  const title = clean(b.title, 140);
  const description = clean(b.description, 300);
  if (!title) return { error: "Écrivez le titre du livre." };
  if (!description) return { error: "Écrivez une courte description (2 phrases) : elle s'affiche sur la carte." };
  const type = String(b.type ?? "ebook");
  const access = String(b.access ?? "free");
  if (!TYPES.includes(type)) return { error: "Type invalide." };
  if (!ACCESS.includes(access)) return { error: "Choisissez Gratuit ou Payant." };
  const price = clean(b.price, 40);
  if (access === "premium" && !price) return { error: "Indiquez le prix (ex : 15 USD) pour un livre payant." };

  const wa = typeof b.seller_whatsapp === "string" ? digitsOnly(b.seller_whatsapp) : "";
  if (wa && (wa.length < 8 || wa.length > 15)) {
    return { error: "Numéro WhatsApp invalide : écrivez-le avec l'indicatif du pays (ex : 257 69 03 27 65)." };
  }
  const link = clean(b.link_url, 500);
  if (link && !isHttps(link)) return { error: "Le lien doit commencer par https://" };

  return {
    fields: {
      title,
      description,
      long_description: clean(b.long_description, 4000) ?? "",
      type,
      access,
      price: access === "premium" ? price : null,
      level: clean(b.level, 40) ?? "Tous niveaux",
      meta: clean(b.meta, 80),
      cover_url: clean(b.cover_url, 600),
      // Un livre payant n'a jamais de fichier ni de lien public : le vendeur l'envoie après paiement.
      file_url: access === "free" ? clean(b.file_url, 600) : null,
      link_url: access === "free" ? link : null,
      outcomes: lines(b.outcomes),
      audience: lines(b.audience),
      seller_name: clean(b.seller_name, 80),
      seller_whatsapp: wa || null,
    },
  };
}

/** Tous les livres (visibles et masqués), pour le tableau de bord. */
export async function GET(req: Request) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { data, error } = await createServerClient()
    .from("resources")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ resources: data ?? [] });
}

/** Publie un livre. Il apparaît en premier dans la boutique. */
export async function POST(req: Request) {
  if (!(await requireAdmin(req))) return unauthorized();
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const parsed = parse(body);
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const sb = createServerClient();
  const base = slugify(String(parsed.fields.title));
  const { data: taken } = await sb.from("resources").select("slug").like("slug", `${base}%`);
  const used = new Set((taken ?? []).map((r) => r.slug as string));
  let slug = base;
  for (let i = 2; used.has(slug); i++) slug = `${base}-${i}`;

  const { data: first } = await sb.from("resources").select("position").order("position", { ascending: true }).limit(1);
  const position = (first?.[0]?.position ?? 1) - 1;
  const { data, error } = await sb
    .from("resources")
    .insert({ ...parsed.fields, slug, position })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  refresh(slug);
  return NextResponse.json({ resource: data }, { status: 201 });
}

/** Modifie un livre : { id, ...champs } — ou masque/affiche : { id, published } — ou ordre : { order: [ids] }. */
export async function PATCH(req: Request) {
  if (!(await requireAdmin(req))) return unauthorized();
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown> & { order?: string[] };
  const sb = createServerClient();

  if (body.order?.length) {
    for (const [i, id] of body.order.entries()) {
      const { error } = await sb.from("resources").update({ position: i + 1 }).eq("id", id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
    refresh();
    return NextResponse.json({ ok: true });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "Livre introuvable." }, { status: 400 });

  let update: Record<string, unknown>;
  if (typeof body.published === "boolean" && !("title" in body)) {
    update = { published: body.published };
  } else {
    const parsed = parse(body);
    if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    update = parsed.fields;
  }
  const { data, error } = await sb.from("resources").update(update).eq("id", id).select("slug").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  refresh(data?.slug as string | undefined);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  if (!id) return NextResponse.json({ error: "Livre introuvable." }, { status: 400 });
  const { error } = await createServerClient().from("resources").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  refresh();
  return NextResponse.json({ ok: true });
}
