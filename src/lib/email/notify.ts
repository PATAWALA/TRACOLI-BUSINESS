import { resend } from "@/lib/email/resend";
import { adminAlertHtml, clientConfirmationHtml } from "@/lib/email/templates";
import { ADMIN_LOGIN_URL, button, detailsTable, emailShell, h2 } from "@/lib/email/layout";

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
    if (!process.env.RESEND_API_KEY) {
      console.error("[email] RESEND_API_KEY manquante — aucun email envoyé");
      return;
    }
    const { error } = await resend.emails.send(args);
    if (error) console.error("[email] refusé par Resend:", error);
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
    html: emailShell({
      admin: true,
      preheader: `${email} vient de s'inscrire`,
      body:
        h2("Nouvel abonné newsletter") +
        detailsTable([["Email", email], ["Source", source]]) +
        button("Voir les inscrits", `${SITE}/admin/newsletter`, "#111827"),
    }),
  });
}

/** Alerte admin : un client a déposé une demande de colis ou une preuve (réservé aux évolutions). */
export async function notifyAdmin(subject: string, htmlBody: string) {
  await safeSend({
    from: FROM,
    to: adminTo(),
    subject,
    html: emailShell({ admin: true, preheader: subject, body: htmlBody + button("Ouvrir l'espace admin", ADMIN_LOGIN_URL, "#111827") }),
  });
}

/* ── Limite anti-flood : au plus 6 alertes « action visiteur » par minute et par IP, 60 par heure au total ── */
const hits = new Map<string, number[]>();
let hourly: number[] = [];
function allowed(ip: string): boolean {
  const now = Date.now();
  hourly = hourly.filter((t) => now - t < 3_600_000);
  const mine = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (mine.length >= 6 || hourly.length >= 60) return false;
  mine.push(now);
  hourly.push(now);
  hits.set(ip, mine);
  if (hits.size > 500) hits.clear();
  return true;
}

export interface VisitorAction {
  type: string;
  page?: string;
  label?: string;
  detail?: string;
  ip?: string;
}

const ACTION_TITLES: Record<string, string> = {
  whatsapp_click: "Clic WhatsApp",
  resource_open: "Ressource ouverte",
  tracking_search: "Recherche de suivi",
};

/** Alerte admin : un visiteur a fait une action sur le site. */
export async function notifyVisitorAction(a: VisitorAction) {
  if (!allowed(a.ip ?? "?")) return;
  const title = ACTION_TITLES[a.type] ?? a.type;
  await safeSend({
    from: FROM,
    to: adminTo(),
    subject: `${title}${a.label ? ` — ${a.label.slice(0, 60)}` : ""}`,
    html: emailShell({
      admin: true,
      preheader: `${title} sur ${a.page ?? "le site"}`,
      body:
        h2(title) +
        detailsTable([
          ["Page", a.page],
          ["Détail", a.label],
          ["Message", a.detail],
          ["Heure", new Date().toLocaleString("fr-FR", { timeZone: "Africa/Bujumbura" })],
        ]) +
        (a.type === "tracking_search"
          ? button("Voir les colis et clients", `${SITE}/admin/clients`, "#111827")
          : a.type === "resource_open"
            ? button("Voir les inscrits newsletter", `${SITE}/admin/newsletter`, "#111827")
            : button("Voir les demandes", `${SITE}/admin/leads`, "#111827")) +
        button("Ouvrir l'espace admin", ADMIN_LOGIN_URL, "#6b7280"),
    }),
  });
}
