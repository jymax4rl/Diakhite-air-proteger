import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import AboutPreview from "@/components/home/AboutPreview";
import Projects from "@/components/home/Projects";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      {/* Hero also contains the embedded Process strip */}
      <Hero />
      <Services />
      <AboutPreview />
      <Projects />
      <ContactCTA />
    </>
  );
}
