"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsapSetup";

const TECH = [
  {
    title: "Predator Sense AI",
    body: "Reads 40 sensor channels at 1kHz and adjusts torque vectoring before you finish turning the wheel.",
  },
  {
    title: "800V Hybrid Core",
    body: "Three electric motors deliver instant torque fill while the V8 spools — zero turbo lag, ever.",
  },
  {
    title: "Active Aero Skin",
    body: "47 independently actuated aero surfaces reshape the body in real time based on speed and yaw.",
  },
  {
    title: "Stealth Mode",
    body: "Pure-electric silent running for 22 km — the hunt begins before anyone hears you coming.",
  },
];

export default function Technology() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-card", {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="technology" ref={sectionRef} className="relative bg-void py-28 md:py-36 px-6 md:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-venom mb-2">
        07 / Technology
      </p>
      <h2 className="font-display text-3xl md:text-5xl uppercase text-off-white max-w-2xl mb-16">
        Instinct, engineered
      </h2>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
        {TECH.map((t) => (
          <div
            key={t.title}
            className="tech-card bg-panel border border-white/10 p-6 md:p-8 hover:border-venom/60 transition-colors"
          >
            <div className="font-display text-xl md:text-2xl uppercase text-venom mb-3">
              {t.title}
            </div>
            <p className="font-body text-sm md:text-base text-[#a8a8ac] leading-relaxed">
              {t.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
