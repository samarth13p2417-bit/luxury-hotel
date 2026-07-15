"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDashboard = pathname.startsWith("/dashboards");

  const navLinks = [
    { name: "The Estate", href: "#hero" },
    { name: "Suites", href: "#suites" },
    { name: "Wellness", href: "#spa" },
    { name: "Dining", href: "#dining" },
    { name: "Experiences", href: "#experiences" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-background/80 backdrop-blur-md border-b border-white/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-serif text-2xl tracking-[0.25em] text-gold-champagne font-light">
            AURUM
          </span>
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 pt-1.5 hidden sm:inline-block">
            Resort & Spa
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        {!isDashboard && (
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.25em] text-foreground/75 hover:text-gold-champagne transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href={isDashboard ? "/" : "/dashboards"}
            className="group relative px-6 py-2.5 overflow-hidden rounded border border-gold-champagne/30 bg-white/5 backdrop-blur-sm text-xs uppercase tracking-[0.2em] text-gold-champagne transition-all duration-300 hover:border-gold-champagne hover:shadow-[0_0_15px_rgba(200,169,106,0.2)]"
          >
            <span className="flex items-center space-x-2">
              {isDashboard ? (
                <>
                  <span>Resort Journey</span>
                  <ArrowRight className="w-3 px-0.5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-champagne" />
                  <span>Mgmt Portal</span>
                </>
              )}
            </span>
          </Link>
          {!isDashboard && (
            <a
              href="#booking"
              className="px-6 py-2.5 rounded bg-gold-champagne text-[#0A0A0A] font-semibold text-xs uppercase tracking-[0.2em] hover:bg-gold-accent transition-all duration-300 shadow-[0_4px_20px_rgba(200,169,106,0.3)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)]"
            >
              Reserve
            </a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground/80 hover:text-gold-champagne transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[73px] z-40 bg-background/95 backdrop-blur-xl border-t border-white/5 md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-8 px-6 text-center">
          {!isDashboard &&
            navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-serif text-2xl tracking-[0.15em] text-foreground hover:text-gold-champagne transition-colors"
              >
                {link.name}
              </a>
            ))}
          <div className="w-full h-[1px] bg-white/10 max-w-[150px] my-4" />
          <Link
            href={isDashboard ? "/" : "/dashboards"}
            onClick={() => setIsOpen(false)}
            className="w-full max-w-[240px] py-3 text-center rounded border border-gold-champagne/40 bg-white/5 text-xs uppercase tracking-[0.2em] text-gold-champagne"
          >
            {isDashboard ? "Resort Journey" : "Management Portal"}
          </Link>
          {!isDashboard && (
            <a
              href="#booking"
              onClick={() => setIsOpen(false)}
              className="w-full max-w-[240px] py-3 text-center rounded bg-gold-champagne text-[#0A0A0A] font-semibold text-xs uppercase tracking-[0.2em]"
            >
              Reserve Suite
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
