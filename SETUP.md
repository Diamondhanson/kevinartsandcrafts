# Kivens Arts and Crafts — setup guide

Written for someone who is not a developer. Follow it top to bottom.

---

## 1. Run the site on your computer

You need [Node.js](https://nodejs.org) version 20 or newer installed. Then, in a terminal:

```bash
cd kevin-arts-and-crafts
npm install
npm run dev
```

Open **http://localhost:3000**. That is the whole site, running locally.

Press `Ctrl + C` in the terminal to stop it.

---

## 2. Change the business details

**Open `lib/site.ts`.** Everything about the business lives in this one file — the name,
phone number, WhatsApp number, email, address, opening hours and social links. Change it here
and it updates the header, the footer, every WhatsApp button, the contact page and the
information Google reads.

The values marked `TODO` are placeholders and **must** be replaced before going live:

| Field | What to put |
|---|---|
| `url` | Your real domain, e.g. `https://kivensartsandcrafts.com` |
| `email` | The inbox you actually check |
| `phoneDisplay` | The number as you want it shown, spaces and all |
| `whatsapp` | **Digits only, with country code, no `+` and no spaces.** For `+237 6 12 34 56 78` write `237612345678` |
| `location.street` | The workshop's street address |
| `social` | Your real Instagram and Facebook pages |

> The WhatsApp number is the one to get right. If it is wrong, every WhatsApp button on the
> site opens an empty chat.

---

## 3. Add or change a product

**Open `content/products.ts`.**

1. Put your photographs in `public/images/products/`
2. Copy one whole `{ ... }` block and paste it at the top of the list
3. Edit the text

The fields:

- `slug` — the web address for the piece. Lowercase, hyphens instead of spaces, no accents.
  Must be unique. `entwined-stool` becomes `yoursite.com/products/entwined-stool`.
- `category` — one of `furniture`, `sculpture`, `homeware`, `restoration`
- `summary` — one line, shown under the name in the grid
- `story` — the paragraphs on the piece's own page. The first one is set larger.
- `images` — the first image is the one shown in the grid. Set `kind` to `"cutout"` for a
  photo of the piece on a plain background, or `"scene"` for a photo in a room or the workshop.
- `price` — `null` shows "Price on request". A number shows the price.
- `featured` — set `true` on the three pieces you want on the home page.

### Photographs

Good photographs are the single biggest thing that will improve this site. You do not need a
professional camera — a phone works — but you do need:

- **Daylight**, near a window or outside in the shade. Never a flash.
- **A plain background** — a wall, a sheet, a door.
- **The whole piece in frame**, straight on, plus two or three close-ups of the joints, the
  grain, and the finish.
- **The largest size your phone will take.** They can always be made smaller.

Send them over and they can be cleaned up, cut out and sized for the site.

---

## 4. Connect the database (Supabase) — optional

Right now the catalogue comes from `content/products.ts`. That works perfectly well and costs
nothing. Connect Supabase when you want to edit products from a dashboard instead of a file.

1. Create a free project at **https://supabase.com**
2. In your project, open **SQL Editor** in the left sidebar
3. Open `supabase/schema.sql` from this project, copy the whole file, paste it in, press **Run**
4. Go to **Settings → API** and copy the **Project URL** and the **anon public** key
5. In this project, copy `.env.example` to a new file called `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

6. Restart `npm run dev`

The site now reads products from Supabase. **If the database is empty or unreachable it falls
back to `content/products.ts`**, so the site can never end up showing an empty catalogue.

Add products through **Table Editor → products** in the Supabase dashboard. Images go in
`product_images`, linked by `product_id`.

---

## 5. Turn on enquiry emails (Resend) — optional

Until this is set up, enquiries are printed in the terminal instead of being emailed. The form
still works and still says thank you, so you can demo it safely.

1. Sign up at **https://resend.com** — the free tier sends 3,000 emails a month
2. Add and verify your domain (or skip this while testing and use `onboarding@resend.dev`)
3. Create an API key
4. Add to `.env.local`:

```
RESEND_API_KEY=re_xxxxx
CONTACT_FROM_EMAIL=hello@yourdomain.com
CONTACT_TO_EMAIL=the-inbox-you-check@gmail.com
```

5. Restart the dev server

Enquiries now arrive by email, with the customer's address set as reply-to so you can just hit
reply. If Supabase is also connected, every enquiry is saved there too, so nothing is lost if
an email fails.

---

## 6. Put it on the internet

The easiest route is **Vercel**, who make Next.js. Free for a site like this.

1. Push this project to GitHub
2. Go to **https://vercel.com**, sign in with GitHub, click **Add New → Project**
3. Choose the repository. Vercel detects Next.js automatically — do not change any settings
4. Before deploying, open **Environment Variables** and add the same values from your
   `.env.local` (if you set any up)
5. Click **Deploy**

You get a working address in about a minute.

**To use your own domain:** buy it anywhere, then in Vercel go to your project →
**Settings → Domains** → add it, and follow the DNS instructions they give you.

> After adding your domain, remember to change `url` in `lib/site.ts` to match. That is what
> the sitemap and the social sharing previews use.

Once it is on GitHub + Vercel, **every change you push goes live automatically**.

---

## 7. What is where

```
app/                 the pages
  page.tsx           home
  products/          catalogue and individual pieces
  process/           the craft page
  about/             about
  contact/           contact and FAQ
  actions/           the enquiry form's server code
  globals.css        colours, fonts and shared styles
  fonts/             the two typefaces, self-hosted
  icon.svg           the browser tab icon
  opengraph-image    the picture shown when the site is shared

components/          the reusable parts (header, footer, cards, form…)
content/products.ts  THE CATALOGUE — this is the file you edit most
lib/site.ts          THE BUSINESS DETAILS — the other file you edit most
lib/products.ts      decides whether to read from the file or from Supabase
supabase/schema.sql  the database structure
public/images/       all the photographs
```

---

## 8. Things worth doing soon

- [ ] Replace the placeholder contact details in `lib/site.ts`
- [ ] Replace the testimonial on the home page with a real client's words
      (`app/page.tsx`, search for `TODO`)
- [ ] Rewrite the middle of the About page in Kiven's own words
      (`app/about/page.tsx`, search for `TODO`)
- [ ] Take better photographs of each piece and replace the ones in `public/images/products/`
- [ ] Buy the domain and point it at Vercel
- [ ] Set up a Google Business Profile — for a local workshop it brings more enquiries than the
      website does on its own, and it links back here

---

## Design reference

If you or another developer need to keep things consistent:

**Colours** (defined in `app/globals.css`)

| Name | Hex | Use |
|---|---|---|
| bone | `#FAF7F2` | page background |
| linen | `#F1ECE4` | alternating sections, cards |
| stone | `#DBD4C8` | hairlines and borders |
| ash | `#A89F93` | quiet text on dark backgrounds |
| graphite | `#57504A` | body text |
| ink | `#1C1917` | headings, dark sections |
| clay | `#9E5B41` | the single accent — links, small marks |

**Type**

- Headings — Fraunces, weight 400
- Body and UI — Manrope
- Small labels — Manrope 600, uppercase, `0.28em` letter-spacing (the `.eyebrow` class)

Both typefaces are self-hosted in `app/fonts/` under the SIL Open Font License, so the site
loads no third-party fonts and makes no request to Google.
