import { IDENTITY } from "./identity";

export const CONTACT = {
  brand: IDENTITY.shortName,
  brandFull: IDENTITY.legalName,
  manager: "l'équipe TRACOLI",
  managerRole: "Responsable Marketing & Service Client",
  phoneDisplay: "+257 69 03 27 65",
  phoneRaw: "25769032765",
  email: "contact@tracolibusiness.com",
  social: {
    facebook: "https://facebook.com/tracoli",
  },
} as const;
