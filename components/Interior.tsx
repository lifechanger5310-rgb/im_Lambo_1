"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsapSetup";

const DETAILS = [
  { label: "Seats", spec: "Carbon-shell, 6-point harness ready" },
  { label: "Driver Display", spec: "12.3\" curved OLED · G-force telemetry" },
  { label: "Materials", spec: "Alcantara, exposed carbon, milled aluminum" },
  { label: "Drive Modes", spec: "Stealth · Hunt · Apex · Track" },
];

export default function Interior() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".interior-panel", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".interior-detail", {
        opacity: 0,
        y: 16,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="interior" ref={sectionRef} className="relative bg-void py-28 md:py-36 px-6 md:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-venom mb-2">
        05 / Interior
      </p>
      <h2 className="font-display text-3xl md:text-5xl uppercase text-off-white max-w-2xl mb-16">
        The cockpit of an apex predator
      </h2>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
        <div className="interior-panel relative aspect-[4/3] bg-panel border border-white/10 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,196,0,0.10),transparent_60%)]" />
          <div className="relative font-mono text-[10px] uppercase tracking-widest text-[#6b6b6f] text-center px-6">
            [ Interior render placeholder — swap for real cockpit photography ]
            <div className="mt-3 text-venom text-xs">DRIVE MODE: APEX</div>
          </div>
        </div>

        <div className="space-y-8">
          {DETAILS.map((d) => (
            <div key={d.label} className="interior-detail border-l-2 border-venom pl-4">
              <div className="font-display text-lg md:text-xl uppercase text-off-white">
                {d.label}
              </div>
              <div className="font-body text-sm text-[#9a9a9d] mt-1">{d.spec}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
