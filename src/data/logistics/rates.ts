import type { ShippingMode } from "../shared/types";

export const FREIGHT_RATES: Record<
  ShippingMode,
  {
    min: number;
    max: number;
    unit: "kg" | "CBM";
    label: { fr: string; en: string };
    minQty: number;
    step: number;
    delay: { fr: string; en: string };
  }
> = {
  air: {
    min: 12, max: 15, unit: "kg",
    label: { fr: "Fret aérien express", en: "Air express freight" },
    minQty: 1, step: 0.5,
    delay: { fr: "5 à 8 jours", en: "5 to 8 days" },
  },
  sea: {
    min: 250, max: 320, unit: "CBM",
    label: { fr: "Fret maritime groupage", en: "Sea groupage freight" },
    minQty: 1, step: 1,
    delay: { fr: "35 à 45 jours", en: "35 to 45 days" },
  },
};