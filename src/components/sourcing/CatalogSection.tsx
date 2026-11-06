"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Package, X } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/data/products/categories";
import { PRODUCTS as STATIC_PRODUCTS } from "@/data/products/items";
import type { Product as StaticProduct } from "@/data/products/items";
import ProductCard from "./ProductCard";

type SortOption = "default" | "price-asc" | "price-desc" | "moq-asc";

interface DBProduct {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price_min: number | null;
  price_max: number | null;
  currency: string;
  moq: number | null;
  origin: string;
  image_url: string | null;
}

function mapDBProduct(p: DBProduct): StaticProduct {
  const catMap: Record<string, string> = {
    "Mode & Habillement": "mode",
    "Électronique & Tech": "electronics",
    "Maison & Cuisine": "maison",
    "Beauté & Cosmétiques": "cosmetics",
    "Machines & Industriel": "machinery",
    "Auto & Moto": "auto",
  };

  const priceMin = p.price_min ?? 0;
  const priceMax = p.price_max ?? 0;
  const priceRange =
    priceMin > 0 || priceMax > 0
      ? `${priceMin} $ – ${priceMax} $ / pièce`
      : "Sur devis";

  return {
    id: p.id,
    slug: p.id,
    name: p.name,
    categorySlug: catMap[p.category] ?? "autre",
    image: p.image_url ?? "",
    imageAlt: p.name,
    moq: p.moq ? `${p.moq} pcs` : "—",
    priceRange,
    priceMin,
    priceMax,
    currency: p.currency ?? "USD",
    origin: p.origin ?? "Chine",
    featured: false,
    tags: p.description ? [p.description] : [],
  };
}

export default function CatalogSection() {
  const [dbProducts, setDbProducts] = useState<StaticProduct[] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const items: DBProduct[] = data.products ?? [];
        if (items.length > 0) {
          setDbProducts(items.map(mapDBProduct));
        } else {
          setDbProducts(null);
        }
      })
      .catch(() => setDbProducts(null));
  }, []);

  const allProducts = dbProducts ?? STATIC_PRODUCTS;
  const fromDB = dbProducts !== null;

  const categories = useMemo(() => {
    if (!fromDB) return PRODUCT_CATEGORIES;
    const cats = [...new Set(allProducts.map((p) => p.categorySlug))];
    return cats.map((slug) => {
      const found = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
      return {
        id: slug,
        slug,
        label: found?.label ?? slug,
        tagline: "",
        image: "",
        icon: "",
        subCategories: [] as string[],
        accent: "primary" as const,
      };
    });
  }, [allProducts, fromDB]);

  const products = useMemo(() => {
    let list =
      activeCategory === "all"
        ? allProducts
        : allProducts.filter((p) => p.categorySlug === activeCategory);

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.priceMin - b.priceMin);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.priceMax - a.priceMax);
        break;
      case "moq-asc":
        list = [...list].sort(
          (a, b) => parseInt(a.moq) - parseInt(b.moq),
        );
        break;
      default:
        break;
    }

    return list;
  }, [allProducts, activeCategory, sortBy]);

  const resetFilters = () => {
    setActiveCategory("all");
  };

  const currentCategory = categories.find((c) => c.slug === activeCategory);

  return (
    <div>
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-tracoli-200 bg-white px-3 py-1.5 text-[10.5px] font-bold tracking-wide text-tracoli-600 uppercase">
          <Package className="size-3" />
          Catalogue
        </span>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          Produits souvent commandés par nos clients
        </h2>
        <p className="mt-2 max-w-2xl text-[14px] text-ink-500">
          Ces exemples vous donnent une idée des prix et des quantités
          minimums. Vous cherchez autre chose ? Envoyez-nous votre besoin.
        </p>
      </div>

      <div className="-mx-4 mb-4 overflow-x-auto px-4 pb-1 scrollbar-hide">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[12.5px] font-bold transition-all active:scale-[0.98] ${
              activeCategory === "all"
                ? "border-tracoli-500 bg-tracoli-500 text-white shadow-[var(--shadow-red)]"
                : "border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900"
            }`}
          >
            <Filter className="size-3.5" />
            Toutes
            <span
              className={`rounded-md px-1.5 text-[10px] ${
                activeCategory === "all"
                  ? "bg-white/20 text-white"
                  : "bg-ink-100 text-ink-600"
              }`}
            >
              {allProducts.length}
            </span>
          </button>

          {categories.map((cat) => {
            const active = activeCategory === cat.slug;
            const count = allProducts.filter(
              (p) => p.categorySlug === cat.slug,
            ).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[12.5px] font-bold transition-all active:scale-[0.98] ${
                  active
                    ? "border-tracoli-500 bg-tracoli-500 text-white shadow-[var(--shadow-red)]"
                    : "border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900"
                }`}
              >
                {cat.label}
                <span
                  className={`rounded-md px-1.5 text-[10px] ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-ink-100 text-ink-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[12.5px] text-ink-600">
            <span className="font-extrabold text-ink-900">
              {products.length}
            </span>{" "}
            {products.length > 1 ? "produits" : "produit"}
            {currentCategory && (
              <>
                {" "}
                dans{" "}
                <span className="font-bold text-tracoli-500">
                  {currentCategory.label}
                </span>
              </>
            )}
          </p>

          {activeCategory !== "all" && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-ink-50 px-2 py-1 text-[11px] font-semibold text-ink-600 transition-colors hover:border-ink-300 hover:text-ink-900"
            >
              <X className="size-3" />
              Retirer le filtre
            </button>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-[12px] font-semibold text-ink-700 outline-none transition-colors focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/10"
        >
          <option value="default">Tri par défaut</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="moq-asc">MOQ croissant</option>
        </select>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-8 text-center">
          <p className="text-[13.5px] font-semibold text-ink-700">
            Aucun exemple disponible pour ces filtres.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-tracoli-500 px-4 py-2.5 text-[12.5px] font-bold text-white shadow-[var(--shadow-red)] hover:bg-tracoli-600"
          >
            <X className="size-3.5" />
            Réinitialiser les filtres
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-[11.5px] text-ink-400">
        Tarifs indicatifs hors fret, taxes et frais de dédouanement.
      </p>
    </div>
  );
}
