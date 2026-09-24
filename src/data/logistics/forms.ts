import type { Option } from "../shared/types";

export const GOODS_TYPES: Option[] = [
  { value: "general",     label: { fr: "Marchandises générales",              en: "General goods" } },
  { value: "electronics", label: { fr: "Électronique et téléphonie",          en: "Electronics and telecommunications" } },
  { value: "battery",     label: { fr: "Liquides, batteries, marchandises dangereuses", en: "Liquids, batteries, dangerous goods" } },
  { value: "machinery",   label: { fr: "Machines et équipements industriels", en: "Machinery and industrial equipment" } },
  { value: "textile",     label: { fr: "Textile, habillement, chaussures",    en: "Textile, apparel, footwear" } },
  { value: "cosmetics",   label: { fr: "Cosmétiques et produits de beauté",   en: "Cosmetics and beauty products" } },
];

export const URGENCY_LEVELS: Option[] = [
  { value: "urgent",   label: { fr: "Urgent (moins de 7 jours)", en: "Urgent (less than 7 days)" } },
  { value: "standard", label: { fr: "Standard (2 à 4 semaines)", en: "Standard (2 to 4 weeks)" } },
  { value: "eco",      label: { fr: "Économique (1 à 2 mois)",   en: "Economy (1 to 2 months)" } },
];

export const SHIPPING_MODES: Option[] = [
  { value: "air", label: { fr: "Fret aérien",   en: "Air freight" } },
  { value: "sea", label: { fr: "Fret maritime", en: "Sea freight" } },
];