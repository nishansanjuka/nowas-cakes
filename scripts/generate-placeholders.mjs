/**
 * Writes flat placeholder PNGs for every image path referenced by /data.
 * These stand in for Nowa's real photography. Replace the files under
 * /public with real images and delete this script.
 *
 *   node scripts/generate-placeholders.mjs
 */
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicDir = join(root, "public");

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function png(width, height, pixel) {
  const raw = Buffer.alloc(height * (width * 3 + 1));
  let o = 0;
  for (let y = 0; y < height; y++) {
    raw[o++] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixel(x / (width - 1), y / (height - 1));
      raw[o++] = r;
      raw[o++] = g;
      raw[o++] = b;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

/** Warm studio tones, walked by a seed so neighbouring images differ. */
function tones(seed) {
  const warm = [
    [243, 236, 228],
    [237, 227, 217],
    [226, 211, 198],
    [214, 169, 160],
    [205, 188, 170],
  ];
  return [warm[seed % warm.length], warm[(seed + 2) % warm.length]];
}

function write(relPath, width, height, seed, vignette = 0.16) {
  const [top, bottom] = tones(seed);
  const file = join(publicDir, relPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(
    file,
    png(width, height, (u, v) => {
      const base = mix(top, bottom, v * 0.85 + u * 0.15);
      const d = Math.hypot(u - 0.5, v - 0.5) * 1.414;
      return base.map((c) => Math.round(c * (1 - vignette * d * d)));
    }),
  );
}

const read = (name) => JSON.parse(readFileSync(join(root, "data", name), "utf8"));

let seed = 0;
const products = read("products.json");
for (const p of products) for (const img of p.images) write(img.src, 1200, 1500, seed++);

for (const item of read("portfolio.json")) {
  write(item.image.src, Math.round(item.image.width / 2), Math.round(item.image.height / 2), seed++);
}

for (const r of read("reviews.json")) write(r.avatar.src, 200, 200, seed++, 0.05);

const brand = read("brand.json");
write(brand.heroImage.src, 1400, 1750, 3);
write(brand.portrait.src, 1200, 1500, 1);

/** Frames walk from cool flour tones to the warm finished cake. */
const sequence = read("baking-sequence.json");
sequence.frames.forEach((src, i) => {
  const t = i / (sequence.frames.length - 1);
  const from = [240, 234, 225];
  const to = [201, 152, 138];
  const [r, g, b] = mix(from, to, t);
  const file = join(publicDir, src);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(
    file,
    png(1200, 750, (u, v) => {
      const d = Math.hypot(u - 0.5, v - 0.55) * 1.414;
      const lift = 1 - 0.22 * d * d + 0.04 * Math.sin((i / 6 + v * 3) * Math.PI);
      return [r, g, b].map((c) => Math.max(0, Math.min(255, Math.round(c * lift))));
    }),
  );
});

console.log(`Wrote ${seed + 2 + sequence.frames.length} placeholder images into /public.`);
