import type { LucideIcon } from "lucide-react";

/* ---------- Locale ---------- */
export type Locale = "fr" | "en";

/* ---------- Types utilitaires ---------- */
export type Bilingual = { fr: string; en: string };
export type BilingualList = { fr: string[]; en: string[] };

/* ---------- Options de formulaire ---------- */
export type Option = { value: string; label: Bilingual };

/* ---------- Services ---------- */
export type Service = {
  id: string;
  icon: LucideIcon;
  title: Bilingual;
  description: Bilingual;
  features: BilingualList;
};

export type ServiceFaq = {
  question: Bilingual;
  answer: Bilingual;
};

export type ServiceDetail = {
  slug: string;
  icon: LucideIcon;
  title: Bilingual;
  subtitle: Bilingual;
  description: Bilingual;
  hero: Bilingual;
  processSteps: {
    step: string;
    title: Bilingual;
    description: Bilingual;
  }[];
  includes: BilingualList;
  benefits: BilingualList;
  faq: ServiceFaq[];
  stat: {
    value: string;
    label: Bilingual;
  };
};

/* ---------- Destinations ---------- */
export type DestinationCountry = {
  id: string;
  country: Bilingual;
  code: string;
  cities: { id: string; name: string }[];
  airFactor: number;
  seaFactor: number;
};

export type FlatDestination = {
  id: string;
  city: string;
  countryFr: string;
  countryEn: string;
  code: string;
  airFactor: number;
  seaFactor: number;
};

/* ---------- Stats & Processus ---------- */
export type Stat = {
  value: string;
  label: Bilingual;
  sublabel: Bilingual;
};

export type ProcessStep = {
  step: string;
  title: Bilingual;
  description: Bilingual;
  meta: Bilingual;
};

/* ---------- Ressources ---------- */
export type ResourceType = "guide" | "ebook" | "formation" | "template";
export type ResourceAccess = "free" | "premium";

export type Resource = {
  id: string;
  slug: string;
  type: ResourceType;
  access: ResourceAccess;
  image: string;
  imageAlt: Bilingual;
  title: Bilingual;
  description: Bilingual;
  longDescription: Bilingual;
  level: Bilingual;
  meta: Bilingual;
  format: Bilingual;
  price?: string;
  badge?: Bilingual;
  outcomes: BilingualList;
  audience: BilingualList;
  chapters: {
    title: Bilingual;
    items: BilingualList;
  }[];
};

/* ---------- Navigation ---------- */
export type NavLink = { label: Bilingual; href: string };

/* ---------- Simulation ---------- */
export type ShippingMode = "air" | "sea";