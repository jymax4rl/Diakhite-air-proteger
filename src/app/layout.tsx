import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteShell from "@/components/layout/SiteShell";
import Footer from "@/components/layout/Footer";
import { organizationId, site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand.name} — Solutions de ventilation performantes`,
    template: `%s | ${site.brand.name}`,
  },
  description:
    "Nous concevons, installons et entretenons des systèmes de ventilation efficaces, économiques et durables. Résidentiel, commercial et industriel.",
  keywords: [
    "ventilation",
    "HVAC",
    "climatisation",
    "installation ventilation",
    "entretien ventilation",
    "ventilation industrielle",
    "ventilation commerciale",
    site.company.legalName,
  ],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.brand.name,
    legalName: site.company.legalName,
    url: site.url,
    telephone: site.contact.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.company.registeredAddress.streetAddress,
      postalCode: site.company.registeredAddress.postalCode,
      addressLocality: site.company.registeredAddress.addressLocality,
      addressCountry: site.company.registeredAddress.addressCountry,
    },
    vatID: site.company.vatId,
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "SIREN",
        value: site.company.siren,
      },
      {
        "@type": "PropertyValue",
        propertyID: "SIRET",
        value: site.company.siret,
      },
    ],
  };

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-900 text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SiteShell>{children}</SiteShell>
        <Footer />
      </body>
    </html>
  );
}
