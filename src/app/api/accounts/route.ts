import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ members: data ?? [] });
}

export async function POST(request: Request) {
  try {
    const { email, password, role } = (await request.json()) as {
      email: string;
      password: string;
      role?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères." },
        { status: 400 },
      );
    }

    const supabase = createServerClient();

    const { data: authUser, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      const msg = authError.message.includes("already been registered")
        ? "Cet email est déjà utilisé."
        : authError.message;
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const finalRole = role === "admin" ? "admin" : "agent";

    const { error: dbError } = await supabase.from("users").insert({
      id: authUser.user.id,
      email,
      role: finalRole,
    });

    if (dbError) {
      await supabase.auth.admin.deleteUser(authUser.user.id);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json(
      { id: authUser.user.id, email, role: finalRole },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur inattendue." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = (await request.json()) as { id: string };

    if (!id) {
      return NextResponse.json({ error: "ID requis." }, { status: 400 });
    }

    const supabase = createServerClient();

    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    await supabase.from("users").delete().eq("id", id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur inattendue." },
      { status: 500 },
    );
  }
}
