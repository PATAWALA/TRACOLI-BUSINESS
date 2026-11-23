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

/**
 * Étapes telles que le client les lit : mots simples, une phrase par étape.
 * Même ordre et mêmes valeurs que PARCEL_STATUSES (l'admin garde ses libellés).
 */
export const CLIENT_STEPS: { value: ParcelStatus; label: string; detail: string }[] = [
  { value: "en_agence", label: "À l'agence", detail: "Votre colis est reçu à l'agence TRACOLI. Il attend son départ." },
  { value: "expedie", label: "Parti", detail: "Votre colis vient de quitter l'agence." },
  { value: "en_transit", label: "En voyage", detail: "Votre colis voyage vers votre pays." },
  { value: "douane", label: "En douane", detail: "Votre colis est arrivé dans votre pays. Les formalités de douane sont en cours." },
  { value: "livre", label: "Disponible", detail: "Votre colis est prêt. Vous pouvez venir le récupérer." },
];

/** Avancement d'un colis : position (0 à 4) et pourcentage (20, 40, 60, 80, 100). */
export function parcelProgress(status: string) {
  const found = CLIENT_STEPS.findIndex((x) => x.value === status);
  const index = found < 0 ? 0 : found;
  return {
    index,
    step: index + 1,
    total: CLIENT_STEPS.length,
    percent: Math.round(((index + 1) / CLIENT_STEPS.length) * 100),
  };
}

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

export function trackingUrl(code: string): string {
  return `https://www.tracolibusiness.com/suivre?ref=${encodeURIComponent(code)}`;
}


/** Message WhatsApp prêt à envoyer au client : un lien de suivi par colis codé. */
export function clientMessage(name: string, codes: string[]): string {
  const list = codes.length
    ? codes.map((c) => `• ${c} → ${trackingUrl(c)}`).join("\n")
    : "Les codes de vos colis vous seront communiqués très prochainement.";
  return (
    `Bonjour ${name},\n\n` +
    `Suivez vos colis TRACOLI à tout moment avec le code de chaque colis :\n\n` +
    `${list}\n\n` +
    `TRACOLI Supply Chain`
  );
}

/** Transforme un texte collé (une ligne par code, ou séparés par virgule/point-virgule) en liste de codes. */
export function parseCodes(text: string): string[] {
  return text
    .split(/[\r\n,;]+/)
    .map((c) => normalizeCode(c))
    .filter(Boolean);
}
