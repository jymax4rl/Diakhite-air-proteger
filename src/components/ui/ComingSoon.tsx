import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

interface ComingSoonProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function ComingSoon({ eyebrow, title, description }: ComingSoonProps) {
  return (
    <section
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-navy-900 pb-16 pt-28"
      aria-labelledby="coming-soon-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.18), transparent 34%), radial-gradient(circle at 15% 85%, rgba(96, 165, 250, 0.08), transparent 30%)",
        }}
      />
      <Container className="relative">
        <div className="max-w-3xl rounded-2xl border border-white/10 bg-navy-800/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-400">
            {eyebrow}
          </p>
          <h1 id="coming-soon-heading" className="section-title mt-4 text-white">
            {title}
          </h1>
          <p className="lead mt-6 max-w-2xl text-slate-300">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/services" size="lg" className="w-full sm:w-auto">
              Découvrir nos services
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto">
              Nous contacter
            </Button>
          </div>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
          >
            Retour à l’accueil
          </Link>
        </div>
      </Container>
    </section>
  );
}
