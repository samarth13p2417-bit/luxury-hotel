"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  rating: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "The level of privacy and custom orchestrations at Aurum is unmatched. The AI Concierge arranged my helicopter transfer and reef dive perfectly within minutes.",
      author: "H.R.H. Crown Prince of Monaco",
      title: "Royal Charter Member",
      rating: 5,
    },
    {
      quote: "A structural masterpiece. The cantilevers of the pavilion floating over the infinity pools are a marvel. Sleeping suspended above the ocean reef felt dreamlike.",
      author: "Dame Evelyn Carter",
      title: "Principal Architect, London Design Trust",
      rating: 5,
    },
    {
      quote: "The Sommelier collection at L'Orangerie was a true revelation. We paired a Romanée-Conti 1999 vintage with Chef Marcus's Wagyu. An unforgettable evening.",
      author: "Sir Harrison Sterling",
      title: "President, Global Vine Guild",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="relative w-full bg-[#0A0A0A] py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-champagne font-medium">
            L I F E S T Y L E  R E F I N E M E N T
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-white leading-tight">
            Guest Testimonials <br />
            <span className="text-gold-gradient font-normal italic">Whispers of Sovereign Luxury</span>
          </h2>
          <div className="w-12 h-[1px] bg-gold-champagne/40 mx-auto mt-6" />
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="glass-panel rounded-xl p-6 sm:p-8 border border-white/5 space-y-6 flex flex-col justify-between"
            >
              {/* Star Rating */}
              <div className="flex space-x-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold-accent fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs text-white/70 leading-relaxed font-light italic">
                "{t.quote}"
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/5 space-y-1">
                <span className="text-xs font-semibold text-white block uppercase tracking-wider">
                  {t.author}
                </span>
                <span className="text-[9px] text-gold-champagne uppercase tracking-widest block font-medium">
                  {t.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
