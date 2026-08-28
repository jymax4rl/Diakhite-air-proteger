/**
 * Centralised image registry.
 * All image paths in the application must reference this file.
 * Replace placeholder SVGs with production images — the paths stay the same.
 */
export const images = {
  hero: {
    ventilation: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85&auto=format&fit=crop",
    // Industrial HVAC ductwork ceiling shot
  },

  services: {
    residential: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80&auto=format&fit=crop",
    // Modern living room interior
    commercial: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
    // Modern office interior
    industrial: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
    // Industrial pipes/factory
    maintenance: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format&fit=crop",
    // Technician doing HVAC maintenance
  },

  about: {
    main: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
    // Modern building exterior with glass facade
  },

  projects: {
    project01: "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&q=80&auto=format&fit=crop",
    // Industrial facility/warehouse
    project02: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80&auto=format&fit=crop",
    // Office building
    project03: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80&auto=format&fit=crop",
    // Residential building
    project04: "https://images.unsplash.com/photo-1565108476672-9dc7f7caeb61?w=800&q=80&auto=format&fit=crop",
    // Factory/industrial
  },

  logo: {
    main: "/images/logo/ventila-logo.svg",
  },
} as const;

export type ImageKey = typeof images;
