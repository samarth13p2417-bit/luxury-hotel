"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight, X, Utensils } from "lucide-react";

interface MenuItem {
  name: string;
  desc: string;
  category: "culinary" | "wine";
  detail: string;
  image: string;
}

export default function Restaurant() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const signatureMenu: MenuItem[] = [
    {
      name: "Truffle-Glazed Blue Lobster",
      desc: "Brittany blue lobster tail, black Périgord truffle honey glaze, copper-pot butter emulsion.",
      category: "culinary",
      detail: "Paired with 2018 Montrachet Grand Cru",
      image: "/images/lobster.jpg",
    },
    {
      name: "A5 Miyazaki Wagyu Sirloin",
      desc: "Triple-seared over organic binchotan charcoal, fermented wild kelp glaze, sea urchin emulsion.",
      category: "culinary",
      detail: "Paired with 2015 Château Margaux",
      image: "/images/wagyu.jpg",
    },
    {
      name: "Imperial Saffron Pear Tart",
      desc: "Poached saffron pear, gold-leaf crusted vanilla bean pastry, orange flower ice crystal.",
      category: "culinary",
      detail: "Paired with 2009 Château d'Yquem",
      image: "/images/restaurant.jpg",
    },
    {
      name: "Romanée-Conti 'Grand Cru' 2017",
      desc: "One of the world's most sought-after vintages. Elegant structure, wild forest notes.",
      category: "wine",
      detail: "Private cellar selection - Limited availability",
      image: "/images/restaurant.jpg",
    },
  ];

  return (
    <section id="dining" className="cinematic-section bg-[#0A0A0A] py-24">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/restaurant.jpg"
          alt="Aurum Michelin Restaurant"
          fill
          className="object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
        {/* Info Column (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-champagne font-medium">
            G A S T R O N O M I C  P A V I L I O N
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-wide text-white leading-tight">
            L'Orangerie <br />
            <span className="text-gold-gradient font-normal italic">Sensory Gastronomy</span>
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed font-light">
            Led by multi-Michelin starred Executive Chef Marcus Vancour, L'Orangerie blends traditional culinary roots with avant-garde chemistry. Every dish is an artwork, sourced from our organic micro-gardens and private reef cages.
          </p>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center space-x-3 px-6 py-3 bg-white/5 border border-gold-champagne/30 text-gold-champagne hover:border-gold-champagne rounded hover:bg-gold-champagne hover:text-[#0A0A0A] transition-all duration-300 text-xs uppercase tracking-[0.2em] cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>Discover the Menu</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Cinematic Candle visual element / Card (Right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass-gold-panel rounded-xl p-8 border border-gold-champagne/10 max-w-md ml-auto"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 block mb-4 border-b border-white/5 pb-2">
            The Sommelier Table
          </span>
          <div className="space-y-4 font-light text-xs text-white/80 leading-relaxed">
            <p>
              "We believe wine is liquid history. Our underground cellar holds 14,000 rare vintages, spanning 120 years of viticulture history."
            </p>
            <p className="font-serif text-gold-champagne text-sm text-right italic font-normal">
              — Jean-Luc D'Avignon, Head Sommelier
            </p>
          </div>
        </motion.div>
      </div>

      {/* Menu Overlay Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[95vw] sm:w-[500px] z-50 glass-gold-panel shadow-2xl border-l border-gold-champagne/20 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gold-champagne/20 pb-4 mb-6">
                  <h3 className="font-serif text-xl tracking-[0.1em] text-gold-champagne uppercase">
                    L'Orangerie Menu
                  </h3>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1 rounded-full hover:bg-white/5 text-white/40 hover:text-gold-champagne transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar pr-2">
                  {signatureMenu.map((item, idx) => (
                    <div key={idx} className="border-b border-white/5 pb-4 flex space-x-4 items-start">
                      {item.image && (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/5 shadow-md">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
                            {item.name}
                          </h4>
                          <span className="text-[9px] px-2 py-0.5 rounded border border-gold-champagne/25 text-gold-champagne uppercase font-mono flex-shrink-0 ml-2">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/60 leading-normal font-light">
                          {item.desc}
                        </p>
                        <p className="text-[10px] text-gold-accent font-serif font-medium">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 text-center">
                <p className="text-[10px] text-white/40 tracking-wider uppercase mb-3">
                  Reservation required 48 hours in advance
                </p>
                <a
                  href="#booking"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full py-3 bg-gold-champagne hover:bg-gold-accent text-[#0A0A0A] font-bold text-xs uppercase tracking-widest rounded transition-colors shadow-lg"
                >
                  Book Table
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
