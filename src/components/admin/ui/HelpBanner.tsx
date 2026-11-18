import { Info } from "lucide-react";

/** Encadré d'aide : explique en une ou deux phrases à quoi sert la page. */
export default function HelpBanner({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
      <Info className="mt-0.5 size-5 shrink-0 text-blue-500" />
      <div className="min-w-0 text-[13px] leading-relaxed text-blue-900">
        {title && <p className="font-bold">{title}</p>}
        <div className={title ? "mt-0.5 text-blue-800" : ""}>{children}</div>
      </div>
    </div>
  );
}
