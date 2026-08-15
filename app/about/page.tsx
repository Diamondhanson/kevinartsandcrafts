import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `The workshop behind ${site.name} — who makes the work, where it is made, and what it is made for.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${site.name}`,
    description: "The workshop, the maker, and the standard the work is held to.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-14 sm:pt-20 lg:pt-24">
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <Reveal>
              <Eyebrow>About</Eyebrow>
              <h1 className="mt-6 text-[2.6rem] leading-[1.06] sm:text-[3.4rem] lg:text-[4rem]">
                A workshop in {site.location.city}
              </h1>
              <p className="mt-7 max-w-[56ch] text-[1.125rem] leading-[1.8] text-graphite">
                {site.name} is a small hand workshop making furniture, carved sculpture and
                homeware in local hardwoods. One maker, hand tools, and pieces that leave one
                at a time.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative aspect-4/3 overflow-hidden bg-linen">
                <Image
                  src="/images/lifestyle/craftsman-portrait.jpg"
                  alt={`${site.founder} seated in the workshop with his hand tools laid out around him`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  loading="eager"
                  fetchPriority="high"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <Container size="narrow">
          <Reveal>
            <div className="flex flex-col gap-7">
              <p className="font-display text-[1.5rem] leading-[1.55] sm:text-[1.85rem]">
                The work started the way it usually does — repairing things that other people
                had given up on.
              </p>
              <p className="text-[1.0625rem] leading-[1.9] text-graphite">
                {/* TODO: replace this section with Kiven's own words — where he trained, who
                    taught him, and how the workshop came about. */}
                Chairs with loose joints, a table with a split top, a door that had swollen and
                stopped closing. Taking apart furniture built by someone else is the fastest way
                to learn how it should have been built in the first place — you find out exactly
                which joints survive thirty years of use and which ones were only ever holding on
                because of the glue.
              </p>
              <p className="text-[1.0625rem] leading-[1.9] text-graphite">
                That is still how the work is approached. Every piece is built on the assumption
                that someone will take it apart in fifty years, and that they should find it
                honest when they do — joints cut to fit, timber chosen properly, and no filler
                hiding a gap that should not be there.
              </p>
              <p className="text-[1.0625rem] leading-[1.9] text-graphite">
                Alongside the furniture there is the carving, which came later and answers a
                different need. A stool has to hold someone up. A carved form only has to be
                worth looking at. Both take the same hands and the same tools, and each one
                teaches the other something.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="linen">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="What we stand for"
                title="Four things that do not change"
              />
            </Reveal>

            <Reveal delay={120}>
              <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
                {[
                  [
                    "One at a time",
                    "Nothing is batched. Each piece is finished before the next is started, which is why lead times are what they are.",
                  ],
                  [
                    "Honest joints",
                    "If a joint needs filler to close, it was cut wrong. It gets cut again.",
                  ],
                  [
                    "Local timber",
                    "Padauk, iroko and mahogany, bought as boards from suppliers we know, not imported panels.",
                  ],
                  [
                    "Repairable forever",
                    "Oil and wax finishes, mechanical joints. Anything that happens to it can be put right.",
                  ],
                ].map(([title, body]) => (
                  <div key={title} className="border-t border-stone pt-6">
                    <dt className="font-display text-[1.25rem]">{title}</dt>
                    <dd className="mt-3 text-[0.9375rem] leading-[1.8] text-graphite">{body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="relative aspect-4/3 overflow-hidden bg-linen">
                <Image
                  src="/images/details/carving.jpg"
                  alt="Close view of the carved faces on Bearers of the Bowl"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>

              <div>
                <SectionHeading
                  eyebrow="Visit"
                  title="Come and see the work"
                  intro={`The workshop is in ${site.location.city}. If you are nearby, it is far better to handle a piece than to look at a photograph of one — the weight and the surface are most of what you are buying. Message ahead and there will be something on the bench to see.`}
                />
                <div className="mt-9 flex flex-wrap gap-4">
                  <ButtonLink href="/contact">Arrange a visit</ButtonLink>
                  <ButtonLink href="/products" tone="outline">
                    See the collection
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
