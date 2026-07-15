"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-12">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 pb-12 border-b border-white/5">
          {/* Logo & Slogan */}
          <div className="space-y-4 text-center md:text-left">
            <span className="font-serif text-3xl tracking-[0.25em] text-gold-champagne font-light">
              AURUM
            </span>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 block">
              Redefining 7-Star Hospitality
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-gold-champagne block font-semibold">
                Private Estate Location
              </span>
              <p className="text-[11px] text-white/50 leading-relaxed font-light flex items-center justify-center sm:justify-start">
                <MapPin className="w-3.5 h-3.5 mr-1.5 text-gold-champagne" />
                Resort Island Road 01, Seychelles
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-gold-champagne block font-semibold">
                Sovereign Helpline
              </span>
              <p className="text-[11px] text-white/50 leading-relaxed font-light flex items-center justify-center sm:justify-start">
                <Phone className="w-3.5 h-3.5 mr-1.5 text-gold-champagne" />
                +1 (800) AUR-ELITE
              </p>
            </div>
          </div>
        </div>

        {/* Navigation & Back to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0 text-center sm:text-left">
          {/* Menu links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center text-[10px] uppercase tracking-widest text-white/50">
            <a href="#hero" className="hover:text-gold-champagne transition-colors">The Estate</a>
            <a href="#suites" className="hover:text-gold-champagne transition-colors">Suites</a>
            <a href="#spa" className="hover:text-gold-champagne transition-colors">Wellness</a>
            <a href="#dining" className="hover:text-gold-champagne transition-colors">Dining</a>
            <Link href="/dashboards" className="hover:text-gold-champagne transition-colors">Mgmt Portal</Link>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[9px] uppercase tracking-widest text-gold-champagne hover:text-gold-accent transition-colors cursor-pointer"
          >
            <span>Back to Summit</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        {/* Copyright */}
        <div className="flex justify-between items-center text-[9px] font-mono text-white/20 tracking-wider pt-6">
          <span>AURUM RESORT GROUP © 2026.</span>
          <span>ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
}
