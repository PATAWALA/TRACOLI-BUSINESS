import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ products: data ?? [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createServerClient();

    const payload = {
      name: body.name,
      description: body.description || null,
      category: body.category,
      price_min: body.price_min ?? null,
      price_max: body.price_max ?? null,
      currency: body.currency || "USD",
      moq: body.moq || null,
      origin: body.origin || "Chine",
      image_url: body.image_url || null,
      updated_at: new Date().toISOString(),
    };

    if (body.id) {
      const { data, error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", body.id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data);
    }

    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = (await request.json()) as { id: string };
    const supabase = createServerClient();

    const { error } = await supabase
      .from("products")
      .update({ active: false })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
