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
  { id: "home",   label: "Accueil",  href: "/",         icon: "home" },
  { id: "source", label: "Sourcer",  href: "/sourcer",  icon: "search" },
  { id: "ship",   label: "Expédier", href: "/expedier", icon: "plane" },
  { id: "track",  label: "Suivre",   href: "/suivre",   icon: "pin" },
  { id: "about",  label: "À propos", href: "/a-propos", icon: "info" },
] as const;
