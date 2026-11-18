import { supabase } from "@/lib/supabase/client";

/** fetch() vers une route admin, avec le jeton de session. */
export async function adminFetch(url: string, init: RequestInit = {}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
      Authorization: `Bearer ${session?.access_token ?? ""}`,
    },
  });
}
