import { images } from "./images";

export interface ServicePageItem {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  details: readonly string[];
  image?: string;
  imageAlt?: string;
  treatment: "feature" | "split" | "spotlight";
}

export const servicePageItems: readonly ServicePageItem[] = [
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
    title: "Ventilation",
    eyebrow: "Renouvellement d’air",
    summary:
      "VMC, extraction et diffusion organisent le renouvellement de l’air dans les logements, les locaux professionnels et les bâtiments techniques. Les débits et les réseaux sont étudiés selon les usages.",
    details: [
      "VMC simple flux ou double flux selon le projet",
      "Extraction, filtration et diffusion de l’air",
    ],
    image: images.servicePage.professional,
    imageAlt: "Intérieur de bureaux contemporains équipé pour le confort et le renouvellement d’air",
    treatment: "feature",
  },
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
    treatment: "split",
  },
  {
    id: "hydraulique",
    title: "Hydraulique",
    eyebrow: "Réseaux techniques CVC",
    summary:
      "Les réseaux hydrauliques organisent la circulation maîtrisée des fluides au sein des installations techniques du bâtiment. Ils relient les besoins de chauffage aux équipements CVC dans un ensemble cohérent et accessible.",
    details: [
      "Distribution et circulation des fluides à l’échelle du bâtiment",
      "Relation avec les installations de chauffage et de CVC",
      "Vision d’ensemble pour la maintenance ou la rénovation",
    ],
    image: images.servicePage.hydraulicNetwork,
    imageAlt:
      "Réseau hydraulique CVC composé de conduites isolées dans un local technique propre",
    treatment: "spotlight",
  },
  {
    id: "plomberie-sanitaire",
    title: "Plomberie & sanitaire",
    eyebrow: "Eau du bâtiment",
    summary:
      "La plomberie et le sanitaire concernent l’alimentation en eau, l’évacuation et le raccordement des équipements du bâtiment. Les réseaux sont pensés selon les usages et l’accès nécessaire à leur entretien.",
    details: [
      "Alimentation en eau et évacuation",
      "Raccordement des installations sanitaires",
      "Adaptation des réseaux dans le bâtiment existant",
    ],
    image: images.servicePage.plumbingFittings,
    imageAlt: "Raccords et éléments de canalisation préparés pour une intervention de plomberie",
    treatment: "split",
  },
] as const;

export const trustThemes = [
  {
    title: "Une vision coordonnée du bâtiment",
    description:
      "Les cinq disciplines sont étudiées avec les volumes, les usages et les réseaux existants.",
  },
  {
    title: "Des réseaux pensés pour durer",
    description:
      "Le passage des réseaux d’air, de fluides et d’eau ainsi que les besoins d’entretien sont intégrés dès l’étude.",
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
