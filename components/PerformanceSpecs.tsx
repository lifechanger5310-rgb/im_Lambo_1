"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsapSetup";

const SPECS = [
  { label: "Power", value: 1180, suffix: " HP", decimals: 0 },
  { label: "0–100 km/h", value: 1.9, suffix: " s", decimals: 1 },
  { label: "Top Speed", value: 412, suffix: " km/h", decimals: 0 },
  { label: "Torque", value: 1050, suffix: " Nm", decimals: 0 },
  { label: "Power-to-Weight", value: 0.88, suffix: " HP/kg", decimals: 2 },
  { label: "Downforce (max)", value: 420, suffix: " kg", decimals: 0 },
];

export default function PerformanceSpecs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray<HTMLElement>(".spec-counter");

      counters.forEach((el) => {
        const target = parseFloat(el.dataset.value || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = proxy.val.toFixed(decimals);
          },
        });
      });

      gsap.from(".spec-row", {
        opacity: 0,
        x: -20,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="performance"
      ref={sectionRef}
      className="relative bg-panel py-28 md:py-36 px-6 md:px-10"
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-venom mb-2">
        04 / Performance
      </p>
      <h2 className="font-display text-3xl md:text-5xl uppercase text-off-white max-w-2xl mb-16">
        Numbers that hunt back
      </h2>

      <div className="max-w-4xl mx-auto divide-y divide-white/10 border-t border-b border-white/10">
        {SPECS.map((s) => (
          <div
            key={s.label}
            className="spec-row flex items-baseline justify-between py-6 md:py-8"
          >
            <span className="font-body text-sm md:text-lg text-[#a8a8ac] uppercase tracking-wide">
              {s.label}
            </span>
            <span className="font-mono text-2xl md:text-4xl text-venom tabular-nums">
              <span
                className="spec-counter"
                data-value={s.value}
                data-decimals={s.decimals}
              >
                0
              </span>
              <span className="text-off-white">{s.suffix}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
