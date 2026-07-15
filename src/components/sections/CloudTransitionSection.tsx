"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CloudTransitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cloud1Ref = useRef<HTMLDivElement>(null);
  const cloud2Ref = useRef<HTMLDivElement>(null);
  const cloud3Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom-through timeline linked to scroll
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
        }
      })
      .to(titleRef.current, {
        opacity: 1,
        scale: 1.1,
        y: -30,
        duration: 1
      })
      .to(cloud1Ref.current, {
        scale: 4,
        opacity: 0,
        x: -400,
        duration: 2
      }, "-=0.5")
      .to(cloud2Ref.current, {
        scale: 4,
        opacity: 0,
        x: 400,
        duration: 2
      }, "-=2")
      .to(cloud3Ref.current, {
        scale: 5,
        opacity: 0,
        y: 200,
        duration: 2
      }, "-=1.8")
      .to(titleRef.current, {
        opacity: 0,
        y: -100,
        duration: 1
      }, "-=1");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[150vh] w-full bg-[#0A0A0A] overflow-hidden flex items-center justify-center"
    >
      {/* Background Soft Blue/Emerald Horizon Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0F3D3E]/10 to-[#0A0A0A] pointer-events-none" />

      {/* Cinematic Title emerging during descent */}
      <h2
        ref={titleRef}
        className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] uppercase text-gold-champagne text-center opacity-0 z-20 pointer-events-none px-6 font-light leading-relaxed"
      >
        Descending into <br />
        <span className="italic font-normal lowercase tracking-normal text-white">paradise</span>
      </h2>

      {/* Layered Volumetric Cloud Graphics (Using styled CSS gradients and blurs to simulate dense clouds) */}
      <div
        ref={cloud1Ref}
        className="absolute left-[-10%] top-[10%] w-[60vw] h-[40vh] rounded-full bg-white/5 blur-[80px] z-10 pointer-events-none"
      />
      <div
        ref={cloud2Ref}
        className="absolute right-[-10%] top-[30%] w-[70vw] h-[40vh] rounded-full bg-white/5 blur-[90px] z-10 pointer-events-none"
      />
      <div
        ref={cloud3Ref}
        className="absolute left-[20%] bottom-[-5%] w-[80vw] h-[50vh] rounded-full bg-gold-champagne/5 blur-[100px] z-10 pointer-events-none"
      />

      <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/80" />
    </div>
  );
}
