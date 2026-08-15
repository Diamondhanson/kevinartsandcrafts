import type { Category, Product } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 * THE CATALOGUE
 * ---------------------------------------------------------------------------
 * This is the sample content the site ships with. To add a piece:
 *
 *   1. Put the photographs in  public/images/products/
 *   2. Copy one whole { ... } block below and paste it at the top of the list
 *   3. Change the text. `slug` must be unique — it becomes the web address,
 *      so use lowercase words joined by hyphens (no spaces, no accents).
 *
 * Set `featured: true` on the three pieces you want on the home page.
 *
 * Once Supabase is connected (see SETUP.md) the site reads from the database
 * instead and this file becomes the fallback. Nothing else has to change.
 * ---------------------------------------------------------------------------
 */

export const categories: Category[] = [
  {
    slug: "furniture",
    name: "Furniture",
    description: "Seating, tables and case pieces, built to be used every day for a lifetime.",
  },
  {
    slug: "sculpture",
    name: "Sculpture",
    description: "Carved forms that exist for their own sake — figurative and abstract.",
  },
  {
    slug: "homeware",
    name: "Homeware",
    description: "Bowls, boards and smaller turned and carved objects for the table.",
  },
  {
    slug: "restoration",
    name: "Restoration",
    description: "Bringing damaged and inherited pieces back into daily use.",
  },
];

export const products: Product[] = [
  {
    slug: "entwined-stool",
    name: "Entwined Stool",
    category: "furniture",
    summary: "Three padauk branches, woven and locked without a single fixing",
    story: [
      "Three limbs of padauk rise from the floor, cross once, and hold each other. There are no screws in the base and no glue at the joint — the legs are cut so that the weight of whoever sits down is what locks them together. The harder it is used, the tighter it becomes.",
      "The seat is a single slab taken from the same tree, planed by hand and left with its live edge intact on one side. The grain across the top is the record of a particular season in the life of that tree; no second stool will ever carry it.",
      "It works as a side table beside a chair, a stand for a lamp or a plant, or as the seat it was designed to be.",
    ],
    images: [
      { src: "/images/products/padauk-stool-cutout.png", alt: "The Entwined Stool, a hand-carved padauk stool with three interlaced branch legs", kind: "cutout" },
      { src: "/images/products/padauk-stool-studio.jpg", alt: "The Entwined Stool photographed on a plinth in the workshop", kind: "scene" },
      { src: "/images/details/joint.jpg", alt: "Close view of the interlaced joint where the three legs cross and lock", kind: "scene" },
    ],
    materials: "Solid padauk",
    dimensions: "H 45cm · Ø 38cm",
    finish: "Hand-rubbed oil and beeswax",
    leadTime: "4 – 6 weeks",
    price: null,
    currency: "XAF",
    year: 2025,
    featured: true,
    available: true,
  },
  {
    slug: "bearers-of-the-bowl",
    name: "Bearers of the Bowl",
    category: "sculpture",
    summary: "Two figures carrying a turned vessel between them",
    story: [
      "Two figures lean into each other and hold a bowl between them. The whole piece — both bodies, both pairs of arms, and the vessel they carry — is cut from one block of padauk. Nothing is joined, because nothing was ever separate.",
      "The bowl is hollowed and turned smooth while the figures around it keep the marks of the gouge. That contrast is deliberate: the thing being carried is finished, the ones carrying it are still at work.",
      "It stands well on a dining table, a console or a shelf where it can be seen from more than one side.",
    ],
    images: [
      { src: "/images/products/bearers-bowl-cutout.png", alt: "Bearers of the Bowl — two carved padauk figures holding a turned vessel between them", kind: "cutout" },
      { src: "/images/details/carving.jpg", alt: "Close view of the carved faces and gouge marks on the figures", kind: "scene" },
      { src: "/images/products/carved-collection-studio.jpg", alt: "Bearers of the Bowl shown with the two Interlaced Forms in the workshop", kind: "scene" },
    ],
    materials: "Solid padauk, single block",
    dimensions: "H 32cm · W 26cm · D 18cm",
    finish: "Hand-rubbed oil",
    leadTime: "6 – 8 weeks",
    price: null,
    currency: "XAF",
    year: 2025,
    featured: true,
    available: true,
  },
  {
    slug: "interlaced-form-i",
    name: "Interlaced Form I",
    category: "sculpture",
    summary: "A closed knot cut from a single length of padauk",
    story: [
      "A length of padauk opened along its own grain and woven back through itself. Every strand you can see passes through the others, and every one of them was once part of the same solid piece of wood — it is cut, not assembled.",
      "Carving this way leaves no room for correction. A cut in the wrong place cannot be filled or glued; the piece is simply finished, and a new one begins.",
      "Sold individually, or as a pair with Interlaced Form II.",
    ],
    images: [
      { src: "/images/products/interlaced-form-i-cutout.png", alt: "Interlaced Form I — a carved padauk knot of woven strands", kind: "cutout" },
      { src: "/images/products/carved-collection-studio.jpg", alt: "Interlaced Form I shown alongside its companion pieces", kind: "scene" },
    ],
    materials: "Solid padauk",
    dimensions: "L 46cm · W 16cm · H 12cm",
    finish: "Hand-rubbed oil",
    leadTime: "5 – 7 weeks",
    price: null,
    currency: "XAF",
    year: 2025,
    featured: true,
    available: true,
  },
  {
    slug: "interlaced-form-ii",
    name: "Interlaced Form II",
    category: "sculpture",
    summary: "The companion knot — the same cut, opened the other way",
    story: [
      "The second of the pair. The same technique as Interlaced Form I, worked from the opposite end of the board, so the weave runs the other way and the two read as a conversation when they sit on the same surface.",
      "Both were cut from one plank, which means the colour and figure match — something that cannot be arranged after the fact.",
    ],
    images: [
      { src: "/images/products/interlaced-form-ii-cutout.png", alt: "Interlaced Form II — the companion carved padauk knot", kind: "cutout" },
      { src: "/images/products/carved-collection-cutout.png", alt: "Both Interlaced Forms with Bearers of the Bowl between them", kind: "cutout" },
    ],
    materials: "Solid padauk",
    dimensions: "L 48cm · W 15cm · H 11cm",
    finish: "Hand-rubbed oil",
    leadTime: "5 – 7 weeks",
    price: null,
    currency: "XAF",
    year: 2025,
    featured: false,
    available: true,
  },
  {
    slug: "the-carved-collection",
    name: "The Carved Collection",
    category: "sculpture",
    summary: "All three carved pieces, presented together on turned bases",
    story: [
      "The complete group: both Interlaced Forms on their turned bases, with Bearers of the Bowl standing between them. Cut from the same tree over one season, so the three share a colour that will deepen together as they age.",
      "Offered as a set for a mantelpiece, a long console or a reception space. Individual pieces are available separately.",
    ],
    images: [
      { src: "/images/products/carved-collection-cutout.png", alt: "The full carved collection — two interlaced forms flanking the bowl bearers", kind: "cutout" },
      { src: "/images/products/carved-collection-studio.jpg", alt: "The carved collection photographed in the workshop", kind: "scene" },
      { src: "/images/details/carving.jpg", alt: "Detail of the carved faces", kind: "scene" },
    ],
    materials: "Solid padauk, with turned bases",
    dimensions: "Overall span 175cm",
    finish: "Hand-rubbed oil",
    leadTime: "10 – 14 weeks",
    price: null,
    currency: "XAF",
    year: 2025,
    featured: false,
    available: true,
  },
  {
    slug: "workshop-commission",
    name: "Commissioned Work",
    category: "furniture",
    summary: "A piece designed around your room, your timber and your use",
    story: [
      "Most of what leaves this workshop was made for one person and one room. The process starts with a conversation about where the piece will live and what it has to do, then moves to sketches and a timber selection, and only then to cutting.",
      "Dining tables, benches, beds, doors, shelving, reception desks and shopfittings have all come out of this shop. If you can describe it, it can usually be built.",
      "Tell me what you have in mind and I will come back with a drawing and a price before anything is committed.",
    ],
    images: [
      { src: "/images/lifestyle/craftsman-at-work.jpg", alt: "Kiven planing a padauk board by hand in the workshop", kind: "scene" },
      { src: "/images/details/tools-bench.jpg", alt: "Carving gouges and chisels laid out across a workbench", kind: "scene" },
    ],
    materials: "Padauk, iroko, mahogany, or a timber you choose",
    dimensions: "Made to your measurements",
    finish: "Oil, wax or lacquer to suit the piece",
    leadTime: "Quoted per project",
    price: null,
    currency: "XAF",
    year: 2025,
    featured: false,
    available: true,
  },
  {
    slug: "restoration-service",
    name: "Restoration",
    category: "restoration",
    summary: "Inherited and damaged pieces brought back into daily use",
    story: [
      "Loose joints, split panels, water damage, missing sections of carving, finishes that have gone cloudy or sticky. Old furniture is usually worth saving — it was built from timber that is difficult to buy now, and built to be taken apart.",
      "Work is done by hand with the original methods wherever possible: hide glue, hand-cut patches in matching timber, shellac and wax rather than modern lacquer.",
      "Send a few photographs and a description of what has gone wrong, and you will get an honest answer about whether it is worth doing.",
    ],
    images: [
      { src: "/images/details/chisel-cut.jpg", alt: "A chisel paring a curve into a board, shavings gathered around the cut", kind: "scene" },
      { src: "/images/lifestyle/craftsman-portrait.jpg", alt: "Kiven in the workshop with his tools laid out around him", kind: "scene" },
    ],
    materials: "Matched to the original piece",
    dimensions: "—",
    finish: "Shellac, wax or oil, matched to the original",
    leadTime: "Quoted after assessment",
    price: null,
    currency: "XAF",
    year: 2025,
    featured: false,
    available: true,
  },
];
