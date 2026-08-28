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
    id: "installation-vmc",
    title: "Installation de VMC",
    eyebrow: "Habitat",
    summary:
      "Une ventilation mécanique contrôlée renouvelle l’air du logement et aide à évacuer l’humidité produite au quotidien. Le choix entre simple flux et double flux dépend du bâtiment, de son usage et du projet.",
    details: [
      "La simple flux extrait l’air des pièces humides et fait entrer l’air neuf par des entrées dédiées.",
      "La double flux associe extraction et insufflation avec récupération d’une partie de la chaleur de l’air extrait.",
    ],
    treatment: "feature",
  },
  {
    id: "vmc-double-flux",
    title: "VMC double flux",
    eyebrow: "Confort & énergie",
    summary:
      "La double flux organise les débits d’air entrant et sortant autour d’un échangeur. Son étude prend en compte le passage des réseaux, l’accessibilité des filtres, l’équilibrage et l’entretien futur.",
    details: [
      "Étude de l’implantation et des réseaux",
      "Attention portée à l’équilibrage et à la maintenance",
    ],
    treatment: "feature",
  },
  {
    id: "ventilation-professionnelle",
    title: "Ventilation professionnelle",
    eyebrow: "Tertiaire & commercial",
    summary:
      "Bureaux, commerces et locaux d’activité demandent un renouvellement d’air adapté à l’occupation, aux volumes et aux usages. La solution est pensée avec l’aménagement et les contraintes techniques du site.",
    details: [
      "Renouvellement d’air des espaces occupés",
      "Intégration aux volumes et à l’aménagement",
    ],
    image: images.servicePage.professional,
    imageAlt: "Intérieur de bureaux contemporains destiné à recevoir une ventilation professionnelle",
    treatment: "split",
  },
  {
    id: "ventilation-industrielle",
    title: "Ventilation industrielle",
    eyebrow: "Industrie",
    summary:
      "Les environnements industriels nécessitent des débits, réseaux et équipements cohérents avec les volumes et les émissions du procédé. L’analyse porte sur la circulation de l’air et les contraintes d’exploitation.",
    details: [
      "Réseaux et diffusion adaptés aux grands volumes",
      "Prise en compte des contraintes d’exploitation",
    ],
    image: images.servicePage.industrial,
    imageAlt: "Bouche de ventilation installée sous un plafond industriel",
    treatment: "split",
  },
  {
    id: "extraction-air",
    title: "Extraction d’air",
    eyebrow: "Air vicié",
    summary:
      "L’extraction capte l’air chargé en humidité, odeurs ou polluants au plus près des zones concernées, puis l’évacue par un réseau dimensionné pour l’usage du local.",
    details: [
      "Captage localisé ou extraction générale",
      "Étude du rejet et du cheminement des conduits",
    ],
    image: images.servicePage.extraction,
    imageAlt: "Unités métalliques d’extraction d’air installées sur une toiture",
    treatment: "split",
  },
  {
    id: "traitement-air",
    title: "Traitement de l’air",
    eyebrow: "Qualité d’air",
    summary:
      "Filtration, renouvellement et diffusion sont envisagés ensemble pour maîtriser la qualité de l’air intérieur et assurer une distribution homogène dans les espaces.",
    details: ["Filtration adaptée à l’installation", "Diffusion et renouvellement de l’air"],
    treatment: "compact",
  },
  {
    id: "desenfumage",
    title: "Désenfumage",
    eyebrow: "Gestion des fumées",
    summary:
      "Un système de désenfumage vise à évacuer les fumées et la chaleur en cas d’incendie. Chaque projet doit être étudié selon le bâtiment, son usage et les exigences applicables.",
    details: ["Analyse du bâtiment et des circulations", "Solution mécanique ou naturelle selon le projet"],
    treatment: "compact",
  },
  {
    id: "maintenance-entretien",
    title: "Maintenance et entretien",
    eyebrow: "Pérennité",
    summary:
      "L’entretien conserve l’accessibilité et le bon fonctionnement des organes de ventilation. Les opérations sont définies selon l’équipement, son état et ses conditions d’utilisation.",
    details: ["Contrôle visuel et fonctionnel", "Nettoyage et remplacement des éléments concernés"],
    image: images.servicePage.technicalIntervention,
    imageAlt: "Technicien intervenant sur le boîtier électrique d’un équipement",
    treatment: "split",
  },
  {
    id: "renovation-systemes",
    title: "Rénovation de systèmes de ventilation",
    eyebrow: "Bâtiment existant",
    summary:
      "Une installation existante peut être repensée après diagnostic des réseaux, des débits et des équipements. L’objectif est d’adapter la solution aux usages actuels et aux contraintes du bâti.",
    details: ["Diagnostic de l’installation existante", "Adaptation des réseaux et équipements"],
    treatment: "compact",
  },
] as const;

export const trustThemes = [
  {
    title: "Une lecture globale du bâtiment",
    description:
      "Volumes, occupation, humidité, circulation de l’air et contraintes d’accès sont considérés avant de définir la solution.",
  },
  {
    title: "Une installation pensée pour durer",
    description:
      "Le passage des réseaux, l’accès aux composants et les besoins d’entretien sont intégrés dès l’étude.",
  },
  {
    title: "Un accompagnement dans le temps",
    description:
      "De l’analyse initiale au suivi, chaque étape reste reliée aux usages réels et au fonctionnement de l’installation.",
  },
] as const;

export const serviceProcess = [
  {
    number: "01",
    title: "Analyse du besoin",
    description: "Comprendre le bâtiment, ses usages et les attentes liées au renouvellement d’air.",
  },
  {
    number: "02",
    title: "Étude de la solution",
    description: "Définir les principes, l’implantation et les équipements adaptés au projet.",
  },
  {
    number: "03",
    title: "Installation",
    description: "Mettre en œuvre les réseaux et équipements selon la solution étudiée.",
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
