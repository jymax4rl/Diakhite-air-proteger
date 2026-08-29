/**
 * Z-INDEX HIERARCHY
 * -----------------
 * Navbar header:   z-[60]  (stays above the overlay so logo is always readable)
 * MobileMenu:      z-[50]  (sits below navbar but above ALL page content)
 * Page content:    z-auto  (normal flow)
 *
 * Because the header paints above this overlay, the overlay reserves 4rem of
 * top padding for it and owns no top bar of its own: the navbar's animated
 * hamburger IS the close control. An in-overlay close button could not work —
 * z-index inside this element cannot escape the overlay's own z-50 stacking
 * context, so it would sit under the header, invisible and unclickable.
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
 * "click outside" region — only the hamburger, the nav links and Escape dismiss
 * it; clicking the panel background does nothing.
 */
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { site } from "@/data/site";

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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const menu = menuRef.current;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const getFocusable = () =>
      Array.from(
        menu?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    const focusFrame = window.requestAnimationFrame(() => getFocusable()[0]?.focus());

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        e.preventDefault();
        menu?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handler);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  // Scroll lock. `globals.css` sets `overflow-x: hidden` on <html>, so the root
  // element's overflow is no longer `visible` and <body>'s overflow does NOT
  // propagate to the viewport — <html> is the scrolling element. Locking body
  // alone therefore leaves the page scrollable behind the overlay, so lock both.
  // Prior inline values are captured and restored rather than blanket-cleared,
  // so a value another component owns survives the close.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const { body } = document;
    const previous = { root: root.style.overflow, body: body.style.overflow };
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous.root;
      body.style.overflow = previous.body;
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      id="mobile-navigation"
      tabIndex={-1}
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
        // Clear the fixed 4rem navbar, which paints above this overlay (z-60 vs
        // z-50). `box-sizing: border-box` keeps the total height at 100dvh.
        paddingTop: "4rem",
      }}
    >
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
          href={site.contact.phone.href}
          aria-label={`Appelez ${site.brand.name} au ${site.contact.phone.display}`}
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
          <PhoneIcon /> {site.contact.phone.display}
        </a>
        <Link
          href="/contact#demande"
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
