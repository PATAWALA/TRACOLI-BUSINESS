export const ABOUT_TEAM = [
  {
    id: "hope",
    name: "Mr Hope",
    role: { fr: "Responsable Marketing & Service Client", en: "Marketing & Customer Service Manager" },
    bio: { fr: "Votre point de contact unique pour toute demande de sourcing, de fret ou de suivi. Joignable directement sur WhatsApp.", en: "Your single point of contact for any sourcing, freight or tracking request. Reachable directly on WhatsApp." },
    location: "Bujumbura, Burundi",
    featured: true,
  },
  {
    id: "china-ops",
    name: { fr: "Équipe opérations Chine", en: "China Operations Team" },
    role: { fr: "Guangzhou & Yiwu", en: "Guangzhou & Yiwu" },
    bio: { fr: "Acheteurs, contrôleurs qualité et logisticiens sur le terrain en Chine. Ils vérifient chaque colis avant expédition.", en: "Buyers, quality controllers and logistics operators on the ground in China. They verify every parcel before shipment." },
    location: "China",
    featured: false,
  },
  {
    id: "customs-team",
    name: { fr: "Équipe transit Afrique", en: "Africa Transit Team" },
    role: { fr: "Dédouanement & livraison", en: "Customs clearance & delivery" },
    bio: { fr: "Nos transitaires agréés gèrent les formalités douanières à Kinshasa, Goma, Bujumbura et Mombasa.", en: "Our licensed freight forwarders handle customs formalities in Kinshasa, Goma, Bujumbura and Mombasa." },
    location: "Africa",
    featured: false,
  },
] as const;