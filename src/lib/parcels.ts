import type { ParcelMode, ParcelStatus } from "@/types/database.types";

export interface ParcelStatusInfo {
  value: ParcelStatus;
  label: string;
  location: string;
  detail: string;
  badge: string;
}

/** Étapes d'un colis, dans l'ordre. Source unique pour l'admin et le suivi public. */
export const PARCEL_STATUSES: ParcelStatusInfo[] = [
  {
    value: "en_agence",
    label: "En agence",
    location: "Agence TRACOLI",
    detail: "Votre colis est arrivé en agence et attend son expédition.",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    value: "expedie",
    label: "Expédié",
    location: "Départ de Chine",
    detail: "Votre colis a quitté l'agence et part vers votre destination.",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    value: "en_transit",
    label: "En transit",
    location: "En mer / En vol",
    detail: "Votre colis est en route vers votre pays.",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  {
    value: "douane",
    label: "Dédouanement",
    location: "Pays de destination",
    detail: "Votre colis est arrivé. Les formalités douanières sont en cours.",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    value: "livre",
    label: "Disponible / Livré",
    location: "Votre ville",
    detail: "Votre colis est disponible. Bonne réception !",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
];

export const PARCEL_MODES: { value: ParcelMode; label: string }[] = [
  { value: "maritime", label: "Maritime" },
  { value: "aerien", label: "Aérien" },
  { value: "a_preciser", label: "À préciser" },
];

export const statusInfo = (s: string) =>
  PARCEL_STATUSES.find((x) => x.value === s) ?? PARCEL_STATUSES[0];

export const modeLabel = (m: string) =>
  PARCEL_MODES.find((x) => x.value === m)?.label ?? m;

export const isParcelStatus = (s: unknown): s is ParcelStatus =>
  PARCEL_STATUSES.some((x) => x.value === s);

export const isParcelMode = (m: unknown): m is ParcelMode =>
  PARCEL_MODES.some((x) => x.value === m);

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

export function matriculeFor(clientCode: string, n: number): string {
  return `${clientCode}-${String(n).padStart(2, "0")}`;
}

export function trackingUrl(code: string): string {
  return `https://www.tracolibusiness.com/suivre?ref=${encodeURIComponent(code)}`;
}

/** Message WhatsApp prêt à envoyer au client. */
export function clientMessage(name: string, code: string, parcels: number): string {
  return (
    `Bonjour ${name},\n\n` +
    `Votre code de suivi TRACOLI est : ${code}\n` +
    (parcels > 0 ? `Il concerne ${parcels} colis. ` : "") +
    `Suivez la position de vos colis à tout moment ici :\n` +
    `${trackingUrl(code)}\n\n` +
    `TRACOLI Supply Chain`
  );
}
