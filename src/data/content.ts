import { Plane, Ship, Search, type LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  CONTACT & HELPERS                                                  */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  brand: "TRACOLI",
  brandFull: "TRACOLI BUSINESS",
  tagline: "Supply-Chain · Le pont entre la Chine et l'Afrique",
  promise: "Nous recherchons. Nous expédions. Vous vendez.",
  manager: "Mr Hope",
  managerRole: "Responsable Marketing & Service Client",
  phoneDisplay: "+257 69 03 27 65",
  phoneRaw: "25769032765",
  email: "contact@tracoli-business.com",
  social: {
    facebook: "https://facebook.com/tracoli",
    bio: "TRACOLI (supply-chain 🇨🇳) le pont entre la Chine et l'Afrique.",
  },
  hubs: ["Guangzhou 🇨🇳", "Yiwu 🇨🇳", "Kinshasa 🇨🇩", "Bujumbura 🇧🇮"],
} as const;

export const waLink = (message: string): string =>
  `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(message)}`;

/* ------------------------------------------------------------------ */
/*  SERVICES FRET                                                      */
/* ------------------------------------------------------------------ */

export type ServiceAccent = "amber" | "crimson" | "navy";

export type FreightService = {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  route: string;
  priceLabel: string;
  priceUnit: string;
  priceNote: string;
  delay: string;
  includes: string[];
  badge?: string;
  accent: ServiceAccent;
  cta: string;
};

export const FREIGHT_SERVICES: FreightService[] = [
  {
    id: "air-express",
    icon: Plane,
    title: "Fret Aérien Express",
    subtitle: "La voie la plus rapide pour vos marchandises urgentes.",
    route: "Chine → RD Congo / Burundi",
    priceLabel: "12$ – 15$",
    priceUnit: "/ KG",
    priceNote: "Tarif indicatif selon volume & saison",
    delay: "5 à 8 jours",
    includes: [
      "Dédouanement complet inclus",
      "Inspection & pesée des colis",
      "Suivi WhatsApp direct en temps réel",
      "Consolidation Guangzhou / Yiwu",
    ],
    badge: "Le plus rapide",
    accent: "amber",
    cta: "Simuler un envoi aérien",
  },
  {
    id: "sea-freight",
    icon: Ship,
    title: "Fret Maritime LCL & FCL",
    subtitle: "Groupage (LCL) ou conteneur complet (FCL) au meilleur coût.",
    route: "Chine → Afrique Centrale / Est",
    priceLabel: "À partir de 250$",
    priceUnit: "/ CBM",
    priceNote: "LCL groupage · FCL 20'/40' sur devis",
    delay: "35 à 45 jours",
    includes: [
      "Entreposage gratuit à Guangzhou & Yiwu",
      "Gestion documentaire (BL, packing list, facture)",
      "Dédouanement portuaire inclus",
      "Assurance marchandise optionnelle",
    ],
    badge: "Meilleur coût",
    accent: "navy",
    cta: "Simuler un envoi maritime",
  },
  {
    id: "sourcing",
    icon: Search,
    title: "Sourcing & Inspection Usines",
    subtitle: "Nous achetons, vérifions et négocions pour vous en Chine.",
    route: "Guangzhou · Yiwu · Foshan",
    priceLabel: "5%",
    priceUnit: "du volume d'achat",
    priceNote: "Commission uniquement sur commande validée",
    delay: "Rapport sous 72h",
    includes: [
      "Vérification & audit des fournisseurs",
      "Contrôle qualité en usine (QC)",
      "Négociation de contrat & prix",
      "Reportage photo/vidéo avant expédition",
    ],
    accent: "crimson",
    cta: "Lancer un sourcing",
  },
];

/* ------------------------------------------------------------------ */
/*  STATS                                                              */
/* ------------------------------------------------------------------ */

export type Stat = {
  value: string;
  label: string;
  sublabel: string;
};

export const STATS: Stat[] = [
  {
    value: "+1 200",
    label: "Conteneurs & colis expédiés",
    sublabel: "Sur le pont Chine ⇄ Afrique depuis 2018",
  },
  {
    value: "99.2%",
    label: "Livraisons dans les délais",
    sublabel: "Suivi proactif par WhatsApp, sans zone d'ombre",
  },
  {
    value: "4",
    label: "Hubs logistiques",
    sublabel: "Guangzhou 🇨🇳 · Yiwu 🇨🇳 · Kinshasa 🇨🇩 · Bujumbura 🇧🇮",
  },
];

/* ------------------------------------------------------------------ */
/*  PILIERS DE MARQUE — repris de la promesse officielle TRACOLI       */
/* ------------------------------------------------------------------ */

export type BrandPillar = {
  step: string;
  verb: string;
  emoji: string;
  title: string;
  description: string;
  accent: ServiceAccent;
};

export const BRAND_PILLARS: BrandPillar[] = [
  {
    step: "01",
    verb: "Nous recherchons",
    emoji: "🔍",
    title: "Sourcing & négociation en Chine",
    description:
      "Nous trouvons les bonnes usines à Guangzhou, Yiwu ou Foshan, vérifions la qualité et négocions le meilleur prix pour vous.",
    accent: "amber",
  },
  {
    step: "02",
    verb: "Nous expédions",
    emoji: "📦",
    title: "Fret aérien & maritime maîtrisé",
    description:
      "Entreposage, groupage, dédouanement et livraison porte-à-porte à Kinshasa, Goma ou Bujumbura. Vous suivez tout en direct.",
    accent: "crimson",
  },
  {
    step: "03",
    verb: "Vous vendez",
    emoji: "🤝",
    title: "Votre marchandise, prête à vendre",
    description:
      "Vous récupérez vos produits dédouanés, contrôlés et prêts à être écoulés sur votre marché. Zéro stress logistique.",
    accent: "navy",
  },
];

/* ------------------------------------------------------------------ */
/*  CLAIM ÉDITORIAL — « Le pont entre la Chine et l'Afrique »          */
/* ------------------------------------------------------------------ */

export const BRIDGE_CLAIM = {
  eyebrow: "Notre identité",
  title: "Le pont entre la Chine et l'Afrique",
  subtitle: "🇨🇳 ⇄ 🇨🇩 🇧🇮",
  description:
    "Depuis nos hubs de Guangzhou et Yiwu, nous relions les usines chinoises aux commerçants et importateurs d'Afrique Centrale et de l'Est. Un seul interlocuteur, toute la chaîne logistique.",
} as const;

/* ------------------------------------------------------------------ */
/*  DESTINATIONS (Simulateur)                                          */
/* ------------------------------------------------------------------ */

export type Destination = {
  id: string;
  city: string;
  country: string;
  flag: string;
  airFactor: number;
  seaFactor: number;
  airDelay: string;
  seaDelay: string;
};

export const DESTINATIONS: Destination[] = [
  { id: "kinshasa",   city: "Kinshasa",   country: "RD Congo",  flag: "🇨🇩", airFactor: 1.0,  seaFactor: 1.0,  airDelay: "5–7 jours",  seaDelay: "35–40 jours" },
  { id: "goma",       city: "Goma",       country: "RD Congo",  flag: "🇨🇩", airFactor: 1.18, seaFactor: 1.22, airDelay: "6–8 jours",  seaDelay: "45–55 jours" },
  { id: "bukavu",     city: "Bukavu",     country: "RD Congo",  flag: "🇨🇩", airFactor: 1.20, seaFactor: 1.25, airDelay: "6–8 jours",  seaDelay: "45–55 jours" },
  { id: "lubumbashi", city: "Lubumbashi", country: "RD Congo",  flag: "🇨🇩", airFactor: 1.10, seaFactor: 1.12, airDelay: "6–8 jours",  seaDelay: "40–48 jours" },
  { id: "matadi",     city: "Matadi",     country: "RD Congo",  flag: "🇨🇩", airFactor: 1.12, seaFactor: 0.95, airDelay: "6–8 jours",  seaDelay: "32–38 jours" },
  { id: "bujumbura",  city: "Bujumbura",  country: "Burundi",   flag: "🇧🇮", airFactor: 1.12, seaFactor: 1.15, airDelay: "5–7 jours",  seaDelay: "38–45 jours" },
  { id: "kigali",     city: "Kigali",     country: "Rwanda",    flag: "🇷🇼", airFactor: 1.08, seaFactor: 1.10, airDelay: "5–7 jours",  seaDelay: "38–45 jours" },
];

/* ------------------------------------------------------------------ */
/*  SIMULATEUR — Grille tarifaire                                      */
/* ------------------------------------------------------------------ */

export type ShippingMode = "air" | "sea";

export const FREIGHT_RATES: Record<
  ShippingMode,
  { min: number; max: number; unit: "kg" | "CBM"; label: string; minQty: number; step: number }
> = {
  air: { min: 12, max: 15,  unit: "kg",  label: "Fret Aérien Express",     minQty: 1, step: 0.5 },
  sea: { min: 250, max: 320, unit: "CBM", label: "Fret Maritime Groupage", minQty: 1, step: 1 },
};

/* ------------------------------------------------------------------ */
/*  PROCESSUS DE SUIVI                                                 */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  meta: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Réception marchandises en Chine",
    description:
      "Vos fournisseurs livrent directement dans nos entrepôts de Guangzhou ou Yiwu. Nous enregistrons chaque colis, l'étiquetons et vous confirmons la réception par WhatsApp.",
    meta: "Entreposage gratuit",
  },
  {
    step: "02",
    title: "Contrôle & Groupage",
    description:
      "Inspection visuelle, pesée, mesure du volume et vérification de conformité. Vos colis sont consolidés pour optimiser le coût du fret et éviter les mauvaises surprises.",
    meta: "QC & photos",
  },
  {
    step: "03",
    title: "Expédition Fret",
    description:
      "Départ aérien express ou maritime LCL/FCL selon votre arbitrage coût/délai. Vous recevez le numéro de suivi et l'ETA actualisé à chaque étape clé.",
    meta: "Tracking live",
  },
  {
    step: "04",
    title: "Dédouanement & Retrait",
    description:
      "Notre équipe transit prend en charge les formalités douanières à Kinshasa, Goma, Bujumbura ou Lubumbashi. Vous retirez votre marchandise, prête à être vendue.",
    meta: "Porte-à-porte",
  },
];

/* ------------------------------------------------------------------ */
/*  FORMULAIRE DE QUALIFICATION                                        */
/* ------------------------------------------------------------------ */

export const GOODS_TYPES = [
  { value: "general",     label: "Marchandises générales" },
  { value: "electronics", label: "Électronique / Téléphonie" },
  { value: "battery",     label: "Liquide / Batterie / Dangereux" },
  { value: "machinery",   label: "Machines & Équipements industriels" },
  { value: "textile",     label: "Textile / Habillement / Chaussures" },
  { value: "cosmetics",   label: "Cosmétiques / Produits de beauté" },
] as const;

export const URGENCY_LEVELS = [
  { value: "urgent",   label: "🔴 Urgent (< 7 jours)" },
  { value: "standard", label: "🟡 Standard (2–4 semaines)" },
  { value: "eco",      label: "🟢 Économique (1–2 mois)" },
] as const;

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: "Services",   href: "#services" },
  { label: "Simulateur", href: "#simulateur" },
  { label: "Processus",  href: "#processus" },
  { label: "Devis",      href: "#devis" },
] as const;

/* ------------------------------------------------------------------ */
/*  QUICK ACTIONS — Aiguillage du Hero                                 */
/* ------------------------------------------------------------------ */

export type QuickAction = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  variant: "primary" | "dark" | "ghost";
};

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "sourcing",
    emoji: "📦",
    title: "Sourcing & Achat",
    description:
      "Trouvez le bon fournisseur en Chine. Nous négocions, vérifions et achetons pour vous.",
    cta: "Trouver un produit",
    href: "#sourcing",
    variant: "primary",
  },
  {
    id: "fret",
    emoji: "✈️",
    title: "Fret & Logistique",
    description:
      "Estimez votre expédition aérienne ou maritime en quelques clics, tarif indicatif immédiat.",
    cta: "Estimer mon expédition",
    href: "#logistique",
    variant: "dark",
  },
  {
    id: "tracking",
    emoji: "📍",
    title: "Suivi de Colis",
    description:
      "Suivez votre marchandise en temps réel, de Guangzhou jusqu'à votre entrepôt.",
    cta: "Tracer ma marchandise",
    href: "#tracking",
    variant: "ghost",
  },
];

/* ------------------------------------------------------------------ */
/*  SOURCING WIZARD — Données                                          */
/* ------------------------------------------------------------------ */

export type ProductTag = {
  id: string;
  emoji: string;
  label: string;
  hint: string;
};

export const PRODUCT_TAGS: ProductTag[] = [
  { id: "electronics", emoji: "⚡", label: "Électronique",       hint: "Appareils, gadgets, téléphonie" },
  { id: "battery",     emoji: "🔋", label: "Contient batterie",  hint: "Restrictions transport aérien" },
  { id: "fragile",     emoji: "🧊", label: "Fragile",            hint: "Emballage renforcé requis" },
  { id: "standard",    emoji: "📦", label: "Standard",           hint: "Marchandise générale" },
];

/* ------------------------------------------------------------------ */
/*  LOGISTICS WIZARD — Données                                         */
/* ------------------------------------------------------------------ */

export const SHIPPING_OPTIONS = [
  {
    id: "air",
    emoji: "✈️",
    title: "Fret Aérien",
    tagline: "Rapide",
    delay: "5 – 7 jours",
    priceHint: "12$ – 15$ / KG",
    description: "Idéal pour les marchandises urgentes, légères et à forte valeur.",
    features: ["Dédouanement inclus", "Suivi WhatsApp direct", "Consolidation Guangzhou"],
    recommended: false,
  },
  {
    id: "sea",
    emoji: "🚢",
    title: "Fret Maritime",
    tagline: "Économique",
    delay: "35 – 45 jours",
    priceHint: "À partir de 250$ / CBM",
    description: "Le meilleur coût au volume pour vos conteneurs et gros volumes.",
    features: ["Groupage LCL ou FCL", "Entreposage gratuit", "Dédouanement portuaire"],
    recommended: true,
  },
] as const;

export const DEPARTURE_HUBS = ["Guangzhou 🇨🇳", "Yiwu 🇨🇳", "Foshan 🇨🇳", "Shenzhen 🇨🇳"] as const;

/* ------------------------------------------------------------------ */
/*  TRACKING — Statuts de démonstration                                */
/* ------------------------------------------------------------------ */

export type TrackingStageStatus = "done" | "active" | "pending";

export type TrackingStage = {
  id: string;
  label: string;
  location: string;
  date: string;
  status: TrackingStageStatus;
  detail?: string;
};

export const DEMO_TRACKING: TrackingStage[] = [
  {
    id: "received",
    label: "Reçu à l'entrepôt",
    location: "Guangzhou 🇨🇳",
    date: "12 Jan · 09:34",
    status: "done",
    detail: "Colis pesé, mesuré et étiqueté CTN-2041",
  },
  {
    id: "transit",
    label: "En transit",
    location: "Vol AF-8821 · En vol",
    date: "16 Jan · 22:10",
    status: "active",
    detail: "Progression 65% — arrivée estimée à Kinshasa le 20 Jan",
  },
  {
    id: "customs",
    label: "Dédouanement",
    location: "Kinshasa 🇨🇩",
    date: "ETA 20 Jan",
    status: "pending",
    detail: "Documents pré-transmis à notre transitaire partenaire",
  },
  {
    id: "ready",
    label: "Prêt pour retrait",
    location: "Entrepôt TRACOLI Kinshasa",
    date: "ETA 21 Jan",
    status: "pending",
    detail: "Vous recevrez un WhatsApp dès disponibilité",
  },
];