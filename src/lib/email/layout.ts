/** Socle visuel commun à tous les emails TRACOLI (clients, admin, newsletter). Mise en page en tableaux = compatible Gmail/Outlook. */

export const SITE = "https://www.tracolibusiness.com";
export const ADMIN_LOGIN_URL = `${SITE}/admin/login`;
const RED = "#E60000";
const DARK = "#111827";

/** Échappe le texte saisi par un visiteur avant de l'insérer dans un email HTML. */
export const esc = (v: unknown): string =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const p = (html: string, style = "") =>
  `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#374151;${style}">${html}</p>`;

export const h2 = (text: string) =>
  `<h2 style="margin:0 0 14px;font-size:22px;line-height:1.3;color:${DARK};font-weight:800">${text}</h2>`;

export function button(label: string, href: string, color = RED): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px auto 20px"><tr><td style="border-radius:12px;background:${color}">
    <a href="${href}" style="display:inline-block;padding:14px 30px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px">${label}</a>
  </td></tr></table>`;
}

/** Ligne « libellé : valeur » d'un tableau de détails. */
export function detailsTable(rows: [string, string | null | undefined][]): string {
  const body = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:9px 12px;font-size:13px;font-weight:700;color:#6b7280;width:130px;vertical-align:top;border-bottom:1px solid #f3f4f6">${esc(k)}</td><td style="padding:9px 12px;font-size:14px;color:${DARK};border-bottom:1px solid #f3f4f6">${esc(v)}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;border:1px solid #f3f4f6;border-radius:12px;border-collapse:separate;overflow:hidden">${body}</table>`;
}

/** Encadré coloré (info / succès / alerte). */
export function callout(kind: "ok" | "warn" | "info", title: string, text = ""): string {
  const [bg, border, fg] =
    kind === "ok"
      ? ["#ecfdf5", "#a7f3d0", "#065f46"]
      : kind === "warn"
        ? ["#fffbeb", "#fde68a", "#92400e"]
        : ["#eff6ff", "#bfdbfe", "#1e40af"];
  return `<div style="background:${bg};border:1px solid ${border};border-radius:12px;padding:16px 18px;margin:0 0 20px">
    <p style="margin:0;font-size:14px;font-weight:700;color:${fg}">${title}</p>
    ${text ? `<p style="margin:6px 0 0;font-size:13px;line-height:1.55;color:${fg}">${text}</p>` : ""}
  </div>`;
}

export interface ShellOptions {
  /** Texte d'aperçu affiché dans la boîte de réception, avant l'ouverture. */
  preheader: string;
  /** Contenu HTML principal. */
  body: string;
  /** Variante sombre pour les emails destinés à l'équipe. */
  admin?: boolean;
  /** Lien de désinscription (newsletter). */
  unsubscribeUrl?: string;
}

export function emailShell({ preheader, body, admin, unsubscribeUrl }: ShellOptions): string {
  const head = admin ? DARK : RED;
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="color-scheme" content="light" /></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6"><tr><td align="center" style="padding:28px 12px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e5e7eb">
      <tr><td style="background:${head};padding:22px 32px">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:12px"><img src="${SITE}/android-chrome-192x192.png" width="42" height="42" alt="" style="display:block;border-radius:10px;border:0" /></td>
          <td style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:.3px">TRACOLI BUSINESS${admin ? '<div style="font-size:11px;font-weight:600;opacity:.7;letter-spacing:1px;text-transform:uppercase;margin-top:2px">Espace équipe</div>' : '<div style="font-size:11px;font-weight:600;opacity:.85;letter-spacing:.5px;margin-top:2px">Sourcing &amp; logistique Chine – Afrique</div>'}</td>
        </tr></table>
      </td></tr>
      <tr><td style="height:4px;background:${admin ? RED : DARK};line-height:4px;font-size:0">&nbsp;</td></tr>
      <tr><td style="padding:32px">${body}</td></tr>
      <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 32px;text-align:center">
        ${
          admin
            ? `<p style="margin:0 0 6px;font-size:12px;color:#6b7280"><a href="${ADMIN_LOGIN_URL}" style="color:${RED};font-weight:700;text-decoration:none">Ouvrir l'espace admin</a></p>
               <p style="margin:0;font-size:11px;color:#9ca3af">Alerte automatique du site tracolibusiness.com</p>`
            : `<p style="margin:0 0 6px;font-size:12px;color:#6b7280">Bujumbura · Guangzhou — <a href="${SITE}" style="color:${RED};text-decoration:none">tracolibusiness.com</a> — WhatsApp +257 69 03 27 65</p>
               <p style="margin:0;font-size:11px;color:#9ca3af">&copy; TRACOLI Business — Trade Connectors Logistics International${
                 unsubscribeUrl ? ` · <a href="${esc(unsubscribeUrl)}" style="color:#9ca3af">Se désinscrire</a>` : ""
               }</p>`
        }
      </td></tr>
    </table>
  </td></tr></table>
</body>
</html>`;
}
