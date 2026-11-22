// Preuves visuelles de la page d'accueil : uniquement de vraies photos.
//
// Pour ajouter une photo de commande ou la capture d'un vrai suivi :
//   1. déposer l'image (webp ou jpg) dans public/images/preuves/
//   2. ajouter une entrée ci-dessous : { src, alt, caption, width, height }
// La grille s'adapte seule (2 images : 2 colonnes, 3 ou plus : 3 colonnes).
//
// Ne pas y mettre de document contenant des noms de clients : ces
// images sont publiques.

export type ProofItem = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const PROOF_ITEMS: ProofItem[] = [
  {
    src: "/about1.jpg",
    alt: "Membre de l'équipe TRACOLI Business en polo rouge à l'effigie de la marque",
    caption: "Une équipe TRACOLI, du devis à la livraison",
    width: 1122,
    height: 1402,
  },
  {
    src: "/about2.jpg",
    alt: "Casquette TRACOLI Business tendue vers l'objectif",
    caption: "TRACOLI Business, votre interlocuteur unique",
    width: 1122,
    height: 1402,
  },
];
