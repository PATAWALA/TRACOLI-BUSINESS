import { Search, ShieldCheck, Plane, FileCheck2 } from "lucide-react";
import type { ServiceDetail } from "../shared/types";

/* ================================================================== */
/*  QUOTE HUB — Hub de conversion stratégique                          */
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
/*  SERVICE DETAILS — Pages /services/[slug]                           */
/* ================================================================== */

export const SERVICE_DETAILS: ServiceDetail[] = [
  /* ------------------------------------------------------------------ */
  /*  1. SOURCING & NÉGOCIATION                                          */
  /* ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ */
  /*  2. INSPECTION & CONFORMITÉ                                         */
  /* ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ */
  /*  3. FRET INTERNATIONAL                                              */
  /* ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ */
  /*  4. DÉDOUANEMENT & LIVRAISON                                        */
  /* ------------------------------------------------------------------ */
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