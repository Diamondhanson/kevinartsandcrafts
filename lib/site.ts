/**
 * Every piece of business information the site uses lives here.
 * Change it in this file and it changes everywhere — header, footer, contact
 * page, WhatsApp links, metadata, structured data and the sitemap.
 *
 * ⚠️  The values marked TODO are placeholders. Replace them before going live.
 */

export const site = {
  name: "Kevin's Arts and Crafts",
  shortName: "Kevin's",
  tagline: "Handmade furniture and carved art",
  description:
    "Handmade furniture and carved sculpture from Cameroon. Each piece is worked by hand in local hardwoods — padauk, iroko, mahogany — and made one at a time.",

  // TODO: replace with the real domain once it is registered
  url: "https://kevinsartsandcrafts.com",

  email: "Kevinnumia@yahoo.com",

  /** Calls and SMS — the Cameroon line. */
  phoneDisplay: "+237 670 45 16 70",
  /** What tel: needs: country code, no spaces. */
  phoneTel: "+237670451670",

  /** WhatsApp is a separate line, in the UAE — not the number above. */
  whatsappDisplay: "+971 52 290 5700",
  /** Digits only, with country code, no + or spaces — this is what wa.me needs. */
  whatsapp: "971522905700",

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

  founder: "Kevin",
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
