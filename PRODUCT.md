# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), TypeScript strict, Tailwind CSS, Motion (`motion/react`), Lenis smooth scrolling, `next/image`.
Specified by the user in the brief. UI layer only: no API routes, server actions, database, auth or payment logic.
Cart state is client side React Context held in memory.

## Users

Customers ordering celebration and custom cakes. They arrive either to browse and buy a ready cake, or to judge
whether this baker can be trusted with a wedding or a milestone birthday. The second job is why the site carries a
portfolio and a personal story alongside the shop.

## Product Purpose

Nowa's Cakes is two things in one site: an online store selling cakes, and the personal brand and portfolio of the
baker, Nowa. Success is a visitor who believes the work is made by one person with care, and who either adds a cake
to the cart or files Nowa away as the person to call for their next occasion.

## Positioning

A single named baker whose hands are visible in the work. The site shows how a cake is made, step by step, rather
than only showing the finished object. A generic bakery storefront cannot truthfully claim the maker.

## Operating Context

Visitors browse on phones as often as on desktop, often while planning an event with someone else. They compare a
handful of bakers by photographs before they compare prices. Custom orders start as a conversation, not a checkout.

## Capabilities and Constraints

- Shop: product grid with category filter and sort. Product detail with gallery, size and flavor options, quantity.
- Cart: drawer from the right plus a `/cart` page. In memory only, cleared on reload.
- Checkout: form UI only. Submit shows a placeholder state and does not transact.
- Portfolio: filterable grid with a lightbox.
- Reviews: marquee on the landing page, grid elsewhere.
- All content is dummy data, local JSON under `/data`, typed through `/types`.
- No backend of any kind. Placeholder image paths under `/public`.
- Undecided and not to be invented: real pricing, real delivery areas, real lead times, real contact details.

## Brand Commitments

Name: Nowa's Cakes. Baker: Nowa. Voice: warm, calm, refined. Copy carries no em dashes or en dashes anywhere,
including JSON data and alt text. Page theme is light only.

## Evidence on Hand

None. Every product, portfolio piece, review and photograph is placeholder content written for this build. No real
testimonials, customers, awards or press exist and none may be implied as real.

## Product Principles

1. The maker is the product. Nowa's hand stays visible on every surface.
2. Show the making, not only the result. Process is the proof.
3. Calm over urgency. No countdowns, no pressure, no scarcity theatre.
4. Photographs lead, interface recedes.
5. Never imply proof the product does not have.

## Accessibility & Inclusion

WCAG AA contrast, semantic HTML, alt text on every image, full keyboard navigation, and `prefers-reduced-motion`
honored by dropping the pin and showing the scroll driven sections already settled.
