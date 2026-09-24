import type { NavLink } from "../shared/types";

/* ------------------------------------------------------------------ */
/*  Nav DESKTOP — pointe vers de vraies pages                          */
/* ------------------------------------------------------------------ */

export const NAV_LINKS: NavLink[] = [
  { label: { fr: "Accueil",     en: "Home" },      href: "/" },
  { label: { fr: "Sourcer",     en: "Source" },    href: "/sourcer" },
  { label: { fr: "Expédier",    en: "Ship" },      href: "/expedier" },
  { label: { fr: "Suivre",      en: "Track" },     href: "/suivre" },
  { label: { fr: "Ressources",  en: "Resources" }, href: "/ressources" },
  { label: { fr: "À propos",    en: "About" },     href: "/a-propos" },
] as const;

/* ------------------------------------------------------------------ */
/*  BOTTOM NAV MOBILE — pointe vers de vraies pages                    */
/* ------------------------------------------------------------------ */

export const BOTTOM_NAV_ITEMS = [
  { id: "home",   label: { fr: "Accueil",   en: "Home" },   href: "/",          icon: "home" },
  { id: "source", label: { fr: "Sourcer",   en: "Source" }, href: "/sourcer",   icon: "search" },
  { id: "ship",   label: { fr: "Expédier",  en: "Ship" },   href: "/expedier",  icon: "plane" },
  { id: "track",  label: { fr: "Suivre",    en: "Track" },  href: "/suivre",    icon: "pin" },
  { id: "about",  label: { fr: "À propos",  en: "About" },  href: "/a-propos",  icon: "info" },
] as const;