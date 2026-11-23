// Galerie de l'accueil : uniquement de vraies photos de TRACOLI.
//
// Pour ajouter ou remplacer une photo :
//   1. l'optimiser (WebP, 1200 px maximum sur le grand côté) et la déposer dans public/images/galerie/
//   2. ajouter une entrée ci-dessous : { src, caption, width, height }
//
// La première photo s'affiche en grand : à choisir avec soin. Cinq photos donnent
// la mosaïque la plus nette ; au-delà, la grille devient chargée.
// Toujours vérifier que les personnes visibles ont accepté d'être publiées, et ne
// jamais y mettre de document portant des noms de clients.

export type GalleryPhoto = {
  src: string;
  /** Légende courte : sert aussi de texte alternatif et s'affiche dans la visionneuse. */
  caption: string;
  width: number;
  height: number;
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: "/images/galerie/chargement-conteneur-chariot.webp",
    caption: "Chargement d'un conteneur au chariot élévateur",
    width: 735,
    height: 983,
  },
  {
    src: "/images/galerie/sacs-a-main.webp",
    caption: "Sacs à main en sachets",
    width: 736,
    height: 736,
  },
  {
    src: "/images/galerie/pesee-colis.webp",
    caption: "Pesée d'un colis",
    width: 736,
    height: 981,
  },
  {
    src: "/images/galerie/cartons-entrepot.webp",
    caption: "Cartons ouverts en entrepôt",
    width: 720,
    height: 960,
  },
  {
    src: "/images/galerie/chargement-conteneur.webp",
    caption: "Chargement d'un conteneur",
    width: 736,
    height: 981,
  },
];
