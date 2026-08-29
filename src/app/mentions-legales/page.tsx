import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";

// Registry facts checked on 2026-08-28 against:
// https://www.societe.com/societe/air-proteger-987925013.html
// https://annuaire-entreprises.data.gouv.fr/entreprise/air-proteger-987925013

const canonicalUrl = `${site.url}/mentions-legales`;
const description = `Informations légales relatives à l’éditeur de ${site.brand.name}, ${site.company.legalName}.`;

export const metadata: Metadata = {
  title: "Mentions légales",
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
    title: `Mentions légales | ${site.brand.name}`,
    description,
  },
  twitter: {
    card: "summary",
    title: `Mentions légales | ${site.brand.name}`,
    description,
  },
};

export default function LegalNoticePage() {
  return (
    <div className="bg-slate-50 text-navy-800">
      <header className="border-b border-white/8 bg-navy-950 pb-12 pt-28 text-white sm:pb-16 sm:pt-32">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-400">
            Informations juridiques
          </p>
          <h1 className="section-title mt-4">Mentions légales</h1>
          <p className="lead mt-5 max-w-2xl text-slate-300">
            Identité de l’entreprise qui édite le site {site.brand.name}.
          </p>
        </Container>
      </header>

      <Container className="section-y">
        <div className="mx-auto grid max-w-3xl gap-10">
          <section aria-labelledby="legal-publisher">
            <h2 id="legal-publisher" className="text-2xl font-bold tracking-tight">
              Éditeur du site
            </h2>
            <p className="mt-4 leading-7 text-slate-700">
              Le présent site, présenté sous le nom {site.brand.name}, est édité par{" "}
              <strong>{site.company.legalName}</strong>, {site.company.legalForm} au capital social
              de {site.company.shareCapital}.
            </p>
          </section>

          <section aria-labelledby="legal-registration">
            <h2 id="legal-registration" className="text-2xl font-bold tracking-tight">
              Immatriculation et activité
            </h2>
            <dl className="mt-5 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-[12rem_1fr]">
              <LegalFact term="SIREN">{site.company.sirenDisplay}</LegalFact>
              <LegalFact term="SIRET du siège">{site.company.siretDisplay}</LegalFact>
              <LegalFact term="RCS">{site.company.rcs}</LegalFact>
              <LegalFact term="TVA intracommunautaire">{site.company.vatIdDisplay}</LegalFact>
              <LegalFact term="Code APE">{site.company.apeCode}</LegalFact>
              <LegalFact term="Activité principale">{site.company.apeLabel}</LegalFact>
              <LegalFact term="Date de création">
                <time dateTime={site.company.creationDate}>{site.company.creationDateDisplay}</time>
              </LegalFact>
              <LegalFact term="État">{site.company.status}</LegalFact>
            </dl>
          </section>

          <section aria-labelledby="legal-office">
            <h2 id="legal-office" className="text-2xl font-bold tracking-tight">
              Siège social
            </h2>
            <address className="mt-4 not-italic leading-7 text-slate-700">
              {site.company.registeredAddress.streetAddress}
              <br />
              {site.company.registeredAddress.postalCode}{" "}
              {site.company.registeredAddress.addressLocality}, France
            </address>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Cette adresse administrative ne vaut pas indication d’accueil du public.
            </p>
          </section>

          <section aria-labelledby="legal-contact">
            <h2 id="legal-contact" className="text-2xl font-bold tracking-tight">
              Contact
            </h2>
            <address className="mt-4 grid gap-2 not-italic leading-7 text-slate-700">
              <a className="underline underline-offset-4" href={site.contact.phone.href}>
                {site.contact.phone.display}
              </a>
            </address>
          </section>
        </div>
      </Container>
    </div>
  );
}

function LegalFact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="font-semibold text-navy-800">{term}</dt>
      <dd className="break-words text-slate-700">{children}</dd>
    </>
  );
}
