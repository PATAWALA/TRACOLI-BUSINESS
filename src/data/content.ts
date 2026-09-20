import {
  Search,
  ShieldCheck,
  Plane,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";

/* ================================================================== */
/*  LOCALE                                                             */
/* ================================================================== */

export type Locale = "fr" | "en";

export const DEFAULT_LOCALE: Locale = "fr";

/** Sélectionne la variante selon la locale active. */
export const t = <T>(locale: Locale, fr: T, en: T): T =>
  locale === "fr" ? fr : en;

/* ================================================================== */
/*  IDENTITÉ                                                           */
/* ================================================================== */

export const IDENTITY = {
  shortName: "TRACOLI BUSINESS",
  legalName:
    "TRACOLI BUSINESS - Trade Connectors Logistics International",
  motto: {
    fr: "Votre confiance, notre affaire. Votre satisfaction, notre priorité.",
    en: "Your trust is our business. Your satisfaction is our priority.",
  },
  positioning: {
    fr: "Connecteur Logistique entre l'Asie et l'Afrique",
    en: "Logistics Connector between Asia and Africa",
  },
} as const;

/* ================================================================== */
/*  CONTACT                                                            */
/* ================================================================== */

export const CONTACT = {
  brand: IDENTITY.shortName,
  brandFull: IDENTITY.legalName,
  manager: "Mr Hope",
  managerRole: {
    fr: "Responsable Marketing & Service Client",
    en: "Marketing & Customer Service Manager",
  },
  phoneDisplay: "+257 69 03 27 65",
  phoneRaw: "25769032765",
  email: "contact@tracoli-business.com",
  social: {
    facebook: "https://facebook.com/tracoli",
  },
} as const;

/** Génère un lien WhatsApp avec message pré-rempli. */
export const waLink = (message: string): string =>
  `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(message)}`;

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */

export const HERO = {
  eyebrow: {
    fr: "Sourcing · Importation · Logistique Internationale",
    en: "Sourcing · Import · International Logistics",
  },
  title: {
    fr: "Connecteur Logistique entre l'Asie et l'Afrique",
    en: "Logistics Connector between Asia and Africa",
  },
  subtitle: {
    fr: "Nous offrons aux entrepreneurs africains un accès simple, sécurisé et rentable au commerce international avec un accompagnement professionnel à chaque étape.",
    en: "We provide African entrepreneurs with simple, secure and cost-effective access to international trade, supported by professional guidance at every stage.",
  },
  primaryCta: {
    fr: "Demander une cotation",
    en: "Request a quote",
  },
  secondaryCta: {
    fr: "Estimer mon expédition",
    en: "Estimate my shipment",
  },
} as const;

/* ================================================================== */
/*  À PROPOS                                                           */
/* ================================================================== */

export const ABOUT = {
  eyebrow: {
    fr: "À propos",
    en: "About us",
  },
  title: {
    fr: "Votre partenaire de confiance pour le commerce international",
    en: "Your trusted partner for international trade",
  },
  paragraphs: [
    {
      fr: "TRACOLI Business est spécialisée dans le sourcing international, l'importation et la logistique. Notre mission est de connecter les entrepreneurs africains aux meilleurs fournisseurs d'Asie.",
      en: "TRACOLI Business specializes in international sourcing, import and logistics. Our mission is to connect African entrepreneurs with Asia's leading suppliers.",
    },
    {
      fr: "Grâce à notre service de groupage, même les petits commerçants peuvent importer leurs marchandises à moindre coût. Nous proposons également des formations et un suivi personnalisé pour développer vos activités en toute confiance.",
      en: "Through our consolidation service, even small-scale traders can import goods at reduced cost. We also offer training and personalized support to grow your business with confidence.",
    },
  ],
} as const;

/* ================================================================== */
/*  SERVICES (résumé pour la home)                                     */
/* ================================================================== */

export type Service = {
  id: string;
  icon: LucideIcon;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  features: { fr: string[]; en: string[] };
};

export const SERVICES: Service[] = [
  {
    id: "sourcing",
    icon: Search,
    title: {
      fr: "Sourcing & Négociation",
      en: "Sourcing & Negotiation",
    },
    description: {
      fr: "Recherche de produits de qualité en Chine et négociation des meilleurs prix.",
      en: "Identification of quality products in China and negotiation of the best prices.",
    },
    features: {
      fr: [
        "Identification de fournisseurs qualifiés",
        "Négociation tarifaire et contractuelle",
        "Échantillonnage avant commande",
        "Suivi de production en usine",
      ],
      en: [
        "Identification of qualified suppliers",
        "Pricing and contract negotiation",
        "Pre-order sampling",
        "On-site production follow-up",
      ],
    },
  },
  {
    id: "inspection",
    icon: ShieldCheck,
    title: {
      fr: "Inspection & Conformité",
      en: "Inspection & Compliance",
    },
    description: {
      fr: "Vérification stricte des usines et contrôle qualité avant expédition.",
      en: "Strict factory verification and quality control prior to shipment.",
    },
    features: {
      fr: [
        "Audit des unités de production",
        "Contrôle qualité systématique",
        "Rapport photo et vidéo détaillé",
        "Conformité aux normes d'exportation",
      ],
      en: [
        "Production facility audits",
        "Systematic quality control",
        "Detailed photo and video reporting",
        "Export standards compliance",
      ],
    },
  },
  {
    id: "freight",
    icon: Plane,
    title: {
      fr: "Fret International",
      en: "International Freight",
    },
    description: {
      fr: "Solutions de transport aérien et maritime adaptées à vos volumes.",
      en: "Air and sea transport solutions tailored to your volumes.",
    },
    features: {
      fr: [
        "Fret aérien express",
        "Fret maritime LCL et FCL",
        "Groupage mutualisé",
        "Entreposage sécurisé en Chine",
      ],
      en: [
        "Air express freight",
        "Sea freight LCL and FCL",
        "Consolidated groupage",
        "Secure warehousing in China",
      ],
    },
  },
  {
    id: "customs",
    icon: FileCheck2,
    title: {
      fr: "Dédouanement & Livraison",
      en: "Customs Clearance & Delivery",
    },
    description: {
      fr: "Prise en charge complète des formalités douanières jusqu'à la destination finale.",
      en: "Full handling of customs formalities through to final destination.",
    },
    features: {
      fr: [
        "Préparation des documents douaniers",
        "Paiement des taxes et droits",
        "Dédouanement portuaire et aéroportuaire",
        "Livraison jusqu'à votre entrepôt",
      ],
      en: [
        "Customs documentation preparation",
        "Payment of duties and taxes",
        "Port and airport clearance",
        "Delivery to your warehouse",
      ],
    },
  },
];

/* ================================================================== */
/*  DESTINATIONS                                                       */
/* ================================================================== */

export type DestinationCountry = {
  id: string;
  country: { fr: string; en: string };
  code: string;
  cities: { id: string; name: string }[];
  airFactor: number;
  seaFactor: number;
};

export const DESTINATIONS: DestinationCountry[] = [
  {
    id: "burundi",
    country: { fr: "Burundi", en: "Burundi" },
    code: "BI",
    cities: [
      { id: "bujumbura", name: "Bujumbura" },
      { id: "gitega", name: "Gitega" },
    ],
    airFactor: 1.12,
    seaFactor: 1.15,
  },
  {
    id: "drc",
    country: {
      fr: "République Démocratique du Congo",
      en: "Democratic Republic of Congo",
    },
    code: "CD",
    cities: [
      { id: "kinshasa", name: "Kinshasa" },
      { id: "lubumbashi", name: "Lubumbashi" },
      { id: "goma", name: "Goma" },
      { id: "bukavu", name: "Bukavu" },
      { id: "kolwezi", name: "Kolwezi" },
      { id: "kalemie", name: "Kalemie" },
      { id: "uvira", name: "Uvira" },
    ],
    airFactor: 1.0,
    seaFactor: 1.0,
  },
  {
    id: "uganda",
    country: { fr: "Ouganda", en: "Uganda" },
    code: "UG",
    cities: [{ id: "kampala", name: "Kampala" }],
    airFactor: 1.08,
    seaFactor: 1.10,
  },
  {
    id: "tanzania",
    country: { fr: "Tanzanie", en: "Tanzania" },
    code: "TZ",
    cities: [
      { id: "kigoma", name: "Kigoma" },
      { id: "dar-es-salaam", name: "Dar es Salaam" },
    ],
    airFactor: 1.05,
    seaFactor: 0.92,
  },
  {
    id: "kenya",
    country: { fr: "Kenya", en: "Kenya" },
    code: "KE",
    cities: [
      { id: "mombasa", name: "Mombasa" },
      { id: "nairobi", name: "Nairobi" },
    ],
    airFactor: 1.06,
    seaFactor: 0.95,
  },
];

/** Liste plate (pratique pour les <select>). */
export type FlatDestination = {
  id: string;
  city: string;
  countryFr: string;
  countryEn: string;
  code: string;
  airFactor: number;
  seaFactor: number;
};

export const FLAT_DESTINATIONS: FlatDestination[] = DESTINATIONS.flatMap((c) =>
  c.cities.map((city) => ({
    id: city.id,
    city: city.name,
    countryFr: c.country.fr,
    countryEn: c.country.en,
    code: c.code,
    airFactor: c.airFactor,
    seaFactor: c.seaFactor,
  }))
);

/* ================================================================== */
/*  STATS                                                              */
/* ================================================================== */

export type Stat = {
  value: string;
  label: { fr: string; en: string };
  sublabel: { fr: string; en: string };
};

export const STATS: Stat[] = [
  {
    value: "1 200+",
    label: {
      fr: "Conteneurs et colis expédiés",
      en: "Containers and parcels shipped",
    },
    sublabel: {
      fr: "Corridor Asie–Afrique depuis 2018",
      en: "Asia–Africa corridor since 2018",
    },
  },
  {
    value: "99,2 %",
    label: {
      fr: "Livraisons dans les délais",
      en: "On-time deliveries",
    },
    sublabel: {
      fr: "Suivi proactif à chaque étape",
      en: "Proactive tracking at every stage",
    },
  },
  {
    value: "05",
    label: {
      fr: "Pays desservis",
      en: "Countries served",
    },
    sublabel: {
      fr: "Burundi, RDC, Ouganda, Tanzanie, Kenya",
      en: "Burundi, DRC, Uganda, Tanzania, Kenya",
    },
  },
];

/* ================================================================== */
/*  PROCESSUS                                                          */
/* ================================================================== */

export type ProcessStep = {
  step: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  meta: { fr: string; en: string };
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: {
      fr: "Réception des marchandises en Chine",
      en: "Goods receipt in China",
    },
    description: {
      fr: "Vos fournisseurs livrent directement dans nos entrepôts de Guangzhou ou Yiwu. Chaque colis est enregistré, étiqueté et confirmé.",
      en: "Your suppliers deliver directly to our warehouses in Guangzhou or Yiwu. Every parcel is registered, labelled and confirmed.",
    },
    meta: {
      fr: "Entreposage sécurisé",
      en: "Secure warehousing",
    },
  },
  {
    step: "02",
    title: {
      fr: "Contrôle et groupage",
      en: "Inspection and consolidation",
    },
    description: {
      fr: "Inspection visuelle, pesée, mesure du volume et vérification de conformité. Les colis sont consolidés pour optimiser le coût du fret.",
      en: "Visual inspection, weighing, volume measurement and compliance verification. Parcels are consolidated to optimize freight cost.",
    },
    meta: {
      fr: "Contrôle qualité",
      en: "Quality control",
    },
  },
  {
    step: "03",
    title: {
      fr: "Expédition internationale",
      en: "International shipment",
    },
    description: {
      fr: "Départ aérien ou maritime selon votre arbitrage coût/délai. Vous recevez le numéro de suivi et une mise à jour à chaque étape clé.",
      en: "Air or sea departure based on your cost/delay trade-off. You receive the tracking number and an update at every key milestone.",
    },
    meta: {
      fr: "Suivi en temps réel",
      en: "Real-time tracking",
    },
  },
  {
    step: "04",
    title: {
      fr: "Dédouanement et livraison",
      en: "Customs clearance and delivery",
    },
    description: {
      fr: "Notre équipe transit prend en charge les formalités douanières jusqu'à la destination finale. Vous recevez votre marchandise prête à la vente.",
      en: "Our transit team handles customs formalities through to the final destination. You receive your goods ready for sale.",
    },
    meta: {
      fr: "Porte-à-porte",
      en: "Door-to-door",
    },
  },
];

/* ================================================================== */
/*  FORMULAIRE                                                         */
/* ================================================================== */

export type Option = { value: string; label: { fr: string; en: string } };

export const GOODS_TYPES: Option[] = [
  { value: "general",     label: { fr: "Marchandises générales",              en: "General goods" } },
  { value: "electronics", label: { fr: "Électronique et téléphonie",          en: "Electronics and telecommunications" } },
  { value: "battery",     label: { fr: "Liquides, batteries, marchandises dangereuses", en: "Liquids, batteries, dangerous goods" } },
  { value: "machinery",   label: { fr: "Machines et équipements industriels", en: "Machinery and industrial equipment" } },
  { value: "textile",     label: { fr: "Textile, habillement, chaussures",    en: "Textile, apparel, footwear" } },
  { value: "cosmetics",   label: { fr: "Cosmétiques et produits de beauté",   en: "Cosmetics and beauty products" } },
];

export const URGENCY_LEVELS: Option[] = [
  { value: "urgent",   label: { fr: "Urgent (moins de 7 jours)",       en: "Urgent (less than 7 days)" } },
  { value: "standard", label: { fr: "Standard (2 à 4 semaines)",       en: "Standard (2 to 4 weeks)" } },
  { value: "eco",      label: { fr: "Économique (1 à 2 mois)",         en: "Economy (1 to 2 months)" } },
];

export const SHIPPING_MODES: Option[] = [
  { value: "air", label: { fr: "Fret aérien",   en: "Air freight" } },
  { value: "sea", label: { fr: "Fret maritime", en: "Sea freight" } },
];

/* ================================================================== */
/*  SIMULATEUR — Grille tarifaire                                      */
/* ================================================================== */

export type ShippingMode = "air" | "sea";

export const FREIGHT_RATES: Record<
  ShippingMode,
  {
    min: number;
    max: number;
    unit: "kg" | "CBM";
    label: { fr: string; en: string };
    minQty: number;
    step: number;
    delay: { fr: string; en: string };
  }
> = {
  air: {
    min: 12,
    max: 15,
    unit: "kg",
    label: { fr: "Fret aérien express", en: "Air express freight" },
    minQty: 1,
    step: 0.5,
    delay: { fr: "5 à 8 jours", en: "5 to 8 days" },
  },
  sea: {
    min: 250,
    max: 320,
    unit: "CBM",
    label: { fr: "Fret maritime groupage", en: "Sea groupage freight" },
    minQty: 1,
    step: 1,
    delay: { fr: "35 à 45 jours", en: "35 to 45 days" },
  },
};

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */

export const FOOTER = {
  tagline: {
    fr: "Trade Connectors Logistics International",
    en: "Trade Connectors Logistics International",
  },
  zonesTitle: {
    fr: "Zones desservies",
    en: "Regions served",
  },
  legal: {
    fr: "Tous droits réservés.",
    en: "All rights reserved.",
  },
  credit: {
    fr: "Développé par Abdoulaye Patawala — Architecte Web",
    en: "Developed by Abdoulaye Patawala — Web Architect",
  },
} as const;

/* ================================================================== */
/*  HELPERS                                                            */
/* ================================================================== */

export const getCitiesForCountry = (
  countryId: string
): { id: string; name: string }[] =>
  DESTINATIONS.find((c) => c.id === countryId)?.cities ?? [];

/* ================================================================== */
/*  PAGE À PROPOS                                                      */
/* ================================================================== */

export const ABOUT_HERO = {
  eyebrow: { fr: "À propos", en: "About us" },
  title: {
    fr: "Le connecteur logistique entre l'Asie et l'Afrique",
    en: "The logistics connector between Asia and Africa",
  },
  subtitle: {
    fr: "Depuis 2018, TRACOLI Business accompagne les entrepreneurs africains dans leurs importations depuis la Chine. Notre engagement : rendre le commerce international simple, sécurisé et rentable.",
    en: "Since 2018, TRACOLI Business has supported African entrepreneurs with their imports from China. Our commitment: making international trade simple, secure and profitable.",
  },
} as const;

export const ABOUT_VALUES = [
  {
    id: "trust",
    title: { fr: "Confiance", en: "Trust" },
    description: {
      fr: "Chaque colis est suivi, chaque transaction documentée. Vous savez toujours où en est votre marchandise et où va votre argent.",
      en: "Every parcel is tracked, every transaction documented. You always know where your goods are and where your money goes.",
    },
  },
  {
    id: "expertise",
    title: { fr: "Expertise", en: "Expertise" },
    description: {
      fr: "Nos équipes en Chine et en Afrique maîtrisent les rouages du sourcing, du fret et du dédouanement sur le corridor Asie–Afrique.",
      en: "Our teams in China and Africa master the ins and outs of sourcing, freight and customs clearance on the Asia–Africa corridor.",
    },
  },
  {
    id: "inclusion",
    title: { fr: "Inclusion", en: "Inclusion" },
    description: {
      fr: "Grâce au groupage, même les petits commerçants peuvent importer à moindre coût. Nous croyons au commerce accessible à tous.",
      en: "Through consolidation, even small-scale traders can import at reduced cost. We believe in trade that is accessible to all.",
    },
  },
  {
    id: "proximity",
    title: { fr: "Proximité", en: "Proximity" },
    description: {
      fr: "Un interlocuteur dédié, joignable sur WhatsApp. Pas de serveur vocal, pas de ticket anonyme. Une relation humaine.",
      en: "A dedicated contact, reachable on WhatsApp. No voice servers, no anonymous tickets. A human relationship.",
    },
  },
] as const;

export const ABOUT_TIMELINE = [
  {
    year: "2018",
    title: { fr: "Création de TRACOLI Business", en: "TRACOLI Business founded" },
    description: {
      fr: "Lancement des premières opérations de groupage entre Guangzhou et Bujumbura.",
      en: "Launch of the first consolidation operations between Guangzhou and Bujumbura.",
    },
  },
  {
    year: "2020",
    title: { fr: "Ouverture du hub de Kinshasa", en: "Kinshasa hub opening" },
    description: {
      fr: "Déploiement de nos propres capacités d'entreposage et de dédouanement en RDC.",
      en: "Deployment of our own warehousing and customs clearance capabilities in the DRC.",
    },
  },
  {
    year: "2022",
    title: { fr: "Extension Afrique de l'Est", en: "East Africa expansion" },
    description: {
      fr: "Couverture complète de l'Ouganda, la Tanzanie et le Kenya via Mombasa et Dar es Salaam.",
      en: "Full coverage of Uganda, Tanzania and Kenya via Mombasa and Dar es Salaam.",
    },
  },
  {
    year: "2024",
    title: { fr: "1 200+ expéditions livrées", en: "1,200+ shipments delivered" },
    description: {
      fr: "Un cap symbolique qui confirme la fiabilité du modèle TRACOLI sur le corridor Asie–Afrique.",
      en: "A symbolic milestone confirming the reliability of the TRACOLI model on the Asia–Africa corridor.",
    },
  },
] as const;

export const ABOUT_TEAM = [
  {
    id: "hope",
    name: "Mr Hope",
    role: {
      fr: "Responsable Marketing & Service Client",
      en: "Marketing & Customer Service Manager",
    },
    bio: {
      fr: "Votre point de contact unique pour toute demande de sourcing, de fret ou de suivi. Joignable directement sur WhatsApp.",
      en: "Your single point of contact for any sourcing, freight or tracking request. Reachable directly on WhatsApp.",
    },
    location: "Bujumbura, Burundi",
    featured: true,
  },
  {
    id: "china-ops",
    name: { fr: "Équipe opérations Chine", en: "China Operations Team" },
    role: { fr: "Guangzhou & Yiwu", en: "Guangzhou & Yiwu" },
    bio: {
      fr: "Acheteurs, contrôleurs qualité et logisticiens sur le terrain en Chine. Ils vérifient chaque colis avant expédition.",
      en: "Buyers, quality controllers and logistics operators on the ground in China. They verify every parcel before shipment.",
    },
    location: "China",
    featured: false,
  },
  {
    id: "customs-team",
    name: { fr: "Équipe transit Afrique", en: "Africa Transit Team" },
    role: {
      fr: "Dédouanement & livraison",
      en: "Customs clearance & delivery",
    },
    bio: {
      fr: "Nos transitaires agréés gèrent les formalités douanières à Kinshasa, Goma, Bujumbura et Mombasa.",
      en: "Our licensed freight forwarders handle customs formalities in Kinshasa, Goma, Bujumbura and Mombasa.",
    },
    location: "Africa",
    featured: false,
  },
] as const;

/* ================================================================== */
/*  PAGE RESSOURCES                                                    */
/* ================================================================== */

export type ResourceType = "guide" | "ebook" | "formation" | "template";
export type ResourceAccess = "free" | "premium";

export type Resource = {
  id: string;
  slug: string;
  type: ResourceType;
  access: ResourceAccess;
  image: string;
  imageAlt: { fr: string; en: string };
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  longDescription: { fr: string; en: string };
  level: { fr: string; en: string };
  meta: { fr: string; en: string };
  format: { fr: string; en: string };
  price?: string;
  badge?: { fr: string; en: string };
  outcomes: { fr: string[]; en: string[] };
  audience: { fr: string[]; en: string[] };
  chapters: {
    title: { fr: string; en: string };
    items: { fr: string[]; en: string[] };
  }[];
};

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
  { value: "all", label: { fr: "Toutes les ressources", en: "All resources" } },
  { value: "guide", label: { fr: "Guides gratuits", en: "Free guides" } },
  { value: "ebook", label: { fr: "Ebooks premium", en: "Premium ebooks" } },
  { value: "formation", label: { fr: "Formations", en: "Training" } },
] as const;

export const RESOURCES: Resource[] = [
  {
    id: "premiers-pas-import",
    slug: "premiers-pas-import",
    type: "guide",
    access: "free",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&h=675&fit=crop&q=80",
    imageAlt: {
      fr: "Guide des premiers pas de l'importateur africain",
      en: "Guide to the first steps for the African importer",
    },
    title: {
      fr: "Les premiers pas de l'importateur africain",
      en: "First steps for the African importer",
    },
    description: {
      fr: "Un guide complet pour comprendre le cycle d'importation depuis la Chine : recherche de fournisseur, échantillons, paiement, transport et douane.",
      en: "A complete guide to understanding the import cycle from China: supplier search, samples, payment, transport and customs.",
    },
    longDescription: {
      fr: "Vous voulez importer depuis la Chine mais vous ne savez pas par où commencer ? Ce guide vous accompagne pas à pas dans l'ensemble du cycle d'importation, depuis la recherche du fournisseur jusqu'à la livraison dans votre entrepôt. Nous partageons les méthodes que nos équipes utilisent quotidiennement, avec des exemples concrets adaptés aux réalités du marché africain.",
      en: "Want to import from China but don't know where to start? This guide walks you step by step through the entire import cycle, from finding a supplier to delivering to your warehouse. We share the methods our teams use daily, with concrete examples tailored to the African market.",
    },
    level: { fr: "Débutant", en: "Beginner" },
    meta: { fr: "28 pages · PDF", en: "28 pages · PDF" },
    format: {
      fr: "PDF téléchargeable",
      en: "Downloadable PDF",
    },
    badge: { fr: "Téléchargement gratuit", en: "Free download" },
    outcomes: {
      fr: [
        "Comprendre le cycle complet d'une importation depuis la Chine",
        "Identifier un fournisseur fiable sur les plateformes B2B",
        "Négocier les conditions de paiement et de production",
        "Choisir le bon mode de transport selon votre budget",
        "Anticiper les formalités douanières à l'arrivée",
      ],
      en: [
        "Understand the full import cycle from China",
        "Identify a reliable supplier on B2B platforms",
        "Negotiate payment and production terms",
        "Choose the right transport mode based on your budget",
        "Anticipate customs formalities upon arrival",
      ],
    },
    audience: {
      fr: [
        "Commerçants débutant dans l'importation",
        "Entrepreneurs qui veulent lancer une activité d'import",
        "Commerçants déjà actifs souhaitant structurer leurs achats",
      ],
      en: [
        "Traders new to importing",
        "Entrepreneurs looking to launch an import business",
        "Active traders wanting to structure their purchasing",
      ],
    },
    chapters: [
      {
        title: {
          fr: "Chapitre 1 — Comprendre l'écosystème",
          en: "Chapter 1 — Understanding the ecosystem",
        },
        items: {
          fr: [
            "Les acteurs du commerce Chine–Afrique",
            "Plateformes et canaux d'achat",
            "Réalités du marché africain",
          ],
          en: [
            "Key players in China–Africa trade",
            "Platforms and purchasing channels",
            "African market realities",
          ],
        },
      },
      {
        title: {
          fr: "Chapitre 2 — Sourcing et fournisseurs",
          en: "Chapter 2 — Sourcing and suppliers",
        },
        items: {
          fr: [
            "Critères de sélection d'un fournisseur",
            "Vérification d'identité et d'existence",
            "Négociation de prix et d'échantillons",
          ],
          en: [
            "Supplier selection criteria",
            "Identity and existence verification",
            "Price and sample negotiation",
          ],
        },
      },
      {
        title: {
          fr: "Chapitre 3 — Transport et paiement",
          en: "Chapter 3 — Transport and payment",
        },
        items: {
          fr: [
            "Comparatif aérien vs maritime",
            "Méthodes de paiement sécurisées",
            "Assurance marchandise",
          ],
          en: [
            "Air vs sea comparison",
            "Secure payment methods",
            "Cargo insurance",
          ],
        },
      },
    ],
  },
  {
    id: "eviter-arnaques-fournisseurs",
    slug: "eviter-arnaques-fournisseurs",
    type: "guide",
    access: "free",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=675&fit=crop&q=80",
    imageAlt: {
      fr: "Guide pour éviter les arnaques de fournisseurs chinois",
      en: "Guide to avoiding Chinese supplier scams",
    },
    title: {
      fr: "Éviter les arnaques de fournisseurs chinois",
      en: "Avoiding Chinese supplier scams",
    },
    description: {
      fr: "Les 12 signaux d'alerte à repérer avant de payer. Méthodes de vérification, plateformes fiables et bonnes pratiques de négociation.",
      en: "12 red flags to spot before paying. Verification methods, reliable platforms and negotiation best practices.",
    },
    longDescription: {
      fr: "Les arnaques de fournisseurs coûtent chaque année des millions de dollars aux importateurs africains. Ce guide vous donne les clés pour détecter les signaux d'alerte avant l'engagement financier, vérifier l'existence réelle d'une usine et sécuriser vos paiements. Nous partageons les protocoles internes que nos acheteurs appliquent systématiquement avant toute transaction.",
      en: "Supplier scams cost African importers millions of dollars every year. This guide gives you the keys to detect red flags before any financial commitment, verify a factory's real existence and secure your payments. We share the internal protocols our buyers systematically apply before any transaction.",
    },
    level: { fr: "Tous niveaux", en: "All levels" },
    meta: { fr: "22 pages · PDF", en: "22 pages · PDF" },
    format: {
      fr: "PDF téléchargeable",
      en: "Downloadable PDF",
    },
    badge: { fr: "Téléchargement gratuit", en: "Free download" },
    outcomes: {
      fr: [
        "Reconnaître les 12 signaux d'alerte d'un faux fournisseur",
        "Vérifier l'existence légale d'une usine en Chine",
        "Utiliser les bons moyens de paiement sécurisés",
        "Mettre en place un protocole d'inspection avant paiement",
        "Réagir rapidement en cas de litige",
      ],
      en: [
        "Recognize 12 red flags of a fraudulent supplier",
        "Verify the legal existence of a factory in China",
        "Use the right secure payment methods",
        "Set up a pre-payment inspection protocol",
        "React quickly in case of dispute",
      ],
    },
    audience: {
      fr: [
        "Importateurs ayant déjà subi une tentative d'arnaque",
        "Commerçants souhaitant sécuriser leurs premiers achats",
        "Acheteurs professionnels cherchant à renforcer leurs process",
      ],
      en: [
        "Importers who have already faced a scam attempt",
        "Traders wanting to secure their first purchases",
        "Professional buyers looking to strengthen their processes",
      ],
    },
    chapters: [
      {
        title: {
          fr: "Chapitre 1 — Les 12 signaux d'alerte",
          en: "Chapter 1 — The 12 red flags",
        },
        items: {
          fr: [
            "Prix anormalement bas",
            "Pression sur le délai de paiement",
            "Absence de licence commerciale",
          ],
          en: [
            "Abnormally low prices",
            "Pressure on payment deadline",
            "Missing business license",
          ],
        },
      },
      {
        title: {
          fr: "Chapitre 2 — Vérification et inspection",
          en: "Chapter 2 — Verification and inspection",
        },
        items: {
          fr: [
            "Audit à distance d'un fournisseur",
            "Visites d'usine par nos équipes",
            "Rapports photo et vidéo",
          ],
          en: [
            "Remote supplier audit",
            "Factory visits by our teams",
            "Photo and video reports",
          ],
        },
      },
      {
        title: {
          fr: "Chapitre 3 — Paiement sécurisé",
          en: "Chapter 3 — Secure payment",
        },
        items: {
          fr: [
            "Lettres de crédit et escrow",
            "Paiement par tranches",
            "Recours en cas de litige",
          ],
          en: [
            "Letters of credit and escrow",
            "Staged payments",
            "Recourse in case of dispute",
          ],
        },
      },
    ],
  },
  {
    id: "maitriser-groupage",
    slug: "maitriser-groupage",
    type: "ebook",
    access: "premium",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&h=675&fit=crop&q=80",
    imageAlt: {
      fr: "Ebook sur la maîtrise du groupage maritime LCL",
      en: "Ebook on mastering LCL sea consolidation",
    },
    title: {
      fr: "Maîtriser le groupage maritime LCL",
      en: "Mastering LCL sea consolidation",
    },
    description: {
      fr: "Méthode complète pour optimiser vos coûts de fret en mutualisant vos volumes. Calcul du CBM, choix du conteneur, coordination entre acheteurs.",
      en: "Complete method to optimize your freight costs by pooling your volumes. CBM calculation, container selection, buyer coordination.",
    },
    longDescription: {
      fr: "Le groupage maritime (LCL) est la solution la plus rentable pour les importateurs de volumes moyens. Mais mal maîtrisé, il peut devenir un piège de coûts cachés. Cet ebook vous donne la méthode complète pour calculer précisément votre CBM, choisir la bonne stratégie de consolidation, négocier avec les transitaires et coordonner efficacement plusieurs commandes dans un même conteneur.",
      en: "LCL sea consolidation is the most cost-effective solution for medium-volume importers. But poorly managed, it can become a trap of hidden costs. This ebook gives you the complete method to accurately calculate your CBM, choose the right consolidation strategy, negotiate with freight forwarders and efficiently coordinate multiple orders in a single container.",
    },
    level: { fr: "Intermédiaire", en: "Intermediate" },
    meta: {
      fr: "94 pages · PDF + tableaux Excel",
      en: "94 pages · PDF + Excel sheets",
    },
    format: {
      fr: "PDF + fichiers Excel de calcul",
      en: "PDF + Excel calculation files",
    },
    price: "19 USD",
    outcomes: {
      fr: [
        "Calculer précisément le CBM de vos marchandises",
        "Comparer LCL et FCL pour choisir la meilleure option",
        "Négocier les tarifs de groupage avec les transitaires",
        "Coordonner plusieurs fournisseurs dans un même envoi",
        "Réduire vos coûts de fret de 25 à 40 %",
      ],
      en: [
        "Accurately calculate the CBM of your goods",
        "Compare LCL and FCL to choose the best option",
        "Negotiate consolidation rates with freight forwarders",
        "Coordinate multiple suppliers in a single shipment",
        "Reduce your freight costs by 25 to 40%",
      ],
    },
    audience: {
      fr: [
        "Importateurs réguliers de volumes moyens",
        "Commerçants souhaitant optimiser leurs coûts logistiques",
        "Entrepreneurs structurant une activité d'import continue",
      ],
      en: [
        "Regular importers of medium volumes",
        "Traders wanting to optimize their logistics costs",
        "Entrepreneurs structuring continuous import activity",
      ],
    },
    chapters: [
      {
        title: {
          fr: "Partie 1 — Fondamentaux du groupage",
          en: "Part 1 — Consolidation fundamentals",
        },
        items: {
          fr: [
            "LCL vs FCL : arbitrage économique",
            "Structure des coûts de groupage",
            "Acteurs du groupage en Chine",
          ],
          en: [
            "LCL vs FCL: economic trade-off",
            "Consolidation cost structure",
            "Key consolidation players in China",
          ],
        },
      },
      {
        title: {
          fr: "Partie 2 — Calcul et optimisation",
          en: "Part 2 — Calculation and optimization",
        },
        items: {
          fr: [
            "Méthode de calcul du CBM",
            "Optimisation du taux de remplissage",
            "Frais annexes et surcharges",
          ],
          en: [
            "CBM calculation method",
            "Fill rate optimization",
            "Ancillary fees and surcharges",
          ],
        },
      },
      {
        title: {
          fr: "Partie 3 — Pilotage et coordination",
          en: "Part 3 — Steering and coordination",
        },
        items: {
          fr: [
            "Coordination multi-fournisseurs",
            "Suivi documentaire",
            "Gestion des retards et litiges",
          ],
          en: [
            "Multi-supplier coordination",
            "Documentation tracking",
            "Delay and dispute management",
          ],
        },
      },
    ],
  },
  {
    id: "dedouanement-rdc",
    slug: "dedouanement-rdc",
    type: "ebook",
    access: "premium",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=675&fit=crop&q=80",
    imageAlt: {
      fr: "Guide complet du dédouanement en RDC",
      en: "Complete guide to customs clearance in the DRC",
    },
    title: {
      fr: "Dédouanement en RDC : le guide complet",
      en: "Customs clearance in the DRC: the complete guide",
    },
    description: {
      fr: "Toutes les étapes du dédouanement à Kinshasa, Goma et Lubumbashi. Documents, taxes, acteurs clés et erreurs à éviter.",
      en: "Every step of customs clearance in Kinshasa, Goma and Lubumbashi. Documents, taxes, key players and mistakes to avoid.",
    },
    longDescription: {
      fr: "Le dédouanement en République Démocratique du Congo reste le point de blocage numéro un des importateurs. Entre les documents exigés, les taxes multiples et les interlocuteurs variés, il est facile de perdre des semaines et beaucoup d'argent. Ce guide vous donne une cartographie précise du processus, les documents exacts à préparer, les taxes à anticiper et les erreurs les plus fréquentes qui coûtent cher.",
      en: "Customs clearance in the Democratic Republic of Congo remains the number one bottleneck for importers. Between required documents, multiple taxes and various stakeholders, it is easy to lose weeks and a lot of money. This guide provides a precise map of the process, the exact documents to prepare, the taxes to anticipate and the most common costly mistakes.",
    },
    level: { fr: "Avancé", en: "Advanced" },
    meta: { fr: "120 pages · PDF", en: "120 pages · PDF" },
    format: {
      fr: "PDF détaillé + modèles de documents",
      en: "Detailed PDF + document templates",
    },
    price: "29 USD",
    outcomes: {
      fr: [
        "Cartographier le processus de dédouanement étape par étape",
        "Préparer l'ensemble des documents obligatoires",
        "Anticiper et calculer les taxes et droits de douane",
        "Choisir et piloter un transitaire agréé",
        "Réduire les délais de dédouanement de plusieurs jours",
      ],
      en: [
        "Map the customs clearance process step by step",
        "Prepare all mandatory documents",
        "Anticipate and calculate customs duties and taxes",
        "Choose and manage a licensed freight forwarder",
        "Cut customs clearance delays by several days",
      ],
    },
    audience: {
      fr: [
        "Importateurs réguliers en RDC",
        "Transitaires débutants cherchant à se structurer",
        "Entreprises industrielles important du matériel",
      ],
      en: [
        "Regular importers in the DRC",
        "New freight forwarders looking to structure themselves",
        "Industrial companies importing equipment",
      ],
    },
    chapters: [
      {
        title: {
          fr: "Partie 1 — Cartographie du processus",
          en: "Part 1 — Process mapping",
        },
        items: {
          fr: [
            "Arrivée portuaire ou aéroportuaire",
            "Acteurs institutionnels clés",
            "Délais moyens par étape",
          ],
          en: [
            "Port or airport arrival",
            "Key institutional players",
            "Average lead times per stage",
          ],
        },
      },
      {
        title: {
          fr: "Partie 2 — Documents et taxes",
          en: "Part 2 — Documents and taxes",
        },
        items: {
          fr: [
            "Documents obligatoires",
            "Calcul des droits et taxes",
            "Exonérations et régimes spéciaux",
          ],
          en: [
            "Mandatory documents",
            "Duties and taxes calculation",
            "Exemptions and special regimes",
          ],
        },
      },
      {
        title: {
          fr: "Partie 3 — Pilotage opérationnel",
          en: "Part 3 — Operational management",
        },
        items: {
          fr: [
            "Sélection d'un transitaire",
            "Suivi en temps réel",
            "Gestion des litiges et blocages",
          ],
          en: [
            "Freight forwarder selection",
            "Real-time tracking",
            "Dispute and blockage management",
          ],
        },
      },
    ],
  },
  {
    id: "formation-sourcing",
    slug: "formation-sourcing",
    type: "formation",
    access: "premium",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=675&fit=crop&q=80",
    imageAlt: {
      fr: "Formation professionnelle en sourcing Asie–Afrique",
      en: "Professional training in Asia–Africa sourcing",
    },
    title: {
      fr: "Formation Sourcing & Importation Asie–Afrique",
      en: "Asia–Africa Sourcing & Import Training",
    },
    description: {
      fr: "Formation intensive de 4 semaines : sourcing, négociation, inspection, fret et douane. Sessions live avec nos acheteurs en Chine.",
      en: "Intensive 4-week training: sourcing, negotiation, inspection, freight and customs. Live sessions with our buyers in China.",
    },
    longDescription: {
      fr: "Notre formation phare vous plonge au cœur du métier d'importateur professionnel. Pendant 4 semaines, vous alternez entre modules théoriques, sessions live avec nos équipes en Chine et mises en pratique sur votre propre projet d'importation. À la fin, vous maîtriserez l'ensemble du cycle et serez capable de piloter vos opérations en toute autonomie.",
      en: "Our flagship training immerses you in the professional importer's craft. Over 4 weeks, you alternate between theoretical modules, live sessions with our teams in China and hands-on work on your own import project. By the end, you will master the entire cycle and be able to manage your operations independently.",
    },
    level: { fr: "Tous niveaux", en: "All levels" },
    meta: {
      fr: "4 semaines · Sessions live + WhatsApp",
      en: "4 weeks · Live sessions + WhatsApp",
    },
    format: {
      fr: "Formation en ligne avec sessions live",
      en: "Online training with live sessions",
    },
    price: "Sur devis",
    badge: { fr: "Programme phare", en: "Flagship program" },
    outcomes: {
      fr: [
        "Maîtriser l'ensemble du cycle d'importation de A à Z",
        "Piloter un projet d'import concret de bout en bout",
        "Négocier efficacement avec les fournisseurs chinois",
        "Gérer le fret, la douane et la livraison finale",
        "Développer un réseau de partenaires fiables",
      ],
      en: [
        "Master the entire import cycle from A to Z",
        "Manage a concrete import project end to end",
        "Negotiate effectively with Chinese suppliers",
        "Handle freight, customs and final delivery",
        "Build a network of reliable partners",
      ],
    },
    audience: {
      fr: [
        "Entrepreneurs souhaitant en faire leur métier",
        "Commerçants voulant professionnaliser leurs importations",
        "Cadres en reconversion vers le commerce international",
      ],
      en: [
        "Entrepreneurs wanting to make it their profession",
        "Traders wanting to professionalize their imports",
        "Professionals transitioning to international trade",
      ],
    },
    chapters: [
      {
        title: {
          fr: "Semaine 1 — Sourcing et fournisseurs",
          en: "Week 1 — Sourcing and suppliers",
        },
        items: {
          fr: [
            "Recherche de fournisseurs",
            "Vérification et audit",
            "Négociation commerciale",
          ],
          en: [
            "Supplier sourcing",
            "Verification and audit",
            "Commercial negotiation",
          ],
        },
      },
      {
        title: {
          fr: "Semaine 2 — Inspection et qualité",
          en: "Week 2 — Inspection and quality",
        },
        items: {
          fr: [
            "Contrôle qualité en usine",
            "Gestion des échantillons",
            "Emballage et conditionnement",
          ],
          en: [
            "In-factory quality control",
            "Sample management",
            "Packaging and conditioning",
          ],
        },
      },
      {
        title: {
          fr: "Semaine 3 — Fret international",
          en: "Week 3 — International freight",
        },
        items: {
          fr: [
            "Choix du mode de transport",
            "Calcul des coûts de fret",
            "Documentation d'expédition",
          ],
          en: [
            "Transport mode selection",
            "Freight cost calculation",
            "Shipment documentation",
          ],
        },
      },
      {
        title: {
          fr: "Semaine 4 — Douane et livraison",
          en: "Week 4 — Customs and delivery",
        },
        items: {
          fr: [
            "Dédouanement à l'arrivée",
            "Paiement des taxes",
            "Livraison et distribution",
          ],
          en: [
            "Arrival customs clearance",
            "Tax payment",
            "Delivery and distribution",
          ],
        },
      },
    ],
  },
  {
    id: "formation-entreprendre-import",
    slug: "formation-entreprendre-import",
    type: "formation",
    access: "premium",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=675&fit=crop&q=80",
    imageAlt: {
      fr: "Programme de coaching pour entreprendre dans l'importation",
      en: "Mentoring program to build an import business",
    },
    title: {
      fr: "Entreprendre dans l'importation : programme accompagné",
      en: "Building an import business: mentored program",
    },
    description: {
      fr: "Programme de coaching personnalisé pour lancer ou structurer votre activité d'importation. Sessions individuelles avec un expert TRACOLI.",
      en: "Personalized coaching program to launch or structure your import business. One-on-one sessions with a TRACOLI expert.",
    },
    longDescription: {
      fr: "Vous avez un projet d'importation mais vous ne savez pas comment le structurer ? Ce programme de 3 mois vous accompagne individuellement. Nous analysons votre projet, définissons ensemble une stratégie, puis nous vous guidons à chaque étape de sa mise en œuvre. Vous bénéficiez de toute notre expérience opérationnelle et de nos réseaux en Chine et en Afrique.",
      en: "You have an import project but don't know how to structure it? This 3-month program supports you individually. We analyze your project, define a strategy together, then guide you through every step of its implementation. You benefit from all our operational experience and our networks in China and Africa.",
    },
    level: {
      fr: "Débutant à intermédiaire",
      en: "Beginner to intermediate",
    },
    meta: {
      fr: "3 mois · Suivi individuel",
      en: "3 months · One-on-one support",
    },
    format: {
      fr: "Coaching individuel + sessions WhatsApp",
      en: "One-on-one coaching + WhatsApp sessions",
    },
    price: "Sur devis",
    outcomes: {
      fr: [
        "Structurer votre projet d'importation sur des bases solides",
        "Définir votre positionnement et votre offre commerciale",
        "Bâtir un plan financier réaliste et sécurisé",
        "Éviter les erreurs coûteuses des débutants",
        "Lancer votre première commande en toute confiance",
      ],
      en: [
        "Structure your import project on solid foundations",
        "Define your positioning and commercial offer",
        "Build a realistic and secure financial plan",
        "Avoid costly beginner mistakes",
        "Launch your first order with confidence",
      ],
    },
    audience: {
      fr: [
        "Entrepreneurs avec un projet d'importation défini",
        "Commerçants voulant passer à l'échelle supérieure",
        "Investisseurs souhaitant se diversifier dans le commerce",
      ],
      en: [
        "Entrepreneurs with a defined import project",
        "Traders wanting to scale up",
        "Investors looking to diversify into trade",
      ],
    },
    chapters: [
      {
        title: {
          fr: "Mois 1 — Diagnostic et stratégie",
          en: "Month 1 — Diagnosis and strategy",
        },
        items: {
          fr: [
            "Analyse de votre projet et de votre marché",
            "Définition du positionnement",
            "Plan d'action personnalisé",
          ],
          en: [
            "Analysis of your project and market",
            "Positioning definition",
            "Personalized action plan",
          ],
        },
      },
      {
        title: {
          fr: "Mois 2 — Mise en œuvre opérationnelle",
          en: "Month 2 — Operational implementation",
        },
        items: {
          fr: [
            "Sélection des fournisseurs et produits",
            "Négociation des premiers contrats",
            "Organisation logistique",
          ],
          en: [
            "Supplier and product selection",
            "First contract negotiation",
            "Logistics organization",
          ],
        },
      },
      {
        title: {
          fr: "Mois 3 — Lancement et pilotage",
          en: "Month 3 — Launch and management",
        },
        items: {
          fr: [
            "Réception de la première commande",
            "Analyse des premiers résultats",
            "Ajustements et passage à l'échelle",
          ],
          en: [
            "First order reception",
            "Analysis of initial results",
            "Adjustments and scaling",
          ],
        },
      },
    ],
  },
];

/** Récupère une ressource par slug (utilisé par /ressources/[slug]). */
export const getResourceBySlug = (slug: string): Resource | undefined =>
  RESOURCES.find((r) => r.slug === slug);

/* ================================================================== */
/*  NAVIGATION                                                         */
/* ================================================================== */

export type NavLink = { label: { fr: string; en: string }; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: { fr: "À propos", en: "About" }, href: "/a-propos" },
  { label: { fr: "Services", en: "Services" }, href: "/#services" },
  { label: { fr: "Ressources", en: "Resources" }, href: "/ressources" },
  { label: { fr: "Processus", en: "Process" }, href: "/#processus" },
] as const;

/* ================================================================== */
/*  SECTION DEVIS — Hub de conversion stratégique                      */
/* ================================================================== */

export const QUOTE_HUB = {
  eyebrow: { fr: "Demander une cotation", en: "Request a quote" },
  title: {
    fr: "Deux parcours, une seule ambition : votre réussite",
    en: "Two paths, one goal: your success",
  },
  subtitle: {
    fr: "Selon votre besoin, choisissez le parcours adapté. Nos équipes analysent votre demande et reviennent vers vous sous 2 heures ouvrées avec une proposition concrète.",
    en: "Depending on your need, choose the right path. Our teams review your request and get back to you within 2 business hours with a concrete proposal.",
  },
  options: [
    {
      id: "sourcing",
      icon: "search",
      title: {
        fr: "Je veux sourcer un produit",
        en: "I want to source a product",
      },
      description: {
        fr: "Nous trouvons le fournisseur, vérifions la qualité et négocions le prix en Chine.",
        en: "We find the supplier, verify quality and negotiate the price in China.",
      },
      cta: { fr: "Lancer une recherche", en: "Start a search" },
      href: "#sourcing",
      accent: "primary" as const,
      features: {
        fr: ["Recherche fournisseur", "Négociation prix", "Échantillonnage"],
        en: ["Supplier sourcing", "Price negotiation", "Sampling"],
      },
    },
    {
      id: "logistique",
      icon: "plane",
      title: {
        fr: "Je veux expédier une marchandise",
        en: "I want to ship goods",
      },
      description: {
        fr: "Fret aérien ou maritime, dédouanement, livraison porte-à-porte jusqu'à votre entrepôt.",
        en: "Air or sea freight, customs clearance, door-to-door delivery to your warehouse.",
      },
      cta: { fr: "Estimer mon fret", en: "Estimate my freight" },
      href: "#logistique",
      accent: "dark" as const,
      features: {
        fr: ["Cotation immédiate", "Fret aérien & maritime", "Dédouanement inclus"],
        en: ["Instant quote", "Air & sea freight", "Customs included"],
      },
    },
    {
      id: "tracking",
      icon: "pin",
      title: {
        fr: "Je veux suivre un colis",
        en: "I want to track a shipment",
      },
      description: {
        fr: "Consultez en temps réel l'avancement de votre marchandise, de Guangzhou à votre entrepôt.",
        en: "Check the real-time progress of your goods, from Guangzhou to your warehouse.",
      },
      cta: { fr: "Tracer maintenant", en: "Track now" },
      href: "#tracking",
      accent: "outline" as const,
      features: {
        fr: ["Suivi en temps réel", "Notifications", "Historique complet"],
        en: ["Real-time tracking", "Notifications", "Full history"],
      },
    },
  ],
  guarantee: {
    fr: "Réponse sous 2 heures ouvrées · Aucun engagement · Devis ferme sans frais cachés",
    en: "Response within 2 business hours · No commitment · Firm quote with no hidden fees",
  },
} as const;

/* ================================================================== */
/*  SERVICES DÉTAILLÉS — Pages /services/[slug]                        */
/* ================================================================== */

export type ServiceFaq = {
  question: { fr: string; en: string };
  answer: { fr: string; en: string };
};

export type ServiceDetail = {
  slug: string;
  icon: LucideIcon;
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  description: { fr: string; en: string };
  hero: { fr: string; en: string };
  processSteps: {
    step: string;
    title: { fr: string; en: string };
    description: { fr: string; en: string };
  }[];
  includes: { fr: string[]; en: string[] };
  benefits: { fr: string[]; en: string[] };
  faq: ServiceFaq[];
  stat: {
    value: string;
    label: { fr: string; en: string };
  };
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "sourcing-negotiation",
    icon: Search,
    title: { fr: "Sourcing & Négociation", en: "Sourcing & Negotiation" },
    subtitle: {
      fr: "Trouver les bons produits au bon prix en Chine",
      en: "Finding the right products at the right price in China",
    },
    description: {
      fr: "Nous identifions les fournisseurs qualifiés, vérifions leur fiabilité et négocions les meilleures conditions commerciales pour votre projet.",
      en: "We identify qualified suppliers, verify their reliability and negotiate the best commercial terms for your project.",
    },
    hero: {
      fr: "Notre réseau de fournisseurs en Chine vous ouvre l'accès aux meilleures usines, avec un accompagnement de bout en bout : de la recherche produit jusqu'à la signature du contrat.",
      en: "Our supplier network in China gives you access to the best factories, with end-to-end support: from product research to contract signature.",
    },
    processSteps: [
      {
        step: "01",
        title: { fr: "Analyse de votre besoin", en: "Analyzing your needs" },
        description: {
          fr: "Nous étudions votre cahier des charges, votre marché cible et vos contraintes budgétaires.",
          en: "We review your specifications, target market and budget constraints.",
        },
      },
      {
        step: "02",
        title: { fr: "Identification des fournisseurs", en: "Supplier identification" },
        description: {
          fr: "Nous contactons plusieurs usines, comparons les offres et présélectionnons les meilleures options.",
          en: "We contact multiple factories, compare offers and shortlist the best options.",
        },
      },
      {
        step: "03",
        title: { fr: "Vérification & échantillonnage", en: "Verification & sampling" },
        description: {
          fr: "Nous vérifions l'existence légale des usines et commandons des échantillons pour validation.",
          en: "We verify the legal existence of factories and order samples for approval.",
        },
      },
      {
        step: "04",
        title: { fr: "Négociation & contrat", en: "Negotiation & contract" },
        description: {
          fr: "Nous négocions prix, délais et conditions de paiement, puis sécurisons la transaction.",
          en: "We negotiate price, deadlines and payment terms, then secure the transaction.",
        },
      },
    ],
    includes: {
      fr: [
        "Recherche multi-fournisseurs en Chine",
        "Comparatif tarifaire détaillé",
        "Vérification légale (licence, existence)",
        "Échantillonnage avant commande",
        "Négociation prix et conditions",
        "Rédaction du contrat commercial",
      ],
      en: [
        "Multi-supplier search in China",
        "Detailed price comparison",
        "Legal verification (license, existence)",
        "Sampling before order",
        "Price and terms negotiation",
        "Commercial contract drafting",
      ],
    },
    benefits: {
      fr: [
        "Jusqu'à 40 % d'économies sur le prix d'achat",
        "Réduction drastique du risque d'arnaque",
        "Accès à des usines non référencées en ligne",
        "Gain de temps : 2 à 4 semaines par projet",
      ],
      en: [
        "Up to 40% savings on purchase price",
        "Dramatic reduction of scam risk",
        "Access to factories not listed online",
        "Time saved: 2 to 4 weeks per project",
      ],
    },
    faq: [
      {
        question: {
          fr: "Combien coûte votre service de sourcing ?",
          en: "How much does your sourcing service cost?",
        },
        answer: {
          fr: "Notre commission est de 5 % du volume d'achat validé, prélevée uniquement après confirmation de la commande.",
          en: "Our commission is 5% of the confirmed purchase volume, charged only after order confirmation.",
        },
      },
      {
        question: {
          fr: "Combien de temps prend une recherche de fournisseur ?",
          en: "How long does a supplier search take?",
        },
        answer: {
          fr: "En moyenne 5 à 10 jours ouvrés pour identifier 3 à 5 fournisseurs qualifiés selon votre cahier des charges.",
          en: "On average 5 to 10 business days to identify 3 to 5 qualified suppliers based on your specifications.",
        },
      },
    ],
    stat: {
      value: "500+",
      label: {
        fr: "Fournisseurs audités en Chine",
        en: "Audited suppliers in China",
      },
    },
  },
  {
    slug: "inspection-conformite",
    icon: ShieldCheck,
    title: { fr: "Inspection & Conformité", en: "Inspection & Compliance" },
    subtitle: {
      fr: "Garantir la qualité avant l'expédition",
      en: "Ensuring quality before shipment",
    },
    description: {
      fr: "Nous auditons les usines et contrôlons la qualité de vos marchandises avant qu'elles ne quittent la Chine.",
      en: "We audit factories and control the quality of your goods before they leave China.",
    },
    hero: {
      fr: "Chaque colis est vérifié par nos équipes sur place : conformité, quantité, emballage, aspect. Vous recevez un rapport détaillé avant que rien ne soit expédié.",
      en: "Every parcel is verified by our on-site teams: compliance, quantity, packaging, appearance. You receive a detailed report before anything is shipped.",
    },
    processSteps: [
      {
        step: "01",
        title: { fr: "Audit de l'usine", en: "Factory audit" },
        description: {
          fr: "Visite sur site pour vérifier les capacités de production et les conditions de travail.",
          en: "On-site visit to verify production capacity and working conditions.",
        },
      },
      {
        step: "02",
        title: { fr: "Contrôle en cours de production", en: "In-process inspection" },
        description: {
          fr: "Vérification de la qualité pendant la fabrication, pour détecter les défauts au plus tôt.",
          en: "Quality verification during manufacturing, to detect defects early.",
        },
      },
      {
        step: "03",
        title: { fr: "Inspection finale", en: "Final inspection" },
        description: {
          fr: "Contrôle à 100 % ou par échantillonnage selon votre commande, avec pesée et mesure.",
          en: "100% or sample-based inspection depending on your order, with weighing and measurement.",
        },
      },
      {
        step: "04",
        title: { fr: "Rapport photo & vidéo", en: "Photo & video report" },
        description: {
          fr: "Vous recevez un rapport complet avec photos, vidéos et avis de conformité.",
          en: "You receive a complete report with photos, videos and compliance opinion.",
        },
      },
    ],
    includes: {
      fr: [
        "Audit d'usine sur site",
        "Contrôle qualité avant expédition",
        "Rapport photo et vidéo détaillé",
        "Vérification quantité et emballage",
        "Test de fonctionnement si applicable",
        "Certification de conformité",
      ],
      en: [
        "On-site factory audit",
        "Pre-shipment quality control",
        "Detailed photo and video report",
        "Quantity and packaging verification",
        "Function testing when applicable",
        "Compliance certification",
      ],
    },
    benefits: {
      fr: [
        "Élimination des produits non conformes",
        "Zéro mauvaise surprise à la réception",
        "Rapports exploitables en cas de litige",
        "Confiance totale avec vos clients finaux",
      ],
      en: [
        "Elimination of non-compliant products",
        "Zero surprises upon receipt",
        "Reports usable in case of dispute",
        "Full confidence with your end customers",
      ],
    },
    faq: [
      {
        question: {
          fr: "Puis-je assister à l'inspection ?",
          en: "Can I attend the inspection?",
        },
        answer: {
          fr: "Oui, nous pouvons organiser une visite virtuelle en direct par WhatsApp vidéo pendant l'inspection.",
          en: "Yes, we can arrange a live virtual visit via WhatsApp video during the inspection.",
        },
      },
      {
        question: {
          fr: "Que se passe-t-il si des défauts sont détectés ?",
          en: "What happens if defects are detected?",
        },
        answer: {
          fr: "Nous bloquons l'expédition et négocions avec le fournisseur soit un remplacement, soit une réduction de prix.",
          en: "We block the shipment and negotiate with the supplier either a replacement or a price reduction.",
        },
      },
    ],
    stat: {
      value: "98 %",
      label: {
        fr: "Taux de conformité après inspection",
        en: "Compliance rate after inspection",
      },
    },
  },
  {
    slug: "fret-international",
    icon: Plane,
    title: { fr: "Fret International", en: "International Freight" },
    subtitle: {
      fr: "Aérien, maritime, groupage — la solution adaptée à votre volume",
      en: "Air, sea, consolidation — the solution adapted to your volume",
    },
    description: {
      fr: "Nous organisons le transport de vos marchandises de la Chine vers l'Afrique Centrale et de l'Est, par voie aérienne ou maritime.",
      en: "We organize the transport of your goods from China to Central and East Africa, by air or sea.",
    },
    hero: {
      fr: "Fret aérien express en 5 à 8 jours, fret maritime groupage en 35 à 45 jours, ou conteneur complet. Nous optimisons systématiquement le rapport coût/délai selon votre besoin.",
      en: "Air express freight in 5 to 8 days, sea consolidation in 35 to 45 days, or full container. We always optimize the cost/delay ratio based on your need.",
    },
    processSteps: [
      {
        step: "01",
        title: { fr: "Réception en entrepôt", en: "Warehouse reception" },
        description: {
          fr: "Vos marchandises arrivent dans nos entrepôts de Guangzhou ou Yiwu et sont enregistrées.",
          en: "Your goods arrive at our warehouses in Guangzhou or Yiwu and are registered.",
        },
      },
      {
        step: "02",
        title: { fr: "Consolidation & emballage", en: "Consolidation & packing" },
        description: {
          fr: "Nous regroupons, emballons et étiquetons vos colis pour optimiser le volume.",
          en: "We consolidate, pack and label your parcels to optimize volume.",
        },
      },
      {
        step: "03",
        title: { fr: "Expédition internationale", en: "International shipment" },
        description: {
          fr: "Départ aérien ou maritime selon le mode choisi, avec numéro de suivi communiqué.",
          en: "Air or sea departure based on the chosen mode, with tracking number provided.",
        },
      },
      {
        step: "04",
        title: { fr: "Arrivée & remise", en: "Arrival & handover" },
        description: {
          fr: "Réception au port/aéroport de destination et remise à votre transitaire ou à notre équipe pour dédouanement.",
          en: "Reception at the destination port/airport and handover to your forwarder or our team for customs clearance.",
        },
      },
    ],
    includes: {
      fr: [
        "Fret aérien express (5 à 8 jours)",
        "Fret maritime LCL (groupage)",
        "Fret maritime FCL (conteneur complet)",
        "Entreposage sécurisé en Chine",
        "Emballage et étiquetage",
        "Assurance marchandise optionnelle",
      ],
      en: [
        "Air express freight (5 to 8 days)",
        "Sea freight LCL (consolidation)",
        "Sea freight FCL (full container)",
        "Secure warehousing in China",
        "Packing and labelling",
        "Optional cargo insurance",
      ],
    },
    benefits: {
      fr: [
        "Coûts optimisés grâce au groupage",
        "Délais maîtrisés et communication continue",
        "Aucun frais caché, tarif ferme",
        "Suivi en temps réel sur WhatsApp",
      ],
      en: [
        "Optimized costs thanks to consolidation",
        "Controlled lead times and continuous communication",
        "No hidden fees, firm rate",
        "Real-time tracking on WhatsApp",
      ],
    },
    faq: [
      {
        question: {
          fr: "Quel est le poids minimum pour un envoi aérien ?",
          en: "What is the minimum weight for an air shipment?",
        },
        answer: {
          fr: "Nous acceptons les envois à partir de 1 kg. Le tarif au kg diminue selon le volume.",
          en: "We accept shipments from 1 kg. The per-kg rate decreases with volume.",
        },
      },
      {
        question: {
          fr: "Puis-je mélanger plusieurs types de marchandises ?",
          en: "Can I mix several types of goods?",
        },
        answer: {
          fr: "Oui, dans la mesure où les marchandises sont compatibles et ne relèvent pas de restrictions douanières.",
          en: "Yes, provided the goods are compatible and not subject to customs restrictions.",
        },
      },
    ],
    stat: {
      value: "1 200+",
      label: {
        fr: "Expéditions livrées depuis 2018",
        en: "Shipments delivered since 2018",
      },
    },
  },
  {
    slug: "dedouanement-livraison",
    icon: FileCheck2,
    title: {
      fr: "Dédouanement & Livraison",
      en: "Customs Clearance & Delivery",
    },
    subtitle: {
      fr: "La dernière étape, entièrement prise en charge",
      en: "The final step, fully handled",
    },
    description: {
      fr: "Nous gérons toutes les formalités douanières et la livraison finale jusqu'à votre entrepôt, dans 5 pays d'Afrique Centrale et de l'Est.",
      en: "We handle all customs formalities and final delivery to your warehouse, in 5 Central and East African countries.",
    },
    hero: {
      fr: "Le dédouanement est souvent le point de blocage principal. Notre équipe de transitaires agréés prend tout en charge : documents, taxes, retrait et livraison à Kinshasa, Goma, Bujumbura, Kampala, Mombasa et au-delà.",
      en: "Customs clearance is often the main bottleneck. Our team of licensed freight forwarders handles everything: documents, taxes, pickup and delivery in Kinshasa, Goma, Bujumbura, Kampala, Mombasa and beyond.",
    },
    processSteps: [
      {
        step: "01",
        title: { fr: "Préparation documentaire", en: "Document preparation" },
        description: {
          fr: "Constitution de l'ensemble des documents nécessaires avant l'arrivée de la marchandise.",
          en: "Preparation of all necessary documents before the goods arrive.",
        },
      },
      {
        step: "02",
        title: { fr: "Dédouanement portuaire", en: "Port customs clearance" },
        description: {
          fr: "Dépôt des documents, paiement des taxes et obtention du bon à enlever.",
          en: "Document submission, tax payment and obtaining the release order.",
        },
      },
      {
        step: "03",
        title: { fr: "Retrait & tri", en: "Pickup & sorting" },
        description: {
          fr: "Retrait des conteneurs ou colis au port, tri et vérification finale.",
          en: "Pickup of containers or parcels at the port, sorting and final verification.",
        },
      },
      {
        step: "04",
        title: { fr: "Livraison finale", en: "Final delivery" },
        description: {
          fr: "Transport jusqu'à votre entrepôt, avec confirmation de réception.",
          en: "Transport to your warehouse, with receipt confirmation.",
        },
      },
    ],
    includes: {
      fr: [
        "Préparation des documents douaniers",
        "Paiement des taxes et droits",
        "Dédouanement portuaire et aéroportuaire",
        "Retrait et stockage temporaire",
        "Livraison jusqu'à votre entrepôt",
        "Suivi jusqu'à réception finale",
      ],
      en: [
        "Customs documentation preparation",
        "Payment of duties and taxes",
        "Port and airport customs clearance",
        "Pickup and temporary storage",
        "Delivery to your warehouse",
        "Tracking until final receipt",
      ],
    },
    benefits: {
      fr: [
        "Gain de plusieurs jours sur le dédouanement",
        "Aucun stress administratif pour vous",
        "Livraison porte-à-porte dans 5 pays",
        "Tarif ferme, sans frais cachés",
      ],
      en: [
        "Several days saved on customs clearance",
        "No administrative stress for you",
        "Door-to-door delivery in 5 countries",
        "Firm rate, no hidden fees",
      ],
    },
    faq: [
      {
        question: {
          fr: "Dans quels pays gérez-vous le dédouanement ?",
          en: "In which countries do you handle customs clearance?",
        },
        answer: {
          fr: "Burundi, République Démocratique du Congo, Ouganda, Tanzanie et Kenya.",
          en: "Burundi, Democratic Republic of Congo, Uganda, Tanzania and Kenya.",
        },
      },
      {
        question: {
          fr: "Puis-je récupérer ma marchandise moi-même au port ?",
          en: "Can I pick up my goods myself at the port?",
        },
        answer: {
          fr: "Oui, nous livrons au port et vous prenez le relais avec votre propre transitaire si vous le souhaitez.",
          en: "Yes, we deliver to the port and you take over with your own forwarder if you wish.",
        },
      },
    ],
    stat: {
      value: "99,2 %",
      label: {
        fr: "Livraisons dans les délais",
        en: "On-time deliveries",
      },
    },
  },
];

export const getServiceBySlug = (slug: string): ServiceDetail | undefined =>
  SERVICE_DETAILS.find((s) => s.slug === slug);