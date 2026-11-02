import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { resend } from "@/lib/email/resend";
import {
  clientConfirmationHtml,
  adminAlertHtml,
} from "@/lib/email/templates";

function generateReference(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `TRC-${year}-${rand}`;
}

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
    };

    if (!name || !whatsapp) {
      return NextResponse.json(
        { error: "Nom et numéro WhatsApp sont requis." },
        { status: 400 },
      );
    }

    const reference = generateReference();
    const supabase = createServerClient();

    const mainImage = imageUrls?.[0] ?? null;
    const extraImages = imageUrls && imageUrls.length > 1 ? imageUrls.slice(1) : null;

    const now = new Date().toISOString();

    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        reference,
        name,
        whatsapp,
        email: email || null,
        product_name: productName || null,
        product_url: productUrl || null,
        product_image_url: mainImage,
        destination_city: destinationCity || null,
        destination_country: destinationCountry || null,
        type: type || "sourcing",
        source: source || "site",
        status: "received",
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

    const emailData = {
      reference,
      name,
      whatsapp,
      email,
      productName,
      message,
    };

    const emailPromises: Promise<unknown>[] = [];

    if (email) {
      emailPromises.push(
        resend.emails.send({
          from: "TRACOLI Business <noreply@tracoli-business.com>",
          to: email,
          subject: `Demande reçue — ${reference}`,
          html: clientConfirmationHtml(emailData),
        }),
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      emailPromises.push(
        resend.emails.send({
          from: "TRACOLI Business <noreply@tracoli-business.com>",
          to: adminEmail,
          subject: `Nouveau lead — ${reference}`,
          html: adminAlertHtml(emailData),
        }),
      );
    }

    await Promise.allSettled(emailPromises);

    return NextResponse.json({ reference, id: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur inattendue." },
      { status: 500 },
    );
  }
}
