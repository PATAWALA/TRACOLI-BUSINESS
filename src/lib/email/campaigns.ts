import { createHmac, timingSafeEqual } from "crypto";
import { resend } from "@/lib/email/resend";
import { createServerClient } from "@/lib/supabase/server";
import { SITE, button, emailShell, esc, h2, p } from "@/lib/email/layout";

const FROM = process.env.EMAIL_FROM || "TRACOLI Business <contact@tracolibusiness.com>";

/** reco = recommandation (le 1er du mois) · services = services & suivi (le 15). */
export type CampaignKind = "reco" | "services";
export const CAMPAIGN_KINDS: CampaignKind[] = ["reco", "services"];

/* ── Désinscription : lien signé, personne ne peut désinscrire une autre adresse ── */
const sign = (email: string) =>
  createHmac("sha256", process.env.SUPABASE_SERVICE_ROLE_KEY ?? "")
    .update(email.toLowerCase())
    .digest("hex")
    .slice(0, 32);

export function verifyUnsubscribe(email: string, token: string): boolean {
  const a = Buffer.from(sign(email));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

const unsubUrl = (email: string) =>
  `${SITE}/api/newsletter/unsubscribe?e=${encodeURIComponent(email)}&t=${sign(email)}`;

/* ── Contenu ── */
const SHARE_TEXT =
  "Salut ! Je te recommande TRACOLI BUSINESS : ils trouvent les fournisseurs en Chine, sécurisent l'achat et livrent à Bujumbura, Kinshasa, Goma, Kampala et Mombasa. Regarde ici : " +
  SITE;

const bullet = (icon: string, title: string, text: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px"><tr>
    <td width="44" valign="top" style="font-size:24px;line-height:1">${icon}</td>
    <td style="font-size:14px;line-height:1.55;color:#374151"><strong style="color:#111827">${title}</strong><br/>${text}</td>
  </tr></table>`;

const greet = (first: string | null) => (first ? `Bonjour <strong>${esc(first)}</strong>,` : "Bonjour,");

function build(kind: CampaignKind, first: string | null, to: string) {
  if (kind === "reco") {
    return {
      subject: first
        ? `${first}, connaissez-vous quelqu'un qui importe de Chine ?`
        : "Connaissez-vous quelqu'un qui importe de Chine ?",
      html: emailShell({
        preheader: "Un message à transférer en 1 clic : aidez vos proches à importer sans stress.",
        unsubscribeUrl: unsubUrl(to),
        body:
          h2("Parlez de TRACOLI autour de vous") +
          p(greet(first)) +
          p("Merci de faire partie de la communauté TRACOLI. Chaque mois, de nouveaux commerçants nous rejoignent grâce à la recommandation de personnes comme vous.") +
          p("<strong>Qui pourrait avoir besoin de nous ?</strong>", "margin-bottom:10px") +
          bullet("🛍️", "Les commerçants", "qui cherchent des produits en Chine à bon prix") +
          bullet("🚚", "Les agences de transport et transitaires", "qui ont des clients à servir sur le corridor Chine – Afrique") +
          bullet("🤝", "Vos amis, famille, collègues", "qui veulent faire venir un colis en toute sécurité") +
          p("Un seul geste suffit : transférez-leur notre message sur WhatsApp.", "margin-top:8px") +
          button("Recommander sur WhatsApp", `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`, "#25D366") +
          p(`Ou partagez simplement ce lien : <a href="${SITE}" style="color:#E60000;font-weight:600">tracolibusiness.com</a>`, "text-align:center;font-size:13px;color:#6b7280"),
      }),
    };
  }
  return {
    subject: first
      ? `${first}, votre import Chine – Afrique, simplement`
      : "Votre import Chine – Afrique, simplement",
    html: emailShell({
      preheader: "Sourcing, fret, dédouanement et suivi de colis : tout est géré pour vous.",
      unsubscribeUrl: unsubUrl(to),
      body:
        h2("Votre import, de A à Z") +
        p(greet(first)) +
        p("Voici comment TRACOLI s'occupe de tout, de l'usine en Chine jusqu'à votre porte :") +
        bullet("🔎", "Sourcing", "Nous trouvons le bon fournisseur et négocions pour vous.") +
        bullet("✈️", "Fret aérien & maritime", "Groupage ou conteneur complet vers Bujumbura, Kinshasa, Goma, Kampala, Mombasa.") +
        bullet("📋", "Dédouanement", "Nous gérons les formalités pour que votre colis arrive sans surprise.") +
        bullet("📍", "Suivi en direct", "Un code, et vous voyez où est votre colis à tout moment.") +
        button("Faire une demande", `${SITE}/demande`) +
        p(`Déjà un colis en route ? <a href="${SITE}/suivre" style="color:#E60000;font-weight:600">Suivez-le ici</a>.`, "text-align:center;font-size:14px;color:#6b7280"),
    }),
  };
}

/* ── Destinataires + prénoms (retrouvés dans les demandes et fiches clients) ── */
async function loadRecipients(): Promise<{ email: string; first: string | null }[]> {
  const sb = createServerClient();
  const { data, error } = await sb.from("email_captures").select("email");
  if (error) throw new Error(error.message);
  const emails = [...new Set((data ?? []).map((r) => r.email.trim().toLowerCase()))];

  const names = new Map<string, string>();
  for (const table of ["clients", "leads"] as const) {
    const { data: rows } = await sb.from(table).select("name, email").not("email", "is", null);
    for (const r of (rows ?? []) as { name: string | null; email: string | null }[]) {
      const key = r.email?.trim().toLowerCase();
      if (key && r.name && !names.has(key)) names.set(key, r.name);
    }
  }
  const firstOf = (full?: string) => {
    const w = full?.trim().split(/\s+/)[0];
    return w && w.length <= 30 ? w.charAt(0).toUpperCase() + w.slice(1) : null;
  };
  return emails.map((email) => ({ email, first: firstOf(names.get(email)) }));
}

/** Envoie une campagne. `onlyTo` = test vers une liste précise ; sinon tous les inscrits. */
export async function sendCampaign(kind: CampaignKind, onlyTo?: string[]) {
  if (!process.env.RESEND_API_KEY) return { sent: 0, failed: 0, error: "RESEND_API_KEY manquante" };

  let recipients: { email: string; first: string | null }[];
  try {
    recipients = onlyTo ? onlyTo.map((email) => ({ email, first: null })) : await loadRecipients();
  } catch (err) {
    return { sent: 0, failed: 0, error: String(err) };
  }

  const mails = recipients.map(({ email, first }) => {
    const { subject, html } = build(kind, first, email);
    return {
      from: FROM,
      to: email,
      subject,
      html,
      headers: {
        "List-Unsubscribe": `<${unsubUrl(email)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    };
  });

  let sent = 0;
  let failed = 0;
  let firstError: string | undefined;
  for (let i = 0; i < mails.length; i += 100) {
    const chunk = mails.slice(i, i + 100);
    try {
      const { error } = await resend.batch.send(chunk);
      if (error) {
        failed += chunk.length;
        firstError ??= error.message;
      } else sent += chunk.length;
    } catch (err) {
      failed += chunk.length;
      firstError ??= String(err);
    }
  }
  if (firstError) console.error("[email] campagne:", firstError);
  return { sent, failed, error: firstError };
}
