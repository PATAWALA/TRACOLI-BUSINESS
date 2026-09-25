export type Product = {
  id: string;
  slug: string;
  name: { fr: string; en: string };
  categorySlug: string;
  image: string;
  imageAlt: { fr: string; en: string };
  moq: string;
  priceRange: { fr: string; en: string };
  priceMin: number;
  priceMax: number;
  currency: string;
  origin: string;
  featured: boolean;
  tags: { fr: string[]; en: string[] };
};

export const PRODUCTS: Product[] = [
  /* ------------------------------------------------------------------ */
  /*  MODE                                                               */
  /* ------------------------------------------------------------------ */
  {
    id: "womens-clothing",
    slug: "womens-clothing",
    name: { fr: "Vêtements femme", en: "Women's clothing" },
    categorySlug: "mode",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Vêtements femme en gros", en: "Women's clothing wholesale" },
    moq: "50 pcs",
    priceRange: { fr: "2 $ – 12 $ / pièce", en: "$2 – $12 / pc" },
    priceMin: 2,
    priceMax: 12,
    currency: "USD",
    origin: "Guangzhou",
    featured: true,
    tags: {
      fr: ["Stock disponible", "Design tendance"],
      en: ["In stock", "Trendy design"],
    },
  },
  {
    id: "sneakers",
    slug: "sneakers",
    name: { fr: "Baskets mode", en: "Fashion sneakers" },
    categorySlug: "mode",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Baskets mode en gros", en: "Fashion sneakers wholesale" },
    moq: "60 paires",
    priceRange: { fr: "4 $ – 15 $ / paire", en: "$4 – $15 / pair" },
    priceMin: 4,
    priceMax: 15,
    currency: "USD",
    origin: "Jinjiang",
    featured: true,
    tags: {
      fr: ["Personnalisable", "Qualité export"],
      en: ["Customizable", "Export quality"],
    },
  },
  {
    id: "handbags",
    slug: "handbags",
    name: { fr: "Sacs à main", en: "Handbags" },
    categorySlug: "mode",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Sacs à main en gros", en: "Handbags wholesale" },
    moq: "100 pcs",
    priceRange: { fr: "3 $ – 18 $ / pièce", en: "$3 – $18 / pc" },
    priceMin: 3,
    priceMax: 18,
    currency: "USD",
    origin: "Guangzhou",
    featured: false,
    tags: {
      fr: ["Design varié"],
      en: ["Various designs"],
    },
  },

  /* ------------------------------------------------------------------ */
  /*  ÉLECTRONIQUE                                                       */
  /* ------------------------------------------------------------------ */
  {
    id: "smartphone-accessories",
    slug: "smartphone-accessories",
    name: { fr: "Accessoires smartphone", en: "Smartphone accessories" },
    categorySlug: "electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Accessoires smartphone en gros", en: "Smartphone accessories wholesale" },
    moq: "100 pcs",
    priceRange: { fr: "0,80 $ – 3,50 $ / pièce", en: "$0.80 – $3.50 / pc" },
    priceMin: 0.8,
    priceMax: 3.5,
    currency: "USD",
    origin: "Shenzhen",
    featured: true,
    tags: {
      fr: ["Marque blanche", "OEM disponible"],
      en: ["White label", "OEM available"],
    },
  },
  {
    id: "led-bulbs",
    slug: "led-bulbs",
    name: { fr: "Ampoules LED", en: "LED bulbs" },
    categorySlug: "electronics",
    image:
      "https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Ampoules LED en gros", en: "LED bulbs wholesale" },
    moq: "500 pcs",
    priceRange: { fr: "0,40 $ – 1,20 $ / pièce", en: "$0.40 – $1.20 / pc" },
    priceMin: 0.4,
    priceMax: 1.2,
    currency: "USD",
    origin: "Foshan",
    featured: true,
    tags: {
      fr: ["Certifié CE", "Basse consommation"],
      en: ["CE certified", "Low power"],
    },
  },
  {
    id: "bluetooth-earbuds",
    slug: "bluetooth-earbuds",
    name: { fr: "Écouteurs Bluetooth", en: "Bluetooth earbuds" },
    categorySlug: "electronics",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Écouteurs Bluetooth en gros", en: "Bluetooth earbuds wholesale" },
    moq: "50 pcs",
    priceRange: { fr: "3 $ – 12 $ / pièce", en: "$3 – $12 / pc" },
    priceMin: 3,
    priceMax: 12,
    currency: "USD",
    origin: "Shenzhen",
    featured: false,
    tags: {
      fr: ["Bluetooth 5.0", "Boîtier charge"],
      en: ["Bluetooth 5.0", "Charging case"],
    },
  },
  {
    id: "solar-panels",
    slug: "solar-panels",
    name: { fr: "Panneaux solaires", en: "Solar panels" },
    categorySlug: "electronics",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Panneaux solaires en gros", en: "Solar panels wholesale" },
    moq: "10 unités",
    priceRange: { fr: "45 $ – 180 $ / unité", en: "$45 – $180 / unit" },
    priceMin: 45,
    priceMax: 180,
    currency: "USD",
    origin: "Zhejiang",
    featured: true,
    tags: {
      fr: ["Haut rendement", "Pour l'Afrique"],
      en: ["High yield", "For Africa"],
    },
  },

  /* ------------------------------------------------------------------ */
  /*  MAISON                                                             */
  /* ------------------------------------------------------------------ */
  {
    id: "kitchen-utensils",
    slug: "kitchen-utensils",
    name: { fr: "Ustensiles de cuisine", en: "Kitchen utensils" },
    categorySlug: "maison",
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Ustensiles cuisine en gros", en: "Kitchen utensils wholesale" },
    moq: "200 pcs",
    priceRange: { fr: "0,50 $ – 4 $ / pièce", en: "$0.50 – $4 / pc" },
    priceMin: 0.5,
    priceMax: 4,
    currency: "USD",
    origin: "Yiwu",
    featured: true,
    tags: {
      fr: ["Inox alimentaire", "Set complet"],
      en: ["Food-grade steel", "Full set"],
    },
  },
  {
    id: "bedding-sets",
    slug: "bedding-sets",
    name: { fr: "Parures de lit", en: "Bedding sets" },
    categorySlug: "maison",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Parures de lit en gros", en: "Bedding sets wholesale" },
    moq: "100 sets",
    priceRange: { fr: "3 $ – 12 $ / set", en: "$3 – $12 / set" },
    priceMin: 3,
    priceMax: 12,
    currency: "USD",
    origin: "Nantong",
    featured: false,
    tags: {
      fr: ["Coton premium", "Motifs variés"],
      en: ["Premium cotton", "Various patterns"],
    },
  },
  {
    id: "storage-boxes",
    slug: "storage-boxes",
    name: { fr: "Boîtes de rangement", en: "Storage boxes" },
    categorySlug: "maison",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Boîtes de rangement en gros", en: "Storage boxes wholesale" },
    moq: "300 pcs",
    priceRange: { fr: "0,80 $ – 5 $ / pièce", en: "$0.80 – $5 / pc" },
    priceMin: 0.8,
    priceMax: 5,
    currency: "USD",
    origin: "Yiwu",
    featured: false,
    tags: {
      fr: ["Plastique résistant"],
      en: ["Durable plastic"],
    },
  },

  /* ------------------------------------------------------------------ */
  /*  COSMÉTIQUES                                                        */
  /* ------------------------------------------------------------------ */
  {
    id: "cosmetics-kit",
    slug: "cosmetics-kit",
    name: { fr: "Kits cosmétiques", en: "Cosmetics kits" },
    categorySlug: "cosmetics",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Kits cosmétiques en gros", en: "Cosmetics kits wholesale" },
    moq: "300 pcs",
    priceRange: { fr: "1 $ – 6 $ / pièce", en: "$1 – $6 / pc" },
    priceMin: 1,
    priceMax: 6,
    currency: "USD",
    origin: "Guangzhou",
    featured: true,
    tags: {
      fr: ["Marque privée", "Formulation adaptée"],
      en: ["Private label", "Custom formula"],
    },
  },
  {
    id: "hair-extensions",
    slug: "hair-extensions",
    name: { fr: "Extensions capillaires", en: "Hair extensions" },
    categorySlug: "cosmetics",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Extensions capillaires en gros", en: "Hair extensions wholesale" },
    moq: "50 pcs",
    priceRange: { fr: "5 $ – 30 $ / pièce", en: "$5 – $30 / pc" },
    priceMin: 5,
    priceMax: 30,
    currency: "USD",
    origin: "Xuchang",
    featured: true,
    tags: {
      fr: ["Naturel", "Couleurs variées"],
      en: ["Natural", "Various colors"],
    },
  },

  /* ------------------------------------------------------------------ */
  /*  MACHINES                                                           */
  /* ------------------------------------------------------------------ */
  {
    id: "sewing-machine",
    slug: "sewing-machine",
    name: { fr: "Machines à coudre industrielles", en: "Industrial sewing machines" },
    categorySlug: "machinery",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Machines à coudre industrielles", en: "Industrial sewing machines" },
    moq: "1 unité",
    priceRange: { fr: "Sur devis", en: "On request" },
    priceMin: 200,
    priceMax: 1500,
    currency: "USD",
    origin: "Zhejiang",
    featured: false,
    tags: {
      fr: ["Installation possible", "Pièces dispo"],
      en: ["Installation possible", "Parts available"],
    },
  },
  {
    id: "generator",
    slug: "generator",
    name: { fr: "Générateurs électriques", en: "Power generators" },
    categorySlug: "machinery",
    image:
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Générateurs électriques en gros", en: "Power generators wholesale" },
    moq: "5 unités",
    priceRange: { fr: "180 $ – 1 200 $ / unité", en: "$180 – $1,200 / unit" },
    priceMin: 180,
    priceMax: 1200,
    currency: "USD",
    origin: "Fujian",
    featured: true,
    tags: {
      fr: ["Diesel & essence", "Pour entreprises"],
      en: ["Diesel & gasoline", "For businesses"],
    },
  },

  /* ------------------------------------------------------------------ */
  /*  AUTO                                                               */
  /* ------------------------------------------------------------------ */
  {
    id: "car-led-lights",
    slug: "car-led-lights",
    name: { fr: "Éclairage LED auto", en: "Car LED lighting" },
    categorySlug: "auto",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Éclairage LED auto en gros", en: "Car LED lighting wholesale" },
    moq: "100 pcs",
    priceRange: { fr: "2 $ – 15 $ / pièce", en: "$2 – $15 / pc" },
    priceMin: 2,
    priceMax: 15,
    currency: "USD",
    origin: "Guangzhou",
    featured: false,
    tags: {
      fr: ["Universel", "Installation facile"],
      en: ["Universal", "Easy install"],
    },
  },
  {
    id: "car-accessories",
    slug: "car-accessories",
    name: { fr: "Accessoires intérieur auto", en: "Car interior accessories" },
    categorySlug: "auto",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=600&fit=crop&q=80",
    imageAlt: { fr: "Accessoires auto intérieur", en: "Car interior accessories" },
    moq: "200 pcs",
    priceRange: { fr: "1 $ – 8 $ / pièce", en: "$1 – $8 / pc" },
    priceMin: 1,
    priceMax: 8,
    currency: "USD",
    origin: "Guangzhou",
    featured: false,
    tags: {
      fr: ["Universel", "Design moderne"],
      en: ["Universal", "Modern design"],
    },
  },
];

/** Récupère les produits par catégorie. */
export const getProductsByCategory = (slug: string): Product[] =>
  PRODUCTS.filter((p) => p.categorySlug === slug);

/** Récupère les produits mis en avant. */
export const getFeaturedProducts = (): Product[] =>
  PRODUCTS.filter((p) => p.featured);