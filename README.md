# Apex Predator — Immersive Website

A premium, futuristic landing site for the fictional "Apex Predator" hybrid
hypercar. Built with Next.js (App Router) + TypeScript + Tailwind CSS v4 +
GSAP/ScrollTrigger for scroll-driven animation.

## Sections
1. **Hero** — cracked-open display type reveal, parallax background
2. **360° Showcase** — scroll-pinned rotating view (`Showcase360.tsx`)
3. **Exploded Engineering View** — parts separate from the chassis on scroll
4. **Performance** — animated telemetry-style counters
5. **Interior** — cockpit details
6. **Gallery** — shot grid
7. **Technology** — feature cards
8. **Final CTA** — reservation call to action

## Local development
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Build
```bash
npm run build
```

## Known placeholders — swap before launch
All car imagery is an abstract SVG blueprint silhouette
(`components/CarSilhouette.tsx`), not real photography/renders — there
was no source photography or render asset provided for the brief. Before
launch, replace:
- `CarSilhouette` usage across Hero, Showcase360, ExplodedView, Gallery,
  FinalCTA with real photography, 3D renders, or a real scroll-scrubbed
  frame sequence for the 360° section
- `Gallery.tsx` tile images
- `Interior.tsx` cockpit render placeholder
- Copy/specs are illustrative (invented for this fictional car) — replace
  with real figures if this becomes a real product brief

## Deploying to Vercel
1. Push this repo to GitHub (already done: `im_Lambo_1`)
2. In Vercel, "Add New Project" → import `lifechanger5310-rgb/im_Lambo_1`
3. Framework preset: Next.js (auto-detected) — no env vars required
4. Deploy
