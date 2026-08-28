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

/**
 * Grid span per position, plus the widths that span actually renders at so
 * next/image can pick a sensibly sized file for each slot. Widths below md come
 * from the carousel card (256/300px); at md every card is one of two columns
 * (~47vw); from lg the 12-column layout gives 7/12, 5/12 and 12/12 slots, which
 * top out at 740px, 525px and 1280px inside the 1280px content column.
 */
const slots = [
  {
    className: "lg:col-span-7 lg:row-span-2",
    sizes:
      "(max-width: 639px) 256px, (max-width: 767px) 300px, (max-width: 1023px) 47vw, (max-width: 1279px) 56vw, 740px",
  },
  {
    className: "lg:col-span-5",
    sizes:
      "(max-width: 639px) 256px, (max-width: 767px) 300px, (max-width: 1023px) 47vw, (max-width: 1279px) 40vw, 525px",
  },
  {
    className: "lg:col-span-5",
    sizes:
      "(max-width: 639px) 256px, (max-width: 767px) 300px, (max-width: 1023px) 47vw, (max-width: 1279px) 40vw, 525px",
  },
  {
    className: "lg:col-span-12",
    sizes:
      "(max-width: 639px) 256px, (max-width: 767px) 300px, (max-width: 1023px) 47vw, (max-width: 1279px) 95vw, 1280px",
  },
] as const;

const fallbackSlot = { className: "", sizes: "(max-width: 767px) 300px, 47vw" };

export default function Projects() {
  return (
    <section
      className="bg-navy-700 section-y"
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

        {/* ── Carousel on mobile, even 2×2 at md, asymmetric 12-column at lg.
               At md every card stays one column wide: letting the fourth card
               span both columns left an empty cell at 768/834px. ── */}
        <div className="scroll-snap-row md:grid-cols-2 md:auto-rows-[220px] lg:grid-cols-12 lg:auto-rows-[200px]">
          {projects.map((project, i) => {
            const slot = slots[i] ?? fallbackSlot;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                className={slot.className}
                sizes={slot.sizes}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({
  project,
  className = "",
  sizes,
}: {
  project: Project;
  className?: string;
  sizes: string;
}) {
  const tagColor =
    categoryColors[project.category] ??
    "bg-slate-500/20 text-slate-300 border-slate-500/30";

  return (
    <Link
      href={project.href}
      /* aspect-[4/3] gives the carousel card a height: its only content is
         absolutely positioned, so without a ratio the card collapsed to 0px.
         From md the grid rows set the height instead. */
      className={`scroll-snap-item w-[256px] sm:w-[300px] md:w-auto aspect-[4/3] md:aspect-auto group relative overflow-hidden rounded-2xl bg-navy-700 ${className}`}
      aria-label={`Projet : ${project.title} — ${project.category}, ${project.location}`}
    >
      {/* Image */}
      <Image
        src={project.image}
        alt={`Réalisation : ${project.title}`}
        fill
        sizes={sizes}
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
