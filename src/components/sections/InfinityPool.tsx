"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Check, Award } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: string;
}

export default function InfinityPool() {
  const [trayItems, setTrayItems] = useState<string[]>(["champagne", "berries"]);

  const menu: MenuItem[] = [
    { id: "champagne", name: "Krug Clos d'Ambonnay Glass", desc: "Rare millésime champagne served chilled.", price: "$145" },
    { id: "caviar", name: "Beluga Caviar & Blinis", desc: "Served with gold flakes and creme fraiche.", price: "$180" },
    { id: "truffle", name: "Perigord Truffle Benedict", desc: "Organic eggs on brioche with hollandaise.", price: "$65" },
    { id: "berries", name: "Glacier-Misted Forest Berries", desc: "Wild blackberries and organic gold dust.", price: "$40" },
  ];

  const toggleItem = (id: string) => {
    if (trayItems.includes(id)) {
      setTrayItems(trayItems.filter((i) => i !== id));
    } else {
      setTrayItems([...trayItems, id]);
    }
  };

  return (
    <section id="pool" className="cinematic-section bg-[#0A0A0A] py-24">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pool.jpg"
          alt="Aurum Infinity Pool"
          fill
          className="object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
        {/* Info Column (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-5 space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-champagne font-medium">
            L I M I T L E S S  V I E W S
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-wide text-white leading-tight">
            The Infinity Pool <br />
            <span className="text-gold-gradient font-normal italic">Edge of Eternity</span>
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed font-light">
            Suspended forty-five meters above the turquoise lagoon, our 80-meter heated infinity pool is a marvel of architectural physics. The water blends seamlessly with the horizon line, creating the illusion of swimming directly into the clouds.
          </p>

          <div className="flex items-center space-x-3 text-gold-champagne text-[11px] font-semibold tracking-wider uppercase border border-gold-champagne/20 bg-gold-champagne/5 px-4 py-2.5 rounded-lg w-max">
            <Award className="w-4 h-4 text-gold-champagne" />
            <span>Voted World's Most Cinematic Pool</span>
          </div>
        </motion.div>

        {/* Floating Breakfast Interactive (Right) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="lg:col-span-7 glass-gold-panel rounded-xl p-6 border border-gold-champagne/10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Menu Selector */}
          <div className="space-y-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 block border-b border-white/5 pb-2">
              Floating Breakfast Customizer
            </span>
            <div className="space-y-3">
              {menu.map((item) => {
                const selected = trayItems.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-300 flex items-start space-x-3 cursor-pointer ${
                      selected
                        ? "bg-gold-champagne/5 border-gold-champagne/40"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center transition-all ${
                        selected
                          ? "bg-gold-champagne border-gold-champagne text-[#0A0A0A]"
                          : "border-white/20 text-transparent"
                      }`}
                    >
                      <Check className="w-2.5 h-2.5 stroke-[3px]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-white">{item.name}</span>
                        <span className="text-[10px] text-gold-champagne">{item.price}</span>
                      </div>
                      <p className="text-[9px] text-white/40 leading-normal mt-0.5 font-light">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tray Visualizer */}
          <div className="flex flex-col justify-between bg-black/40 rounded-xl p-4 border border-white/5 text-center relative overflow-hidden">
            <span className="text-[9px] uppercase tracking-[0.25em] text-gold-champagne block">
              Bespoke Mahogany Tray
            </span>

            {/* Visual Tray items list */}
            <div className="my-6 space-y-2 flex-1 flex flex-col justify-center items-center">
              {trayItems.length === 0 ? (
                <span className="text-[10px] text-white/25 italic">Select items to place on your floating tray...</span>
              ) : (
                <AnimatePresence>
                  {trayItems.map((itemId) => {
                    const matched = menu.find((m) => m.id === itemId);
                    if (!matched) return null;
                    return (
                      <motion.div
                        key={itemId}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="glass-panel border border-gold-champagne/20 rounded px-3 py-1.5 text-[10px] tracking-wide text-white font-light w-4/5"
                      >
                        {matched.name}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Order summary button */}
            <button className="w-full py-2.5 bg-gold-champagne hover:bg-gold-accent text-[#0A0A0A] font-bold text-xs uppercase tracking-widest rounded transition-colors shadow-md cursor-pointer">
              Orchestrate Delivery
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
