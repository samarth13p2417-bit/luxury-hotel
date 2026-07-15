"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Compass, Sparkles } from "lucide-react";

interface Privilege {
  name: string;
  desc: string;
  icon: React.ReactNode;
}

export default function Membership() {
  const privileges: Privilege[] = [
    {
      name: "Ivory Residence Access",
      desc: "Priority yacht transfer booking, private dining alcoves, and advanced suite customization controls.",
      icon: <ShieldCheck className="w-4 h-4 text-gold-champagne" />,
    },
    {
      name: "Gold Heliport Status",
      desc: "Unlimited helicopter landings, private wine cellar reservations, and round-trip floatplane concierge service.",
      icon: <Compass className="w-4 h-4 text-gold-champagne" />,
    },
    {
      name: "Sovereign Island Charter",
      desc: "Full island lockdown privileges, single-party estate charter rights, and global personal butler dispatch.",
      icon: <Sparkles className="w-4 h-4 text-gold-champagne" />,
    },
  ];

  return (
    <section id="membership" className="cinematic-section bg-[#0A0A0A] py-24">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/membership.jpg"
          alt="Aurum Sovereign Membership Card"
          fill
          className="object-cover brightness-[0.3]"
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
            T H E  R E S I D E N C Y  C L U B
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-wide text-white leading-tight">
            Aurum Membership <br />
            <span className="text-gold-gradient font-normal italic">Key to the Sanctuary</span>
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed font-light">
            Residency is more than access—it is a guarantee of utter isolation, safety, and personalized refinement. Our limited-member club ensures the estate remains exclusive to the world's leaders, creators, and visionaries.
          </p>

          {/* Privileges list */}
          <div className="space-y-4 pt-2">
            {privileges.map((p, idx) => (
              <div key={idx} className="flex items-start space-x-4 border-b border-white/5 pb-4 last:border-b-0">
                <div className="w-8 h-8 rounded-full bg-gold-champagne/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-gold-champagne/20">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white font-semibold">{p.name}</h4>
                  <p className="text-[11px] text-white/50 leading-relaxed font-light mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Visual Metallic VIP Card representation (Right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative aspect-[1.586/1] w-full max-w-md rounded-2xl border border-gold-champagne/30 bg-gradient-to-br from-[#0F3D3E]/10 via-[#0A0A0A] to-gold-champagne/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-8 flex flex-col justify-between overflow-hidden group ml-auto"
        >
          {/* Shimmer light bar across card */}
          <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] ease-in-out pointer-events-none" />

          {/* Card Top */}
          <div className="flex justify-between items-start">
            <span className="font-serif text-lg tracking-[0.25em] text-gold-champagne font-light">
              AURUM
            </span>
            <div className="w-10 h-7 rounded bg-gradient-to-tr from-amber-600 to-gold-champagne/80 border border-gold-champagne/40 opacity-70" />
          </div>

          {/* Card Middle */}
          <div className="space-y-1">
            <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 block">Residency Key</span>
            <p className="font-mono text-xs sm:text-sm text-white/80 tracking-widest">
              8840  9932  0102  7749
            </p>
          </div>

          {/* Card Bottom */}
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[7px] uppercase tracking-wider text-white/30 block">Charter Member</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-white font-light">
                H.R.H. Prince of Monaco
              </span>
            </div>
            <div className="text-right">
              <span className="text-[7px] uppercase tracking-wider text-white/30 block">Status Level</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-gold-champagne font-semibold font-serif italic">
                SOVEREIGN ELITE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
