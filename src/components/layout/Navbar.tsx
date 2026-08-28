import Link from "next/link";
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
            className="flex min-w-0 items-center gap-2 group flex-shrink-0 sm:gap-2.5"
            aria-label={`${site.brand.name} — Accueil`}
          >
            <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500 transition-colors duration-200">
              <LogoIcon />
            </div>
            <div className="min-w-0 leading-none">
              <span className="block whitespace-nowrap text-[13px] font-bold tracking-tight text-white sm:text-[15px]">
                {site.brand.logoPrimary}
              </span>
              <span className="block text-[8px] font-bold uppercase tracking-[0.14em] text-brand-400 sm:text-[9px] sm:tracking-[0.15em]">
                {site.brand.logoSecondary}
              </span>
            </div>
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
            <Button href="/contact" size="sm">
              Demander un devis →
            </Button>
          </div>

          {/* ── Mobile controls ── */}
          <div className="flex lg:hidden items-center gap-2.5">
            <a
              href={site.contact.phone.href}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-600 text-white hover:bg-brand-500 transition-colors"
              aria-label="Nous appeler"
            >
              <PhoneIcon className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onMenuToggle}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="relative w-9 h-9 rounded-lg border border-white/15 text-white hover:bg-white/10 transition-colors"
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

function LogoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M10 3 C10 3 7.5 7 10 11 C12.5 7 10 3 10 3Z" fill="white" opacity="0.92" />
      <path d="M3 10 C3 10 7 12.5 11 10 C7 7.5 3 10 3 10Z" fill="white" opacity="0.92" />
      <path d="M17 10 C17 10 13 7.5 9 10 C13 12.5 17 10 17 10Z" fill="white" opacity="0.92" />
      <path d="M10 17 C10 17 12.5 13 10 9 C7.5 13 10 17 10 17Z" fill="white" opacity="0.92" />
      <circle cx="10" cy="10" r="2.5" fill="white" />
    </svg>
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
