# WeHelp.vet

Responsive website implementation based on `design/wehelp-page.pdf`, `design/wehelp-page-desktop.png` and the supplied case-study references. Source copy and imagery are preserved; incomplete content is visibly labelled TODO. The Experience section includes its final desktop scroll scene. No backend, CMS, smooth-scroll library, deployment, commit or push is included.

## Setup

Install Node.js 24 LTS (see `.nvmrc`) and npm. Vite requires Node 20.19+ or 22.12+; this project standardizes on Node 24 to support the current lint toolchain too.

```sh
nvm use
npm ci
npm run dev
```

Open the Local URL printed by Vite. Node was not on PATH in the initial workspace; the implementation was validated with a temporary Node 24 runtime, which does not install Node permanently on your machine.

```sh
npm run lint
npm run build
npm run check:assets
npm run preview
```

`build` checks TypeScript before generating `dist/`. `preview` serves the built site locally. `package-lock.json` records exact installed versions; use `npm ci` for repeatable installs. Google Fonts are the only intentionally remote presentation resources; system font fallbacks remain available offline.

## Structure

- `src/components`: header, footer, reusable hero media, legal placeholder dialog.
- `src/sections`: one component and CSS Module for each major content section.
- `src/data/content.ts`: typed service, case, process, team, FAQ and navigation content.
- `src/types/content.ts`: content interfaces and allowed surfaces.
- `src/hooks/useMotionScene.ts`: scoped GSAP/ScrollTrigger lifecycle for future desktop scenes.
- `src/styles`: tokens, base/reset, typography, shared layout and animation settings.
- `public/media`: supplied production assets, copied from the original root `media/` folder.
- `design`: untouched source PDF and PNG.
- `scripts/check-assets.mjs`: verifies referenced local media exists.

## Design system

The eight requested colors are centralized in `tokens.css`. Supporting text, borders, overlays and hover states derive from that palette. The registered error color is reserved for validation. Focus combines the specified blue field border with a dark outline for contrast. Supplied SVG brand colors are preserved inside the original artwork.

Spacing uses the 4/8/12/16/24/32/48/64/96/128/160px scale. The container caps at 1280px, with 64/32/20px desktop/tablet/mobile gutters. Section gaps become 72–96px on phones. Cards and media share radius tokens. STIX Two Text headings and Inter body/interface text load through the specified Google Fonts links. H1 scales from 46/52px to 68/74px; H2 and H3 have separate fluid sizes. Body and supporting copy use 16px and 20px.

## Behavior and accessibility

- Mobile navigation is an inline disclosure, with `aria-expanded`, Escape, outside-click and focus-leave closing. It does not lock scrolling or trap focus.
- FAQ buttons associate with labelled answer regions; the first answer starts open.
- Form fields have persistent labels, required-field and email checks, inline errors, first-error focus and a live status. A valid form explicitly states that nothing was sent. Entries stay in memory only; there are no submission requests or browser storage writes.
- Privacy and terms buttons open accessible native dialogs that clearly identify missing legal content.
- Images have explicit dimensions, decorative images have empty alternatives, and below-fold images lazy-load.
- The Experience section pins on desktop and moves a horizontal row of three complete case slides with a scrubbed GSAP timeline. The first slide changes its supporting copy before the row starts moving. Tablet, mobile and reduced-motion modes use a readable static sequence instead.
- Reduced motion prevents future video autoplay and desktop animation setup. Anchor scrolling becomes immediate.

## Asset conventions

Use lowercase kebab-case local names under `public/media`, such as `hero-poster.webp`, `hero-background.webm`, `case-image-04.webp`, and `team-04.webp`. Reference them as `/media/name.ext`; do not import large media into JavaScript or use base64/remote image URLs. Preserve aspect ratios and include real dimensions. Keep source media outside the bundle. Existing filenames were retained to make their source relationship clear.

## Missing materials / TODOs

1. A compressed hero background video is not supplied. `HeroMedia` supports a future local video plus required poster; add an accessible pause/play control before enabling looping video. The supplied hero image is used now.
2. The Experience section uses the approved email, Website and Infrastructure, and Educational Platform copy. The email case has separate introductory and Before/After scroll states.
3. The three approved process steps are included in the How We Work scroll scene.
4. Four collapsed FAQ answers are missing. Their questions remain functional and reveal labelled content placeholders.
5. Approved Privacy Policy and Terms & Conditions documents/URLs are missing.
6. Select a form provider, add server-side validation and abuse prevention, finalize legal consent, and verify real delivery before launch. Do not treat the current client-side validation as a delivery service.
7. Team names were not provided; the supplied role headings are used without invented names.

## Planned animation stages

1. Hero (implemented): animate `clip-path: inset(...)` and corner radius from full viewport to inset media while the section scrolls normally. The same media wrapper supports the current image and a future video. No width/height/top/left animation.
2. Cases (implemented): pin a `100svh` desktop stage with a fixed heading and footnote. Change the first case body, then translate three complete case slides horizontally with `scrub: 0.25`. On tablet, mobile and reduced motion, render the static case sequence.
3. Process (implemented): pin the `100svh` stage, reveal the three approved steps in sequence, transition the background from white to green, then assemble all three steps in the final view. Tablet, mobile and reduced-motion modes show the complete green static composition.
4. Pass stable scene setup functions to `useMotionScene`. Its `gsap.matchMedia` scope restricts enhancements to desktop with no reduced-motion preference and reverts owned animations/ScrollTriggers on breakpoint changes and unmount, including React Strict Mode cleanup. Never globally kill unrelated triggers.

The Experience and How We Work desktop scroll scenes are implemented.

## Verification performed

- Clean lint (zero warnings), TypeScript check and Vite production build.
- All 13 local asset references resolve; no broken images in the browser.
- Headless Chrome at 1440, 1024, 768 and 390px: document width equals viewport width; the last case card can be made completely visible.
- Mobile menu open/close, Escape and link navigation; FAQ expand/collapse; required fields, invalid email, first-error focus, valid form without any submission request; legal dialog opening/closing; reduced-motion static behavior.
- Desktop and mobile screenshots reviewed against the supplied concept. The in-app browser was unavailable, so local headless Chrome was used. Cross-browser Safari/Firefox and real-device testing remain recommended before launch.

TypeScript uses the newest compatible 6.0 series because the current `typescript-eslint` peer range does not yet accept TypeScript 7. No forced peer-dependency overrides are used.
