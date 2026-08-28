import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/data/images";

const stats = [
  { value: "10+", label: "Années\nd'expérience", icon: <ClockIcon /> },
  { value: "250+", label: "Projets\nréalisés", icon: <ProjectsIcon /> },
  { value: "98%", label: "Clients\nsatisfaits", icon: <StarIcon /> },
];

export default function AboutPreview() {
  return (
    <section
      className="bg-navy-700 py-16 md:py-24 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Text column ── */}
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="À propos de Ventila"
              title="Votre partenaire de confiance en ventilation"
              description="Plus de 10 ans d'expérience au service de la qualité de l'air et de la performance énergétique. Nous accompagnons particuliers et entreprises dans tous leurs projets."
              headingId="about-heading"
            />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-8 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  className="bg-white/5 border border-white/8 rounded-xl p-3 sm:p-4 text-center"
                >
                  <div className="flex justify-center mb-2 text-brand-400">
                    {stat.icon}
                  </div>
                  <p className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl leading-none mb-1">
                    {stat.value}
                  </p>
                  <p
                    className="text-slate-400 text-[11px] sm:text-xs leading-tight whitespace-pre-line"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Button href="/a-propos" variant="outline">
              En savoir plus →
            </Button>
          </div>

          {/* ── Image column ── */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4]">
              <Image
                src={images.about.main}
                alt="Installation professionnelle de système de ventilation industrielle"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/40 to-transparent" />

              {/* Play button badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-16 h-16 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
                  aria-label="Voir notre vidéo de présentation"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="white"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Stat icons ─────────────────────────────────────────────── */

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
