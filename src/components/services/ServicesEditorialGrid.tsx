import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { services, type Service } from "@/data/services";

const featureServices = services.filter((service) => service.treatment === "feature");
const editorialServices = services.filter((service) => service.treatment !== "feature");

export default function ServicesEditorialGrid() {
  return (
    <section id="services" className="section-y scroll-mt-16 bg-white" aria-labelledby="services-heading">
      <Container>
        <div className="flex flex-col gap-7 border-b border-slate-200 pb-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Nos services"
            title="Cinq disciplines et une approche CVC coordonnée"
            description="Ventilation, chauffage, climatisation, hydraulique et plomberie répondent à des besoins distincts. Les solutions CVC coordonnent les quatre disciplines techniques concernées sans les confondre."
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
              key={service.slug}
              id={service.slug}
              className={
                index === 0
                  ? "group scroll-mt-24 bg-navy-900 text-white"
                  : "group scroll-mt-24 bg-slate-50"
              }
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy-800">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1350px) 50vw, 640px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/45 to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="p-6 sm:p-9">
                <ServiceNumber index={index} dark={index === 0} />
                <p
                  className={`mt-8 text-xs font-semibold uppercase tracking-[0.15em] ${
                    index === 0 ? "text-brand-400" : "text-brand-600"
                  }`}
                >
                  {service.eyebrow}
                </p>
                <h3
                  className={`mt-3 text-2xl font-bold sm:text-3xl ${
                    index === 0 ? "text-white" : "text-navy-900"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`mt-5 max-w-xl leading-7 ${
                    index === 0 ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {service.summary}
                </p>
                <ServiceDetails service={service} dark={index === 0} />
                <ServiceLink service={service} dark={index === 0} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
          {editorialServices.map((service) =>
            service.treatment === "spotlight" ? (
              <HydraulicSpotlight key={service.slug} service={service} />
            ) : (
              <SplitService
                key={service.slug}
                service={service}
                imageOnRight={service.slug === "plomberie"}
              />
            ),
          )}
        </div>
      </Container>
    </section>
  );
}

function SplitService({
  service,
  imageOnRight,
}: {
  service: Service;
  imageOnRight: boolean;
}) {
  const index = services.findIndex((item) => item.slug === service.slug);

  return (
    <article
      id={service.slug}
      className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-12 lg:gap-14"
    >
      <ServiceImage
        service={service}
        number={index + 1}
        className={`lg:col-span-7 ${imageOnRight ? "lg:order-2" : ""}`}
      />
      <div className={`lg:col-span-5 ${imageOnRight ? "lg:order-1" : ""}`}>
        <ServiceCopy service={service} />
      </div>
    </article>
  );
}

function HydraulicSpotlight({ service }: { service: Service }) {
  const index = services.findIndex((item) => item.slug === service.slug);

  return (
    <article
      id={service.slug}
      className="grid scroll-mt-24 overflow-hidden bg-navy-900 lg:grid-cols-12"
    >
      <ServiceImage
        service={service}
        number={index + 1}
        className="aspect-[4/3] sm:aspect-[16/9] lg:col-span-8 lg:min-h-[34rem] lg:aspect-auto"
        imageSizes="(max-width: 1023px) 100vw, (max-width: 1350px) 66vw, 850px"
      />
      <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-4 lg:p-12">
        <ServiceCopy service={service} dark />
        <nav aria-label="Expertises liées à l’hydraulique" className="mt-7 flex flex-wrap gap-3">
          <RelatedServiceLink href="/services/chauffage">Chauffage</RelatedServiceLink>
          <RelatedServiceLink href="/services/cvc">Solutions CVC</RelatedServiceLink>
        </nav>
      </div>
    </article>
  );
}

function ServiceImage({
  service,
  number,
  className,
  imageSizes = "(max-width: 1023px) 100vw, (max-width: 1350px) 55vw, 740px",
}: {
  service: Service;
  number: number;
  className?: string;
  imageSizes?: string;
}) {
  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden bg-navy-800 ${className ?? ""}`}
    >
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        sizes={imageSizes}
        className="object-cover transition-transform duration-500 hover:scale-[1.02] motion-reduce:transition-none"
      />
      <span className="absolute bottom-0 left-0 bg-navy-950 px-4 py-3 text-xs font-semibold tracking-[0.12em] text-brand-400">
        {String(number).padStart(2, "0")}
      </span>
    </div>
  );
}

function ServiceCopy({
  service,
  dark = false,
}: {
  service: Service;
  dark?: boolean;
}) {
  return (
    <>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.15em] ${
          dark ? "text-brand-400" : "text-brand-600"
        }`}
      >
        {service.eyebrow}
      </p>
      <h3
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {service.title}
      </h3>
      <p className={`mt-5 leading-7 ${dark ? "text-slate-300" : "text-slate-600"}`}>
        {service.summary}
      </p>
      <ServiceDetails service={service} dark={dark} />
      <ServiceLink service={service} dark={dark} />
    </>
  );
}

function RelatedServiceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-brand-400/60 hover:text-white motion-reduce:transition-none"
    >
      {children}
    </Link>
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

function ServiceDetails({ service, dark = false }: { service: Service; dark?: boolean }) {
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
  service,
  dark = false,
}: {
  service: Service;
  dark?: boolean;
}) {
  return (
    <Link
      href={service.href}
      className={`mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors motion-reduce:transition-none ${
        dark ? "text-brand-300 hover:text-white" : "text-brand-600 hover:text-brand-700"
      }`}
    >
      Découvrir {service.title.toLocaleLowerCase("fr")} <ArrowIcon />
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
