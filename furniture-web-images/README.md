# Furniture image set — web ready

Open **index.html** in a browser to preview every image and copy the ready-made
`<picture>` markup for each one.

## What's in here

```
product/      cut-out product shots on clean white + transparent PNG masters
lifestyle/    workshop / maker shots, full frame
before-after/ side-by-side of each original vs the enhanced version
index.html    visual preview + copy-paste HTML for each image
```

Every image is supplied as **WebP** (small, modern browsers) and **JPEG**
(fallback), at several widths so the browser downloads only what it needs.

| File | Use it for |
|---|---|
| `product/padauk-stool-*` | Product page hero, catalogue grid (square, 1:1) |
| `product/carved-collection-*` | Wide product / collection banner (16:9) |
| `product/*-transparent.png` | Dropping the piece onto a coloured or textured section |
| `lifestyle/craftsman-portrait-*` | About / Our maker page |
| `lifestyle/craftsman-at-work-*` | Craftsmanship or process section, page banner |

## What was done to them

1. **JPEG artefact cleanup** — the originals were WhatsApp-compressed (33–64 KB),
   so blocking around the wood edges was smoothed without flattening the grain.
   Chroma was filtered harder than luma, which is where the artefacts actually live.
2. **White balance** — a partial shades-of-grey correction, so the studio wall reads
   neutral instead of pink/green while the padauk keeps its real colour.
3. **Black and white point recovery** — removes the flat, hazy look, with clipping guards
   so no highlight or shadow detail is destroyed.
4. **Gentle local contrast + a mild luminance S-curve** — depth in the carving without
   the HDR look. Hue is untouched.
5. **Small chroma lift** — restrained, and rolled off where chroma is already strong,
   so the red deepens rather than going neon.
6. **2× upscale (Lanczos) + edge-masked sharpening** — sharpening is applied only where
   there are real edges, so walls and skin stay clean.
7. **Product shots** were matted out and placed on white with a soft contact shadow.

## Two things worth knowing

- **These started as ~1080×608 frames**, most likely grabbed from a video. They have been
  doubled to 2160 px wide, which is plenty for full-width web use — but it is
  interpolated detail, not new detail. If you still have the **original video file or the
  camera stills**, send them over and I can redo this at genuinely higher resolution.
  That is the single biggest quality win available.
- **The stool cut-out caps at 946 px** because that is its true size in the frame.
  Anything larger would just be soft. For a bigger product hero, a fresh photo of the
  stool shot straight-on would be the way.

## Serving tips

- Serve WebP first, JPEG as fallback (the `<picture>` markup in `index.html` does this).
- Keep the `width` and `height` attributes — they stop the page jumping as images load.
- `loading="lazy"` on everything except the first image the visitor sees.
- The `alt` text in `index.html` is written for accessibility and search; edit it to match
  your product names.
