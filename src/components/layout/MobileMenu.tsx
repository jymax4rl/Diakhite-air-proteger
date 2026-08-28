"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface NavLink {
  readonly href: string;
  readonly label: string;
}

interface MobileMenuProps {
  links: readonly NavLink[];
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  /* Prevent body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger / Close button */}
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white hover:bg-white/10 transition-colors"
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={`fixed top-0 right-0 bottom-0 z-50 w-[min(82vw,360px)] bg-navy-950 border-l border-white/15 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/8 flex-shrink-0">
          <span className="text-white font-semibold text-sm tracking-wide">
            Navigation
          </span>
          <button
            onClick={close}
            aria-label="Fermer le menu"
            className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-5"
          aria-label="Navigation mobile"
        >
          <ul className="space-y-0.5" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center px-4 py-3.5 text-slate-300 hover:text-white hover:bg-white/6 rounded-xl text-base font-medium transition-all duration-150"
                  onClick={close}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Panel footer – CTAs */}
        <div className="px-5 py-5 border-t border-white/8 flex flex-col gap-2.5 flex-shrink-0">
          <a
            href="tel:+33123456789"
            className="flex items-center justify-center gap-2.5 w-full px-4 py-3 rounded-xl border border-white/15 text-white text-sm font-medium hover:bg-white/8 transition-colors"
          >
            <PhoneIcon />
            01 23 45 67 89
          </a>
          <Button
            href="/contact"
            className="w-full"
            onClick={close}
          >
            Demander un devis →
          </Button>
        </div>
      </div>
    </>
  );
}

function HamburgerIcon() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 1H16M0 6H16M0 11H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1L11 11M11 1L1 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}
