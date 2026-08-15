export type CategorySlug = "furniture" | "sculpture" | "homeware" | "restoration";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  /** "cutout" images sit on white and are shown contained; "scene" images fill their frame. */
  kind: "cutout" | "scene";
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  /** One line, shown under the name in the grid. */
  summary: string;
  /** Two or three paragraphs for the detail page. */
  story: string[];
  images: ProductImage[];
  materials: string;
  dimensions: string;
  finish: string;
  leadTime: string;
  /** null renders as "Price on request" — the default for commissioned work. */
  price: number | null;
  currency: string;
  year: number;
  featured: boolean;
  available: boolean;
};
