import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description:
    "La présentation de nos réalisations en ventilation est en préparation. Découvrez nos services ou échangeons sur votre projet.",
};

export default function RealisationsPage() {
  return (
    <ComingSoon
      eyebrow="Réalisations"
      title="Nos projets seront bientôt présentés ici"
      description="Nous préparons un aperçu soigné de nos réalisations. D’ici là, consultez nos domaines d’intervention ou décrivez-nous le projet que vous souhaitez étudier."
    />
  );
}
