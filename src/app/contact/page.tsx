import type { Metadata } from "next";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";

const origin = site.url;
const canonicalUrl = `${origin}/contact`;
const description = `Présentez votre besoin en ventilation, chauffage, climatisation, hydraulique, plomberie ou CVC à ${site.brand.name}, ou contactez-nous par téléphone.`;

export const metadata: Metadata = {
  title: "Contact — Parlons de votre projet",
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
    title: `Parlons de votre projet | ${site.brand.name}`,
    description,
  },
  twitter: {
    card: "summary",
    title: `Parlons de votre projet | ${site.brand.name}`,
    description,
  },
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50">
      <ContactHero />
      <Container className="section-y">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,24rem)] lg:gap-12 xl:gap-16">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </div>
  );
}
