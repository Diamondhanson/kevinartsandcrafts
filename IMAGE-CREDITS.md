# Image credits

Most photography on this site is Kiven's own — the products, the workshop, and the
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
`public/images/details/carving.jpg` and `public/images/details/joint.jpg`, is Kiven's
own work and must not be swapped for stock: those frames show real pieces and the real
maker.

## Supplied by the client

`public/images/lifestyle/wardrobe-range.jpg` — the wardrobe banner on the home page,
supplied as `WhatsApp Image 2026-08-10 at 3.54.27 PM.jpeg` and kept in
`furniture-web-images/` in its original form. Two things to know about it:

- **It carries a different brand mark.** The words "Kev | HOME FURNITURES" are baked
  into the pixels, while the rest of the site is "Kivens Arts and Crafts". Nothing in
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
  unit. With "Kev | HOME FURNITURES" on the home page banner and "Kivens Arts and
  Crafts" everywhere else, the site now shows three names. Only a re-export fixes it.
- **The sources are 960–1280px.** Output is 1600px wide, so there is mild upscaling.
  Fine at card and detail size, soft if ever shown full-bleed. Higher-resolution
  originals would be better if the camera still has them.

The specs — materials, dimensions, finish and lead time — were deliberately left off
these three. `Product` treats all four as optional and the detail page omits the table
entirely when none are known, so they can be filled in later without touching code.
