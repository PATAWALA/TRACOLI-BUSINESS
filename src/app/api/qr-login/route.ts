import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { createServerClient } from "@/lib/supabase/server";

function generateToken(userId: string): string {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const sig = createHmac("sha256", secret).update(userId).digest("hex");
  return `${userId}.${sig}`;
}

function verifyToken(token: string): string | null {
  const dot = token.indexOf(".");
  if (dot < 1) return null;
  const userId = token.slice(0, dot);
  const expected = generateToken(userId);
  if (token !== expected) return null;
  return userId;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId requis." }, { status: 400 });
  }

  const supabase = createServerClient();
  const { data: authData, error: authError } =
    await supabase.auth.admin.getUserById(userId);

  if (authError || !authData?.user) {
    return NextResponse.json(
      { error: "Utilisateur introuvable." },
      { status: 404 },
    );
  }

  const user = { id: authData.user.id, email: authData.user.email! };

  const token = generateToken(userId);
  const loginUrl = `https://www.tracolibusiness.com/admin/auto-login?token=${token}`;

  return NextResponse.json({ url: loginUrl, token });
}

export async function POST(request: Request) {
  try {
    const { token } = (await request.json()) as { token: string };

    if (!token) {
      return NextResponse.json({ error: "Token requis." }, { status: 400 });
    }

    const userId = verifyToken(token);
    if (!userId) {
      return NextResponse.json(
        { error: "Token invalide." },
        { status: 401 },
      );
    }

    const supabase = createServerClient();
    const { data: authData, error: authError } =
      await supabase.auth.admin.getUserById(userId);

    if (authError || !authData?.user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable." },
        { status: 404 },
      );
    }

    const user = { id: authData.user.id, email: authData.user.email! };

    const { data: linkData, error: linkError } =
      await supabase.auth.admin.generateLink({
        type: "magiclink",
        email: user.email,
      });

    if (linkError || !linkData) {
      return NextResponse.json(
        { error: "Impossible de générer le lien de connexion." },
        { status: 500 },
      );
    }

    const actionUrl = new URL(linkData.properties.action_link);
    const otpToken = actionUrl.searchParams.get("token");

    return NextResponse.json({ email: user.email, otp: otpToken });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur inattendue." },
      { status: 500 },
    );
  }
}
