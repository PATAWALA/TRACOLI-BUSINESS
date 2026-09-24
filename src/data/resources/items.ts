import type { Resource } from "../shared/types";

export const RESOURCES: Resource[] = [
  /* ------------------------------------------------------------------ */
  /*  1. GUIDE GRATUIT — PREMIERS PAS                                    */
  /* ------------------------------------------------------------------ */
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
    format: { fr: "PDF téléchargeable", en: "Downloadable PDF" },
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

  /* ------------------------------------------------------------------ */
  /*  2. GUIDE GRATUIT — ÉVITER LES ARNAQUES                             */
  /* ------------------------------------------------------------------ */
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
    format: { fr: "PDF téléchargeable", en: "Downloadable PDF" },
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

  /* ------------------------------------------------------------------ */
  /*  3. EBOOK PREMIUM — GROUPAGE LCL                                    */
  /* ------------------------------------------------------------------ */
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
          en: "Part 2: Calculation and optimization",
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

  /* ------------------------------------------------------------------ */
  /*  4. EBOOK PREMIUM — DÉDOUANEMENT RDC                                */
  /* ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ */
  /*  5. FORMATION — SOURCING & IMPORTATION                             */
  /* ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ */
  /*  6. FORMATION — ENTREPRENDRE DANS L'IMPORTATION                     */
  /* ------------------------------------------------------------------ */
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