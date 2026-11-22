# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Petits commerçants et revendeurs d'Afrique de l'Est et centrale (Bujumbura, Kinshasa, Goma, Kampala, Mombasa) qui veulent importer des produits de Chine sans connaître les fournisseurs ni la logistique. Ils visitent surtout le site depuis un téléphone, parfois avec une connexion lente. Leur tâche : décrire un produit à trouver, obtenir un devis, puis suivre leur commande jusqu'à la livraison.

## Product Purpose

TRACOLI BUSINESS (Trade Connectors Logistics International) est un coordinateur d'approvisionnement international Chine → Afrique. Le site présente les services (sourcing, expédition, suivi), recueille les demandes de sourcing et de devis (enregistrées dans Supabase, avec alertes email à l'admin) et permet de suivre les colis par code. Succès : un visiteur envoie une demande qualifiée, puis revient suivre sa commande.

## Positioning

Un seul interlocuteur de bout en bout : recherche des fournisseurs, sécurisation de l'achat, transport et livraison, gérés par la même équipe. Slogan : « Nous trouvons, vous vendez. »

## Operating Context

Une partie admin (`/admin`) gère leads, clients, commandes, colis, paiements, partenaires, produits et newsletter. Les codes de colis sont saisis et modifiables à la main. Les clients en attente sont importés par migration Supabase.

## Capabilities and Constraints

- Stack existante : Next.js 16 (App Router, version avec changements cassants : lire `node_modules/next/dist/docs/` avant de coder), React 19, Tailwind 4, Supabase, Resend, lucide-react.
- Pages publiques : accueil, `/sourcer`, `/expedier`, `/suivre`, `/demande`, `/ressources`, `/a-propos`, `/services`.
- Contenu entièrement en français ; vocabulaire établi : sourcing, groupage (LCL), conteneur (FCL), fret aérien/maritime, dédouanement.
- Performance : le site a déjà été allégé (retrait de framer-motion, images WebP, composants serveur) ; rester léger.

## Brand Commitments

- Nom : TRACOLI BUSINESS.
- Rouge de marque `#e60000` et logo existant (`public/logo.jpg`, composant `Logo.tsx`) à conserver.
- Typographie actuelle : Plus Jakarta Sans.

## Evidence on Hand

Photo de livreur TRACOLI (`public/images/hero-delivery.webp`), images « à propos » (`public/about1.jpg`, `about2.jpg`). Aucun témoignage, chiffre de volume, délai ou tarif confirmé : ne rien inventer de tel.

## Product Principles

1. Un seul interlocuteur : chaque page doit montrer le chemin de la demande à la livraison, sans jargon inutile.
2. Mobile d'abord, connexions lentes : légèreté et lisibilité avant l'effet.
3. Confiance par la preuve réelle : pas de faux avis, chiffres ou garanties non confirmés.
4. Action directe : « Trouver un produit » et « Suivre ma commande » restent à portée de pouce.

## Accessibility & Inclusion

Aucune norme imposée. Public mobile avec réseaux lents : contrastes lisibles, cibles tactiles larges, textes courts en français clair.
