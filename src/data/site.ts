export const site = {
  brand: {
    name: "Diakhite Air Proteger",
    logoPrimary: "Diakhite Air",
    logoSecondary: "Proteger",
  },
  url: "https://air-proteger.com",
  contact: {
    phone: {
      display: "06 51 64 46 57",
      e164: "+33651644657",
      href: "tel:+33651644657",
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
  /**
   * Public Google Search permalink for the Knowledge Panel entity
   * listed as “Air Proteger”. Session parameters (`mat`, `authuser`)
   * were stripped. No public Maps place, category, hours, phone,
   * website, photos, rating, or claimed status were confirmed on the
   * listing — do not invent them here.
   */
  google: {
    listedName: "Air Proteger",
    searchUrl:
      "https://www.google.com/search?q=Air+Proteger&stick=H4sIAAAAAAAA_-NgU1I1qEhMNkhMSUozMDUwT7EwMTa0MqgwtzBNMjJIMzYzTzMys0gxW8TK45hZpBBQlF-Smp5aBACxW_WzOAAAAA",
  },
} as const;

export const organizationId = `${site.url}/#organization`;
