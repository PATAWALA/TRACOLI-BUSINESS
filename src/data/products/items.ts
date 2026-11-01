export type Product = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  image: string;
  imageAlt: string;
  moq: string;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  currency: string;
  origin: string;
  featured: boolean;
  tags: string[];
};

export const PRODUCTS: Product[] = [
  { id: "womens-clothing", slug: "womens-clothing", name: "Vêtements femme", categorySlug: "mode", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop&q=80", imageAlt: "Vêtements femme en gros", moq: "50 pcs", priceRange: "2 $ – 12 $ / pièce", priceMin: 2, priceMax: 12, currency: "USD", origin: "Guangzhou", featured: true, tags: ["Stock disponible", "Design tendance"] },
  { id: "sneakers", slug: "sneakers", name: "Baskets mode", categorySlug: "mode", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&q=80", imageAlt: "Baskets mode en gros", moq: "60 paires", priceRange: "4 $ – 15 $ / paire", priceMin: 4, priceMax: 15, currency: "USD", origin: "Jinjiang", featured: true, tags: ["Personnalisable", "Qualité export"] },
  { id: "handbags", slug: "handbags", name: "Sacs à main", categorySlug: "mode", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop&q=80", imageAlt: "Sacs à main en gros", moq: "100 pcs", priceRange: "3 $ – 18 $ / pièce", priceMin: 3, priceMax: 18, currency: "USD", origin: "Guangzhou", featured: false, tags: ["Design varié"] },
  { id: "smartphone-accessories", slug: "smartphone-accessories", name: "Accessoires smartphone", categorySlug: "electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80", imageAlt: "Accessoires smartphone en gros", moq: "100 pcs", priceRange: "0,80 $ – 3,50 $ / pièce", priceMin: 0.8, priceMax: 3.5, currency: "USD", origin: "Shenzhen", featured: true, tags: ["Marque blanche", "OEM disponible"] },
  { id: "led-bulbs", slug: "led-bulbs", name: "Ampoules LED", categorySlug: "electronics", image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&h=600&fit=crop&q=80", imageAlt: "Ampoules LED en gros", moq: "500 pcs", priceRange: "0,40 $ – 1,20 $ / pièce", priceMin: 0.4, priceMax: 1.2, currency: "USD", origin: "Foshan", featured: true, tags: ["Certifié CE", "Basse consommation"] },
  { id: "bluetooth-earbuds", slug: "bluetooth-earbuds", name: "Écouteurs Bluetooth", categorySlug: "electronics", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop&q=80", imageAlt: "Écouteurs Bluetooth en gros", moq: "50 pcs", priceRange: "3 $ – 12 $ / pièce", priceMin: 3, priceMax: 12, currency: "USD", origin: "Shenzhen", featured: false, tags: ["Bluetooth 5.0", "Boîtier charge"] },
  { id: "solar-panels", slug: "solar-panels", name: "Panneaux solaires", categorySlug: "electronics", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=600&fit=crop&q=80", imageAlt: "Panneaux solaires en gros", moq: "10 unités", priceRange: "45 $ – 180 $ / unité", priceMin: 45, priceMax: 180, currency: "USD", origin: "Zhejiang", featured: true, tags: ["Haut rendement", "Pour l'Afrique"] },
  { id: "kitchen-utensils", slug: "kitchen-utensils", name: "Ustensiles de cuisine", categorySlug: "maison", image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&h=600&fit=crop&q=80", imageAlt: "Ustensiles cuisine en gros", moq: "200 pcs", priceRange: "0,50 $ – 4 $ / pièce", priceMin: 0.5, priceMax: 4, currency: "USD", origin: "Yiwu", featured: true, tags: ["Inox alimentaire", "Set complet"] },
  { id: "bedding-sets", slug: "bedding-sets", name: "Parures de lit", categorySlug: "maison", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop&q=80", imageAlt: "Parures de lit en gros", moq: "100 sets", priceRange: "3 $ – 12 $ / set", priceMin: 3, priceMax: 12, currency: "USD", origin: "Nantong", featured: false, tags: ["Coton premium", "Motifs variés"] },
  { id: "storage-boxes", slug: "storage-boxes", name: "Boîtes de rangement", categorySlug: "maison", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&q=80", imageAlt: "Boîtes de rangement en gros", moq: "300 pcs", priceRange: "0,80 $ – 5 $ / pièce", priceMin: 0.8, priceMax: 5, currency: "USD", origin: "Yiwu", featured: false, tags: ["Plastique résistant"] },
  { id: "cosmetics-kit", slug: "cosmetics-kit", name: "Kits cosmétiques", categorySlug: "cosmetics", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop&q=80", imageAlt: "Kits cosmétiques en gros", moq: "300 pcs", priceRange: "1 $ – 6 $ / pièce", priceMin: 1, priceMax: 6, currency: "USD", origin: "Guangzhou", featured: true, tags: ["Marque privée", "Formulation adaptée"] },
  { id: "hair-extensions", slug: "hair-extensions", name: "Extensions capillaires", categorySlug: "cosmetics", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop&q=80", imageAlt: "Extensions capillaires en gros", moq: "50 pcs", priceRange: "5 $ – 30 $ / pièce", priceMin: 5, priceMax: 30, currency: "USD", origin: "Xuchang", featured: true, tags: ["Naturel", "Couleurs variées"] },
  { id: "sewing-machine", slug: "sewing-machine", name: "Machines à coudre industrielles", categorySlug: "machinery", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop&q=80", imageAlt: "Machines à coudre industrielles", moq: "1 unité", priceRange: "Sur devis", priceMin: 200, priceMax: 1500, currency: "USD", origin: "Zhejiang", featured: false, tags: ["Installation possible", "Pièces dispo"] },
  { id: "generator", slug: "generator", name: "Générateurs électriques", categorySlug: "machinery", image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&h=600&fit=crop&q=80", imageAlt: "Générateurs électriques en gros", moq: "5 unités", priceRange: "180 $ – 1 200 $ / unité", priceMin: 180, priceMax: 1200, currency: "USD", origin: "Fujian", featured: true, tags: ["Diesel & essence", "Pour entreprises"] },
  { id: "car-led-lights", slug: "car-led-lights", name: "Éclairage LED auto", categorySlug: "auto", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=600&fit=crop&q=80", imageAlt: "Éclairage LED auto en gros", moq: "100 pcs", priceRange: "2 $ – 15 $ / pièce", priceMin: 2, priceMax: 15, currency: "USD", origin: "Guangzhou", featured: false, tags: ["Universel", "Installation facile"] },
  { id: "car-accessories", slug: "car-accessories", name: "Accessoires intérieur auto", categorySlug: "auto", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=600&fit=crop&q=80", imageAlt: "Accessoires auto intérieur", moq: "200 pcs", priceRange: "1 $ – 8 $ / pièce", priceMin: 1, priceMax: 8, currency: "USD", origin: "Guangzhou", featured: false, tags: ["Universel", "Design moderne"] },
];

export const getProductsByCategory = (slug: string): Product[] =>
  PRODUCTS.filter((p) => p.categorySlug === slug);

export const getFeaturedProducts = (): Product[] =>
  PRODUCTS.filter((p) => p.featured);
