import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function ServicesCTA() {
  return (
    <section className="section-y bg-brand-600" aria-labelledby="services-cta-heading">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-100">
              Votre projet
            </p>
            <h2 id="services-cta-heading" className="section-title mt-3 max-w-3xl text-white">
              Parlons de votre bâtiment et de vos besoins en ventilation
            </h2>
            <p className="lead mt-5 max-w-2xl text-blue-100">
              Décrivez-nous les espaces concernés, leurs usages et l’installation existante. Ces
              premiers éléments nous permettront de préparer l’échange.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4 lg:items-stretch">
            <Button
              href="/contact"
              size="lg"
              className="w-full border-white bg-white text-brand-700! hover:border-blue-50 hover:bg-blue-50 active:border-blue-100! active:bg-blue-100!"
            >
              Demander un devis <ArrowIcon />
            </Button>
            <a
              href="tel:+33651644657"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/35 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 motion-reduce:transition-none"
              aria-label="Appelez Ventila Solutions au 06 51 64 46 57"
            >
              <PhoneIcon /> 06 51 64 46 57
            </a>
            <a
              href="mailto:contact@ventila-solutions.fr"
              className="text-center text-sm text-blue-100 underline decoration-white/35 underline-offset-4 transition-colors hover:text-white motion-reduce:transition-none"
            >
              contact@ventila-solutions.fr
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 10h14M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.2 2.3h2.1l1.1 3-1.3 1.1a10.2 10.2 0 0 0 4.5 4.5l1.1-1.3 3 1.1v2.1c0 .5-.4.9-.9.9A10.5 10.5 0 0 1 2.3 3.2c0-.5.4-.9.9-.9Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
