const LINKS = [
  { href: "#showcase", label: "360°" },
  { href: "#engineering", label: "Engineering" },
  { href: "#performance", label: "Performance" },
  { href: "#interior", label: "Interior" },
  { href: "#gallery", label: "Gallery" },
  { href: "#technology", label: "Technology" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-6 md:px-10 py-5 flex items-center justify-between backdrop-blur-sm bg-black/30">
      <a href="#top" className="font-display text-lg tracking-widest text-off-white">
        APEX<span className="text-venom">/</span>PREDATOR
      </a>
      <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-[#9a9a9d]">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-venom transition-colors">
            {l.label}
          </a>
        ))}
      </nav>
      <a
        href="#cta"
        className="font-mono text-xs uppercase tracking-widest border border-venom text-venom px-4 py-2 hover:bg-venom hover:text-black transition-colors"
      >
        Reserve
      </a>
    </header>
  );
}
