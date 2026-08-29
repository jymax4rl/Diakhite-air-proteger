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

  about: {
    main: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
  },
} as const;
