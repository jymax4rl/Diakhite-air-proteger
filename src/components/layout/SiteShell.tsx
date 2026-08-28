"use client";

import { useState, useCallback } from "react";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import { navLinks } from "./Navbar";

interface SiteShellProps {
  children: React.ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <Navbar onMenuOpen={openMenu} menuOpen={menuOpen} />
      <MobileMenu isOpen={menuOpen} onClose={closeMenu} links={navLinks} />
      <main className="flex-1">{children}</main>
    </>
  );
}
