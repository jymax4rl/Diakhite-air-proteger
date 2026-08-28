import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { images } from "@/data/images";

export default function ServicesHero() {
  return (
    <section
      className="relative isolate min-h-[78svh] overflow-hidden pt-16"
      aria-labelledby="services-hero-heading"
    >
      <Image
        src={images.servicePage.hero}
        alt="Équipements de chauffage, ventilation et climatisation installés dans un bâtiment"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
        preload
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/88 to-navy-950/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/85 via-transparent to-navy-950/35" />

      <div className="site-container flex min-h-[calc(78svh-4rem)] flex-col py-8 sm:py-10 md:py-14">
        <nav aria-label="Fil d’Ariane" className="mb-auto">
          <ol className="flex items-center gap-2 text-sm text-slate-300">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-white motion-reduce:transition-none"
              >
                Accueil
              </Link>
            </li>
            <li aria-hidden="true" className="text-brand-400">
              /
            </li>
            <li aria-current="page" className="text-white">
              Services
            </li>
          </ol>
        </nav>

        <div className="max-w-5xl py-12 md:py-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-400 sm:text-sm">
            Chauffage · climatisation · ventilation · plomberie
          </p>
          <h1 id="services-hero-heading" className="hero-title max-w-4xl text-white">
            Les équipements techniques de votre{" "}
            <span className="text-brand-400">bâtiment</span>
          </h1>
          <p className="lead mt-6 max-w-2xl text-slate-200">
            De l’étude à la maintenance, nous intervenons sur vos installations de chauffage,
            climatisation, ventilation et plomberie.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              Demander un devis <ArrowIcon />
            </Button>
            <Button
              href="#services"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto motion-reduce:transition-none"
            >
              Découvrir nos services
            </Button>
          </div>
        </div>

        <p className="mt-auto max-w-xl border-l border-brand-400 pl-4 text-sm leading-relaxed text-slate-300">
          Une approche coordonnée des réseaux d’air et d’eau, attentive aux usages, à
          l’intégration technique et à l’accessibilité des équipements.
        </p>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.75 9h10.5M10 4.75 14.25 9 10 13.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
