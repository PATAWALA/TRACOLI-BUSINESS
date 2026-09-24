export type Product = {
  id: string;
  name: { fr: string; en: string };
  category: string;
  image: string;
  moq: string;
  priceRange: { fr: string; en: string };
  origin: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "smartphone-accessories",
    name: { fr: "Accessoires smartphone", en: "Smartphone accessories" },
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&q=80",
    moq: "100 pcs",
    priceRange: { fr: "0,80 $ – 3,50 $ / pièce", en: "$0.80 – $3.50 / pc" },
    origin: "Shenzhen",
  },
  {
    id: "led-bulbs",
    name: { fr: "Ampoules LED", en: "LED bulbs" },
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&h=800&fit=crop&q=80",
    moq: "500 pcs",
    priceRange: { fr: "0,40 $ – 1,20 $ / pièce", en: "$0.40 – $1.20 / pc" },
    origin: "Foshan",
  },
  {
    id: "womens-clothing",
    name: { fr: "Vêtements femme", en: "Women's clothing" },
    category: "mode",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=800&fit=crop&q=80",
    moq: "50 pcs",
    priceRange: { fr: "2 $ – 12 $ / pièce", en: "$2 – $12 / pc" },
    origin: "Guangzhou",
  },
  {
    id: "sneakers",
    name: { fr: "Baskets mode", en: "Fashion sneakers" },
    category: "mode",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop&q=80",
    moq: "60 paires",
    priceRange: { fr: "4 $ – 15 $ / paire", en: "$4 – $15 / pair" },
    origin: "Jinjiang",
  },
  {
    id: "kitchen-utensils",
    name: { fr: "Ustensiles de cuisine", en: "Kitchen utensils" },
    category: "maison",
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&h=800&fit=crop&q=80",
    moq: "200 pcs",
    priceRange: { fr: "0,50 $ – 4 $ / pièce", en: "$0.50 – $4 / pc" },
    origin: "Yiwu",
  },
  {
    id: "bedding-sets",
    name: { fr: "Parures de lit", en: "Bedding sets" },
    category: "maison",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=800&fit=crop&q=80",
    moq: "100 sets",
    priceRange: { fr: "3 $ – 12 $ / set", en: "$3 – $12 / set" },
    origin: "Nantong",
  },
  {
    id: "cosmetics-kit",
    name: { fr: "Kits cosmétiques", en: "Cosmetics kits" },
    category: "cosmetics",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop&q=80",
    moq: "300 pcs",
    priceRange: { fr: "1 $ – 6 $ / pièce", en: "$1 – $6 / pc" },
    origin: "Guangzhou",
  },
  {
    id: "hair-extensions",
    name: { fr: "Extensions capillaires", en: "Hair extensions" },
    category: "cosmetics",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop&q=80",
    moq: "50 pcs",
    priceRange: { fr: "5 $ – 30 $ / pièce", en: "$5 – $30 / pc" },
    origin: "Xuchang",
  },
  {
    id: "small-machinery",
    name: { fr: "Petites machines", en: "Small machinery" },
    category: "machinery",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=800&fit=crop&q=80",
    moq: "1 unité",
    priceRange: { fr: "Sur devis", en: "On request" },
    origin: "Zhejiang",
  },
];