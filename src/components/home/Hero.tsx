import Image from "next/image";
import Button from "@/components/ui/Button";
import Process from "@/components/home/Process";
import { images } from "@/data/images";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      /* 85svh on phones so a short viewport (320×568) is driven by the content
         instead of being padded out to a full screen; full viewport height from
         md up where a cinematic hero has room to breathe. */
      className="relative flex flex-col min-h-[85svh] md:min-h-svh pb-6 md:pb-10"
      aria-labelledby="hero-heading"
    >
      {/* ── Background image + gradient overlay ── */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.hero.ventilation}
          alt="Conduits de ventilation métalliques dans un intérieur moderne"
          fill
          sizes="100vw"
          className="object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Left-heavy gradient so text on the left is always readable. The copy
            spans the full width on phones, so the right-hand stop stays darker
            below md and only opens up once the text column is inset. */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/55 md:to-navy-950/30" />
        {/* Top + bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950/60" />
      </div>

      {/* ── Hero content (pt-16 clears the fixed 4rem navbar) ── */}
      <div className="flex-1 flex items-center pt-16">
        <div className="site-container w-full py-10 sm:py-14 md:py-20 lg:py-28">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p
              className="inline-flex items-center gap-2 text-brand-400 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mb-4 md:mb-6"
              aria-hidden="false"
            >
              <span aria-hidden="true">✦</span>
              {site.brand.name}
            </p>

            {/* Main heading */}
            <h1 id="hero-heading" className="hero-title text-white mb-4 md:mb-7">
              <span className="text-brand-500">Ventilation</span>, plomberie et
              CVC pour vos bâtiments
            </h1>

            {/* Sub-copy */}
            <p className="lead text-slate-300 mb-7 md:mb-10 max-w-lg">
              Installation · Dépannage · Entretien · Maintenance
            </p>

            {/* CTAs — wrap to their own line rather than shrinking */}
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact#demande" size="lg">
                Demander un devis →
              </Button>
              <Button href={site.contact.phone.href} variant="outline" size="lg">
                <PhoneIcon />
                Appeler maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Process strip — overlays the hero photograph ── */}
      <Process />
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}
