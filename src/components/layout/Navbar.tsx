import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Hamburger line base styles.
 *
 * Centering uses left/top + negative margins rather than `-translate-x-1/2
 * -translate-y-1/2`: Tailwind v4 emits the individual `translate` CSS property,
 * so a centering translate would be overwritten by the animation's translate.
 * Negative margins keep `translate`/`rotate`/`scale` free for the animation and
 * leave `transform-origin` at the element's centre, so the X forms in place and
 * the 36px button never changes size.
 */
const burgerLine =
  "absolute left-1/2 top-1/2 -ml-2 -mt-[0.75px] w-4 h-[1.5px] bg-white rounded-full transition-all duration-300 ease-in-out";

interface NavbarProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export default function Navbar({ onMenuToggle, menuOpen }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-navy-950/90 backdrop-blur-xl border-b border-white/5">
      <div className="site-container">
        <nav
          className="flex items-center justify-between h-16"
          aria-label="Navigation principale"
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className="group flex min-w-0 flex-shrink-0 items-center"
            aria-label={`${site.brand.name} — Accueil`}
          >
            <BrandLogo
              compact
              loading="eager"
              markClassName="transition-colors duration-200 group-hover:bg-brand-500"
            />
          </Link>

          {/* ── Desktop links ── */}
          <ul className="hidden lg:flex items-center gap-0.5" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-3.5 py-2 text-[13px] font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/6 transition-all duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <a
              href={site.contact.phone.href}
              className="flex items-center gap-1.5 text-[13px] font-medium text-slate-300 hover:text-white transition-colors"
              aria-label={`Appelez-nous au ${site.contact.phone.display}`}
            >
              <PhoneIcon className="w-3.5 h-3.5" />
              {site.contact.phone.display}
            </a>
            <Button href="/contact#demande" size="sm">
              Demander un devis →
            </Button>
          </div>

          {/* ── Mobile controls ── */}
          <div className="flex lg:hidden items-center gap-2.5">
            <a
              href={site.contact.phone.href}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-500"
              aria-label="Nous appeler"
            >
              <PhoneIcon className="w-4 h-4" />
            </a>
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={onMenuToggle}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="relative h-11 w-11 rounded-lg border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <span
                aria-hidden="true"
                className={`${burgerLine} ${
                  menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px]"
                }`}
              />
              <span
                aria-hidden="true"
                className={`${burgerLine} ${
                  menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                }`}
              />
              <span
                aria-hidden="true"
                className={`${burgerLine} ${
                  menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[5px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}
