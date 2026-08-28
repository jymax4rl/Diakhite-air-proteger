import { images } from "./images";

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: "home" | "building" | "factory" | "wrench";
  href: string;
}

export const services: Service[] = [
  {
    id: "residentiel",
    title: "Résidentiel",
    description: "Confort et air sain au quotidien",
    image: images.services.residential,
    icon: "home",
    href: "/services/residentiel",
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Solutions efficaces pour vos locaux",
    image: images.services.commercial,
    icon: "building",
    href: "/services/commercial",
  },
  {
    id: "industriel",
    title: "Industriel",
    description: "Systèmes robustes haute performance",
    image: images.services.industrial,
    icon: "factory",
    href: "/services/industriel",
  },
  {
    id: "entretien",
    title: "Entretien",
    description: "Maintenance et dépannage rapide",
    image: images.services.maintenance,
    icon: "wrench",
    href: "/services/entretien",
  },
];
