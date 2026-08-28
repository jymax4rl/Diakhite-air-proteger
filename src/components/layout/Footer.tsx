import Link from "next/link";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";

const services = [
  { href: "/services/residentiel", label: "Ventilation Résidentielle" },
  { href: "/services/commercial", label: "Ventilation Commerciale" },
  { href: "/services/industriel", label: "Ventilation Industrielle" },
  { href: "/services/entretien", label: "Entretien & Maintenance" },
];

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
              className="inline-flex items-center gap-2.5 mb-5"
              aria-label={`${site.brand.name} — Accueil`}
            >
              <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <LogoIcon />
              </div>
              <div className="leading-none">
                <span className="block whitespace-nowrap text-[15px] font-bold text-white">
                  {site.brand.logoPrimary}
                </span>
                <span className="block text-brand-400 text-[9px] font-bold tracking-[0.15em] uppercase">
                  {site.brand.logoSecondary}
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Solutions d’installation, de maintenance et d’entretien des
              systèmes de ventilation.
            </p>

            <address className="not-italic space-y-2 text-sm text-slate-400">
              <p>
                <a
                  href={site.contact.phone.href}
                  className="hover:text-white transition-colors"
                >
                  📞 {site.contact.phone.display}
                </a>
              </p>
              <p>
                <a
                  href={site.contact.email.href}
                  className="hover:text-white transition-colors"
                >
                  ✉️ {site.contact.email.address}
                </a>
              </p>
              <p>📍 Siège social : {site.company.registeredAddress.display}</p>
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
              {services.map((link) => (
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
            <Link
              href="/politique-confidentialite"
              className="hover:text-slate-300 transition-colors"
            >
              Confidentialité
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

function LogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3 C10 3 7.5 7 10 11 C12.5 7 10 3 10 3Z" fill="white" opacity="0.92" />
      <path d="M3 10 C3 10 7 12.5 11 10 C7 7.5 3 10 3 10Z" fill="white" opacity="0.92" />
      <path d="M17 10 C17 10 13 7.5 9 10 C13 12.5 17 10 17 10Z" fill="white" opacity="0.92" />
      <path d="M10 17 C10 17 12.5 13 10 9 C7.5 13 10 17 10 17Z" fill="white" opacity="0.92" />
      <circle cx="10" cy="10" r="2.5" fill="white" />
    </svg>
  );
}
