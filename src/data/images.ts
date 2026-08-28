/**
 * Centralised image registry.
 * All image paths in the application must reference this file.
 * Replace placeholder SVGs with production images — the paths stay the same.
 */
export const images = {
  hero: {
    ventilation: "/images/hero/ventilation-hero.svg",
  },

  services: {
    residential: "/images/services/ventilation-residentielle.svg",
    commercial: "/images/services/ventilation-commerciale.svg",
    industrial: "/images/services/ventilation-industrielle.svg",
    maintenance: "/images/services/maintenance-ventilation.svg",
  },

  about: {
    main: "/images/about/ventilation-installation.svg",
  },

  projects: {
    project01: "/images/projects/projet-01.svg",
    project02: "/images/projects/projet-02.svg",
    project03: "/images/projects/projet-03.svg",
    project04: "/images/projects/projet-04.svg",
  },

  logo: {
    main: "/images/logo/ventila-logo.svg",
  },
} as const;

export type ImageKey = typeof images;
