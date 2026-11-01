# Guide des Assets Images

Les images sont dans le dossier `public/images/`.
**Les images détourées (.png transparentes) sont prioritaires. Le .jpeg reste en fallback pour `warehouse`.**

Claude Code DOIT utiliser ces images exactes pour les sections suivantes.

| Nom du fichier | Description | Section d'utilisation | Règle de design (Fond) |
|---|---|---|---|
| `hero-delivery.png` | Livreur souriant en rouge avec des colis (fond transparent) | `HomeHero` | Dégradé rouge subtil (`bg-gradient-to-b from-white via-tracoli-50 to-white`). L'image flotte sur le dégradé. |
| `warehouse.jpeg` | Grand entrepôt avec chaîne logistique | `HomeSourcing` | Dégradé rouge subtil. |
| `box-handover.png` | Remise de colis (fond transparent) | `HomeShipping` | Dégradé rouge subtil. L'image flotte sur le dégradé. |
| `scooter.png` | Coursier à moto avec sac rouge (fond transparent) | `HomeTracking` | Dégradé rouge subtil. L'image flotte sur le dégradé. |

**Règle d'or visuelle (Image Détourée)** :
Les images .png ont un fond transparent. Les sections utilisent des dégradés rouges subtils (`from-white via-tracoli-50 to-white`). L'image "flotte" naturellement sur le dégradé. Utiliser `object-contain` et `drop-shadow-xl` pour un effet premium.
