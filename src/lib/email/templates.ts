interface LeadEmailData {
  reference?: string;
  name: string;
  whatsapp: string;
  email?: string;
  productName?: string;
  message?: string;
}

export function clientConfirmationHtml(data: LeadEmailData): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:system-ui,sans-serif;background:#f9fafb">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:#E60000;padding:28px 32px">
      <h1 style="margin:0;color:#fff;font-size:20px">TRACOLI BUSINESS</h1>
    </div>
    <div style="padding:32px">
      <p style="margin:0 0 16px;font-size:15px;color:#111">Bonjour <strong>${data.name}</strong>,</p>
      <p style="margin:0 0 16px;font-size:15px;color:#374151">
        Nous avons bien reçu votre demande de projet.
      </p>
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px;margin:0 0 20px">
        <p style="margin:0;font-size:14px;font-weight:700;color:#92400e">En attente de vérification</p>
        <p style="margin:8px 0 0;font-size:13px;color:#78350f">
          Notre équipe vérifie votre preuve de paiement. Vous recevrez votre code de suivi dès confirmation.
        </p>
      </div>
      <p style="margin:0 0 8px;font-size:14px;color:#374151"><strong>Produit :</strong> ${data.productName ?? "Non précisé"}</p>
      ${data.message ? `<p style="margin:0 0 20px;font-size:14px;color:#374151"><strong>Message :</strong> ${data.message}</p>` : ""}
      <p style="margin:0 0 4px;font-size:14px;color:#6b7280">
        Notre équipe vous contactera sous 24h via WhatsApp.
      </p>
    </div>
    <div style="background:#f9fafb;padding:16px 32px;text-align:center">
      <p style="margin:0;font-size:12px;color:#9ca3af">&copy; TRACOLI Business — Trade Connectors Logistics International</p>
    </div>
  </div>
</body>
</html>`;
}

export function adminAlertHtml(data: LeadEmailData): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:system-ui,sans-serif;background:#f9fafb">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:#111827;padding:28px 32px">
      <h1 style="margin:0;color:#fff;font-size:20px">Nouvelle demande</h1>
    </div>
    <div style="padding:32px">
      <table style="width:100%;font-size:14px;color:#374151;border-collapse:collapse">
        <tr><td style="padding:8px 0;font-weight:700">Nom</td><td style="padding:8px 0">${data.name}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">WhatsApp</td><td style="padding:8px 0">${data.whatsapp}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Email</td><td style="padding:8px 0">${data.email ?? "—"}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Produit</td><td style="padding:8px 0">${data.productName ?? "—"}</td></tr>
        ${data.message ? `<tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Message</td><td style="padding:8px 0">${data.message}</td></tr>` : ""}
      </table>
    </div>
  </div>
</body>
</html>`;
}

export function paymentConfirmedHtml(
  name: string,
  reference: string,
  trackingUrl: string,
): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:system-ui,sans-serif;background:#f9fafb">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:#E60000;padding:28px 32px">
      <h1 style="margin:0;color:#fff;font-size:20px">Paiement confirmé ✓</h1>
    </div>
    <div style="padding:32px">
      <p style="margin:0 0 16px;font-size:15px;color:#111">Bonjour <strong>${name}</strong>,</p>
      <p style="margin:0 0 16px;font-size:15px;color:#374151">
        Votre paiement a été vérifié et confirmé. Voici votre code de suivi :
      </p>
      <div style="background:#fef2f2;border:2px solid #fecaca;border-radius:12px;padding:20px;text-align:center;margin:0 0 20px">
        <span style="font-size:28px;font-weight:800;color:#E60000;letter-spacing:2px">${reference}</span>
      </div>
      <p style="margin:0 0 16px;font-size:14px;color:#374151">
        Vous pouvez désormais suivre votre projet en temps réel :
      </p>
      <div style="text-align:center;margin:0 0 20px">
        <a href="${trackingUrl}" style="display:inline-block;background:#E60000;color:#fff;padding:14px 28px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none">
          Suivre mon projet
        </a>
      </div>
      <p style="margin:0;font-size:14px;color:#6b7280">
        Conservez bien ce code. Notre équipe commence le travail sur votre projet immédiatement.
      </p>
    </div>
    <div style="background:#f9fafb;padding:16px 32px;text-align:center">
      <p style="margin:0;font-size:12px;color:#9ca3af">&copy; TRACOLI Business — Trade Connectors Logistics International</p>
    </div>
  </div>
</body>
</html>`;
}

export function statusChangeHtml(
  name: string,
  reference: string,
  newStatus: string,
): string {
  const statusLabels: Record<string, string> = {
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

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:system-ui,sans-serif;background:#f9fafb">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:#E60000;padding:28px 32px">
      <h1 style="margin:0;color:#fff;font-size:20px">Mise à jour — ${reference}</h1>
    </div>
    <div style="padding:32px">
      <p style="margin:0 0 16px;font-size:15px;color:#111">Bonjour <strong>${name}</strong>,</p>
      <p style="margin:0 0 20px;font-size:15px;color:#374151">
        Le statut de votre projet <strong>${reference}</strong> a été mis à jour :
      </p>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;text-align:center;margin:0 0 20px">
        <span style="font-size:18px;font-weight:700;color:#16a34a">${statusLabels[newStatus] ?? newStatus}</span>
      </div>
      <p style="margin:0;font-size:14px;color:#6b7280">
        Pour toute question, contactez-nous sur WhatsApp.
      </p>
    </div>
    <div style="background:#f9fafb;padding:16px 32px;text-align:center">
      <p style="margin:0;font-size:12px;color:#9ca3af">&copy; TRACOLI Business</p>
    </div>
  </div>
</body>
</html>`;
}
