import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

function generateOrderRef(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CMD-${year}-${rand}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { lead_id, description, quantity, unit_price, total_price, currency } =
    body as {
      lead_id?: string;
      description?: string;
      quantity?: number;
      unit_price?: number;
      total_price?: number;
      currency?: string;
    };

  const sb = createServerClient();
  const reference = generateOrderRef();
  const now = new Date().toISOString();

  const { data, error } = await sb
    .from("orders")
    .insert({
      reference,
      lead_id: lead_id || null,
      description: description || "",
      quantity: quantity ?? null,
      unit_price: unit_price ?? null,
      total_price: total_price ?? null,
      currency: currency || "USD",
      status: "en_attente",
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function GET() {
  const sb = createServerClient();

  const { data, error } = await sb
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data ?? [] });
}
