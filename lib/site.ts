/**
 * Every piece of business information the site uses lives here.
 * Change it in this file and it changes everywhere — header, footer, contact
 * page, WhatsApp links, metadata, structured data and the sitemap.
 *
 * ⚠️  The values marked TODO are placeholders. Replace them before going live.
 */

export const site = {
  name: "Kivens Arts and Crafts",
  shortName: "Kivens",
  tagline: "Handmade furniture and carved art",
  description:
    "Handmade furniture and carved sculpture from Cameroon. Each piece is worked by hand in local hardwoods — padauk, iroko, mahogany — and made one at a time.",

  // TODO: replace with the real domain once it is registered
  url: "https://kivensartsandcrafts.com",

  // TODO: replace with real contact details
  email: "hello@kivensartsandcrafts.com",
  phoneDisplay: "+237 6 00 00 00 00",
  /** Digits only, with country code, no + or spaces — this is what wa.me needs. */
  whatsapp: "237600000000",

  location: {
    city: "Douala",
    region: "Littoral",
    country: "Cameroon",
    /** TODO: replace with the workshop's street address */
    street: "Workshop address",
  },

  hours: "Monday – Saturday, 8am – 6pm",

  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },

  founder: "Kiven",
} as const;

/** Builds a wa.me link with the message pre-filled. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** The message we pre-fill when someone enquires about a specific piece. */
export function pieceEnquiryMessage(pieceName: string) {
  return `Hello ${site.founder}, I saw "${pieceName}" on your website and I would like to know more about it.`;
}

export const nav = [
  { href: "/products", label: "Collection" },
  { href: "/process", label: "The Craft" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
