# Guide des Assets Images

Les images ont été téléchargées dans le dossier `public/images/`. 
**ATTENTION : Toutes les images sont au format `.jpeg`.**

Claude Code DOIT utiliser ces images exactes pour les sections suivantes, et respecter les règles de design associées.

| Nom du fichier | Description | Section d'utilisation | Règle de design (Fond) |
|---|---|---|---|
| `hero-delivery.jpeg` | Livreur souriant en rouge avec des colis | `HomeHero` | Fond de la section : Blanc pur (`bg-white`). L'image se fondra dedans. |
| `warehouse.jpeg` | Grand entrepôt avec chaîne logistique | `HomeSourcing` | Fond de la section : Blanc pur (`bg-white`). |
| `box-handover.jpeg` | Remise de colis par une fenêtre de voiture | `HomeShipping` | Fond de la section : Blanc pur (`bg-white`). |
| `scooter.jpeg` | Coursier à moto avec sac rouge | `HomeTracking` | Fond de la section : Blanc pur (`bg-white`). |

**Règle d'or visuelle (Image Graphique)** :
Puisque ces images ont un fond blanc pur, les sections qui les contiennent DOIVENT avoir un fond blanc pur (`bg-white`). On ne met pas de gris autour. L'image doit sembler "flotter" naturellement dans la page. Utiliser `object-contain` plutôt que `object-cover` si nécessaire pour ne pas couper le sujet.