/**
 * Four-step process strip.
 *
 * Rendered as the last child of the Hero <section> so the glass panel sits on
 * top of the hero photograph. That placement is what creates the overlap in the
 * reference design — it replaces the previous `-mb-8 sm:-mb-10` negative margin
 * that pulled the panel into the following section. Nothing here is positioned
 * out of flow, so the panel can never widen the document.
 *
 * Layout: horizontal scroll-snap carousel below md, four equal columns from md
 * up (the `scroll-snap-row` utility owns that switch).
 */
import ProcessCarousel from "@/components/home/ProcessCarousel";

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

export default function Process() {
  return (
    <div className="relative z-10 site-container">
      <div className="bg-navy-800/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 sm:px-6 py-4 sm:py-5">
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

        {/* ── Steps: carousel on mobile, 4 columns from md ── */}
        <ProcessCarousel stepLabels={steps.map((step) => step.title)}>
          {steps.map((s) => (
            <div key={s.num} className="contents">
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
        </ProcessCarousel>
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
