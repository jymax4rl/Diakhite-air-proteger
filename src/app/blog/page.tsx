import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Conseils et actualités",
  description:
    "Nos contenus sur la ventilation et la qualité de l’air sont en préparation. Retrouvez en attendant nos services et nos coordonnées.",
};

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Conseils & actualités"
      title="De nouvelles ressources arrivent bientôt"
      description="Nous préparons des contenus utiles autour de la ventilation, de l’entretien des installations et de la qualité de l’air. Vous pouvez déjà découvrir nos services ou nous faire part de votre question."
    />
  );
}
