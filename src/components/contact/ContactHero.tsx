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
            Échangeons sur vos besoins en ventilation
          </h1>
          <p className="lead mt-6 max-w-2xl text-slate-300">
            Décrivez votre bâtiment, l’installation existante et vos objectifs. Ces premiers
            éléments aideront à préparer un échange adapté à votre projet.
          </p>
        </div>
      </Container>
    </section>
  );
}
