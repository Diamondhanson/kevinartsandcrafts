import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Craft",
  description:
    "How a piece is made at Kivens Arts and Crafts — from choosing the board to the final coat of wax. Hand tools, cut joints and no shortcuts.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: `The Craft · ${site.name}`,
    description: "From choosing the board to the final coat of wax.",
    url: "/process",
  },
};

const steps = [
  {
    n: "01",
    title: "Choosing the board",
    body: "Timber is bought as boards and picked one at a time, for grain and colour rather than price. A board with a live edge worth keeping decides what it becomes. Everything is stacked and left to settle before a single cut is made — wood that has not dried properly will move later, and no amount of skill afterwards will fix it.",
  },
  {
    n: "02",
    title: "Drawing and setting out",
    body: "For a commission, the drawing comes first, and it is drawn around the room it is going into: the ceiling height, the door it has to come through, the chairs already at the table. Once it is agreed, the shapes are marked directly onto the timber in chalk and pencil, working with the grain rather than across it.",
  },
  {
    n: "03",
    title: "Cutting and carving",
    body: "Sawn close, then worked down with chisels, gouges and a plane. Carved pieces are cut from a single block wherever the design allows — the interlaced forms are not assembled from parts, they are opened out of one solid piece. There is no undo. A cut in the wrong place ends the piece.",
  },
  {
    n: "04",
    title: "Fitting the joints",
    body: "Joints are cut to fit rather than filled. Each one is pared back a shaving at a time and tested dry until it goes together with hand pressure and stays there. Where a piece can hold itself together with geometry instead of hardware, it does — that is why the stool has no screws in its base.",
  },
  {
    n: "05",
    title: "Surfacing",
    body: "The plane does the work a sander cannot: it cuts the fibres cleanly instead of tearing them, which is what gives hand-worked wood its depth under light. Surfaces are worked until they are true against a straight edge, then finished off the blade or lightly abraded, depending on the piece.",
  },
  {
    n: "06",
    title: "Finishing",
    body: "Oil goes on by hand in thin coats, each one left to cure and cut back before the next. Then beeswax, buffed. It takes several days and it can be repaired at home years later with nothing more than a cloth — unlike a sprayed lacquer, which has to be stripped.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="pt-14 sm:pt-20 lg:pt-24">
        <Container>
          <Reveal>
            <Eyebrow>The craft</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-[2.6rem] leading-[1.06] sm:text-[3.4rem] lg:text-[4rem]">
              From a rough board to a finished piece
            </h1>
            <p className="mt-7 max-w-[58ch] text-[1.0625rem] leading-[1.8] text-graphite">
              Nothing here is quick, and that is the point. Six stages, most of them done with
              tools that have not changed in two hundred years.
            </p>
          </Reveal>
        </Container>

        <Container className="mt-14 sm:mt-20">
          <Reveal>
            <div className="relative aspect-16/10 w-full overflow-hidden bg-linen sm:aspect-21/9">
              <Image
                src="/images/lifestyle/craftsman-at-work.jpg"
                alt="Kiven planing a padauk board by hand, tools laid out around him"
                fill
                sizes="100vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-x-16 gap-y-14 sm:grid-cols-2">
            {steps.map((step, index) => (
              <Reveal key={step.n} delay={(index % 2) * 90}>
                <article className="border-t border-stone pt-7">
                  <span className="font-display text-[0.9375rem] tracking-[0.1em] text-clay">
                    {step.n}
                  </span>
                  <h2 className="mt-4 text-[1.5rem] leading-tight sm:text-[1.75rem]">
                    {step.title}
                  </h2>
                  <p className="mt-4 text-[1rem] leading-[1.85] text-graphite">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* tools band */}
      <section className="relative">
        <div className="relative aspect-21/9 w-full sm:aspect-[3/1]">
          <Image
            src="/images/details/tools-bench.jpg"
            alt="Carving gouges and chisels laid out across a workbench"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <Section tone="linen">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Living with it"
                title="How to care for a piece"
                intro="Very little, and rarely. Dust it with a dry cloth. Keep it out of direct sun and away from an air conditioner blowing straight at it. If the surface ever looks dry or a mark appears, a thin coat of the same oil rubbed in by hand will take it out — that is the advantage of an oil finish over a lacquer."
              />
              <p className="mt-7 max-w-[56ch] text-[1.0625rem] leading-[1.8] text-graphite">
                Padauk darkens as it ages. A piece that arrives bright orange-red will settle
                over two or three years into a deep brown-red. That is not a fault and it
                cannot be prevented — it is the wood doing what it has always done.
              </p>
              <div className="mt-9">
                <ButtonLink href="/contact" tone="outline">
                  Ask about care
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative aspect-4/5 overflow-hidden bg-bone">
                <Image
                  src="/images/details/chisel-cut.jpg"
                  alt="A chisel paring a curve into a board, shavings gathered around the cut"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
