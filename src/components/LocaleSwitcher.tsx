"use client";

import { useLocale } from "@/hooks/useLocale";

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="inline-flex rounded-lg border border-ink-200 bg-white p-0.5">
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-label={l === "fr" ? "Français" : "English"}
          className={`rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase transition-colors ${
            locale === l
              ? "bg-tracoli-500 text-white"
              : "text-ink-500 hover:text-ink-900"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}