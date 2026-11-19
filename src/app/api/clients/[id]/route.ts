import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";

type Ctx = { params: Promise<{ id: string }> };

const EDITABLE = ["name", "city", "country", "whatsapp", "email", "notes"] as const;

export async function GET(req: NextRequest, { params }: Ctx) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { id } = await params;
  const sb = createServerClient();

  const { data, error } = await sb
    .from("clients")
    .select("*, parcels(*)")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Client introuvable." }, { status: 404 });
  }
  data.parcels.sort(
    (a: { matricule: string | null; created_at: string }, b: { matricule: string | null; created_at: string }) =>
      (a.matricule ?? "").localeCompare(b.matricule ?? "") || a.created_at.localeCompare(b.created_at),
  );
  return NextResponse.json({ client: data });
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { id } = await params;
  const body = (await req.json()) as Record<string, string | null>;

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const f of EDITABLE) {
    if (f in body) {
      const v = typeof body[f] === "string" ? body[f]!.trim() : null;
      if (f === "name" && !v) {
        return NextResponse.json({ error: "Le nom est requis." }, { status: 400 });
      }
      patch[f] = v || null;
    }
  }

  const { error } = await createServerClient().from("clients").update(patch).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { id } = await params;
  const { error } = await createServerClient().from("clients").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
