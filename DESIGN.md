---
name: Nowa's Cakes
description: A warm off-white gallery for a single baker, where photographs lead and the interface recedes.
colors:
  cream: "#fbf8f4"
  sand: "#f3ece4"
  shell: "#ede3d9"
  ink: "#2b2523"
  ink-soft: "#6b5f58"
  ink-line: "#ded3c8"
  blush: "#d6a9a0"
  blush-soft: "#ecd5cf"
  blush-deep: "#9a5346"
typography:
  display:
    fontFamily: "Bodoni Moda, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.95rem, 5.6vw, 3.9rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bodoni Moda, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.2rem, 4.2vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bodoni Moda, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.55rem, 2.6vw, 2.05rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.015em"
  panel:
    fontFamily: "Bodoni Moda, Iowan Old Style, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.012em"
  quote:
    fontFamily: "Bodoni Moda, Iowan Old Style, Georgia, serif"
    fontSize: "1.3125rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  card:
    fontFamily: "Bodoni Moda, Iowan Old Style, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  lead:
    fontFamily: "Hanken Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Hanken Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  control:
    fontFamily: "Hanken Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  label:
    fontFamily: "Hanken Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.12em"
rounded:
  control: "8px"
  plate: "14px"
  pill: "999px"
spacing:
  gutter: "1.5rem"
  nav: "72px"
  section-sm: "5rem"
  section: "8.5rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
    padding: "0 1.75rem"
    height: "48px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "#3b3431"
    textColor: "{colors.cream}"
  button-secondary:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 1.75rem"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.blush-soft}"
    textColor: "{colors.ink}"
  chip-filter:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
  chip-filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
  input-field:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1rem"
  input-field-focus:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.ink}"
  plate-image:
    backgroundColor: "{colors.sand}"
    rounded: "{rounded.plate}"
---

# Design System: Nowa's Cakes

## Overview

**Creative North Star: "The North Light Kitchen"**

The system is a room with one window. Everything sits on a warm off-white ground the colour of unbleached paper, and the only things allowed to be loud are the photographs. There is no chrome competing with the food: no borders around content, no shadows under cards, no coloured panels calling for attention. What carries the design instead is the amount of air between things and the difference between a 62px Bodoni headline and a 13px tracked label.

The interface is built to recede. Type sits in two registers only, a high contrast Didone for anything that speaks and a quiet humanist grotesque for anything that explains. Images are always plates: a single soft radius, cropped, with their label underneath rather than over them. Colour is almost absent, held back so that one muted blush can mean something when it appears on a rating, a step label or a selected control.

The page's one piece of theatre is motion, and it is scroll driven rather than decorative: a cake that grows until it owns the viewport, then dissolves into the eight steps that made it. Nothing bounces, nothing overshoots, nothing moves that the reader did not move themselves.

**Key Characteristics:**
- Warm off-white ground, never white, never grey
- One muted blush accent, deepened when it must carry text
- High contrast serif display over a quiet grotesque body
- One radius system, borrowed by every plate, control and panel
- No borders on content and effectively no shadows
- Asymmetric, unequal grids; whitespace is the layout
- Light theme only, by lock

## Colors

A warm neutral field with a single desaturated rose running through it, tuned so that nothing on the page is pure black, pure white or neutral grey.

### Primary
- **Muted Blush** (#d6a9a0): the one accent. Used on surfaces and marks, never on large type. It appears on rating glyphs, the active step label in the baking sequence, and small emphasis. Its rarity is the point.
- **Deep Clay Rose** (#9a5346): the blush taken down until it passes AA on the cream ground (5.4:1). Every piece of accent coloured text uses this value, never the blush itself.

### Neutral
- **Unbleached Cream** (#fbf8f4): the page ground, and the text colour on dark controls.
- **Fine Sand** (#f3ece4): the raised surface. Quiet sections, input fields, image placeholders, summary panels.
- **Shell** (#ede3d9): the third step down, used for secondary buttons and hovered fields.
- **Warm Charcoal** (#2b2523): all primary text and the primary button ground. 14.3:1 on cream.
- **Tinted Soft Ink** (#6b5f58): every piece of secondary text. 5.9:1 on cream.
- **Line Sand** (#ded3c8): the only divider colour, used between cart lines and nowhere else.

### Named Rules

**The No Grey Rule.** Secondary text is tinted from the ground's own hue (#6b5f58), never a neutral grey. A grey on this cream reads as a rendering fault.

**The Accent Ceiling Rule.** The blush family touches at most a few percent of any screen. If two blush elements are visible at once, one of them is decoration and should be removed.

**The Deepen Before You Type Rule.** #d6a9a0 is a surface value. The moment the accent has to carry a glyph or a word, it becomes #9a5346.

## Typography

**Display Font:** Bodoni Moda (with Iowan Old Style, Georgia, serif)
**Body Font:** Hanken Grotesk (with Avenir Next, Segoe UI, sans-serif)

**Character:** A high contrast Didone doing all the speaking, set against a humanist grotesque that never raises its voice. Bodoni Moda carries a real optical size axis, so the same family holds an 88px headline and a 20px caption without the thins collapsing; that axis is the reason no second display face exists here.

### Hierarchy
- **Display** (400, clamp(1.95rem, 5.6vw, 3.9rem), 1.05, -0.025em): the landing headline and the closing invitation. One per page at most.
- **Headline** (400, clamp(2.2rem, 4.2vw, 3.4rem), 1.06, -0.02em): page titles and section openers.
- **Title** (400, clamp(1.55rem, 2.6vw, 2.05rem), 1.14, -0.015em): subsection headings.
- **Panel** (400, 1.5rem, 1.2, -0.012em): the serif number or name at the head of a panel. Drawer title, lightbox title, every subtotal and total.
- **Quote** (400, 1.3125rem, 1.45): review text, the one place a serif carries a paragraph.
- **Card** (400, 1.25rem, 1.3): the name under an image plate, the wordmark, a cart line's title.
- **Lead** (400, clamp(1.05rem, 1.4vw, 1.25rem), 1.55): the sentence under a heading, and sequence captions.
- **Body** (400, 1rem, 1.65): all running text. Measure is capped between 34ch and 68ch depending on context; prose blocks never run wider than 68ch.
- **Control** (400, 0.9375rem, 1.4): every button, link, chip and select. Controls have their own step so they stay a hair below body.
- **Label** (400, 0.8125rem, 1.5, 0.12em, uppercase): field labels, step names, meta lines. Uppercase only at this size.

### Named Rules

**The Two Voices Rule.** Serif speaks, sans explains. A serif never labels a control and a sans never carries a page's main statement.

**The Two Line Headline Rule.** The landing headline is allowed two lines at every breakpoint. If a copy change pushes it to three, the copy is wrong, not the type scale.

**The Tabular Rule.** Every price, quantity and count carries `font-variant-numeric: tabular-nums`, so numbers do not shuffle when they change.

## Layout

A single centred container at 86rem with a 1.5rem gutter on phones and 2.5rem from the medium breakpoint up. Inside it, grids are deliberately unequal: 12 columns on the landing page's featured block with spans of 7, 4, 4 and 5 at different vertical offsets; 1.25fr to 0.75fr on editorial pages; 1.35fr to 0.65fr where a summary panel sits beside content. Nothing divides into three equal columns.

Vertical rhythm runs on two steps, 5rem on phones and 8.5rem from medium up, with more space above a heading than below it. The navigation is a fixed 72px line, transparent while it sits over the landing hero and cream once the page has moved. Sticky scroll sections are sized in `svh` rather than `vh` so mobile browser chrome does not clip them.

Breakpoints are Tailwind's defaults; the two that carry real layout change are 640px (grids go to two columns) and 768px (the editorial split appears and the mobile menu disappears).

## Elevation & Depth

This system is flat. Depth comes from tonal layering between cream, sand and shell, and from the size of the gap between elements, not from shadows. Exactly two shadows exist and both belong to surfaces that genuinely float above the page.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 18px 48px -24px rgb(43 37 35 / 0.28)`): reserved for elements that leave the page plane. Offset and soft blur, never a zero offset halo.
- **Drawer** (`box-shadow: -24px 0 64px -32px rgb(43 37 35 / 0.32)`): the cart drawer's left edge only.

### Named Rules

**The One Elevation Rule.** A surface declares depth with a tone change or a shadow, never both. There are no bordered cards in this system, and no card sits inside another card.

## Shapes

One radius system, three steps, used everywhere without exception. Plates (14px) are every image, panel and raised block. Controls (8px) are buttons, inputs, selects and thumbnails. Pills (999px) are only for small controls, which in practice means filter chips and avatars. Corners never change on hover; the only radius that animates is the hero plate's, which relaxes from 14px to 0 as it grows into the full frame.

Borders are not part of the form language. The single exception is a 1px `#ded3c8` divider between cart lines, where the list genuinely needs separation.

## Components

### Buttons
- **Shape:** gently rounded (8px), 48px tall at default size, 36px small.
- **Primary:** warm charcoal ground with cream text, 1.75rem of horizontal padding.
- **Hover / Focus:** ground lightens to 88% opacity over 180ms on the quiet ease curve; focus shows a 2px deep clay rose ring offset by 3px.
- **Active:** scales to 0.99. Press feedback is a scale, never a colour flash.
- **Secondary:** shell ground with charcoal text, hovering to soft blush.
- **Quiet:** no ground at all, soft ink text darkening to charcoal.

### Chips
- **Style:** sand ground, soft ink text, fully rounded, no border.
- **State:** the selected chip inverts to a charcoal ground with cream text over 180ms. Chips scroll horizontally on phones rather than wrapping.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** sand for panels, and sand behind every image plate so a slow loading photograph does not flash white.
- **Shadow Strategy:** none. See Elevation & Depth.
- **Border:** none.
- **Internal Padding:** 2rem on phones, 2.5rem from medium up.

### Inputs / Fields
- **Style:** sand ground, no stroke, 8px radius, 0.75rem by 1rem of padding, with an uppercase tracked label above.
- **Focus:** the ground steps up to shell and the browser focus ring is replaced by a 2px deep clay rose outline.
- **Error:** a 1px deep clay rose ring plus a message in the same colour, wired through `aria-describedby`.

### Navigation
- **Style:** one 72px line. Serif wordmark left, sans links right at 0.9375rem, cart count last.
- **States:** inactive links are soft ink and move to charcoal on hover; the active route stays charcoal and carries `aria-current`.
- **Mobile:** links collapse into a Menu control that opens a full screen cream panel, its items staggered in at 50ms intervals.

### The Scroll Sequence
The signature component, and the only place the system spends its motion budget. A sticky full viewport canvas plays 64 preloaded frames scrubbed directly by scroll progress, with a caption panel that fades between the eight named steps. Frames are drawn inside a requestAnimationFrame callback fed by a motion value subscription, so React state is never written while scrolling. Under `prefers-reduced-motion` the canvas is replaced by a single still and the steps become an ordinary two column list.

## Do's and Don'ts

### Do:
- **Do** put every label under its image. A picture in this system is never printed on.
- **Do** deepen the accent to #9a5346 before setting any word in it.
- **Do** keep scroll position in `useScroll` and `useTransform` only, and map opacity through a function rather than a keyframe range so Motion does not promote it to its own scroll timeline.
- **Do** size sticky sections in `svh`.
- **Do** give every image plate a sand ground underneath it.
- **Do** animate `transform` and `opacity` only, on the exponential ease out `cubic-bezier(0.16, 1, 0.3, 1)`.

### Don't:
- **Don't** use an em dash or an en dash anywhere, including JSON data and alt text.
- **Don't** add a scroll cue, a down arrow, a badge over an image, or a row of three equal cards.
- **Don't** put a border and a shadow on the same surface, or a card inside a card.
- **Don't** reach for grey. Secondary text is #6b5f58.
- **Don't** use bounce or elastic easing, or a spring that overshoots.
- **Don't** listen to the `scroll` event directly, and never set React state once per animation frame.
- **Don't** introduce a dark theme. The page theme is locked to light.
