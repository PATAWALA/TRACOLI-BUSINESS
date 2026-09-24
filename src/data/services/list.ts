import { Search, ShieldCheck, Plane, FileCheck2 } from "lucide-react";
import type { Service } from "../shared/types";

export const SERVICES: Service[] = [
  {
    id: "sourcing",
    icon: Search,
    title: { fr: "Sourcing & Négociation", en: "Sourcing & Negotiation" },
    description: {
      fr: "Recherche de produits de qualité en Chine et négociation des meilleurs prix.",
      en: "Identification of quality products in China and negotiation of the best prices.",
    },
    features: {
      fr: ["Identification de fournisseurs qualifiés", "Négociation tarifaire et contractuelle", "Échantillonnage avant commande", "Suivi de production en usine"],
      en: ["Identification of qualified suppliers", "Pricing and contract negotiation", "Pre-order sampling", "On-site production follow-up"],
    },
  },
  {
    id: "inspection",
    icon: ShieldCheck,
    title: { fr: "Inspection & Conformité", en: "Inspection & Compliance" },
    description: {
      fr: "Vérification stricte des usines et contrôle qualité avant expédition.",
      en: "Strict factory verification and quality control prior to shipment.",
    },
    features: {
      fr: ["Audit des unités de production", "Contrôle qualité systématique", "Rapport photo et vidéo détaillé", "Conformité aux normes d'exportation"],
      en: ["Production facility audits", "Systematic quality control", "Detailed photo and video reporting", "Export standards compliance"],
    },
  },
  {
    id: "freight",
    icon: Plane,
    title: { fr: "Fret International", en: "International Freight" },
    description: {
      fr: "Solutions de transport aérien et maritime adaptées à vos volumes.",
      en: "Air and sea transport solutions tailored to your volumes.",
    },
    features: {
      fr: ["Fret aérien express", "Fret maritime LCL et FCL", "Groupage mutualisé", "Entreposage sécurisé en Chine"],
      en: ["Air express freight", "Sea freight LCL and FCL", "Consolidated groupage", "Secure warehousing in China"],
    },
  },
  {
    id: "customs",
    icon: FileCheck2,
    title: { fr: "Dédouanement & Livraison", en: "Customs Clearance & Delivery" },
    description: {
      fr: "Prise en charge complète des formalités douanières jusqu'à la destination finale.",
      en: "Full handling of customs formalities through to final destination.",
    },
    features: {
      fr: ["Préparation des documents douaniers", "Paiement des taxes et droits", "Dédouanement portuaire et aéroportuaire", "Livraison jusqu'à votre entrepôt"],
      en: ["Customs documentation preparation", "Payment of duties and taxes", "Port and airport clearance", "Delivery to your warehouse"],
    },
  },
];