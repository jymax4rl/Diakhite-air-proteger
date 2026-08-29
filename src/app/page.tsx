import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import AboutPreview from "@/components/home/AboutPreview";
import Projects from "@/components/home/Projects";
import ContactCTA from "@/components/home/ContactCTA";
import { site } from "@/data/site";

const description =
  "Ventilation, plomberie et solutions CVC pour les bâtiments : installation, dépannage, entretien et maintenance.";

export const metadata: Metadata = {
  title: "Ventilation, plomberie et CVC",
  description,
  alternates: { canonical: site.url },
  openGraph: {
    url: site.url,
    title: `Ventilation, plomberie et CVC | ${site.brand.name}`,
    description,
  },
  twitter: {
    title: `Ventilation, plomberie et CVC | ${site.brand.name}`,
    description,
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero renders <Process /> as its last child so the glass step panel
          overlays the hero photograph. */}
      <Hero />
      <Services />
      <AboutPreview />
      <Projects />
      <ContactCTA />
    </>
  );
}
