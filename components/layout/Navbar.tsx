"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/data/site";
import { useWindowScroll } from "@/hooks/useWindowScroll";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { cx } from "@/lib/cx";

/** O menu fica escuro quando está sobre uma seção clara (`.section-light`). */
function isOverLightSection(): boolean {
  const nav = document.getElementById("navbar");
  if (!nav) return false;
  const bottom = nav.getBoundingClientRect().bottom;
  const element = document.elementFromPoint(window.innerWidth / 2, bottom + 4);
  return Boolean(element?.closest(".section-light"));
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useWindowScroll(() => window.scrollY > 50, false);
  const overLight = useWindowScroll(isOverLightSection, false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="navbar" className={cx(scrolled && "nav-scrolled", overLight && "nav--dark")}>
        <a href="#" className="nav-logo">
          HAZE
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="nav-link">
              <a href={link.href}>
                <span className="roll-top">{link.label}</span>
                <span className="roll-bottom">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <MagneticLink href="#contato" className="nav-cta">
          Falar com a HAZE
        </MagneticLink>

        <button
          type="button"
          className="nav-hamburger"
          id="hamburger"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          aria-controls="mobileMenu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={cx("mobile-menu", menuOpen && "open")} id="mobileMenu">
        <button type="button" className="mobile-close" aria-label="Fechar menu" onClick={closeMenu}>
          ✕
        </button>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="mobile-link" onClick={closeMenu}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
