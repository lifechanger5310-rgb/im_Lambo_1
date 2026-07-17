"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsapSetup";
import type { CarProgress } from "./car3d/CarModel";

const CarScene = dynamic(() => import("./car3d/CarScene"), { ssr: false });

const PARTS = [
  {
    label: "Monocoque",
    spec: "Carbon-fiber tub · 1,340 kg dry",
    pos: "top-[8%] left-[6%] md:left-[10%]",
    line: "M0 0 L 40 30",
  },
  {
    label: "Hybrid Powertrain",
    spec: "4.5L twin-turbo V8 + 3 e-motors",
    pos: "top-[8%] right-[6%] md:right-[10%]",
    line: "M0 0 L -40 30",
  },
  {
    label: "Battery Pack",
    spec: "800V architecture · 2.9 kWh",
    pos: "bottom-[26%] left-[4%] md:left-[8%]",
    line: "M0 0 L 40 -30",
  },
  {
    label: "Active Aero",
    spec: "Rear wing · 3-stage, ±420 kg downforce",
    pos: "top-[8%] right-[26%] md:right-[32%]",
    line: "M0 0 L -20 30",
  },
  {
    label: "Carbon-Ceramic Brakes",
    spec: "410mm front rotors · 10-piston calipers",
    pos: "bottom-[26%] right-[4%] md:right-[8%]",
    line: "M0 0 L -40 -30",
  },
];

export default function ExplodedView() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carProgress = useRef<CarProgress>({ rotation: 0.6, explode: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".exploded-part", { opacity: 0 });
      const proxy = { explode: 0 };

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 10%",
          scrub: 0.5,
        },
      })
        .to(
          proxy,
          {
            explode: 1,
            ease: "power2.out",
            onUpdate: () => {
              carProgress.current.explode = proxy.explode;
            },
          },
          0
        )
        .to(
          ".exploded-part",
          {
            opacity: 1,
            stagger: 0.12,
            ease: "power2.out",
          },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="engineering"
      ref={sectionRef}
      className="relative min-h-screen bg-void py-28 md:py-36 px-6 md:px-10 overflow-hidden"
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-venom mb-2">
        03 / Exploded Engineering View
      </p>
      <h2 className="font-display text-3xl md:text-5xl uppercase text-off-white max-w-2xl mb-16">
        Every component earns its weight
      </h2>

      <div className="relative w-full max-w-5xl mx-auto min-h-[70vh]">
        <div className="exploded-car absolute inset-0">
          <CarScene progressRef={carProgress} className="w-full h-full" cameraPosition={[2.6, 1.3, 5.4]} fov={30} />
        </div>

        {PARTS.map((part) => (
          <div key={part.label} className={`exploded-part absolute ${part.pos} max-w-[220px]`}>
            <div className="border-l-2 border-venom pl-3">
              <div className="font-display text-sm md:text-base text-off-white uppercase tracking-wide">
                {part.label}
              </div>
              <div className="font-mono text-[10px] md:text-xs text-[#8a8a8e] mt-1">
                {part.spec}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
