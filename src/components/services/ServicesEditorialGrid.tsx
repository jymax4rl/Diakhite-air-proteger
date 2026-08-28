import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { servicePageItems, type ServicePageItem } from "@/data/service-page";

const featureServices = servicePageItems.filter((service) => service.treatment === "feature");
const splitServices = servicePageItems.filter((service) => service.treatment === "split");
const compactServices = servicePageItems.filter((service) => service.treatment === "compact");

export default function ServicesEditorialGrid() {
  return (
    <section id="services" className="section-y scroll-mt-16 bg-white" aria-labelledby="services-heading">
      <Container>
        <div className="flex flex-col gap-7 border-b border-slate-200 pb-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Nos services"
            title="Des réponses adaptées à chaque environnement"
            description="Du logement aux locaux professionnels et industriels, chaque intervention commence par l’analyse du besoin et des contraintes du site."
            theme="light"
            headingId="services-heading"
          />
          <Link
            href="/realisations"
            className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 motion-reduce:transition-none md:self-auto"
          >
            Découvrir nos réalisations <ArrowIcon />
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
          {featureServices.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className={index === 0 ? "bg-navy-900 p-6 text-white sm:p-9" : "bg-slate-50 p-6 sm:p-9"}
            >
              <ServiceNumber index={index} dark={index === 0} />
              <p
                className={`mt-12 text-xs font-semibold uppercase tracking-[0.15em] ${
                  index === 0 ? "text-brand-400" : "text-brand-600"
                }`}
              >
                {service.eyebrow}
              </p>
              <h3 className={`mt-3 text-2xl font-bold sm:text-3xl ${index === 0 ? "text-white" : "text-navy-900"}`}>
                {service.title}
              </h3>
              <p className={`mt-5 max-w-xl leading-7 ${index === 0 ? "text-slate-300" : "text-slate-600"}`}>
                {service.summary}
              </p>
              <ServiceDetails service={service} dark={index === 0} />
              <ServiceLink title={service.title} dark={index === 0} />
            </article>
          ))}
        </div>

        <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
          {splitServices.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-12 lg:gap-14"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden bg-navy-800 lg:col-span-7 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                {service.image && service.imageAlt && (
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1023px) 100vw, (max-width: 1350px) 55vw, 740px"
                    className="object-cover transition-transform duration-500 hover:scale-[1.02] motion-reduce:transition-none"
                  />
                )}
                <span className="absolute bottom-0 left-0 bg-navy-950 px-4 py-3 text-xs font-semibold tracking-[0.12em] text-brand-400">
                  0{index + featureServices.length + 1}
                </span>
              </div>
              <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-600">
                  {service.eyebrow}
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-5 leading-7 text-slate-600">{service.summary}</p>
                <ServiceDetails service={service} />
                <ServiceLink title={service.title} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-slate-200 pt-12 md:mt-24 md:pt-16">
          <p className="mb-8 max-w-2xl text-sm font-medium uppercase tracking-[0.12em] text-slate-500">
            Expertises complémentaires
          </p>
          <div className="grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-3">
            {compactServices.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-24 bg-white p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                    {service.eyebrow}
                  </span>
                  <span className="font-mono text-sm text-slate-400">
                    0{index + featureServices.length + splitServices.length + 1}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-bold text-navy-900 sm:text-2xl">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{service.summary}</p>
                <ServiceLink title={service.title} compact />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServiceNumber({ index, dark }: { index: number; dark: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`font-mono text-sm ${dark ? "text-brand-400" : "text-brand-600"}`}>
        0{index + 1}
      </span>
      <span className={`h-px flex-1 ${dark ? "bg-white/15" : "bg-slate-200"}`} aria-hidden="true" />
    </div>
  );
}

function ServiceDetails({ service, dark = false }: { service: ServicePageItem; dark?: boolean }) {
  return (
    <ul className={`mt-6 space-y-3 text-sm ${dark ? "text-slate-200" : "text-navy-800"}`}>
      {service.details.map((detail) => (
        <li key={detail} className="flex gap-3 leading-6">
          <CheckIcon />
          <span>{detail}</span>
        </li>
      ))}
    </ul>
  );
}

function ServiceLink({
  title,
  dark = false,
  compact = false,
}: {
  title: string;
  dark?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href="/contact"
      className={`mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors motion-reduce:transition-none ${
        dark ? "text-brand-300 hover:text-white" : "text-brand-600 hover:text-brand-700"
      } ${compact ? "mt-6" : ""}`}
    >
      Échanger sur {title.toLocaleLowerCase("fr")} <ArrowIcon />
    </Link>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-1 h-4 w-4 flex-none text-brand-500" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 flex-none" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 8h11M9.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
