import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Nos Réalisations",
  description: "Découvrez nos projets de ventilation réalisés partout en France.",
};

export default function RealisationsPage() {
  return (
    <div className="pt-24 pb-16 bg-navy-900 min-h-screen">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Nos réalisations"
          description="Cette page sera complétée prochainement avec tous nos projets."
        />
      </Container>
    </div>
  );
}
