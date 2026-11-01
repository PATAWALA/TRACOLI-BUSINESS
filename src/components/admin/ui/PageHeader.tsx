import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  actionIcon?: LucideIcon;
}

export default function PageHeader({
  title,
  description,
  actionLabel,
  actionHref,
  actionIcon: ActionIcon,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-ink-500">{description}</p>
        )}
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-tracoli-600 hover:shadow-md"
        >
          {ActionIcon && <ActionIcon className="size-4" />}
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
