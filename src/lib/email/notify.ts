import { resend } from "@/lib/email/resend";
import { adminAlertHtml, clientConfirmationHtml, esc } from "@/lib/email/templates";

export const FROM = process.env.EMAIL_FROM || "TRACOLI Business <contact@tracolibusiness.com>";
const SITE = "https://www.tracolibusiness.com";

/** Destinataire des alertes admin : ADMIN_ALERT_EMAIL, sinon ADMIN_EMAIL, sinon l'adresse de contact. */
const adminTo = () =>
  (process.env.ADMIN_ALERT_EMAIL || process.env.ADMIN_EMAIL || "contact@tracolibusiness.com")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

/** Un email qui échoue ne doit jamais faire échouer l'enregistrement. */
async function safeSend(args: Parameters<typeof resend.emails.send>[0]) {
  try {
    if (!process.env.RESEND_API_KEY) return;
    await resend.emails.send(args);
  } catch (err) {
    console.error("[email] envoi échoué:", err);
  }
}

export interface NewLeadNotice {
  id: string;
  name: string;
  whatsapp: string;
  email?: string | null;
  productName?: string | null;
  message?: string | null;
  destination?: string | null;
  hasPaid: boolean;
  sourcing: boolean;
}

/** Alerte l'admin d'une nouvelle demande + confirmation au client (s'il a laissé un email). */
export async function notifyNewLead(l: NewLeadNotice) {
  const data = {
    name: l.name,
    whatsapp: l.whatsapp,
    email: l.email ?? undefined,
    productName: l.productName ?? undefined,
    message: l.message ?? undefined,
    destination: l.destination ?? undefined,
    hasPaid: l.hasPaid,
    sourcing: l.sourcing,
    link: `${SITE}/admin/leads/${l.id}`,
  };

  const subject = l.hasPaid
    ? `Paiement soumis — ${l.name}`
    : l.sourcing
      ? `Nouvelle demande de sourcing — ${l.productName ?? l.name}`
      : `Nouvelle demande — ${l.name}`;

  await Promise.allSettled([
    safeSend({ from: FROM, to: adminTo(), subject, html: adminAlertHtml(data) }),
    l.email
      ? safeSend({
          from: FROM,
          to: l.email,
          subject: "Votre demande TRACOLI a bien été reçue",
          html: clientConfirmationHtml(data),
        })
      : Promise.resolve(),
  ]);
}

/** Alerte admin : nouvel inscrit à la newsletter. */
export async function notifyNewSubscriber(email: string, source: string) {
  await safeSend({
    from: FROM,
    to: adminTo(),
    subject: "Nouvel abonné newsletter",
    html: `<div style="font-family:system-ui,sans-serif;font-size:14px;color:#374151">
      <p><strong>${esc(email)}</strong> vient de s'inscrire (source : ${esc(source)}).</p>
      <p><a href="${SITE}/admin/newsletter">Voir les inscrits</a></p></div>`,
  });
}

/** Alerte admin : un client a déposé une demande de colis ou une preuve (réservé aux évolutions). */
export async function notifyAdmin(subject: string, htmlBody: string) {
  await safeSend({
    from: FROM,
    to: adminTo(),
    subject,
    html: `<div style="font-family:system-ui,sans-serif;font-size:14px;color:#374151">${htmlBody}</div>`,
  });
}
