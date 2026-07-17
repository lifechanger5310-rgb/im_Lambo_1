import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Showcase360 from "@/components/Showcase360";
import ExplodedView from "@/components/ExplodedView";
import PerformanceSpecs from "@/components/PerformanceSpecs";
import Interior from "@/components/Interior";
import Gallery from "@/components/Gallery";
import Technology from "@/components/Technology";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <div className="noise-overlay" />
      <Nav />
      <main>
        <Hero />
        <Showcase360 />
        <ExplodedView />
        <PerformanceSpecs />
        <Interior />
        <Gallery />
        <Technology />
        <FinalCTA />
      </main>
      <footer className="bg-void border-t border-white/10 py-8 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-sm tracking-widest text-off-white">
          APEX<span className="text-venom">/</span>PREDATOR
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#5a5a5e]">
          © 2026 Apex Predator Motors. All specifications subject to change.
        </span>
      </footer>
    </>
  );
}
