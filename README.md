# monis.rent — Workspace Builder

Design your Bali workspace piece by piece, watch the room assemble itself in a live illustrated preview, and rent the whole setup in one tap.

## Running it

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Approach

The brief asked for something visual and fun rather than a product catalog, so the centerpiece is a hand-drawn SVG room that reacts to every choice: the standing desk physically rises, monitors pop in one to three across, the monstera sways, coffee steams, and a day/dusk toggle dims the room and switches the lamps on. The rest of the UI stays out of the way — a warm Bali-inspired palette (sand, palm green, clay, gold), Fraunces for display type, and a receipt-style checkout with stay-length discounts, an animated total, and a small confetti moment when you commit. Accessories are genuinely optional (tap again to remove), desk and chair are always present, and everything is keyboard-accessible with `prefers-reduced-motion` respected throughout.

## Tech choices

- **Next.js 16 (App Router) + TypeScript** — the page shell renders on the server; only the builder itself is a client island.
- **Tailwind CSS v4** — design tokens (colors, fonts, keyframes) live in `@theme` inside `globals.css`, so there's no config file and no ad-hoc hex values in components.
- **Plain React state + inline SVG** — no state library, no animation library, no image assets. The scene is a single component driven by the same `Selection` object as the checkout, so preview and price can never disagree.
- Structure: `lib/catalog.ts` (typed catalog data), `components/scene.tsx` (illustration), `components/builder.tsx` (interaction), `components/glyphs.tsx` (icon set), `components/animated-price.tsx`.

## With more time

I'd add drag-to-rearrange inside the scene and a few more pieces per category (the sketch's surfboard deserves to exist), persist the configuration in the URL so setups are shareable, wire the rent button to a real checkout flow with dates and address, extract the scene's furniture into per-item components with proper unit tests, and run a real accessibility audit beyond the basics (focus order, contrast, screen-reader labels) that are in place now.
