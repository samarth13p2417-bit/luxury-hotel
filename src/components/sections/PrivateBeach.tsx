"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Flame, Compass, Sun } from "lucide-react";

export default function PrivateBeach() {
  const [bonfireActive, setBonfireActive] = useState(false);

  // Generate embers when bonfire is active
  const embers = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 80 + 10}%`,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <section id="beach" className="cinematic-section bg-[#0A0A0A] py-24">
      {/* Background image with interactive filter */}
      <div className="absolute inset-0 z-0 transition-all duration-[1200ms]">
        <Image
          src="/images/beach.jpg"
          alt="Aurum Private Beach at Night"
          fill
          className="object-cover transition-all duration-[1200ms]"
          style={{
            filter: bonfireActive
              ? "brightness(0.55) sepia(0.2) saturate(1.2)"
              : "brightness(0.3) saturate(0.8)",
          }}
        />
        {/* Fire Glow Overlay */}
        <AnimatePresence>
          {bonfireActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-orange-500/30 via-amber-600/5 to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      </div>

      {/* Floating Ember Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {bonfireActive &&
          embers.map((ember) => (
            <motion.div
              key={ember.id}
              initial={{ y: "110%", opacity: 0, scale: 0.5 }}
              animate={{
                y: "-10%",
                opacity: [0, 0.8, 0.8, 0],
                x: ["0px", `${(Math.random() - 0.5) * 80}px`],
                scale: [0.5, 1, 0.7, 0.3],
              }}
              transition={{
                duration: ember.duration,
                repeat: Infinity,
                delay: ember.delay,
                ease: "easeOut",
              }}
              className="absolute bottom-0 w-2.5 h-2.5 rounded-full bg-gradient-to-t from-orange-400 to-yellow-300 blur-[1px]"
              style={{ left: ember.left }}
            />
          ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
        {/* Info Column (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-champagne font-medium">
            T H E  S H O R E L I N E
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-wide text-white leading-tight">
            Private Beach <br />
            <span className="text-gold-gradient font-normal italic">Starlit Oceanside</span>
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed font-light">
            Indulge in a secluded ivory beach lined with coconut palms. As night falls, our beach attendants ignite woodfires, casting warm shadows on the tide. Relax under the star-swept sky while listening to the slow, metronomic swell.
          </p>

          {/* Amenities grid */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="border-t border-white/10 pt-3">
              <span className="text-[9px] uppercase tracking-wider text-white/50 block">Cabanas</span>
              <span className="font-serif text-xs text-white">6 VIP Daybeds</span>
            </div>
            <div className="border-t border-white/10 pt-3">
              <span className="text-[9px] uppercase tracking-wider text-white/50 block">Marine Gear</span>
              <span className="font-serif text-xs text-white">Foil & Seabobs</span>
            </div>
            <div className="border-t border-white/10 pt-3">
              <span className="text-[9px] uppercase tracking-wider text-white/50 block">Tide Fire</span>
              <span className="font-serif text-xs text-white">Nightly Service</span>
            </div>
          </div>
        </motion.div>

        {/* Bonfire Interactive Panel (Right) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass-gold-panel rounded-xl p-6 border border-gold-champagne/10 max-w-sm ml-auto text-center space-y-6"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 block border-b border-white/5 pb-2">
            Bonfire Command Console
          </span>

          <div className="flex justify-center py-4">
            <button
              onClick={() => setBonfireActive(!bonfireActive)}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer shadow-lg ${
                bonfireActive
                  ? "bg-orange-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.5)] border border-orange-400"
                  : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/5"
              }`}
              aria-label={bonfireActive ? "Extinguish Bonfire" : "Light Bonfire"}
            >
              <Flame className={`w-8 h-8 ${bonfireActive ? "animate-pulse" : ""}`} />
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold flex items-center justify-center">
              <Compass className="w-3.5 h-3.5 mr-2 text-gold-champagne" />
              {bonfireActive ? "BONFIRE BURNING WARM" : "BONFIRE COLD / STANDBY"}
            </h4>
            <p className="text-[10px] text-white/50 leading-relaxed font-light px-4">
              {bonfireActive
                ? "Tide embers active. Beach steward is en-route with champagne service."
                : "Ignite the starlit beach fire to view the resort surroundings in warm illumination."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
