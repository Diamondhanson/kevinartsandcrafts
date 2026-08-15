import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import {
  ButtonAnchor,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  WhatsAppIcon,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `Commission a piece, ask about restoration, or arrange a visit to the workshop in ${site.location.city}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact · ${site.name}`,
    description: "Commission a piece, ask about restoration, or arrange a workshop visit.",
    url: "/contact",
  },
};

const faqs = [
  {
    q: "How long does a commission take?",
    a: "Between four and fourteen weeks depending on the piece and what is already on the bench. Carved work takes longer than furniture. You will be given a real date before anything is agreed, not an optimistic one.",
  },
  {
    q: "How is a price worked out?",
    a: "By the timber and the hours, not by a catalogue. Larger pieces in figured boards cost more; a simple piece in a plain board costs less. You get a fixed price in writing after the drawing is agreed, and it does not move unless you change the design.",
  },
  {
    q: "Do you deliver?",
    a: `Anywhere in ${site.location.country}, arranged and quoted per piece. For international shipping, tell us the destination and we will get a crated freight quote — it is usually less than people expect for a single piece.`,
  },
  {
    q: "Can you copy a piece I have seen?",
    a: "We will not reproduce another maker's design. But if you show us something you like, we can design something in that spirit that suits your room and is properly ours.",
  },
  {
    q: "Do you take on repairs?",
    a: "Yes. Send photographs of the damage and a note on what happened. Some pieces are worth restoring and some are not — you will get an honest answer either way before any money changes hands.",
  },
  {
    q: "What is the deposit?",
    a: "Half on agreement of the drawing, half on completion before delivery. The deposit covers the timber, which has to be bought before work can begin.",
  },
];

export default async function ContactPage() {
  const products = await getAllProducts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    openingHours: "Mo-Sa 08:00-18:00",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-14 sm:pt-20 lg:pt-24">
        <Container>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-[2.6rem] leading-[1.06] sm:text-[3.4rem] lg:text-[4rem]">
              Tell us what you have in mind
            </h1>
            <p className="mt-7 max-w-[58ch] text-[1.0625rem] leading-[1.8] text-graphite">
              Whether it is a whole dining table or a repair to something you inherited, start
              with a message. WhatsApp is the quickest way to reach the workshop.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="!pt-14 sm:!pt-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.62fr] lg:gap-20">
            <Reveal>
              <div id="enquire" className="scroll-mt-28">
                <h2 className="text-[1.75rem] sm:text-[2rem]">Send an enquiry</h2>
                <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-graphite">
                  Fill this in and it comes straight to the workshop.
                </p>
                <div className="mt-10">
                  <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
                    <EnquiryForm
                      products={products.map((p) => ({ slug: p.slug, name: p.name }))}
                    />
                  </Suspense>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <aside className="lg:sticky lg:top-28">
                <div className="border border-stone bg-linen p-8 sm:p-10">
                  <Eyebrow>Fastest reply</Eyebrow>
                  <p className="mt-5 text-[1.0625rem] leading-[1.75] text-graphite">
                    Messages on WhatsApp are usually answered the same day. Send a photograph
                    of your room or the piece you need repaired and it saves a lot of
                    explaining.
                  </p>
                  <ButtonAnchor
                    href={whatsappLink(`Hello ${site.founder}, I found you through your website.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 w-full"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Open WhatsApp
                  </ButtonAnchor>
                </div>

                <dl className="mt-10 flex flex-col gap-7">
                  <div>
                    <dt className="eyebrow">Email</dt>
                    <dd className="mt-2.5">
                      <a
                        href={`mailto:${site.email}`}
                        className="link-underline text-[1.0625rem] text-ink"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Phone</dt>
                    <dd className="mt-2.5">
                      <a
                        href={`tel:${site.phoneDisplay.replace(/\s/g, "")}`}
                        className="link-underline text-[1.0625rem] text-ink"
                      >
                        {site.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Workshop</dt>
                    <dd className="mt-2.5 text-[1.0625rem] leading-relaxed text-graphite">
                      {site.location.street}
                      <br />
                      {site.location.city}, {site.location.country}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Open</dt>
                    <dd className="mt-2.5 text-[1.0625rem] text-graphite">{site.hours}</dd>
                  </div>
                </dl>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="linen">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Before you ask" title="Questions we get a lot" />
          </Reveal>

          <div className="mt-14 grid gap-x-16 gap-y-10 lg:grid-cols-2">
            {faqs.map((faq, index) => (
              <Reveal key={faq.q} delay={(index % 2) * 90}>
                <div className="border-t border-stone pt-6">
                  <h3 className="text-[1.25rem] leading-snug">{faq.q}</h3>
                  <p className="mt-3 text-[1rem] leading-[1.85] text-graphite">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
