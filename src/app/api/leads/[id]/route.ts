import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";

type Ctx = { params: Promise<{ id: string }> };

/** Détail d'une demande — admin uniquement. */
export async function GET(request: Request, { params }: Ctx) {
  if (!(await requireAdmin(request))) return unauthorized();
  const { id } = await params;
  const { data, error } = await createServerClient()
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  return NextResponse.json({ lead: data });
}

/** Mise à jour des notes internes — admin uniquement. */
export async function PATCH(request: Request, { params }: Ctx) {
  if (!(await requireAdmin(request))) return unauthorized();
  const { id } = await params;
  const { notes } = (await request.json()) as { notes?: string };
  const { error } = await createServerClient()
    .from("leads")
    .update({ notes: (notes ?? "").slice(0, 4000), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
