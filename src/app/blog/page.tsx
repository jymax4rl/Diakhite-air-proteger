import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Blog",
  description: "Actualités, conseils et ressources sur la ventilation et la qualité de l'air.",
};

export default function BlogPage() {
  return (
    <div className="pt-24 pb-16 bg-navy-900 min-h-screen">
      <Container>
        <SectionHeading
          eyebrow="Ressources"
          title="Blog & actualités"
          description="Articles et conseils à venir prochainement."
        />
      </Container>
    </div>
  );
}
