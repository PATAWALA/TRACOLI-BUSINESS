# Structure des Pages (Français uniquement)

## 🏠 Home `/` (5 Sections seulement)

### 1. HomeHero
- **Design** : Split screen (Texte à gauche, Image à droite sur Desktop). Sur mobile, texte en haut, image en bas.
- **Fond de section** : Blanc pur (`bg-white`).
- **Image** : `/images/hero-delivery.jpeg` (Livreur souriant). Utiliser `object-contain` pour bien voir le sourire et les colis.
- **Texte** : Badge "Coordinateur Chine → Afrique", Titre "Votre sourcing Chine → Afrique, simplement.", Sous-titre (Slogan).
- **CTA** : "Trouver un produit" (Rouge) et "Suivre ma commande" (Outline).

### 2. HomeSourcing (Section avec image)
- **Design** : Image à gauche, Texte à droite.
- **Fond de section** : Blanc pur (`bg-white`).
- **Image** : `/images/warehouse.jpeg` (Entrepôt).
- **Texte** : "Vous cherchez un produit en Chine ? Nous identifions, négocions et coordonnons."
- **CTA** : "Sourcer un produit" → `/sourcer`.

### 3. HomeShipping (Section avec image)
- **Design** : Image à droite, Texte à gauche (inversé).
- **Fond de section** : Blanc pur (`bg-white`).
- **Image** : `/images/box-handover.jpeg` (Remise colis).
- **Texte** : "Vous devez expédier vers l'Afrique ? Fret aérien/maritime et douane."
- **CTA** : "Estimer mon fret" → `/expedier`.

### 4. HomeTracking (Section avec image)
- **Design** : Image à gauche, Texte à droite.
- **Fond de section** : Blanc pur (`bg-white`).
- **Image** : `/images/scooter.jpeg` (Coursier moto).
- **Texte** : "Suivez votre marchandise en temps réel. Entrez votre référence."
- **CTA** : "Suivre ma commande" → `/suivre`.

### 5. HomeAboutCTA (Fusion À propos + CTA + Newsletter)
- **Design** : Fond rouge clair (`bg-tracoli-50`), texte centré.
- **Image** : `/about1.jpg` (L'image d'équipe ou d'opération que tu as déjà dans le dossier public).
- **Contenu** : Court texte "Qui sommes-nous ?", bouton "Découvrir notre histoire", et un champ email pour la newsletter.

*(Note : Supprimer toutes les anciennes sections HomeActions, HomeWhatWeDo, HomeProcess, etc.)*

## 🔎 Page `/sourcer` (Détails)
1. Hero simple.
2. Grille de produits avec filtres (si tu as des images de produits, mets-les dans `public/images/products/`).
3. Formulaire en 2 étapes.

## ✈️ Page `/expedier` (Détails)
1. Hero.
2. Explication des 2 modes (Aérien / Maritime) avec icônes.
3. Zones desservies.
4. Formulaire en 3 étapes.

## 📍 Page `/suivre` (Détails)
1. Hero court.
2. Champ de recherche (Input) + Bouton "Tracer".
3. Timeline dynamique (10 statuts).