"use client";

import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
  delay = 0,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md anim-in">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold tracking-wider text-ink-400 uppercase">
          {label}
        </p>
        <div
          className={`grid size-10 place-items-center rounded-xl ${color}`}
        >
          <Icon className="size-[18px]" />
        </div>
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900">
        {value}
      </p>
    </div>
  );
}
