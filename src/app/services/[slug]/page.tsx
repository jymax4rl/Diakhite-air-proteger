import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { getService, services } from "@/data/services";
import { organizationId, site } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const canonicalUrl = `${site.url}${service.href}`;
  const title = `${service.title} — Services pour les bâtiments`;

  return {
    title,
    description: service.summary,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: canonicalUrl,
      siteName: site.brand.name,
      title: `${title} | ${site.brand.name}`,
      description: service.summary,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.brand.name}`,
      description: service.summary,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const canonicalUrl = `${site.url}${service.href}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${site.url}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        url: canonicalUrl,
        provider: { "@id": organizationId },
      },
    ],
  };

  return (
    <article className="bg-slate-50 text-navy-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative isolate min-h-[68svh] overflow-hidden pt-16 text-white">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="100vw"
          className="-z-20 object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/45"
          aria-hidden="true"
        />
        <Container className="flex min-h-[calc(68svh-4rem)] flex-col py-8 sm:py-10">
          <nav aria-label="Fil d’Ariane">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">{service.shortTitle}</li>
            </ol>
          </nav>
          <div className="my-auto max-w-3xl py-12">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-400">
              {service.eyebrow}
            </p>
            <h1 className="hero-title mt-4 text-white">{service.title}</h1>
            <p className="lead mt-6 max-w-2xl text-slate-200">{service.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact#demande" size="lg">
                Demander un devis →
              </Button>
              <Button href={site.contact.phone.href} size="lg" variant="outline">
                Appeler maintenant
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <section className="section-y" aria-labelledby="service-scope-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-700">
                Périmètre du service
              </p>
              <h2 id="service-scope-heading" className="section-title mt-3">
                Ce que couvre {service.title.toLocaleLowerCase("fr")}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-4">
                {service.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5 leading-7"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
                    {detail}
                  </li>
                ))}
              </ul>
              <p className="mt-7 leading-7 text-slate-600">
                La demande peut concerner une installation, un dépannage, un entretien ou une
                opération de maintenance. L’échange initial permet d’identifier le bâtiment,
                l’équipement existant et le besoin à examiner.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {service.slug === "cvc" && (
        <section className="section-y bg-navy-900 text-white" aria-labelledby="cvc-links-heading">
          <Container>
            <h2 id="cvc-links-heading" className="section-title">
              Les disciplines coordonnées par les solutions CVC
            </h2>
            <p className="mt-5 max-w-3xl leading-7 text-slate-300">
              Le CVC constitue ici une approche d’ensemble. Les besoins propres à chaque discipline
              restent décrits sur leurs pages dédiées.
            </p>
            <nav className="mt-8 flex flex-wrap gap-3" aria-label="Disciplines CVC">
              {services
                .filter((item) =>
                  ["ventilation", "chauffage", "climatisation", "hydraulique"].includes(item.slug),
                )
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:border-brand-400 hover:bg-white/10"
                  >
                    {item.title}
                  </Link>
                ))}
            </nav>
          </Container>
        </section>
      )}

      <section className="section-y bg-brand-600 text-white" aria-labelledby="detail-cta-heading">
        <Container className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="detail-cta-heading" className="section-title">
              Présentez votre besoin
            </h2>
            <p className="lead mt-4 max-w-2xl text-blue-50">
              Indiquez le service concerné, le bâtiment et l’installation existante.
            </p>
          </div>
          <Button
            href="/contact#demande"
            variant="outline"
            size="lg"
            className="w-full border-white/60 hover:bg-white/5! sm:w-auto"
          >
            Accéder à la demande →
          </Button>
        </Container>
      </section>
    </article>
  );
}
