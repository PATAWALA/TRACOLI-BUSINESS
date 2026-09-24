import { IDENTITY } from "./identity";

export const CONTACT = {
  brand: IDENTITY.shortName,
  brandFull: IDENTITY.legalName,
  manager: "Mr Hope",
  managerRole: {
    fr: "Responsable Marketing & Service Client",
    en: "Marketing & Customer Service Manager",
  },
  phoneDisplay: "+257 69 03 27 65",
  phoneRaw: "25769032765",
  email: "contact@tracoli-business.com",
  social: {
    facebook: "https://facebook.com/tracoli",
  },
} as const;