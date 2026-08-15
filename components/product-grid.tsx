"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import type { Category, Product } from "@/lib/types";

/**
 * The catalogue grid with its category filter.
 *
 * The filter is deliberately client-side rather than driven by a URL search
 * param: reading searchParams would opt the page into dynamic rendering, and
 * this page is far better off prerendered — it is the page Google will index.
 */
export function ProductGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [active, setActive] = useState<string>("all");

  const used = useMemo(
    () => categories.filter((category) => products.some((p) => p.category === category.slug)),
    [categories, products],
  );

  const shown = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [active, products],
  );

  const activeCategory = used.find((category) => category.slug === active);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 border-y border-stone py-4">
        <FilterButton active={active === "all"} onClick={() => setActive("all")}>
          Everything
        </FilterButton>
        {used.map((category) => (
          <FilterButton
            key={category.slug}
            active={active === category.slug}
            onClick={() => setActive(category.slug)}
          >
            {category.name}
          </FilterButton>
        ))}
      </div>

      <p
        aria-live="polite"
        className="mt-6 min-h-[1.5rem] max-w-[58ch] text-[0.9375rem] leading-relaxed text-graphite"
      >
        {activeCategory
          ? activeCategory.description
          : `${products.length} pieces, each one made by hand and one at a time.`}
      </p>

      <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((product, index) => (
          <Reveal key={product.slug} delay={(index % 3) * 90}>
            <ProductCard product={product} priority={index < 3} />
          </Reveal>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="py-20 text-center text-graphite">
          Nothing in this category yet — please check back soon.
        </p>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
        active ? "bg-ink text-bone" : "text-graphite hover:bg-linen hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
