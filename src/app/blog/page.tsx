import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Conseils et actualités",
  description:
    "Nos contenus sur les équipements et réseaux techniques du bâtiment sont en préparation.",
  alternates: { canonical: `${site.url}/blog` },
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Conseils & actualités"
      title="De nouvelles ressources arrivent bientôt"
      description="Nous préparons des contenus sur la ventilation, le chauffage, la climatisation, l’hydraulique, la plomberie et le CVC. Vous pouvez déjà découvrir nos services ou nous faire part de votre question."
    />
  );
}
