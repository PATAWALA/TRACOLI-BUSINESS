import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { notifyNewSubscriber } from "@/lib/email/notify";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { email: rawEmail, source } = await req.json();

  if (!rawEmail || typeof rawEmail !== "string") {
    return NextResponse.json({ error: "Email requis." }, { status: 400 });
  }

  const email = rawEmail.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  const sb = createServerClient();

  // Pas de doublon : si l'adresse existe déjà (quelle que soit la casse), on ne réinsère rien.
  const { data: existing } = await sb
    .from("email_captures")
    .select("id")
    .ilike("email", email.replace(/[\\%_]/g, "\\$&"))
    .limit(1);
  if (existing && existing.length > 0) {
    return NextResponse.json({ error: "Cet email est déjà inscrit." }, { status: 409 });
  }

  const { error } = await sb
    .from("email_captures")
    .insert({ email, source: typeof source === "string" ? source.slice(0, 100) : "site" });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Cet email est déjà inscrit." },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }

  await notifyNewSubscriber(email, typeof source === "string" ? source.slice(0, 100) : "site");
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  if (!(await requireAdmin(req))) return unauthorized();
  const sb = createServerClient();

  const { count, error } = await sb
    .from("email_captures")
    .select("id", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = await sb
    .from("email_captures")
    .select("*")
    .order("created_at", { ascending: false });

  return NextResponse.json({ count: count ?? 0, emails: data ?? [] });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorized();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID requis." }, { status: 400 });
  }

  const sb = createServerClient();
  const { error } = await sb.from("email_captures").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
