export type ProductCategory = {
  id: string;
  slug: string;
  label: { fr: string; en: string };
  tagline: { fr: string; en: string };
  image: string;
  icon: string;
  productCount: number;
  subCategories: { fr: string[]; en: string[] };
  accent: "primary" | "dark" | "light";
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "mode",
    slug: "mode",
    label: { fr: "Mode & Habillement", en: "Fashion & Apparel" },
    tagline: {
      fr: "Vêtements, chaussures, sacs, accessoires",
      en: "Clothing, shoes, bags, accessories",
    },
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=800&fit=crop&q=80",
    icon: "shirt",
    productCount: 342,
    subCategories: {
      fr: ["Vêtements femme", "Vêtements homme", "Chaussures", "Sacs", "Bijoux"],
      en: ["Women's clothing", "Men's clothing", "Shoes", "Bags", "Jewelry"],
    },
    accent: "primary",
  },
  {
    id: "electronics",
    slug: "electronics",
    label: { fr: "Électronique & Tech", en: "Electronics & Tech" },
    tagline: {
      fr: "Téléphones, accessoires, écouteurs, gadgets",
      en: "Phones, accessories, earbuds, gadgets",
    },
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=800&fit=crop&q=80",
    icon: "smartphone",
    productCount: 528,
    subCategories: {
      fr: ["Smartphones", "Accessoires téléphone", "Audio", "Ordinateurs", "LED & Éclairage"],
      en: ["Smartphones", "Phone accessories", "Audio", "Computers", "LED & Lighting"],
    },
    accent: "dark",
  },
  {
    id: "maison",
    slug: "maison",
    label: { fr: "Maison & Cuisine", en: "Home & Kitchen" },
    tagline: {
      fr: "Décoration, ustensiles, mobilier",
      en: "Decor, kitchenware, furniture",
    },
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop&q=80",
    icon: "home",
    productCount: 267,
    subCategories: {
      fr: ["Cuisine", "Décoration", "Rangement", "Textile maison", "Électroménager"],
      en: ["Kitchen", "Decor", "Storage", "Home textile", "Appliances"],
    },
    accent: "light",
  },
  {
    id: "cosmetics",
    slug: "cosmetics",
    label: { fr: "Beauté & Cosmétiques", en: "Beauty & Cosmetics" },
    tagline: {
      fr: "Soins, maquillage, parfums, extensions",
      en: "Skincare, makeup, perfumes, extensions",
    },
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop&q=80",
    icon: "sparkles",
    productCount: 194,
    subCategories: {
      fr: ["Soins visage", "Maquillage", "Parfums", "Cheveux", "Ongles"],
      en: ["Face care", "Makeup", "Perfumes", "Hair", "Nails"],
    },
    accent: "primary",
  },
  {
    id: "machinery",
    slug: "machinery",
    label: { fr: "Machines & Industriel", en: "Machinery & Industrial" },
    tagline: {
      fr: "Équipements, outils, machines-outils",
      en: "Equipment, tools, machine tools",
    },
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=800&fit=crop&q=80",
    icon: "cog",
    productCount: 89,
    subCategories: {
      fr: ["Machines industrielles", "Outils", "Équipements agricoles", "Générateurs", "Pièces détachées"],
      en: ["Industrial machines", "Tools", "Agricultural equipment", "Generators", "Spare parts"],
    },
    accent: "dark",
  },
  {
    id: "auto",
    slug: "auto",
    label: { fr: "Auto & Moto", en: "Auto & Moto" },
    tagline: {
      fr: "Pièces, accessoires, équipements",
      en: "Parts, accessories, equipment",
    },
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=800&fit=crop&q=80",
    icon: "car",
    productCount: 156,
    subCategories: {
      fr: ["Pièces moteur", "Accessoires intérieur", "Éclairage", "Pneus & jantes", "Outils diagnostic"],
      en: ["Engine parts", "Interior accessories", "Lighting", "Tires & rims", "Diagnostic tools"],
    },
    accent: "light",
  },
];