import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez Ventila Solutions, votre partenaire de confiance en ventilation depuis plus de 10 ans.",
};

export default function AProposPage() {
  return (
    <div className="pt-24 pb-16 bg-navy-900 min-h-screen">
      <Container>
        <SectionHeading
          eyebrow="Notre histoire"
          title="À propos de Ventila Solutions"
          description="Cette page sera complétée prochainement avec notre histoire et notre équipe."
        />
      </Container>
    </div>
  );
}
