"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ResourceCover from "@/components/shop/ResourceCover";
import ResourceActionButton from "@/components/shop/ResourceActionButton";
import { TYPE_LABELS } from "@/lib/resource-actions";
import type { Resource, ResourceType } from "@/data/shared/types";

type Filter = "all" | "free" | "premium" | ResourceType;

const TYPE_FILTER_LABELS: Record<ResourceType, string> = {
  guide: "Guides",
  ebook: "Ebooks",
  formation: "Formations",
  template: "Modèles",
};

export default function ResourcesBrowser({ resources }: { resources: Resource[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  // On ne propose que les filtres qui donnent au moins un résultat.
  const filters = useMemo(() => {
    const list: { value: Filter; label: string }[] = [{ value: "all", label: "Tout" }];
    if (resources.some((r) => r.access === "free")) list.push({ value: "free", label: "Gratuits" });
    if (resources.some((r) => r.access === "premium")) list.push({ value: "premium", label: "Payants" });
    (Object.keys(TYPE_FILTER_LABELS) as ResourceType[]).forEach((t) => {
      if (resources.some((r) => r.type === t)) list.push({ value: t, label: TYPE_FILTER_LABELS[t] });
    });
    return list;
  }, [resources]);

  const filtered = useMemo(() => {
    if (filter === "all") return resources;
    if (filter === "free" || filter === "premium") return resources.filter((r) => r.access === filter);
    return resources.filter((r) => r.type === filter);
  }, [filter, resources]);

  return (
    <>
      {filters.length > 2 && (
        <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <div className="flex gap-2 sm:flex-wrap" role="group" aria-label="Filtrer la boutique">
            {filters.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  aria-pressed={active}
                  className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-colors active:scale-[0.98] ${
                    active
                      ? "border-tracoli-500 bg-tracoli-500 text-white"
                      : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:text-ink-900"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {filtered.map((resource) => {
          const isPremium = resource.access === "premium";
          const subtitle = [TYPE_LABELS[resource.type], resource.level, resource.meta].filter(Boolean).join(" · ");

          return (
            <article
              key={resource.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white transition-colors hover:border-tracoli-500/40"
            >
              <Link
                href={`/ressources/${resource.slug}`}
                className="relative block aspect-video overflow-hidden bg-ink-100"
                aria-label={`Voir le détail : ${resource.title}`}
              >
                <ResourceCover resource={resource} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <span
                  className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold ${
                    isPremium ? "bg-ink-900 text-white" : "bg-white text-ink-900"
                  }`}
                >
                  {isPremium ? "Payant" : "Gratuit"}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-sm font-semibold text-ink-700">{subtitle}</p>

                <Link href={`/ressources/${resource.slug}`}>
                  <h3 className="mt-2 text-lg leading-snug font-extrabold tracking-tight text-ink-900 transition-colors group-hover:text-tracoli-600">
                    {resource.title}
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink-700">{resource.description}</p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 pt-5">
                  <p className="text-base font-extrabold text-ink-900">{isPremium ? resource.price : "Accès libre"}</p>

                  <div className="flex gap-2">
                    <Link
                      href={`/ressources/${resource.slug}`}
                      className="inline-flex min-h-11 items-center rounded-xl border-2 border-ink-200 bg-white px-4 text-sm font-bold text-ink-800 transition-colors hover:border-ink-300"
                    >
                      Détails
                    </Link>

                    <ResourceActionButton
                      resource={resource}
                      className={`inline-flex min-h-11 items-center gap-1.5 rounded-xl px-4 text-sm font-bold text-white transition-colors active:scale-[0.98] ${
                        isPremium ? "bg-tracoli-500 hover:bg-tracoli-600" : "bg-ink-900 hover:bg-ink-800"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-3xl border border-dashed border-ink-300 bg-ink-50 p-12 text-center">
          <p className="text-base font-semibold text-ink-700">
            {resources.length === 0
              ? "La boutique se remplit bientôt. Revenez très vite !"
              : "Aucun livre dans cette catégorie pour le moment."}
          </p>
        </div>
      )}
    </>
  );
}
