import type { Locale } from "./types";

export const DEFAULT_LOCALE: Locale = "fr";

/** Sélectionne la variante selon la locale active. */
export const t = <T>(locale: Locale, fr: T, en: T): T =>
  locale === "fr" ? fr : en;