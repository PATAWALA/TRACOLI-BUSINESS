import { ADMIN_LOGIN_URL, SITE, button, callout, detailsTable, emailShell, esc, h2, p } from "@/lib/email/layout";

export { esc };

interface LeadEmailData {
  reference?: string;
  name: string;
  whatsapp: string;
  email?: string;
  productName?: string;
  message?: string;
  /** Preuve de paiement jointe à la demande */
  hasPaid?: boolean;
  /** Demande envoyée depuis /sourcer (sans paiement à ce stade) */
  sourcing?: boolean;
  destination?: string;
  link?: string;
}

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;

function statusBlock(d: LeadEmailData): string {
  if (d.sourcing) {
    return callout(
      "ok",
      "Demande enregistrée",
      "Un acheteur TRACOLI analyse votre demande et vous contacte sous 24h sur WhatsApp avec une cotation.",
    );
  }
  if (d.hasPaid) {
    return callout(
      "warn",
      "En attente de vérification",
      "Notre équipe vérifie votre preuve de paiement. Vous recevrez votre code de suivi dès confirmation.",
    );
  }
  return callout(
    "warn",
    "En attente de paiement",
    "Envoyez votre preuve de paiement pour activer votre projet. Vous recevrez ensuite votre code de suivi.",
  );
}

/** Confirmation envoyée au client après sa demande. */
export function clientConfirmationHtml(data: LeadEmailData): string {
  return emailShell({
    preheader: "Nous avons bien reçu votre demande — réponse sous 24h sur WhatsApp.",
    body:
      h2(`Merci ${esc(firstName(data.name))}, c'est bien reçu ✓`) +
      p("Nous avons bien enregistré votre demande de projet. Voici le récapitulatif :") +
      statusBlock(data) +
      detailsTable([
        ["Produit", data.productName ?? "Non précisé"],
        ["Destination", data.destination],
        ["Message", data.message],
      ]) +
      p("Notre équipe vous contactera <strong>sous 24h via WhatsApp</strong>. Une question d'ici là ? Répondez simplement à cet email ou écrivez-nous.", "color:#6b7280;font-size:14px") +
      button("Suivre mon projet", `${SITE}/suivre`),
  });
}

/** Alerte envoyée à l'équipe pour chaque nouvelle demande. */
export function adminAlertHtml(data: LeadEmailData): string {
  const title = data.hasPaid
    ? "Nouvelle demande — paiement soumis"
    : data.sourcing
      ? "Nouvelle demande de sourcing"
      : "Nouvelle demande";
  const wa = data.whatsapp.replace(/[^\d]/g, "");
  return emailShell({
    admin: true,
    preheader: `${data.name} — ${data.productName ?? "nouvelle demande"}`,
    body:
      h2(title) +
      detailsTable([
        ["Nom", data.name],
        ["WhatsApp", data.whatsapp],
        ["Email", data.email],
        ["Destination", data.destination],
        ["Produit", data.productName],
        ["Message", data.message],
      ]) +
      (wa ? button("Répondre sur WhatsApp", `https://wa.me/${wa}`) : "") +
      button("Ouvrir la demande dans l'admin", data.link ?? ADMIN_LOGIN_URL, "#6b7280"),
  });
}

/** Email envoyé au client quand son paiement est confirmé (avec son code de suivi). */
export function paymentConfirmedHtml(name: string, reference: string, trackingUrl: string): string {
  return emailShell({
    preheader: `Paiement confirmé — votre code de suivi : ${reference}`,
    body:
      h2(`Paiement confirmé ✓`) +
      p(`Bonjour <strong>${esc(firstName(name))}</strong>, votre paiement a été vérifié. Voici votre code de suivi :`) +
      `<div style="background:#fef2f2;border:2px dashed #fecaca;border-radius:14px;padding:22px;text-align:center;margin:0 0 22px">
        <span style="font-size:30px;font-weight:800;color:#E60000;letter-spacing:3px">${esc(reference)}</span>
      </div>` +
      p("Suivez l'avancement de votre projet en temps réel :") +
      button("Suivre mon projet", trackingUrl) +
      p("Conservez bien ce code. Notre équipe commence le travail sur votre projet immédiatement.", "color:#6b7280;font-size:14px"),
  });
}

const STATUS_LABELS: Record<string, string> = {
  en_attente_paiement: "En attente de paiement",
  paiement_soumis: "Paiement soumis — en cours de vérification",
  confirme: "Paiement confirmé",
  recherche: "Recherche fournisseur en cours",
  devis: "Devis envoyé — vérifiez votre email",
  achat: "Achat effectué auprès du fournisseur",
  expedition: "Expédition en cours",
  en_transit: "En transit vers votre destination",
  douane: "Dédouanement en cours",
  livre: "Livré — bonne réception !",
  cloture: "Projet clôturé",
};

/** Email envoyé au client quand le statut de son projet change. */
export function statusChangeHtml(name: string, reference: string, newStatus: string): string {
  const label = STATUS_LABELS[newStatus] ?? newStatus;
  return emailShell({
    preheader: `${reference} : ${label}`,
    body:
      h2(`Mise à jour de votre projet`) +
      p(`Bonjour <strong>${esc(firstName(name))}</strong>, le statut de votre projet <strong>${esc(reference)}</strong> vient de changer :`) +
      callout("ok", esc(label)) +
      button("Suivre mon projet", `${SITE}/suivre?ref=${encodeURIComponent(reference)}`) +
      p("Pour toute question, contactez-nous sur WhatsApp : nous répondons vite.", "color:#6b7280;font-size:14px"),
  });
}
