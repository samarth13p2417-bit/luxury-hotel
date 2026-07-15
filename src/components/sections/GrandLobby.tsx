"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function GrandLobby() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<"piano" | "breeze">("piano");

  const soundscapes = {
    piano: "Acoustic Grand Piano - Solo recital performed live in the East Atrium.",
    breeze: "Ocean Breeze - Slow sea breezes moving through the open marble loggia.",
  };

  useEffect(() => {
    if (!isPlaying) return;

    let active = true;
    let audioCtx: AudioContext | null = null;
    let mainGainNode: GainNode | null = null;
    let intervalId: any = null;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtx = new AudioContextClass();
      mainGainNode = audioCtx.createGain();
      mainGainNode.gain.setValueAtTime(0.12, audioCtx.currentTime); // Low ambient level
      mainGainNode.connect(audioCtx.destination);

      if (activeTrack === "piano") {
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C4, D4, E4, G4, A4, C5
        
        const playPianoNote = () => {
          if (!active || !audioCtx) return;
          const osc = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          
          const freq = notes[Math.floor(Math.random() * notes.length)];
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
          
          // Soft attack, long decay piano simulation
          gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.2);
          
          osc.connect(gainNode);
          gainNode.connect(mainGainNode!);
          
          osc.start();
          osc.stop(audioCtx.currentTime + 2.5);
        };

        // Play notes chimes on loop
        playPianoNote();
        intervalId = setInterval(playPianoNote, 2800);
      } else if (activeTrack === "breeze") {
        // Generate Ocean Breeze pink/white noise
        const bufferSize = 2 * audioCtx.sampleRate;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(350, audioCtx.currentTime);

        const lfo = audioCtx.createOscillator();
        const lfoGain = audioCtx.createGain();
        lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime); // 8-second waves
        lfoGain.gain.setValueAtTime(200, audioCtx.currentTime); // Filter sweep

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        noise.connect(filter);
        filter.connect(mainGainNode);

        noise.start();
        lfo.start();

        return () => {
          active = false;
          try {
            noise.stop();
            lfo.stop();
            audioCtx?.close();
          } catch (e) {}
        };
      }
    } catch (e) {
      console.warn("Lobby audio synthesis not supported: ", e);
    }

    return () => {
      active = false;
      if (intervalId) clearInterval(intervalId);
      if (audioCtx) {
        try {
          audioCtx.close();
        } catch (e) {}
      }
    };
  }, [isPlaying, activeTrack]);

  return (
    <section id="lobby" className="cinematic-section bg-[#0A0A0A] py-24">
      {/* Background with sunset shine */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/lobby.jpg"
          alt="Aurum Grand Lobby"
          fill
          className="object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      </div>

      {/* Content overlays */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
        
        {/* Visual Showcase (Left) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 shadow-2xl bg-[#080808]"
        >
          {/* Scent Fragrance Decanter Background */}
          <div className="absolute inset-0 z-0 opacity-45">
            <Image
              src="/images/fragrance.jpg"
              alt="Aurum Sensory Signature fragrance decanter"
              fill
              className="object-cover"
            />
          </div>

          {/* Grid lines overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20">
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold-champagne font-semibold mb-2 block">
              Sensory Signature
            </span>
            <h3 className="font-serif text-xl text-white tracking-wide mb-1">
              Oud & White Vetiver
            </h3>
            <p className="text-[11px] text-white/50 leading-relaxed font-light">
              Our bespoke olfactory profile. Hand-harvested Cambodian agarwood, wild Haitian vetiver, and Tunisian orange blossom, misted gently through double-height marble colonnades.
            </p>
          </div>
        </motion.div>

        {/* Info Column (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-champagne font-medium">
            T H E  P O R T A L
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-wide text-white leading-tight">
            The Grand Lobby <br />
            <span className="text-gold-gradient font-normal italic">Atrium of Sovereigns</span>
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed font-light">
            Pass through the nine-meter solid bronze gates into an atrium of pure white Carrara marble. High vaults, floating glass pools overhead, and a bespoke Steinway Grand Piano framing the sunset reef panorama.
          </p>

          {/* Audio Console Panel */}
          <div className="glass-panel rounded-xl p-5 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.2em] text-gold-champagne font-semibold flex items-center">
                <Music className="w-3.5 h-3.5 mr-2 text-gold-champagne" />
                Lobby Soundscape
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2 rounded-full cursor-pointer transition-all ${
                  isPlaying
                    ? "bg-gold-champagne text-[#0A0A0A]"
                    : "bg-white/5 hover:bg-white/10 text-white/60"
                }`}
                aria-label={isPlaying ? "Mute audio" : "Play audio"}
              >
                {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTrack("piano")}
                className={`flex-1 py-2 text-[10px] uppercase tracking-wider rounded font-medium transition-colors ${
                  activeTrack === "piano"
                    ? "bg-white/10 text-white border border-gold-champagne/30"
                    : "bg-transparent text-white/50 border border-transparent hover:text-white"
                }`}
              >
                Atrium Steinway
              </button>
              <button
                onClick={() => setActiveTrack("breeze")}
                className={`flex-1 py-2 text-[10px] uppercase tracking-wider rounded font-medium transition-colors ${
                  activeTrack === "breeze"
                    ? "bg-white/10 text-white border border-gold-champagne/30"
                    : "bg-transparent text-white/50 border border-transparent hover:text-white"
                }`}
              >
                Seashore breeze
              </button>
            </div>

            <p className="text-[10px] text-white/40 leading-relaxed min-h-[30px]">
              {isPlaying ? soundscapes[activeTrack] : "Soundscape inactive. Select play to trigger ambient acoustics."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
