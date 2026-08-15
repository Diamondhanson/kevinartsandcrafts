import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatPrice,
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { pieceEnquiryMessage, site, whatsappLink } from "@/lib/site";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import {
  ButtonAnchor,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  WhatsAppIcon,
} from "@/components/ui";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Piece not found" };

  const description = `${product.summary}. ${product.materials}, ${product.dimensions}. Made by hand at ${site.name}.`;

  return {
    title: product.name,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "article",
      title: `${product.name} · ${site.name}`,
      description,
      url: `/products/${product.slug}`,
      images: product.images[0] ? [{ url: product.images[0].src }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = await getRelatedProducts(slug, 3);

  const specs: [string, string][] = [
    ["Materials", product.materials],
    ["Dimensions", product.dimensions],
    ["Finish", product.finish],
    ["Lead time", product.leadTime],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.images.map((image) => `${site.url}${image.src}`),
    material: product.materials,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      ...(product.price !== null ? { price: product.price } : {}),
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: site.name },
      url: `${site.url}/products/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="text-[0.75rem] uppercase tracking-[0.16em] text-ash">
          <Link href="/products" className="link-underline hover:text-ink">
            Collection
          </Link>
          <span className="px-2.5">/</span>
          <span className="text-graphite">{product.name}</span>
        </nav>
      </Container>

      <section className="pb-16 pt-8 sm:pb-24 sm:pt-10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <ProductGallery images={product.images} name={product.name} />

            <div className="lg:pt-2">
              <Eyebrow>{product.year}</Eyebrow>
              <h1 className="mt-5 text-[2.4rem] leading-[1.08] sm:text-[3rem]">{product.name}</h1>
              <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-[1.75] text-graphite">
                {product.summary}
              </p>

              <p className="mt-7 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-clay">
                {formatPrice(product)}
              </p>

              <div className="mt-9 flex flex-col gap-3 xs:flex-row lg:flex-col xl:flex-row">
                <ButtonAnchor
                  href={whatsappLink(pieceEnquiryMessage(product.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Enquire on WhatsApp
                </ButtonAnchor>
                <ButtonLink href={`/contact?piece=${product.slug}#enquire`} tone="outline">
                  Send an enquiry
                </ButtonLink>
              </div>

              <dl className="mt-12 border-t border-stone">
                {specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-6 border-b border-stone py-4"
                  >
                    <dt className="eyebrow">{label}</dt>
                    <dd className="text-right text-[0.9375rem] text-graphite">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {product.story.length > 0 && (
        <Section tone="linen" className="!py-20 sm:!py-28">
          <Container>
            <Reveal>
              <div className="mx-auto max-w-2xl">
                <Eyebrow>About this piece</Eyebrow>
                <div className="mt-8 flex flex-col gap-6">
                  {product.story.map((paragraph, index) => (
                    <p
                      key={index}
                      className={
                        index === 0
                          ? "font-display text-[1.375rem] leading-[1.6] sm:text-[1.6rem]"
                          : "text-[1.0625rem] leading-[1.85] text-graphite"
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section>
          <Container>
            <Reveal>
              <div className="flex items-end justify-between gap-8 border-b border-stone pb-6">
                <h2 className="text-[1.75rem] sm:text-[2.1rem]">Other pieces</h2>
                <Link
                  href="/products"
                  className="link-underline pb-1.5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] hover:text-clay"
                >
                  View all
                </Link>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 100}>
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
