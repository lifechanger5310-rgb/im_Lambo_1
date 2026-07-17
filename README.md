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

## 3D engine
Hero, the 360° Showcase, and the Exploded Engineering View now render a
real WebGL car (`components/car3d/CarModel.tsx` + `CarScene.tsx`, built
with `@react-three/fiber` + `@react-three/drei` + `three`), not a flat
SVG — reflective showroom floor, real lighting rig, and a single shared
model whose parts (monocoque, hybrid powertrain, battery pack, active
aero wing, carbon-ceramic brake/wheel assemblies) can rotate on scroll
(Showcase360) or separate on scroll (ExplodedView). All three car
components are dynamically imported with `ssr: false` since WebGL can't
render on the server.

The car itself is stylized low-poly geometry (boxes/cylinders/roundboxes),
not a licensed or scanned Lamborghini model — safe to ship, but a step up
from photoreal would mean importing a real `.glb` model (via
`useGLTF` from drei) in place of `CarModel`'s primitives.

## Known placeholders — swap before launch
- `Gallery.tsx` and `FinalCTA.tsx` still use the flat SVG
  (`components/CarSilhouette.tsx`) rather than the 3D scene — kept
  intentionally, since stacking many WebGL canvases on one page hurts
  scroll performance. Swap for real photography or a render if this
  becomes a real launch.
- `Interior.tsx` cockpit render placeholder
- Copy/specs are illustrative (invented for this fictional car) — replace
  with real figures if this becomes a real product brief

## Deploying to Vercel
1. Push this repo to GitHub (already done: `im_Lambo_1`)
2. In Vercel, "Add New Project" → import `lifechanger5310-rgb/im_Lambo_1`
3. Framework preset: Next.js (auto-detected) — no env vars required
4. Deploy
