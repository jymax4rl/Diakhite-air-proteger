import { images } from "./images";

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  href: string;
}

export const projects: Project[] = [
  {
    id: "projet-01",
    title: "Centre Logistique Industriel",
    category: "Industriel",
    location: "Lyon",
    year: "2024",
    image: images.projects.project01,
    href: "/realisations/centre-logistique",
  },
  {
    id: "projet-02",
    title: "Immeuble de Bureaux",
    category: "Commercial",
    location: "Paris",
    year: "2023",
    image: images.projects.project02,
    href: "/realisations/immeuble-bureaux",
  },
  {
    id: "projet-03",
    title: "Résidence Haut de Gamme",
    category: "Résidentiel",
    location: "Bordeaux",
    year: "2023",
    image: images.projects.project03,
    href: "/realisations/residence-haut-gamme",
  },
  {
    id: "projet-04",
    title: "Usine Agroalimentaire",
    category: "Industriel",
    location: "Toulouse",
    year: "2022",
    image: images.projects.project04,
    href: "/realisations/usine-agroalimentaire",
  },
];
