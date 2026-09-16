# WeHelp.vet — Design v2

A new responsive homepage built with the existing React, TypeScript and Vite stack. Worktree: `wehelp.vet-design-v2`, branch: `design-v2`. The sibling `wehelp.vet` folder contains the original version on `main`.

## Sources

- Visual specification: `design/main-page-desktop.png` (1440px desktop).
- Content source of truth: `design/WeHelp-vet-wireframe-EN.html`.
- Supplied source assets: `media/`, preserved unchanged; browser assets are copied to `public/media/`.

The HTML and PNG differ in navigation labels, heading punctuation, contact details, and form fields/actions. The implementation uses HTML copy and fields, including the local message preview, and the requested scroll CTA “Let's discuss”. Extra contact/legal links and the surname field shown only in the PNG are not invented.

## Setup

Use Node.js 24 (see `.nvmrc`).

```sh
npm ci
npm run dev
```

For two versions running together, use a separate port:

```sh
npm run dev -- --port 5174
```

## Validation

```sh
npm run lint
npm run build
npm run check:assets
```

Lint, TypeScript/production build and all 12 local asset references passed. Automated Chrome checks covered 320, 390, 768, 1024, 1280 and 1440px widths with no horizontal overflow; font loading and the 88px/60px desktop heading sizes; sticky header and scroll CTA; project carousel; FAQ keyboard interactions; mobile navigation and Escape; required fields and invalid email; draft focus and editing; no form transmission; reduced motion; and no runtime errors. Desktop and mobile screenshots were inspected and spacing/line breaks refined against the PNG. Validation used a temporary Node.js 24 runtime; this does not install Node permanently.

## Structure

- `src/components`: header, footer and small shared layout/button/heading primitives.
- `src/sections`: separate page sections and interactive FAQ/contact/gallery behavior.
- `src/data/content.ts`: wireframe content, with services and displayed FAQ entries extracted from the HTML.
- `src/styles/tokens.css`: semantic colors, font roles, typography, spacing and layout tokens.
- `src/styles/page.css`: responsive grids, section layouts, controls and reduced-motion rules.

Google Fonts loads Abhaya Libre (logo only), STIX Two Text (headings), STIX Two Math (process numbers), and Inter (body/UI). The homepage uses semantic sections and labelled form fields, visible keyboard focus, a skip link, accessible accordion controls and no external UI libraries.

The contact form validates in the browser and prepares an in-memory draft for copying. It makes no submission requests and does not save personal data to browser storage. No backend or deployment is included.

## Motion

Motion reference: https://www.rhetorich.ai/. The header CTA enters from beyond the right edge over 500ms after scrolling, while navigation moves left by the measured button width plus its gap. Returning to the top reverses both movements. On phones, the Menu control shifts left while the CTA enters at the right edge. Content reveals once at 50% visibility with a 1000ms opacity transition and 100ms stagger between adjacent rows/cards. Headings rise 10px over 600ms; the hero illustration uses a slower 1300ms entrance. The scoped IntersectionObserver enhancement cleans up in React Strict Mode, reveals keyboard-focused content, and leaves all content visible when reduced motion is enabled or the observer is unavailable.
