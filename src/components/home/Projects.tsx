import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredProject } from "@/data/projects";

export default function Projects() {
  return (
    <section className="bg-navy-700 section-y" aria-labelledby="projects-heading">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <Link
            href={`/realisations#${featuredProject.id}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-navy-800 lg:col-span-5"
            aria-label={`Voir la réalisation : ${featuredProject.title}`}
          >
            <Image
              src={featuredProject.poster}
              alt={featuredProject.posterAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
            />
            <span className="absolute inset-x-4 bottom-4 rounded-2xl bg-navy-950/85 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm">
              Voir le projet <span aria-hidden="true">→</span>
            </span>
          </Link>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Réalisations"
              title={featuredProject.title}
              description={featuredProject.description}
              headingId="projects-heading"
            />
            <Link
              href={`/realisations#${featuredProject.id}`}
              className="mt-7 inline-flex min-h-11 items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10 motion-reduce:transition-none"
            >
              Découvrir cette réalisation <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
