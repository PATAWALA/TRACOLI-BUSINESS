"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Plus,
  X,
  Trash2,
  Upload,
  RefreshCw,
  Search,
  Image as ImageIcon,
} from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/types/database.types";

const CATEGORIES = [
  "Mode & Habillement",
  "Électronique & Tech",
  "Maison & Cuisine",
  "Beauté & Cosmétiques",
  "Machines & Industriel",
  "Auto & Moto",
  "Autre",
];

interface ProductForm {
  name: string;
  description: string;
  category: string;
  price_min: string;
  price_max: string;
  currency: string;
  moq: string;
  origin: string;
}

const EMPTY_FORM: ProductForm = {
  name: "",
  description: "",
  category: CATEGORIES[0],
  price_min: "",
  price_max: "",
  currency: "USD",
  moq: "",
  origin: "Chine",
};

export default function AdminProductsPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const res = await fetch("/api/products");
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products ?? []);
    }
    setLoading(false);
  }

  function closeModal() {
    setShowAdd(false);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview(null);
    setCreateError("");
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError("");
    setCreating(true);

    let imageUrl: string | null = null;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(path, imageFile);

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("files")
          .getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      }
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description || null,
        category: form.category,
        price_min: form.price_min ? Number(form.price_min) : null,
        price_max: form.price_max ? Number(form.price_max) : null,
        currency: form.currency,
        moq: form.moq || null,
        origin: form.origin || "Chine",
        image_url: imageUrl,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setCreateError(data.error ?? "Erreur lors de la création.");
      setCreating(false);
      return;
    }

    setCreating(false);
    closeModal();
    loadProducts();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteTarget.id }),
    });
    setDeleting(false);
    setDeleteTarget(null);
    loadProducts();
  }

  const filtered = search
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()),
      )
    : products;

  return (
    <div className="space-y-6">
      <ConfirmModal
        open={!!deleteTarget}
        title="Retirer ce produit ?"
        message={
          deleteTarget
            ? `Le produit "${deleteTarget.name}" sera retiré du catalogue.`
            : ""
        }
        confirmLabel="Retirer"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Catalogue produits"
          description={`${products.length} produit${products.length > 1 ? "s" : ""} dans le catalogue`}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={loadProducts}
            className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-bold text-ink-600 transition-all hover:bg-ink-50"
          >
            <RefreshCw className="size-4" />
            Actualiser
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-tracoli-600"
          >
            <Plus className="size-4" />
            Ajouter un produit
          </button>
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" />
        <input
          type="text"
          placeholder="Rechercher un produit…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pr-4 pl-10 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
        />
      </div>

      {/* Add modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-ink-200 bg-white p-6 shadow-card-lg"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600"
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500">
                  <Package className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink-900">
                    Nouveau produit
                  </h3>
                  <p className="text-sm text-ink-500">
                    Visible dans le catalogue public
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreate} className="mt-6 space-y-4">
                {createError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {createError}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-ink-700">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                    placeholder="Ex: Baskets mode homme"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-ink-700">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                    placeholder="Description courte du produit"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-ink-700">
                    Catégorie
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-ink-700">
                      Prix min
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.price_min}
                      onChange={(e) =>
                        setForm({ ...form, price_min: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                      placeholder="2.00"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink-700">
                      Prix max
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.price_max}
                      onChange={(e) =>
                        setForm({ ...form, price_max: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                      placeholder="15.00"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink-700">
                      Devise
                    </label>
                    <select
                      value={form.currency}
                      onChange={(e) =>
                        setForm({ ...form, currency: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="CNY">CNY</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-ink-700">
                      Quantité minimum
                    </label>
                    <input
                      type="text"
                      value={form.moq}
                      onChange={(e) =>
                        setForm({ ...form, moq: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                      placeholder="50 pcs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink-700">
                      Origine
                    </label>
                    <input
                      type="text"
                      value={form.origin}
                      onChange={(e) =>
                        setForm({ ...form, origin: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                      placeholder="Guangzhou"
                    />
                  </div>
                </div>

                {/* Image upload */}
                <div>
                  <label className="text-xs font-bold text-ink-700">
                    Photo du produit
                  </label>
                  {imagePreview ? (
                    <div className="relative mt-2 inline-block">
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        className="size-28 rounded-xl border border-ink-200 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-red-500 text-white"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-300 bg-white px-4 py-6 text-sm text-ink-500 transition-all hover:border-tracoli-400 hover:bg-tracoli-50/30"
                    >
                      <Upload className="size-5" />
                      Cliquer pour ajouter une photo
                    </button>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={creating}
                  className="w-full rounded-xl bg-tracoli-500 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 disabled:opacity-60"
                >
                  {creating ? "Ajout en cours…" : "Ajouter au catalogue"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products grid */}
      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-ink-200 bg-white py-16">
          <div className="size-7 animate-spin rounded-full border-[3px] border-ink-200 border-t-tracoli-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-ink-200 bg-white px-6 py-16 text-center">
          <Package className="mx-auto size-10 text-ink-300" />
          <p className="mt-3 text-base font-semibold text-ink-600">
            {search
              ? "Aucun produit trouvé."
              : "Aucun produit dans le catalogue."}
          </p>
          {!search && (
            <button
              onClick={() => setShowAdd(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-tracoli-600"
            >
              <Plus className="size-4" />
              Ajouter le premier produit
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-square bg-ink-100">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <ImageIcon className="size-10 text-ink-300" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-[13px] font-bold text-ink-900 line-clamp-1">
                  {product.name}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold text-tracoli-500">
                  {product.category}
                </p>
                {(product.price_min || product.price_max) && (
                  <p className="mt-1 text-[12px] font-bold text-ink-700">
                    {product.price_min ?? "?"}–{product.price_max ?? "?"}{" "}
                    {product.currency} / pièce
                  </p>
                )}
                {product.moq && (
                  <p className="mt-0.5 text-[11px] text-ink-500">
                    Min: {product.moq}
                  </p>
                )}
              </div>
              <button
                onClick={() => setDeleteTarget(product)}
                className="absolute top-2 right-2 grid size-7 place-items-center rounded-lg bg-white/90 text-ink-400 opacity-0 shadow-sm transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
