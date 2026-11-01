import type { ProcessStep } from "../shared/types";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Réception des marchandises en Chine",
    description: "Vos fournisseurs livrent directement dans nos entrepôts de Guangzhou ou Yiwu. Chaque colis est enregistré, étiqueté et confirmé.",
    meta: "Entreposage sécurisé",
  },
  {
    step: "02",
    title: "Contrôle et groupage",
    description: "Inspection visuelle, pesée, mesure du volume et vérification de conformité. Les colis sont consolidés pour optimiser le coût du fret.",
    meta: "Contrôle qualité",
  },
  {
    step: "03",
    title: "Expédition internationale",
    description: "Départ aérien ou maritime selon votre arbitrage coût/délai. Vous recevez le numéro de suivi et une mise à jour à chaque étape clé.",
    meta: "Suivi en temps réel",
  },
  {
    step: "04",
    title: "Dédouanement et livraison",
    description: "Notre équipe transit prend en charge les formalités douanières jusqu'à la destination finale. Vous recevez votre marchandise prête à la vente.",
    meta: "Porte-à-porte",
  },
];
