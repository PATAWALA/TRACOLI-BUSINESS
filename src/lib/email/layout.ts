/** Socle visuel commun à tous les emails TRACOLI : blanc, rouge, épuré. Mise en page en tableaux = compatible Gmail/Outlook. */

export const SITE = "https://www.tracolibusiness.com";
export const ADMIN_LOGIN_URL = `${SITE}/admin/login`;
const RED = "#E60000";
const INK = "#111827";
const MUTED = "#6b7280";
const LINE = "#eceef1";

/** Échappe le texte saisi par un visiteur avant de l'insérer dans un email HTML. */
export const esc = (v: unknown): string =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const p = (html: string, style = "") =>
  `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#374151;${style}">${html}</p>`;

export const h2 = (text: string) =>
  `<h2 style="margin:0 0 18px;font-size:24px;line-height:1.25;color:${RED};font-weight:800;letter-spacing:-.3px">${text}</h2>`;

/**
 * Bouton. Le 3e paramètre est conservé pour compatibilité : "#6b7280" = bouton secondaire (contour),
 * toute autre valeur = bouton principal rouge.
 */
export function button(label: string, href: string, color = RED): string {
  const ghost = color === MUTED;
  const style = ghost
    ? `background:#ffffff;color:${INK};border:1px solid #d1d5db`
    : `background:${RED};color:#ffffff;border:1px solid ${RED}`;
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px auto 14px"><tr><td>
    <a href="${href}" style="display:inline-block;padding:13px 32px;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;${style}">${label}</a>
  </td></tr></table>`;
}

/** Tableau « libellé / valeur » sobre. */
export function detailsTable(rows: [string, string | null | undefined][]): string {
  const body = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:11px 0;font-size:12px;font-weight:700;color:${RED};text-transform:uppercase;letter-spacing:.6px;width:120px;vertical-align:top;border-top:1px solid ${LINE}">${esc(k)}</td><td style="padding:11px 0;font-size:14px;color:${INK};border-top:1px solid ${LINE}">${esc(v)}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-bottom:1px solid ${LINE}">${body}</table>`;
}

/** Encadré sobre : fond gris très clair, filet rouge à gauche. */
export function callout(_kind: "ok" | "warn" | "info", title: string, text = ""): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px"><tr>
    <td width="3" style="background:${RED};border-radius:3px"></td>
    <td style="background:#ffffff;border:1px solid ${LINE};border-left:0;padding:14px 18px;border-radius:0 10px 10px 0">
      <p style="margin:0;font-size:14px;font-weight:700;color:${INK}">${title}</p>
      ${text ? `<p style="margin:6px 0 0;font-size:13px;line-height:1.6;color:#4b5563">${text}</p>` : ""}
    </td>
  </tr></table>`;
}

export interface ShellOptions {
  /** Texte d'aperçu affiché dans la boîte de réception, avant l'ouverture. */
  preheader: string;
  /** Contenu HTML principal. */
  body: string;
  /** Email destiné à l'équipe (même style, étiquette « Espace équipe »). */
  admin?: boolean;
  /** Lien de désinscription (newsletter). */
  unsubscribeUrl?: string;
}

export function emailShell({ preheader, body, admin, unsubscribeUrl }: ShellOptions): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="color-scheme" content="light only" /><meta name="supported-color-schemes" content="light only" /><style>:root{color-scheme:light only;supported-color-schemes:light only}</style></head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="background:#ffffff"><tr><td align="center" bgcolor="#ffffff" style="padding:28px 12px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${LINE}">
      <tr><td style="height:5px;background:${RED};line-height:5px;font-size:0">&nbsp;</td></tr>
      <tr><td style="padding:26px 36px 20px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td width="46" style="padding-right:12px"><img src="${SITE}/android-chrome-192x192.png" width="40" height="40" alt="TRACOLI" style="display:block;border-radius:9px;border:0" /></td>
          <td style="font-size:16px;font-weight:800;letter-spacing:.4px;color:${INK}">TRACOLI <span style="color:${RED}">BUSINESS</span></td>
          ${admin ? `<td align="right" style="font-size:10px;font-weight:700;letter-spacing:1.2px;color:${RED};text-transform:uppercase">Espace équipe</td>` : ""}
        </tr></table>
      </td></tr>
      <tr><td style="padding:0 36px"><div style="height:1px;background:${LINE};line-height:1px;font-size:0">&nbsp;</div></td></tr>
      <tr><td style="padding:30px 36px 18px">${body}</td></tr>
      <tr><td style="padding:0 36px"><div style="height:1px;background:${LINE};line-height:1px;font-size:0">&nbsp;</div></td></tr>
      <tr><td style="padding:20px 36px 26px;text-align:center">
        ${
          admin
            ? `<p style="margin:0 0 6px;font-size:12px"><a href="${ADMIN_LOGIN_URL}" style="color:${RED};font-weight:700;text-decoration:none">Ouvrir l'espace admin</a></p>
               <p style="margin:0;font-size:11px;color:#9ca3af">Alerte automatique de tracolibusiness.com</p>`
            : `<p style="margin:0 0 6px;font-size:12px;color:${MUTED}">Bujumbura · Guangzhou &nbsp;|&nbsp; <a href="${SITE}" style="color:${RED};text-decoration:none">tracolibusiness.com</a> &nbsp;|&nbsp; WhatsApp +257 69 03 27 65</p>
               <p style="margin:0;font-size:11px;color:#9ca3af">&copy; TRACOLI Business — Trade Connectors Logistics International${
                 unsubscribeUrl ? ` &nbsp;·&nbsp; <a href="${esc(unsubscribeUrl)}" style="color:#9ca3af">Se désinscrire</a>` : ""
               }</p>`
        }
      </td></tr>
    </table>
  </td></tr></table>
</body>
</html>`;
}
