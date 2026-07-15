"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plane, Compass, Anchor, ChevronRight } from "lucide-react";

interface Experience {
  title: string;
  desc: string;
  duration: string;
  cost: string;
  icon: React.ReactNode;
  image: string;
}

export default function Experiences() {
  const experiences: Experience[] = [
    {
      title: "Helicopter Reef Excursion",
      desc: "Soar in our private Airbus H125 helicopter over the coral reef network. Concludes with a champagne picnic landing on an isolated sandbar.",
      duration: "2.5 Hours",
      cost: "$4,500 / charter",
      icon: <Plane className="w-4 h-4 text-gold-champagne" />,
      image: "/images/excursion_heli.jpg",
    },
    {
      title: "Deep Coral Sub-aquatic Dive",
      desc: "Private guided scuba expedition using personal sea-bobs. Explore volcanic drop-offs, rare sea turtles, and pristine neon-lit coral caves.",
      duration: "3 Hours",
      cost: "$1,800 / guest",
      icon: <Compass className="w-4 h-4 text-gold-champagne" />,
      image: "/images/excursion_dive.jpg",
    },
    {
      title: "85ft Yacht Sunset Cruise",
      desc: "Board the Golden Sovereign for a private sunset sail. Features live cello performances, caviar pairings, and ocean-facing loungers.",
      duration: "4 Hours",
      cost: "$6,200 / charter",
      icon: <Anchor className="w-4 h-4 text-gold-champagne" />,
      image: "/images/excursion_yacht.jpg",
    },
  ];

  return (
    <section id="experiences" className="relative w-full bg-[#0A0A0A] py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-champagne font-medium">
            C U R A T E D  E X C U R S I O N S
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-white leading-tight">
            Immersive Experiences <br />
            <span className="text-gold-gradient font-normal italic">Bespoke Adventures</span>
          </h2>
          <div className="w-12 h-[1px] bg-gold-champagne/40 mx-auto mt-6" />
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="glass-card rounded-xl p-5 flex flex-col justify-between min-h-[430px]"
            >
              <div className="space-y-4">
                {/* Visual Image Banner for the Experience */}
                <div className="relative h-44 w-full rounded-lg overflow-hidden border border-white/5 shadow-md group">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-gold-champagne/20">
                    {exp.icon}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-lg tracking-wide text-white font-semibold">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {exp.desc}
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-wider uppercase text-white/40">
                  <span>Duration: {exp.duration}</span>
                  <span className="text-gold-champagne">{exp.cost}</span>
                </div>
                <button className="w-full flex items-center justify-center space-x-2 py-2.5 rounded border border-gold-champagne/20 text-[10px] uppercase tracking-widest text-gold-champagne hover:bg-gold-champagne hover:text-[#0A0A0A] hover:border-gold-champagne transition-all duration-300 font-semibold cursor-pointer">
                  <span>Orchestrate Tour</span>
                  <ChevronRight className="w-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
