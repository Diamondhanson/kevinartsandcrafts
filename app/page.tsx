import Image from "next/image";
import type { Metadata } from "next";
import { getFeaturedProducts } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import {
  ButtonAnchor,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  TextLink,
  WhatsAppIcon,
} from "@/components/ui";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const featured = await getFeaturedProducts(3);

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-16 lg:pb-36 lg:pt-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-xl">
              <Reveal>
                <Eyebrow>{site.location.city}, {site.location.country}</Eyebrow>
              </Reveal>

              <Reveal delay={90}>
                <h1 className="mt-7 text-[2.75rem] leading-[1.04] sm:text-[3.75rem] lg:text-[4.5rem]">
                  Made by hand,
                  <br />
                  <span className="italic text-clay">one at a time.</span>
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <p className="mt-8 max-w-[52ch] text-[1.125rem] leading-[1.75] text-graphite">
                  Furniture and carved sculpture in local hardwoods — padauk, iroko,
                  mahogany. No production line, no two the same. Just timber, hand tools
                  and the time a piece takes.
                </p>
              </Reveal>

              <Reveal delay={270}>
                <div className="mt-11 flex flex-wrap items-center gap-4">
                  <ButtonLink href="/products">View the collection</ButtonLink>
                  <ButtonLink href="/contact" tone="outline">
                    Commission a piece
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            {/* w-full matters: as a grid item this would otherwise size to
                max-content and collapse the w-full/aspect-square child to zero */}
            <Reveal delay={140} className="w-full">
              <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-[9%] bottom-[3%] top-[2%] rounded-t-full bg-linen"
                />
                <Image
                  src="/images/products/padauk-stool-cutout.png"
                  alt="The Entwined Stool — a hand-carved padauk stool with three interlaced branch legs"
                  fill
                  priority={false}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 88vw, 34rem"
                  className="object-contain p-6 drop-shadow-[0_26px_34px_rgba(28,25,23,0.16)] sm:p-8"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- statement */}
      <Section tone="linen" className="!py-16 sm:!py-20">
        <Container>
          <Reveal>
            <p className="mx-auto max-w-4xl text-center font-display text-[1.5rem] leading-[1.5] sm:text-[2rem] lg:text-[2.35rem]">
              A piece of furniture should outlive the person who bought it.
              That is the only standard worth working to.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* -------------------------------------------------------- featured */}
      <Section>
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                eyebrow="Selected work"
                title="Recent pieces"
                intro="A few of the pieces that have left the workshop. Every one of them was cut, shaped and finished by hand."
              />
              <TextLink href="/products" className="pb-2 text-ink hover:text-clay">
                All pieces
              </TextLink>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, index) => (
              <Reveal key={product.slug} delay={index * 100}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------- fitted storage */}
      <Section tone="linen">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Fitted storage"
              title="Wardrobes, built to the room"
              intro="Alongside the carved work, the workshop builds wardrobe and storage units — hanging rails, adjustable shelving, drawers and pull-out racks, arranged around what actually has to go in them."
            />
          </Reveal>

          {/* 16:9 to match the source file exactly — the brand mark sits at the
              top of the image, so any crop would cut into it */}
          <Reveal delay={120}>
            <div className="relative mt-14 aspect-16/9 w-full overflow-hidden bg-bone">
              <Image
                src="/images/lifestyle/wardrobe-range.jpg"
                alt="Three wardrobe units in black and white, each with a hanging rail, adjustable shelves, drawers with brass handles and pull-out racks below"
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------- the craft */}
      <section className="relative">
        <div className="relative aspect-16/10 w-full sm:aspect-21/9">
          <Image
            src="/images/lifestyle/craftsman-at-work.jpg"
            alt="Kiven planing a padauk board by hand on the workshop floor"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* relative z-10: the image band above is positioned, so a static
            container would be painted underneath it */}
        <Container className="relative z-10 -mt-16 sm:-mt-24 lg:-mt-32">
          <Reveal>
            <div className="max-w-2xl bg-bone p-9 sm:p-14 lg:p-16">
              <Eyebrow>The craft</Eyebrow>
              <h2 className="mt-6 text-[2rem] leading-[1.14] sm:text-[2.6rem]">
                Hand tools, and the time it takes
              </h2>
              <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-[1.8] text-graphite">
                A plane, a set of chisels, a mallet and a saw. The joints are cut to fit
                rather than filled, the surfaces are worked until they are true, and the
                finish goes on by hand in thin coats over several days. It is slower. It
                is also the reason these pieces do not come apart.
              </p>
              <div className="mt-9">
                <TextLink href="/process" className="text-ink hover:text-clay">
                  How a piece is made
                </TextLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------- materials */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-4/3 overflow-hidden bg-linen">
                <Image
                  src="/images/details/joint.jpg"
                  alt="Close view of the three padauk legs where they cross and lock together"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading
                eyebrow="Materials"
                title="Padauk, iroko, mahogany"
                intro="Timber is chosen board by board, for grain and colour rather than convenience. Padauk comes off the saw a bright orange-red and settles over a few years into a deep, quiet brown-red — the piece you receive will not be the piece you own in ten years' time."
              />
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-stone pt-8">
                {[
                  ["Sourcing", "Local hardwoods, bought as boards"],
                  ["Joinery", "Cut to fit, not filled"],
                  ["Finish", "Oil and beeswax, applied by hand"],
                  ["Fixings", "As few as the piece allows"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="eyebrow">{label}</dt>
                    <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-graphite">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------- testimonial */}
      <Section tone="linen">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow className="!text-ash">In their words</Eyebrow>
              <blockquote className="mt-8">
                <p className="font-display text-[1.5rem] leading-[1.5] sm:text-[1.9rem]">
                  “We asked for a dining table and got something the whole family argues
                  over who inherits. Four years on it has not moved a millimetre.”
                </p>
                <footer className="mt-8 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-graphite">
                  {/* TODO: replace with a real client and their words */}
                  A client · Douala
                </footer>
              </blockquote>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- CTA */}
      <Section tone="ink">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <Reveal>
              <div>
                <Eyebrow className="!text-ash">Commissions</Eyebrow>
                <h2 className="mt-6 text-[2.1rem] leading-[1.12] sm:text-[2.9rem]">
                  Have something in mind?
                </h2>
                <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.8] text-stone">
                  Most of what leaves this workshop was made for one person and one room.
                  Tell us what you need — the size, the space, roughly when — and you will
                  get a drawing and a price before anything is cut.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex flex-col items-start gap-4 sm:flex-row lg:flex-col">
                <ButtonLink href="/contact" tone="light" className="!bg-bone !text-ink hover:!bg-clay hover:!text-bone">
                  Start a conversation
                </ButtonLink>
                <ButtonAnchor
                  href={whatsappLink(`Hello ${site.founder}, I would like to commission a piece.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  tone="light"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Message on WhatsApp
                </ButtonAnchor>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
