import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const focusPoints = [
  "Confort thermique",
  "Qualité de l’air",
  "Distribution de l’eau",
  "Maintenance accessible",
] as const;

export default function ExpertiseIntro() {
  return (
    <section
      className="section-y bg-slate-50 text-navy-900"
      aria-labelledby="expertise-intro-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="CVC & plomberie"
              title="Penser ensemble l’air, la température et l’eau"
              description="Les équipements techniques partagent les mêmes volumes et répondent aux mêmes usages. Les coordonner dès l’étude permet de construire une installation cohérente, accessible et adaptée au bâtiment."
              theme="light"
              headingId="expertise-intro-heading"
            />
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-10">
            <p className="text-base leading-7 text-slate-600">
              Nous abordons chaque projet par ses usages réels&nbsp;: occupation, volumes,
              besoins de chauffage ou de rafraîchissement, renouvellement d’air, points d’eau et
              contraintes de réseau. La mise en œuvre et la maintenance sont ensuite pensées
              ensemble pour préserver l’accès aux équipements.
            </p>
            <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {focusPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm font-medium text-navy-800">
                  <span className="h-1.5 w-1.5 flex-none bg-brand-600" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
