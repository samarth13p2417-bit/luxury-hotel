"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Sparkles, Volume2, Moon } from "lucide-react";

export default function Spa() {
  const [bowlStrikes, setBowlStrikes] = useState<number[]>([]);
  const [playingFrequency, setPlayingFrequency] = useState(false);

  const playBowlSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      const fundamental = 528;
      const harmonics = [1.0, 1.51, 2.01, 2.52, 3.03];
      const gains = [0.35, 0.2, 0.12, 0.08, 0.04];
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.1);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.8);
      masterGain.connect(ctx.destination);
      
      harmonics.forEach((ratio, i) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        const detune = (Math.random() - 0.5) * 6;
        osc.frequency.setValueAtTime(fundamental * ratio, ctx.currentTime);
        osc.detune.setValueAtTime(detune, ctx.currentTime);
        
        // Pulse vibration LFO
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(4.5 + Math.random() * 1.5, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.8, ctx.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        
        gainNode.gain.setValueAtTime(gains[i], ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5 - i * 0.4);
        
        osc.connect(gainNode);
        gainNode.connect(masterGain);
        
        osc.start();
        lfo.start();
        
        osc.stop(ctx.currentTime + 5.0);
        lfo.stop(ctx.currentTime + 5.0);
      });
    } catch (e) {
      console.warn("Web Audio API not allowed or blocked by policy: ", e);
    }
  };

  const triggerBowl = () => {
    setBowlStrikes((prev) => [...prev, Date.now()]);
    setPlayingFrequency(true);
    playBowlSound();
  };

  useEffect(() => {
    if (playingFrequency) {
      const timer = setTimeout(() => setPlayingFrequency(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [playingFrequency]);

  // Clean up ripples after animations complete
  const removeRipple = (id: number) => {
    setBowlStrikes((prev) => prev.filter((r) => r !== id));
  };

  return (
    <section id="spa" className="cinematic-section bg-[#0A0A0A] py-24">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/spa.jpg"
          alt="Aurum Thermal Spa"
          fill
          className="object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        
        {/* Steam overlay effect (Subtle dynamic blur layers fading) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.01] blur-md pointer-events-none" />
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
            T H E  S A N C T U A R Y
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-wide text-white leading-tight">
            Thermal Spa <br />
            <span className="text-gold-gradient font-normal italic">Vibrational Healing</span>
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed font-light">
            Indulge in volcanic thermal baths, mineral-rich steam caves, and sound chambers designed for cellular alignment. Our treatments fuse ancient Tibetan singing bowl therapies with cutting-edge cryo-rejuvenation.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel border border-white/5 rounded-lg p-3">
              <span className="text-[9px] uppercase tracking-wider text-gold-champagne font-semibold block mb-1">
                Thermal Pools
              </span>
              <p className="text-[10px] text-white/55 font-light">
                Five pools ranging from 12°C plunge pools to 39°C geothermal chambers.
              </p>
            </div>
            <div className="glass-panel border border-white/5 rounded-lg p-3">
              <span className="text-[9px] uppercase tracking-wider text-gold-champagne font-semibold block mb-1">
                Salt Inhalation
              </span>
              <p className="text-[10px] text-white/55 font-light">
                Chamber lined with pink Himalayan salt blocks, nebulized with rose essences.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Singing Bowl Sound Bath Interface (Right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="glass-gold-panel rounded-xl p-8 border border-gold-champagne/10 max-w-md ml-auto relative overflow-hidden flex flex-col justify-between min-h-[360px]"
        >
          {/* Concentric ripples */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {bowlStrikes.map((rippleId) => (
              <motion.div
                key={rippleId}
                initial={{ width: 40, height: 40, opacity: 0.8 }}
                animate={{ width: 400, height: 400, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3.5, ease: "easeOut" }}
                onAnimationComplete={() => removeRipple(rippleId)}
                className="absolute rounded-full border border-gold-champagne/40"
              />
            ))}
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 block mb-2 border-b border-white/5 pb-2">
              Bespoke Sound Healing
            </span>
            <h3 className="font-serif text-lg text-white font-medium mb-4 flex items-center">
              <Moon className="w-4 h-4 mr-2 text-gold-champagne" />
              Tibetan Singing Bowl
            </h3>
            <p className="text-[11px] text-white/60 leading-relaxed font-light">
              Tuned to 528Hz—the Solfeggio harmonic of transformation and repair. Click the bowl to trigger a resonant sound strike. Sit back and follow the visual ripples.
            </p>
          </div>

          {/* Interactive Bowl Click Trigger */}
          <div className="my-8 flex justify-center items-center relative">
            {/* Visual bronze bowl representation */}
            <button
              onClick={triggerBowl}
              className="relative w-28 h-28 rounded-full bg-gradient-to-b from-[#8A6F3E] via-[#C8A96A] to-[#8A6F3E] shadow-[0_8px_30px_rgba(200,169,106,0.3)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.4)] hover:scale-102 flex items-center justify-center group transition-all cursor-pointer border border-white/20 z-10"
              aria-label="Strike Bowl"
            >
              <div className="absolute inset-2 rounded-full border border-black/10 bg-gradient-to-t from-black/20 to-transparent" />
              <Play className="w-8 h-8 text-[#0A0A0A] fill-current group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] tracking-wide text-white/40">
            <span className="uppercase">Frequency Channel</span>
            <span className="font-mono text-gold-champagne flex items-center">
              {playingFrequency ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 mr-1.5 animate-pulse text-gold-champagne" />
                  528Hz ACTIVE RIPPLE
                </>
              ) : (
                "READY TO STRIKE"
              )}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
