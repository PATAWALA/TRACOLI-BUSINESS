import type { ProcessStep } from "../shared/types";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: { fr: "Réception des marchandises en Chine", en: "Goods receipt in China" },
    description: {
      fr: "Vos fournisseurs livrent directement dans nos entrepôts de Guangzhou ou Yiwu. Chaque colis est enregistré, étiqueté et confirmé.",
      en: "Your suppliers deliver directly to our warehouses in Guangzhou or Yiwu. Every parcel is registered, labelled and confirmed.",
    },
    meta: { fr: "Entreposage sécurisé", en: "Secure warehousing" },
  },
  {
    step: "02",
    title: { fr: "Contrôle et groupage", en: "Inspection and consolidation" },
    description: {
      fr: "Inspection visuelle, pesée, mesure du volume et vérification de conformité. Les colis sont consolidés pour optimiser le coût du fret.",
      en: "Visual inspection, weighing, volume measurement and compliance verification. Parcels are consolidated to optimize freight cost.",
    },
    meta: { fr: "Contrôle qualité", en: "Quality control" },
  },
  {
    step: "03",
    title: { fr: "Expédition internationale", en: "International shipment" },
    description: {
      fr: "Départ aérien ou maritime selon votre arbitrage coût/délai. Vous recevez le numéro de suivi et une mise à jour à chaque étape clé.",
      en: "Air or sea departure based on your cost/delay trade-off. You receive the tracking number and an update at every key milestone.",
    },
    meta: { fr: "Suivi en temps réel", en: "Real-time tracking" },
  },
  {
    step: "04",
    title: { fr: "Dédouanement et livraison", en: "Customs clearance and delivery" },
    description: {
      fr: "Notre équipe transit prend en charge les formalités douanières jusqu'à la destination finale. Vous recevez votre marchandise prête à la vente.",
      en: "Our transit team handles customs formalities through to the final destination. You receive your goods ready for sale.",
    },
    meta: { fr: "Porte-à-porte", en: "Door-to-door" },
  },
];