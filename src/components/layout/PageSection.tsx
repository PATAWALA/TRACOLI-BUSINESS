"use client";

import type { ReactNode } from "react";

type PageSectionProps = {
  id?: string;
  variant?: "default" | "alt";
  children: ReactNode;
  tight?: boolean;
};

export default function PageSection({
  id,
  variant = "default",
  children,
  tight = false,
}: PageSectionProps) {
  const bg = variant === "alt" ? "bg-ink-50" : "bg-white";
  const padding = tight ? "py-10 lg:py-14" : "py-12 lg:py-16";

  return (
    <section id={id} className={`${bg} ${padding}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}