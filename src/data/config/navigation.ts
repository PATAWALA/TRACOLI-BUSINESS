import type { NavLink } from "../shared/types";

export const NAV_LINKS: NavLink[] = [
  { label: { fr: "Qui sommes-nous", en: "Who we are" }, href: "/a-propos" },
  { label: { fr: "Services", en: "Services" }, href: "/#services" },
  { label: { fr: "Ressources", en: "Resources" }, href: "/ressources" },
  { label: { fr: "Processus", en: "Process" }, href: "/#processus" },
] as const;

export const BOTTOM_NAV_ITEMS = [
  { id: "home",   label: { fr: "Accueil", en: "Home" },  href: "/",            icon: "home" },
  { id: "source", label: { fr: "Sourcer", en: "Source" }, href: "/#sourcing",   icon: "search" },
  { id: "ship",   label: { fr: "Expédier", en: "Ship" },  href: "/#logistique", icon: "plane" },
  { id: "track",  label: { fr: "Suivre", en: "Track" },   href: "/#tracking",   icon: "pin" },
  { id: "about",  label: { fr: "À propos", en: "About" }, href: "/a-propos",    icon: "info" },
] as const;