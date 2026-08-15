import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const image = product.images[0];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* cutout photographs already sit on bone, so the frame has to match them
          or you get a visible box-within-a-box */}
      <div
        className={`relative aspect-4/5 overflow-hidden ${
          image?.kind === "cutout" ? "bg-bone" : "bg-linen"
        }`}
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className={`transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] ${
              image.kind === "cutout"
                ? "object-contain p-6 drop-shadow-[0_14px_22px_rgba(28,25,23,0.13)] sm:p-8"
                : "object-cover"
            }`}
          />
        )}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-stone/60" />
      </div>

      <div className="flex items-baseline justify-between gap-4 pt-5">
        <h3 className="font-display text-[1.35rem] leading-tight transition-colors group-hover:text-clay">
          {product.name}
        </h3>
        <span className="shrink-0 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ash">
          {product.year}
        </span>
      </div>

      <p className="mt-2 max-w-[42ch] text-[0.9375rem] leading-relaxed text-graphite">
        {product.summary}
      </p>

      <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-clay">
        {formatPrice(product)}
      </p>
    </Link>
  );
}
