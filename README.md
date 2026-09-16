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
| [`data/`](data) | Eight products, twelve portfolio pieces, six reviews, five cake layers |
| [`DESIGN.md`](DESIGN.md) | The visual system, written from what was built |

## The placeholder images

Every file under `public/` is a generated stand in for Nowa's real photography, written
by [`scripts/generate-placeholders.mjs`](scripts/generate-placeholders.mjs) from the
paths named in `data/`. To put real pictures in, replace the files at those paths and
delete the script.

The cake layers are the exception. Each one wants a transparent cutout at the path
named in [`data/cake-layers.json`](data/cake-layers.json), and a flat rectangle
standing in for one would read as a real layer, so the script does not write them.
[`app/page.tsx`](app/page.tsx) asks the filesystem which cutouts exist and the stage
draws a neutral block at the layer's own height for any that do not. Drop real files
at those paths and they take over with no code change.

## Motion

The landing page opens on one pinned section. The hero and the assembly are the same
piece of furniture: a contained square stage holds a plate, and as the section scrolls
the cake is built on it a layer at a time while the text column moves from the headline,
to the steps, to a closing line. The cake is only ever added to, never swapped for
another picture, and nothing goes full screen at any scroll position.

Scroll position enters through `useScroll` once and is divided up by
[`useAssemblyProgress`](hooks/useAssemblyProgress.ts); every layer takes its own eased
slice out of that. React state is never written per frame, nothing listens to the
`scroll` event, and only `transform` and `opacity` animate.

Every scroll driven value is read through the function form of `useTransform` rather
than a keyframe range. A range lets Motion promote the value to a native scroll linked
animation, which runs on its own timeline and drifts away from the smoothed scroll
position Lenis is driving everything else with.

Under `prefers-reduced-motion` the section loses its pin and shows the finished cake
beside a plain list of the five steps.
