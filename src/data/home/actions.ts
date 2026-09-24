export const QUICK_ACTIONS_MOBILE = [
  {
    id: "source",
    emoji: "🔎",
    title: { fr: "Je veux sourcer un produit", en: "I want to source a product" },
    description: {
      fr: "Vous avez un produit en tête ? Envoyez-nous une photo ou un lien.",
      en: "Got a product in mind? Send us a photo or link.",
    },
    cta: { fr: "Commencer", en: "Start" },
    href: "#sourcing",
  },
  {
    id: "ship",
    emoji: "🚢",
    title: { fr: "Je veux expédier une marchandise", en: "I want to ship goods" },
    description: {
      fr: "Déjà acheté ? Estimez votre transport Chine → Afrique.",
      en: "Already purchased? Estimate your China → Africa transport.",
    },
    cta: { fr: "Estimer", en: "Estimate" },
    href: "#logistique",
  },
  {
    id: "track",
    emoji: "📍",
    title: { fr: "Je veux suivre un colis", en: "I want to track a shipment" },
    description: {
      fr: "Consultez l'avancement de votre marchandise.",
      en: "Check your goods' progress.",
    },
    cta: { fr: "Suivre", en: "Track" },
    href: "#tracking",
  },
] as const;