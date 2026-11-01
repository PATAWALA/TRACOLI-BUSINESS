import { CONTACT } from "@/data/config/contact";
import { waLink } from "@/data/shared/helpers";

function whatsappMessage(context: string): string {
  return waLink(`Bonjour l'équipe TRACOLI,\n\n${context}\n\n— Envoyé depuis le site ${CONTACT.brand}`);
}

export function whatsappContactMessage(): string {
  return whatsappMessage("Je souhaite avoir plus d'informations sur vos services.");
}

export function whatsappSourcingMessage(productName?: string): string {
  return whatsappMessage(
    `Je suis intéressé par le sourcing de${productName ? ` : ${productName}` : " produits en Chine"}.`
  );
}

export function whatsappFreightMessage(): string {
  return whatsappMessage("Je souhaite obtenir une estimation de fret Chine → Afrique.");
}

export function whatsappTrackingMessage(reference: string): string {
  return whatsappMessage(`Je souhaite suivre ma commande : ${reference}`);
}
