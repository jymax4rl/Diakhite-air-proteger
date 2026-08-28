import { images } from "./images";

export interface ServicePageItem {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  details: readonly string[];
  image?: string;
  imageAlt?: string;
  treatment: "feature" | "split" | "compact";
}

export const servicePageItems: readonly ServicePageItem[] = [
  {
    id: "climatisation",
    title: "Climatisation",
    eyebrow: "Confort d’été",
    summary:
      "Une installation de climatisation se définit selon les volumes, l’occupation et les contraintes du bâtiment. Le choix et l’implantation des équipements visent un confort homogène et une exploitation accessible.",
    details: [
      "Étude des besoins et implantation des unités",
      "Installation, mise en service et entretien",
    ],
    image: images.servicePage.airConditioning,
    imageAlt: "Unités extérieures de climatisation installées sur la façade d’un bâtiment",
    treatment: "feature",
  },
  {
    id: "chauffage",
    title: "Chauffage",
    eyebrow: "Confort thermique",
    summary:
      "Le chauffage est abordé comme un ensemble associant production, distribution, émission et régulation. L’installation est adaptée aux usages du bâtiment et aux équipements déjà en place.",
    details: [
      "Équipements de production et d’émission",
      "Distribution, réglage et entretien",
    ],
    image: images.servicePage.heating,
    imageAlt: "Radiateur vertical intégré dans un intérieur contemporain",
    treatment: "feature",
  },
  {
    id: "ventilation",
    title: "Ventilation et qualité de l’air",
    eyebrow: "Renouvellement d’air",
    summary:
      "VMC, extraction et diffusion organisent le renouvellement de l’air dans les logements, les locaux professionnels et les bâtiments techniques. Les débits et les réseaux sont étudiés selon les usages.",
    details: [
      "VMC simple flux ou double flux selon le projet",
      "Extraction, filtration et diffusion de l’air",
    ],
    image: images.servicePage.professional,
    imageAlt: "Intérieur de bureaux contemporains équipé pour le confort et le renouvellement d’air",
    treatment: "split",
  },
  {
    id: "plomberie",
    title: "Plomberie générale",
    eyebrow: "Eau & réseaux",
    summary:
      "Création, modification ou remise en état des réseaux d’alimentation et d’évacuation : chaque intervention tient compte du tracé, de l’accessibilité et des équipements raccordés.",
    details: [
      "Alimentation en eau et évacuation",
      "Recherche de fuite et remplacement d’éléments",
    ],
    image: images.servicePage.plumbingNetwork,
    imageAlt: "Réseaux métalliques apparents dans un local technique de bâtiment",
    treatment: "split",
  },
  {
    id: "installations-sanitaires",
    title: "Installations sanitaires",
    eyebrow: "Équipements",
    summary:
      "Les appareils sanitaires et leurs raccordements sont intégrés au réseau du bâtiment en veillant aux alimentations, aux évacuations et à l’accès nécessaire pour l’entretien.",
    details: [
      "Raccordement des équipements sanitaires",
      "Création ou adaptation des évacuations",
    ],
    image: images.servicePage.plumbingFittings,
    imageAlt: "Raccords et éléments de canalisation préparés pour une intervention de plomberie",
    treatment: "split",
  },
  {
    id: "maintenance-depannage",
    title: "Maintenance et dépannage",
    eyebrow: "Continuité de service",
    summary:
      "Les équipements de chauffage, climatisation, ventilation et plomberie demandent un suivi adapté à leur état et à leur usage. Le diagnostic précède toute opération de remise en fonctionnement.",
    details: ["Contrôle et diagnostic de l’installation", "Entretien et remplacement des éléments concernés"],
    image: images.servicePage.technicalIntervention,
    imageAlt: "Technicien intervenant sur le boîtier électrique d’un équipement",
    treatment: "split",
  },
  {
    id: "renovation-installations",
    title: "Rénovation des installations",
    eyebrow: "Bâtiment existant",
    summary:
      "Une installation existante peut être repensée après diagnostic des réseaux et des équipements afin de l’adapter aux usages actuels et aux contraintes du bâti.",
    details: ["État des lieux technique", "Adaptation des réseaux et équipements"],
    treatment: "compact",
  },
  {
    id: "regulation-pilotage",
    title: "Régulation et pilotage",
    eyebrow: "Maîtrise des équipements",
    summary:
      "La régulation coordonne le fonctionnement des équipements avec les besoins réels du bâtiment. Son implantation doit rester compréhensible et accessible aux utilisateurs.",
    details: ["Réglages adaptés aux usages", "Commandes et régulation des équipements"],
    treatment: "compact",
  },
  {
    id: "reseaux-techniques",
    title: "Réseaux techniques",
    eyebrow: "Coordination",
    summary:
      "Les réseaux d’air et d’eau partagent les volumes du bâtiment. Leur tracé est étudié pour limiter les conflits, préserver les accès et faciliter les interventions futures.",
    details: ["Lecture globale des cheminements", "Accessibilité pour la maintenance"],
    treatment: "compact",
  },
] as const;

export const trustThemes = [
  {
    title: "Une vision coordonnée du bâtiment",
    description:
      "Chauffage, climatisation, ventilation et plomberie sont étudiés avec les volumes, les usages et les réseaux existants.",
  },
  {
    title: "Des réseaux pensés pour durer",
    description:
      "Le passage des conduites, l’accès aux composants et les besoins d’entretien sont intégrés dès l’étude.",
  },
  {
    title: "Un interlocuteur pour chaque étape",
    description:
      "De l’analyse initiale à la maintenance, chaque étape reste reliée au fonctionnement réel de l’installation.",
  },
] as const;

export const serviceProcess = [
  {
    number: "01",
    title: "Analyse du besoin",
    description: "Comprendre le bâtiment, ses usages, ses équipements et les contraintes existantes.",
  },
  {
    number: "02",
    title: "Étude de la solution",
    description: "Définir les réseaux, l’implantation et les équipements adaptés au projet.",
  },
  {
    number: "03",
    title: "Mise en œuvre",
    description: "Installer ou adapter les réseaux et équipements selon la solution étudiée.",
  },
  {
    number: "04",
    title: "Mise en service",
    description: "Vérifier le fonctionnement et ajuster les paramètres de l’installation.",
  },
  {
    number: "05",
    title: "Suivi et maintenance",
    description: "Préserver le fonctionnement du système par des opérations d’entretien adaptées.",
  },
] as const;
