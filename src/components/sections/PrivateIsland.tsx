"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Info, HelpCircle } from "lucide-react";

export default function PrivateIsland() {
  const estateStats = [
    { label: "Total Area", value: "4.5 Hectares" },
    { label: "Private Coastline", value: "1.2 Kilometers" },
    { label: "Sanctuary Estates", value: "12 Residences" },
    { label: "Arrival Options", value: "Helipad & Yacht Slip" },
  ];

  const hotspots = [
    { name: "Sovereign Heliport", x: "15%", y: "30%", desc: "Direct arrival for private air transport." },
    { name: "Royal Reef Estates", x: "45%", y: "48%", desc: "Luxury villas sitting directly on the turquoise reef." },
    { name: "Overwater Marina", x: "75%", y: "65%", desc: "85ft Yacht slips and private launch docks." },
  ];

  return (
    <section id="island" className="cinematic-section bg-[#0A0A0A] py-24">
      {/* Background image & gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/island.jpg"
          alt="Aurum Private Island Sanctuary"
          fill
          className="object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
        {/* Info text column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-champagne font-medium">
            T H E  P R I V A T E  K E Y
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-wide text-white leading-tight">
            An Entire Archipelago, <br />
            <span className="text-gold-gradient font-normal italic">Yours to Unravel</span>
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed font-light">
            Secluded in the heart of the Indian Ocean, Aurum Private Island is a geological masterpiece. A pristine sanctuary accessible only by floatplane or yacht, reserved for single charter bookings and elite residency members.
          </p>

          {/* Grid stats */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            {estateStats.map((stat, i) => (
              <div key={i} className="border-l-2 border-gold-champagne/40 pl-4 space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-white/50">{stat.label}</span>
                <p className="text-sm md:text-base font-serif text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Immersive Map / Hotspot visual column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-video lg:aspect-square w-full rounded-xl overflow-hidden border border-white/5 bg-[#080808]"
        >
          {/* Island image background for the tactical layout */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
            <Image
              src="/images/island.jpg"
              alt="Tactical Map Grid Background"
              fill
              className="object-cover"
            />
          </div>

          {/* Base map grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] opacity-60 z-10" />
          
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-20">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 absolute top-4 left-4">
              Tactical Estate Layout
            </span>

            {/* Render Hotspots */}
            {hotspots.map((spot, i) => (
              <div
                key={i}
                className="absolute group z-20"
                style={{ left: spot.x, top: spot.y }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Ping Ring */}
                  <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-gold-champagne/40 opacity-75"></span>
                  {/* Core Pin */}
                  <button className="relative w-4 h-4 rounded-full bg-gold-champagne border border-white/40 flex items-center justify-center cursor-pointer shadow-lg group-hover:bg-gold-accent transition-colors">
                    <Info className="w-2.5 h-2.5 text-[#0A0A0A]" />
                  </button>

                  {/* Tooltip Popup */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 rounded bg-black/90 border border-gold-champagne/30 p-2.5 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 z-30 shadow-2xl">
                    <h4 className="text-[10px] font-bold text-gold-champagne tracking-wider uppercase mb-1">
                      {spot.name}
                    </h4>
                    <p className="text-[9px] text-white/80 leading-normal font-light">
                      {spot.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Aesthetic coordinate readout */}
            <span className="text-[9px] font-mono text-gold-champagne/40 absolute bottom-4 right-4">
              LAT 4°11'S / LON 55°44'E
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
