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
    const { fullName, phone, email, message, productType, imageUrl, source } =
      body as {
        fullName: string;
        phone: string;
        email?: string;
        message: string;
        productType?: string;
        imageUrl?: string;
        source?: string;
      };

    if (!fullName || !phone || !message) {
      return NextResponse.json(
        { error: "Nom, téléphone et message sont requis." },
        { status: 400 },
      );
    }

    const reference = generateReference();
    const supabase = createServerClient();

    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        reference,
        full_name: fullName,
        phone,
        email: email || null,
        message,
        product_type: productType || null,
        image_url: imageUrl || null,
        source: source || "site",
        status: "nouveau",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement." },
        { status: 500 },
      );
    }

    const emailData = {
      reference,
      fullName,
      phone,
      email,
      message,
      productType,
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
          subject: `🚨 Nouveau lead — ${reference}`,
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
