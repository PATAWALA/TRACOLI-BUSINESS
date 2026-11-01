# Design System & Animations TRACOLI

## 🎨 Couleurs
- **Rouge Principal** : `#E60000` (ou classes Tailwind `bg-tracoli-500`)
- **Fond** : Blanc pur `#FFFFFF` et Gris très clair `bg-ink-50`
- **Texte** : Noir profond `text-ink-900` et Gris `text-ink-500`

## ✨ Animations (Framer Motion)
TRACOLI est sérieux, mais moderne. Les animations doivent guider l'œil, pas distraire.
- **Au scroll** : `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}` avec un délai en cascade (`delay: i * 0.1`).
- **Hover** : Sur les boutons et cartes, une transition douce `transition-all duration-300`.
- **Hero** : Les images et textes apparaissent en fondu au chargement.
- **Boutons** : `active:scale-[0.98]` pour un effet de clic physique.

## 🧱 Composants UI Standards
- **Bouton Primaire** : Rouge, texte blanc, `rounded-xl`, ombre portée douce.
- **Cartes** : `rounded-3xl`, bordure `border-ink-200`, ombre au survol.
- **Images** : Toujours utiliser `next/image`. Jamais d'image brute. Ratio `aspect-[4/3]` ou `aspect-square`.

## 📱 Responsive & Layout
- Grilles : `grid-cols-1` sur mobile, `sm:grid-cols-2`, `lg:grid-cols-4`.
- **Important** : La page Home sur mobile doit avoir un `padding-bottom` (`pb-24`) pour ne pas être cachée par la BottomNav.