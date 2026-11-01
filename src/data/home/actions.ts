export const QUICK_ACTIONS_MOBILE = [
  {
    id: "source",
    emoji: "🔎",
    title: "Je veux sourcer un produit",
    description: "Vous avez un produit en tête ? Envoyez-nous une photo ou un lien.",
    cta: "Commencer",
    href: "#sourcing",
  },
  {
    id: "ship",
    emoji: "🚢",
    title: "Je veux expédier une marchandise",
    description: "Déjà acheté ? Estimez votre transport Chine → Afrique.",
    cta: "Estimer",
    href: "#logistique",
  },
  {
    id: "track",
    emoji: "📍",
    title: "Je veux suivre un colis",
    description: "Consultez l'avancement de votre marchandise.",
    cta: "Suivre",
    href: "#tracking",
  },
] as const;
