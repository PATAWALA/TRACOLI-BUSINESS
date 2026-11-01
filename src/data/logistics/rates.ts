import type { ShippingMode } from "../shared/types";

export const FREIGHT_RATES: Record<
  ShippingMode,
  {
    min: number;
    max: number;
    unit: "kg" | "CBM";
    label: string;
    minQty: number;
    step: number;
    delay: string;
  }
> = {
  air: {
    min: 12, max: 15, unit: "kg",
    label: "Fret aérien express",
    minQty: 1, step: 0.5,
    delay: "5 à 8 jours",
  },
  sea: {
    min: 250, max: 320, unit: "CBM",
    label: "Fret maritime groupage",
    minQty: 1, step: 1,
    delay: "35 à 45 jours",
  },
};
