---
name: TRACOLI BUSINESS
description: Sourcing et logistique Chine–Afrique, un guichet clair : rouge net sur fond blanc, cartes arrondies, actions évidentes.
colors:
  tracoli-50: "#fff1f1"
  tracoli-100: "#ffe0e0"
  tracoli-200: "#ffc5c5"
  tracoli-300: "#ff8a8a"
  tracoli-400: "#ff4d4d"
  tracoli-500: "#e60000"
  tracoli-600: "#cc0000"
  tracoli-700: "#a30000"
  ink-900: "#0a0a0a"
  ink-800: "#1f2937"
  ink-700: "#374151"
  ink-500: "#6b7280"
  ink-400: "#9ca3af"
  ink-300: "#d1d5db"
  ink-200: "#e5e7eb"
  ink-100: "#f3f4f6"
  ink-50: "#f9fafb"
  paper: "#ffffff"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "32px"
  section-sm: "80px"
  section-lg: "112px"
components:
  button-primary:
    backgroundColor: "{colors.tracoli-500}"
    textColor: "{colors.paper}"
    rounded: "{rounded.2xl}"
    padding: "16px 32px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.tracoli-600}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.2xl}"
    padding: "16px 32px"
    height: "56px"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.tracoli-600}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
---

# Design System: TRACOLI BUSINESS

## Overview

**Creative North Star: "Le Guichet de confiance"**

Le site se comporte comme un guichet bien tenu : on arrive, on voit tout de suite où aller, et une seule couleur forte dit « c'est ici qu'on agit ». Le rouge TRACOLI est net, le fond est blanc, les cartes sont arrondies et posées avec une ombre douce. Le ton est direct et rassurant, sans jargon : un commerçant sur téléphone doit comprendre en une seconde s'il faut chercher un produit ou suivre une commande.

La densité est aérée : sections généreuses, cibles tactiles larges (56px pour les actions principales), textes courts. Le rouge reste un signal, pas une ambiance : il marque l'action principale, l'état actif et quelques repères, jamais de grandes surfaces rouges. Rien de décoratif qui alourdit une connexion lente.

**Key Characteristics:**
- Rouge vif `#e60000` rare et fonctionnel sur fond blanc et gris très clair.
- Une seule famille typographique, Plus Jakarta Sans, en graisses 700 à 800 pour les titres.
- Cartes bordurées, coins 16px, ombres diffuses au repos.
- Actions principales larges, faciles à toucher au pouce.
- Animations d'apparition minimales, en CSS pur, désactivées si `prefers-reduced-motion`.

## Colors

Un rouge corporate unique, porté par une échelle de gris neutres légèrement froids.

### Primary
- **Rouge Guichet** (#e60000, `tracoli-500`) : boutons principaux, lien actif de la navigation, icônes d'accent, sélection de texte. Hover : **Rouge Profond** (#cc0000, `tracoli-600`).
- **Rouge Pressé** (#a30000, `tracoli-700`) : états appuyés et texte rouge sur fond clair quand il faut plus de contraste.

### Secondary
- **Voile Rosé** (#fff1f1 `tracoli-50`, #ffe0e0 `tracoli-100`, #ffc5c5 `tracoli-200`, #ff8a8a `tracoli-300`, #ff4d4d `tracoli-400`) : pastilles d'icônes, fonds de sections douces, bordures de puces.

### Neutral
- **Encre** (#0a0a0a, `ink-900`) : titres et texte principal.
- **Ardoise** (#1f2937 `ink-800`, #374151 `ink-700`) : navigation, texte de boutons secondaires.
- **Gris Posé** (#6b7280, `ink-500`) : texte courant secondaire, sous-titres.
- **Filets** (#e5e7eb `ink-200`, #d1d5db `ink-300`) : bordures de cartes et séparateurs.
- **Papier Froid** (#f9fafb `ink-50`, #f3f4f6 `ink-100`) : fonds de sections alternées, pied de page, survols.
- **Blanc** (#ffffff) : fond de page et de cartes.

### Named Rules
**The Signal Rule.** Le rouge sert à agir ou à situer (bouton, lien actif, icône d'accent). Aucune grande surface rouge, aucun fond de section rouge.

**The One Red Rule.** Une seule teinte de rouge par état ; ne pas introduire d'autre rouge, orange ou rose saturé à côté.

## Typography

**Display Font:** Plus Jakarta Sans (avec ui-sans-serif, system-ui, sans-serif)
**Body Font:** Plus Jakarta Sans (même famille)

**Character:** une sans-serif géométrique et chaleureuse, utilisée lourde pour les titres et normale pour le texte. La hiérarchie vient de la graisse et de la taille, pas d'un deuxième caractère.

### Hierarchy
- **Display** (800, 2.25rem → 3rem → 3.75rem selon l'écran, 1.08, -0.025em) : titre principal de l'accueil, « Votre sourcing Chine → Afrique, simplement. » avec la partie clé en rouge.
- **Headline** (800, 1.875rem → 2.25rem, ≈1.2, -0.025em) : titres de sections.
- **Title** (800, 0.9375rem, -0.025em) : titres de cartes.
- **Body** (400, 1rem, 1.6) : texte courant ; sous-titres de sections en 14.5px et texte de cartes en 13px, gris posé. Largeur de lecture limitée (max-w-xl à 2xl).
- **Label** (700, 0.6875rem à 0.75rem, +0.05em, majuscules) : pastilles de section (« Nos services ») et sur-titres.

### Named Rules
**The Weight Carries It Rule.** Hiérarchie par la graisse (800 titres, 400 texte) et la taille, jamais par une seconde police.

## Layout

Conteneur centré de 80rem (`max-w-7xl`) avec gouttières de 16px, 24px puis 32px selon l'écran. Les sections alternent fond blanc et fond Papier Froid, avec 80px (mobile) à 112px (grand écran) de marge verticale. Les grilles passent de 1 colonne à 2 puis 4 (`sm:grid-cols-2 lg:grid-cols-4`) avec un espacement de 20 à 24px. Le hero est en deux colonnes à partir de `lg`, centré sur mobile.

En-tête fixe, hauteur variable `--header-h` : 4rem (mobile), 4.5rem (≥640px), 6rem (≥1024px). La navigation de bureau n'apparaît qu'à partir de `lg` ; sur mobile, une barre de navigation basse (`MobileBottomNav`) prend le relais. Le pied de page n'est affiché qu'à partir de `lg`. L'en-tête et le pied sont masqués sur `/demande`.

## Elevation & Depth

Hybride, doux au repos. La profondeur vient de bordures fines (`ink-200`) et d'ombres diffuses, pas de contrastes violents. Au survol, une carte se soulève légèrement et sa bordure vire au rouge à 40 %.

### Shadow Vocabulary
- **Carte** (`box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.06)`) : cartes au repos.
- **Carte levée** (`0 4px 12px rgba(0,0,0,0.05), 0 24px 48px -16px rgba(0,0,0,0.1)`) : cartes survolées.
- **Rouge** (`0 10px 30px -10px rgba(230,0,0,0.4)`) : boutons principaux uniquement.

### Named Rules
**The Red Glow Is For Action Rule.** L'ombre rouge est réservée aux boutons principaux ; ni carte, ni icône, ni titre ne la reçoit.

## Shapes

Langage arrondi et amical. Cartes et boutons principaux : 16px (`rounded-2xl`). En-tête, boutons d'en-tête et pastilles d'icônes : 12px (`rounded-xl`). Pastilles et étiquettes : forme pleine (`rounded-full`). Quelques grands blocs montent à 24px (`rounded-3xl`). Les bordures font 1px (`ink-200`), 2px pour les boutons secondaires. Le logo est une tuile rouge à coins arrondis (rayon 72 sur 320) avec une flèche blanche.

## Components

### Buttons
- **Shape:** coins 16px (12px dans l'en-tête).
- **Primary:** fond Rouge Guichet, texte blanc gras 14px, hauteur minimale 56px, padding 16px 32px, ombre rouge ; icône Lucide à gauche. Exemple : « Trouver un produit », « Passer commande ».
- **Hover / Focus:** passe à Rouge Profond, l'ombre grandit ; le conteneur monte à 1.02 au survol et descend à 0.98 à l'appui.
- **Secondary:** fond blanc translucide, bordure 2px `ink-200`, texte Ardoise gras ; au survol la bordure passe à `tracoli-300`. Exemple : « Suivre ma commande ».

### Chips
- **Style:** pastille ronde, fond blanc, bordure `tracoli-200`, texte rouge (`tracoli-500`/`600`) en majuscules 11–12px gras, parfois avec un point rouge animé.
- **State:** décoratives/informatives ; pas de variante sélectionnée documentée.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** blanc, sur fond de section Papier Froid.
- **Shadow Strategy:** Carte au repos, Carte levée au survol (voir Elevation).
- **Border:** 1px `ink-200`, vire à `tracoli-500` à 40 % au survol.
- **Internal Padding:** 24px (28px à partir de `lg`).
- Pastille d'icône : carré 48px, coins 12px, fond `tracoli-50`, icône rouge ; inversée (fond rouge, icône blanche) au survol de la carte.

### Navigation
- **Style:** liens 15px gras, Ardoise ; actif en Rouge Guichet avec un soulignement rouge de 3px ; survol sur fond `ink-100`, coins 8px. En-tête blanc translucide avec flou, bordure basse qui apparaît au défilement.
- **Mobile:** barre de navigation basse ; l'en-tête garde le logo seul.

### Logo (signature)
Tuile rouge dégradée (#ff1a1a → #c40000) avec flèche blanche en « T », suivie du mot « TRACOLI » en noir extra-gras (tracking -0.04em) et de « SUPPLY CHAIN » en petites capitales espacées entre deux filets. Version claire (texte noir) et sombre (texte blanc).

## Do's and Don'ts

### Do:
- **Do** réserver le rouge `#e60000` aux actions principales, à l'état actif et aux petits repères.
- **Do** garder des cibles tactiles d'au moins 56px de haut pour les actions principales.
- **Do** utiliser Plus Jakarta Sans seule, en graisse 800 pour les titres et 400 pour le texte.
- **Do** poser les cartes en blanc avec bordure `ink-200` et ombre Carte au repos.
- **Do** écrire en français simple : les mots du métier (sourcing, groupage, dédouanement) sont expliqués par le contexte.
- **Do** désactiver toute animation d'apparition sous `prefers-reduced-motion`.

### Don't:
- **Don't** remplir de grandes surfaces ou sections en rouge.
- **Don't** appliquer l'ombre rouge ailleurs que sur les boutons principaux.
- **Don't** ajouter de dégradés de texte, de halos ou d'effets décoratifs qui alourdissent le site sur connexion lente.
- **Don't** introduire une seconde police ou un second rouge.
- **Don't** inventer de faux témoignages, chiffres ou garanties pour remplir une section de preuve.
