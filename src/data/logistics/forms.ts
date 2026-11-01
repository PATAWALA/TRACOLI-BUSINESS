import type { Option } from "../shared/types";

export const GOODS_TYPES: Option[] = [
  { value: "general",     label: "Marchandises générales" },
  { value: "electronics", label: "Électronique et téléphonie" },
  { value: "battery",     label: "Liquides, batteries, marchandises dangereuses" },
  { value: "machinery",   label: "Machines et équipements industriels" },
  { value: "textile",     label: "Textile, habillement, chaussures" },
  { value: "cosmetics",   label: "Cosmétiques et produits de beauté" },
];

export const URGENCY_LEVELS: Option[] = [
  { value: "urgent",   label: "Urgent (moins de 7 jours)" },
  { value: "standard", label: "Standard (2 à 4 semaines)" },
  { value: "eco",      label: "Économique (1 à 2 mois)" },
];

export const SHIPPING_MODES: Option[] = [
  { value: "air", label: "Fret aérien" },
  { value: "sea", label: "Fret maritime" },
];
