import { cache } from "react";
import { categories as sampleCategories, products as sampleProducts } from "@/content/products";
import { selectFrom, supabaseConfigured } from "@/lib/supabase/rest";
import type { Category, CategorySlug, Product, ProductImage } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 * THE ONE PLACE THE SITE READS PRODUCTS FROM
 * ---------------------------------------------------------------------------
 * Every page calls these functions and nothing else. Today they return the
 * sample catalogue in content/products.ts. The moment NEXT_PUBLIC_SUPABASE_URL
 * and NEXT_PUBLIC_SUPABASE_ANON_KEY appear in .env.local, they read from
 * Supabase instead — with the sample data as a fallback if the database is
 * unreachable, so the site never shows an empty catalogue.
 *
 * No page or component needs to change when you switch over.
 * ---------------------------------------------------------------------------
 */

type ProductRow = {
  slug: string;
  name: string;
  category: CategorySlug;
  summary: string;
  story: string[] | null;
  materials: string | null;
  dimensions: string | null;
  finish: string | null;
  lead_time: string | null;
  price: number | null;
  currency: string | null;
  year: number | null;
  featured: boolean | null;
  available: boolean | null;
  sort_order: number | null;
  product_images: { src: string; alt: string | null; kind: string | null; sort_order: number | null }[] | null;
};

function rowToProduct(row: ProductRow): Product {
  const images: ProductImage[] = (row.product_images ?? [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((image) => ({
      src: image.src,
      alt: image.alt ?? row.name,
      kind: image.kind === "scene" ? "scene" : "cutout",
    }));

  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    summary: row.summary,
    story: row.story ?? [],
    images,
    materials: row.materials ?? "—",
    dimensions: row.dimensions ?? "—",
    finish: row.finish ?? "—",
    leadTime: row.lead_time ?? "Ask",
    price: row.price,
    currency: row.currency ?? "XAF",
    year: row.year ?? new Date().getFullYear(),
    featured: Boolean(row.featured),
    available: row.available ?? true,
  };
}

export const getAllProducts = cache(async (): Promise<Product[]> => {
  if (supabaseConfigured) {
    const rows = await selectFrom<ProductRow>(
      "products",
      "select=*,product_images(*)&available=eq.true&order=sort_order.asc",
    );
    if (rows && rows.length > 0) return rows.map(rowToProduct);
  }
  return sampleProducts;
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const all = await getAllProducts();
  return all.find((product) => product.slug === slug) ?? null;
});

export const getFeaturedProducts = cache(async (limit = 3): Promise<Product[]> => {
  const all = await getAllProducts();
  const featured = all.filter((product) => product.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
});

export const getCategories = cache(async (): Promise<Category[]> => {
  if (supabaseConfigured) {
    const rows = await selectFrom<Category>("categories", "select=slug,name,description&order=sort_order.asc");
    if (rows && rows.length > 0) return rows;
  }
  return sampleCategories;
});

/** Other pieces to show at the bottom of a product page. */
export const getRelatedProducts = cache(
  async (slug: string, limit = 3): Promise<Product[]> => {
    const all = await getAllProducts();
    const current = all.find((product) => product.slug === slug);
    if (!current) return all.slice(0, limit);

    const sameCategory = all.filter((p) => p.slug !== slug && p.category === current.category);
    const rest = all.filter((p) => p.slug !== slug && p.category !== current.category);
    return [...sameCategory, ...rest].slice(0, limit);
  },
);

export function formatPrice(product: Pick<Product, "price" | "currency">) {
  if (product.price === null) return "Price on request";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: product.currency,
    maximumFractionDigits: 0,
  }).format(product.price);
}
