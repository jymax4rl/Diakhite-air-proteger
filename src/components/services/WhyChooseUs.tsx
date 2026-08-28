import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { trustThemes } from "@/data/service-page";
import { site } from "@/data/site";

export default function WhyChooseUs() {
  return (
    <section className="section-y bg-navy-900" aria-labelledby="why-choose-us-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Notre approche"
              title="La technique au service des usages"
              description="Une ventilation performante ne se résume pas à un équipement. Elle dépend d’une lecture juste du bâtiment, d’une mise en œuvre soignée et d’un entretien possible dans la durée."
              headingId="why-choose-us-heading"
            />
            <Link
              href="/a-propos"
              className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300 motion-reduce:transition-none"
            >
              En savoir plus sur {site.brand.name} <ArrowIcon />
            </Link>
          </div>

          <div className="border-t border-white/10 lg:col-span-7 lg:border-l lg:border-t-0">
            {trustThemes.map((theme, index) => (
              <article
                key={theme.title}
                className="grid gap-3 border-b border-white/10 py-7 lg:grid-cols-[4rem_1fr] lg:px-10"
              >
                <span className="font-mono text-sm text-brand-400">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{theme.title}</h3>
                  <p className="mt-3 max-w-xl leading-7 text-slate-400">{theme.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 8h11M9.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
