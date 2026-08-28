import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { serviceProcess } from "@/data/service-page";

export default function ServicesProcess() {
  return (
    <section className="section-y bg-slate-50" aria-labelledby="services-process-heading">
      <Container>
        <SectionHeading
          eyebrow="Du besoin au suivi"
          title="Un projet conduit en cinq étapes"
          description="Une progression lisible pour relier les usages du bâtiment, la coordination des réseaux et le fonctionnement des équipements dans le temps."
          theme="light"
          headingId="services-process-heading"
        />

        <ol className="mt-12 grid border-l border-slate-200 md:grid-cols-5 md:border-l-0 md:border-t">
          {serviceProcess.map((step) => (
            <li
              key={step.number}
              className="relative border-b border-r border-slate-200 px-6 py-7 md:min-h-64 md:border-b-0 md:px-5 md:py-9"
            >
              <span className="font-mono text-sm font-semibold text-brand-600">{step.number}</span>
              <span
                className="absolute -left-[5px] top-8 h-2.5 w-2.5 rounded-full bg-brand-600 md:-top-[5px] md:left-5"
                aria-hidden="true"
              />
              <h3 className="mt-8 text-lg font-bold text-navy-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
