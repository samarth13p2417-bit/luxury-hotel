"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sun, Moon, Sparkles } from "lucide-react";

type LightingMode = "dawn" | "twilight" | "midnight";

export default function HotelExterior() {
  const [lightMode, setLightMode] = useState<LightingMode>("twilight");

  const themes = {
    dawn: {
      filter: "brightness(0.7) hue-rotate(15deg) saturate(1.1)",
      description: "Sunrise Mist: Golden rays warming the low-iron crystal glass facade.",
      title: "Sunrise Mist",
      icon: <Sun className="w-4 h-4 text-amber-300" />,
    },
    twilight: {
      filter: "brightness(0.55) hue-rotate(0deg) saturate(1.2)",
      description: "Twilight Glow: The signature amber illumination blending with the cobalt sky.",
      title: "Twilight Glow",
      icon: <Sparkles className="w-4 h-4 text-gold-champagne" />,
    },
    midnight: {
      filter: "brightness(0.35) hue-rotate(-20deg) saturate(0.85) contrast(1.1)",
      description: "Midnight Stars: Façade dimmed to mirror the cosmos; deep emerald underwater pool beacons active.",
      title: "Midnight Stars",
      icon: <Moon className="w-4 h-4 text-blue-300" />,
    },
  };

  return (
    <section id="exterior" className="cinematic-section bg-[#0A0A0A] py-24">
      {/* Background with custom interactive CSS filter */}
      <div className="absolute inset-0 z-0 transition-all duration-[1500ms] ease-in-out">
        <Image
          src="/images/exterior.jpg"
          alt="Aurum Architectural Exterior"
          fill
          className="object-cover transition-all duration-[1500ms] ease-in-out"
          style={{ filter: themes[lightMode].filter }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      </div>

      {/* Content overlays */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
        
        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-5 space-y-6 lg:pr-6"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-champagne font-medium">
            A R C H I T E C T U R A L  M A R V E L
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-wide text-white leading-tight">
            A Symphony of <br />
            <span className="text-gold-gradient font-normal italic">Curves & Light</span>
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed font-light">
            Designed in collaboration with world-renowned architectural firms, the Aurum Pavilion challenges gravity. Overlapping cantilevers, self-cleaning thermal smart glass, and water walls that cascade over three structural tiers.
          </p>

          {/* Time of Day Control Panel */}
          <div className="glass-panel rounded-xl p-4 border border-white/5 space-y-4">
            <span className="text-[9px] uppercase tracking-[0.20em] text-gold-champagne font-semibold block">
              Facade Lighting Director
            </span>
            <div className="flex items-center space-x-2">
              {(["dawn", "twilight", "midnight"] as LightingMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLightMode(mode)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    lightMode === mode
                      ? "bg-gold-champagne text-[#0A0A0A] font-semibold"
                      : "bg-white/5 hover:bg-white/10 text-white/70"
                  }`}
                >
                  {themes[mode].icon}
                  <span>{mode}</span>
                </button>
              ))}
            </div>

            {/* Mode Description */}
            <div className="min-h-[40px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lightMode}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-[10px] text-white/50 leading-relaxed"
                >
                  {themes[lightMode].description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Architectural details panel (Right column) */}
        <div className="lg:col-span-7 flex justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-full lg:max-w-md glass-gold-panel rounded-xl p-6 border border-gold-champagne/10 space-y-6"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 block">
              Structural Dossier
            </span>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-white/70 font-light">Structure Height</span>
                <span className="font-serif text-sm text-gold-champagne">114 Meters</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-white/70 font-light">Curvature Facade</span>
                <span className="font-serif text-sm text-gold-champagne">18,500 Panels</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-white/70 font-light">Floating Terraces</span>
                <span className="font-serif text-sm text-gold-champagne">5 Private Sky Pools</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-xs text-white/70 font-light">Architectural Style</span>
                <span className="font-serif text-sm text-gold-champagne">Parametric Organic</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
