import type { NavLink } from "../shared/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Accueil",    href: "/" },
  { label: "Sourcer",    href: "/sourcer" },
  { label: "Expédier",   href: "/expedier" },
  { label: "Suivre",     href: "/suivre" },
  { label: "Ressources", href: "/ressources" },
  { label: "À propos",   href: "/a-propos" },
] as const;

export const BOTTOM_NAV_ITEMS = [
  { id: "home",    label: "Accueil",  href: "/",         icon: "home",    cta: false },
  { id: "source",  label: "Sourcer",  href: "/sourcer",  icon: "search",  cta: false },
  { id: "demande", label: "Commande", href: "/demande",  icon: "plus",    cta: true },
  { id: "track",   label: "Suivre",   href: "/suivre",   icon: "pin",     cta: false },
  { id: "ship",    label: "Expédier", href: "/expedier", icon: "plane",   cta: false },
] as const;
