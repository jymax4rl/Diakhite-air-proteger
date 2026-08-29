import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import Container from "@/components/ui/Container";
import { services } from "@/data/services";
import { site } from "@/data/site";

const company = [
  { href: "/a-propos", label: "À propos" },
  { href: "/realisations", label: "Nos Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/6">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ── Brand column ── */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="mb-5 inline-flex items-center"
              aria-label={`${site.brand.name} — Accueil`}
            >
              <BrandLogo />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Ventilation, chauffage, climatisation, hydraulique, plomberie et
              solutions CVC pour les bâtiments.
            </p>

            <address className="not-italic space-y-2 text-sm text-slate-400">
              <p>
                <a
                  href={site.contact.phone.href}
                  className="hover:text-white transition-colors"
                >
                  <span aria-hidden="true">☎</span> {site.contact.phone.display}
                </a>
              </p>
              <p>
                <span aria-hidden="true">⌖</span> Siège social :{" "}
                {site.company.registeredAddress.display}
              </p>
            </address>
            <p className="mt-5 text-xs leading-5 text-slate-500">
              {site.company.legalName} · {site.company.legalForm}
              <br />
              SIREN {site.company.sirenDisplay} · {site.company.rcs}
            </p>
          </div>

          {/* ── Services column ── */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-[0.12em] uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-slate-400 text-sm hover:text-white transition-colors leading-snug"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company column ── */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-[0.12em] uppercase mb-4">
              Entreprise
            </h3>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-white transition-colors leading-snug"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/6 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {site.brand.name}. Tous droits réservés.
          </p>
          <nav aria-label="Liens légaux" className="flex gap-5">
            <Link
              href="/mentions-legales"
              className="hover:text-slate-300 transition-colors"
            >
              Mentions légales
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
