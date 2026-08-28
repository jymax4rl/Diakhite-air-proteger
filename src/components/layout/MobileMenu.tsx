/**
 * Z-INDEX HIERARCHY
 * -----------------
 * Navbar header:   z-[60]  (stays above the overlay so logo is always readable)
 * MobileMenu:      z-[50]  (sits below navbar but above ALL page content)
 * Close button:    z-[70]  (above navbar, always reachable)
 * Page content:    z-auto  (normal flow)
 *
 * This works because MobileMenu is a SIBLING of <main> in the DOM, rendered
 * directly inside <body> via SiteShell — NOT a descendant of the <header>
 * element that has backdrop-filter. That filter creates a new stacking context
 * which would trap any fixed children inside it. As a sibling, position:fixed
 * on this overlay resolves to the viewport (initial containing block).
 *
 * The overlay stays permanently mounted and is toggled with opacity/transform/
 * visibility/pointer-events so it can animate on the way OUT as well as in —
 * unmounting on close would skip the exit transition entirely.
 *
 * There is no separate backdrop element: this root IS the backdrop, covering the
 * full viewport with a near-opaque fill plus blur. Consequently there is no
 * "click outside" region — only the close button and the nav links dismiss it.
 */
"use client";

import { useEffect } from "react";
import Link from "next/link";

interface NavLink {
  readonly href: string;
  readonly label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: readonly NavLink[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Capture whatever inline `overflow` the body already had so closing restores
  // it instead of blanket-clearing a value another component may own.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      aria-hidden={!isOpen}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100dvh",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        background: "rgba(4, 8, 16, 0.97)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0)" : "translateY(-20px)",
        visibility: isOpen ? "visible" : "hidden",
        // `visibility` is not interpolable, so it is stepped: immediately on
        // open, and deferred a full 280ms on close so the exit animation is not
        // cut short. While hidden, the panel's links leave the tab order.
        transition: `opacity 280ms ease-in-out, transform 280ms ease-in-out, visibility 0s linear ${
          isOpen ? "0s" : "280ms"
        }`,
        pointerEvents: isOpen ? "auto" : "none",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {/* Top bar — logo + close */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.25rem",
          height: "4rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}
      >
        <Link
          href="/"
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            textDecoration: "none",
          }}
          aria-label="Ventila Solutions — Accueil"
        >
          <div
            style={{
              width: "2.25rem",
              height: "2.25rem",
              background: "#2563eb",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <LogoIcon />
          </div>
          <div style={{ lineHeight: 1 }}>
            <span
              style={{
                display: "block",
                color: "white",
                fontWeight: 700,
                fontSize: "0.9375rem",
              }}
            >
              Ventila
            </span>
            <span
              style={{
                display: "block",
                color: "#60a5fa",
                fontSize: "0.5625rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Solutions
            </span>
          </div>
        </Link>
        <button
          onClick={onClose}
          aria-label="Fermer le menu"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.5rem",
            height: "2.5rem",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "0.5rem",
            background: "transparent",
            color: "white",
            cursor: "pointer",
            zIndex: 70,
          }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Nav links */}
      <nav
        aria-label="Navigation mobile"
        style={{
          flex: 1,
          padding: "1.5rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "1rem 1rem",
              color: "rgba(203,213,225,1)",
              fontWeight: 500,
              fontSize: "1.125rem",
              borderRadius: "0.75rem",
              textDecoration: "none",
              transition: "background 150ms, color 150ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLAnchorElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(203,213,225,1)";
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Footer CTA */}
      <div
        style={{
          padding: "1.5rem 1.25rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          flexShrink: 0,
        }}
      >
        <a
          href="tel:+33123456789"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            padding: "0.875rem 1rem",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "9999px",
            color: "white",
            fontSize: "0.9375rem",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <PhoneIcon /> 01 23 45 67 89
        </a>
        <Link
          href="/contact"
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.9375rem 1rem",
            background: "#2563eb",
            borderRadius: "9999px",
            color: "white",
            fontWeight: 700,
            fontSize: "1rem",
            textDecoration: "none",
          }}
        >
          Demander un devis →
        </Link>
      </div>
    </div>
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

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1 1L13 13M13 1L1 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}
