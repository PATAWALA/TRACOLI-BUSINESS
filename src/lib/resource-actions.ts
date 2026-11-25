import { CONTACT, waLink } from "@/data/content";
import type { Resource, ResourceType } from "@/data/shared/types";

export const TYPE_LABELS: Record<ResourceType, string> = {
  guide: "Guide",
  ebook: "Ebook",
  formation: "Formation",
  template: "Modèle",
};

export interface ResourceAction {
  label: string;
  href: string;
  /** Lien direct vers un fichier : s'ouvre dans un nouvel onglet. */
  isFile: boolean;
}

/**
 * Le bouton d'un livre :
 * • gratuit avec fichier ou lien → « Télécharger » (direct) ;
 * • gratuit sans fichier        → « Télécharger » (demande sur WhatsApp au vendeur) ;
 * • payant                      → « Commander » : WhatsApp du vendeur avec le titre du livre.
 */
export function getResourceAction(r: Resource): ResourceAction {
  const phone = r.sellerWhatsapp || CONTACT.phoneRaw;
  const who = r.sellerName || CONTACT.manager;
  if (r.access === "premium") {
    const price = r.price ? ` (${r.price})` : "";
    return {
      label: "Commander",
      href: waLink(
        `Bonjour ${who}, je souhaite commander le livre : "${r.title}"${price}. Comment puis-je payer pour recevoir le PDF ?`,
        phone,
      ),
      isFile: false,
    };
  }
  if (r.downloadUrl) return { label: "Télécharger", href: r.downloadUrl, isFile: true };
  return {
    label: "Télécharger",
    href: waLink(`Bonjour ${who}, je souhaite recevoir le guide gratuit : "${r.title}".`, phone),
    isFile: false,
  };
}

/** Lien WhatsApp « j'ai une question » vers le vendeur du livre. */
export function getResourceQuestionLink(r: Resource): string {
  const who = r.sellerName || CONTACT.manager;
  return waLink(`Bonjour ${who}, j'ai une question sur : "${r.title}".`, r.sellerWhatsapp || CONTACT.phoneRaw);
}
