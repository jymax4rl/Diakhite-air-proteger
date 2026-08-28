import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/data/projects";

const categoryColors: Record<string, string> = {
  Industriel: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Commercial: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  Résidentiel: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export default function Projects() {
  return (
    <section
      className="bg-navy-700 py-16 md:py-24"
      aria-labelledby="projects-heading"
    >
      <Container>
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
          <SectionHeading
            eyebrow="Nos réalisations"
            title="Des projets qui parlent d'eux-mêmes"
            headingId="projects-heading"
            className="mb-0"
          />
          <Link
            href="/realisations"
            className="text-brand-400 text-sm font-semibold hover:text-brand-300 transition-colors flex items-center gap-1.5 flex-shrink-0 self-end sm:self-auto"
          >
            Tous les projets →
          </Link>
        </div>

        {/* ── Mobile: horizontal scroll ── */}
        <div className="scroll-snap-row md:hidden">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* ── Desktop: 2×2 asymmetric grid ── */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-[220px] lg:auto-rows-[200px]">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={
                i === 0
                  ? "lg:col-span-7 lg:row-span-2"
                  : i === 1
                  ? "lg:col-span-5"
                  : i === 2
                  ? "lg:col-span-5"
                  : "col-span-2 lg:col-span-12 lg:row-span-1"
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const tagColor =
    categoryColors[project.category] ??
    "bg-slate-500/20 text-slate-300 border-slate-500/30";

  return (
    <Link
      href={project.href}
      className={`scroll-snap-item w-[280px] sm:w-[300px] md:w-auto group relative overflow-hidden rounded-2xl bg-navy-700 ${className}`}
      aria-label={`Projet : ${project.title} — ${project.category}, ${project.location}`}
    >
      {/* Image */}
      <Image
        src={project.image}
        alt={`Réalisation : ${project.title}`}
        fill
        sizes="(max-width: 768px) 300px, (max-width: 1024px) 50vw, 40vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/25 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
        {/* Category tag */}
        <span
          className={`self-start text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border mb-2 ${tagColor}`}
        >
          {project.category}
        </span>
        <p className="text-white font-bold text-sm sm:text-base leading-tight">
          {project.title}
        </p>
        <p className="text-slate-400 text-xs mt-0.5">
          {project.location} · {project.year}
        </p>
      </div>
    </Link>
  );
}
