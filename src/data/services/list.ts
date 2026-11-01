import { Search, ShieldCheck, Plane, FileCheck2 } from "lucide-react";
import type { Service } from "../shared/types";

export const SERVICES: Service[] = [
  {
    id: "sourcing",
    icon: Search,
    title: "Sourcing & Négociation",
    description: "Recherche de produits de qualité en Chine et négociation des meilleurs prix.",
    features: [
      "Identification de fournisseurs qualifiés",
      "Négociation tarifaire et contractuelle",
      "Échantillonnage avant commande",
      "Suivi de production en usine",
    ],
  },
  {
    id: "inspection",
    icon: ShieldCheck,
    title: "Inspection & Conformité",
    description: "Vérification stricte des usines et contrôle qualité avant expédition.",
    features: [
      "Audit des unités de production",
      "Contrôle qualité systématique",
      "Rapport photo et vidéo détaillé",
      "Conformité aux normes d'exportation",
    ],
  },
  {
    id: "freight",
    icon: Plane,
    title: "Fret International",
    description: "Solutions de transport aérien et maritime adaptées à vos volumes.",
    features: [
      "Fret aérien express",
      "Fret maritime LCL et FCL",
      "Groupage mutualisé",
      "Entreposage sécurisé en Chine",
    ],
  },
  {
    id: "customs",
    icon: FileCheck2,
    title: "Dédouanement & Livraison",
    description: "Prise en charge complète des formalités douanières jusqu'à la destination finale.",
    features: [
      "Préparation des documents douaniers",
      "Paiement des taxes et droits",
      "Dédouanement portuaire et aéroportuaire",
      "Livraison jusqu'à votre entrepôt",
    ],
  },
];
