/** Centralised registry for every image rendered by the application. */
export const images = {
  hero: {
    ventilation: "/images/hero/conduits-ventilation-metalliques-professionnels.jpg",
  },

  servicePage: {
    hero: "/images/services/systemes-techniques-cvc-batiment.jpg",
    airConditioning: "/images/services/unites-climatisation-batiment.jpg",
    heating: "/images/services/chauffage-radiateur-batiment.jpg",
    professional: "/images/services/ventilation-professionnelle-bureaux.jpg",
    hydraulicNetwork: "/images/services/reseaux-hydrauliques-cvc-batiment.jpg",
    plumbingFittings: "/images/services/reseau-plomberie-raccords.jpg",
  },

  projects: {
    cvcRoof:
      "/images/realisations/intervention-cvc-ventilation-toiture.jpg",
  },

  logo: {
    primary: "/images/logo/air-proteger-logo.jpg",
    markLight: "/images/logo/air-proteger-mark-light.png",
  },
} as const;
