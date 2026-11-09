# Image credits

Most photography on this site is Kevin's own — the products, the workshop, and the
maker portraits. A small number of generic "texture" shots are licensed stock, listed
here so the provenance stays traceable.

## Stock photography

Both are free under the [Unsplash License](https://unsplash.com/license) (free for
commercial use, no attribution required — credited here anyway).

| File | Photographer | Source |
| --- | --- | --- |
| `public/images/details/tools-bench.jpg` | Dominik Scythe | https://unsplash.com/photos/v8vz-Roj8zo |
| `public/images/details/chisel-cut.jpg` | Dominik Scythe | https://unsplash.com/photos/3cIvvzjE6Lk |

These replaced low-resolution frames pulled from workshop video. They are used only as
atmosphere — a tools band on `/process` and a portrait slot beside the care copy — and
never to represent a specific product or the maker himself.

## Not stock

Everything under `public/images/products/` and `public/images/lifestyle/`, plus
`public/images/details/carving.jpg` and `public/images/details/joint.jpg`, is Kevin's
own work and must not be swapped for stock: those frames show real pieces and the real
maker.

## Supplied by the client

`public/images/lifestyle/wardrobe-range.jpg` — the wardrobe banner on the home page,
supplied as `WhatsApp Image 2026-08-10 at 3.54.27 PM.jpeg` and kept in
`furniture-web-images/` in its original form. Two things to know about it:

- **It carries a different brand mark.** The words "Kev | HOME FURNITURES" are baked
  into the pixels, while the rest of the site is "Kevin's Arts and Crafts". Nothing in
  code can change that — it needs a re-exported file.
- **It is 1600 × 900**, smaller than the other full-width images, so it is shown inside
  the container rather than full-bleed. Its 16:9 frame matches the file exactly because
  any crop would cut into the brand mark.

### Catalogue photographs, October 2026

Three pieces supplied as phone photographs and added to the catalogue. The originals
are kept unaltered in `furniture-web-images/product/` under their camera filenames.

| Published file | Original | Piece |
| --- | --- | --- |
| `public/images/products/display-cabinet.jpg` | `9bac9e6c-….JPG` | Display Cabinet |
| `public/images/products/wall-lockers.jpg` | `a2ef76be-….JPG` | Wall Lockers |
| `public/images/products/mirrored-wardrobe.jpg` | `cb73a54e-….JPG` | Mirrored Wardrobe |

What was done to each:

- **Display cabinet** — the dark door down the right-hand edge was cropped off at
  x=830, where there is clean wall between the cabinet and the door. The plain pink
  wall was then extended 52px left and 118px right by replicating the edge column, to
  re-centre the piece and reach 4:5. Magenta cast pulled back 62% so the wood reads
  true. Mild contrast and unsharp mask.
- **Wall lockers** — a strong amber cast from the LED strip lighting (blue down 1.58×
  against red) corrected by 60%, so the wall reads cream rather than orange. 60px of
  left-edge clutter and 45px of floor trimmed, keeping 4:3 exact.
- **Mirrored wardrobe** — purple cast corrected 40%, keeping some of it because the
  room really is that colour. 30px of ceiling and 50px of rug trimmed to land on 4:5.

Two caveats:

- **The locker photograph carries a third brand mark.** "K-furniture — Quality
  Furniture for a Better Home" and "@K-furniture" are baked into the wall behind the
  unit. With "Kev | HOME FURNITURES" on the home page banner and "Kevin's Arts and
  Crafts" everywhere else, the site now shows three names. Only a re-export fixes it.
- **The sources are 960–1280px.** Output is 1600px wide, so there is mild upscaling.
  Fine at card and detail size, soft if ever shown full-bleed. Higher-resolution
  originals would be better if the camera still has them.

The specs — materials, dimensions, finish and lead time — were deliberately left off
these three. `Product` treats all four as optional and the detail page omits the table
entirely when none are known, so they can be filled in later without touching code.

### The workshop film, November 2026

`public/video/workshop-film.mp4` — supplied as `CAENTER Video.mp4`.

The original is **not in this repository**: at 532 MB it is five times GitHub's 100 MB
per-file limit, so `furniture-web-images/**/*.mp4` is gitignored. It is still on the
machine it was added from, under `furniture-web-images/product/` — keep it with the
rest of the camera rushes, because it cannot be recovered from what ships here.

The original is 3840 × 2160, 118 seconds, 36 Mbps, **532 MB**. That cannot go on a web
page or into a git repository, so what ships is a re-encode: 1600 × 900, H.264 CRF 27,
AAC 96k, `+faststart` for progressive streaming — **28.8 MB**, the full 118 seconds,
nothing trimmed. A 1080p/CRF 25 encode was tried first at 46 MB; compared frame to
frame at full crop the two were indistinguishable, so the smaller one won.

It sits in a click-to-play block on the home page with `preload="none"`, so the 28.8 MB
is fetched only when a visitor presses play — verified: a page load makes no request
for the file at all. The poster is a frame at t=95s.

**This is the one asset worth reconsidering.** 28.8 MB is under GitHub's 100 MB limit
and fine on Vercel's CDN, but it is in the repository permanently and every clone pays
for it. A video host (Vimeo, Mux, Cloudflare Stream) would give adaptive bitrate, a
smaller repository, and better playback on slow connections. Swapping the `<video>`
block for an embed is a contained change if that is ever wanted.

### The four dishes, November 2026

Supplied as one 1195 × 896 sheet, `E-commerce Product Photo Transformation (1).jpeg`,
holding four studio shots in a 2 × 2 grid. Split into four separate cutouts:

| Published file | Piece |
| --- | --- |
| `public/images/products/crescent-dish.png` | Crescent Dish |
| `public/images/products/wave-rim-platter.png` | Wave-Rim Platter |
| `public/images/products/leaf-dish.png` | Leaf Dish |
| `public/images/products/plain-round-dish.png` | Plain Round Dish |

Each quadrant was cut at the sheet's midpoints with a 6px inset to clear the divider,
then the backdrop was removed by flooding inward from the border over pixels that are
both neutral and light — chroma rather than brightness, because a brightness threshold
eats into the pale inner floor of each dish. The contact shadows are kept. Each piece
is then centred on a square transparent canvas at a common scale, so the four read as a
set rather than four unrelated crops, and saved as full-colour PNG. Palette
quantisation would have cut them from ~600 KB to ~100 KB each but visibly posterised
the wood, so it was not used.

As with the three furniture pieces, materials, dimensions, finish and lead time are
left off until someone who knows them supplies them. The descriptions cover only what
is visible in the photographs — shape and carving — and name no timber.

### The triangle-rim bowl, November 2026

Supplied as a second 1195 × 896 sheet, archived as
`furniture-web-images/product/carved-bowl-grid.jpg`, again holding four studio shots in
a 2 × 2 grid — but of **one** bowl, not four pieces: two three-quarter takes on the top
row and two overhead takes below.

That was checked rather than assumed. The rim band of both overhead shots was unrolled
into a flat strip and compared: same motif, same unit count, same band radius as a
fraction of the bowl, and the top row carries that same band at the same proportion.
The only difference between the two overhead takes is the figure in the timber, which
is what you would expect from a tool that regenerates the piece on each pass — the file
the first sheet arrived under was named "E-commerce Product Photo Transformation".

So it is published as one piece with two views:

| Published file | View |
| --- | --- |
| `public/images/products/triangle-rim-bowl.jpg` | Three-quarter |
| `public/images/products/triangle-rim-bowl-overhead.jpg` | From above |

**These are not cutouts**, unlike the four dishes above. The sheet's backdrop is already
clean and evenly lit, and each bowl sits on a soft contact shadow that gives it weight
on the page. Removing all that was tried and discarded: it left the piece floating with
a hard, slightly ragged edge where the photograph had a soft one. The crops are
published as shot.

The only reframing is squaring up. Each published image has to survive three different
frames — the card crops to 4:5, the gallery to 4:3, the thumbnail to 1:1 — and a square
canvas is the only shape that loses nothing in all three, provided the piece stays
inside roughly 76% of the width and 72% of the height. It does: 72 × 35 for the
three-quarter view, 62 × 62 for the overhead. The quadrants are 4:3, so the backdrop is
extended vertically by replicating the edge rows. That is safe here because no border
row or column of either crop is touched by the bowl or its shadow, and the backdrop is
a near-flat vertical gradient — about one level of brightness across the 70-odd rows
added — so the join does not read.

Then scaled to 1000 × 1000 to match the dishes, lightly sharpened to recover what the
upscale costs, and saved as JPEG: around 100 KB each, against 430 KB and 840 KB for the
transparent PNGs they replaced.

Materials, dimensions, finish and lead time are left off, as with every other piece
added since August.
