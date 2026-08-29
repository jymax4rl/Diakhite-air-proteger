import { images } from "./images";

export const serviceSlugs = [
  "ventilation",
  "chauffage",
  "climatisation",
  "hydraulique",
  "plomberie",
  "cvc",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
export type ServiceIcon =
  | "air"
  | "heating"
  | "cooling"
  | "hydraulic"
  | "plumbing"
  | "cvc";

export interface Service {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  summary: string;
  details: readonly string[];
  image: string;
  imageAlt: string;
  icon: ServiceIcon;
  href: `/services/${ServiceSlug}`;
  treatment: "feature" | "split" | "spotlight";
}

/**
 * Canonical commercial catalog. Homepage cards, the services hub, detail
 * routes, contact choices, footer links, schema and sitemap all derive from it.
 */
export const services = [
  {
    slug: "ventilation",
    title: "Ventilation",
    shortTitle: "Ventilation",
    eyebrow: "Renouvellement d’air",
    description: "VMC, extraction d’air et ventilation professionnelle",
    summary:
      "Installation, entretien, maintenance et dépannage des systèmes de ventilation, de la VMC aux solutions d’extraction d’air et de ventilation professionnelle.",
    details: [
      "Installation de systèmes de ventilation et de VMC",
      "Extraction d’air et ventilation professionnelle",
      "Entretien, maintenance et dépannage",
    ],
    image: images.servicePage.professional,
    imageAlt:
      "Intérieur professionnel équipé de réseaux destinés au renouvellement d’air",
    icon: "air",
    href: "/services/ventilation",
    treatment: "feature",
  },
  {
    slug: "chauffage",
    title: "Chauffage",
    shortTitle: "Chauffage",
    eyebrow: "Confort thermique",
    description: "Installation, entretien, maintenance et dépannage",
    summary:
      "Installation, entretien, maintenance et dépannage des équipements de chauffage en tenant compte des usages et de l’installation existante.",
    details: [
      "Installation de chauffage",
      "Entretien et maintenance des installations",
      "Dépannage des équipements de chauffage",
    ],
    image: images.servicePage.heating,
    imageAlt: "Radiateur vertical intégré dans un intérieur contemporain",
    icon: "heating",
    href: "/services/chauffage",
    treatment: "feature",
  },
  {
    slug: "climatisation",
    title: "Climatisation",
    shortTitle: "Climatisation",
    eyebrow: "Confort du bâtiment",
    description: "Installation, entretien, maintenance et dépannage",
    summary:
      "Installation, entretien, maintenance et dépannage des systèmes de climatisation selon les volumes, les usages et les contraintes du bâtiment.",
    details: [
      "Installation de systèmes de climatisation",
      "Entretien et maintenance des équipements",
      "Dépannage des installations de climatisation",
    ],
    image: images.servicePage.airConditioning,
    imageAlt:
      "Unités extérieures de climatisation installées sur la façade d’un bâtiment",
    icon: "cooling",
    href: "/services/climatisation",
    treatment: "split",
  },
  {
    slug: "hydraulique",
    title: "Hydraulique",
    shortTitle: "Hydraulique",
    eyebrow: "Réseaux techniques CVC",
    description: "Réseaux hydrauliques techniques du bâtiment",
    summary:
      "Intervention sur les réseaux hydrauliques techniques qui distribuent et font circuler les fluides des installations de chauffage et de CVC.",
    details: [
      "Réseaux hydrauliques techniques du bâtiment",
      "Circulation et distribution des fluides",
      "Coordination avec les installations de chauffage et de CVC",
    ],
    image: images.servicePage.hydraulicNetwork,
    imageAlt:
      "Réseau hydraulique CVC composé de conduites isolées dans un local technique propre",
    icon: "hydraulic",
    href: "/services/hydraulique",
    treatment: "spotlight",
  },
  {
    slug: "plomberie",
    title: "Plomberie & sanitaire",
    shortTitle: "Plomberie",
    eyebrow: "Eau du bâtiment",
    description: "Installation, dépannage, fuite, réparation et sanitaire",
    summary:
      "Installation et dépannage de plomberie, recherche de fuite, réparation et interventions sur les équipements sanitaires du bâtiment.",
    details: [
      "Installation et réparation de plomberie",
      "Dépannage et recherche de fuite",
      "Équipements et raccordements sanitaires",
    ],
    image: images.servicePage.plumbingFittings,
    imageAlt:
      "Raccords et éléments de canalisation préparés pour une intervention de plomberie",
    icon: "plumbing",
    href: "/services/plomberie",
    treatment: "split",
  },
  {
    slug: "cvc",
    title: "Solutions CVC",
    shortTitle: "Solutions CVC",
    eyebrow: "Coordination des systèmes",
    description: "Chauffage, ventilation, climatisation et hydraulique",
    summary:
      "Une approche coordonnée du chauffage, de la ventilation, de la climatisation et des réseaux hydrauliques, avec maintenance des installations et interventions pour les professionnels.",
    details: [
      "Coordination du chauffage, de la ventilation et de la climatisation",
      "Intégration des réseaux hydrauliques techniques",
      "Maintenance des installations et interventions pour les professionnels",
    ],
    image: images.servicePage.hero,
    imageAlt:
      "Équipements de chauffage, ventilation et climatisation dans un bâtiment",
    icon: "cvc",
    href: "/services/cvc",
    treatment: "split",
  },
] as const satisfies readonly Service[];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
