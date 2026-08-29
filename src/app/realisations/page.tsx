import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { featuredProject } from "@/data/projects";
import { organizationId, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Réalisations CVC et ventilation",
  description:
    "Découvrez une intervention réelle de Diakhite Air Proteger autour d’un équipement CVC et de réseaux de ventilation en toiture.",
  alternates: { canonical: `${site.url}/realisations` },
  robots: { index: true, follow: true },
  openGraph: {
    url: `${site.url}/realisations`,
    title: `Réalisations CVC et ventilation | ${site.brand.name}`,
    description:
      "Une intervention réelle autour d’un équipement CVC et de réseaux de ventilation en toiture.",
    images: [
      {
        url: featuredProject.poster,
        width: featuredProject.video.width,
        height: featuredProject.video.height,
        alt: featuredProject.posterAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Réalisations CVC et ventilation | ${site.brand.name}`,
    description:
      "Une intervention réelle autour d’un équipement CVC et de réseaux de ventilation en toiture.",
    images: [featuredProject.poster],
  },
};

export default function RealisationsPage() {
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: featuredProject.title,
    description: featuredProject.description,
    thumbnailUrl: `${site.url}${featuredProject.poster}`,
    uploadDate: featuredProject.video.uploadDate,
    duration: featuredProject.video.durationIso,
    contentUrl: featuredProject.video.source.src,
    publisher: { "@id": organizationId },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="section-y bg-navy-900">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="mb-4 text-sm font-semibold tracking-[0.15em] text-brand-400 uppercase">
                Réalisations
              </p>
              <h1 className="hero-title max-w-4xl">
                Des interventions techniques, présentées avec justesse
              </h1>
              <p className="lead mt-6 max-w-2xl text-slate-300">
                Découvrez des situations réelles d’installation et des détails
                visibles de réseaux et d’équipements techniques du bâtiment.
              </p>
            </div>

            <figure className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl bg-navy-800 shadow-2xl shadow-black/30 lg:col-span-5">
              <Image
                src={featuredProject.poster}
                alt={featuredProject.posterAlt}
                fill
                priority
                sizes="(min-width: 1024px) 32vw, 384px"
                className="object-cover"
              />
            </figure>
          </div>
        </Container>
      </section>

      <section className="section-y bg-slate-50 text-navy-800">
        <Container>
          <article
            id={featuredProject.id}
            className="scroll-mt-28 grid items-start gap-10 lg:grid-cols-12 lg:gap-16"
          >
            <figure className="mx-auto w-full max-w-md lg:col-span-5">
              <div className="aspect-[9/16] overflow-hidden rounded-3xl bg-navy-900 shadow-xl shadow-slate-900/15">
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  muted
                  preload="none"
                  poster={featuredProject.poster}
                  width={featuredProject.video.width}
                  height={featuredProject.video.height}
                  aria-label={`Vidéo silencieuse : ${featuredProject.title}`}
                >
                  <source
                    src={featuredProject.video.source.src}
                    type={featuredProject.video.source.type}
                  />
                  Votre navigateur ne permet pas de lire cette vidéo. Le
                  contenu visuel est décrit à proximité.
                </video>
              </div>
              <figcaption className="mt-4 text-sm leading-6 text-slate-600">
                {featuredProject.visualDescription} Aucun son ni aucune parole
                ne sont présents&nbsp;: une piste de sous-titres n’est donc pas
                nécessaire.
              </figcaption>
            </figure>

            <div className="lg:col-span-7 lg:pt-8">
              <p className="mb-3 text-sm font-semibold tracking-[0.15em] text-brand-600 uppercase">
                Projet présenté
              </p>
              <h2 className="section-title">{featuredProject.title}</h2>
              <p className="lead mt-6 text-slate-600">
                {featuredProject.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-navy-800">
                    Réseaux de ventilation
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Gaines rectangulaires galvanisées, conduit spiralé et
                    raccords visibles en toiture.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-navy-800">
                    Installation technique
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Vues d’un équipement CVC, d’un joint de gaine et d’une
                    traversée de toiture.
                  </p>
                </div>
              </div>

              <nav
                className="mt-10 flex flex-wrap gap-3"
                aria-label="Liens liés à cette réalisation"
              >
                <Link
                  href="/services/cvc"
                  className="inline-flex min-h-11 items-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 motion-reduce:transition-none"
                >
                  Découvrir le service CVC
                </Link>
                <Link
                  href="/services/ventilation"
                  className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-brand-500 motion-reduce:transition-none"
                >
                  Voir la ventilation
                </Link>
                <Link
                  href="/contact#demande"
                  className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-brand-500 motion-reduce:transition-none"
                >
                  Préparer une demande
                </Link>
              </nav>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
