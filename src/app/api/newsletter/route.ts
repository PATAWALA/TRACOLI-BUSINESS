import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { email, source } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email requis." }, { status: 400 });
  }

  const sb = createServerClient();

  const { error } = await sb
    .from("email_captures")
    .insert({ email: email.trim().toLowerCase(), source: source ?? "site" });

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

  return NextResponse.json({ ok: true });
}

export async function GET() {
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
