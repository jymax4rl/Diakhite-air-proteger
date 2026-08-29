import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/data/images";
import { site } from "@/data/site";

const approach = [
  {
    title: "Cinq disciplines",
    description: "Ventilation, chauffage, climatisation, hydraulique et plomberie.",
  },
  {
    title: "Solutions CVC",
    description: "Une coordination des systèmes techniques concernés par un même bâtiment.",
  },
  {
    title: "Cycle de l’installation",
    description: "Installation, dépannage, entretien et maintenance selon le besoin présenté.",
  },
] as const;

export default function AboutPreview() {
  return (
    <section className="bg-navy-800 section-y" aria-labelledby="about-heading">
      <Container>
        {/* Stacks as content-then-image below lg (DOM order), two columns from
            lg — no order swapping needed. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Text column ── */}
          <div>
            <SectionHeading
              eyebrow={`À propos de ${site.brand.name}`}
              title="Des métiers distincts, une lecture claire de votre besoin"
              description={`${site.brand.name} intervient sur les équipements et réseaux techniques du bâtiment. Chaque demande est orientée vers la discipline concernée ou vers une approche CVC coordonnée.`}
              headingId="about-heading"
            />

            <div className="grid gap-3 sm:grid-cols-3 mt-8 mb-8">
              {approach.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/8 bg-white/5 p-4"
                >
                  <p className="font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <Button href="/services" variant="outline">
              Voir nos services →
            </Button>
          </div>

          {/* ── Image column ── */}
          <div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4]">
              {/* Full container width when stacked; half the content column
                  (448px at lg, 608px max) once side by side. */}
              <Image
                src={images.servicePage.hydraulicNetwork}
                alt="Réseau hydraulique CVC composé de conduites isolées dans un local technique propre"
                fill
                sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 46vw, 608px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/40 to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
