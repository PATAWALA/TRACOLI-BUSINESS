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
  const padding = tight ? "py-10 lg:py-14" : "py-16 lg:py-24";

  return (
    <section id={id} className={`${bg} ${padding} scroll-mt-24`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
