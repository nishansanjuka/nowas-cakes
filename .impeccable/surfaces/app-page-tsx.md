---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/layout.tsx","components/landing"]
---

Scope: `/` landing page for Nowa's Cakes, plus the global shell (navbar, mobile menu, footer) it establishes for every other route. Visitor mode: Persuade.

Audience and job: someone planning a celebration, usually on a phone, usually deciding between a few bakers by looking at photographs. They must believe one person made this, and either add a cake to the cart or remember the name.

Proof and content: eight dummy products, twelve portfolio pieces, six reviews, a five layer cake assembly, all local JSON. No real testimonials, prices, awards or delivery claims exist; nothing may imply otherwise.

Constraints that bind: UI only, no backend. Light theme only. No em or en dashes in any copy. No scroll cues, no badges over images, no three equal card rows, no bounce easing, no scroll event listeners. Reduced motion drops the pin and shows the assembly settled.

## Direction contract

THESIS: the page is a workbench, not a brochure. One cake is built in front of the reader, a layer at a time, on a stage small enough to keep the room around it. The scroll does the building. It refuses the bakery category default of a photo hero over a three card row of Weddings, Birthdays, Custom, and it refuses the second default of a masonry wall with no argument in it.

OWN-WORLD: warm off-white ground (#FBF8F4) with a raised sand surface (#F5EFE8); warm charcoal ink (#2B2523) and a tinted soft ink (#6B5F58) that is never gray; one muted blush accent (#D6A9A0) for surfaces and rules, deepened to #9A5346 when it must carry text. Bodoni Moda as display, its optical size axis carrying headlines from 88px down to 20px without going spindly; Hanken Grotesk for body and controls. One radius system: 14px on image plates and panels, 8px on inputs and buttons, full only on small pills. No borders on content, no shadows except a single soft lifted one on the cart drawer and lightbox. Whitespace is the layout: asymmetric two and three track grids that never divide evenly.

STORY: the visitor lands on a plate holding one sponge and a line that names what Nowa makes. They scroll, and the cake is built on that plate while the headline gives way to the five steps doing the building. By the time it is whole they believe a person made it. Then they meet Nowa, see four cakes they can buy, twelve she has made, six people who ordered one, and a single invitation to start a custom order.

FIRST VIEWPORT: navbar transparent, one line, 72px tall, wordmark left, four links and a cart count right. Below it the viewport splits in two: a headline set in Bodoni at clamp(1.95rem, 5.6vw, 3.9rem), two lines maximum, on the left, with 16 words of subtext and the primary CTA "Browse the cakes" under it; the contained stage sits right, a square capped at 520px and never wider than 45vw, carrying a plate and the base sponge with room above it for the cake to grow into. On a phone the stage goes first and the words follow. Everything is fully visible with no scroll. Nothing else is in the frame.

FORM: pinned by the brief, not dealt. Sections 5 and 7 of the user's brief fix the palette family, the type register, the radius system, the landing structure and the motion grammar, so the concept roll had no open axis left to decide; no seed key exists for this surface and none was generated. The one axis the brief left open, the typeface pair, was decided here for a stated reason: Bodoni Moda carries a real optical size axis, so one family covers an 88px headline and a 20px caption without a second display face.

MOTION GRAMMAR: one orchestrated scroll instrument, not scattered reveals. Hero and assembly are one pinned section, and the text column cross fades through three states inside it. Every curve is a custom exponential ease out from `/lib/motion.ts`; springs are critically damped and never overshoot. Only transform and opacity animate. Scroll enters once through `useScroll` and is divided by `useAssemblyProgress`, so every layer reads an eased slice of one shared value and React state is never written per frame. Opacity is mapped through a function, never a keyframe range, so Motion cannot promote it to its own scroll timeline. Hover is opacity or a 1.01 scale, nothing more. The signature interaction is the build itself: the cake is only ever added to, never replaced, and it stays inside its stage at every scroll position.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
