/* ================================================================== */
/*  SHARED                                                             */
/* ================================================================== */
export * from "./shared/types";
export * from "./shared/helpers";

/* ================================================================== */
/*  CONFIG                                                             */
/* ================================================================== */
export * from "./config/identity";
export * from "./config/contact";
export * from "./config/navigation";

/* ================================================================== */
/*  HOME                                                               */
/* ================================================================== */
export * from "./home/hero";
export * from "./home/actions";
export * from "./home/categories";
export * from "./home/why";
export * from "./home/proof";
export * from "./home/process";

/* ================================================================== */
/*  SERVICES                                                           */
/* ================================================================== */
export * from "./services/list";
export * from "./services/details";

/* ================================================================== */
/*  RESOURCES                                                          */
/* ================================================================== */
export * from "./resources/hero";
export * from "./resources/items";
export * from "./products/items";

/* ================================================================== */
/*  ABOUT                                                              */
/* ================================================================== */
export * from "./about/hero";
export * from "./about/values";
export * from "./about/timeline";
export * from "./about/team";

/* ================================================================== */
/*  LOGISTICS                                                          */
/* ================================================================== */
export * from "./logistics/destinations";
export * from "./logistics/rates";
export * from "./logistics/forms";

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */
export const FOOTER = {
  tagline: "Trade Connectors Logistics International",
  zonesTitle: "Zones desservies",
  legal: "Tous droits réservés.",
  credit: "Développé par Abdoulaye Patawala — Architecte Web",
} as const;
