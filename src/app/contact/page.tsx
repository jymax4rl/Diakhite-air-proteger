import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez-nous pour demander un devis ou obtenir des informations sur nos services.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 bg-navy-900 min-h-screen">
      <Container>
        <SectionHeading
          eyebrow="Parlons-en"
          title="Contactez-nous"
          description="Formulaire de contact et informations de contact à venir."
        />
      </Container>
    </div>
  );
}
