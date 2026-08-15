"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/types";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const current = images[index];

  if (!current) {
    return <div className="aspect-4/3 w-full bg-linen" aria-hidden="true" />;
  }

  return (
    <div>
      <div
        className={`relative aspect-4/3 overflow-hidden ${
          current.kind === "cutout" ? "bg-bone" : "bg-linen"
        }`}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          loading="eager"
          fetchPriority="high"
          className={
            current.kind === "cutout"
              ? "object-contain p-8 drop-shadow-[0_20px_30px_rgba(28,25,23,0.14)] sm:p-12"
              : "object-cover"
          }
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-stone/60" />
      </div>

      {images.length > 1 && (
        <div
          className="mt-4 grid grid-cols-4 gap-3 sm:gap-4"
          role="tablist"
          aria-label={`${name} — more views`}
        >
          {images.map((image, i) => (
            <button
              key={image.src + i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`View ${i + 1} of ${images.length}`}
              onClick={() => setIndex(i)}
              className={`relative aspect-square overflow-hidden transition-opacity duration-300 ${
                image.kind === "cutout" ? "bg-bone" : "bg-linen"
              } ${
                i === index ? "opacity-100" : "opacity-55 hover:opacity-85"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(max-width: 640px) 25vw, 140px"
                className={image.kind === "cutout" ? "object-contain p-2" : "object-cover"}
              />
              <span
                className={`pointer-events-none absolute inset-0 ring-inset transition-all ${
                  i === index ? "ring-1 ring-ink" : "ring-1 ring-stone/60"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
