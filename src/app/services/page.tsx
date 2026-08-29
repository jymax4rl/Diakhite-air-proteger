import type { Metadata } from "next";
import ExpertiseIntro from "@/components/services/ExpertiseIntro";
import ServicesCTA from "@/components/services/ServicesCTA";
import ServicesEditorialGrid from "@/components/services/ServicesEditorialGrid";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesProcess from "@/components/services/ServicesProcess";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import { services } from "@/data/services";
import { organizationId, site } from "@/data/site";

const origin = site.url;
const canonicalUrl = `${origin}/services`;
const heroImageUrl = `${origin}/images/services/systemes-techniques-cvc-batiment.jpg`;
const description =
  "Ventilation, chauffage, climatisation, hydraulique, plomberie et solutions CVC : installation, dépannage, entretien et maintenance.";

export const metadata: Metadata = {
  title: "Ventilation, plomberie, chauffage et CVC",
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
    title: `Ventilation, plomberie, chauffage et CVC | ${site.brand.name}`,
    description,
    images: [
      {
        url: heroImageUrl,
        width: 2400,
        height: 1600,
        alt: "Équipements techniques CVC installés dans un bâtiment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Ventilation, plomberie, chauffage et CVC | ${site.brand.name}`,
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
        name: "Ventilation, plomberie, chauffage et solutions CVC",
        url: canonicalUrl,
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.summary,
            url: `${origin}${service.href}`,
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
