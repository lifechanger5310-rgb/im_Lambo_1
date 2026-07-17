"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsapSetup";
import CarSilhouette from "./CarSilhouette";

const ANGLE_LABELS = ["FRONT 3/4", "SIDE PROFILE", "REAR 3/4", "REAR", "SIDE PROFILE", "FRONT"];

export default function Showcase360() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const [angleIndex, setAngleIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { rotation: 0 };

      gsap.to(proxy, {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 0.6,
          pin: true,
          onUpdate: (self) => {
            const idx = Math.min(
              ANGLE_LABELS.length - 1,
              Math.floor(self.progress * ANGLE_LABELS.length)
            );
            setAngleIndex(idx);
          },
        },
        onUpdate: () => {
          if (carRef.current) {
            carRef.current.style.transform = `rotateY(${proxy.rotation}deg) rotateX(6deg)`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative h-screen bg-void overflow-hidden flex items-center justify-center"
    >
      <div className="absolute top-24 left-6 md:left-10 z-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-venom mb-2">
          02 / 360° Showcase
        </p>
        <h2 className="font-display text-3xl md:text-5xl uppercase text-off-white">
          Every angle
          <br />
          is a threat
        </h2>
      </div>

      <div className="absolute top-24 right-6 md:right-10 z-10 text-right font-mono">
        <div className="text-[10px] uppercase tracking-widest text-[#7a7a7e]">
          Current view
        </div>
        <div className="text-venom text-sm md:text-base tracking-widest">
          {ANGLE_LABELS[angleIndex]}
        </div>
      </div>

      <div
        style={{ perspective: "1400px" }}
        className="w-full max-w-3xl px-10"
      >
        <div
          ref={carRef}
          style={{ transformStyle: "preserve-3d" }}
          className="will-change-transform"
        >
          <CarSilhouette className="w-full h-auto" showGrid fillOpacity={0.1} />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-[#7a7a7e]">
        Keep scrolling — rotation is scroll-locked
      </div>
    </section>
  );
}
