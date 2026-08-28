import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Nos Services",
  description: "Découvrez nos services de ventilation résidentielle, commerciale et industrielle.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16 bg-navy-900 min-h-screen">
      <Container>
        <SectionHeading
          eyebrow="Nos services"
          title="Solutions sur mesure pour chaque besoin"
          description="Cette page sera complétée prochainement avec le détail de tous nos services."
        />
      </Container>
    </div>
  );
}
