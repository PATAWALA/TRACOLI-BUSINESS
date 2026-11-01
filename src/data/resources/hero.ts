export const RESOURCES_HERO = {
  eyebrow: "Ressources",
  title: "Apprenez à importer de Chine comme un professionnel",
  subtitle:
    "Guides pratiques, ebooks et formations conçus par nos équipes sur le terrain. Que vous soyez débutant ou importateur confirmé, trouvez les outils pour structurer votre activité.",
} as const;

export const RESOURCE_FILTERS = [
  { value: "all",       label: "Toutes les ressources" },
  { value: "guide",     label: "Guides gratuits" },
  { value: "ebook",     label: "Ebooks premium" },
  { value: "formation", label: "Formations" },
] as const;
