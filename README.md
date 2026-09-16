# Nowa's Cakes

The UI layer for a cake shop that is also the portfolio of the baker who makes them.
Next.js App Router, TypeScript strict, Tailwind CSS v4, Motion for transitions and
scroll linked animation, Lenis for smooth scrolling.

```bash
npm install && npm run dev
```

## What this is, and what it is not

This is the interface only. There are no API routes, no server actions, no database,
no auth and no payment logic, by design. Everything on screen comes from local JSON in
[`data/`](data), typed through [`types/`](types), and read by pages which pass it down
as props. Components never import data themselves.

The cart lives in a client side React Context and is held in memory, so it empties on
reload. Checkout is a form that validates and shows a placeholder result; nothing is
sent anywhere and nothing is charged.

## Where things live

| Path | What it holds |
| --- | --- |
| [`app/`](app) | Routes: landing, shop, product, cart, checkout, portfolio, about |
| [`components/`](components) | `ui/` primitives, then one folder per surface |
| [`hooks/`](hooks) | All scroll and motion logic, kept out of components |
| [`lib/motion.ts`](lib/motion.ts) | Every duration, easing and spring in the app |
| [`app/globals.css`](app/globals.css) | Every colour, radius, type step and spacing token |
| [`data/`](data) | Eight products, twelve portfolio pieces, six reviews, the sequence |
| [`DESIGN.md`](DESIGN.md) | The visual system, written from what was built |

## The placeholder images

Every file under `public/` is a generated stand in for Nowa's real photography, written
by [`scripts/generate-placeholders.mjs`](scripts/generate-placeholders.mjs) from the
paths named in `data/`. To put real pictures in, replace the files at those paths and
delete the script. The landing sequence expects 64 frames at
`public/frames/frame-001.png` through `frame-064.png`, in playback order; a frame that
fails to load is painted over with the neutral fallback colour from
`data/baking-sequence.json` rather than leaving a hole.

## Motion

The landing page is one scroll instrument in two movements. The hero cake scales until
it fills the viewport while the words step back, cross fades into the first frame of
the baking sequence, and the sequence is then scrubbed frame by frame on a canvas
driven by `useMotionValueEvent` and `requestAnimationFrame`. React state is never
written per frame, nothing listens to the `scroll` event, and only `transform` and
`opacity` animate.

Under `prefers-reduced-motion` both sequences are replaced: the hero becomes a static
image and the bake becomes an ordinary list of its eight steps.
