"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsapSetup";
import CarSilhouette from "./CarSilhouette";

const SHOTS = [
  "Front 3/4, studio",
  "Rear diffuser detail",
  "Side profile, motion",
  "Cockpit, driver POV",
  "Wheel & brake detail",
  "Night, city backdrop",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-tile", {
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative bg-panel py-28 md:py-36 px-6 md:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-venom mb-2">
        06 / Gallery
      </p>
      <h2 className="font-display text-3xl md:text-5xl uppercase text-off-white max-w-2xl mb-16">
        Shot like a threat, not a product
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
        {SHOTS.map((shot, i) => (
          <div
            key={shot}
            className={`gallery-tile relative bg-void border border-white/10 overflow-hidden flex items-center justify-center ${
              i === 0 ? "col-span-2 md:col-span-2 aspect-[16/10]" : "aspect-square"
            }`}
          >
            <CarSilhouette
              className="w-[140%] opacity-30"
              strokeColor="#F5C400"
              fillOpacity={0.05}
            />
            <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-widest text-[#7a7a7e]">
              {shot}
            </span>
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-[#5a5a5e] mt-6 max-w-6xl mx-auto">
        Placeholder frames — swap in real photography/renders per tile.
      </p>
    </section>
  );
}
