"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Bed, ToggleLeft } from "lucide-react";

interface Suite {
  name: string;
  size: string;
  price: string;
  views: string;
  features: string[];
  image: string;
}

export default function LuxuryRooms() {
  const [suiteIndex, setSuiteIndex] = useState(0);
  const [ambientLight, setAmbientLight] = useState(0.85); // 0 to 1
  const [fireplaceGlow, setFireplaceGlow] = useState(0.2); // 0 to 1

  const suites: Suite[] = [
    {
      name: "Imperial Ocean Sanctuary",
      size: "280 SQM",
      price: "$12,500 / night",
      views: "180° Unobstructed Indian Ocean",
      features: ["Private Heated Coral-view Pool", "Double-height Retractable Curtains", "24/7 Bespoke Butler Team"],
      image: "/images/room.jpg",
    },
    {
      name: "Golden Crest Penthouse",
      size: "450 SQM",
      price: "$22,000 / night",
      views: "Sky-high Panoramic Reef View",
      features: ["Private Helipad Access", "Private Observatory Lounge", "Glass-walled Wine Sanctuary"],
      image: "/images/room_penthouse.jpg",
    },
    {
      name: "Aurum Overwater Bungalow",
      size: "200 SQM",
      price: "$9,800 / night",
      views: "Direct Turquoise Reef & Sunset Lagoon",
      features: ["Water-slide into Lagoon", "Outdoor Hammered Copper Tub", "Glass-bottom lounge floors"],
      image: "/images/island.jpg",
    },
  ];

  const handleNext = () => {
    setSuiteIndex((prev) => (prev + 1) % suites.length);
  };

  const handlePrev = () => {
    setSuiteIndex((prev) => (prev - 1 + suites.length) % suites.length);
  };

  const currentSuite = suites[suiteIndex];

  const bgOverlayStyle = {
    background: `linear-gradient(rgba(10, 10, 10, ${1 - ambientLight}) 0%, rgba(200, 169, 106, ${fireplaceGlow * 0.25}) 100%)`,
  };

  return (
    <section id="suites" className="cinematic-section bg-[#0A0A0A] py-24">
      {/* Background Image with crossfade transition */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={suiteIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentSuite.image}
              alt={currentSuite.name}
              fill
              className="object-cover"
              style={{ filter: `brightness(${0.35 + ambientLight * 0.3})` }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Dynamic lighting overlay */}
        <div className="absolute inset-0 z-10 mix-blend-color-burn pointer-events-none" style={bgOverlayStyle} />
        <div className="absolute inset-0 z-15 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
        {/* Interactive Suite Details (Left) */}
        <div className="lg:col-span-6 space-y-8">
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-champagne font-medium block">
            P R I V A T E  R E S I D E N C E S
          </span>

          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={suiteIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-white leading-tight">
                  {currentSuite.name}
                </h2>
                <div className="flex items-center space-x-6 text-[11px] font-mono text-gold-champagne uppercase tracking-wider">
                  <span>Size: {currentSuite.size}</span>
                  <span>|</span>
                  <span>View: {currentSuite.views}</span>
                </div>
                <p className="text-xl text-gold-accent font-semibold">{currentSuite.price}</p>
                <ul className="space-y-2 pt-2">
                  {currentSuite.features.map((f, i) => (
                    <li key={i} className="text-xs text-white/70 font-light flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-champagne mr-3" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 pt-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded border border-white/10 hover:border-gold-champagne/40 bg-white/5 transition-colors cursor-pointer text-white/70 hover:text-white"
              aria-label="Previous Suite"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded border border-white/10 hover:border-gold-champagne/40 bg-white/5 transition-colors cursor-pointer text-white/70 hover:text-white"
              aria-label="Next Suite"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest pl-2">
              Residences 0{suiteIndex + 1} / 0{suites.length}
            </span>
          </div>
        </div>

        {/* Smart Room Lighting Simulation Panel (Right) */}
        <div className="lg:col-span-6 flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:max-w-md glass-gold-panel rounded-xl p-6 border border-gold-champagne/10 space-y-6"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 block border-b border-white/5 pb-2">
              Suite Custom Intelligence Controls
            </span>

            {/* Slider 1: Ambient Lighting */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/80 font-light flex items-center">
                  <Bed className="w-3.5 h-3.5 mr-2 text-gold-champagne" />
                  Ambient Cove Illumination
                </span>
                <span className="font-mono text-[10px] text-gold-champagne">{Math.round(ambientLight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={ambientLight}
                onChange={(e) => setAmbientLight(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 accent-gold-champagne rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Slider 2: Fireplace Intensity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/80 font-light flex items-center">
                  <ToggleLeft className="w-3.5 h-3.5 mr-2 text-gold-champagne" />
                  Fireplace Thermal Intensity
                </span>
                <span className="font-mono text-[10px] text-gold-champagne">{Math.round(fireplaceGlow * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={fireplaceGlow}
                onChange={(e) => setFireplaceGlow(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 accent-gold-champagne rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Micro details readouts */}
            <div className="pt-2 border-t border-white/5 space-y-3">
              <div className="flex justify-between items-center text-[10px] tracking-wide text-white/50">
                <span className="uppercase">Smart Climate Status</span>
                <span className="font-mono text-emerald-400">OPTIMAL (21.5°C)</span>
              </div>
              <div className="flex justify-between items-center text-[10px] tracking-wide text-white/50">
                <span className="uppercase">Air Filtration purity</span>
                <span className="font-mono text-emerald-400">99.98% HEPA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
