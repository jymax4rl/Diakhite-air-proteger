import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos",
  description: `La présentation de ${site.brand.name} est en préparation. Découvrez dès maintenant nos services de ventilation ou contactez-nous.`,
};

export default function AProposPage() {
  return (
    <ComingSoon
      eyebrow="Notre entreprise"
      title="Notre présentation arrive bientôt"
      description={`Nous préparons une présentation claire de ${site.brand.name} et de notre manière d’aborder les projets. En attendant, parcourez nos services ou contactez-nous pour parler de votre besoin.`}
    />
  );
}
