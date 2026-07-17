"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsapSetup";
import type { CarProgress } from "./car3d/CarModel";

const CarScene = dynamic(() => import("./car3d/CarScene"), { ssr: false });

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const carProgress = useRef<CarProgress>({ rotation: 0.5, explode: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.set(".hero-crack-top", { yPercent: 0 })
        .set(".hero-crack-bottom", { yPercent: 0 })
        .from(".hero-eyebrow", { opacity: 0, y: -10, duration: 0.6 })
        .from(
          ".hero-crack-top",
          { yPercent: 100, opacity: 0, duration: 1.1 },
          "-=0.2"
        )
        .from(
          ".hero-crack-bottom",
          { yPercent: -100, opacity: 0, duration: 1.1 },
          "<"
        )
        .from(
          ".hero-car",
          { opacity: 0, scale: 0.9, duration: 1.2, ease: "power2.out" },
          "-=0.9"
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: 16, duration: 0.7 },
          "-=0.5"
        )
        .from(
          ".hero-stat",
          { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 },
          "-=0.4"
        );

      gsap.to(".hero-car", {
        x: 40,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-parallax-bg", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-void scanline"
    >
      <div className="hero-parallax-bg absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,196,0,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(245,196,0,0.06),transparent_50%)]" />
      </div>

      <div className="relative z-10 px-6 md:px-10 pt-24">
        <p className="hero-eyebrow font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-venom mb-6">
          001 / Hybrid Hypercar &nbsp;·&nbsp; 1,180 HP &nbsp;·&nbsp; Limited to 120 units
        </p>

        <h1 className="crack-heading font-display text-[16vw] md:text-[10vw] leading-[0.82] uppercase text-off-white">
          <span className="hero-crack-top block">APEX</span>
          <span className="hero-crack-bottom block text-venom">PREDATOR</span>
        </h1>

        <p className="hero-sub max-w-md mt-8 text-[#a8a8ac] text-base md:text-lg font-light">
          Nothing outruns what it can&apos;t see coming. The Apex Predator hunts in
          silence on electric power, then unleashes a 4.5L twin-turbo V8 the
          instant it needs to strike.
        </p>
      </div>

      <div className="hero-car relative z-10 mt-10 md:mt-16 px-4 h-[42vh] min-h-[280px]">
        <CarScene progressRef={carProgress} idleSpin className="w-full h-full" cameraPosition={[3.6, 1.1, 4.4]} fov={30} />
      </div>

      <div className="relative z-10 px-6 md:px-10 pb-10 grid grid-cols-3 md:flex md:gap-16 gap-4 border-t border-white/10 pt-6">
        {[
          { value: "0–100", unit: "1.9s" },
          { value: "TOP SPEED", unit: "412 km/h" },
          { value: "POWER", unit: "1,180 HP" },
        ].map((s) => (
          <div key={s.value} className="hero-stat">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#7a7a7e]">
              {s.value}
            </div>
            <div className="font-display text-xl md:text-2xl text-off-white">
              {s.unit}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 md:right-10 font-mono text-[10px] uppercase tracking-widest text-[#7a7a7e] hidden md:block">
        Scroll to hunt ↓
      </div>
    </section>
  );
}
