export const RESOURCES_HERO = {
  eyebrow: { fr: "Ressources", en: "Resources" },
  title: {
    fr: "Apprenez à importer de Chine comme un professionnel",
    en: "Learn to import from China like a professional",
  },
  subtitle: {
    fr: "Guides pratiques, ebooks et formations conçus par nos équipes sur le terrain. Que vous soyez débutant ou importateur confirmé, trouvez les outils pour structurer votre activité.",
    en: "Practical guides, ebooks and training designed by our field teams. Whether you are a beginner or a seasoned importer, find the tools to structure your business.",
  },
} as const;

export const RESOURCE_FILTERS = [
  { value: "all",       label: { fr: "Toutes les ressources", en: "All resources" } },
  { value: "guide",     label: { fr: "Guides gratuits",       en: "Free guides" } },
  { value: "ebook",     label: { fr: "Ebooks premium",        en: "Premium ebooks" } },
  { value: "formation", label: { fr: "Formations",            en: "Training" } },
] as const;