import { CONTACT } from "../config/contact";
import { DESTINATIONS } from "../logistics/destinations";
import { SERVICE_DETAILS } from "../services/details";
import { RESOURCES } from "../resources/items";
import type { ServiceDetail, Resource } from "./types";

/** Génère un lien WhatsApp avec message pré-rempli. */
export const waLink = (message: string): string =>
  `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(message)}`;

/** Récupère les villes d'une destination par pays. */
export const getCitiesForCountry = (
  countryId: string
): { id: string; name: string }[] =>
  DESTINATIONS.find((c) => c.id === countryId)?.cities ?? [];

/** Récupère un service par slug. */
export const getServiceBySlug = (slug: string): ServiceDetail | undefined =>
  SERVICE_DETAILS.find((s) => s.slug === slug);

/** Récupère une ressource par slug. */
export const getResourceBySlug = (slug: string): Resource | undefined =>
  RESOURCES.find((r) => r.slug === slug);