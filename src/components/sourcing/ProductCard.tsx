"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Package } from "lucide-react";
import type { Product } from "@/data/products/items";
import { isDisplayableImage } from "@/lib/product-image";

export default function ProductCard({ product }: { product: Product }) {
  const [broken, setBroken] = useState(false);
  const showImage = isDisplayableImage(product.image) && !broken;

  const requestHref = `/sourcer?sourcing-product=${encodeURIComponent(
    product.name
  )}&sourcing-product-id=${encodeURIComponent(product.id)}&sourcing-product-url=${encodeURIComponent(
    isDisplayableImage(product.image) ? product.image : ""
  )}#sourcing`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-colors hover:border-tracoli-500/40">
      <div className="relative aspect-square w-full overflow-hidden bg-ink-100">
        {showImage ? (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-ink-500">
            <Package className="size-10" aria-hidden />
            <span className="sr-only">Photo à venir</span>
          </div>
        )}

        {product.featured && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-tracoli-500 px-2.5 py-1 text-xs font-bold text-white">
            Populaire
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] leading-snug font-extrabold tracking-tight text-ink-900">
          {product.name}
        </h3>

        <p className="mt-1.5 flex items-center gap-1 text-sm text-ink-700">
          <MapPin className="size-3.5 shrink-0 text-ink-500" aria-hidden />
          {product.origin}
        </p>

        <p className="mt-3 text-base font-extrabold text-ink-900">
          {product.priceRange}
        </p>

        <p className="mt-0.5 text-sm text-ink-700">
          Commande min. :{" "}
          <span className="font-semibold text-ink-900">{product.moq}</span>
        </p>

        <Link
          href={requestHref}
          className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-tracoli-600 active:scale-[0.98]"
        >
          Demander ce produit
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
