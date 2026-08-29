import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Projects() {
  return (
    <section className="bg-navy-700 section-y" aria-labelledby="projects-heading">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              eyebrow="Réalisations"
              title="Un espace bientôt consacré aux projets réalisés"
              description="Les réalisations seront publiées ici lorsque des références, visuels et informations de projet validés seront disponibles."
              headingId="projects-heading"
            />
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/realisations"
              className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10 motion-reduce:transition-none"
            >
              Consulter l’espace réalisations <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
