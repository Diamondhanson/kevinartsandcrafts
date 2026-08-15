import type { Metadata } from "next";
import { getAllProducts, getCategories } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Hand-carved furniture, sculpture and homeware from the Kivens workshop. Each piece is made one at a time in local hardwoods.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: `The Collection · ${site.name}`,
    description:
      "Hand-carved furniture, sculpture and homeware, made one at a time in local hardwoods.",
    url: "/products",
  },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);

  return (
    <>
      <section className="pb-4 pt-14 sm:pt-20 lg:pt-24">
        <Container>
          <Reveal>
            <Eyebrow>The collection</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-[2.6rem] leading-[1.06] sm:text-[3.4rem] lg:text-[4rem]">
              Every piece here was made once
            </h1>
            <p className="mt-7 max-w-[58ch] text-[1.0625rem] leading-[1.8] text-graphite">
              Some are available now, some are examples of what can be built for you. Either
              way, prices depend on the timber and the size — so tell us what you are after
              and you will get a real number.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="!pt-12">
        <Container>
          <ProductGrid products={products} categories={categories} />
        </Container>
      </Section>
    </>
  );
}
