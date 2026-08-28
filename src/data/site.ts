export const site = {
  brand: {
    name: "Ventila Solutions",
    logoPrimary: "Ventila",
    logoSecondary: "Solutions",
  },
  url: "https://diakhite-air-proteger.vercel.app",
  contact: {
    phone: {
      display: "06 51 64 46 57",
      e164: "+33651644657",
      href: "tel:+33651644657",
    },
    email: {
      address: "contact@ventila-solutions.fr",
      href: "mailto:contact@ventila-solutions.fr",
      verified: false,
    },
  },
  company: {
    legalName: "AIR PROTEGER",
    legalForm: "Société par actions simplifiée (SAS)",
    status: "Active",
    creationDate: "2025-06-03",
    creationDateDisplay: "3 juin 2025",
    shareCapital: "1 000 €",
    siren: "987925013",
    sirenDisplay: "987 925 013",
    siret: "98792501300011",
    siretDisplay: "987 925 013 00011",
    rcs: "987 925 013 R.C.S. Meaux",
    vatId: "FR94987925013",
    vatIdDisplay: "FR 94 987 925 013",
    apeCode: "43.22B",
    apeLabel: "Travaux d’installation d’équipements thermiques et de climatisation",
    registeredAddress: {
      streetAddress: "10 avenue Normandie Niemen",
      postalCode: "77290",
      addressLocality: "Mitry-Mory",
      addressCountry: "FR",
      display: "10 avenue Normandie Niemen, 77290 Mitry-Mory",
    },
  },
} as const;

export const organizationId = `${site.url}/#organization`;
