import type { LucideIcon } from "lucide-react";

/* ---------- Options de formulaire ---------- */
export type Option = { value: string; label: string };

/* ---------- Services ---------- */
export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceDetail = {
  slug: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  hero: string;
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  includes: string[];
  benefits: string[];
  faq: ServiceFaq[];
  stat: {
    value: string;
    label: string;
  };
};

/* ---------- Destinations ---------- */
export type DestinationCountry = {
  id: string;
  country: string;
  code: string;
  cities: { id: string; name: string }[];
  airFactor: number;
  seaFactor: number;
};

export type FlatDestination = {
  id: string;
  city: string;
  country: string;
  code: string;
  airFactor: number;
  seaFactor: number;
};

/* ---------- Stats & Processus ---------- */
export type Stat = {
  value: string;
  label: string;
  sublabel: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  meta: string;
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
  imageAlt: string;
  title: string;
  description: string;
  longDescription: string;
  level: string;
  meta: string;
  format: string;
  price?: string;
  badge?: string;
  outcomes: string[];
  audience: string[];
  chapters: {
    title: string;
    items: string[];
  }[];
};

/* ---------- Navigation ---------- */
export type NavLink = { label: string; href: string };

/* ---------- Simulation ---------- */
export type ShippingMode = "air" | "sea";
