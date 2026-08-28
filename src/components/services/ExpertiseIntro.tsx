import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const focusPoints = [
  "Renouvellement de l’air",
  "Maîtrise de l’humidité",
  "Qualité de l’air intérieur",
  "Performance du bâtiment",
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
              eyebrow="Une expertise transversale"
              title="Faire circuler le bon volume d’air, au bon endroit"
              description="La ventilation participe directement au confort des occupants et au fonctionnement du bâtiment. Une solution cohérente organise l’entrée d’air neuf, l’extraction de l’air vicié et la diffusion dans chaque espace."
              theme="light"
              headingId="expertise-intro-heading"
            />
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-10">
            <p className="text-base leading-7 text-slate-600">
              Nous abordons chaque projet par ses usages réels&nbsp;: production d’humidité,
              occupation, volumes, sources de pollution, contraintes de réseau et objectifs
              énergétiques. L’installation et la maintenance sont ensuite pensées comme un
              ensemble, afin que les équipements restent accessibles et que le système conserve
              son efficacité.
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
