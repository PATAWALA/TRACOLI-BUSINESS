import { createServerClient } from "@/lib/supabase/server";

/** Vérifie le jeton de session Supabase envoyé par l'admin. Renvoie l'utilisateur ou null. */
export async function requireAdmin(req: Request) {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const { data, error } = await createServerClient().auth.getUser(token);
  return error || !data.user ? null : data.user;
}

export const unauthorized = () =>
  Response.json({ error: "Session expirée. Reconnectez-vous." }, { status: 401 });
