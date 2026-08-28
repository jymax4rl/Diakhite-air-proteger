import type { Metadata } from "next";
import ExpertiseIntro from "@/components/services/ExpertiseIntro";
import ServicesCTA from "@/components/services/ServicesCTA";
import ServicesEditorialGrid from "@/components/services/ServicesEditorialGrid";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesProcess from "@/components/services/ServicesProcess";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import { servicePageItems } from "@/data/service-page";
import { organizationId, site } from "@/data/site";

const origin = site.url;
const canonicalUrl = `${origin}/services`;
const heroImageUrl = `${origin}/images/services/solutions-ventilation-conduits-air.jpg`;
const description =
  "Installation et maintenance de ventilation, VMC, extraction et traitement de l’air pour l’habitat, les locaux professionnels et l’industrie.";

export const metadata: Metadata = {
  title: "Services de ventilation et traitement de l’air",
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: canonicalUrl,
    siteName: site.brand.name,
    title: `Services de ventilation et traitement de l’air | ${site.brand.name}`,
    description,
    images: [
      {
        url: heroImageUrl,
        width: 2400,
        height: 1600,
        alt: "Réseau de conduits et bouche de ventilation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Services de ventilation et traitement de l’air | ${site.brand.name}`,
    description,
    images: [heroImageUrl],
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: origin,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Services de ventilation et traitement de l’air",
        url: canonicalUrl,
        numberOfItems: servicePageItems.length,
        itemListElement: servicePageItems.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.summary,
            url: `${canonicalUrl}#${service.id}`,
            provider: {
              "@id": organizationId,
            },
          },
        })),
      },
    ],
  };

  return (
    <div className="bg-navy-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServicesHero />
      <ExpertiseIntro />
      <ServicesEditorialGrid />
      <WhyChooseUs />
      <ServicesProcess />
      <ServicesCTA />
    </div>
  );
}
