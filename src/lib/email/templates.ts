interface LeadEmailData {
  reference: string;
  fullName: string;
  phone: string;
  email?: string;
  message: string;
  productType?: string;
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
      <p style="margin:0 0 16px;font-size:15px;color:#111">Bonjour <strong>${data.fullName}</strong>,</p>
      <p style="margin:0 0 16px;font-size:15px;color:#374151">
        Nous avons bien reçu votre demande. Votre référence est :
      </p>
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:16px;text-align:center;margin:0 0 20px">
        <span style="font-size:22px;font-weight:800;color:#E60000;letter-spacing:1px">${data.reference}</span>
      </div>
      <p style="margin:0 0 8px;font-size:14px;color:#374151"><strong>Produit :</strong> ${data.productType ?? "Non précisé"}</p>
      <p style="margin:0 0 20px;font-size:14px;color:#374151"><strong>Message :</strong> ${data.message}</p>
      <p style="margin:0 0 4px;font-size:14px;color:#6b7280">
        Notre équipe vous contactera sous 24h via WhatsApp ou par email.
      </p>
    </div>
    <div style="background:#f9fafb;padding:16px 32px;text-align:center">
      <p style="margin:0;font-size:12px;color:#9ca3af">© TRACOLI Business — Trade Connectors Logistics International</p>
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
      <h1 style="margin:0;color:#fff;font-size:20px">🚨 Nouveau lead — ${data.reference}</h1>
    </div>
    <div style="padding:32px">
      <table style="width:100%;font-size:14px;color:#374151;border-collapse:collapse">
        <tr><td style="padding:8px 0;font-weight:700">Nom</td><td style="padding:8px 0">${data.fullName}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Téléphone</td><td style="padding:8px 0">${data.phone}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Email</td><td style="padding:8px 0">${data.email ?? "—"}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Produit</td><td style="padding:8px 0">${data.productType ?? "—"}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Message</td><td style="padding:8px 0">${data.message}</td></tr>
      </table>
    </div>
  </div>
</body>
</html>`;
}

export function statusChangeHtml(
  fullName: string,
  reference: string,
  newStatus: string,
): string {
  const statusLabels: Record<string, string> = {
    contacte: "Contacté par notre équipe",
    en_cours: "En cours de traitement",
    gagne: "Commande confirmée",
    perdu: "Demande clôturée",
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
      <p style="margin:0 0 16px;font-size:15px;color:#111">Bonjour <strong>${fullName}</strong>,</p>
      <p style="margin:0 0 20px;font-size:15px;color:#374151">
        Le statut de votre demande <strong>${reference}</strong> a été mis à jour :
      </p>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;text-align:center;margin:0 0 20px">
        <span style="font-size:18px;font-weight:700;color:#16a34a">${statusLabels[newStatus] ?? newStatus}</span>
      </div>
      <p style="margin:0;font-size:14px;color:#6b7280">
        Pour toute question, contactez-nous sur WhatsApp.
      </p>
    </div>
    <div style="background:#f9fafb;padding:16px 32px;text-align:center">
      <p style="margin:0;font-size:12px;color:#9ca3af">© TRACOLI Business</p>
    </div>
  </div>
</body>
</html>`;
}
