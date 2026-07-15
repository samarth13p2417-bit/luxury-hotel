"use client";

import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Search } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image with Zoom and Parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Aurum 7-Star Resort Hero"
          fill
          priority
          className="object-cover brightness-[0.45] scale-105 select-none pointer-events-none"
        />
        {/* Soft Golden and Emerald Glow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30" />
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-gold-champagne/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-emerald-deep/10 blur-[150px] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center mt-20 flex-1 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-gold-champagne font-light block">
            A N  U N R I V A L E D  P A R A D I S E
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide text-white leading-[1.1] font-light">
            The Art of <br />
            <span className="text-gold-gradient font-normal italic">Refined Escapism</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-[#F8F7F2]/75 font-light tracking-wide leading-relaxed">
            Welcome to Aurum. A sanctuary where nature's raw majesty converges with elite architecture, crafted exclusively for the world's most discerning travelers.
          </p>
        </motion.div>

        {/* Floating Arrow Scroll Trigger Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-36 flex flex-col items-center space-y-2 pointer-events-none"
        >
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/40">
            Scroll to begin journey
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-gold-champagne/60 to-transparent animate-bounce" />
        </motion.div>
      </div>

      {/* Booking Widget (Overlapping Hero and next section) */}
      <div id="booking-widget" className="relative z-20 w-full max-w-5xl mx-auto px-6 -mb-16 md:-mb-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, type: "spring" }}
          className="glass-gold-panel rounded-xl p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
        >
          {/* Destination / Suite Tier Selection */}
          <div className="flex flex-col space-y-1.5 border-b md:border-b-0 md:border-r border-gold-champagne/10 pb-3 md:pb-0 md:pr-4">
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold-champagne font-medium flex items-center">
              <MapPin className="w-3 h-3 mr-1.5 text-gold-champagne" />
              Suite Sanctuary
            </span>
            <select className="bg-transparent text-xs text-white focus:outline-none cursor-pointer uppercase tracking-wider font-light">
              <option value="royal">Royal Ocean Sanctuary</option>
              <option value="imperial">Imperial Villa Reef</option>
              <option value="penthouse">Golden Crest Penthouse</option>
              <option value="overwater">Aurum Overwater Bungalow</option>
            </select>
          </div>

          {/* Check-in Date */}
          <div className="flex flex-col space-y-1.5 border-b md:border-b-0 md:border-r border-gold-champagne/10 pb-3 md:pb-0 md:px-4">
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold-champagne font-medium flex items-center">
              <Calendar className="w-3 h-3 mr-1.5 text-gold-champagne" />
              Arrival Date
            </span>
            <input
              type="date"
              defaultValue="2026-07-20"
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-light"
            />
          </div>

          {/* Check-out Date */}
          <div className="flex flex-col space-y-1.5 border-b md:border-b-0 md:border-r border-gold-champagne/10 pb-3 md:pb-0 md:px-4">
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold-champagne font-medium flex items-center">
              <Calendar className="w-3 h-3 mr-1.5 text-gold-champagne" />
              Departure Date
            </span>
            <input
              type="date"
              defaultValue="2026-07-27"
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-light"
            />
          </div>

          {/* Guest Count & Search */}
          <div className="flex items-center justify-between md:pl-4">
            <div className="flex flex-col space-y-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-gold-champagne font-medium flex items-center">
                <Users className="w-3 h-3 mr-1.5 text-gold-champagne" />
                Guests
              </span>
              <select className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-light">
                <option value="1">01 Guest</option>
                <option value="2">02 Guests</option>
                <option value="4">04 Guests</option>
                <option value="6">06+ Guests</option>
              </select>
            </div>

            <button className="h-12 w-12 rounded bg-gold-champagne text-[#0A0A0A] hover:bg-gold-accent hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center cursor-pointer">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
