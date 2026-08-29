import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { services, type Service } from "@/data/services";

export default function Services() {
  return (
    <section
      className="bg-slate-50 section-y"
      aria-labelledby="services-heading"
    >
      <Container>
        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
          <SectionHeading
            eyebrow="Nos services"
            title={
              <>
                Cinq disciplines
                <br />
                et une approche CVC
              </>
            }
            theme="light"
            headingId="services-heading"
            className="mb-0"
          />
          <Link
            href="/services"
            className="text-brand-600 text-sm font-semibold hover:text-brand-700 transition-colors flex items-center gap-1.5 flex-shrink-0 self-end sm:self-auto"
          >
            Voir tout →
          </Link>
        </div>

        {/* ── Carousel on mobile, 2 columns at md, 3 at lg.
               One set of cards: `scroll-snap-row` switches itself from flex to
               grid at md, so the markup (and the images) are not duplicated. ── */}
        <div className="scroll-snap-row md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.href}
      className="scroll-snap-item w-[240px] sm:w-[260px] md:w-auto group block relative overflow-hidden rounded-2xl bg-navy-800 aspect-[3/4] md:aspect-[4/5] lg:aspect-[4/3]"
      aria-label={`${service.title} — ${service.description}`}
    >
      {/* Image — rendered widths: 240/260px in the carousel, ~47vw in the
          2-column tablet grid, ~305px max in the 4-column desktop grid. */}
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        sizes="(max-width: 639px) 240px, (max-width: 767px) 260px, (max-width: 1023px) 47vw, 416px"
        className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
      />

      {/* Gradient overlay — always present, intensifies on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent transition-opacity duration-300" />
      <div className="absolute inset-0 bg-navy-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
        {/* Icon badge */}
        <div className="mb-3 w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
          <ServiceIcon type={service.icon} />
        </div>
        <p className="text-white font-bold text-base leading-tight mb-1">
          {service.title}
        </p>
        <p className="text-slate-300 text-sm leading-snug">
          {service.description}
        </p>
      </div>
    </Link>
  );
}

function ServiceIcon({ type }: { type: Service["icon"] }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    "aria-hidden": true as const,
  };

  if (type === "air") {
    return (
      <svg {...props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === "heating" || type === "cooling") {
    return (
      <svg {...props}>
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="#60a5fa" strokeWidth="2"/>
        <path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === "hydraulic" || type === "cvc") {
    return (
      <svg {...props}>
        <path d="M2 20v-8l5-4v4l5-4v4l5-4v8" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 20h18" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 6v4" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="17" cy="4" r="2" stroke="#60a5fa" strokeWidth="2"/>
      </svg>
    );
  }
  /* wrench */
  return (
    <svg {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
