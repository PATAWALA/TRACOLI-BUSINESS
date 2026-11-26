import { NextResponse } from "next/server";
import { notifyVisitorAction } from "@/lib/email/notify";

const cut = (v: unknown, max: number) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : "";

const TYPES = new Set(["whatsapp_click", "resource_open"]);

/** Action d'un visiteur (clic WhatsApp, ressource ouverte…) → alerte email à l'admin. Publique, limitée. */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const type = cut(body.type, 30);
    if (!TYPES.has(type)) return NextResponse.json({ ok: false }, { status: 400 });

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "?";
    await notifyVisitorAction({
      type,
      page: cut(body.page, 200),
      label: cut(body.label, 300),
      detail: cut(body.detail, 600),
      ip,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
