import Container from "@/components/ui/Container";

export default function ContactHero() {
  return (
    <section
      className="border-b border-white/8 bg-navy-950 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-20"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-brand-400">
            Parlons de votre projet
          </p>
          <h1 id="contact-heading" className="section-title max-w-3xl text-white">
            Échangeons sur votre projet technique
          </h1>
          <p className="lead mt-6 max-w-2xl text-slate-300">
            Ventilation, chauffage, climatisation, hydraulique, plomberie ou CVC&nbsp;: décrivez
            votre bâtiment, l’installation existante et le besoin concerné.
          </p>
        </div>
      </Container>
    </section>
  );
}
