export type ProductCategory = {
  id: string;
  slug: string;
  label: string;
  tagline: string;
  image: string;
  icon: string;
  subCategories: string[];
  accent: "primary" | "dark" | "light";
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "mode", slug: "mode", label: "Mode & Habillement", tagline: "Vêtements, chaussures, sacs, accessoires",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=800&fit=crop&q=80",
    icon: "shirt", subCategories: ["Vêtements femme", "Vêtements homme", "Chaussures", "Sacs", "Bijoux"], accent: "primary",
  },
  {
    id: "electronics", slug: "electronics", label: "Électronique & Tech", tagline: "Téléphones, accessoires, écouteurs, gadgets",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=800&fit=crop&q=80",
    icon: "smartphone", subCategories: ["Smartphones", "Accessoires téléphone", "Audio", "Ordinateurs", "LED & Éclairage"], accent: "dark",
  },
  {
    id: "maison", slug: "maison", label: "Maison & Cuisine", tagline: "Décoration, ustensiles, mobilier",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop&q=80",
    icon: "home", subCategories: ["Cuisine", "Décoration", "Rangement", "Textile maison", "Électroménager"], accent: "light",
  },
  {
    id: "cosmetics", slug: "cosmetics", label: "Beauté & Cosmétiques", tagline: "Soins, maquillage, parfums, extensions",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop&q=80",
    icon: "sparkles", subCategories: ["Soins visage", "Maquillage", "Parfums", "Cheveux", "Ongles"], accent: "primary",
  },
  {
    id: "machinery", slug: "machinery", label: "Machines & Industriel", tagline: "Équipements, outils, machines-outils",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=800&fit=crop&q=80",
    icon: "cog", subCategories: ["Machines industrielles", "Outils", "Équipements agricoles", "Générateurs", "Pièces détachées"], accent: "dark",
  },
  {
    id: "auto", slug: "auto", label: "Auto & Moto", tagline: "Pièces, accessoires, équipements",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=800&fit=crop&q=80",
    icon: "car", subCategories: ["Pièces moteur", "Accessoires intérieur", "Éclairage", "Pneus & jantes", "Outils diagnostic"], accent: "light",
  },
];
