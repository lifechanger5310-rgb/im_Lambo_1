"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsapSetup";
import CarSilhouette from "./CarSilhouette";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative min-h-[80vh] bg-void flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <CarSilhouette className="w-[140%] max-w-none" fillOpacity={0.15} />
      </div>

      <div className="cta-content relative z-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-venom mb-4">
          08 / Reserve
        </p>
        <h2 className="font-display text-4xl md:text-6xl uppercase text-off-white leading-[0.9]">
          Only 120 will
          <br />
          <span className="text-venom">ever exist</span>
        </h2>
        <p className="font-body text-[#a8a8ac] mt-6 mb-10 text-base md:text-lg">
          Allocation opens by invitation. Register your interest and a
          product specialist will contact you within 48 hours.
        </p>
        <button className="font-mono text-sm uppercase tracking-widest bg-venom text-black px-8 py-4 hover:bg-off-white transition-colors">
          Request Allocation
        </button>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#5a5a5e] mt-8">
          Apex Predator · Starting at $2,400,000 · Delivery 2027
        </p>
      </div>
    </section>
  );
}
