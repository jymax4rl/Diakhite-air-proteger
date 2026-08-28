"use client";

import { useState, useCallback, useEffect } from "react";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import { navLinks } from "./Navbar";

/** Tailwind's `lg` breakpoint — the width at which the hamburger disappears. */
const LG_BREAKPOINT = 1024;

interface SiteShellProps {
  children: React.ReactNode;
}

/**
 * SiteShell is the single source of truth for `menuOpen`.
 *
 * The state cannot live in `app/layout.tsx` (a Server Component, so no
 * `useState`), and it deliberately does not live in `Navbar`: the `<header>`
 * carries `backdrop-blur-xl`, which creates a new stacking context that traps
 * `position: fixed` descendants. MobileMenu must therefore be a SIBLING of the
 * header and of `<main>`, which means their nearest common owner — this thin
 * client wrapper — has to hold the state.
 */
export default function SiteShell({ children }: SiteShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // The overlay is only reachable through the `lg:hidden` hamburger, so a menu
  // left open while the viewport grows past `lg` would be stranded with no
  // visible control to dismiss it. The listener is only attached while the menu
  // is open, and the handler is a single width comparison.
  useEffect(() => {
    if (!menuOpen) return;
    const handleResize = () => {
      if (window.innerWidth >= LG_BREAKPOINT) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <>
      <Navbar onMenuToggle={toggleMenu} menuOpen={menuOpen} />
      <MobileMenu isOpen={menuOpen} onClose={closeMenu} links={navLinks} />
      <main className="flex-1">{children}</main>
    </>
  );
}
