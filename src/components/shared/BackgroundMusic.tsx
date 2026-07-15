"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function BackgroundMusic() {
  const [muted, setMuted] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let mainGain: GainNode | null = null;
    let melodyInterval: any = null;
    let active = true;

    const playFluteNote = (freq: number, duration: number) => {
      if (!audioCtx || muted || !active) return;
      
      try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        // Flute core wave
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        // Breath/air texture (subtle bandpassed white noise)
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.setValueAtTime(freq * 1.5, now);
        noiseFilter.Q.setValueAtTime(8, now);
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.006, now); // soft breath glow

        // Pitch vibrato
        const vibrato = audioCtx.createOscillator();
        const vibratoGain = audioCtx.createGain();
        vibrato.frequency.setValueAtTime(5.3, now); // vibrato rate
        vibratoGain.gain.setValueAtTime(freq * 0.005, now); // detune depth

        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);

        // Flute breathing amplitude envelope (slow swell, slow fade)
        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.linearRampToValueAtTime(0.18, now + 1.2); // attack
        gainNode.gain.setValueAtTime(0.18, now + duration - 1.8);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // release

        // Connections
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(gainNode);

        osc.connect(gainNode);
        gainNode.connect(mainGain!);

        noise.start(now);
        osc.start(now);
        vibrato.start(now);

        noise.stop(now + duration + 0.1);
        osc.stop(now + duration + 0.1);
        vibrato.stop(now + duration + 0.1);
      } catch (e) {
        console.warn("Error synthesizing note:", e);
      }
    };

    const notes = [440.00, 523.25, 587.33, 659.25, 783.99, 880.00]; // A4, C5, D5, E5, G5, A5 (Pentatonic Flute scale)
    const triggerMelody = () => {
      if (!audioCtx || muted || !active) return;
      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      const duration = 4.2;
      playFluteNote(randomNote, duration);
    };

    const initAudio = async () => {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AudioContextClass();
        mainGain = audioCtx.createGain();
        mainGain.gain.setValueAtTime(0.08, audioCtx.currentTime); // Soft ambient volume
        mainGain.connect(audioCtx.destination);
        
        triggerMelody();
        melodyInterval = setInterval(triggerMelody, 5000);
        
        if (!muted && audioCtx.state === "suspended") {
          setBlocked(true);
        }
      } catch (e) {
        console.warn("Web Audio context not supported:", e);
      }
    };

    if (!muted) {
      initAudio();
    }

    return () => {
      active = false;
      if (melodyInterval) clearInterval(melodyInterval);
      if (audioCtx) {
        try {
          audioCtx.close();
        } catch (e) {}
      }
    };
  }, [muted]);

  // Attempt automatic activation on any scroll or click
  useEffect(() => {
    const unlockAudio = () => {
      setMuted(false);
      setBlocked(false);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("scroll", unlockAudio);
    };
    
    window.addEventListener("click", unlockAudio);
    window.addEventListener("scroll", unlockAudio);
    
    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("scroll", unlockAudio);
    };
  }, []);

  return (
    <div className="fixed top-24 right-6 z-40">
      <button
        onClick={() => {
          setMuted(!muted);
          setBlocked(false);
        }}
        className={`flex items-center space-x-2 px-3 py-2 rounded-full border text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md shadow-lg transition-all duration-300 cursor-pointer ${
          !muted
            ? "bg-gold-champagne/10 border-gold-champagne text-gold-champagne hover:bg-gold-champagne/20"
            : "bg-black/60 border-white/10 text-white/50 hover:text-white"
        }`}
        aria-label="Toggle Flute Music"
      >
        {!muted ? (
          <>
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            <span>Flute Ambient: On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-white/40" />
            <span>Flute Ambient: Off</span>
          </>
        )}
      </button>
    </div>
  );
}
