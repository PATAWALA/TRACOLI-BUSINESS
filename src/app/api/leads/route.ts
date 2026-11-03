import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      whatsapp,
      email,
      productName,
      productUrl,
      imageUrls,
      destinationCity,
      destinationCountry,
      message,
      type,
      source,
      paymentProofUrl,
    } = body as {
      name: string;
      whatsapp: string;
      email?: string;
      productName?: string;
      productUrl?: string;
      imageUrls?: string[];
      destinationCity?: string;
      destinationCountry?: string;
      message?: string;
      type?: string;
      source?: string;
      paymentProofUrl?: string;
    };

    if (!name || !whatsapp) {
      return NextResponse.json(
        { error: "Nom et numéro WhatsApp sont requis." },
        { status: 400 },
      );
    }

    const supabase = createServerClient();

    const mainImage = imageUrls?.[0] ?? null;
    const extraImages =
      imageUrls && imageUrls.length > 1 ? imageUrls.slice(1) : null;

    const now = new Date().toISOString();
    const initialStatus = paymentProofUrl
      ? "paiement_soumis"
      : "en_attente_paiement";

    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        reference: null,
        name,
        whatsapp,
        email: email || null,
        product_name: productName || null,
        product_url: productUrl || null,
        product_image_url: mainImage,
        payment_proof_url: paymentProofUrl || null,
        destination_city: destinationCity || null,
        destination_country: destinationCountry || null,
        type: type || "sourcing",
        source: source || "site",
        status: initialStatus,
        notes: message || null,
        metadata: extraImages ? { images: extraImages } : null,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: dbError.message || "Erreur lors de l'enregistrement." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { id: lead.id, status: initialStatus },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur inattendue." },
      { status: 500 },
    );
  }
}
