import Image from "next/image";
import Button from "@/components/ui/Button";
import { images } from "@/data/images";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col"
      aria-labelledby="hero-heading"
      style={{ minHeight: "calc(100svh)" }}
    >
      {/* ── Background image + gradient overlay ── */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.hero.ventilation}
          alt="Système de ventilation industrielle — conduits d'air"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          unoptimized
        />
        {/* Left-heavy gradient so text on left always readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/98 via-navy-950/85 to-navy-950/50" />
        {/* Top + bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-transparent to-navy-950/80" />
      </div>

      {/* ── Hero content ── */}
      <div className="flex-1 flex items-center pt-16">
        <div className="site-container w-full py-16 sm:py-20 md:py-28 lg:py-36">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p
              className="inline-flex items-center gap-2 text-brand-400 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mb-5 md:mb-6"
              aria-hidden="false"
            >
              <span aria-hidden="true">✦</span>
              Air sain, confort maximal
            </p>

            {/* Main heading */}
            <h1
              id="hero-heading"
              className="hero-title text-white mb-5 md:mb-7"
            >
              Solutions de{" "}
              <span className="text-brand-500">ventilation</span>
              {" "}performantes
            </h1>

            {/* Sub-copy */}
            <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-lg">
              Nous concevons, installons et entretenons des systèmes de
              ventilation efficaces, économiques et durables.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/services" size="lg">
                Nos services →
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                <DocumentIcon />
                Devis gratuit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Process strip (overlaps into next section) ── */}
      <ProcessStrip />
    </section>
  );
}

/** Four-step process bar rendered inside the Hero so it can overlap the background image */
function ProcessStrip() {
  const steps = [
    {
      num: "01",
      title: "Évaluation",
      desc: "Analyse de vos besoins",
      icon: <EvalIcon />,
    },
    {
      num: "02",
      title: "Conception",
      desc: "Solution sur mesure",
      icon: <ConceptionIcon />,
    },
    {
      num: "03",
      title: "Installation",
      desc: "Mise en œuvre professionnelle",
      icon: <InstallIcon />,
    },
    {
      num: "04",
      title: "Entretien",
      desc: "Suivi et maintenance",
      icon: <EntretienIcon />,
    },
  ];

  return (
    <div className="relative z-10 site-container pb-0 -mb-8 sm:-mb-10">
      <div
        className="bg-navy-800/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 sm:px-6 py-4 sm:py-5"
        role="list"
        aria-label="Notre processus en 4 étapes"
      >
        {/* ── Progress bar (desktop only) ── */}
        <div className="hidden md:flex items-center mb-5 px-2">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <span
                className={`text-[11px] font-bold tracking-wider ${
                  i === 0 ? "text-brand-400" : "text-slate-600"
                }`}
              >
                {s.num}
              </span>
              {i < steps.length - 1 && (
                <div className="flex-1 mx-3 h-px bg-white/10" />
              )}
            </div>
          ))}
        </div>

        {/* ── Steps: scroll on mobile, grid on desktop ── */}
        <div className="scroll-snap-row md:grid md:grid-cols-4 md:gap-4">
          {steps.map((s) => (
            <div
              key={s.num}
              role="listitem"
              className="scroll-snap-item w-[180px] sm:w-[200px] md:w-auto flex flex-col gap-2"
            >
              {/* Icon badge */}
              <div className="w-9 h-9 rounded-xl bg-brand-600/20 border border-brand-600/30 flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              {/* Step number (mobile only — shows above title) */}
              <p className="md:hidden text-brand-400 text-[10px] font-bold tracking-widest">
                {s.num}
              </p>
              <p className="text-white text-sm font-semibold leading-snug">
                {s.title}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-snug">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Scroll dots (mobile only) ── */}
        <div className="flex md:hidden justify-center gap-2 mt-4" aria-hidden="true">
          {steps.map((s, i) => (
            <span
              key={s.num}
              className={`h-1.5 rounded-full transition-all ${
                i === 0 ? "w-5 bg-brand-500" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Step icons ─────────────────────────────────────────────── */

function EvalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round"/>
      <rect x="9" y="3" width="6" height="4" rx="1" stroke="#60a5fa" strokeWidth="1.8"/>
      <path d="M9 12h6M9 16h4" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function ConceptionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12h3M19 12h3M12 2v3M12 19v3" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="4" stroke="#60a5fa" strokeWidth="1.8"/>
      <path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function InstallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EntretienIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
